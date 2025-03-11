import utils from './utils.js';
const form = document.forms['voltagesForm'];
const chartCanvas = document.getElementById('voltages');
const spanLoading = document.getElementById('spanLoading');
const chartLoading = document.getElementById('chartLoading');
const resetChartButton = document.getElementById('resetChart');

async function getVoltages(data, startDate, endDate, editable) {
    createLoading();
    return await fetch(`/api/voltages?data=${data}&startDate=${startDate}&endDate=${endDate}&editableQuery=${editable}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    }).then(res => {
        if (res.ok) {
            destroyLoading();
            return res.json();
        }
        throw new Error('Cannot fetch request!');
    }).catch(err => {
        console.log(err.message);
    });
}

async function createChart(voltages, data, editable) {
    resetChartButton.style.visibility = 'visible';
    new Chart(
        chartCanvas,
        {
            data: {
                labels: voltages.map(row => moment.unix(Date.parse(row.hwtime)/1000).format(utils.formatter)),
                datasets: [
                    {
                        type: 'line',
                        label: utils.dataStringsJSON[data],
                        data: voltages.map(row => row[data]),
                    },
                    {
                        type: 'line',
                        label: `Oper stat: ${editable}`,
                        data: voltages.map((row) => {
                            if ((row.msg != 'Nothing')) {
                                return row.msg.toLowerCase().includes(editable.toLowerCase()) ? row.msg =  utils.dataOutputsIfStringExistsJSON[data] : row.msg = utils.dataOutputsJSON[data];
                            }
                        }),
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: 'xy',
                        }
                    }
                },
                animation: false,
                spanGaps: true,
                scales: {
                    y: {
                        min: utils.dataMinAxeJSON[data]
                    }
                }
            }
        }
    );
}

function destroyChartIfExsists() {
    if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
        resetChartButton.style.visibility = 'hidden';
    }
}

function createLoading() {
    spanLoading.classList.add('spinner-grow', 'spinner-grow-sm');
    chartLoading.classList.add('spinner-grow', 'text-muted');
}

function destroyLoading() {
    spanLoading.classList.remove('spinner-grow', 'spinner-grow-sm');
    chartLoading.classList.remove('spinner-grow', 'text-muted');
}

form.addEventListener('submit', (async event => {
    event.preventDefault();
    const data = form.elements['data'].value;
    const startDate =  form.elements['startDate'].value;
    const endDate = form.elements['endDate'].value;
    const editable = form.elements['editable'].value;
    destroyChartIfExsists();
    createChart(
        await getVoltages(data, startDate, endDate, editable), 
        data,
        editable
    );
}));

resetChartButton.onclick = function () {
    if (Chart.getChart(chartCanvas)) Chart.getChart(chartCanvas)?.resetZoom();
}