<?php 
session_start();
require_once 'models/DemandeActe.php';
// start si l'utilisateur n'est pas connecté, on le redirige vers la connexions
if ( !isset($_SESSION["id"]) ){
    header("Refresh: 0; url=" . strtok($_SERVER["PHP_SELF"], '?') . "?action=login&retour=suivi");
    die ();
}
// start si l'utilisateur n'est pas connecté, on le redirige vers la connexions

$listDossierForSuivi = listDossierForSuivi($_SESSION["id"]);

// function getAction($status, $dossierId){
//     if ( $status == "En attente de paiement" ){
//         return "<a href=\"#\" class=\"btn btn-warning faire-paiement\" dossier=\"".$dossierId."\" > \n" .
//                 "  Faire le paiement\n" .
//                 " </a>";
//     }
//     if ( $status == "Payé" ){
//         return "<a href=\"#\" class=\"btn btn-success telecharger \" dossier=\"".$dossierId."\" >  \n" .
//                 "  📥 Télécharger\n" .
//                 " </a>";
//     }
//     return "";
// }
// Paramètres de pagination
$parPage = 5;
$total = count($listDossierForSuivi);
$pageCourante = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$debut = ($pageCourante - 1) * $parPage;
$dossiersPage = array_slice($listDossierForSuivi, $debut, $parPage);
$nbPages = ceil($total / $parPage);

function getAction($status, $dossierId, $typeActe, $montant){
    if ($status == "En attente de paiement") {
        return "<a href=\"#\" class=\"btn btn-warning faire-paiement\" dossier=\"".$dossierId."\" montant=\"".$montant."\" >
                  Faire le paiement
                </a>";
    }

    if ($status == "Payé") {
        if ($typeActe == "Acte de naissance") {
            return '<a href="index.php?action=telechargerCertificatNaissance&id_demande='.$dossierId.'" 
                      class="btn btn-success" title="Télécharger Certificat de Naissance">
                      <i class="fas fa-download"></i> Télécharger
                    </a>';
        } elseif ($typeActe == "Acte de mariage") {
            return '<a href="index.php?action=telechargerActeMariage&id_demande='.$dossierId.'" 
                      class="btn btn-success" title="Télécharger Acte de Mariage">
                      <i class="fas fa-download"></i> Télécharger
                    </a>';
        } else {
            return '<a href="index.php?action=telechargerPDF&id_demande='.$dossierId.'" 
                      class="btn btn-success" title="Télécharger PDF">
                      <i class="fas fa-download"></i> Télécharger
                    </a>';
        }
    }

    return "";
}

?>

<!DOCTYPE html>
<html lang="en">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                colors: {
                    primary: '#16a34a', // vert Tailwind
                }
                }
            }
        }
    </script> -->

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/menu.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/tableau_bord.css">

    
    
</head>
<body>
    
<?php 
require_once 'views/menu.php'; 
?>

    <main class="main">

        <div class="cards-group">
            <a href="">
                <div class="card">
                    <div class="title">Nombre d'acte de naissance déclaré </div>
                    <h1> <?php echo nbrDossier($_SESSION["id"], 1); ?> </h1>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Nombre de certificat de nationalité déclaré</div>
                    <h1> <?php echo nbrDossier($_SESSION["id"], 2); ?> </h1>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Nombre d'acte de mariage déclaré</div>
                    <h1> <?php echo nbrDossier($_SESSION["id"], 3); ?> </h1>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>
        </div>

        <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-10">📋 Tableau de Suivi des Actes Civils</h1>
<?php 
if ( empty($listDossierForSuivi) ){
?>
        <div class="container">
            <div class="row">
                <div class="offset-3 col-6 mt-5">
                    <h4 class="text-center">Oups, aucune donnée</h4>
                    <img class="img-fluid" src="assets/img/marquer_liste_vide.png" alt="liste_vide">
                </div>
            </div>
        </div>
<?php 
}else {

?>
            <!--  BARRE DE RECHERCHE -->
                   <div class="container mt-4">
                       <div class="row justify-content-center">
                          <div class="col-md-6">
                            <input type="text" id="searchInput" class="form-control" placeholder="🔍 Rechercher...">
                         </div>
                        </div>
                 </div>

                 <div class="container mt-4">
        <table id="suivie-table" class="table table-bordered table-hover">
            <thead class="table-success text-white">
                    <tr>
                        <th class="col"> <span class="btn text-white">Date de déclaration</span> </th>
                        <th class="col"> <span class="btn text-white">Type d’acte</span> </th>
                        <th class="col"> <span class="btn text-white">Montant</span> </th>
                        <th class="col-1"> <span class="btn text-white">Nom</span> </th>
                        <th class="col-2"> <span class="btn text-white">Prénom</span> </th>
                        <th class="col"> <span class="btn text-white">Statut</span> </th>
                        <th class="col-2"> <span class="btn text-white">Action</span> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">

<?php

    foreach ($listDossierForSuivi as $dossierForSuivi){
?>
                    <tr class="">
                        <td class="col"> <span class="btn"> <?php echo $dossierForSuivi['date_creation'] != null ? date('d/m/Y H:i:s', strtotime($dossierForSuivi['date_creation'])) : ""; ?> </span> </td>
                        <td class="col"> <span class="btn"> <?php echo $dossierForSuivi['libele'] != null ? $dossierForSuivi['libele'] : ""; ?> </span> </td>
                        <td class="col"> <span class="btn"> <?php echo $dossierForSuivi['montant'] != null ? $dossierForSuivi['montant']." fr" : ""; ?> </span> </td>
                        <td class="col-1"> <span class="btn"> <?php echo $dossierForSuivi['nom'] != null ? $dossierForSuivi['nom'] : ""; ?> </span> </td>
                        <td class="col-2"> <span class="btn"> <?php echo $dossierForSuivi['prenom'] != null ? $dossierForSuivi['prenom'] : ""; ?> </span> </td>
                        <td class="col">
                            <span class="btn  <?php echo $dossierForSuivi['statut'] == 'Rejeter' ? 'bg-danger text-white' : 'bg-light'; ?> "> <?php echo $dossierForSuivi['statut'] != null ? $dossierForSuivi['statut'] : ""; ?> </span>
                        </td>
                        <td class="col-2">
                            <?php // echo getAction($dossierForSuivi['statut'], $dossierForSuivi['id_demande']); ?>
                            <?php echo getAction($dossierForSuivi['statut'], $dossierForSuivi['id_demande'], $dossierForSuivi['libele'], $dossierForSuivi['montant']); ?>
                        </td>
                    </tr>
<?php 
    }
?>
                    
                </tbody>
            </table>
        </div>
          <!-- ✅ PAGINATION -->
    <div class="text-center mb-5">
        <nav>
            <ul class="pagination justify-content-center">
                <?php if ($pageCourante > 1): ?>
                    <li class="page-item">
                        <a class="page-link" href="?action=suivi&page=<?= $pageCourante - 1; ?>">Précédent</a>
                    </li>
                <?php endif; ?>
                <?php for ($i = 1; $i <= $nbPages; $i++): ?>
                    <li class="page-item <?= $i == $pageCourante ? 'active' : ''; ?>">
                        <a class="page-link" href="?action=suivi&page=<?= $i; ?>"><?= $i; ?></a>
                    </li>
                <?php endfor; ?>
                <?php if ($pageCourante < $nbPages): ?>
                    <li class="page-item">
                        <a class="page-link" href="?action=suivi&page=<?= $pageCourante + 1; ?>">Suivant</a>
                    </li>
                <?php endif; ?>
            </ul>
        </nav>
    </div>


<?php 
}
?>
    </main>

<?php 
require_once "views/footer.php";
?>


<script>
    const paiement_items = document.querySelectorAll('.faire-paiement');
    paiement_items.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate

            const id_demande = this.getAttribute('dossier');
            const montant = this.getAttribute('montant');

            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'paiement');
            params.set('id_demande', id_demande);
            params.set('montant', montant);
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });
    });
    // Filtrage du tableau avec la recherche
document.getElementById('searchInput').addEventListener('keyup', function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#suivie-table tbody tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});
</script>

</body>
</html>