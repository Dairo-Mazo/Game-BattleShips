//Obtener todos los elementos id del html a utilizar
const positionPc1 = document.getElementById("positionPc-1")
const positionPc2 = document.getElementById("positionPc-2")
const positionPc3 = document.getElementById("positionPc-3")
const positionPc4 = document.getElementById("positionPc-4")
const positionPc5 = document.getElementById("positionPc-5")
const positionPc6 = document.getElementById("positionPc-6")
const positionPc7 = document.getElementById("positionPc-7")
const positionPc8 = document.getElementById("positionPc-8")
const positionPc9 = document.getElementById("positionPc-9")
const txtResult = document.getElementById("txt-result")
const txtShipsUser = document.getElementById("shipsUser")
const txtShipsPc = document.getElementById("shipsPc")
const btnPlayAgain = document.getElementById("play-again")

//Array para generar las posiciones aleatorias entre 1 y 9
const positionsNumbers = [1,2,3,4,5,6,7,8,9]

//Primer array para las posisciones del usuario, segundo para las posisciones de la computadora y tercer array para las posisciones ya utulizadas
const positionPc = [] , positionUser = [] , positionUsed = []

//Variabales que almacenan el total de barcos tanto de la computadora como del jugador
let shipsUser = 4, shipsPc = 4

//Función para generar numeros aleatorias
function randomNumbers(numbers) {

    let Number 
    Number = numbers[Math.floor(Math.random()*numbers.length)];

    return Number
}

//Función para generar las posiciones aleatorias
function randomPositions() { 

    //Ciclo para generar las posiciones de los barcos, el bucle se repite hasta que hallan 4 posiciones de barcos generados
    for (let N = 0; positionPc.length < 4; N++) {
     
     //Variable que guarda una posicion random generada por dicha función
     Number = randomNumbers(positionsNumbers)

     //Valida que la posición generada no se repita
     if (positionPc.includes(Number) == false) {

        //Si la posición generada no está repetida, hace el push al array que guarda las posiciones de la compu
        positionPc.push(Number)
       }
    
    }

    //Ciclo para generar las posiciones de los barcos, el bucle se repite hasta que hallan 4 posiciones de barcos generados
    for (let N = 0; positionUser.length < 4; N++) {

     //Variable que guarda una posicion random generada por dicha función
     Number = randomNumbers(positionsNumbers)
    
     //Valida que la posición generada no se repita
     if (positionUser.includes(Number) == false) {

        //Si la posición generada no está repetida, hace el push al array que guarda las posiciones del usuario
        positionUser.push(Number)
        
        }

    }

}

//Función para mover los barcos del usuario si lo desea
function randomPositionUserShips() {

    let positionUserShips = " "

    //Bucle se repite 9 veces porque es el numero de cuadros o posiciones que tiene la tabla de dicho juego
    for (let N = 0; N <= 9; N++){

        //Valida que los barcos estén en posiciones diferentes
        if (positionUser.includes(N) == true) {
           
            //Se crea un elemento, para la imagen del barco
            const etiqueta = document.createElement('img')

            //Se añade atributos a dicho elemnto, como: El id y la imagen del barco
            etiqueta.setAttribute("src", "img/battleship2.png")
            etiqueta.setAttribute("id", `positionImgShip-${N}`)

            //Se obtiene el elemento del cuadro td de la tabla en html.
            positionUserShips = document.getElementById( `positionUser-${N}`)

            //Se inserta en dicho elemnto la imagen del barco
            positionUserShips.appendChild(etiqueta)

        }
    }

}

//Se llaman las funciones al inicializar el juego, para generar las posiciones
randomPositions() , randomPositionUserShips()

//Función del juego, está verifica si el usuario atinó la posición del barco de la Pc y procede con el turno de la computadora
function shot(position,element){

    //Verifica si la posición elegida por el usuario es igual a la posición donde se encuntra el barco de la Pc
    if (positionPc.includes(position) == true) {

        //Cambia el stylo del elemento selecionado por una imagen de exploción y tamaño
        element.style.backgroundImage = "url('img/explosion.png')";
        element.style.backgroundSize = "58px";

        //Desabilita el elemnto para que este no se vuelva a clikeear una vez ya utilizado
        element.setAttribute("disabled", "");
        
        //Cambia el cursor del mouse
        element.style.cursor = "auto"

        //Le resta un barco a la Pc, dando a entender al usuario que destruyó un barco
        shipsPc = shipsPc - 1

        //Se actualiza la información de barcos en total
        txtShipsPc.innerHTML =  `Barcos ${shipsPc}`

        //Se le dá el mensaje final sobre dicha acción
        txtResult.innerHTML = 'Barco destruido'

        //Valida que los barcos de la Pc estén en cero para finalizar el juego
        if (shipsPc == 0) {

            //Modifica el mensaje final
            txtResult.innerHTML = 'Destruiste todos los barcos enemigos, Ganaste !'

            //Aparece el botón de volver a jugar cambiandole el style
            btnPlayAgain.style.display = "block";

            //Ciclo para desabilitar todos los botones
            for(N = 1; N <= 9; N++) {

                element = document.getElementById( `positionPc-${N}`)
                element.setAttribute("disabled", "")

                element.style.cursor = "auto"
            }
            
           return 
        }    

    //Valida si el usuario falló la posisción    
    }else{
        //Se cambia la imagen del elemento, tamaño y el cursor
        element.style.backgroundImage = "url('img/failed.png')";
        element.style.backgroundSize = "60px 50px";
        element.style.cursor = "auto"

        //Desabilita el elemnto para que este no se vuelva a clikeear una vez ya utilizado
        element.setAttribute("disabled", "")
        
        //Se modifica el resultado final
        txtResult.innerHTML = 'Disparo fallido'

    }

    //Un time out para generar un contador por segundos que muestre el turno de la computadora
    setTimeout(() => {
        txtResult.innerHTML = `Turno de la computadora en: 3`
    }, 1000)

    setTimeout(() => {
        txtResult.innerHTML = `Turno de la computadora en: 2`
    }, 2000)

    setTimeout(() => {
        txtResult.innerHTML = `Turno de la computadora en: 1`
    }, 3000)

    //Turno de la computadora

    //Time out, para hacer la acción de la computador
    setTimeout(() => {

        for (N = 0; N < 1; N++) {

            //Variable que guarda una posisción random genrada
            positionShot = randomNumbers(positionsNumbers)
    
            //Obtiene el elemento correspondiente de dicha posición generada
            const positionUserShips = document.getElementById( `positionUser-${positionShot}`)
            const etiqueta = document.getElementById(`positionImgShip-${positionShot}`)
    
            //Valida que la posición generada corresponda a la posición donde se encuentra el barco y que esa posición no halla sido utilizada antes
            if (positionUser.includes(positionShot) == true && positionUsed.includes(positionShot) == false) {
    
                //Elimina la imagen que tenía dicha posición
                positionUserShips.removeChild(etiqueta);

                //Modifica la nueva imagen y el tamaño
                positionUserShips.style.backgroundImage = "url('img/explosion.png')";
                positionUserShips.style.backgroundSize = "65px 52px";
    
                //Inserta en el array para dar a entender que esa posición generada ya no se puede utilizae más
                positionUsed.push(positionShot)
    
                //Le quita un barco de los totales que tiene el usuario y modifica status
                shipsUser = shipsUser - 1
                txtShipsUser.innerHTML =  `Barcos ${shipsUser}`
        
                //Actualiza el resultado final de la acción
                txtResult.innerHTML = 'Uno de tus barcos fue destruido'
        
                //Valida que los barcos del usuario estén en cero para finalizar el juego
                if (shipsUser == 0) {
        
                    //Actualiza el resultado final y cambia el stylo al boton para que apareces
                    txtResult.innerHTML = 'La computadora destruyó todos tus barcos, Perdiste !'
                    btnPlayAgain.style.display = "block";
                    
                    //Ciclo para desabilitar todos los botones
                    for(N = 1; N <= 9; N++) {
    
                        element = document.getElementById( `positionPc-${N}`)
                        element.setAttribute("disabled", "")
    
                        element.style.cursor = "auto"
                    }

                    
                }
             //Valida si el usuario falló la posisción y que dicha posición no halla sido ya utilizada
            }else if (positionUser.includes(positionShot) == false && positionUsed.includes(positionShot) == false){

                //Modifica la nueva imagen y el tamaño
                positionUserShips.style.backgroundImage = "url('img/failed.png')";
                positionUserShips.style.backgroundSize = "62px 50px";
    
                //Inserta en el array para dar a entender que esa posición generada ya no se puede utilizae más
                positionUsed.push(positionShot)
    
                //Actualiza el resultado final de la acción
                txtResult.innerHTML = 'Disparo fallido de la computadora'
    
             //Repite el bucle hasta qué genere un posición que no se halla utilizado antes
            }else {
                N--;
            }
    
        }
    
    }, 4000)




    

       
}

//Código de eventos que esperan que el usuario presione dicho botones y pasan los parametros correspondientes de cada posición
positionPc1.addEventListener('click', () => {
    shot(1 , positionPc1)
})

positionPc2.addEventListener('click', () => {
    shot(2 , positionPc2)
})

positionPc3.addEventListener('click', () => {
    shot(3 , positionPc3)
})

positionPc4.addEventListener('click', () => {
    shot(4 , positionPc4)
})

positionPc5.addEventListener('click', () => {
    shot(5 , positionPc5)
})

positionPc6.addEventListener('click', () => {
    shot(6 , positionPc6)
})

positionPc7.addEventListener('click', () => {
    shot(7 , positionPc7)
})

positionPc8.addEventListener('click', () => {
    shot(8 , positionPc8)
})

positionPc9.addEventListener('click', () => {
    shot(9 , positionPc9)
})

//Función para volver a recargar la página
function reload(){
    window.location.reload()
}

