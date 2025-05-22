<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Demande d'acte civil</title>
    <link rel="stylesheet" href="assets/css/demande.css">
</head>
<body>
<div class="form-container-dem">
    <form id="multiStepForm">
        <div class="progress-bar">
            <div class="step active">1</div>
            <div class="step">2</div>
            <div class="step">3</div>
            <div class="step">4</div>
        </div>

        <!-- Étape 1 -->
        <div class="form-step active">
            <h2>Type d'acte & Identité</h2>
            <div class="form-row">


                <div class="form-group">
                    <label>Nom <b>*</b></label>
                    <input type="text" id="nom" required/>
                </div>

                <div class="form-group">
                    <label>Prénoms <b>*</b></label>
                    <input type="text" id="prenom" required/>
                </div>

                <div class="form-group">
                    <label>lieu de naissance <b>*</b></label>
                    <input type="text" id="lieuNaissance" required/>
                </div>
                <div class="form-group">
                    <label>Date de naissance <b>*</b></label>
                    <input type="date" id="dateNaissance" required/>
                </div>

                <div class="form-group">
                    <label>Type d'acte</label>
                    <select id="acteType" required>
                        <option value="" disabled selected>Choix du type d'acte</option>
                        <option value="naissance">Extrait de naissance</option>
                        <option value="nationalite">Certificat de nationalité</option>
                    </select>
                </div>

                <div class="form-group hide" id="hnais">
                    <label>Heure de naissance <b>*</b></label>
                    <input type="time" id="heurNaissance" required/>
                </div>
                <div class="form-group hide" id="lhab">
                    <label>Lieu d'habitation <b>*</b></label>
                    <input type="text" id="lieuhabitat" required/>
                </div>

            </div>
            <div class="fbtn">
                <button type="button" class="next">Suivant</button>
            </div>
        </div>

        <!-- Étape 2 -->
        <div class="form-step ">
            <h2>Informations complémentaires</h2>
            <div class="form-row">

                <div class="form-group">
                    <label>Nom du père</label>
                    <input type="text" id="nompere" required/>
                </div>
                <div class="form-group">
                    <label>Prénoms du père</label>
                    <input type="text" id="pnompere"  required/>
                </div>
                <div class="form-group hide" id="naissp">
                    <label>Date de naissance du père</label>
                    <input type="date" id="datenaissp"  required/>
                </div>
                <div class="form-group hide" id="lnaissp">
                    <label>Lieu de naissance du père</label>
                    <input type="input" id="lieunaissp" required/>
                </div>
                <div class="form-group hide" id="jobp">
                    <label>profession du père</label>
                    <input type="text" id="jobpere" required/>
                </div>
                <div class="form-group hide" id="decp">
                    <label>Date de décès du père</label>
                    <input type="date" id="datedecesp" required/>
                </div>
                <div class="form-group hide" id="ldecp">
                    <label>Lieu du décès du père</label>
                    <input type="input"  id="lieudecesp" required/>
                </div>

                <div class="form-group">
                    <label>Nom de la mère</label>
                    <input type="text" id="nommere" required/>
                </div>
                <div class="form-group">
                    <label>Prénoms de la mère</label>
                    <input type="text" id="pnommere" required/>
                </div>
                <div class="form-group hide" id="naissm">
                    <label>Date de naissance de la mère</label>
                    <input type="date"  id="datenaissm" required/>
                </div>
                <div class="form-group hide" id="lnaissm">
                    <label>lieu de naissance de la mère</label>
                    <input type="text" id="lieunaissm" required/>
                </div>
                <div class="form-group hide" id="jobm">
                    <label>profession de la mère</label>
                    <input type="text" id="jobmere" required/>
                </div>
                <div class="form-group hide" id="decm">
                    <label>Date de décès de la mère</label>
                    <input type="date" id="datedecesm" required/>
                </div>
                <div class="form-group hide" id="ldecm">
                    <label>Lieu du décès de la mère</label>
                    <input type="input" id="lieudecesm" required/>
                </div>
                <div class="form-group hide" id="datmar">
                    <label>Date de mariage</label>
                    <input type="text" id="datemariage"  required/>
                </div>
                <div class="form-group hide" id="locmar">
                    <label>Lieu de mariage</label>
                    <input type="text" id="lieumariage" required/>
                </div>
                <div class="form-group hide" id="datdiv">
                    <label>Date de divorce</label>
                    <input type="date" id="datedivorce" required/>
                </div>

            </div>
            <div class="form-row">
                <div class="form-group hide" id="ncj">
                    <label>Nom conjoint(e)</label>
                    <input type="text" id="nomcj"  required/>
                </div>
                <div class="form-group hide" id="pncj">
                    <label>Prénoms conjoint(e)</label>
                    <input type="text" id="pnomcj"  required/>
                </div>
            </div>

            <div class="btns">
                <button type="button" class="prev">Précédent</button>
                <button type="button" class="next">Suivant</button>
            </div>
        </div>


        <!-- Étape 3 -->
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

        <!-- Étape 4 -->
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

        if (index === 3) generateRecap();
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

        const value = acteType.value;
        if (value === "naissance") {
            document.getElementById("labeldoc").textContent = "Joindre une copie de l'extrait";
            document.getElementById("lhab").classList.add("hide");
            document.getElementById("naissp").classList.add("hide");
            document.getElementById("naissm").classList.add("hide");
            document.getElementById("jobm").classList.remove("hide");
            document.getElementById("jobp").classList.remove("hide");
            document.getElementById("hnais").classList.remove("hide");
            document.getElementById("ncj").classList.remove("hide");
            document.getElementById("pncj").classList.remove("hide");
            document.getElementById("datmar").classList.remove("hide");
            document.getElementById("locmar").classList.remove("hide");
            document.getElementById("datdiv").classList.remove("hide");
            document.getElementById("decm").classList.remove("hide");
            document.getElementById("decp").classList.remove("hide");
            document.getElementById("ldecm").classList.remove("hide");
            document.getElementById("ldecp").classList.remove("hide");
        } else {
            document.getElementById("lhab").classList.remove("hide");
            document.getElementById("naissp").classList.remove("hide");
            document.getElementById("naissm").classList.remove("hide");
            document.getElementById("jobm").classList.add("hide");
            document.getElementById("jobp").classList.add("hide");
            document.getElementById("hnais").classList.add("hide");
            document.getElementById("ncj").classList.add("hide");
            document.getElementById("pncj").classList.add("hide");
            document.getElementById("datmar").classList.add("hide");
            document.getElementById("locmar").classList.add("hide");
            document.getElementById("datdiv").classList.add("hide");
            document.getElementById("decm").classList.add("hide");
            document.getElementById("decp").classList.add("hide");
            document.getElementById("ldecm").classList.add("hide");
            document.getElementById("ldecp").classList.add("hide");

        }
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
            recapData.push(`<p><strong>Heure de naissane :</strong> ${document.getElementById("heurNaissance").value}</p>`);
            recapData.push(`<p><strong>Nom du père :</strong> ${document.getElementById("nompere").value}</p>`);
            recapData.push(`<p><strong>Prénom du père :</strong> ${document.getElementById("pnompere").value}</p>`);
            recapData.push(`<p><strong>profession du père :</strong> ${document.getElementById("jobpere").value}</p>`);
            recapData.push(`<p><strong>Date de décès du père :</strong> ${document.getElementById("datedecesp").value}</p>`);
            recapData.push(`<p><strong>Lieu du décès du père :</strong> ${document.getElementById("lieudecesp").value}</p>`);
            recapData.push(`<p><strong>Nom de la mère :</strong> ${document.getElementById("nommere").value}</p>`);
            recapData.push(`<p><strong>Prénom de la mère :</strong> ${document.getElementById("pnommere").value}</p>`);
            recapData.push(`<p><strong>profession de la mère :</strong> ${document.getElementById("jobmere").value}</p>`);
            recapData.push(`<p><strong>Date de décès de la mère :</strong> ${document.getElementById("datedecesm").value}</p>`);
            recapData.push(`<p><strong>Lieu du décès de la mère :</strong> ${document.getElementById("lieudecesm").value}</p>`);
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
        recapData.push(`<p><strong>Adresse :</strong> ${document.getElementById("adresse").value}</p>`);
        recapData.push(`<p><strong>Fichier joint :</strong> ${file ? file.name : "Aucun"}</p>`);

        recap.innerHTML = recapData.join("");
    }

</script>
</body>
</html>
