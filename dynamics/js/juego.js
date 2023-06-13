window.onload = function(){

    //Clase para llevar control de los jugadores
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

    //Clase para crear respuestas
    class Respuesta{
        constructor(textRespuesta, boolCorrecto){
            this.boolCorrecto = boolCorrecto;
            this.divRes = document.createElement("div");
            this.divRes.classList.add("respuesta");
            // this.divRes.textContent = textRespuesta;
            this.divRes.innerHTML="<span>"+textRespuesta+"</span>";
            this.divRes.addEventListener("click", ()=>{
                screenState = 3;
                setResScreen(divPadre,this.boolCorrecto);
            });
        }
    }
    


    //funcion que itera por los logros de los jugadores para checar si gano
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

    //Añade los logros de los jugadores
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

    //añade los logros cuando contesta correctamente la respuesta
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

    //quita los logros cuando contesta incorrectamente la respuesta
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
    /*Pantalla Correcto Incorrecto*/ 
    function setResScreen(root, boolCorrecto){
        cleanScreen(root);
        if(boolCorrecto == 1){
            addLogro();
            let divCor = document.createElement("span");
            let imgCorrect = document.createElement("img");
            imgCorrect.setAttribute("src","./statics/images/feliz.jpg");
            imgCorrect.id="imgCorrect";
            divCor.textContent = "Correcto"
            divCor.id = "correcto";
            divPadre.insertBefore(divCor, divPadre.firstChild);
            divPadre.insertBefore(imgCorrect, divPadre.firstChild);
            //console.log()
            if(checkWin()){
                screenState = 4;
                setScreens(4);
                return;
            }
        }else{
            removeLogro();
            //alterna entre los turnos de los jugadores
            jugadorActivo = jugadorActivo === player1 ? player2 : player1;
            console.log(jugadorActivo);
            let divIncor = document.createElement("span");            
            let imgIncorrect = document.createElement("img");
            imgIncorrect.setAttribute("src","./statics/images/triste.png");
            imgIncorrect.id="imgCorrect";
            divIncor.textContent = "Incorrecto"
            divIncor.id = "incorrecto";
            divPadre.insertBefore(divIncor, divPadre.firstChild);
            divPadre.insertBefore(imgIncorrect, divPadre.firstChild);
        }
        //espera un segundo antes de cambiar de vista
        setTimeout(function() {
            screenState = 1;
            setScreens(1);
        }, 1000);
    }
    /*Pantalla GANAR*/
    function setWinScreen(root){
        let ganaste = document.createElement("div");
        let imgChango = document.createElement("img");
        ganaste.id="ganarDiv";
        imgChango.setAttribute("src","./statics/images/chango.png");
        ganaste.textContent = "Ganaste "+jugadorActivo.nombre+" OMG!!!!!!! :0";
        divPadre.appendChild(ganaste);
        divPadre.appendChild(imgChango);
    }

    /*Pantalla de Pregunta*/
    function setQuestionScreen(root){
        let datos = {materia: materia}
        //hace una peticion a php para obtener una pregunta, manda la materia que tocó
        fetch("./dynamics/php/juego.php", {method: "POST", body: JSON.stringify(datos)}).then(function(response){
            return response.json();
        }).then(function (json){


            let divPregunta = document.createElement("span");
            let materiaHeader = document.createElement("span");
            let divMateria = document.createElement("div");
            let img1=document.createElement("img");
            let img2=document.createElement("img");
            let contRespuestas=document.createElement("div");

            contRespuestas.id="contRespuestas";
            divPregunta.id="spanPregunta";
            img1.id="img1";
            img2.id="img2";

            switch (materia) {
                case "Matemáticas":
                    img1.setAttribute("src", "./statics/images/mathIcon.png");
                    img2.setAttribute("src", "./statics/images/mathIcon.png");
                    break;
                case "Computación":
                    img1.setAttribute("src", "./statics/images/compuIcon.png");
                    img2.setAttribute("src", "./statics/images/compuIcon.png");
                    break;
                case "Literatura":
                    img1.setAttribute("src", "./statics/images/liteIcon.png");
                    img2.setAttribute("src", "./statics/images/liteIcon.png");
                    break;                   
                case "Psicología":
                    img1.setAttribute("src", "./statics/images/psicoIcon.png");
                    img2.setAttribute("src", "./statics/images/psicoIcon.png");
                    break;
                case "Química":
                    img1.setAttribute("src", "./statics/images/quimica.png");
                    img2.setAttribute("src", "./statics/images/quimica.png");
                    break;
                case "Física":
                    img1.setAttribute("src", "./statics/images/fisicaIcon.png");
                    img2.setAttribute("src", "./statics/images/fisicaIcon.png");
                default:
                    break;
            }
            divMateria.id="divMateria";

            root.appendChild(img1);
            root.appendChild(materiaHeader);
            root.appendChild(img2);

            

            let res1 = new Respuesta(json.res1.respuesta, json.res1.boolCorrect);
            let res2 = new Respuesta(json.res2.respuesta, json.res2.boolCorrect);
            let res3 = new Respuesta(json.res3.respuesta, json.res3.boolCorrect);
            let res4 = new Respuesta(json.res4.respuesta, json.res4.boolCorrect);

            contRespuestas.appendChild(res1.divRes);
            contRespuestas.appendChild(res2.divRes);
            contRespuestas.appendChild(res3.divRes);
            contRespuestas.appendChild(res4.divRes);
    
            divPregunta.textContent = json.pregunta;
            materiaHeader.textContent = materia;

            root.appendChild(divMateria);
            root.appendChild(divPregunta);
            root.appendChild(contRespuestas);
            body.style.backgroundColor="#E2F0CB"; 
            
        });


    }

    /*Pantalla de ruleta*/
    function setGameScreen(root){
        let span = document.createElement("span");
        let btnSend = document.createElement("button");
        let contPlayers = document.createElement("div");
        let divPlayer1 = document.createElement("span");
        let divPlayer2 = document.createElement("span");
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
        root.appendChild(span);
        root.appendChild(imagenFlecha);
        root.appendChild(imagenRuleta);
        root.appendChild(btnSend);
        root.appendChild(contPlayers);

        body.style.backgroundColor="#b5ead7";

        //activa la animacion de la ruleta y selecciona una materia al azar
        btnSend.addEventListener("click",()=>{
            new Promise((resolve,reject)=>{
                let casilla = Math.floor(Math.random() * 6);
                materia = materias[casilla];
                let vueltas = Math.floor(Math.random() * 5) + 2;
                let degrees = (60*(casilla+1)-60)+(360*vueltas);
                imagenRuleta.style.transition = "transform 4s linear";
                imagenRuleta.style.transform = "rotate("+degrees+"deg)";
                setTimeout(()=>{
                    resolve();
                },5000)       /*5000*/
            }).then(()=>{
                screenState = 2;
                setScreens(2);
            })
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

        
        spanTitulo.innerHTML="Preguntados";
        root.appendChild(spanTitulo);
        root.appendChild(divContainer);
        divContainer.appendChild(input1);
        divContainer.appendChild(input2);
        root.appendChild(btnInicio);
        body.style.backgroundColor="#FF9AA2";
        input1.setAttribute("placeholder", "Jugador 1");
        input2.setAttribute("placeholder", "Jugador 2");

        //obtiene el nombre de los jugadores
        btnInicio.addEventListener("click", ()=>{
            if(input1.value == "" || input2.value == ""){
                alert("Introduce nombres");
                return;
            }
            player1 = new Jugador(input1.value);
            player2 = new Jugador(input2.value);
            jugadorActivo = player1;
            screenState = 1
            setScreens(1);
        })

    }

    //limpia la pantalla para crear nuevos elementos
    function cleanScreen(root){
        root.innerHTML = "";
    }

    //limpia y lleva control de las vistas
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


    //declara algunas variables globales
    let body = document.getElementById("body");
    let player1, player2;
    let jugadorActivo;
    let screenState = 0;
    let materias = ["Matemáticas","Computación", "Literatura", "Psicología", "Química", "Física"];
    let materia = "Matemáticas";
    let divPadre = document.getElementById("juego");


    //controla el estado de la pantalla
    //0->Inicio
    //1->ruleta
    //2->pregunta
    //3->resPregunta
    //4->win
    setScreens(0);

}