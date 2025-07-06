<?php
// require_once 'models/Message.php';

class ContactController {
    // public function afficherFormulaire() {
    //     require 'views/contact/form.php';
    // }

    // public function envoyerMessage() {
    //     if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //         $nom = htmlspecialchars($_POST['nom']);
    //         $email = htmlspecialchars($_POST['email']);
    //         $objet = htmlspecialchars($_POST['objet']);
    //         $message = htmlspecialchars($_POST['message']);

    //         $msgModel = new Message();
    //         $ok = $msgModel->enregistrerMessage($nom, $email, $objet, $message);

    //         $feedback = $ok ? "Message envoyé avec succès." : "Erreur lors de l'envoi.";

    //         require 'views/contact/form.php';
    //     }
    // }

    
    public function contact() {
        require 'views/contact.php';
    }
}
