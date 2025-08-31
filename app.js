/* VARIABLES */
let numSecret = 0;
let intento = 0;
let arrayNumSorteados = [];
const numMaxSorteado = 9;
const numMaxIntentos = 3;

// Llama al método para asignar condiciones iniciales del juego
condicionesIniciales();

/* METODOS */

// Asigna condiciones iniciales del juego
function condicionesIniciales() {
	numSecret = generarNumAleatorio();
	intento = 1;
	asignarTextoElemenot('h1', "Juego del número secreto");
	asignarTextoElemenot('p', "Ingresa un número del 1 al 10");
	document.querySelector('#numeroUsuario').placeholder = "Escriba aquí el número";
	document.getElementById('reiniciar').setAttribute('disabled', 'true');
	document.getElementById('intentar').removeAttribute('disabled');
}

/* Asigna texto a los elementos de html que se indiquen
 * params string elemento , string texto = ""
*/
function asignarTextoElemenot(elemento, texto = ""){
	let select = document.querySelector(elemento);
	select.innerHTML = texto; 
}

/** Genera un número aleatorio de 1 a 10 
  * Evita que se repita hasta que llegue a la cantidad que indique la constante numMaxSorteado
  * return integer
*/ 
function generarNumAleatorio(){
	let numGenerado = Math.floor( Math.random() * 10 ) + 1;
	if(arrayNumSorteados.length == numMaxSorteado){
		arrayNumSorteados = [];
	}
	if(arrayNumSorteados.includes(numGenerado)){
		return generarNumAleatorio();
	}else{
		arrayNumSorteados.push(numGenerado);
		return numGenerado;
	}
}

// Limpia el input y da un indicio de cuál fue el num. anteriormente escrito
function limpiarInput(){
	let valorInput = document.querySelector('#numeroUsuario');
	valorInput.placeholder = valorInput.value.length > 0 ? "Escribiste el número " + valorInput.value : "No escribiste ningún número";
	valorInput.value = "";
}

/** Activa el botón botón reiniciar
  * Desactiva el intentar
*/
function enableReiniciarDisable(){
	document.getElementById('reiniciar').removeAttribute('disabled');
	document.getElementById('intentar').setAttribute('disabled', 'true');
}

/* El juego *
 * Evalúa el número del usuario y le da pistas del num. secreto
*/
function verificarIntento(){
    intento++;

	let numUsuario = parseInt( document.getElementById('numeroUsuario').value );
	if (numUsuario === numSecret) {
		asignarTextoElemenot('p', "¡Acertaste el número! <br/> Fue en " + intento + " intento(s)");
		enableReiniciarDisable();
    }
    else if(numUsuario > numSecret){
		asignarTextoElemenot('p', "¡El número secreto es menor! <br/> ¡Intentalo de nuevo! <br/> " + (intento) + "° Intento");
    }
    else if(numUsuario < numSecret){
		asignarTextoElemenot('p', "¡El número secreto es mayor! <br/> ¡Intentalo de nuevo! <br/> " + intento + "° Intento");
    }
    else{
		asignarTextoElemenot('p', "¡Intentalo de nuevo! <br/> " + intento + "° Intento");
    }

    if(intento>numMaxIntentos){
		asignarTextoElemenot('p', "¡Alcanzaste el número máximo de " + numMaxIntentos + " intentos");
		enableReiniciarDisable();
    }else{
    	limpiarInput();
    }
}

/* Reinicia el juego, , los intentos
 * Vacía el input
 * Inicializar el de nuevo el num. de intentos
 * Deshabilitar button iniciar reiniciar
*/
function reiniciarJuego(){
	limpiarInput();
	condicionesIniciales();
}