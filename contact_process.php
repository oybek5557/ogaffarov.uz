<?php

    $from = $_REQUEST['email'];
    $name = $_REQUEST['name'];
    $subject = $_REQUEST['subject'];
    $number = $_REQUEST['number'];
	$cmessage = $_REQUEST['message'];
	
	$headers['From']    = 'gaffarovoybek@yahoo.com';
    $headers['To']      = 'gaffarovoybek21@gmail.com';

    $body = 'Test message';

    $smtpinfo["host"] = "smtp.mail.yahoo.com";
    $smtpinfo["port"] = "465";
    $smtpinfo["auth"] = true;
    $smtpinfo["username"] = "gaffarovoybek@yahoo.com";
    $smtpinfo["password"] = "babaq1234";

    $subject = "You have a message from your website Oybek Gaffarov.";

    $logo = 'img/logo.png';
    $link = '#';

	$body = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>Express Mail</title></head><body>";
	$body .= "<table style='width: 100%;'>";
	$body .= "<thead style='text-align: center;'><tr><td style='border:none;' colspan='2'>";
	$body .= "<a href='{$link}'><img src='{$logo}' alt=''></a><br><br>";
	$body .= "</td></tr></thead><tbody><tr>";
	$body .= "<td style='border:none;'><strong>Name:</strong> {$name}</td>";
	$body .= "<td style='border:none;'><strong>Email:</strong> {$from}</td>";
	$body .= "</tr>";
	$body .= "<tr><td style='border:none;'><strong>Subject:</strong> {$csubject}</td></tr>";
	$body .= "<tr><td></td></tr>";
	$body .= "<tr><td colspan='2' style='border:none;'>{$cmessage}</td></tr>";
	$body .= "</tbody></table>";
	$body .= "</body></html>";

    $send = mail($to, $subject, $body, $headers);

?>