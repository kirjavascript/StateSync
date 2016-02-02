<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head><title>StateSync - Draggable Box</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
</head>

    <?= $this->stateSync() ?>

<body></body>
<script>

d3
    .select("body")
    .append("svg")
    .attr({
        width:500,
        height:500
    })
    .append("rect")
    .attr({
        x:0,y:0,
        width:50,
        height:50,
        fill:"red",
        cursor:stateSync.editmode?"move":""
    })
    .call(
        d3.behavior
            .drag()
            .origin(function() {
                return {
                    x: d3.transform(this.getAttribute("transform")).translate[0],
                    y: d3.transform(this.getAttribute("transform")).translate[1]
                };
            })
            .on("drag", function(d) {
                if(stateSync.editmode) {
                    translate = d3.transform(this.getAttribute("transform")).translate;
                    x = d3.event.dx + translate[0],
                    y = d3.event.dy + translate[1];
                    d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
                    d3.event.sourceEvent.stopPropagation(); 
                }            
            })
    ); 

stateSync
    .select("rect")
    .bind()
    .watch("transform")
    .event("mouseout")

</script>
</html>