<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function sendPassword($nomPrenom, $password, $email){

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        // Paramètres serveur SMTP de Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'angedesireengoran958@gmail.com'; 
        $mail->Password   = 'emdc tfxo kyyj yzlw';   
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Destinataire
        $mail->setFrom('angedesireengoran958@gmail.com', 'PCT');
        $mail->addAddress($email);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Mot de passe';
        $mail->Body    = 'Bonjour '.$nomPrenom.',<br><br>Votre mot de passe est : <strong>'.$password.'</strong><br><br>Cordialement.';
        // $mail->AltBody = 'Bonjour '.$nomPrenom.', votre mot de passe est : '.$password;
        $mail->AltBody = "";

        $mail->send();
        // echo 'E-mail envoyé avec succès.';
    } catch (Exception $e) {
        // echo "L'e-mail n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
    }

}

function sendMessage($email, $message, $subject){

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    $mail = new PHPMailer(true);

    try {
        // Paramètres serveur SMTP de Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'angedesireengoran958@gmail.com'; 
        $mail->Password   = 'emdc tfxo kyyj yzlw';   
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Destinataire
        $mail->setFrom('angedesireengoran958@gmail.com', 'PCT');
        $mail->addAddress($email);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = $message;

        $mail->send();
        // echo 'E-mail envoyé avec succès.';
    } catch (Exception $e) {
        // echo "L'e-mail n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
    }

}

?>