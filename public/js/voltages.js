const formatter = 'YYYY-MM-DD HH:mm:ss';

const form = document.forms['voltagesForm'];
const chartCanvas = document.getElementById('voltages');
const spanLoading = document.getElementById('spanLoading');
const chartLoading = document.getElementById('chartLoading');

async function getVoltages(startDate, endDate) {
    const voltages = await fetch('/api' + `?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    }).then(res => res.json());
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
    spanLoading.classList.add('spinner-border');
    spanLoading.classList.add('spinner-border-sm');
    chartLoading.classList.add('spinner-border');
    chartLoading.classList.add('text-muted');
}

function destroyLoading() {
    spanLoading.classList.remove('spinner-border');
    spanLoading.classList.remove('spinner-border-sm');
    chartLoading.classList.remove('spinner-border');
    chartLoading.classList.remove('text-muted');
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
    createLoading();
    createChart(
        await getVoltages(startDate, endDate), 
        data);
    destroyLoading();
}));