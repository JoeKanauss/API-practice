function numberFact(designation){
    var number;
    if(designation == "selected"){
       number = document.getElementById('number-select').value;
        if(number == ''){
            number = 0;
        }
    }
    else if(designation == "random"){
        number = Math.floor(Math.random()*100);
        document.getElementById('number-select').value = number;
    }
    var request = new XMLHttpRequest();
    request.open('GET','http://numbersapi.com/'+number+'/', true );
    request.onload = function(data){
        if(request.status >= 200 && request.status < 400){
                document.getElementById('fact').innerHTML= data.srcElement.response;
        }else{
            document.getElementById('fact').innerHTML = "OOPS! Something went wrong on our end! Please try again later.";
        }
    }
    request.send();
}

