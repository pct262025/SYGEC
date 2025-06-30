<?php 

require_once('config/Database.php');

function listRoles (){

    $sql = "select * from role";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function unRole ($id){

    $sql = "select * from role where id_role = :id_role";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_role', $id);
    $stmt->execute();
    return $stmt->fetch();

}

function creerRole($libelle){
    $sql = "INSERT INTO etat_civil_ci.role
        (libelle)
        VALUES(:libelle) ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':libelle', $libelle);
    $stmt->execute();
}

function updateRole($libelle, $id_role){
    $sql = "UPDATE etat_civil_ci.role
        SET libelle=:libelle
        WHERE id_role=:id_role ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':libelle', $libelle);
    $stmt->bindParam(':id_role', $id_role);
    $stmt->execute();
}

function deleteRole($id_role){
    $sql = "DELETE FROM etat_civil_ci.role
        WHERE id_role=:id_role ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_role', $id_role);
    $stmt->execute();
}

?>