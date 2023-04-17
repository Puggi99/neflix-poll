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


    addUpVotes(){
        const i = this.upVotes
        this.upVotes = i + 1
        return this.upVotes
    }

    addDownVotes(){
        this.downVotes+=1
    }

    toDbModel() {
        const dbModel = {
            title: this.title,
            creator: this.creator,
            seasons: this._seasons,
            isCompleted: this._isCompleted,
            upVotes: this.upVotes,
            downVotes: this.downVotes,
            imageUrl: this.imageUrl,
            id: this.id
        };
        return dbModel;
    };
}


