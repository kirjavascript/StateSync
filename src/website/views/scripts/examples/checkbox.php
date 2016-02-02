<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head><title>StateSync - Radio</title></head>

    <?= $this->stateSync(null,1) ?>

<body>
    <?php if($this->editmode) : ?>

        <input type="checkbox" /> display "hello world"

        <script>
            stateSync.select("input").watch(".checked").event("click")
        </script>

    <?php else : ?>

        <?= $this->stateSync("input")['.checked']?"hello world":"" ?>

    <?php endif; ?>
</body>

</html>