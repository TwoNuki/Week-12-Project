async function getData(){

    let url = 'https://66c550d4134eb8f43493fc51.mockapi.io/'

    let res = await fetch(`${url}/games`)
    let data = await res.json();
    displayCards(data);

    console.log(data);
}

getData();

function displayCards(games) {
    for (let game of games){
        let card = document.createElement('div')
        let title = document.createElement('h2')
        let image = document.createElement('img')
        let rating = document.createElement('span')
        let finished = document.createElement('span')
        let deleteButton = document.createElement('button')

        title.innerText = game.title;
        image.src = game.boxArt;
        rating.innerText = game.rating / 10;
        finished.innerText = game.finishedGame;
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteGame(game.id)
        });
        
        card.setAttribute('class')
        card.append(title, image, rating, finished);
        document.body.append(card);
        container.append(card)
    }
}

async function deleteGame(id) {
    let res = await fetch(`${url}/games/${id}`)
    
}