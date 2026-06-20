<?php
declare(strict_types=1);

header('Content-Type: application/json');
require __DIR__ . '/lib/SmtpMailer.php';

function respond(bool $success, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

// --- Load SMTP credentials: env vars first, then local gitignored config file ---
$config = [
    'host'       => getenv('SMTP_HOST') ?: null,
    'port'       => getenv('SMTP_PORT') ?: null,
    'encryption' => getenv('SMTP_ENCRYPTION') ?: null,
    'username'   => getenv('SMTP_USERNAME') ?: null,
    'password'   => getenv('SMTP_PASSWORD') ?: null,
    'from_email' => getenv('SMTP_FROM_EMAIL') ?: null,
    'from_name'  => getenv('SMTP_FROM_NAME') ?: null,
    'to_email'   => getenv('SMTP_TO_EMAIL') ?: null,
];

$localConfigFile = __DIR__ . '/smtp-config.php';
if (in_array(null, $config, true) && is_file($localConfigFile)) {
    $fileConfig = require $localConfigFile;
    $config = array_merge($fileConfig, array_filter($config));
}

if (in_array(null, $config, true)) {
    error_log('Contact form: SMTP is not configured (missing env vars or smtp-config.php).');
    respond(false, 'The contact form is not configured yet. Please email me directly.', 500);
}

// --- Validate and sanitize user input ---
$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $subject === '' || $message === '' || mb_strlen($message) < 10) {
    respond(false, 'Please fill in all fields.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.', 422);
}

// Strip CR/LF from anything that ends up in a header to prevent header injection.
$stripHeaderChars = static fn (string $value): string => str_replace(["\r", "\n"], '', $value);
$name = $stripHeaderChars($name);
$email = $stripHeaderChars($email);
$subject = $stripHeaderChars($subject);

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$body = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>';
$body .= '<table style="width:100%;font-family:sans-serif;">';
$body .= "<tr><td><strong>Name:</strong> {$safeName}</td></tr>";
$body .= "<tr><td><strong>Email:</strong> {$safeEmail}</td></tr>";
$body .= "<tr><td><strong>Subject:</strong> {$safeSubject}</td></tr>";
$body .= '<tr><td>&nbsp;</td></tr>';
$body .= "<tr><td>{$safeMessage}</td></tr>";
$body .= '</table></body></html>';

try {
    $mailer = new SmtpMailer(
        $config['host'],
        (int) $config['port'],
        $config['encryption'],
        $config['username'],
        $config['password']
    );
    $mailer->send(
        $config['from_email'],
        $config['from_name'],
        $config['to_email'],
        "New message from {$name} via website",
        $body,
        $email
    );
} catch (Throwable $e) {
    error_log('Contact form SMTP error: ' . $e->getMessage());
    respond(false, 'Something went wrong while sending your message. Please try again later.', 502);
}

respond(true, 'Your message has been sent successfully.');