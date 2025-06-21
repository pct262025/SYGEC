<?php 

require_once('config/Database.php');

function findByLogin ($login){

    $sql = "select * from citoyen where login = :login";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":login", $login);
    $stmt->execute();
    return $stmt->fetch();
}

function save($nom, $prenoms, $contact, $login, $motdepasse, $nationalite, $datenaissance, $email, $profession, $genre){

    $sql = "insert into citoyen (nom, prenom, contact, login, mot_de_passe, nationalite, date_naissance, email, profession, genre)
            values (:nom, :prenom, :contact, :login, :mot_de_passe, :nationalite, :date_naissance, :email, :profession, :genre) ";

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
    $stmt->bindParam(":genre", $genre);
    $stmt->execute();
    // return $stmt->fetch();

}

function updateWithDemandeInfo ($nom, $prenom, $lieu_naissance, $date_naissance, $heure_naissance, $lieu_habitation, $nom_pere, $prenom_pere, $date_naissance_pere, $lieu_naissance_pere, $proffession_pere, $nom_mere, $prenom_mere, $date_naissance_mere, $lieu_naissance_mere, $proffession_mere, $marie_le, $marie_a, $divorce_le, $nom_conjoint, $prenom_conjoint, $email, $contact, $id_citoyen, $lieu_naissance_conjoint, $proffession_conjoint, $lieu_habitation_conjoint, $contact_conjoint){
    $sql = "UPDATE citoyen
            SET 
            nom=:nom, 
            prenom=:prenom, 
            lieu_naissance=:lieu_naissance, 
            date_naissance=:date_naissance, 
            heure_naissance=:heure_naissance, 
            lieu_habitation=:lieu_habitation, 
            nom_pere=:nom_pere, 
            prenom_pere=:prenom_pere, 
            date_naissance_pere=:date_naissance_pere, 
            lieu_naissance_pere=:lieu_naissance_pere, 
            proffession_pere=:proffession_pere, 
            nom_mere=:nom_mere, 
            prenom_mere=:prenom_mere, 
            proffession_mere=:proffession_mere, 
            date_naissance_mere=:date_naissance_mere, 
            lieu_naissance_mere=:lieu_naissance_mere, 
            marie_le=:marie_le, 
            marie_a=:marie_a, 
            divorce_le=:divorce_le, 
            nom_conjoint=:nom_conjoint, 
            prenom_conjoint=:prenom_conjoint, 
            email=:email, 
            contact=:contact,
            lieu_naissance_conjoint=:lieu_naissance_conjoint,
            proffession_conjoint=:proffession_conjoint,
            lieu_habitation_conjoint=:lieu_habitation_conjoint,
            contact_conjoint=:contact_conjoint
            WHERE id_citoyen=:id_citoyen ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":nom", $nom);
    $stmt->bindParam(":prenom", $prenom);
    $stmt->bindParam(":lieu_naissance", $lieu_naissance);
    $stmt->bindParam(":date_naissance", $date_naissance);
    $stmt->bindParam(":heure_naissance", $heure_naissance);
    $stmt->bindParam(":lieu_habitation", $lieu_habitation);
    $stmt->bindParam(":nom_pere", $nom_pere);
    $stmt->bindParam(":prenom_pere", $prenom_pere);
    $stmt->bindParam(":date_naissance_pere", $date_naissance_pere);
    $stmt->bindParam(":lieu_naissance_pere", $lieu_naissance_pere);
    $stmt->bindParam(":proffession_pere", $proffession_pere);
    $stmt->bindParam(":nom_mere", $nom_mere);
    $stmt->bindParam(":prenom_mere", $prenom_mere);
    $stmt->bindParam(":date_naissance_mere", $date_naissance_mere);
    $stmt->bindParam(":lieu_naissance_mere", $lieu_naissance_mere);
    $stmt->bindParam(":proffession_mere", $proffession_mere);
    $stmt->bindParam(":marie_le", $marie_le);
    $stmt->bindParam(":marie_a", $marie_a);
    $stmt->bindParam(":divorce_le", $divorce_le);
    $stmt->bindParam(":nom_conjoint", $nom_conjoint);
    $stmt->bindParam(":prenom_conjoint", $prenom_conjoint);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":contact", $contact);
    $stmt->bindParam(":id_citoyen", $id_citoyen);
    
    $stmt->bindParam(":lieu_naissance_conjoint", $lieu_naissance_conjoint);
    $stmt->bindParam(":proffession_conjoint", $proffession_conjoint);
    $stmt->bindParam(":lieu_habitation_conjoint", $lieu_habitation_conjoint);
    $stmt->bindParam(":contact_conjoint", $contact_conjoint);

    $stmt->execute();
}


?>