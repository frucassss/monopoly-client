"use strict";
let _player = {
    username: null,
    token: null,
    gameId: null,
    carousel: 0,
    collectedRent: false
};

let _game = {};
let _tiles = [];
const _connectGameHref = "connect-game.html";

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (loadFromStorage("_player")) {
        _player = loadFromStorage("_player");
    }

    if (document.querySelector('#index')) {
        initIndex();
    } else if (document.querySelector('#connect-game')) {
        initConnect();
    } else if (document.querySelector('#queue')) {
        initQueue();
    } else if (document.querySelector('#main-board')) {
        initMainBoard();
        startGame().then(() => {
            reloadGame().catch(errorHandler);
        }).catch(errorHandler);
    } else if (document.querySelector("#losing-screen")) {
        initLosingScreen();
    } else if (document.querySelector("#winner-screen")) {
        initWinningScreen();
    }
}

function initIndex() {
    document.querySelector("#start-game").addEventListener('click', () => location.href = _connectGameHref);
}

function initConnect() {
    document.querySelector('#connect-form select').addEventListener('change', processAvailableGames);
    document.querySelector("#connect-form").addEventListener("submit", processConnectionForm);
}

function initQueue() {
    processQueueState();
}

function initMainBoard() {

    addEventListenerToElements('click', processTileMapNavigation, '.tile-map');
    document.querySelector('#carousel').addEventListener('click', processPropertySide);
    document.querySelector('#carousel-navigation').addEventListener('click', navigateCarousel);
    document.querySelector('#home-board .player-stats-buttons').addEventListener('click', processPlayerStats);
    addEventListenerToElements('click', processPlayerStatsTileMap, '#stats .tile-map');


    addEventListenerToElements(
        'click',
        (e) => {
            e.preventDefault();
            playerAction(e.target.dataset.action);
        },
        '#main-board button[data-action]'
    );

    addEventListenerToElements(
        'click',
        (e) => {
            e.preventDefault();
            navigateMainBoard(e.target.dataset.navigate);
        },
        '#main-board button[data-navigate]'
    );

}

function initLosingScreen() {
    document.querySelector("#lost-button").addEventListener('click', () => location.href = _connectGameHref);
}

function initWinningScreen() {
    document.querySelector("#go-back-to-lobby-button").addEventListener('click', () => location.href =_connectGameHref );
    document.querySelector("#party-button").addEventListener('click', changeBackground);
}

