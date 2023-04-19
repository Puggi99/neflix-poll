class Collection{


    constructor(title, series = []){
        this.title = title;
        this.series = series
    }

    addSerie(serie){
        this.series.push(serie);
    }

    sortByTitle() {
        this.series.sort((serie1, serie2) => serie1.compareByTitle(serie2));
    }

    sortByUpVotes(){
        this.series.sort((serie1,serie2) => serie2.upVotes - serie1.upVotes)
    }

    sortByDownVotes(){
        this.series.sort((serie1,serie2) =>  serie2.downVotes - serie1.downVotes) 
    }
       
    sortByRating(){ 
        this.series.sort((serie1,serie2) => serie1.compareByRating(serie2));
    }
   
}