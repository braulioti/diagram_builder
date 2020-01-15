var diagram = [
    { itemName: 'st', itemType: 'start', description: 'Start', nextPos: null, style: null },
    { itemName: 'op1', itemType: 'operation', description: 'Operation', nextPos: 'right', style: null },
    { itemName: 'cond1', itemType: 'condition', description: 'Is True?', nextPos: null, style: null },
    { itemName: 'op2', itemType: 'operation', description: 'Operation 2', nextPos: null, parent: 'cond1(yes, right)', next: 'cond2', style: null },
    { itemName: 'op3', itemType: 'operation', description: 'Operation 3', nextPos: null, parent: 'cond1(no)', style: null},
    { itemName: 'cond2', itemType: 'condition', description: 'Is True 2?', nextPos: null, style: null },
    { itemName: 'op4', itemType: 'operation', description: 'Operation 4', nextPos: null, parent: 'cond2(yes, right)', next: 'cond3', style: null },
    { itemName: 'op5', itemType: 'operation', description: 'Operation 5', nextPos: null, parent: 'cond2(no)', style: null},
    { itemName: 'cond3', itemType: 'condition', description: 'Is True 3?', nextPos: null, style: null },
    { itemName: 'op6', itemType: 'operation', description: 'Operation 6', nextPos: null, parent: 'cond3(yes, right)', next: 'e', style: null },
    { itemName: 'op7', itemType: 'operation', description: 'Operation 7', nextPos: null, parent: 'cond3(no)', style: null},
    { itemName: 'e', itemType: 'end', description: 'End', next: null, style: null },
];

var chart;

function build() {
    if (chart) {
        chart.clean();
    }

    chart = flowchart.parse(buildCode());
    chart.drawSVG('canvas', {
        // 'x': 30,
        // 'y': 50,
        'line-width': 3,
        'maxWidth': 3,//ensures the flowcharts fits within a certian width
        'line-length': 50,
        'text-margin': 10,
        'font-size': 14,
        'font': 'normal',
        'font-family': 'Helvetica',
        'font-weight': 'normal',
        'font-color': 'black',
        'line-color': 'black',
        'element-color': 'black',
        'fill': 'white',
        'yes-text': 'Yes',
        'no-text': 'No',
        'arrow-end': 'block',
        'scale': 1,
        'flowstate': {
            'success': {'fill': 'green'},
        }
    });
}

function run() {
    runItem(0);
}

function runItem(item) {
    diagram[item].style = 'success';
    let next = item;
    if (item < diagram.length - 1) {
        if (diagram[next].itemType === 'condition') {
            diagram[next].style = 'success';
            const auxItemName = diagram[next].itemName;
            next++;

            while (diagram[next].parent) {
                if (diagram[next].parent.indexOf(auxItemName + '(yes') >= 0) {
                    diagram[next].style = 'success';
                    break;
                } else {
                    next++;
                }
            }
        } else {
            next ++;
        }

        if (diagram[next].next) {
            for (let i = 1; i < diagram.length; i++) {
                if (diagram[i].itemName === diagram[next].next) {
                    next = i;
                    break;
                }
            }
        }

        build();
        runItem(next);
    } else {
        build();
    }
}

function buildCode() {
    let aux = '';

    diagram.forEach(item => {
        aux = aux + item.itemName + '=>' + item.itemType + ': ' + item.description;
        if (item.style) {
            aux = aux + '|' + item.style;
        }
        aux = aux + '\n'
    });

    for (let i = 1; i < diagram.length; i++) {
        if (diagram[i].parent) {
            aux = aux + diagram[i].parent + '->' + diagram[i].itemName + '\n';
        } else {
            if (diagram[i - 1].nextPos) {
                aux = aux + diagram[i - 1].itemName + '(' + diagram[i - 1].nextPos + ')->' + diagram[i].itemName + '\n';
            } else {
                aux = aux + diagram[i - 1].itemName + '->' + diagram[i].itemName + '\n';
            }
        }

        if (diagram[i].next) {
            aux = aux + diagram[i].itemName + '->' + diagram[i].next + '\n';
        }
    }

    return aux;
}
