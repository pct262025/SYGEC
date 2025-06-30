<?php 

require_once('config/Database.php');

function listDemandeAttenteValidation (){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y %H:%i:%s') AS date_naissance,
        demande_acte.lieu_naissance,
        DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y %H:%i:%s') AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y %H:%i:%s') AS divorce_le,
        DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y %H:%i:%s') AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere
        from demande_acte 
        where demande_acte.id_type_acte = 1 ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function demandeAttenteValidation ($id){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        CASE 
            WHEN demande_acte.date_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance,
        CASE 
            WHEN demande_acte.heure_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.heure_naissance, '%H:%i:%s') 
            ELSE NULL 
        END AS heure_naissance,
        demande_acte.lieu_naissance,
        CASE 
            WHEN demande_acte.marie_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        CASE 
            WHEN demande_acte.divorce_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS divorce_le,
        CASE 
            WHEN demande_acte.deces_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere,
        demande_acte.piece_jointe as piece_jointe
        from demande_acte 
        where demande_acte.id_type_acte = 1 
        AND demande_acte.id_demande = :id_demande  ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();

}

function validerDemande($id, $id_agent=null){

    $sql = "update demande_acte set statut = 'En attente de paiement', id_agent=:id_agent where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->bindParam(':id_agent', $id_agent);
    $stmt->execute();
    return $stmt->fetch();
}

function annulerDemande($id, $id_agent=null){

    $sql = "update demande_acte set statut = 'Rejeter', id_agent=:id_agent where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->bindParam(':id_agent', $id_agent);
    $stmt->execute();
    return $stmt->fetch();
}

function peyerDemande($id){

    $sql = "update demande_acte set statut = 'Payé' where id_demande = :id_demande";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();
}




function listCertificatAttenteValidation (){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y %H:%i:%s') AS date_naissance,
        demande_acte.lieu_naissance,
        DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y %H:%i:%s') AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y %H:%i:%s') AS divorce_le,
        DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y %H:%i:%s') AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere
        from demande_acte 
        where demande_acte.id_type_acte = 2 ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function certificatAttenteValidation ($id){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        CASE 
            WHEN demande_acte.date_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance,
        CASE 
            WHEN demande_acte.heure_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.heure_naissance, '%H:%i:%s') 
            ELSE NULL 
        END AS heure_naissance,
        demande_acte.lieu_naissance,
        CASE 
            WHEN demande_acte.marie_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        CASE 
            WHEN demande_acte.divorce_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS divorce_le,
        CASE 
            WHEN demande_acte.deces_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        CASE 
            WHEN demande_acte.date_naissance_pere IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance_pere, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance_pere,
        demande_acte.lieu_naissance_pere as lieu_naissance_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere,
        CASE 
            WHEN demande_acte.date_naissance_mere IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance_mere, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance_mere,
        demande_acte.lieu_naissance_mere as lieu_naissance_mere,
        demande_acte.piece_jointe as piece_jointe
        from demande_acte 
        where demande_acte.id_type_acte = 2
        AND demande_acte.id_demande = :id_demande   ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();

}



function listActeNaissanceAttenteValidation (){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y %H:%i:%s') AS date_naissance,
        demande_acte.lieu_naissance,
        DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y %H:%i:%s') AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y %H:%i:%s') AS divorce_le,
        DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y %H:%i:%s') AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere
        from demande_acte 
        where demande_acte.id_type_acte = 3 ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}



function acteNaissanceenteValidation ($id){

    $sql = "select 
        distinct demande_acte.id_demande,
        demande_acte.statut,
        demande_acte.nom,
        demande_acte.prenom,
        demande_acte.email,
        CASE 
            WHEN demande_acte.date_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance,
        CASE 
            WHEN demande_acte.heure_naissance IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.heure_naissance, '%H:%i:%s') 
            ELSE NULL 
        END AS heure_naissance,
        demande_acte.lieu_naissance,
        CASE 
            WHEN demande_acte.marie_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.marie_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS marie_le,
        demande_acte.marie_a,
        concat(demande_acte.nom_conjoint, \" \", demande_acte.prenom_conjoint) AS marie_avec,
        CASE 
            WHEN demande_acte.divorce_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.divorce_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS divorce_le,
        CASE 
            WHEN demande_acte.deces_le IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.deces_le, '%d/%m/%Y') 
            ELSE NULL 
        END AS deces_le,
        demande_acte.deces_a,
        demande_acte.nom_pere as nom_pere,
        demande_acte.prenom_pere as prenom_pere,
        CASE 
            WHEN demande_acte.date_naissance_pere IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance_pere, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance_pere,
        demande_acte.lieu_naissance_pere as lieu_naissance_pere,
        demande_acte.nom_mere as nom_mere,
        demande_acte.prenom_mere as prenom_mere,
        CASE 
            WHEN demande_acte.date_naissance_mere IS NOT NULL 
            THEN DATE_FORMAT(demande_acte.date_naissance_mere, '%d/%m/%Y') 
            ELSE NULL 
        END AS date_naissance_mere,
        demande_acte.lieu_naissance_mere as lieu_naissance_mere,
        demande_acte.nom_conjoint as nom_conjoint,
        demande_acte.prenom_conjoint as prenom_conjoint,
        demande_acte.proffession_conjoint as proffession_conjoint,
        demande_acte.piece_jointe as piece_jointe
        from demande_acte 
        where demande_acte.id_type_acte = 3
        AND demande_acte.id_demande = :id_demande   ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->execute();
    return $stmt->fetch();

}


function creerUneDemande ($statut, $id_type_acte, $id_citoyen){

    $sql = "INSERT INTO etat_civil_ci.demande_acte
            (statut, date_demande, id_type_acte, id_citoyen)
            VALUES(:statut, now(), :id_type_acte, :id_citoyen);";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':statut', $statut);
    $stmt->bindParam(':id_type_acte', $id_type_acte);
    $stmt->bindParam(':id_citoyen', $id_citoyen);
    $stmt->execute();

}

function creerUneDemande2 ($statut, $justificatif_path, $id_type_acte, $id_citoyen, $date_creation, $nom, $prenom, $lieu_naissance, $date_naissance, $heure_naissance, $contact, $nationalite, $email, $profession, $numero_registre, $marie_a, $marie_le, $divorce_le, $deces_a, $deces_le, $nom_pere, $prenom_pere, $proffession_pere, $date_naissance_pere, $lieu_naissance_pere, $nom_mere, $prenom_mere, $proffession_mere, $date_naissance_mere, $lieu_naissance_mere, $nom_conjoint, $prenom_conjoint, $lieu_habitation, $lieu_naissance_conjoint, $proffession_conjoint, $lieu_habitation_conjoint, $contact_conjoint, $piece_jointe){

    $sql = "INSERT INTO etat_civil_ci.demande_acte
            (statut, justificatif_path, id_type_acte, id_citoyen, date_creation, nom, prenom, lieu_naissance, date_naissance, heure_naissance, contact, nationalite, email, profession, numero_registre, marie_a, marie_le, divorce_le, deces_a, deces_le, nom_pere, prenom_pere, proffession_pere, date_naissance_pere, lieu_naissance_pere, nom_mere, prenom_mere, proffession_mere, date_naissance_mere, lieu_naissance_mere, nom_conjoint, prenom_conjoint, lieu_habitation, lieu_naissance_conjoint, proffession_conjoint, lieu_habitation_conjoint, contact_conjoint, piece_jointe)
            VALUES(:statut, :justificatif_path, :id_type_acte, :id_citoyen, :date_creation, :nom, :prenom, :lieu_naissance, :date_naissance, :heure_naissance, :contact, :nationalite, :email, :profession, :numero_registre, :marie_a, :marie_le, :divorce_le, :deces_a, :deces_le, :nom_pere, :prenom_pere, :proffession_pere, :date_naissance_pere, :lieu_naissance_pere, :nom_mere, :prenom_mere, :proffession_mere, :date_naissance_mere, :lieu_naissance_mere, :nom_conjoint, :prenom_conjoint, :lieu_habitation, :lieu_naissance_conjoint, :proffession_conjoint, :lieu_habitation_conjoint, :contact_conjoint, :piece_jointe) ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':statut', $statut);
    $stmt->bindParam(':justificatif_path', $justificatif_path);
    $stmt->bindParam(':id_type_acte', $id_type_acte);
    $stmt->bindParam(':id_citoyen', $id_citoyen);
    $stmt->bindParam(':date_creation', $date_creation);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':lieu_naissance', $lieu_naissance);
    $stmt->bindParam(':date_naissance', $date_naissance);
    $stmt->bindParam(':heure_naissance', $heure_naissance);
    $stmt->bindParam(':contact', $contact);
    $stmt->bindParam(':nationalite', $nationalite);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':profession', $profession);
    $stmt->bindParam(':numero_registre', $numero_registre);
    $stmt->bindParam(':marie_a', $marie_a);
    $stmt->bindParam(':marie_le', $marie_le);
    $stmt->bindParam(':divorce_le', $divorce_le);
    $stmt->bindParam(':deces_a', $deces_a);
    $stmt->bindParam(':deces_le', $deces_le);
    $stmt->bindParam(':nom_pere', $nom_pere);
    $stmt->bindParam(':prenom_pere', $prenom_pere);
    $stmt->bindParam(':proffession_pere', $proffession_pere);
    $stmt->bindParam(':date_naissance_pere', $date_naissance_pere);
    $stmt->bindParam(':lieu_naissance_pere', $lieu_naissance_pere);
    $stmt->bindParam(':nom_mere', $nom_mere);
    $stmt->bindParam(':prenom_mere', $prenom_mere);
    $stmt->bindParam(':proffession_mere', $proffession_mere);
    $stmt->bindParam(':date_naissance_mere', $date_naissance_mere);
    $stmt->bindParam(':lieu_naissance_mere', $lieu_naissance_mere);
    $stmt->bindParam(':nom_conjoint', $nom_conjoint);
    $stmt->bindParam(':prenom_conjoint', $prenom_conjoint);
    $stmt->bindParam(':lieu_habitation', $lieu_habitation);
    $stmt->bindParam(':lieu_naissance_conjoint', $lieu_naissance_conjoint);
    $stmt->bindParam(':proffession_conjoint', $proffession_conjoint);
    $stmt->bindParam(':lieu_habitation_conjoint', $lieu_habitation_conjoint);
    $stmt->bindParam(':contact_conjoint', $contact_conjoint);
    $stmt->bindParam(':piece_jointe', $piece_jointe);
    $stmt->execute();

}

function nbrDossier($id_citoyen, $id_type_acte){
    $sql = "select count(*)
        from demande_acte 
        where demande_acte.id_citoyen = :id_citoyen 
        and demande_acte.id_type_acte = :id_type_acte";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":id_citoyen", $id_citoyen);
    $stmt->bindParam(":id_type_acte", $id_type_acte);
    $stmt->execute();
    return $stmt->fetchColumn();
}

function listDossierForSuivi($id_citoyen){
    $sql = "select 
            distinct demande_acte.id_demande,
            DATE_FORMAT(demande_acte.date_creation, '%d/%m/%Y %H:%i:%s') AS date_creation,
            type_acte.libele,
            demande_acte.nom,
            demande_acte.prenom,
            demande_acte.statut,
            type_acte.montant
            from demande_acte 
            inner join type_acte on type_acte.id_type_acte = demande_acte.id_type_acte 
            where 
            demande_acte.id_citoyen = :id_citoyen 
            order by demande_acte.id_demande desc; ";

    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(":id_citoyen", $id_citoyen);
    $stmt->execute();
    return $stmt->fetchAll();
}

function getDossierById($id_demande, $id_citoyen) {
    $conn = Database::getConnection();

    $sql = "
        SELECT 
            da.id_demande AS id,
            da.id_citoyen,
            da.statut,
            DATE_FORMAT(da.date_creation, '%d/%m/%Y %H:%i:%s') AS date_demande,
            da.id_type_acte,
            ta.libele,
            da.nom,
            da.prenom,
            da.numero_registre,
            da.lieu_naissance,
            da.nom_pere AS nom_pere,
            da.prenom_pere AS prenom_pere,
            da.nom_mere AS nom_mere,
            da.prenom_mere AS prenom_mere
        FROM demande_acte da
        INNER JOIN type_acte ta ON ta.id_type_acte = da.id_type_acte
        WHERE da.id_demande = :id AND da.id_citoyen = :id_citoyen
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        'id' => $id_demande,
        'id_citoyen' => $id_citoyen
    ]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function changerStatus($id, $status){
    $sql = "UPDATE demande_acte SET statut = :statut WHERE id_demande = :id_demande";
    $stmt = Database::getConnection()->prepare($sql);
    $stmt->bindParam(':id_demande', $id);
    $stmt->bindParam(':statut', $status);
    return $stmt->execute(); // pas de fetch
}



function countByTypeActe() {
    $conn = Database::getConnection();

    $sql = "select 
        type_.libele as name,
        count( demande_acte.id_demande ) as y
    from (
        select distinct type_acte.libele, type_acte.id_type_acte from type_acte
    ) as type_
    left join demande_acte on ( demande_acte.id_type_acte = type_.id_type_acte )
    group by type_.libele ";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function countByTypeActeAvecUtilisateur($utilisateur) {
    $conn = Database::getConnection();

    $sql = "select 
        type_.libele as name,
        count( demande_acte.id_demande ) as y
    from (
        select distinct type_acte.libele, type_acte.id_type_acte from type_acte
    ) as type_
    left join demande_acte on ( demande_acte.id_type_acte = type_.id_type_acte and demande_acte.id_agent = :id_agent )
    group by type_.libele ";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id_agent', $utilisateur);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>