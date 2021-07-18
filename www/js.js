var n = 400;
var data = {};
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

function random_letters(n){
    let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let index = [...Array(n)].map(_ => Math.floor(Math.random() * 26));
    return index.map(i => letters[i]);
}

function random_numbers(n){
    return [...Array(n)].map(_ => Math.ceil(Math.random() * n));
}

function new_data(){
    data.a = random_letters(n);
    data.b = random_letters(n);
    data.c = random_letters(n);
    data.x = random_numbers(n);
    data.y = random_numbers(n);
    data.z = random_numbers(n);
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
