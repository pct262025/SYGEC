<?php
require_once 'config/db.php';

class Message {
    private $pdo;

    public function __construct() {
        $this->pdo = $GLOBALS['pdo'];
    }

    public function enregistrerMessage($nom, $email, $objet, $contenu) {
        $stmt = $this->pdo->prepare("INSERT INTO messages_contact (nom, email, objet, message) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$nom, $email, $objet, $contenu]);
    }
}
