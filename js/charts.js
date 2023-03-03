function createChart(wins){

    const ctx = document.getElementById('myChart');

    let data = {
    labels: ['Andy', 'Joyner', 'Kieran', 'Lewis'],
    datasets: [
        {
        label: 'Original',
        data: wins['Original'],
        backgroundColor: 'rgb(240, 181, 79)',
        stack: 'Stack 0',
        },
        {
        label: 'Sea Farers',
        data: wins['Sea Farers'],
        backgroundColor: 'rgb(50, 131, 230)',
        stack: 'Stack 0',
        },
        {
        label: 'Cities and Knights',
        data: wins['Cities and Knights'],
        backgroundColor: 'rgb(57, 148, 38)',
        stack: 'Stack 0',
        },
    ]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                axes: {
                    labels: {
                        font: {
                            size: 20
                        }
                    }
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 14
                        }
                    }
                }
            },
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        font: {
                            size: 20
                        }
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 15
                        }
                    }
                }
            }
        }
    }
    
    new Chart(ctx, config);
    
    
}
