if(sessionStorage.getItem('isLogged') !== 'T'){
    window.location.href = 'index.html';
}

const getPlayerIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const createPlayerDetails = (playerData) => {
    const detailsContainer = document.getElementById('player-details');
    detailsContainer.innerHTML = ''; // Clear any existing content

    const playerImage = document.createElement('img');
    playerImage.src = playerData.imagem;
    playerImage.alt = playerData.nome;

    const details = document.createElement('div');




    const playerName = document.createElement('h2');
    playerName.innerText = playerData.nome;

    const playerPosition = document.createElement('h4');
    playerPosition.innerText = capWord(playerData.posicao);

    const playerInfo = document.createElement('p');
    playerInfo.innerHTML = `
        <strong>Número de jogos:</strong> ${playerData.n_jogos}<br>
        <strong>Naturalidade:</strong> ${playerData.naturalidade}<br>
        <strong>Nascimento:</strong> ${playerData.nascimento}<br>
        <strong>Altura:</strong> ${playerData.altura}<br>
        <strong>No Botafogo desde:</strong> ${playerData.no_botafogo_desde}<br>
        <strong>Detalhes:</strong> ${playerData.detalhes}<br>
        <a href="${playerData.url_detalhes}" target="_blank">Mais detalhes</a>
    `;

    detailsContainer.appendChild(playerImage);

    details.appendChild(playerName);
    details.appendChild(playerPosition);
    details.appendChild(playerInfo);

    detailsContainer.appendChild(details);

}

const displayErrorMessage = (message) => {
    const detailsContainer = document.getElementById('player-details');
    detailsContainer.innerHTML = ''; // Clear any existing content

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;

    detailsContainer.appendChild(errorMessage);
}

const updatePlayerDetails = (playerId) => {
    const url = `https://botafogo-atletas.mange.li/2024-1/${playerId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Jogador não encontrado');
            }
            return response.json();
        })
        .then(data => {
            createPlayerDetails(data);
        })
        .catch(error => {
            displayErrorMessage('Jogador não encontrado');
        });
}

const capWord = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

const playerId = getPlayerIdFromUrl();
if (playerId) {
    updatePlayerDetails(playerId);
} else {
    displayErrorMessage('ID do jogador não encontrado na URL');
}
