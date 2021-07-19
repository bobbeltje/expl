var n = 400;
var data = {};
new_data();
var selection = {};

function clear_selection(){
    selection = {};
}

function explore(){
    make_panel();
}

function make_panel(){

    let selDiv = make_selection_div();
    selDiv.id = 'sd';
    
    let plotDiv = document.createElement('div');
    plotDiv.id = 'pd';
    plotDiv.style.display = 'none';
    
    let el = document.getElementById('plt');
    el.replaceChildren(selDiv, plotDiv);
}

function make_selection_div(){

    let x = document.createElement('ul');
    let y = document.createElement('ul');
    Object.keys(data).forEach(key => {
        var li1 = document.createElement('li');
        li1.innerText = key;
        li1.addEventListener('click', e => {
            selection.x = [e.target.textContent];
            Array.from(e.target.parentNode.children).forEach(child => {
                child.className = '';
            })
            e.target.className = 'selected';
            try_plot();
        });
        x.appendChild(li1);
        var li2 = document.createElement('li');
        li2.innerText = key;
        li2.addEventListener('click', e => {
            selection.y = [e.target.textContent];
            Array.from(e.target.parentNode.children).forEach(child => {
                child.className = '';
            })
            e.target.className = 'selected';
            try_plot();
        });
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
    c2.innerText = 'y:';
    c2.appendChild(y);
    
    let p = document.createElement('div');
    p.className = 'fill';
    p.appendChild(c1);
    p.appendChild(c2);
    return p;
}

function make_plot_div(){
    
    let gd = document.getElementById('pd');

    // plot div
    let pd = document.createElement('div');
    pd.id = 'tmp';
    pd.className = 'fill';

    // close button
    let bd = document.createElement('button');
    bd.className = 'plot-button plot-tr';
    bd.innerText = 'x';
    bd.addEventListener(
        'click',
        () => {
            gd.replaceChildren();
            clear_selection();
            make_panel();
        }
    );

    // y
    let y = document.createElement('button');
    y.className = 'plot-button plot-y';
    y.innerText = 'y';
    y.addEventListener('click', e => {

        let l = document.createElement('ul');
        Object.keys(data).forEach(key => {
            var li2 = document.createElement('li');
            li2.innerText = key;
            li2.addEventListener('click', e => {
                selection.y = [e.target.textContent];
                try_plot();
            });
            l.appendChild(li2);
        });

        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.top = y.getBoundingClientRect().y + 'px';
        d.style.left = y.getBoundingClientRect().right + 'px';
        d.style.borderRadius = '5%';
        d.style.backgroundColor = '#ccc';
        d.appendChild(l);
        gd.appendChild(d);
    });
    
    gd.replaceChildren(pd, bd, y);
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
        x: data[selection.x],
        y: data[selection.y],
        marker: {
            color: data.z,
            showscale: true
        }
    }]
    let l = {
        width: 600,
        height: 400,
        margin: { l: 30, r: 30, t: 30, b: 30 }
    }
    let c = {
        displayModeBar: false
    }

    Plotly.newPlot(gd, d, l, c)
}

function try_plot(){
    if (selection.hasOwnProperty('x') && selection.hasOwnProperty('y')){
        make_plot_div();
        document.getElementById('sd').style.display = 'none';
        document.getElementById('pd').style.display = '';
    }
}