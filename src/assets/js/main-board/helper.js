/* ---------------- helpers main-board ------------------- */
/* ---------------- part of main-board ------------------- */

/* ######## boolean helpers ######## */

function isItMyTurn() {
    return _game.currentPlayer === _player.username;
}

function isDirectSaleTileOnCarousel() {
    return _game.directSale === _tiles[_player.carousel].name;
}

function doIOwnTile(tilename) {
    const owner = retrieveOwner(tilename);
    if (owner) {
        return owner.name === _player.username;
    }
    return null;
}

function doIOwnTheStreet(property) {
    const street = retrieveStreetWithTileData(property);
    let numberOfPropertiesIOwnInStreet = 0;
    if (Object.keys(street).length >= 1) {
        street.forEach(tile => {
            const owner = retrieveOwner(tile.name);
            if (owner && owner.name === _player.username) {
                numberOfPropertiesIOwnInStreet++;
            }
        });
        if (street[0].groupSize === numberOfPropertiesIOwnInStreet) {
            return true;
        }
    }
    return false;
}

function newPlayer(prevGame) {
    return prevGame['turns'].at(-1)['player'] !== _game['turns'].at(-1)['player'];
}

function newMove(prevGame) {
    return prevGame['turns'].at(-1)['moves'].at(-1)['tile'] !== _game['turns'].at(-1)['moves'].at(-1)['tile'];
}


/* ######## set state helpers ######## */

// check if street is improved evenly with houses...
function canBuyHouse(tile) {
    // also checks if tile has an actual street
    if (doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);
        for (const propertyOfStreet of street) {
            // check if there is a property in the street "that is running behind" on house improvement
            if (!checkIfPropertyIsBehindOnHouseImprovement(property,propertyOfStreet)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function checkIfPropertyIsBehindOnHouseImprovement(property,propertyOfStreet){
    if (propertyOfStreet.houseCount < property.houseCount || property.houseCount > 4){
        return false;
    } else if (propertyOfStreet.hotelCount !== property.hotelCount || propertyOfStreet.mortgage || property.hotelCount >= 1){
        return false;
    } else {
        return true;
    }
}
// check if street is sold evenly...
function canSellHouse(tile) {
    // also checks if tile has an actual street
    if (doIOwnTheStreet(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            // check if there is a property in the street that has more houses than current property
            if (propertyOfStreet.houseCount > property.houseCount || property.houseCount <= 0 ||
                propertyOfStreet.hotelCount !== property.hotelCount || property.mortgage) {
                return false;
            }
        }
        return true;
    }
    return false;
}

// check if street is improved evenly with hotels...
function canBuyHotel(tile) {
    // also checks if tile has an actual street
    if (doIOwnTheStreet(tile.name) && retrieveMyBalance() >= tile.housePrice) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            // check if there is a property in the street "that is running behind" on hotel improvement
            if (!checkIfPropertyIsBehindOnHotelImprovement(property, propertyOfStreet)){
                return false;
            }
        }
        return true;
    }
    return false;
}

function checkIfPropertyIsBehindOnHotelImprovement(property, propertyOfStreet) {
    if (propertyOfStreet.hotelCount < property.hotelCount || property.houseCount < 4) {
        return false;
    } else if ((propertyOfStreet.houseCount < 4 && propertyOfStreet.hotelCount === 0) || propertyOfStreet.mortgage || property.hotelCount >= 1) {
        return false;
    } else {
        return true;
    }
}

// check if street is sold evenly...
function canSellHotel(tile) {
    // also checks if tile has an actual street
    if (doIOwnTheStreet(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);
        const property = retrievePropertyWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            // check if there is a property in the street "that is running behind" on hotel improvement
            if (propertyOfStreet.hotelCount > property.hotelCount || property.hotelCount <= 0 || property.mortgage) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function canTakeMortgage(tile) {
        const property = retrievePropertyWithOwnershipData(tile.name);
        const street = retrieveStreetWithOwnershipData(tile.name);
        if (doIOwnTile(tile.name) && !property.mortgage) {
            for (const propertyOfStreet of street) {
                if (propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0) {
                    return false;
                }
            }
            return true;
        }
    return false;
}

function canSettleMortgage(tile) {
    if (doIOwnTile(tile.name) && retrieveMyBalance() >= (parseInt(tile.mortgage) * 1.1)) {
        const property = retrievePropertyWithOwnershipData(tile.name);
        if (property.mortgage) {
            return true;
        }
    }
    return false;
}

function canBeAuctioned(tile) {
    if (doIOwnTile(tile.name)) {
        const street = retrieveStreetWithOwnershipData(tile.name);

        for (const propertyOfStreet of street) {
            if (propertyOfStreet.hotelCount !== 0 || propertyOfStreet.houseCount !== 0) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function canCollectRent() {
    const turns = _game['turns'];
    if (Object.keys(turns).length >= 1 && !_player.collectedRent) {
        const debtorName = turns.at(-1)['player']; // most recent player who moved
        const tileName = turns.at(-1)['moves'].at(-1)['tile']; // most recent tile from moves
        // if tile is not a property or not owned by me, if statement will return false
        if (doIOwnTile(tileName) && debtorName !== _player.username) {
            const property = retrievePropertyWithOwnershipData(tileName);
            if (!property.mortgage) {
                return true;
            }
        }
    }
    return false;
}

function checkIfThereIsANewMoveByTheSameOrOtherPlayer(prevGame){
    return newPlayer(prevGame) || (newMove(prevGame) && !newPlayer(prevGame));
}

function canIUseAJailCard() {
    return retrieveMyAmountOfJailCards() > 0 && retrieveIfIAmInPrison() === true;
}

function canIPayForPrisonFee(){
    return retrieveMyBalance() > 50 && retrieveIfIAmInPrison() === true;
}
