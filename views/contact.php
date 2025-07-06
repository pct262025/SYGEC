<?php 
session_start();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/contact.css">
    <link rel="stylesheet" href="assets/css/menu.css">
    <link rel="stylesheet" href="assets/css/footer.css">
    
    <link rel="stylesheet" href="assets/css/style.css">

</head>
<body>

<?php 
require_once 'views/menu.php'; 
?>

    <main class="main-content">
        <div class="container">
            <h1 class="page-title">Contactez-nous</h1>
            <p class="intro-text">Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question, assistance ou information.</p>

            <div class="contact-section">
                <div class="card contact-form-card">
                    <form class="contact-form">
                        <div class="form-group">
                            <label for="fullName">Nom Complet</label>
                            <input type="text" id="fullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Adresse E-mail</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Sujet</label>
                            <select id="subject" name="subject" required>
                                <option value="">Sélectionnez un sujet</option>
                                <option value="information">Demande d'informations</option>
                                <option value="tech-support">Support technique</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="message">Votre Message</label>
                            <textarea id="message" name="message" rows="6" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary form-submit-btn">Envoyer le message</button>
                    </form>
                </div>

                <div class="card contact-info-card">
                    <h2>Informations de Contact Directes</h2>
                    <p><strong>Téléphone:</strong> +225 07 04 02 56 89</p>
                    <p><strong>E-mail:</strong> contact@etats-civils-yamoussoukro.ci</p>
                    <p><strong>Adresse:</strong>  Bureau d'État Civil de Yamoussoukro</p>
                    <h3>Horaires d'Ouverture</h3>
                    <p>Du lundi au vendredi : 08h00 - 17h00</p>
                    <p>Samedi : 09h00 - 12h00</p>
                </div>
            </div>
        </div>
    </main>

<?php require_once 'views/footer.php'; ?>

</body>
</html>