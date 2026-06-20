<?php
/**
 * Minimal SMTP client (AUTH LOGIN, STARTTLS/SSL) with no external dependencies.
 * Only does what the contact form needs — not a general-purpose mail library.
 */
class SmtpMailer
{
    private string $host;
    private int $port;
    private string $encryption;
    private string $username;
    private string $password;

    public function __construct(string $host, int $port, string $encryption, string $username, string $password)
    {
        $this->host = $host;
        $this->port = $port;
        $this->encryption = $encryption;
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * @throws RuntimeException on any SMTP failure
     */
    public function send(string $fromEmail, string $fromName, string $toEmail, string $subject, string $htmlBody, string $replyTo): void
    {
        $transport = $this->encryption === 'ssl' ? 'ssl://' : 'tcp://';
        $socket = @stream_socket_client(
            "{$transport}{$this->host}:{$this->port}",
            $errno,
            $errstr,
            10,
            STREAM_CLIENT_CONNECT
        );
        if (!$socket) {
            throw new RuntimeException("Could not connect to SMTP server: $errstr ($errno)");
        }

        $this->expect($socket, 220);
        $this->command($socket, "EHLO {$this->host}", 250);

        if ($this->encryption === 'tls') {
            $this->command($socket, 'STARTTLS', 220);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('STARTTLS negotiation failed');
            }
            $this->command($socket, "EHLO {$this->host}", 250);
        }

        $this->command($socket, 'AUTH LOGIN', 334);
        $this->command($socket, base64_encode($this->username), 334);
        $this->command($socket, base64_encode($this->password), 235);

        $this->command($socket, "MAIL FROM:<{$this->username}>", 250);
        $this->command($socket, "RCPT TO:<{$toEmail}>", 250);
        $this->command($socket, 'DATA', 354);

        $headers = [];
        $headers[] = 'From: ' . $this->encodeHeader($fromName) . " <{$this->username}>";
        $headers[] = "Reply-To: {$replyTo}";
        $headers[] = "To: {$toEmail}";
        $headers[] = 'Subject: ' . $this->encodeHeader($subject);
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-Type: text/html; charset=UTF-8';
        $headers[] = 'Date: ' . date('r');

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
        $this->command($socket, $message, 250);
        $this->command($socket, 'QUIT', 221);

        fclose($socket);
    }

    private function encodeHeader(string $value): string
    {
        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }

    private function command($socket, string $line, int $expectedCode): string
    {
        fwrite($socket, $line . "\r\n");
        return $this->expect($socket, $expectedCode);
    }

    private function expect($socket, int $expectedCode): string
    {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            // Multi-line replies have a dash after the code; a space means it's the last line.
            if (preg_match('/^\d{3} /', $line)) {
                break;
            }
        }
        $code = (int) substr($response, 0, 3);
        if ($code !== $expectedCode) {
            throw new RuntimeException("Unexpected SMTP response (expected {$expectedCode}): {$response}");
        }
        return $response;
    }
}
