"use strict";

function retrieveTiles() {
    return fetchFromServer(`/tiles`, "GET").then(tiles => {
        tiles.forEach(tile => {
            _tiles.push(tile);
        });
    }).then(() => {
        saveToStorage("_tiles", _tiles);
    }).catch(errorHandler);
}

function retrievePlayers(){
    return fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
        game["players"].forEach(player => {
            _players[player.name] = {};
            for(const key in player){
                _players[player.name][key] = player[key];
            }
        });
    }).then(() => {
        saveToStorage("_players", _players);
    }).catch(errorHandler);
}
