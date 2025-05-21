<?php 

require_once('config/Database.php');

function findByLogin ($login){

    $sql = "select * from citoyen where login = :login";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":login", $login);
    $stmt->execute();
    return $stmt->fetch();
}

function save($nom, $prenoms, $contact, $login, $motdepasse, $nationalite, $datenaissance, $email, $profession){

    $sql = "insert into citoyen (nom, prenom, contact, login, mot_de_passe, nationalite, date_naissance, email, profession)
            values (:nom, :prenom, :contact, :login, :mot_de_passe, :nationalite, :date_naissance, :email, :profession) ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":prenom", $prenoms);
    $stmt->bindParam(":contact", $contact);
    $stmt->bindParam(":login", $login);
    $stmt->bindParam(":mot_de_passe", $motdepasse);
    $stmt->bindParam(":nationalite", $nationalite);
    $stmt->bindParam(":date_naissance", $datenaissance);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":profession", $profession);
    $stmt->execute();
    // return $stmt->fetch();

}


?>