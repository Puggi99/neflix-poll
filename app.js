"use strict"
let seriesList = new Collection('')

displaySeries()

DataService.getSeries().then(data => {
    fillSeriesArrayFromServer(data);
    displaySeries();
})

function fillSeriesArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];
        const serie = new Serie(object.title, object.creator, object.seasons, object.isCompleted, object.upVotes, object.downVotes,object.imageURL, object.id);
        seriesList.addSerie(serie);
    }
}



function displaySeries() {

    const serieTitle = document.getElementById('list-name');
    const serieUl = document.getElementById('series-list');

    const titleNode = document.createTextNode(seriesList.title);

    serieTitle.appendChild(titleNode);

    serieUl.innerHTML = '';

    for (let i = 0; i < seriesList.series.length; i++) {
        const serie = seriesList.series[i];
        const newLi = document.createElement('li');
        newLi.classList.add('serie-li');

        const vaiACapo1 = document.createElement('br')
        const vaiACapo2 = document.createElement('br')
        const vaiACapo3 = document.createElement('br')
        //SPAN
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('serie-title')

        const creatorSpan = document.createElement('span');
        creatorSpan.classList.add('creator-name');

        const seasonsSpan = document.createElement('span')
        seasonsSpan.classList.add('seasons-number')
        //NODE
        const titleNode = document.createTextNode(`Title: ${serie.title}`);
        const creatorNode = document.createTextNode(`Creator: ${serie.creator}`)
        const seasonsNode = document.createTextNode(`Seasons: ${serie.seasons}`)

        titleSpan.appendChild(titleNode);
        titleSpan.appendChild(vaiACapo1)
        creatorSpan.appendChild(creatorNode);
        creatorSpan.appendChild(vaiACapo2)
        seasonsSpan.appendChild(seasonsNode)
        seasonsSpan.appendChild(vaiACapo3)
        newLi.appendChild(createImgOfSerie(serie));
        newLi.appendChild(titleSpan);
        newLi.appendChild(creatorSpan);
        newLi.appendChild(seasonsSpan)

        const upVoteBtn = document.createElement('button');
    const upVoteNode = document.createTextNode('UP')
    
    upVoteBtn.appendChild(upVoteNode);
    upVoteBtn.upVote = serie.upVotes;
    upVoteBtn.classList.add('serie-upVote')
    upVoteBtn.addEventListener('click', (event) =>{
        DataService.putSerie(serie).then(updateSerie => {
            displaySeries();
            console.log(serie.addUpVotes())
    } )
}
)
        newLi.appendChild(upVoteBtn)
        newLi.appendChild(createdownVoteButton(serie))

        
      

        serieUl.appendChild(newLi);
    }
}


//FUNZIONI PER RIDURRE LE DIMENSIONI


function orderByTitle() {
    seriesList.sortByTitle();
    displaySeries();
}

function orderByUpVotes() {
    seriesList.sortByUpVotes();
    displaySeries();
}

function orderByDownVotes() {
    seriesList.sortByDownVotes();
    displaySeries();
}

function orderByBest() {
    seriesList.sortByBest();
    displaySeries();
}

function createUpvoteButton(serie){
    // const upvoteBtn = document.createElement('button');;
    // const upvoteNode = document.createTextNode(`Upvote`);
    // upvoteBtn.appendChild(upvoteNode);
    // upvoteBtn.addEventListener('click', (event) => {
    //     Serie.addUpVotes(serie)
    //     displaySeries();
    //         console.log(serie.upVotes)
    // });
    // return upvoteBtn;
    }

Serie.downVotes = 0
function createdownVoteButton(serie){

    const downvoteBtn = document.createElement('button');;
    const downvoteNode = document.createTextNode(`Downvote`);
    downvoteBtn.appendChild(downvoteNode);
    downvoteBtn.addEventListener('click', (event) => {
        Serie.addDownVotes();
        displaySeries();
        console.log(serie.downVotes)
    });
    return downvoteBtn;
}


function createImgOfSerie(serie){
    const imgTag = document.createElement('img');
    imgTag.classList.add('serie-img');
    imgTag.src = serie.imageURL;

    return imgTag
}
