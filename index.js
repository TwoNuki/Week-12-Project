let url = 'https://66c550d4134eb8f43493fc51.mockapi.io/'

//variable to set the container element
let container = document.getElementById('dynamic-row');

//asynchronous function to get the data from the API, uses the await operator to handle the promise created by the fetch function, followed by getting the response in JSON format
async function getData(){



    let res = await fetch(`${url}/games`)
    let data = await res.json();
    displayCards(data);

    console.log(data);
}

//calls the function
getData();

//creates the function to display the API info as cards. Starts as an empty string, uses a for...of loop to use the DOM and create the elements for the columns div, card divs, headers, images, and delete buttons
function displayCards(games) {
    container.innerHTML = "";
    for (let game of games){
        let column = document.createElement('div')
        column.setAttribute('class', 'col-md-4 mb-4')

        let card = document.createElement('div')
        card.setAttribute('class', 'card');

        let title = document.createElement('h2')
        title.innerText = game.title;

        let image = document.createElement('img')
        image.src = game.boxArt;
        image.setAttribute('class', 'card-img-top');

        let rating = document.createElement('span')
        rating.innerText = game.rating / 10;
        //let finished = document.createElement('span')
        let deleteButton = document.createElement('button')

        //uses innerText to tell the button what to say on it, uses addEventListener to call the deleteGame function asynchronously and remove the selected item by its ID
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('class', 'btn btn-info');
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(game.id);
            deleteGame(game.id)
        //finished.innerText = game.finishedGame;
        });
        
        //appends the card div to the column, and the title, image, rating, and delete button to the cards, and the columns to the container
        column.appendChild(card)
        card.append(title, image, rating, deleteButton);
        //document.body.append(card);
        container.appendChild(column)
    }
}

//asynchronous function for the delete button, takes an ID as an argument, and uses await fetch to handle getting the game ID as a promise, then uses the delete method on it. refreshes the info on the screen afterwards by using await again to get the resolution as a JSON response, and then calls the getData() function again
async function deleteGame(id) {
    let res = await fetch(`${url}/games/${id}`,{
        method: 'DELETE'
    });
    let data = await res.json();
    getData();
}

/*const deleteGame = async (id) => {
    try {
        let response = await fetch(`${url}/games/${id}`, {
            method: 'DELETE'
        });
        let data = await response.json();
        console.log(data); // Do something with the data here!
    } catch (error) {
        console.error('Error:', error);
    }
}*/