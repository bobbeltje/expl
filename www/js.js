var n = 400;
var data = {};
var d = {};
var selection = {};
var filters = {};
new_data();
subset_data();

document.addEventListener('click', () => {
    let arr = document.querySelectorAll('.rm-on-click');
    Array.from(arr).forEach(el => {
        el.remove();
    });
});

document.addEventListener('keyup', e => {
    let pd = document.getElementById('pd');
    if (pd.style.display == 'none') return;
    if (e.key === 'f'){
        let modal = document.querySelector('.plot-modal');
        if (modal === null){
            show_filter_modal();
        } else {
            modal.remove();
        }
    }
});

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

    // top right
    let tr = document.createElement('div');
    tr.className = 'plot-tr';
    // filter
    let fltr = document.createElement('button');
    fltr.className = 'plot-button';
    fltr.innerText = 'f';
    fltr.addEventListener('click', () => show_filter_modal());
    tr.appendChild(fltr);
    // colour
    let col = document.createElement('button');
    col.className = 'plot-button';
    col.innerText = 'c';
    col.addEventListener('click', () => {
        
        let l = document.createElement('ul');
        Object.keys(data).forEach(key => {
            var li2 = document.createElement('li');
            li2.innerText = key;
            li2.addEventListener('click', e => {
                selection.c = e.target.textContent;
                try_plot();
            });
            l.appendChild(li2);
        });

        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.top = col.getBoundingClientRect().bottom + 'px';
        d.style.left = col.getBoundingClientRect().left + 'px';
        d.style.borderRadius = '5%';
        d.style.backgroundColor = '#ccc';
        d.appendChild(l);
        gd.appendChild(d);

        setTimeout(() => {
            d.className = 'rm-on-click';
        }, 0);
        
    });
    tr.appendChild(col);
    // close
    let bd = document.createElement('button');
    bd.className = 'plot-button';
    bd.innerText = 'x';
    bd.addEventListener('click', () => {
        gd.replaceChildren();
        clear_selection();
        make_panel();
    });
    tr.appendChild(bd);

    // y
    let y = document.createElement('button');
    y.className = 'plot-button plot-y';
    y.innerText = 'y';
    y.addEventListener('click', () => {

        let l = document.createElement('ul');
        Object.keys(data).forEach(key => {
            var li2 = document.createElement('li');
            li2.innerText = key;
            li2.addEventListener('click', e => {
                selection.y = e.target.textContent;
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

        setTimeout(() => {
            d.className = 'rm-on-click';
        }, 0);
    });

    // x
    let x = document.createElement('button');
    x.className = 'plot-button plot-x';
    x.innerText = 'x';
    x.addEventListener('click', () => {

        let l = document.createElement('ul');
        Object.keys(data).forEach(key => {
            var li2 = document.createElement('li');
            li2.innerText = key;
            li2.addEventListener('click', e => {
                selection.x = e.target.textContent;
                try_plot();
            });
            l.appendChild(li2);
        });

        let d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.bottom = window.innerHeight - x.getBoundingClientRect().top + 'px';
        d.style.left = x.getBoundingClientRect().left + 'px';
        d.style.borderRadius = '5%';
        d.style.backgroundColor = '#ccc';
        d.appendChild(l);
        gd.appendChild(d);

        setTimeout(() => {
            d.className = 'rm-on-click';
        }, 0);
    });

    gd.replaceChildren(pd, tr, y, x);
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
    
    let df = [{
        type: 'scatter',
        mode: 'markers',
        x: d[selection.x],
        y: d[selection.y],
        marker: selection.c && typeof d[selection.c][0] == 'number' ? {
            color: d[selection.c],
            showscale: true
        } : {},
        transforms: selection.c && typeof d[selection.c][0] == 'string' ? [{
            type: 'groupby',
            groups: d[selection.c]
        }] : {}
    }]
    let l = {
        width: 600,
        height: 400,
        margin: { l: 30, r: 30, t: 30, b: 30 }
    }
    let c = {
        displayModeBar: false
    }

    Plotly.newPlot(gd, df, l, c)
}

function show_filter_modal(){
    
    let d = document.createElement('div');
    d.className = 'plot-modal';

    // variable names
    let var_names = document.createElement('ul');
    var_names.className = 'var-names';
    Object.keys(data).forEach(key => {
        var li2 = document.createElement('li');
        li2.innerText = key;
        li2.addEventListener('click', e => {
            Array.from(e.target.parentNode.children).forEach(child => {
                child.className = '';
            })
            e.target.className = 'selected';
            update_var_values(e.target.innerText);
        });
        var_names.appendChild(li2);
    });
    d.appendChild(var_names);

    // variable values
    let var_values = document.createElement('div');
    var_values.className = 'var-values';
    d.appendChild(var_values);

    document.getElementById('plt').appendChild(d);
}

function subset_data(){
    let rm_idx = new Set();
    Object.keys(filters).forEach(key => {
        if (typeof data[key][0] == 'number'){
            for (let i = 0; i < data[key].length; ++i){
                if (filters[key].lwr && data[key][i] < filters[key].lwr) rm_idx.add(i);
                if (filters[key].upr && data[key][i] > filters[key].lwr) rm_idx.add(i);
            }
        } else {
            if (!filters[key].size) return;
            for (let i = 0; i < data[key].length; ++i){
                if (! filters[key].has(data[key][i])) rm_idx.add(i);
            }
        }
    });
    let n = data[Object.keys(data)[0]].length;
    let row_nums = new Set([...Array(n).keys()]);
    rm_idx.forEach(i => row_nums.delete(i));
    let a = Array.from(row_nums);
    Object.keys(data).forEach(key => {
        d[key] = a.map(i => data[key][i]);
    });
}

function update_var_values(x){
        
    let d = document.createElement('div');

    if (typeof data[x][0] == 'number'){

        let lbl = document.createElement('label');
        lbl.for = 'lwr';
        lbl.innerText = 'Lower Limit:'
        let inp = document.createElement('input');
        inp.type = 'number';
        inp.name = 'lwr'
        inp.value = filters[x] ? filters[x].lwr || Math.min(...data[x]) : Math.min(...data[x]);
        inp.addEventListener('change', e => {
            let val = +e.target.value;
            if (typeof val != 'number') return;
            if (typeof filters[x] == 'object'){
                filters[x].lwr = val;
            } else {
                filters[x] = { lwr: val };
            }
            subset_data();
            plot();
        })

        let lbl2 = document.createElement('label');
        lbl2.for = 'upr';
        lbl2.innerText = 'Lower Limit:'
        let inp2 = document.createElement('input');
        inp2.type = 'number';
        inp2.name = 'upr'
        inp2.value = filters[x] ? filters[x].upr || Math.max(...data[x]) : Math.max(...data[x]);
        inp2.addEventListener('change', e => {
            let val = +e.target.value;
            if (typeof val != 'number') return;
            if (typeof filters[x] == 'object'){
                filters[x].upr = val;
            } else {
                filters[x] = { upr: val };
            }
            subset_data();
            plot();
        })

        d.replaceChildren(lbl, inp, lbl2, inp2);
        document.querySelector('.var-values').replaceChildren(d);

    } else {

        let ul = document.createElement('ul');
        ul.className = 'scrollable';
        ul.style.height = document.querySelector('.plot-modal').getBoundingClientRect().height + 'px';

        let uniques = [...new Set(data[x])].sort();
        uniques.forEach(val => {
            var li = document.createElement('li');
            li.innerText = val;
            if (filters[x] && filters[x].has(val)) li.className = 'selected';
            li.addEventListener('click', e => {
                let val = e.target.innerText;
                if (e.ctrlKey){
                    e.target.classList.toggle('selected');
                    if (typeof filters[x] != 'object') filters[x] = new Set();
                    if (e.target.classList.contains('selected')) {
                        filters[x].add(val);
                    } else {
                        filters[x].delete(val);
                    }
                } else {
                    let select_it = !e.target.classList.contains('selected');
                    Array.from(e.target.parentNode.children).forEach(child => {
                        child.className = '';
                    });
                    filters[x] = new Set();
                    if (select_it) {
                        e.target.className = 'selected';
                        filters[x].add(val);
                    }
                }
                subset_data();
                plot();
            });
            ul.appendChild(li);
        });

        d.replaceChildren(ul);
        document.querySelector('.var-values').replaceChildren(d);
    }
}

function try_plot(){
    if (selection.hasOwnProperty('x') && selection.hasOwnProperty('y')){
        make_plot_div();
        document.getElementById('sd').style.display = 'none';
        document.getElementById('pd').style.display = '';
    }
}
