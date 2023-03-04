async function getSheetData(url){

    try {
        const response = await fetch(url)
        const text_data = await response.text()

        const data = JSON.parse(text_data.substr(47).slice(0, -2))
        
        return data

    } catch (err) {
        console.error(err)
    }
}

function createRecords(data){

    return data.table.rows.map(row => {
    
        return row.c.map(el => el.v)
    }) 

}

function createGames(records){

    // Create games

    let games = []

    for (let i=0; i<records.length; i++){
        let game_id = records[i][0]-1

        if (!(game_id in games)) {
            games[game_id] = {
                "game_type": records[i][1],
                "date": records[i][2],
                "results": [{"player": records[i][3], "points": records[i][4]}]
            }
        } else {
            games[game_id]["results"].push({
                "player": records[i][3],
                "points": records[i][4]
            })
        }
    }

    // Sort games

    games.forEach(game => {
        game['results'].sort((a,b) => b.points - a.points)
        game['winner'] = game['results'][0]['player']
    })

    return games

}

function sortCriteria(a, b){
    if (a.won !== b.won) {
        return a.won < b.won
    } else if (a.points_for !== b.points_for) {
        return a.points_for < b.points_for
    } else {
        return a.played < b.played
    }
}

function createLeaderboard(games){

    let players = ["Andy", "Joyner", "Kieran", "Lewis"]

    let leaderboard = players.map(player => {
        return {"player": player, "played": 0, "won": 0, "lost": 0, "points_for": 0, "points_against": 0}
    })

    games.forEach(game => {

        let results = game["results"]
        for (let i=0; i<results.length; i++){

            player = players.indexOf(results[i].player)
            
            if (i == 0){
                leaderboard[player]["won"] += 1
            } else {
                leaderboard[player]["lost"] += 1
            }

            leaderboard[player]["played"] += 1
            leaderboard[player]["points_for"] += results[i].points
            
            for (let j=0; j<results.length; j++){

                if (j != i) {
                    leaderboard[player]["points_against"] += results[j].points
                }
            }

        }
    })

    leaderboard.sort(sortCriteria)

    return leaderboard

}

function getWins(games) {
        
    players = ['Andy', 'Joyner', 'Kieran', 'Lewis']

    let wins = {
        'Original': [0, 0, 0, 0],
        'Sea Farers': [0, 0, 0, 0],
        'Cities and Knights': [0, 0, 0, 0]
    }

    for (let game of games) {
        i = players.indexOf(game.winner)            
        wins[game.game_type][i] += 1
    }

    return wins
}