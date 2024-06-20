
if(sessionStorage.getItem("isLogged") !== "T"){
    window.location.href = "index.html";
}


let players = []

const createCard = (playerData, 
    targetContainer) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = 'card';



    cardContainer.style.backgroundImage = `url('${playerData.imagem}')`;

    const cardContent = document.createElement("div");
    cardContent.className = 'card_content';

    cardContainer.addEventListener('click', function () {
        const param = playerData.id;

        window.location.href = 'detalhes.html?id=' + encodeURIComponent(param);
    });

    targetContainer.appendChild(cardContainer);
}

const filterInput = document.getElementById("filter-input");
filterInput.addEventListener('input', (e)=>{
    filteredData = filterPlayer(e.target.value)
    update(filteredData)
})



const filterPlayer = (value) => {
    const filteredData = players.filter((player) => {
        return player.nome.toLowerCase().includes(value.toLowerCase()) || player.posicao.toLowerCase().includes(value.toLowerCase())
        });
    
        return filteredData
    
}

const update = (data)=>{
    const targetContainer = document.getElementById("player_list");

    targetContainer.innerHTML = '';

    data.forEach(playerData => {
        createCard(playerData, targetContainer);
    });
}


const updatePlayerList = (endPoint) => {
    const url = `https://botafogo-atletas.mange.li/2024-1/${endPoint}`;

    fetch(url)
        .then(response => response.json()).then(data => {
            players = data
            update(data)
        })
        .catch(error => {
            console.error('Erro ao buscar no endPoint:', error);
        });
}

const capWord = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}


const endPoints = {
    'masc': false,
    'fem': false
}
const filters = document.getElementsByClassName('filter');

Array.from(filters).forEach(element => {
    element.addEventListener("click", (e) => {
        const value = e.target.value;
        endPoints[value] = !endPoints[value];


        if (endPoints[value]) {
            e.target.classList.add('active');
        } else {
            e.target.classList.remove("active");
        }

        if (endPoints['masc'] && endPoints['fem']) {
            updatePlayerList('all');
        } else if (endPoints["masc"]) {
            updatePlayerList('masculino');
        } else if (endPoints['fem']) {
            updatePlayerList('feminino');
        } else {
            updatePlayerList("all");
        }
    });
});

updatePlayerList('all');

