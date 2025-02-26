const formatter = 'YYYY-MM-DD HH:mm:ss';

const form = document.forms['voltagesForm'];
const chartCanvas = document.getElementById('voltages');
const spanLoading = document.getElementById('spanLoading');
const chartLoading = document.getElementById('chartLoading');
const referencesButton = document.getElementById('references');

async function getVoltages(data, startDate, endDate) {
    createLoading();
    const voltages = await fetch('/api' + `?data=${data}&startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Cannot fetch request!');
    }).catch(error => {
        console.log(error.message);
    });
    destroyLoading();
    return await voltages;
}

async function createChart(voltages, data) {
    new Chart(
        chartCanvas,
        {
            type: 'line',
            data: {
                labels: voltages.map(row => moment.unix(Date.parse(row.hwtime)/1000).format(formatter)),
                datasets: [
                    {
                        label: dataType(data),
                        data: voltages.map(row => row[data]),
                    }
                ]
            },
            options: {
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
            }
        }
    );
}

function destroyChartIfExsists() {
    if (Chart.getChart(chartCanvas)) {
        Chart.getChart(chartCanvas)?.destroy();
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

function dataType(data) {
    if (data == 'v_magnetic') return 'Antenne';
    else if (data == 'v_piezo') return 'Piezo';
    else if (data == 'v_12') return '12 Volts line';
    else if (data == 'v_24') return '24 Volts line';
}

form.addEventListener('submit', (async e => {
    e.preventDefault();
    const data = form.elements['data'].value;
    const startDate =  form.elements['startDate'].value;
    const endDate = form.elements['endDate'].value;
    destroyChartIfExsists();
    createChart(
        await getVoltages(data, startDate, endDate), 
        data);
}));