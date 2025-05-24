<?php
require_once('config/Database.php');

function save($montant, $numero_carte, $nom_carte, $date_expiration, $cvv, $operateur, $numero_telephone, $id_demande){

    $sql = "INSERT INTO etat_civil_ci.paiement
        (montant, date_paiement, statut_paiement, numero_carte, nom_carte, date_expiration, cvv, operateur, numero_telephone, id_demande)
        VALUES( :montant, NOW(), \"OK\", :numero_carte, :nom_carte, :date_expiration, :cvv, :operateur, :numero_telephone, :id_demande ) ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':montant', $montant);
    $stmt->bindParam(':numero_carte', $numero_carte);
    $stmt->bindParam(':nom_carte', $nom_carte);
    $stmt->bindParam(':date_expiration', $date_expiration);
    $stmt->bindParam(':cvv', $cvv);
    $stmt->bindParam(':operateur', $operateur);
    $stmt->bindParam(':numero_telephone', $numero_telephone);
    $stmt->bindParam(':id_demande',  $id_demande);
    $stmt->execute();

}


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
