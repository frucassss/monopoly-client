"use strict";

function processPropertyBack(property){
    fetchFromServer(`/tiles/${convertSpacesToUnderscores(property)}`, "GET").then(tile => {
        renderPropertyBack(tile);
    }).catch(errorHandler);
}

function processPropertyFront(property){
    fetchFromServer(`/tiles/${convertSpacesToUnderscores(property)}`, "GET").then(tile => {
        fetchFromServer(`/games/${_player.gameId}`, "GET").then(game => {
            renderPropertyFront(property, game, tile);
        }).catch(errorHandler);
    }).catch(errorHandler);
}

function processProperty(property){
    processPropertyFront(property);
    processPropertyBack(property);
}

function retrievePropertyState(game, property) {
    // default property values ["owner: none", "houses: 0", "hotels: 0", "mortgage: false"]
    const propertyState = ["none", 0, 0, "false"];

    game.players.forEach(player => {
        player.properties.forEach(ownedProperty => {
            if (ownedProperty.property === property) {
                propertyState[0] = player.name;
            }
            propertyState[1] = ownedProperty.houseCount;
            propertyState[2] = ownedProperty.hotelCount;

            if (ownedProperty.mortgage) {
                propertyState[3] = "true";
            }
        });
    });
    return propertyState;
}