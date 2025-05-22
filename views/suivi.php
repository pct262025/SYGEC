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

    <!-- <main class="main">

        <div class="cards-group">
            <a href="">
                <div class="card">
                    <div class="title">Nombre d'acte de naissance déclaré </div>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Nbre de certificat de mariage déclaré</div>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Demande de certificat de décés</div>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>
        </div>

        <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-10">📋 Tableau de Suivi des Actes Civils</h1>

        <div class="containers  ">       
            
            <table class="table border-radius mt-5 ">
                <thead class=" text-white">
                    <tr class="bg-success border-top-left-radius-10 border-top-right-radius-10">
                        <th class="">Date de déclaration</th>
                        <th class="">Type d’acte</th>
                        <th class="">Nom</th>
                        <th class="">Prénom</th>
                        <th class="">Statut</th>
                        <th class="">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr class="hover:bg-gray-50">
                        <td class="col">02-02-2025</td>
                        <td class="col">Certificat de mariage</td>
                        <td class="col-1">Ousou</td>
                        <td class="col-3">Benedicte</td>
                        <td class="col">
                            <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">En attente</span>
                        </td>
                        <td class="col-2">
                            <a href="#" class="inline-flex items-center bg-gray-500 text-white px-3 py-1.5 rounded hover:bg-gray-600 transition">
                                📥 Télécharger
                            </a>
                        </td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                        <td class="">02-03-2025</td>
                        <td class="">Certificat de décès</td>
                        <td class="">Koné</td>
                        <td class="">Mille</td>
                        <td class="">
                            <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Généré</span>
                        </td>
                        <td class="">
                            <a href="#" class="inline-flex items-center bg-gray-500 text-white px-3 py-1.5 rounded hover:bg-gray-600 transition">
                                📥 Télécharger
                            </a>
                        </td>
                    </tr>
                    <tr class="hover:bg-gray-50">
                        <td class="">02-05-2025</td>
                        <td class="">Acte de naissance</td>
                        <td class="">Nidé</td>
                        <td class="">Béatrice</td>
                        <td class="">
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">Payé</span>
                        </td>
                        <td class="">
                            <a href="#" class="inline-flex items-center bg-primary text-white px-3 py-1.5 rounded hover:bg-green-700 transition">
                                📥 Télécharger
                            </a>
                    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </main> -->

<?php 
require_once "views/footer.php";
?>


</body>
</html>