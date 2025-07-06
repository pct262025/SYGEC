<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'lib/PHPMailer/src/Exception.php';
require 'lib/PHPMailer/src/PHPMailer.php';
require 'lib/PHPMailer/src/SMTP.php';

class MailService {
    public static function envoyerEmail($destinataire, $sujet, $corpsHtml) {
        $mail = new PHPMailer(true);

        try {
            // SMTP config
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // ou smtp.sendinblue.com, etc.
            $mail->SMTPAuth = true;
            $mail->Username = 'ton.email@gmail.com'; // ⚠️ Mettre ton email
            $mail->Password = 'motdepasse-application'; // ⚠️ Utiliser un mot de passe application
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Infos expéditeur / destinataire
            $mail->setFrom('ton.email@gmail.com', 'État Civil CI');
            $mail->addAddress($destinataire);

            $mail->isHTML(true);
            $mail->Subject = $sujet;
            $mail->Body = $corpsHtml;

            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Erreur email : {$mail->ErrorInfo}");
            return false;
        }
    }
}
