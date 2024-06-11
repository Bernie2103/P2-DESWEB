document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('index.html')) {
        checkAuth();
        loadAthletes('all');
    } else if (path.includes('details.html')) {
        checkAuth();
        loadAthleteDetails();
    }
});

function login() {
    const password = document.getElementById('password').value;
    const hashedPassword = sha256(password);
    const correctHash = 'hash_da_senha';  // Substitua pelo hash correto
    if (hashedPassword === correctHash) {
        localStorage.setItem('authorized', 'true');
        window.location.href = 'index.html';
    } else {
        alert('Senha incorreta!');
    }
}

function checkAuth() {
    if (!localStorage.getItem('authorized')) {
        window.location.href = 'login.html';
    }
}

async function loadAthletes(gender) {
    let url = 'https://botafogo-atletas.mange.li/2024-1/all';
    if (gender === 'masculino') {
        url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
    } else if (gender === 'feminino') {
        url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAthletes(data);
    } catch (error) {
        console.error('Erro ao carregar atletas:', error);
    }
}

function displayAthletes(athletes) {
    const container = document.getElementById('athletes-container');
    container.innerHTML = '';
    athletes.forEach(athlete => {
        const athleteCard = document.createElement('div');
        athleteCard.className = 'athlete-card';
        athleteCard.innerHTML = `
            <h3>${athlete.name}</h3>
            <p>${athlete.position}</p>
            <a href="details.html?id=${athlete.id}">Detalhes</a>
        `;
        container.appendChild(athleteCard);
    });
}

async function loadAthleteDetails() {
    const params = new URLSearchParams(window.location.search);
    const athleteId = params.get('id');
    if (!athleteId) {
        alert('ID do atleta não fornecido!');
        return;
    }

    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${athleteId}`);
        const athlete = await response.json();
        displayAthleteDetails(athlete);
    } catch (error) {
        console.error('Erro ao carregar detalhes do atleta:', error);
        document.getElementById('details-container').innerText = 'Erro ao carregar detalhes do atleta.';
    }
}

function displayAthleteDetails(athlete) {
    const container = document.getElementById('details-container');
    container.innerHTML = `
        <h1>${athlete.name}</h1>
        <p>Posição: ${athlete.position}</p>
        <p>Idade: ${athlete.age}</p>
        <p>Nacionalidade: ${athlete.nationality}</p>
    `;
}

function filterAthletes() {
    const gender = document.getElementById('gender-select').value;
    loadAthletes(gender);
}

// Biblioteca SHA-256 (adicione no seu HTML)
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
