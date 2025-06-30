<?php 
session_start();
// var_dump($_SESSION);

require_once "models/DemandeActe.php";

$countByTypeActe = [];
if ( isset( $_SESSION["id_role"] ) && isset( $_SESSION["id"] ) && $_SESSION["id_role"] = 1 ){
    $countByTypeActe = countByTypeActeAvecUtilisateur($_SESSION["id_role"]);
} else{
    
    $countByTypeActe = countByTypeActe();
}
// var_dump( $countByTypeActe );

$nbrTotalDemande = 0;
$acteMar = 0;
$ActeNais = 0;
$certi = 0;



foreach($countByTypeActe as $count ){
    // var_dump($count);
    if ( $count['name'] == 'Acte de mariage' ){
        $acteMar = $count['y'];
        $nbrTotalDemande += $count['y'];
    }
    if ( $count['name'] == 'Acte de naissance' ){
        $ActeNais = $count['y'];
        $nbrTotalDemande += $count['y'];
    }
    if ( $count['name'] == 'Certificat de nationnalité' ){
        $certi = $count['y'];
        $nbrTotalDemande += $count['y'];
    }
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>


    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/menu.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <script src="assets/highchart/code/highcharts.js"></script>
    <script src="assets/highchart/code/modules/data.js"></script>
    <script src="assets/highchart/code/modules/drilldown.js"></script>
    <script src="assets/highchart/code/modules/exporting.js"></script>
    <script src="assets/highchart/code/modules/export-data.js"></script>
    <script src="assets/highchart/code/modules/accessibility.js"></script>
    <script src="assets/highchart/code/themes/adaptive.js"></script>

    <style>
        /* div{
            border: 1px solid #555;
        } */

        .border-radius{
            border-radius: 10px;
        }
        .bg-color-35168A{
            background-color: #35168A;
        }
        .bg-color-body{
          background-color:  #f5f5f5;
        }
        .bg-color-white{
          background-color:  #fff;
        }

        .color-white{
            color: #fff;
        }

        .font-size-50{
            font-size: 50px;
        }

        .height-400px{
            height: 300px;
        }
        .height-200px{
            height: 200px;
        }
        .min-height-70{
            min-height: 70vh;
        }
        
        .display-inline-block{
            display: inline-block;
        }

        .min-width-80{
            min-width: 80%;
        }
        .ombre{
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        }
        .p-0{
            padding: 0;
        }
    </style>
</head>
<body>
    
<?php 
require_once 'views/menu.php'; 
?>

<div class="bg-color-body">
    <div class=" container min-height-70">
        <div class="row">
            <div class="col-10 offset-1">
                <!-- start les kpis de count -->
                <div class="row mt-3">
                    <!-- <h1 class="mt-5 mb-5">Indicateurs de performances</h1> -->
                    <div class="col mt-3 text-center">
                        <div class="pt-3 min-width-80 height-200px border-radius ombre bg-color-35168A color-white">
                            <h6 class="mt-3 mb-3">Total demandes</h6>
                            <span class="mt-3 display-inline-block font-size-50"> <?php echo $nbrTotalDemande; ?> </span>
                        </div>
                    </div>
                    <div class="col mt-3 text-center">
                        <div class="pt-3 min-width-80 height-200px border-radius ombre bg-color-white">
                            <h6 class="mt-3 mb-3">Total actes naissances</h6>
                            <span class="mt-3 display-inline-block font-size-50"> <?php echo $ActeNais; ?> </span>
                        </div>
                    </div>
                    <div class="col mt-3 text-center">
                        <div class="pt-3 min-width-80 height-200px border-radius ombre bg-color-white">
                            <h6 class="mt-3 mb-3">Total actes mariages</h6>
                            <span class="mt-3 display-inline-block font-size-50"> <?php echo $acteMar; ?> </span>
                        </div>
                    </div>
                    <div class="col mt-3 text-center">
                        <div class="pt-3 min-width-80 height-200px border-radius ombre bg-color-white">
                            <h6 class="mt-3 mb-3">Total certificats nationnalités</h6>
                            <span class="mt-3 display-inline-block font-size-50"> <?php echo $certi; ?> </span>
                        </div>
                    </div>
                </div>
                <!-- end les kpis de count -->

                <!-- autre -->
                <div class="row mt-5">
                    <div class="col-6 mb-5  " >
                        <div class=" height-400px border-radius ombre " id="actes-naissances" ></div>
                    </div>
                    <div class="col-6 mb-5  "> 
                        <div class="height-400px border-radius ombre" id="actes-mar"></div>
                    </div>
                    <div class="col-6 mb-5 " > 
                        <div class=" height-400px border-radius ombre" id="certi"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once 'views/footer.php'; ?>


<script>

    function bar_grafique(id, titre, datas){
        Highcharts.chart(id, {
            exporting: {
                enabled: false // 👈 Ceci supprime le bouton d'exportation
            },
            chart: {
                type: 'column',
                backgroundColor: '#fcfcfc'
            },
            title: {
                text: titre,
                style: {
                    color: '#000000' // titre en noir
                }
            },
            accessibility: {
                announceNewData: {
                    enabled: true
                }
            },
            xAxis: {
                type: 'category',
                style: {
                    color: '#000000' // titre en noir
                }
            },
            yAxis: {
                gridLineWidth: 0.5,  
                gridLineColor: 'rgba(0,0,0,0.3)'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f} '
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                    '<b>{point.y:.2f} </b> <br/>'
            },
            series: [
                {
                    name: 'Browsers',
                    colorByPoint: true,
                    data: datas
                }
            ],
            drilldown: {
                breadcrumbs: {
                    enabled: false,
                    // position: {
                    //     align: 'left'
                    // },
                    // buttonTheme: {
                    //     fill: '#fff',
                    //     stroke: '#000'
                    // }
                },
                series: [
                    
                ]
            }
        });
    }

    function callApi(id, titre, id_type_intervention){
        const id_role = <?= json_encode($_SESSION['id_role'] ?? null) ?>;
        const id_utilisateur = <?= json_encode($_SESSION['id'] ?? null) ?>;
        const endUrl = id_role != 1 ? `&id_agent=${id_utilisateur}`: "";

        fetch(`models/api/kpi.php?id_type_acte=${id_type_intervention}${endUrl}`) // URL de ton API
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur HTTP : ' + response.status);
            }
            return response.json(); // Conversion en JSON
        })
        .then(datas => {
            console.log(datas); // Affichage des données JSON
            bar_grafique(id, titre, datas);
            
            // Exemple d'utilisation : affichage de noms
            // data.forEach(utilisateur => {
            // console.log(utilisateur.nom);
            // });
        })
        .catch(error => {
            console.error('Erreur lors du fetch :', error);
        });
    }

    callApi("actes-naissances", "Actes de naissances par status", 1);
    callApi("actes-mar", "Actes de mariage par status", 3);
    callApi("certi", "Certificat de nationnlité par status", 2);

</script>

</body>
</html>