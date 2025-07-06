
<?php 

$admin = isset( $_SESSION['id_role'] ) ? true : false;

?>


<header class="header">
    <nav class="nav n1">
        <div class="logo">
            <img src="assets/img/logo.png" alt="">
        </div>

        <ul>
            <?php if ( $admin ) { ?>
                <li><a class="dashboard" href="#">Dashboard</a></li>
                <li><a href="#" class="contact">Contacts</a></li>
                <li><a class="traiterDemande" href="#?action=traiterDemande">Administration</a></li>
            <?php } ?>

            
            <?php if ( !$admin ) { ?>
                <li><a class="accueil" href="#?action=accueil">Acceuil</a></li>
                <li><a href="#" class="demande">Demande d'Actes</a></li>
                <li><a href="#" class="suivi">Suivi</a></li>
                <li><a href="#" class="contact">Contacts</a></li>
            <?php } ?>
            
        </ul>
        <div class="user">
<?php  ?> 
<?php
if ( isset($_SESSION['nom']) ){
    echo $_SESSION['nom']." ".$_SESSION['prenom']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
    if ( isset($_SESSION["id"]) ){
?> 
                <a href="#" class="deconnexion">Deconnexion</a>
<?php
    }else if (!$admin){
?>
                <a href="#" class="connect">Connexion</a>
                <a href="#" class="inscript">Inscription</a>
<?php
    }
?>
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
                <!-- <li><a href="#">Declaration d'Actes</a></li> -->
                <li><a href="#">Suivi</a></li>
                <!-- <a href="index.php?action=paiement">Paiement</a> -->
                <li><a href="#">Contacts</a></li>
                <li><a href="#">Administration</a></li>
            </ul>
            <div class="user">
<?php  ?> 
<?php
    if ( isset($_SESSION["id"]) ){
?> 
                <a href="#" class="deconnexion">Inscription</a>
<?php
    }else{
?>
                <a href="#" class="connect">Connexion</a>
                <a href="#" class="inscript">Inscription</a>
<?php
    }
?>
            </div>
        </div>
    </nav>
</header>

<script>
if ( document.querySelector('.connect') != null ){
    document.querySelector('.connect').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'login');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });

}

if ( document.querySelector('.inscript') != null ){
    document.querySelector('.inscript').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'register');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

if ( document.querySelector('.paiement') != null ){
    document.querySelector('.paiement').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'paiement');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

if ( document.querySelector('.traiterDemande') != null ){
    document.querySelector('.traiterDemande').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'traiterDemande');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

if ( document.querySelector('.accueil') != null ){
    document.querySelector('.accueil').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'accueil');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}


if ( document.querySelector('.suivi') != null ){
    document.querySelector('.suivi').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'suivi');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

if ( document.querySelector('.demande') != null ){
    document.querySelector('.demande').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'demande');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

if ( document.querySelector('.dashboard') != null ){
    document.querySelector('.dashboard').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'dashboard');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}

const deconnexion_items = document.querySelectorAll('.deconnexion');
if ( deconnexion_items.length > 0 ){
        deconnexion_items.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche la navigation immédiate
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // Remplace ou ajoute 'action=login'
            params.set('action', 'deconnexion');
            // Reconstruit l'URL avec les nouveaux paramètres
            url.search = params.toString();
            // Redirige vers la nouvelle URL
            window.location.href = url.toString();
        });
    });
}


if ( document.querySelector('.contact') != null ){
    document.querySelector('.contact').addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation immédiate
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        // Remplace ou ajoute 'action=login'
        params.set('action', 'contact');
        // Reconstruit l'URL avec les nouveaux paramètres
        url.search = params.toString();
        // Redirige vers la nouvelle URL
        window.location.href = url.toString();
    });
}


</script>