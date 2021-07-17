var n = 400;
var data = {
    y: [...Array(n)].map(_ => Math.ceil(Math.random() * n)),
    x: [...Array(n)].map(_ => Math.ceil(Math.random() * n)),
    z: [...Array(n)].map(_ => Math.ceil(Math.random() * n))
}

function plot(id){
    let gd = document.getElementById(id);

    let d = [{
        type: 'scatter',
        mode: 'markers',
        x: data.x,
        y: data.y,
        marker: {
            color: data.z,
            showscale: true
        }
    }]
    let l = {
    }
    let c = {
        displayModeBar: false
    }

    Plotly.newPlot(gd, d, l, c)
}
