<?php 

session_start();
header('Content-Type: application/json');
require_once '../../config/database.php';

$sql1="select 
        statut.statut as name,
        count( demande_acte.id_demande ) as y
    from (
        select distinct statut.libelle as statut from statut
    ) as statut
    left join demande_acte on ( demande_acte.statut = statut.statut and demande_acte.id_type_acte = :id_type_acte )
    group by statut.statut;";

$sql2="select 
        statut.statut as name,
        count( demande_acte.id_demande ) as y
    from (
        select distinct statut.libelle as statut from statut 
    ) as statut
    left join demande_acte on ( demande_acte.statut = statut.statut and demande_acte.id_type_acte = :id_type_acte and demande_acte.id_agent = :id_agent )
    group by statut.statut;";

$sql = !isset($_GET["id_agent"]) ? $sql1 : $sql2;
$stmt = Database::getConnection()->prepare($sql);

$stmt->bindParam(":id_type_acte", $_GET["id_type_acte"]);
if ( isset($_GET["id_agent"]) ){
    $stmt->bindParam(":id_agent", $_GET["id_agent"]);
}

$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>