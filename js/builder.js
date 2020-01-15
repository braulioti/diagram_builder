window.onload = function () {
    var btn = document.getElementById("run"),
        chart;
    var code = 'st=>start: Início\n' +
        'e=>end: Fim\n' +
        'st->e';

    (btn.onclick = function () {
        if (chart) {
            chart.clean();
        }

        chart = flowchart.parse(code);
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
            'yes-text': 'Sim',
            'no-text': 'Não',
            'arrow-end': 'block',
            'scale': 1
        });
    })();
};
