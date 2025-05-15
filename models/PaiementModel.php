<?php
require_once('config/Database.php');

class PaiementModel {
    private $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function enregistrerPaiement($data) {
    $sql = "INSERT INTO paiements (montant, mode_payement, numero_carte, nom_carte, date_expiration, cvv, operateur, numero_telephone, statut, id_demande)
            VALUES (:montant, :mode, :numero_carte, :nom_carte, :date_expiration, :cvv, :operateur, :numero_telephone, :statut, :id_demande)";

    $stmt = $this->db->prepare($sql);

    $stmt->bindParam(':montant', $data['montant']);
    $stmt->bindParam(':mode', $data['mode']);

    $stmt->bindParam(':numero_carte', $data['numero_carte'] ?? null);
    $stmt->bindParam(':nom_carte', $data['nom_carte'] ?? null);
    $stmt->bindParam(':date_expiration', $data['date_expiration'] ?? null);
    $stmt->bindParam(':cvv', $data['cvv'] ?? null);
    $stmt->bindParam(':operateur', $data['operateur'] ?? null);
    $stmt->bindParam(':numero_telephone', $data['numero_telephone'] ?? null);

    $stmt->bindParam(':statut', $data['statut'] ?? $statut = 'en attente');
    // $stmt->bindParam(':id_demande', $data['id_demande']);

    return $stmt->execute();
}

}
