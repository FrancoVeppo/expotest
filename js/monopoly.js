document.addEventListener('DOMContentLoaded', () => {
    // --- DATOS DEL JUEGO ---
    const boardData = [ { name: "Salida", type: "corner" }, { name: "Formosa", price: 60, group: "litoral", rent: [2, 10, 30, 90, 160, 250], houseCost: 50, houses: 0 }, { name: "Arca Comunal", type: "community-chest" }, { name: "Chaco", price: 60, group: "litoral", rent: [4, 20, 60, 180, 320, 450], houseCost: 50, houses: 0 }, { name: "Imp. a las Ganancias", type: "tax", price: 200 }, { name: "Aeroparque J. Newbery", price: 200, group: "airport", rent: [25, 50, 100, 200], houseCost: 0, houses: 0 }, { name: "Jujuy", price: 100, group: "norte", rent: [6, 30, 90, 270, 400, 550], houseCost: 50, houses: 0 }, { name: "Suerte", type: "chance" }, { name: "Salta", price: 100, group: "norte", rent: [6, 30, 90, 270, 400, 550], houseCost: 50, houses: 0 }, { name: "Tucumán", price: 120, group: "norte", rent: [8, 40, 100, 300, 450, 600], houseCost: 50, houses: 0 }, { name: "Cárcel / De Visita", type: "corner" }, { name: "La Rioja", price: 140, group: "cuyo", rent: [10, 50, 150, 450, 625, 750], houseCost: 100, houses: 0 }, { name: "AYSA", price: 150, group: "utility", rent: [4, 10], houseCost: 0, houses: 0 }, { name: "San Juan", price: 140, group: "cuyo", rent: [10, 50, 150, 450, 625, 750], houseCost: 100, houses: 0 }, { name: "Mendoza", price: 160, group: "cuyo", rent: [12, 60, 180, 500, 700, 900], houseCost: 100, houses: 0 }, { name: "Aeropuerto de Córdoba", price: 200, group: "airport", rent: [25, 50, 100, 200], houseCost: 0, houses: 0 }, { name: "Misiones", price: 180, group: "mesopotamia", rent: [14, 70, 200, 550, 750, 950], houseCost: 100, houses: 0 }, { name: "Arca Comunal", type: "community-chest" }, { name: "Corrientes", price: 180, group: "mesopotamia", rent: [14, 70, 200, 550, 750, 950], houseCost: 100, houses: 0 }, { name: "Entre Ríos", price: 200, group: "mesopotamia", rent: [16, 80, 220, 600, 800, 1000], houseCost: 100, houses: 0 }, { name: "Estacionamiento Gratuito", type: "corner" }, { name: "La Pampa", price: 220, group: "patagonia", rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, houses: 0 }, { name: "Suerte", type: "chance" }, { name: "Neuquén", price: 220, group: "patagonia", rent: [18, 90, 250, 700, 875, 1050], houseCost: 150, houses: 0 }, { name: "Río Negro", price: 240, group: "patagonia", rent: [20, 100, 300, 750, 925, 1100], houseCost: 150, houses: 0 }, { name: "Aeropuerto de Bariloche", price: 200, group: "airport", rent: [25, 50, 100, 200], houseCost: 0, houses: 0 }, { name: "Chubut", price: 260, group: "sur", rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, houses: 0 }, { name: "Santa Cruz", price: 260, group: "sur", rent: [22, 110, 330, 800, 975, 1150], houseCost: 150, houses: 0 }, { name: "Edenor", price: 150, group: "utility", rent: [4, 10], houseCost: 0, houses: 0 }, { name: "Tierra del Fuego", price: 280, group: "sur", rent: [24, 120, 360, 850, 1025, 1200], houseCost: 150, houses: 0 }, { name: "Váyase a la Cárcel", type: "corner jail" }, { name: "Santiago del Estero", price: 300, group: "centro", rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, houses: 0 }, { name: "Santa Fe", price: 300, group: "centro", rent: [26, 130, 390, 900, 1100, 1275], houseCost: 200, houses: 0 }, { name: "Arca Comunal", type: "community-chest" }, { name: "Córdoba", price: 320, group: "centro", rent: [28, 150, 450, 1000, 1200, 1400], houseCost: 200, houses: 0 }, { name: "Aeropuerto de Ezeiza", price: 200, group: "airport", rent: [25, 50, 100, 200], houseCost: 0, houses: 0 }, { name: "Suerte", type: "chance" }, { name: "Prov. Buenos Aires", price: 350, group: "capital", rent: [35, 175, 500, 1100, 1300, 1500], houseCost: 200, houses: 0 }, { name: "Impuesto al Lujo", type: "tax", price: 100 }, { name: "Capital Federal", price: 400, group: "capital", rent: [50, 200, 600, 1400, 1700, 2000], houseCost: 200, houses: 0 }, ];
    const chanceCards = [ { text: "Salga de la cárcel gratis. Esta tarjeta puede conservarse hasta ser usada.", action: (p) => { p.hasGetOutOfJailCard = true; }, isGetOutOfJail: true }, { text: "Avanza a la Salida. Cobra $200.", action: (p) => { p.position = 0; p.money += 200; } }, { text: "El banco te paga un dividendo de $50.", action: (p) => p.money += 50 }, { text: "Ve a la Cárcel.", action: (p) => goToJail(p) }, { text: "Paga una multa por exceso de velocidad de $15.", action: (p) => p.money -= 15 }, ];
    const communityChestCards = [ { text: "Salga de la cárcel gratis. Esta tarjeta puede conservarse hasta ser usada.", action: (p) => { p.hasGetOutOfJailCard = true; }, isGetOutOfJail: true }, { text: "Error del banco a tu favor. Cobra $200.", action: (p) => p.money += 200 }, { text: "Paga la factura del doctor. $50.", action: (p) => p.money -= 50 }, { text: "Heredas $100.", action: (p) => p.money += 100 }, ];
    const availableEmojis = ['🚗', '🎩', '🚢', '🐶', '🦖', '🐧', '🚀', '🛵', '🐎', '🤖', '👑', '⭐'];

    const players = [ { id: 1, name: "Jugador 1", position: 0, money: 1500, token: '🚗', color: '#ff4d4d', isInJail: false, jailTurns: 0, hasGetOutOfJailCard: false }, { id: 2, name: "Jugador 2", position: 0, money: 1500, token: '🎩', color: '#4d88ff', isInJail: false, jailTurns: 0, hasGetOutOfJailCard: false } ];
    let currentPlayerIndex = 0;
    let lastDiceRoll = 0;
    let doublesCount = 0;

    const mainContainer = document.querySelector('.main-container');
    const boardElement = document.getElementById('board');
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const manageBtn = document.getElementById('manage-btn');
    const playerInfoElement = document.getElementById('player-info');
    const controlsElement = document.querySelector('.controls');
    const die1Element = document.getElementById('die-1');
    const die2Element = document.getElementById('die-2');
    const diceTotalElement = document.getElementById('dice-total');
    const purchaseModalOverlay = document.getElementById('purchase-modal-overlay');
    const modalPropertyName = document.getElementById('modal-property-name');
    const modalBuyBtn = document.getElementById('modal-buy-btn');
    const modalPassBtn = document.getElementById('modal-pass-btn');
    const infoModalOverlay = document.getElementById('info-modal-overlay');
    const infoModalIcon = document.getElementById('info-modal-icon');
    const infoModalTitle = document.getElementById('info-modal-title');
    const infoModalText = document.getElementById('info-modal-text');
    const infoModalOkBtn = document.getElementById('info-modal-ok-btn');
    const startupMenu = document.getElementById('startup-menu');
    const p1NameInput = document.getElementById('p1-name');
    const p2NameInput = document.getElementById('p2-name');
    const emojiSelectionP1 = document.getElementById('emoji-selection-p1');
    const emojiSelectionP2 = document.getElementById('emoji-selection-p2');
    const p1ColorInput = document.getElementById('p1-color');
    const p2ColorInput = document.getElementById('p2-color');
    const startGameBtn = document.getElementById('start-game-btn');
    const jailModalOverlay = document.getElementById('jail-modal-overlay');
    const jailModalText = document.getElementById('jail-modal-text');
    const jailPayBtn = document.getElementById('jail-pay-btn');
    const jailRollBtn = document.getElementById('jail-roll-btn');
    const jailCardBtn = document.getElementById('jail-card-btn');

    function populateEmojiSelectors() {
        [emojiSelectionP1, emojiSelectionP2].forEach((container, playerIndex) => {
            container.innerHTML = '';
            availableEmojis.forEach(emoji => {
                const button = document.createElement('button');
                button.classList.add('emoji-choice');
                button.textContent = emoji;
                button.onclick = () => {
                    container.querySelectorAll('.emoji-choice').forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    container.dataset.selectedEmoji = emoji;
                };
                container.appendChild(button);
            });
            const defaultEmoji = players[playerIndex].token;
            const defaultButton = Array.from(container.children).find(btn => btn.textContent.trim() === defaultEmoji.trim());
            if (defaultButton) defaultButton.classList.add('selected');
            container.dataset.selectedEmoji = defaultEmoji;
        });
    }

    function launchGame() {
        players[0].name = p1NameInput.value || "Jugador 1";
        players[1].name = p2NameInput.value || "Jugador 2";
        players[0].token = emojiSelectionP1.dataset.selectedEmoji;
        players[1].token = emojiSelectionP2.dataset.selectedEmoji;
        players[0].color = p1ColorInput.value;
        players[1].color = p2ColorInput.value;

        startupMenu.classList.remove('visible');
        mainContainer.classList.remove('hidden');
        
        // --- MODIFICACIÓN PARA MÓVIL ---
        // Si la pantalla es pequeña, mueve los controles fuera del tablero
        if (window.innerWidth <= 800) {
            mainContainer.appendChild(playerInfoElement);
            mainContainer.appendChild(controlsElement);
        }

        initializeGame();
    }

    function createBoard() {
        const positions = [ [10, 10], [10, 9], [10, 8], [10, 7], [10, 6], [10, 5], [10, 4], [10, 3], [10, 2], [10, 1], [10, 0], [9, 0], [8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10] ];
        
        boardElement.querySelectorAll('.cell').forEach(cell => cell.remove());

        boardData.forEach((cellData, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${index}`;
            const [row, col] = positions[index];
            cell.style.gridRow = row + 1;
            cell.style.gridColumn = col + 1;
            if (cellData.group && cellData.group !== "airport" && cellData.group !== "utility") {
                const colorBar = document.createElement('div');
                colorBar.classList.add('color-bar');
                colorBar.style.backgroundColor = getGroupColor(cellData.group);
                cell.appendChild(colorBar);
            }
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.textContent = cellData.name;
            cell.appendChild(nameDiv);
            if (cellData.price) {
                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                priceDiv.textContent = `$${cellData.price}`;
                cell.appendChild(priceDiv);
            }
            const tokensContainer = document.createElement('div');
            tokensContainer.classList.add('tokens-container');
            cell.appendChild(tokensContainer);
            if (cellData.type === 'corner') cell.classList.add('corner');
            boardElement.appendChild(cell);
        });
    }

    function updatePlayerInfo() {
        playerInfoElement.innerHTML = players.map(p => `<div>${p.name} ${p.token}: <span style="color:${p.color}; font-weight:bold;">$${p.money}</span> ${p.isInJail ? '<strong>(En Cárcel)</strong>' : ''} ${p.hasGetOutOfJailCard ? '🃏' : ''}</div>`).join('');
    }

    function updatePlayerTokensOnBoard() {
        document.querySelectorAll('.tokens-container').forEach(container => container.innerHTML = '');
        players.forEach(player => {
            const token = document.createElement('div');
            token.id = `player-${player.id}`;
            token.classList.add('player-token');
            token.textContent = player.token;
            const currentCell = document.getElementById(`cell-${player.position}`);
            if (currentCell) {
                const tokensContainer = currentCell.querySelector('.tokens-container');
                if (tokensContainer) {
                    tokensContainer.appendChild(token);
                }
            }
        });
        updatePlayerInfo();
    }

    function rollDice() {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.isInJail) {
            showJailModal(currentPlayer);
            return;
        }

        rollDiceBtn.disabled = true;
        manageBtn.disabled = true;
        diceTotalElement.textContent = '';

        die1Element.classList.add('rolling');
        die2Element.classList.add('rolling');

        setTimeout(() => {
            die1Element.classList.remove('rolling');
            die2Element.classList.remove('rolling');

            const d1 = Math.floor(Math.random() * 6) + 1;
            const d2 = Math.floor(Math.random() * 6) + 1;
            lastDiceRoll = d1 + d2;
            
            updateDieFace(die1Element, d1);
            updateDieFace(die2Element, d2);
            diceTotalElement.textContent = lastDiceRoll;
            
            const isDoubles = d1 === d2;

            if (isDoubles) {
                doublesCount++;
            } else {
                doublesCount = 0;
            }

            if (doublesCount === 3) {
                showInfoModal("¡A la Cárcel!", "Sacaste 3 dobles seguidos. ¡Vas a la cárcel!", '🚓', () => {
                    goToJail(currentPlayer);
                    switchPlayer();
                });
                return;
            }
            
            animateMovePlayer(lastDiceRoll, isDoubles);

        }, 1000);
    }

    async function animateMovePlayer(steps, isDoubles) {
        let currentPlayer = players[currentPlayerIndex];
        const passedGo = (currentPlayer.position + steps) >= 40;

        for (let i = 0; i < steps; i++) {
            currentPlayer.position = (currentPlayer.position + 1) % 40;
            updatePlayerTokensOnBoard();
            await new Promise(resolve => setTimeout(resolve, 150));
        }

        const landingAction = () => handleLanding(isDoubles);

        if (passedGo) {
            currentPlayer.money += 200;
            updatePlayerInfo();
            showInfoModal("¡Salida!", `${currentPlayer.name} ha pasado por Salida y cobra $200.`, '💰', landingAction);
        } else {
            landingAction();
        }
    }

    function updateDieFace(dieElement, value) {
        dieElement.innerHTML = '';
        dieElement.className = 'die';
        dieElement.classList.add(`face-${value}`);
        for (let i = 0; i < value; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dieElement.appendChild(dot);
        }
    }

    function handleLanding(isDoubles) {
        const currentPlayer = players[currentPlayerIndex];
        const currentCell = boardData[currentPlayer.position];
        
        const nextAction = () => {
            if (!isDoubles) {
                switchPlayer();
            } else {
                 showInfoModal("¡Dobles!", `Sacaste dobles. ¡Vuelves a tirar!`, '🎲', () => {
                    rollDiceBtn.disabled = false;
                    manageBtn.disabled = false;
                });
            }
        };

        setTimeout(() => {
            if (currentCell.price && !currentCell.owner) {
                if (currentPlayer.money >= currentCell.price) { showPurchaseModal(currentCell, currentPlayer, isDoubles); } 
                else { showInfoModal("Fondos Insuficientes", `No tienes dinero para comprar ${currentCell.name}.`, '😕', nextAction); }
            } else if (currentCell.price && currentCell.owner && currentCell.owner !== currentPlayer.id) {
                const owner = players.find(p => p.id === currentCell.owner);
                let rent = 0;
                if (currentCell.group === "airport") { const owned = boardData.filter(p => p.group === "airport" && p.owner === owner.id).length; rent = currentCell.rent[owned - 1]; } 
                else if (currentCell.group === "utility") { const owned = boardData.filter(p => p.group === "utility" && p.owner === owner.id).length; rent = currentCell.rent[owned - 1] * lastDiceRoll; } 
                else { const hasMonopoly = getPlayerMonopolies(owner).includes(currentCell.group); if (hasMonopoly && currentCell.houses === 0) { rent = currentCell.rent[0] * 2; } else { rent = currentCell.rent[currentCell.houses]; } }
                currentPlayer.money -= rent; owner.money += rent;
                const message = `${currentPlayer.name}, caes en ${currentCell.name} de ${owner.name}. ¡Pagas $${rent} de alquiler!`;
                showInfoModal("Pago de Alquiler", message, '💸', () => {
                    if (currentPlayer.money < 0) { showInfoModal("Bancarrota", `¡${currentPlayer.name} se ha quedado sin dinero!`, '☠️', nextAction); } 
                    else { nextAction(); }
                });
            } else if (currentCell.type === 'tax') {
                currentPlayer.money -= currentCell.price;
                const message = `${currentPlayer.name}, caes en ${currentCell.name}. Debes pagar $${currentCell.price}.`;
                showInfoModal("Impuestos", message, '🧾', nextAction);
            } else if (currentCell.type === 'corner jail') {
                goToJail(currentPlayer);
                showInfoModal("¡A la Cárcel!", `${currentPlayer.name}, ¡vete directamente a la cárcel!`, '🚓', () => switchPlayer());
            } else if (currentPlayer.position === 10 && !currentPlayer.isInJail) {
                showInfoModal("De Visita", `${currentPlayer.name} está de visita en la cárcel.`, '👮', nextAction);
            } else if (currentCell.type === 'chance' || currentCell.type === 'community-chest') {
                drawCard(currentCell.type, isDoubles);
            } else {
                nextAction();
            }
        }, 300);
    }
    
    function drawCard(type, isDoubles) {
        const deck = type === 'chance' ? chanceCards : communityChestCards;
        const card = deck[Math.floor(Math.random() * deck.length)];
        const currentPlayer = players[currentPlayerIndex];
        const title = type === 'chance' ? 'Suerte' : 'Arca Comunal';
        const icon = card.isGetOutOfJail ? '🃏' : (type === 'chance' ? '❓' : '📦');
        const nextAction = () => {
            if (!isDoubles) {
                switchPlayer();
            } else {
                showInfoModal("¡Dobles!", `Sacaste dobles. ¡Vuelves a tirar!`, '🎲', () => {
                    rollDiceBtn.disabled = false;
                    manageBtn.disabled = false;
                });
            }
        };

        card.action(currentPlayer);
        updatePlayerTokensOnBoard();
        showInfoModal(title, card.text, icon, nextAction);
    }

    function showPurchaseModal(property, player, isDoubles) {
        modalPropertyName.textContent = property.name;
        modalBuyBtn.textContent = `🛒 Comprar por $${property.price}`;
        const nextAction = () => {
            if (!isDoubles) {
                switchPlayer();
            } else {
                showInfoModal("¡Dobles!", `Sacaste dobles. ¡Vuelves a tirar!`, '🎲', () => {
                    rollDiceBtn.disabled = false;
                    manageBtn.disabled = false;
                });
            }
        };
        const handleBuy = () => { player.money -= property.price; property.owner = player.id; updateVisuals(); closePurchaseModal(); nextAction(); };
        const handlePass = () => { closePurchaseModal(); nextAction(); };
        modalBuyBtn.onclick = handleBuy; modalPassBtn.onclick = handlePass;
        purchaseModalOverlay.classList.add('visible');
    }

    function switchPlayer() {
        doublesCount = 0;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        diceTotalElement.textContent = '';
        updatePlayerInfo();
        rollDiceBtn.disabled = false;
        manageBtn.disabled = false;
    }

    function goToJail(player) {
        doublesCount = 0;
        player.position = 10;
        player.isInJail = true;
        player.jailTurns = 0;
        updatePlayerTokensOnBoard();
    }
    
    function showInfoModal(title, text, icon, onConfirm) {
        infoModalTitle.textContent = title; infoModalText.textContent = text; infoModalIcon.textContent = icon;
        infoModalOkBtn.onclick = () => { closeInfoModal(); if (onConfirm) onConfirm(); };
        infoModalOverlay.classList.add('visible');
    }
    
    function getPlayerMonopolies(player) {
        const owned = {};
        boardData.forEach(prop => {
            if (prop.owner === player.id && prop.group && prop.group !== "airport" && prop.group !== "utility") {
                if (!owned[prop.group]) { owned[prop.group] = []; }
                owned[prop.group].push(prop);
            }
        });
        const monopolies = [];
        for (const group in owned) {
            const groupProps = boardData.filter(p => p.group === group);
            if (owned[group].length === groupProps.length) { monopolies.push(group); }
        }
        return monopolies;
    }

    function buildHouse(player, property) {
        if (player.money < property.houseCost) { showInfoModal("Fondos Insuficientes", "No tienes dinero para construir.", '😕', () => {}); return; }
        if (property.houses >= 5) { showInfoModal("Límite de Construcción", "Ya tienes un hotel en esta propiedad.", '🏨', () => {}); return; }
        const groupProps = boardData.filter(p => p.group === property.group);
        for (const p of groupProps) {
            if (property.houses > p.houses) { showInfoModal("Construcción", `Debes construir de manera uniforme. Construye en "${p.name}" primero.`, '🏗️', () => {}); return; }
        }
        player.money -= property.houseCost;
        property.houses++;
        showInfoModal("¡Construcción!", `Has construido en ${property.name}. Ahora tiene ${property.houses > 4 ? 'un hotel' : property.houses + ' casa(s)'}.`, '🔨', () => {});
        updateVisuals(); updatePlayerInfo();
    }
    
    function initializeGame() {
        boardData.forEach((cell, index) => {
            if (cell.price) { cell.owner = null; cell.position = index; }
            if (cell.group) cell.houses = 0;
        });
        createBoard();
        updatePlayerInfo();
        updatePlayerTokensOnBoard();
    }
    
    function showJailModal(player) {
        jailModalText.textContent = `Turno ${player.jailTurns + 1} de 3. Elige una opción para intentar salir:`;
        if (player.hasGetOutOfJailCard) { jailCardBtn.classList.remove('hidden'); } else { jailCardBtn.classList.add('hidden'); }
        jailPayBtn.onclick = () => payJailFine(player);
        jailRollBtn.onclick = () => tryRollForDoubles(player);
        jailCardBtn.onclick = () => useGetOutOfJailCard(player);
        jailModalOverlay.classList.add('visible');
    }
    
    function tryRollForDoubles(player) {
        player.jailTurns++;
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        
        die1Element.classList.add('rolling');
        die2Element.classList.add('rolling');
        diceTotalElement.textContent = '';
        
        setTimeout(() => {
            die1Element.classList.remove('rolling');
            die2Element.classList.remove('rolling');
            updateDieFace(die1Element, die1);
            updateDieFace(die2Element, die2);
            diceTotalElement.textContent = die1 + die2;

            if (die1 === die2) {
                player.isInJail = false;
                player.jailTurns = 0;
                closeJailModal();
                const message = `¡Sacaste dobles (${die1} y ${die2})! Sales de la cárcel y avanzas ${die1 + die2} casillas.`;
                showInfoModal("¡Dobles!", message, '🎲', () => { animateMovePlayer(die1 + die2, false); });
            } else {
                if (player.jailTurns >= 3) {
                    closeJailModal();
                    showInfoModal("Último Intento Fallido", `Fallaste en tu tercer intento. Debes pagar $50.`, '😬', () => {
                        player.money -= 50;
                        player.isInJail = false;
                        player.jailTurns = 0;
                        if(player.money < 0){
                             showInfoModal("Bancarrota", `¡${player.name} se ha quedado sin dinero!`, '☠️', () => switchPlayer());
                        } else {
                           const message = `Pagas $50 y avanzas ${die1 + die2} casillas.`;
                           showInfoModal("¡Libre!", message, '✅', () => animateMovePlayer(die1 + die2, false));
                        }
                    });
                } else {
                    closeJailModal();
                    const message = `No sacaste dobles. Te quedas en la cárcel. Llevas ${player.jailTurns} de 3 intentos.`;
                    showInfoModal("Mala Suerte", message, '❌', () => switchPlayer());
                }
            }
        }, 1000);
    }
    
    function closeJailModal() { jailModalOverlay.classList.remove('visible'); }
    function payJailFine(player) {
        if (player.money >= 50) {
            player.money -= 50; player.isInJail = false; player.jailTurns = 0;
            closeJailModal();
            showInfoModal("¡Libre!", "Pagaste $50 y saliste de la cárcel. Ahora puedes tirar los dados.", '✅', () => { updatePlayerInfo(); rollDiceBtn.disabled = false; manageBtn.disabled = false; });
        } else { showInfoModal("Fondos Insuficientes", "No tienes $50 para pagar la multa.", '😕', () => {}); }
    }
    function useGetOutOfJailCard(player) {
        player.hasGetOutOfJailCard = false; player.isInJail = false; player.jailTurns = 0;
        closeJailModal();
        showInfoModal("¡Libre!", "Usaste tu tarjeta 'Salga de la Cárcel Gratis'. Ahora puedes tirar los dados.", '🃏', () => { updatePlayerInfo(); rollDiceBtn.disabled = false; manageBtn.disabled = false; });
    }
    function closePurchaseModal() { purchaseModalOverlay.classList.remove('visible'); }
    function closeInfoModal() { infoModalOverlay.classList.remove('visible'); }
    function getGroupColor(group) {
        const colors = { litoral: '#a52a2a', norte: '#add8e6', cuyo: '#d8bfd8', mesopotamia: '#ffa500', patagonia: '#ff0000', sur: '#ffff00', centro: '#008000', capital: '#0000ff' };
        return colors[group] || '#ccc';
    }
    function updateVisuals() {
        boardData.forEach((cell, index) => {
            if (cell.price) {
                const cellEl = document.getElementById(`cell-${index}`);
                let houseDisplay = cellEl.querySelector('.house-display');
                if (cell.houses > 0) {
                    if (!houseDisplay) { houseDisplay = document.createElement('div'); houseDisplay.classList.add('house-display'); cellEl.appendChild(houseDisplay); }
                    houseDisplay.textContent = cell.houses >= 5 ? '🏨' : '🏠'.repeat(cell.houses);
                } else { if (houseDisplay) houseDisplay.remove(); }
                if (cell.owner) {
                    const owner = players.find(p => p.id === cell.owner);
                    cellEl.style.borderColor = owner.color;
                    cellEl.style.boxShadow = `0 0 15px ${owner.color}`;
                } else {
                    cellEl.style.borderColor = '#4a4e69';
                    cellEl.style.boxShadow = 'none';
                }
            }
        });
    }
    
    function manageProperties() {
        const currentPlayer = players[currentPlayerIndex];
        showInfoModal("En Construcción", `Aquí se abrirá el menú para gestionar las propiedades de ${currentPlayer.name}.`, '🚧');
    }

    // --- EVENT LISTENERS ---
    startGameBtn.addEventListener('click', launchGame);
    rollDiceBtn.addEventListener('click', rollDice);
    manageBtn.addEventListener('click', manageProperties);

    // --- PREPARACIÓN INICIAL DE LA PÁGINA ---
    populateEmojiSelectors();
});