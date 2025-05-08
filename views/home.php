<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Système de Gestion des Etats Civil - District de Yamoussoukro</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: green;
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo-gauche, .logo-droite {
            height: 60px;
        }

        header h1 {
            font-size: 26px;
            margin: 0;
            flex: 1;
            text-align: center;
        }

        nav {
            background-color: #eee;
            padding: 10px 20px;
            display: flex;
            justify-content: center;
            gap: 30px;
            position: relative;
        }

        nav a {
            text-decoration: none;
            color: #005a87;
            font-weight: bold;
            position: relative;
        }

        nav a:hover {
            text-decoration: underline;
        }

        .dropdown {
            position: relative;
        }

        .dropdown-toggle {
            text-decoration: none;
            color: #005a87;
            font-weight: bold;
            cursor: pointer;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: white;
            min-width: 180px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown-content a {
            display: block;
            padding: 10px;
            color: #005a87;
            text-decoration: none;
        }

        .dropdown-content a:hover {
            background-color: #f0f0f0;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        main {
            padding: 40px 20px;
            text-align: center;
        }

        main h2 {
            font-size: 22px;
            color: #005a87;
        }

        main p {
            font-size: 16px;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
        }
        /* SILDER LE PASSAGE DES IMAGE  */
        .slider {
    position: relative;
    max-width: 100%;
    margin: 30px auto;
    overflow: hidden;
}

.slides {
    display: flex;
    height: 500px;
}

.slide {
    min-width: 100%;
    display: none;
    object-fit: cover;
}

.slide.active {
    display: block;
}

.dots {
    text-align: center;
    margin-top: 10px;
}

.dot {
    height: 12px;
    width: 12px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s;
    cursor: pointer;
}

.dot.active {
    background-color: #005a87;
}
/* PIED DE PAGE */
footer {
    background-color: green;
    color: white;
    padding: 30px 20px;
    margin-top: 40px;
}

.footer-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.footer-section {
    flex: 1;
    min-width: 250px;
    margin: 10px;
}

.footer-section h3 {
    border-bottom: 2px solid white;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section li {
    margin-bottom: 8px;
}
/* BOUTON SE CONNECTER */
.login-container {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    background-color: #f4f6f9; /* même couleur que le fond */
}

.login-container {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    background-color:#eee;
}

.login-button {
    background-color: orange;
    color: #005A87;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: bold;
    text-decoration: none;
    font-size: 16px;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: darkorange;
}


    </style>
</head>
<body>

<header>
    <img src="assets/img/logo_yakro.png" alt="Logo de la mairie" class="logo-gauche">
    <h1>SYSTEME DE GESTION D'ETATS CIVIL - YAMOUSSOUKRO</h1>
    <img src="assets/img/embleme_ci.png" alt="Image à droite" class="logo-droite">
</header>
<nav>
    <!-- <a href="index.php?action=inscription">Inscription Citoyen</a> -->

    <div class="dropdown">
        <a class="dropdown-toggle">Demande d’acte ▾</a>
        <div class="dropdown-content">
            <a href="index.php?action=demande&type=naissance">Acte de naissance</a>
            <a href="index.php?action=demande&type=mariage">Acte de mariage</a>
            <a href="index.php?action=demande&type=deces">Acte de décès</a>
        </div>
    </div>
    <div class="dropdown">
        <a class="dropdown-toggle">Declaration d'acte ▾</a>
        <div class="dropdown-content">
            <a href="index.php?action=demande&type=naissance">Déclaration de Naissance</a>
            <a href="index.php?action=demande&type=mariage">Déclaration de mariage</a>
            <a href="index.php?action=demande&type=deces">Déclaration de décès</a>
        </div>
    </div>
    <a href="#">Tarifs</a>
    <a href="#">Contacts</a>

    <div class="login-container">
    <a href="index.php?action=inscription" class="login-button">
        <i class="fas fa-arrow-right"></i> Se connecter
    </a>
    </div>
</div>
</nav>

<main>
    <h2>Demandez vos actes d'état civil en ligne</h2>
    <p>Faites vos demandes d'actes de naissance, de mariage ou de décès en ligne, payez les frais de timbre et recevez vos documents signés numériquement.</p>
</main>
<div class="slider">
    <div class="slides">
        <img src="assets/img/slide1.jpg" alt="Image 1" class="slide active">
        <img src="assets/img/slide4.jpg" alt="Image 2" class="slide">
        <img src="assets/img/slide5.jpg" alt="Image 3" class="slide">
        <img src="assets/img/slide2.jpg" alt="Image 4" class="slide">
    </div>
    <div class="dots">
        <span class="dot active" onclick="goToSlide(0)"></span>
        <span class="dot" onclick="goToSlide(1)"></span>
        <span class="dot" onclick="goToSlide(2)"></span>
        <span class="dot" onclick="goToSlide(3)"></span>
    </div>
</div>
<!-- CREATION DE NOS SERVICES -->
<section style="padding: 40px 20px; background-color: #fff;">
    <h2 style="text-align: center; color: #005a87;">Nos services principaux</h2>
    <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; margin-top: 30px;">
        <article style="width: 250px; background: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
            <img src="assets/img/article1.jpg" alt="Naissance" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px;">
            <h3>Déclaration d'acte</h3>
            <!-- <p>Enregistrez les naissances de vos enfants rapidement et simplement.</p> -->
        </article>
        <article style="width: 250px; background: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
            <img src="assets/img/article2.jpg" alt="Mariage" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px;">
            <h3>Demande d'acte</h3>
            <!-- <p>Faites votre demande d’acte de mariage sans vous déplacer.</p> -->
        </article>
        <article style="width: 250px; background: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
            <img src="assets/img/maire_yakro.jpg" alt="Décès" style="width: 100%; height: 270px; object-fit: cover; border-radius: 6px;">
            <h3>Comment faire les demandes</h3>
            <a href="#">Détails</a>
            <!-- <p>Réalisez la déclaration d’un décès en ligne, rapidement et en toute sécurité.</p> -->
        </article>
        <!-- <article style="width: 250px; background: #f9f9f9; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center;">
            <img src="assets/img/article4.jpg" alt="Demande d'actes" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px;">
            <h3>Comment faire les demandes</h3>
            <!-- <p>Commandez vos actes d’état civil en quelques clics, où que vous soyez.</p> -->
        </article> -->
    </div>
    
</section>

<footer>
    <div class="footer-container">
        <div class="footer-section">
            <h3>Services</h3>
            <ul>
                <li>Déclaration de naissance</li>
                <li>Déclaration de mariage</li>
                <li>Déclaration de décès</li>
                <li>Demande d'actes</li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Contact</h3>
            <ul>
                <li>Téléphone : +225 01 23 45 67 89</li>
                <li>Email : contact@etatcivil.ci</li>
                <li>Adresse : Hôtel de Ville, Yakro, Côte d'Ivoire</li>
            </ul>
        </div>
    </div>
</footer>
</body>
</html>
<!-- script pour le passage de l'image sur la page  -->
<script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function goToSlide(index) {
        showSlide(index);
    }

    // Auto change every 5 seconds
    setInterval(() => {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, 5000);

    // Initial call
    showSlide(currentSlide);
</script>
