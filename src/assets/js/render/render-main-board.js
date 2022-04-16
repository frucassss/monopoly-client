"use strict";

function renderDiceRoll(){
    if(_game["lastDiceRoll"]){
        document.querySelector('#dice-container .dice-right').innerHTML = _game["lastDiceRoll"][0];
        document.querySelector('#dice-container .dice-left').innerHTML = _game["lastDiceRoll"][1];
    }
}

function renderBuyProperty(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#buy-property').classList.remove('hidden');
    document.querySelectorAll('#buy-property .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#buy-property .information h2 span').innerHTML = tile.cost;
}

function renderBuyHouse(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#buy-house').classList.remove('hidden');
    document.querySelectorAll('#buy-house .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#buy-house .information h2 span').innerHTML = tile.housePrice;
}

function renderSellHouse(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#sell-house').classList.remove('hidden');
    document.querySelectorAll('#sell-house .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#sell-house .information h2 span').innerHTML = tile.housePrice;
}

function renderBuyHotel(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#buy-hotel').classList.remove('hidden');
    document.querySelectorAll('#buy-hotel .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#buy-hotel .information h2 span').innerHTML = tile.housePrice;
}

function renderSellHotel(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#sell-hotel').classList.remove('hidden');
    document.querySelectorAll('#sell-hotel .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#sell-hotel .information h2 span').innerHTML = tile.housePrice;
}

function renderTakeMortgage(tile){
    addClassToElements('#main-board > section', 'hidden');
    document.querySelector('#take-mortgage').classList.remove('hidden');
    document.querySelectorAll('#take-mortgage .tile').forEach($element => {
        $element.dataset.tile = tile.nameAsPathParameter;
    });
    processProperty(tile.name);
    document.querySelector('#take-mortgage .information h2 span').innerHTML = tile.mortgage;
}
