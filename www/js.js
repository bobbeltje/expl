var n = 400;
var data = {
    y: [...Array(n)].map(_ => Math.ceil(Math.random() * n)),
    x: [...Array(n)].map(_ => Math.ceil(Math.random() * n)),
    z: [...Array(n)].map(_ => Math.ceil(Math.random() * n))
}
var counter = 0;

function explore(){
    new_data();
    let gd = document.getElementById('plt');

    // plot div
    let pd = document.createElement('div');
    pd.id = 'tmp';
    pd.className = 'plot-container';

    // close button
    let bd = document.createElement('button');
    bd.className = 'test-button';
    bd.innerText = 'x';
    bd.addEventListener(
        'click',
        () => {
            console.log(counter += 1);
            document.getElementById('tmp').remove();
            document.querySelector('.test-button').remove();
        }
    );
    
    gd.replaceChildren(pd, bd);
    plot();
}

function new_data(){
    data.x = [...Array(n)].map(_ => Math.ceil(Math.random() * n));
    data.y = [...Array(n)].map(_ => Math.ceil(Math.random() * n));
    data.z = [...Array(n)].map(_ => Math.ceil(Math.random() * n));
}

function plot(){
    let gd = document.getElementById('tmp');

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
