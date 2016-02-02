<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head><title>StateSync - Slider</title></head>

    <?= $this->stateSync() ?>

<body>
    <input id="slider" type="range" style="width:500px" />    
</body>
<script>

stateSync
    .select("#slider")
    .bind()
    .watch(".value")
    .event("change")

</script>
</html>