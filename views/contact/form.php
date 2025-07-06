<div class="container mt-5">
    <h2>Contactez-nous</h2>

    <?php if (!empty($feedback)) : ?>
        <div class="alert alert-info"><?php echo $feedback; ?></div>
    <?php endif; ?>

    <form action="index.php?action=envoyerMessage" method="post" class="p-4 shadow rounded bg-light">
        <div class="mb-3">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" name="nom" required>
        </div>
        <div class="mb-3">
            <label for="email">Adresse Email</label>
            <input type="email" class="form-control" name="email" required>
        </div>
        <div class="mb-3">
            <label for="objet">Objet</label>
            <input type="text" class="form-control" name="objet" required>
        </div>
        <div class="mb-3">
            <label for="message">Message</label>
            <textarea class="form-control" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</div>
