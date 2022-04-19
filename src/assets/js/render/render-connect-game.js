"use strict";

function renderGames(games){
    document.querySelector('#available-games').classList.remove('hidden');
    const $template = document.querySelector('#radio-list');
    const $tr = $template.content.firstElementChild.cloneNode(true);

    const $tbody = document.querySelector('#available-games tbody');
    $tbody.innerHTML = $template.outerHTML; // reset html

    games.forEach(game => {
        if (game.started === false){

            // game name
            $tr.querySelector('td:nth-child(1)').setAttribute("for",game.id);
            $tr.querySelector('td:nth-child(1)').innerHTML=beautifyId(game.id);
            // players
            $tr.querySelector('td:nth-child(2)').setAttribute("for",game.id);
            $tr.querySelector('td:nth-child(2)').innerHTML=game.numberOfPlayers;
            // radio
            const $trInput = $tr.querySelector('td:last-of-type input');
            $trInput.setAttribute('id',game.id);
            $trInput.setAttribute('name','Games');
            $trInput.setAttribute('value',game.id);

            $tbody.insertAdjacentHTML("beforeend",$tr.outerHTML);
        }
    });
}

function hideGames(){
    document.querySelector('#available-games').classList.add('hidden');

    // remove html, so radio values in form are removed as well
    const $template = document.querySelector('#radio-list');
    const $tbody = document.querySelector('#available-games tbody');
    $tbody.innerHTML = $template.outerHTML; // reset html
}
