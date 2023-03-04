function createChartDataSet(wins, game_type){

    colors = {
        'Original': 'rgb(240, 181, 79)',
        'Sea Farers': 'rgb(50, 131, 230)',
        'Cities and Knights': 'rgb(57, 148, 38)'
    }

    if (game_type === null) {

        return Object.keys(colors).map(key => {
            return {
                label: key,
                data: wins[key],
                backgroundColor: colors[key],
                stack: 'Stack 0'
            }
          })
    } else {

        return [{
            label: game_type,
            data: wins[game_type],
            backgroundColor: colors[game_type],
            stack: 'Stack 0'
        }]
    }
}

function createChart(wins){

    const ctx = document.getElementById('myChart');

    let data = {
        labels: ['Andy', 'Joyner', 'Kieran', 'Lewis'],
        datasets: createChartDataSet(wins, null)
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
                    position: 'right',
                    labels: {
                        boxHeight: 30,
                        padding: 20,
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

    console.log(config)
    
    return new Chart(ctx, config)
    
}

function updateChart(wins, game_type) {

    chart.data.datasets = createChartDataSet(wins, game_type)
    chart.update()

}