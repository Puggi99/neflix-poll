class Serie {

    constructor(title, creator, seasons, isCompleted, upVotes, downVotes,imageURL, id) {
        this.title = title;
        this.creator = creator;
        this.seasons = seasons;
        this.isCompleted = isCompleted;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.imageURL = imageURL;
        if (id) {
            this.id = id;
        }

    }


    compareByTitle(serie2) {
        return this.title.localeCompare(serie2.title);
    }


    addupVotes(serie){
        this.upVotes+=1
    }

    addDownVotes(){
        this.downVotes+=1
    }

}


