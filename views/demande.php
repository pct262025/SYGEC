<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Formulaire multistep</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/demande.css">
</head>

<body>

    <div class="form-container-dem">
        <form id="multiStepForm" method="post" action="#">
            <div class="progress-bar1">
                <div class="step active">1</div>
                <div class="step">2</div>
                <div class="step">3</div>
                <div class="step">4</div>
                <div class="step">5</div>
            </div>

            <!-- Étape 1 -->
            <div class="form-step active">
                <h2>Choix de l'acte</h2>
                <div class="form-row">
                    <div class="form-group">
                        <label>Type d'acte <b>*</b></label>
                        <select id="acteType" name="typeacte" required>
                            <option value="" disabled selected>Choix du type d'acte</option>
                            <option value="naissance">Extrait de naissance</option>
                            <option value="certificat">Certificat de nationalité</option>
                        </select>
                        <span class="error-message" id="acteTypeError"></span>
                    </div>
                </div>
                <div class="fbtn">
                    <button type="button" class="next">Suivant</button>
                </div>
            </div>

            <!-- Étape 2 -->
            <div class="form-step">
                <h2>Informations Personnelles</h2>
                <div class="form-row">
                    <div class="form-group">
                        <label>Nom <b>*</b></label>
                        <input type="text" id="nom" name="nom" required />
                    </div>
                    <div class="form-group">
                        <label>Prénoms <b>*</b></label>
                        <input type="text" id="prenom" name="prenom" required />
                    </div>
                    <div class="form-group">
                        <label>Lieu de naissance <b>*</b></label>
                        <input type="text" id="lieuNaissance" name="lieunaissance" required />
                    </div>
                    <div class="form-group">
                        <label>Date de naissance <b>*</b></label>
                        <input type="date" id="dateNaissance" name="datenaissance" required />
                    </div>
                    <div class="form-group hide" id="hnais">
                        <label>Heure de naissance</label>
                        <input type="time" id="heurNaissance" name="heurNaissance" />
                    </div>
                    <div class="form-group hide" id="lhab">
                        <label>Lieu d'habitation</label>
                        <input type="text" id="lieuhabitat" name="lieuhabitat" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group hide" id="ncj">
                        <label>Nom conjoint(e)</label>
                        <input type="text" id="nomcj" name="nomcj" />
                    </div>
                    <div class="form-group hide" id="pncj">
                        <label>Prénoms conjoint(e)</label>
                        <input type="text" id="pnomcj" name="pnomcj" />
                    </div>
                </div>

                <div class="btns">
                    <button type="button" class="prev">Précédent</button>
                    <button type="button" class="next">Suivant</button>
                </div>
            </div>

            <!-- Étape 3 -->
            <div class="form-step">
                <h2>Informations Complémentaires</h2>

                <div class="group">
                    <h4>Informations du Père</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nom du père</label>
                            <input type="text" id="nompere" name="nompere" />
                        </div>
                        <div class="form-group">
                            <label>Prénoms du père</label>
                            <input type="text" id="pnompere" name="pnompere" />
                        </div>
                        <div class="form-group hide" id="naissp">
                            <label>Date de naissance du père</label>
                            <input type="date" id="datenaissp" name="datenaissp" />
                        </div>
                        <div class="form-group hide" id="lnaissp">
                            <label>Lieu de naissance du père</label>
                            <input type="text" id="lieunaissp" name="lieunaissp" />
                        </div>
                        <div class="form-group hide" id="jobp">
                            <label>Profession du père</label>
                            <input type="text" id="jobpere" name="jobpere" />
                        </div>
                    </div>
                </div>

                <div class="group">
                    <h4>Informations de la Mère</h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nom de la mère</label>
                            <input type="text" id="nommere" name="nommere" />
                        </div>
                        <div class="form-group">
                            <label>Prénoms de la mère</label>
                            <input type="text" id="pnommere" name="pnommere" />
                        </div>
                        <div class="form-group hide" id="naissm">
                            <label>Date de naissance de la mère</label>
                            <input type="date" id="datenaissm" name="datenaissm" />
                        </div>
                        <div class="form-group hide" id="lnaissm">
                            <label>Lieu de naissance de la mère</label>
                            <input type="text" id="lieunaissm" name="lieunaissm" />
                        </div>
                        <div class="form-group hide" id="jobm">
                            <label>Profession de la mère</label>
                            <input type="text" id="jobmere" name="jobmere" />
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group hide" id="datmar">
                        <label>Date de mariage</label>
                        <input type="date" id="datemariage" name="datemariage" />
                    </div>
                    <div class="form-group hide" id="locmar">
                        <label>Lieu de mariage</label>
                        <input type="text" id="lieumariage" name="lieumariage" />
                    </div>
                    <div class="form-group hide" id="datdiv">
                        <label>Date de divorce</label>
                        <input type="date" id="datedivorce" name="datedivorce" />
                    </div>
                </div>

                <div class="btns">
                    <button type="button" class="prev">Précédent</button>
                    <button type="button" class="next">Suivant</button>
                </div>
            </div>

            <!-- Étape 4 -->
            <div class="form-step">
                <h2>Adresse & Document</h2>
                <div class="form-row">
                    <div class="form-group">
                        <label>Email <b>*</b></label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div class="form-group">
                        <label>Téléphone <b>*</b></label>
                        <input type="tel" id="telephone" name="telephone" required />
                    </div>
                    <div class="form-group" style="flex: 1 1 100%;">
                        <label id='labeldoc'>Joindre un document PDF</label>
                        <input type="file" id="documentPDF" accept="application/pdf" />
                    </div>
                </div>
                <div class="btns">
                    <button type="button" class="prev">Précédent</button>
                    <button type="button" class="next">Envoyer</button>
                </div>
            </div>

            <!-- Étape 5 -->
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
    const acteTypeError = document.getElementById("acteTypeError");

    let currentStep = 0;

    function updateStep(index) {
        steps.forEach((step, i) => {
            step.classList.remove("active");
            if (i === index) step.classList.add("active");
            progress[i].classList.toggle("active", i <= index);
        });

        if (index === 4) generateRecap();
    }

    nextBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (currentStep === 0) {
                if (!acteType.value) {
                    acteTypeError.textContent = "Veuillez sélectionner un type d'acte.";
                    acteType.classList.add("input-error");
                    return;
                } else {
                    acteTypeError.textContent = "";
                    acteType.classList.remove("input-error");
                }
            }

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

    function affichage(id, show) {
        const el = document.getElementById(id);
        if (el) el.classList.toggle("hide", !show);
    }

    function champRequis(id, required) {
        const el = document.getElementById(id);
        if (el) el.required = required;
    }

    acteType.addEventListener("change", () => {
        const value = acteType.value;
        const isNaissance = value === "naissance";

        // Affichage
        affichage("lhab", !isNaissance);
        affichage("naissp", !isNaissance);
        affichage("naissm", !isNaissance);
        affichage("jobp", isNaissance);
        affichage("jobm", isNaissance);
        affichage("hnais", isNaissance);
        affichage("ncj", isNaissance);
        affichage("pncj", isNaissance);
        affichage("datmar", isNaissance);
        affichage("locmar", isNaissance);
        affichage("datdiv", isNaissance);

        // Required
        champRequis("lieuhabitat", !isNaissance);
        champRequis("datenaissp", !isNaissance);
        champRequis("datenaissm", !isNaissance);
        champRequis("lieunaissance", isNaissance);
        champRequis("jobpere", isNaissance);
        champRequis("jobmere", isNaissance);
        champRequis("datemariage", isNaissance);
        champRequis("lieumariage", isNaissance);
        champRequis("datedivorce", isNaissance);
        champRequis("nomcj", isNaissance);
        champRequis("pnomcj", isNaissance);
    });

    function generateRecap() {
        const recap = document.getElementById("recap");
        const type = acteType.value;
        const file = document.getElementById("documentPDF").files[0];

        const recapData = [
            `<p><strong>Type d'acte :</strong> ${type}</p>`,
            `<p><strong>Nom :</strong> ${document.getElementById("nom").value}</p>`,
            `<p><strong>Prénom :</strong> ${document.getElementById("prenom").value}</p>`,
            `<p><strong>Date de naissance :</strong> ${document.getElementById("dateNaissance").value}</p>`
        ];

        if (type === "naissance") {
            recapData.push(`<p><strong>Heure de naissance :</strong> ${document.getElementById("heurNaissance").value}</p>`);
            recapData.push(`<p><strong>Nom du père :</strong> ${document.getElementById("nompere").value}</p>`);
            recapData.push(`<p><strong>Prénom du père :</strong> ${document.getElementById("pnompere").value}</p>`);
            recapData.push(`<p><strong>Profession du père :</strong> ${document.getElementById("jobpere").value}</p>`);
            recapData.push(`<p><strong>Nom de la mère :</strong> ${document.getElementById("nommere").value}</p>`);
            recapData.push(`<p><strong>Prénom de la mère :</strong> ${document.getElementById("pnommere").value}</p>`);
            recapData.push(`<p><strong>Profession de la mère :</strong> ${document.getElementById("jobmere").value}</p>`);
            recapData.push(`<p><strong>Date de mariage :</strong> ${document.getElementById("datemariage").value}</p>`);
            recapData.push(`<p><strong>Lieu de mariage :</strong> ${document.getElementById("lieumariage").value}</p>`);
            recapData.push(`<p><strong>Date de divorce :</strong> ${document.getElementById("datedivorce").value}</p>`);
            recapData.push(`<p><strong>Nom conjoint(e) :</strong> ${document.getElementById("nomcj").value}</p>`);
            recapData.push(`<p><strong>Prénom conjoint(e) :</strong> ${document.getElementById("pnomcj").value}</p>`);
        } else {
            recapData.push(`<p><strong>Lieu d'habitation :</strong> ${document.getElementById("lieuhabitat").value}</p>`);
            recapData.push(`<p><strong>Nom du père :</strong> ${document.getElementById("nompere").value}</p>`);
            recapData.push(`<p><strong>Prénom du père :</strong> ${document.getElementById("pnompere").value}</p>`);
            recapData.push(`<p><strong>Date de naissance du père :</strong> ${document.getElementById("datenaissp").value}</p>`);
            recapData.push(`<p><strong>Nom de la mère :</strong> ${document.getElementById("nommere").value}</p>`);
            recapData.push(`<p><strong>Prénom de la mère :</strong> ${document.getElementById("pnommere").value}</p>`);
            recapData.push(`<p><strong>Date de naissance de la mère :</strong> ${document.getElementById("datenaissm").value}</p>`);
        }

        recapData.push(`<p><strong>Email :</strong> ${document.getElementById("email").value}</p>`);
        recapData.push(`<p><strong>Téléphone :</strong> ${document.getElementById("telephone").value}</p>`);
        recapData.push(`<p><strong>Fichier joint :</strong> ${file ? file.name : "Aucun"}</p>`);

        recap.innerHTML = recapData.join("");
    }

    </script>
</body>

</html>
