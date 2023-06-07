window.onload = function(){

    class Jugador{
        constructor(nombre){
            this.nombre = nombre
            this.mate = 0;
            this.fisica = 0;
            this.qumica = 0;
            this.psico = 0;
            this.lite = 0;
            this.compu = 0;
        }
    }

    class Respuesta{
        constructor(textRespuesta, boolCorrecto){
            this.boolCorrecto = boolCorrecto;
            this.divRes = document.createElement("div");
            this.divRes.classList.add("respuesta");
            this.divRes.textContent = textRespuesta;
            this.divRes.addEventListener("click", ()=>{
                screenState = 3;
                setResScreen(divPadre,this.boolCorrecto);
                console.log("test");
            });
        }
    }



    function checkWin(){
        for(logro in jugadorActivo){
            if(logro != "nombre"){
                if(jugadorActivo[logro] == 0){
                    return false;
                }
            }
        }
        return true;
    }

    function addTextDivPlayer(player){
        let text = "";
        text += "Player: "+player.nombre+"<br>"
        for(logro in player){
            if(logro != "nombre"){
                if(player[logro] == 1){
                    text += logro+": Conseguido<br>"
                }
            }
        }
        return text;
    }

    function addLogro(){
        if(materia == "Matemáticas"){
            jugadorActivo.mate = 1;
        }
        if(materia == "Física"){
            jugadorActivo.fisica = 1;
        }
        if(materia == "Química"){
            jugadorActivo.qumica = 1;
        }
        if(materia == "Psicología"){
            jugadorActivo.psico = 1;
        }
        if(materia == "Literatura"){
            jugadorActivo.lite = 1;
        }
        if(materia == "Computación"){
            jugadorActivo.compu = 1;
        }
    }

    function removeLogro(){
        if(materia == "Matemáticas"){
            jugadorActivo.mate = 0;
        }
        if(materia == "Física"){
            jugadorActivo.fisica = 0;
        }
        if(materia == "Química"){
            jugadorActivo.qumica = 0;
        }
        if(materia == "Psicología"){
            jugadorActivo.psico = 0;
        }
        if(materia == "Literatura"){
            jugadorActivo.lite = 0;
        }
        if(materia == "Computación"){
            jugadorActivo.compu = 0;
        }
    }

    function setResScreen(root, boolCorrecto){
        cleanScreen(root);
        if(boolCorrecto == 1){
            addLogro();
            let divCor = document.createElement("div");
            divCor.textContent = "Correcto"
            divCor.id = "correcto";
            divPadre.insertBefore(divCor, divPadre.firstChild);
            //console.log()
            if(checkWin()){
                screenState = 4;
                setScreens(4);
                return;
            }
        }else{
            removeLogro();
            jugadorActivo = jugadorActivo === player1 ? player2 : player1;
            console.log(jugadorActivo);
            let divIncor = document.createElement("div");
            divIncor.textContent = "Incorrecto"
            divIncor.id = "incorrecto";
            divPadre.insertBefore(divIncor, divPadre.firstChild);
        }
        setTimeout(function() {
            screenState = 1;
            setScreens(1);
        }, 1000);
    }

    function setWinScreen(root){
        let ganaste = document.createElement("h1");
        ganaste.textContent = "Ganaste "+jugadorActivo.nombre+"OMG!!!!!!! :0";
        root.appendChild(ganaste);
    }

    function setQuestionScreen(root){
        let datos = {materia: materia}
        fetch("./dynamics/php/juego.php", {method: "POST", body: JSON.stringify(datos)}).then(function(response){
            return response.json();
        }).then(function (json){
            console.log(json);
            let divPregunta = document.createElement("div");
            let materiaHeader = document.createElement("h1");
            let res1 = new Respuesta(json.res1.respuesta, json.res1.boolCorrect);
            let res2 = new Respuesta(json.res2.respuesta, json.res2.boolCorrect);
            let res3 = new Respuesta(json.res3.respuesta, json.res3.boolCorrect);
            let res4 = new Respuesta(json.res4.respuesta, json.res4.boolCorrect);
    
            divPregunta.textContent = json.pregunta;
            materiaHeader.textContent = materia;
    
            root.appendChild(materiaHeader);
            root.appendChild(divPregunta);
            root.appendChild(res1.divRes);
            root.appendChild(res2.divRes);
            root.appendChild(res3.divRes);
            root.appendChild(res4.divRes);
        });


    }

    /*Pantalla de ruleta*/
    function setGameScreen(root){
        let span = document.createElement("span");
        let btnSend = document.createElement("button");
        let contPlayers = document.createElement("div");
        // let divPlayer1 = document.createElement("div");
        let divPlayer1 = document.createElement("span");
        let divPlayer2 = document.createElement("span");
        // let divPlayer2 = document.createElement("div");
        let imagenRuleta = document.createElement("img");
        let imagenFlecha = document.createElement("img");

        contPlayers.id="contPlayers";
        imagenRuleta.id="imgRuleta";
        imagenFlecha.id="imgFlecha";
        span.id="spanTurno";
        btnSend.id="btnSend";



        span.textContent = "Turno de:" + jugadorActivo.nombre;
        btnSend.textContent = "Girar"
        divPlayer1.innerHTML = addTextDivPlayer(player1);
        divPlayer2.innerHTML = addTextDivPlayer(player2);
        imagenRuleta.src = "./statics/images/ruletaFinal.png";
        imagenRuleta.width = 900;
        imagenRuleta.height = 900;
        imagenFlecha.src = "./statics/images/flecha.png";
        imagenFlecha.width = 258;
        imagenFlecha.height = 338;

        contPlayers.appendChild(divPlayer1);
        contPlayers.appendChild(divPlayer2);
        divPadre.appendChild(span);
        divPadre.appendChild(imagenFlecha);
        divPadre.appendChild(imagenRuleta);
        divPadre.appendChild(btnSend);
        divPadre.appendChild(contPlayers);
        // divPadre.appendChild(divPlayer1);
        // divPadre.appendChild(divPlayer2);


        // root.appendChild(span);
        // root.appendChild(imagenRuleta);
        // root.appendChild(imagenFlecha);
        // root.appendChild(btnSend);
        // root.appendChild(divPlayer1);
        // root.appendChild(divPlayer2);

        body.style.backgroundColor="#b5ead7";


        btnSend.addEventListener("click",()=>{
            let numeroAleatorio = Math.floor(Math.random() * 6);
            materia = materias[numeroAleatorio];
            screenState = 2;
            setScreens(2);
        })
    }

    /*Primera vista*/
    function setFirstScreen(root){
        let input1 = document.createElement("input");
        let input2 = document.createElement("input");
        let btnInicio = document.createElement("button");
        let divContainer = document.createElement("div");
        let divTitulo = document.createElement("div");
        let spanTitulo = document.createElement("span");
        
        input1.value = "";
        input2.value = "";
        btnInicio.textContent = "Iniciar Juego";
        btnInicio.id = "btnInicio";
        divContainer.id = "divContainer";
        divTitulo.id="divTitulo";
        spanTitulo.id="spanTitulo";

 
        
        // divContainer.setAttribute("id", "divContainer");
        // divPadre.appendChild(divTitulo);
        spanTitulo.innerHTML="Preguntados";
        divPadre.appendChild(spanTitulo);
        divPadre.appendChild(divContainer);
        divContainer.appendChild(input1);
        divContainer.appendChild(input2);
        divPadre.appendChild(btnInicio);
        // root.appendChild(divContainer);
        // root.appendChild(input1);
        // root.appendChild(input2);
        // root.appendChild(btnInicio);
        body.style.backgroundColor="#FF9AA2";
        input1.setAttribute("placeholder", "Jugador 1");
        input2.setAttribute("placeholder", "Jugador 2");

        btnInicio.addEventListener("click", ()=>{
            player1 = new Jugador(input1.value);
            player2 = new Jugador(input2.value);
            jugadorActivo = player1;
            console.log("AHHHHHHHHH me troleaste");
            screenState = 1
            setScreens(1);
        })

    }

    function cleanScreen(root){
        root.innerHTML = "";
    }

    function setScreens(screen){
        cleanScreen(divPadre);
        if(screen == 0){
            setFirstScreen(divPadre);
        }
        if(screen == 1){
            setGameScreen(divPadre);
        }
        if(screen == 2){
            setQuestionScreen(divPadre);
        }
        if(screen == 4){
            setWinScreen(divPadre);
        }
    }


    //controla el estado de la pantall
    //0->Inicio
    //1->ruleta
    //2->pregunta
    //3->resPregunta
    //4->win
    let body = document.getElementById("body");
    let player1, player2;
    let jugadorActivo;
    let screenState = 0;
    let materias = ["Matemáticas","Física","Química","Psicología","Literatura","Computación"];
    let materia = "Matemáticas";

    let divPadre = document.getElementById("juego");
    setScreens(0);

}