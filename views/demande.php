<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Demande d'acte civil</title>
    <link rel="stylesheet" href="assets/css/demande.css">
</head>
<body>
<div class="form-container">
    <form id="multiStepForm">
        <div class="progress-bar">
            <div class="step active">1</div>
            <div class="step">2</div>
            <div class="step">3</div>
        </div>

        <!-- Étape 1 -->
        <div class="form-step active">
            <h2>Type d'acte & Identité</h2>
            <div class="form-row">
                <div class="form-group">
                    <label>Type d'acte</label>
                    <select id="acteType" required>
                        <option value="" disabled selected>Choix du type d'acte</option>
                        <option value="naissance">Acte de naissance</option>
                        <option value="mariage">Acte de mariage</option>
                        <option value="deces">Acte de décès</option>
                        <option value="divorce">Acte de divorce</option>

                    </select>
                </div>

                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" id="nom" required/>
                </div>

                <div class="form-group">
                    <label>Prénoms</label>
                    <input type="text" id="prenom" required/>
                </div>

                <div class="form-group">
                    <label>Date de naissance</label>
                    <input type="date" id="dateNaissance" required/>
                </div>


                <div id="mariageFields" class="hidden">
                    <div class="form-group">
                        <label>Nom du conjoint</label>
                        <input type="text" id="nomConjoint"/>
                    </div>
                    <div class="form-group">
                        <label>Date du mariage</label>
                        <input type="date" id="dateMariage"/>
                    </div>
                </div>

                <div id="decesFields" class="hidden">
                    <div class="form-group">
                        <label>Lieu du décès</label>
                        <input type="text" id="lieuDeces"/>
                    </div>
                    <div class="form-group">
                        <label>Date du décès</label>
                        <input type="date" id="dateDeces"/>
                    </div>
                </div>
            </div>
            <button type="button" class="next">Suivant</button>
        </div>

        <!-- Étape 2 -->
        <div class="form-step">
            <h2>Coordonnées & Document</h2>
            <div class="form-row">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" required/>
                </div>

                <div class="form-group">
                    <label>Téléphone</label>
                    <input type="tel" id="telephone"/>
                </div>

                <div class="form-group" style="flex: 1 1 100%;">
                    <label>Adresse</label>
                    <input type="text" id="adresse" required/>
                </div>

                <div class="form-group" style="flex: 1 1 100%;">
                    <label id='labeldoc'>Joindre un document PDF</label>
                    <input type="file" id="documentPDF" accept="application/pdf" required/>
                </div>
            </div>

            <div class="btns">
                <button type="button" class="prev">Précédent</button>
                <button type="button" class="next">Suivant</button>
            </div>
        </div>

        <!-- Étape 3 -->
        <div class="form-step">
            <h2>Confirmation</h2>
            <div class="recap-list" id="recap"></div>
            <div class="btns">
                <button type="button" class="prev">Précédent</button>
                <button type="submit">Envoyer</button>
            </div>
        </div>
    </form>
</div>

<script>

    const steps = document.querySelectorAll(".form-step");
    const progress = document.querySelectorAll(".step");
    const nextBtns = document.querySelectorAll(".next");
    const prevBtns = document.querySelectorAll(".prev");
    const acteType = document.getElementById("acteType");

    let currentStep = 0;

    function updateStep(index) {
        steps.forEach((step, i) => {
            step.classList.remove("active");
            if (i === index) {
                step.classList.add("active");
            }
            progress[i].classList.toggle("active", i <= index);
        });

        if (index === 2) generateRecap();
    }

    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                updateStep(currentStep);
            }
        });
    });

    document.getElementById("multiStepForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Demande envoyée avec succès !");
    });

    acteType.addEventListener("change", () => {
        document.getElementById("mariageFields").classList.add("hidden");
        document.getElementById("decesFields").classList.add("hidden");

        const value = acteType.value;
        if (value === "naissance") {
            document.getElementById("labeldoc").textContent = "Joindre une copie de l'extrait";
        } else if (value === "mariage") {
            document.getElementById("labeldoc").textContent = "Joindre une copie de l'extrait d'acte de mariage";
            document.getElementById("mariageFields").classList.remove("hidden");
        } else if (value === "deces") {
            document.getElementById("labeldoc").textContent = "Joindre une copie de l'extrait d'acte de décès";
            document.getElementById("decesFields").classList.remove("hidden");
        }
    });

    function generateRecap() {
        const recap = document.getElementById("recap");
        const type = acteType.value;
        const recapData = [
            `<p><strong>Type d'acte :</strong> ${type}</p>`,
            `<p><strong>Nom :</strong> ${document.getElementById("nom").value}</p>`,
            `<p><strong>Prénom :</strong> ${document.getElementById("prenom").value}</p>`,
            `<p><strong>Date de naissance :</strong> ${document.getElementById("dateNaissance").value}</p>`
        ];

        if (type === "mariage") {
            recapData.push(`<p><strong>Nom du conjoint :</strong> ${document.getElementById("nomConjoint").value}</p>`);
            recapData.push(`<p><strong>Date du mariage :</strong> ${document.getElementById("dateMariage").value}</p>`);
        } else if (type === "deces") {
            recapData.push(`<p><strong>Lieu du décès :</strong> ${document.getElementById("lieuDeces").value}</p>`);
            recapData.push(`<p><strong>Date du décès :</strong> ${document.getElementById("dateDeces").value}</p>`);
        }

        recapData.push(`<p><strong>Email :</strong> ${document.getElementById("email").value}</p>`);
        recapData.push(`<p><strong>Téléphone :</strong> ${document.getElementById("telephone").value}</p>`);
        recapData.push(`<p><strong>Adresse :</strong> ${document.getElementById("adresse").value}</p>`);
        const file = document.getElementById("documentPDF").files[0];
        recapData.push(`<p><strong>Fichier joint :</strong> ${file ? file.name : "Aucun"}</p>`);

        recap.innerHTML = recapData.join("");
    }

</script>
</body>
</html>
