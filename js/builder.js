window.onload = function () {
    var btn = document.getElementById("run"),
        cd = document.getElementById("code"),
        chart;

    (btn.onclick = function () {
        var code = cd.value;

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

        $('[id^=sub1]').click(function () {
            alert('info here');
        });
    })();

};

function myFunction(event, node) {
    console.log("You just clicked this node:", node);
}
