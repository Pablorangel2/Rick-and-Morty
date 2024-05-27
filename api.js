const baseUrl = 'https://rickandmortyapi.com/api/character/';
const totalPages = 42; // Número total de páginas

// Função para buscar uma página aleatória
async function fetchRandomPage() {
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const response = await fetch(`${baseUrl}?page=${randomPage}`);
    if (response.status === 200) {
        const data = await response.json();
        return data.results;
    } else {
        console.error('Erro ao buscar dados');
        return [];
    }
}

// Função para buscar um personagem aleatório
async function fetchRandomCharacter() {
    const characters = await fetchRandomPage();
    if (characters.length > 0) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    } else {
        return null;
    }
}

function traduzirGenero(gender) {
    const generos = {
        'Male': 'Masculino',
        'Female': 'Feminino',
        'Genderless': 'Sem Gênero',
        'unknown': 'Desconhecido'
    };
    return generos[gender] || gender;
}

function traduzirStatus(status) {
    const statusTraduzidos = {
        'Alive': 'Vivo',
        'Dead': 'Morto',
        'unknown': 'Desconhecido'
    };
    return statusTraduzidos[status] || status;
}

function traduzirEspecie(species) {
    const especies = {
        'Human': 'Humano',
        'Alien': 'Alienígena',
        'unknown': 'Desconhecido'
    };
    return especies[species] || species;
}

function criarInputsPersonagem(personagem) {
    const conteudo = document.getElementById('charConteudo');
    conteudo.innerHTML = ''; // Limpa o conteúdo

    const div = document.createElement('div');
    div.style.color = 'white';
    div.style.alignItems = 'center';
    div.style.margin = '12px';
    div.style.fontSize = '20px';

    // Nome
    const nomeInput = document.createElement('input');
    nomeInput.type = 'text';
    nomeInput.value = personagem.name;
    nomeInput.readOnly = true;
    div.appendChild(document.createTextNode('Nome: '));
    div.appendChild(nomeInput);
    div.appendChild(document.createElement('br'));

    // Status
    const statusInput = document.createElement('input');
    statusInput.type = 'text';
    statusInput.value = traduzirStatus(personagem.status);
    statusInput.readOnly = true;
    div.appendChild(document.createTextNode('Status: '));
    div.appendChild(statusInput);
    div.appendChild(document.createElement('br'));

    // Espécie
    const especieInput = document.createElement('input');
    especieInput.type = 'text';
    especieInput.value = traduzirEspecie(personagem.species);
    especieInput.readOnly = true;
    div.appendChild(document.createTextNode('Espécie: '));
    div.appendChild(especieInput);
    div.appendChild(document.createElement('br'));

    // Gênero
    const generoInput = document.createElement('input');
    generoInput.type = 'text';
    generoInput.value = traduzirGenero(personagem.gender);
    generoInput.readOnly = true;
    div.appendChild(document.createTextNode('Gênero: '));
    div.appendChild(generoInput);
    div.appendChild(document.createElement('br'));

    // Imagem
    const imagem = document.createElement('img');
    imagem.src = personagem.image;
    imagem.alt = personagem.name;
    imagem.style.width = '100%';
    div.appendChild(imagem);
    div.appendChild(document.createElement('br'));

    conteudo.appendChild(div);
}

async function iniciar(event) {
    if (event) event.preventDefault(); // Impede o recarregamento da página se houver evento
    const personagemAleatorio = await fetchRandomCharacter();
    if (personagemAleatorio) {
        console.log('Você é: ', personagemAleatorio);
        criarInputsPersonagem(personagemAleatorio);

        document.querySelector('.formulario').classList.remove('hidden');

        // Tocar a música
        const music = document.getElementById('backgroundMusic');
        music.play();
    } else {
        console.error('Nenhum personagem encontrado.');
    }
}

// Adiciona um evento de clique ao botão após o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    button.addEventListener('click', iniciar);
});
