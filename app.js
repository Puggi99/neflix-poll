"use strict"
let seriesList = new Collection('')


startLoading()
DataService.getSeries().then(data => {
    fillSeriesArrayFromServer(data);
    displaySeries();
    stopLoading()
}).catch(err =>{
    // const errorMessage = document.getElementById('error-message');
    // const errorNode = document.createTextNode('accidenti, si è verificato un errore ');
    // errorMessage.appendChild(errorNode);
    displayErrorMessage('accidenti, si è verificato un errore')
    stopLoading()
})

function fillSeriesArrayFromServer(data) {
    for (let i = 0; i < data.length; i++) {
        const object = data[i];
        const serie = new Serie(object.title, object.creator, object.seasons, object.isCompleted, object.upVotes, object.downVotes, object.imageURL, object.id);
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
        upVoteBtn.innerHTML ='<img src="./assets/pngfind.com-thumbs-upemoji-png-6827427.png"/>' + serie.upVotes

        // upVoteBtn.upVote = serie.upVotes;
        upVoteBtn.classList.add('serie-upvote')
        upVoteBtn.addEventListener('click', (event) => {
            DataService.putSerie(serie).then(updateSerie => {
                console.log(serie.addUpVotes())
                displaySeries()
        }).catch(err=>{
            displayErrorMessage('accidenti, al momento non è possibile votare');
     
        
    })
    })

        const downVoteBtn = document.createElement('button');
        downVoteBtn.innerHTML ='<img src="./assets/pngfind.com-thumbs-downicon-png-59489.png"/>'+ serie.downVotes;

        
        downVoteBtn.classList.add('serie-downVote')

        downVoteBtn.addEventListener('click', (event) => {
            DataService.putSerie(serie).then(updateSerie => {
                
                console.log(serie.addDownVotes())
                startLoading()
                displaySeries();
                







                
            }).catch(err=>{
                displayErrorMessage('accidenti, al momento non è possibile votare');
         
            
        })
        }
        )
        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('add-down-container')
        buttonContainer.appendChild(upVoteBtn);
        buttonContainer.appendChild(downVoteBtn)

        newLi.appendChild(buttonContainer)



        serieUl.appendChild(newLi);
    }
}



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
    seriesList.sortByRating();
    displaySeries();
}

function createUpvoteButton(serie) {
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



function createImgOfSerie(serie) {
    const imgTag = document.createElement('img');
    imgTag.classList.add('serie-img');
    imgTag.src = serie.imageURL;

    return imgTag
}



function saveNewSerie(){
    const titleInput = document.getElementById('title-input')
    const creatorInput = document.getElementById('creator-input')
    const seasonsInput = document.getElementById('seasons-input')
    const isCompleteInput = document.getElementById('isComplete-input')
    const imageInput = document.getElementById('image-input')

    const newSerieTitle = titleInput.value;
    const newSerieCreator = creatorInput.value;
    const newSerieSeasons = seasonsInput.value;
    const newSerieIsComplete = isCompleteInput.value;
    const newUpVotes = 0;
    const newDownVotes = 0;
    const newSerieImage = imageInput.value;
    
    const newSerie = new Serie(newSerieTitle, newSerieCreator, newSerieSeasons, newSerieIsComplete, newUpVotes, newDownVotes, newSerieImage);

    console.log(newSerie)
    DataService.postSerie(newSerie).then(savedSerie => {
        stopLoading();
        //const finalSerie = new Serie(savedSerie.title, savedSerie.creator, savedSerie.seasons, savedSerie.isCompleted, savedSerie.upVotes, savedSerie.downVotes, savedSerie.imageUrl, savedSerie.id );
        newSerie.id = savedSerie.id;
        newSerie.title = savedSerie.title;
        newSerie.isComplet
        newSerie.creator = savedSerie.creator;
        // newSerie.isCompleted = savedSerie.isCompleted;
        newSerie.imageURL = savedSerie.imageURL;
        seriesList.addSerie(newSerie);
        displaySeries()
    })
  
    .catch(err=>{
        displayErrorMessage('accidenti, al momento non è possibile salvare');
 
    
})
    // seriesList.addSerie(newSerie);

    // displaySeries()
}


function displayErrorMessage(message){
    const errorMessage = document.getElementById('error-message');
    const errorNode = document.createTextNode(message);
    errorMessage.appendChild(errorNode);
}


function startLoading(){
    const loadingIcon = document.getElementById('gif');
    loadingIcon.style.display = 'inline-block' 
}

function stopLoading(){
    const loadingIcon = document.getElementById('gif');
    loadingIcon.style.display = 'none' 
}