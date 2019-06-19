//Open tabs
function showTab(tab){
    for(i=0;i<document.querySelectorAll('.tab-content').length; i++){
        if( document.getElementsByClassName('tab-content')[tab].style.display = 'none'&& i == tab){
            document.getElementsByClassName('tab-content')[i].style.display = 'inline-block';
            document.getElementsByClassName('tab-link')[i].classList.add('active');
        }
        else if(document.getElementsByClassName('tab-content')[tab].style.display = 'inline-block' && i != tab){
            if(document.getElementsByClassName('tab-link')[i].classList.contains('active')){
                document.getElementsByClassName('tab-link')[i].classList.remove('active');
            }
            document.getElementsByClassName('tab-content')[i].style.display = 'none';
        }
        document.getElementById('type-pokemon-display').style.display = "none";
    }
}

//get pokemon stats
function getStats(id){
    var requestStats = new XMLHttpRequest();
    var url = 'https://pokeapi.co/api/v2/pokemon/'+id+'/';
    requestStats.open('GET', url);
    requestStats.onload = function(){
        var stats = JSON.parse(this.response);
        if(requestStats.status >=200 && requestStats.status < 400){
            var types = stats.types;
            types.forEach(type=>{alert(type.type.name)});
        }else{
            alert("oops");
        }
    }
    requestStats.send();
}

//get pokemon from type
function getPokemon(id){
    //array to hold pokemon of type
    var pokeList = [];

    var requestPokemon = new XMLHttpRequest();
    var url = 'https://pokeapi.co/api/v2/type/'+id+'/';
    requestPokemon.open('GET', url);
    requestPokemon.onload = function(){
        var pokemon = JSON.parse(this.response);
        if(requestPokemon.status >=200 && requestPokemon.status < 400){
            //the pokemon objects of the type
            var pkmn = pokemon.pokemon;
            pkmn.forEach(pk=>{
                //get only the id of the pokemon from its url
                var pkId = pk.pokemon.url.slice(34, pk.pokemon.url.length -1);

                //only add pokemon from the first 151 to the array of pokemon
                if(parseInt(pkId) <= 151){
                   pokeList.push("<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+pkId+".png' title='#"+pkId+": "+pk.pokemon.name.charAt(0).toUpperCase()+pk.pokemon.name.substring(1)+"'>");
                }
            })
            console.log(pokeList);
        }else{
            alert("oops");
        }
        var displayPokeList = "List of "+pokemon.name.toUpperCase()+" Pokemon:<br>";
        if(pokeList.length == 0)
        {
            displayPokeList = "No pokemon of type "+pokemon.name.toUpperCase()+" found";
        }
        else{
            for(i=0;i<pokeList.length;i++){
                displayPokeList += pokeList[i]+" ";
                // if((i+1)%3 == 0){
                //     displayPokeList += "<br>";
                // }
            }
        }
        document.getElementById('type-pokemon-display').innerHTML = displayPokeList;
        document.getElementById('type-pokemon-display').style.display = "inline";
        // alert(displayPokeList);
    }
    
    requestPokemon.send();
    
}

//Order Request
var requestOrder = new XMLHttpRequest();
requestOrder.open('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=151', true);

requestOrder.onload = function(){
     var data = JSON.parse(this.response);
     var id = 1;
    if(requestOrder.status >=200 && requestOrder.status < 400){
        data.results.forEach(pokemon => {
            document.getElementById('order').innerHTML +=("<li>"+ ('000' + id).slice(-3) + " ..... <span class='select' onClick='getStats("+id+");'>" + pokemon.name + "</span></li>");
            id++;
        })
    }
}
requestOrder.send();

//Type Request
var requestType = new XMLHttpRequest();
requestType.open('GET', 'https://pokeapi.co/api/v2/type', true);
requestType.onload = function(){ 
    var data = JSON.parse(this.response);
    var id = 1;
    if(requestType.status >=200 && requestType.status < 400){
        
       data.results.forEach(type => {
           var typeId = type.url.slice(31, type.url.length -1);
           document.getElementById('type').innerHTML +=("<li>"+ ('000' + id).slice(-3) + " ..... <span class='select' onClick='getPokemon("+(typeId)+");'>" + type.name + "</span></li>");
           id++;
       })
    }
}
requestType.send();