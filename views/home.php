<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Système de Gestion des Etats Civils de Yamoussoukro </title>
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

    <?php require_once 'menu.php'; ?>

    <!-- <header class="header">
        <nav class="nav n1">
            <div class="logo">
                <img src="assets/img/logo.png" alt="">
            </div>
            <ul>
                <li><a href="#">Acceuil</a></li>
                <li><a href="#">Demande d'Actes</a></li>
                <li><a href="#">Declaration d'Actes</a></li>
                <li><a href="#">Suivi</a></li>
                <a href="index.php?action=paiement">Paiement</a>
                <li><a href="#">Contacts</a></li>
            </ul>
            <div class="user">
                <a href="login.php?action=login" class="connect">Connexion</a>
                <a href="register.php?action=register" class="inscript">Inscription</a>
            </div>
        </nav>
        <nav class="nav n2">
            <div class="logo">
                <img src="assets/img/logo.png" alt="">
            </div>

            <div class="burger-menu">☰</div>

            <div class="side-menu">
                <ul class="nav-links">
                    <li><a href="#">Acceuil</a></li>
                    <li><a href="#">Demande d'Actes</a></li>
                    <li><a href="#">Declaration d'Actes</a></li>
                    <li><a href="#">Suivi</a></li>
                    <a href="index.php?action=paiement">Paiement</a>
                    <li><a href="#">Contacts</a></li>
                </ul>
                <div class="user">
                    <a href="#" class="connect">Connexion</a>
                    <a href="#" class="inscript">Inscription</a>
                </div>
            </div>
        </nav>
    </header> -->

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

    <!-- <footer class="footer">
        <div class="logo">
            <img src="assets/img/logo.png" alt="">
            <h4>Système de Gestion des Etats Civils de Yamoussoukro</h4>
        </div>

        <p class="desc">
            Une plateforme simple et sécurisée pour toutes vos démarches d’état civil, accessible partout, à tout
            moment.
        </p>


        <div class="links">
            <a href="#">Mentions légales</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Contact</a>
        </div>

        <p class="copy">&copy; 2025 Plateforme État Civil. Tous droits réservés.</p>
    </footer> -->
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
