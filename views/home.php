<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Système de Gestion des Etats Civils de Yamoussoukro </title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

    <?php require_once 'menu.php'; ?>



    <main class="main">
        <div class="head">
            <div class="text">
                <h1><span class="cl">Bienvenue</span> sur votre plateforme de gestion des états civils</h1>
                <span class="com">COMMUNE DE YAMOUSSOUKRO</span>
            </div>
        </div>

        <div class="etat-civil-container">
            <i class="fas fa-id-card icon"></i>
            <div class="title">Gérez vos démarches d’état civil en toute simplicité !</div>
            <div class="text">
                Déclarez une naissance, demandez un acte de mariage ou un extrait de décès…<br>
                Faites tout ici, en ligne, rapidement et en toute sécurité.
            </div>
        </div>

        <div class="cards-group">
            <a href="">
                <div class="card">
                    <div class="title">Faites une demande</div>
                    <i class="fas fa-clipboard icon"></i>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Suivez votre demande </div>
                    <i class="fas fa-tasks icon"></i>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>

            <a href="">
                <div class="card">
                    <div class="title">Télécharger votre acte civil</div>
                    <i class="fas fa-download icon"></i>
                    <i class="fas fa-arrow-right arrow"></i>
                </div>
            </a>
        </div>


    </main>


    <?php require_once 'footer.php'; ?>




</body>
<script>
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.n2');

    burger.addEventListener('click', () => {
        nav.classList.toggle('open');

        // Toggle the icon (☰ ↔ ✖)
        if (nav.classList.contains('open')) {
            burger.textContent = '✖';
        } else {
            burger.textContent = '☰';
        }
    });
</script>

</html>
