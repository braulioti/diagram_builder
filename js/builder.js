var diagram = [
    { itemName: 'st', itemType: 'start', description: 'Start', nextPos: null },
    { itemName: 'op1', itemType: 'operation', description: 'Operation', nextPos: 'right' },
    { itemName: 'cond1', itemType: 'condition', description: 'Is True?', nextPos: null },
    { itemName: 'op2', itemType: 'operation', description: 'Operation 2', nextPos: null, parent: 'cond1(yes, right)', next: 'cond2' },
    { itemName: 'op3', itemType: 'operation', description: 'Operation 3', nextPos: null, parent: 'cond1(no)'},
    { itemName: 'cond2', itemType: 'condition', description: 'Is True 2?', nextPos: null },
    { itemName: 'op4', itemType: 'operation', description: 'Operation 4', nextPos: null, parent: 'cond2(yes, right)', next: 'e' },
    { itemName: 'op5', itemType: 'operation', description: 'Operation 5', nextPos: null, parent: 'cond2(no)'},
    { itemName: 'e', itemType: 'end', description: 'End', next: null },
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
        'scale': 1
    });
}

function buildCode() {
    let aux = '';

    diagram.forEach(item => {
        aux = aux + item.itemName + '=>' + item.itemType + ': ' + item.description + '\n';
    });

    for (let i = 1; i < diagram.length; i++) {
        if(diagram[i].parent) {
            aux = aux + diagram[i].parent + '->' + diagram[i].itemName + '\n';
        } else {
            if (diagram[i-1].nextPos) {
                aux = aux + diagram[i-1].itemName + '(' + diagram[i-1].nextPos + ')->' + diagram[i].itemName + '\n';
            } else {
                aux = aux + diagram[i-1].itemName + '->' + diagram[i].itemName + '\n';
            }
        }

        if(diagram[i].next) {
            aux = aux + diagram[i].itemName + '->' + diagram[i].next + '\n';
        }
    }
    return aux;
}
