

<header class="header">
    <nav class="nav n1">
        <div class="logo">
            <img src="assets/img/logo.png" alt="">
        </div>
        <ul>
            <li><a class="accueil" href="#?action=accueil">Acceuil</a></li>
            <li><a href="#">Demande d'Actes</a></li>
            <li><a href="#">Declaration d'Actes</a></li>
            <li><a href="#" class="suivi">Suivi</a></li>
            <li>
                <a href="#?action=paiement" class="paiement">Paiement</a>
            </li>
            <li><a href="#">Contacts</a></li>
            <li><a class="traiterDemande" href="#?action=traiterDemande">Administration</a></li>
        </ul>
        <div class="user">
            <a href="#?action=login" class="connect">Connexion</a>
            <a href="#?action=register" class="inscript">Inscription</a>
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
                <li><a href="#">Administration</a></li>
            </ul>
            <div class="user">
                <a href="#" class="connect">Connexion</a>
                <a href="#" class="inscript">Inscription</a>
            </div>
        </div>
    </nav>
</header>

<script>
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
</script>