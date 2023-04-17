class Collection{


    constructor(title, series = []){
        this.title = title;
        this.series = series
    }

    addSerie(serie){
        this.series.push(serie);
    }

    sortByTitle() {
        return this.series.sort((serie1, serie2) => serie1.compareByTitle(serie2));
    }


       
   
}