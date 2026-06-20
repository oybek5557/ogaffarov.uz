<?php
/**
 * Copy this file to smtp-config.php and fill in your real credentials.
 * smtp-config.php is gitignored — it must NEVER be committed.
 *
 * Gmail users: create an "App Password" (not your normal password) at
 * https://myaccount.google.com/apppasswords and use it as SMTP_PASS.
 */
return [
    'host'       => 'smtp.gmail.com',
    'port'       => 587,            // 587 = STARTTLS, 465 = implicit TLS
    'encryption' => 'tls',          // 'tls' or 'ssl'
    'username'   => 'you@example.com',
    'password'   => 'your-app-password',
    'from_email' => 'you@example.com',
    'from_name'  => 'Oybek Gaffarov Website',
    'to_email'   => 'gaffarovoybek21@gmail.com',
];
