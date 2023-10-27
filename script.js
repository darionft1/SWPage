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