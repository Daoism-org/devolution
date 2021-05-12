import config from './config';

const colors = config.app.colors;
const {danger, success} = colors;

export const chartData = {
    apex: {
        pie: {
            series: [25, 15],
            options: {
                chart: {
                    type: 'donut'
                },
                colors: [success, danger],
                labels: ["Yes", "No"],
                stroke: {
                    show: false,
                    width: 0
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '45%'
                        }
                    }
                },
                legend: {
                    show: false
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        }
    },
};
