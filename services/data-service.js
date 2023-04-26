class DataService{

    static getSeries(){
        return fetch('https://643694673e4d2b4a12d616bf.mockapi.io/Netflix')
            .then(resp => resp.json());
    }

    static putSerie(serie){
        const jsonSeries = JSON.stringify(serie);
        return fetch(`https://643694673e4d2b4a12d616bf.mockapi.io/Netflix/` + serie.id , {method: `PUT`, body: jsonSeries, headers: {'content-type':'application/json'}})
            .then(resp => resp.json());
    }

    static postSerie(serie){
        const jsonSerie = JSON.stringify(serie);
        return fetch(`https://643694673e4d2b4a12d616bf.mockapi.io/Netflix`, {method:'POST', headers:{'content-type':'application/json'}, body: jsonSerie}).then(resp => resp.json())
      
    }
}