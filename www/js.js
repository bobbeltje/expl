var n = 400;
var data = {};
new_data();
var counter = 0;

function explore(){
    make_panel();
}

function make_panel(){
    let selDiv = make_selection_div();
    let el = document.getElementById('plt');
    el.replaceChildren(selDiv);
}

function make_selection_div(){

    let x = document.createElement('ul');
    let y = document.createElement('ul');
    Object.keys(data).forEach(key => {
        var li1 = document.createElement('li');
        li1.innerText = key;
        x.appendChild(li1);
        var li2 = document.createElement('li');
        li2.innerText = key;
        y.appendChild(li2);
    });

    let c1 = document.createElement('div');
    c1.style.width = '50%';
    c1.style.display = 'inline-block';
    c1.innerText = 'x:';
    c1.appendChild(x);
    let c2 = document.createElement('div');
    c2.style.width = '50%';
    c2.style.display = 'inline-block';
    c1.innerText = 'y:';
    c2.appendChild(y);
    
    let p = document.createElement('div');
    p.appendChild(c1);
    p.appendChild(c2);
    return p;
}

function make_plot_div(){
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
