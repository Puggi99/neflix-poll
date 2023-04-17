class DataService{

    static getSeries(){
        return fetch('https://643694673e4d2b4a12d616bf.mockapi.io/Netflix')
            .then(resp => resp.json());
    }

    static putSerie(serie){
        const jsonSeries = JSON.stringify(todo.toDbModel());
        return fetch(`https://643694673e4d2b4a12d616bf.mockapi.io/Netflix/` + serie.id, {method: `PUT`, body: jsonSeries, headers: {'content-type':'application/json'}})
            .then(resp => resp.json());
    }

}