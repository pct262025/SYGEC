<?php 

require_once('config/Database.php');

function listUtilisateurs (){

    $sql = "select * from utilisateur";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function unUtilisateur ($id){

    $sql = "select * from utilisateur where id_utilisateur = :id_utilisateur";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_utilisateur', $id);
    $stmt->execute();
    return $stmt->fetch();

}

function creerUtilisateur($nom, $prenom, $login, $email, $mot_de_passe, $id_role){
    $sql = "INSERT INTO etat_civil_ci.utilisateur
        (nom, prenom, login, email, mot_de_passe, id_role)
        VALUES(:nom, :prenom, :login, :email, :mot_de_passe, :id_role) ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':login', $login);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':mot_de_passe', $mot_de_passe);
    $stmt->bindParam(':id_role', $id_role);
    $stmt->execute();
}

function updateUtilisateur($nom, $prenom, $login, $email, $id_role, $id_utilisateur){
    $sql = "UPDATE etat_civil_ci.utilisateur
        SET nom=:nom, prenom=:prenom, login=:login, email=:email, id_role=:id_role
        WHERE id_utilisateur=:id_utilisateur ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':login', $login);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':id_role', $id_role);
    $stmt->bindParam(':id_utilisateur', $id_utilisateur);
    $stmt->execute();
}

function deleteUtilisateur($id_utilisateur){
    $sql = "DELETE FROM etat_civil_ci.utilisateur
        WHERE id_utilisateur=:id_utilisateur ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_utilisateur', $id_utilisateur);
    $stmt->execute();
}

function findByLogin ($login){

    $sql = "select * from utilisateur where login = :login";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':login', $login);
    $stmt->execute();
    return $stmt->fetch();

}

?>