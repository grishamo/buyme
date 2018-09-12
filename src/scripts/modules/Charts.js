import {GoogleCharts} from 'google-charts';
import moment from 'moment';

function buildColumns(data, table)
{
    table.addColumn('date', 'Day');

    if(data && data[0].rates) {
        Object.keys(data[0].rates).forEach(key => table.addColumn('number', key));
    }
}

function buildTicks(data) {
    let ticks = [];

    data.forEach((val) => {
        if (val.rates) {
            Object.keys(val.rates).forEach(key => ticks.push(val.rates[key]));
        }
    });

    return ticks;
}

function buildRows(data, table)
{
    const allRows = [];
    data.forEach((val) => {
        let dataRow = [];

        if (val.rates) {
            dataRow.push(new Date(val.date));

            Object.keys(val.rates).forEach(key => dataRow.push(val.rates[key]));
            allRows.push(dataRow);
        }
    });

    table.addRows(allRows);
}

export const Charts = {

    Draw: (elem, rates, clientOptions) => {
        GoogleCharts.load(drawChart);

        function drawChart() {

            const data = new google.visualization.DataTable();
            buildColumns(rates, data);
            buildRows(rates, data);

            const chart = new google.visualization.LineChart(elem);

            const options = {
                selectionMode: 'multiple',
                height: clientOptions.height,
                legend: {
                    position: 'top',
                    alignment: 'center',
                    maxLines: 3
                },
                curveType: 'function',
                hAxis: {
                    title: "Day",
                    format: 'EEE'
                },
                vAxis: {
                    minValue: 0
                },
                colors: ['#ff3780', '#3795f1', '#fbd742']
            };

            chart.draw(data, options);
        }
    }
};

