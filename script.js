let currentPageURL = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try{
        await loadCharacters(currentPageURL);
    } catch(error){
        console.log(error);
        alert('Erro ao carregar cards');

    }
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; //limpar os resultados anteriores

    try{
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card =document.createElement('div')
            card.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,'')}.jpg")`
            card.className = 'cards'

            const characterNameBg = document.createElement('div')
            characterNameBg.className = 'character-name-bg'

            const characterName = document.createElement('span')
            characterName.className = 'characterName'
            characterName.innerText = `${character.name}`

            characterNameBg.appendChild(characterName)
            card.appendChild(characterNameBg)

            card.onclick = () =>{
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modalContent')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = `url("https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,'')}.jpg"`
                characterImage.className = 'characterImage'
                const characterName = document.createElement('span')
                characterName.className = 'characterDetails'
                characterName.innerHTML = `Name: ${character.name}`
                const characterHeight = document.createElement('span')
                characterHeight.className = 'characterDetails'
                characterHeight.innerHTML = `Height: ${convertHeight(character.height)}`
                const characterMass = document.createElement('span')
                characterMass.className = 'characterDetails'
                characterMass.innerHTML = `Mass: ${convertMass(character.mass)}`
                const characterEyeColor = document.createElement('span')
                characterEyeColor.className = 'characterDetails'
                characterEyeColor.innerHTML = `Eye Color: ${convertEyeColor(character.eye_color)}`
                const characterBirthYear = document.createElement('span')
                characterBirthYear.className = 'characterDetails'
                characterBirthYear.innerHTML = `Birth year: ${convertBirthYear(character.birth_year)}`
                
                modalContent.appendChild(characterImage);
                modalContent.appendChild(characterName);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(characterMass);
                modalContent.appendChild(characterEyeColor);
                modalContent.appendChild(characterBirthYear);

            }

            mainContent.appendChild(card)

        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'

        currentPageURL = url;

    }catch (error){
        alert('Erro ao carregar os personagens.')
        console.log(error)
    }
}

async function loadNextPage() {
    if(!currentPageURL) return;

    try{
        const response = await fetch(currentPageURL)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)
    }catch (error){
        console.log(error)
        alert('erro ao carregar a proxima pagina.')
    }
}

async function loadPreviousPage() {
    if(!currentPageURL) return;

    try{
        const response = await fetch(currentPageURL)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
    }catch (error){
        console.log(error)
        alert('erro ao carregar a pagina anterior.')
    }
}

function hideModal (){
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function convertEyeColor(characterEyeColor) {
    const cores = {
        blue: 'azul',
        brown: 'castanho',
        green: 'verde',
        yellow: 'amarelo',
        black: 'preto',
        pink: 'rosa',
        red: 'vermelho',
        orange: 'laranja',
        hazel: 'avela',
        unknown: 'desconhecido'
    };
    return cores [characterEyeColor.toLowerCase()] || characterEyeColor;
    
}

function convertHeight(height){
    if (height === 'Unknown'){
        return 'desconhecida'
    }
    return (height /100).toFixed(2);
}

function convertMass(mass) {
    if (mass === 'Unknown'){
        return 'desconhecido'
    }
    
    return `${mass} kg`
}

function convertBirthYear(birth_year){
    if (birth_year === 'unknown'){
        return 'desconhecido'
    }

    return birth_year
}
