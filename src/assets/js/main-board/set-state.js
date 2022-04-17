/* ---------------- set game state ------------------- */
/* ---------------- part of main-board.js ------------------- */

let landedTileShown = false;

function setDiceRollState(){
    if(isItMyTurn() && _game.canRoll){
        document.querySelector('[data-action="roll-dice"]').classList.add('active');
    }
    else {
        document.querySelector('[data-action="roll-dice"]').classList.remove('active');
    }

    // move all players to tile where current player landed on
    if(!landedTileShown && !_game.canRoll){
        const currentTile = retrievePlayer(_game.currentPlayer).currentTile;
        _player.carousel = retrieveTilePosition(currentTile);
        landedTileShown = true;
    }
    else if(_game.canRoll){
        landedTileShown = false;
    }
}

function setBuyPropertyState(){
    const attributeBuy = '[data-navigate="buy-property"]';
    const attributeDontBuy = '[data-action="dont-buy-property"]';

    if(isItMyTurn() && isDirectSaleTileOnCarousel() && _game.directSale != null){
        const tile = retrieveTileByName( _game.directSale);
        if(retrieveMyBalance() >= tile.cost){
            document.querySelector(attributeBuy).classList.add('active');
        }
        else {
            document.querySelector(attributeBuy).classList.remove('active');
        }
        document.querySelector(attributeDontBuy).classList.add('active');
    }
    else {
        document.querySelector(attributeBuy).classList.remove('active');
        document.querySelector(attributeDontBuy).classList.remove('active');
    }
}
