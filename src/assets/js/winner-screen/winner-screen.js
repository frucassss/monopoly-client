"use strict";

function changeBackground() {
    const $body = document.querySelector("#winner-screen main");
    const $h2 = $body.querySelector("h2");
    $h2.innerHTML = "";
    $body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/955800521409703966/959439396560584704/fortnite-monopoly.gif')";
}
