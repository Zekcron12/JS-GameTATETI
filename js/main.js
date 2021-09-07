// Constantes
const REINICIAR = document.querySelector('.reset');
const RESULTADO = document.querySelector('.result');
const CELDAS = document.querySelectorAll('.game-cell');

// Variables
let juegoEnMarcha = true;
let XComienza = true;
let ganador = null;

//Constantes varibales
const xSymbol = 'X';
const oSymbol = 'O';

//función 
const celdaClick = (celda) => { //letter
	return (celda === 'x' ? xSymbol : oSymbol);
} //función con operador ternacio que me retorna el simbolo segun la celda seleccionada.

//función
const elGanador = (content) => {
	juegoEnMarcha = false;
	ganador = content;

	if (ganador === 'x') {
		RESULTADO.innerHTML = `<span> ${celdaClick(ganador)} Ganador</span>`;
	} else {
		RESULTADO.innerHTML = `<span> ${celdaClick(ganador)} Ganador</span>`;
	}
}; //función que me devuelve al ganador. 

//función de comprobacion 
const comprobacion = () => {
	//A través de los [] buscamos cada div, osea los hijos del game-grid del HTML.
	const topLeft = CELDAS[0].classList[1]; 
	const topMiddle = CELDAS[1].classList[1];
	const topRight = CELDAS[2].classList[1];
	const middleLeft = CELDAS[3].classList[1];
	const middleMiddle = CELDAS[4].classList[1];
	const middleRight = CELDAS[5].classList[1];
	const bottomLeft = CELDAS[6].classList[1];
	const bottomMiddle = CELDAS[7].classList[1];
	const bottomRight = CELDAS[8].classList[1];

	//Condiciones para dar un ganador, basicamente es la logica del ta-te-ti.

	//Logica del ganador si completa las 3 de forma horizontal.
	if (topLeft && topLeft === topMiddle && topLeft === topRight) {
		elGanador(topLeft);
		CELDAS[0].classList.add('won');
		CELDAS[1].classList.add('won');
		CELDAS[2].classList.add('won');
	}
	else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
		elGanador(middleLeft);
		CELDAS[3].classList.add('won');
		CELDAS[4].classList.add('won');
		CELDAS[5].classList.add('won');
	}
	else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
		elGanador(bottomLeft);
		CELDAS[6].classList.add('won');
		CELDAS[7].classList.add('won');
		CELDAS[8].classList.add('won');
	}
	//Logica del ganador si completa las 3 de forma vertical.
	else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
		elGanador(topLeft);
		CELDAS[0].classList.add('won');
		CELDAS[3].classList.add('won');
		CELDAS[6].classList.add('won');
	}
	else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
		elGanador(topMiddle);
		CELDAS[1].classList.add('won');
		CELDAS[4].classList.add('won');
		CELDAS[7].classList.add('won');
	}
	else if (topRight && topRight === middleRight && topRight === bottomRight) {
		elGanador(topRight);
		CELDAS[2].classList.add('won');
		CELDAS[5].classList.add('won');
		CELDAS[8].classList.add('won');
	}
	//Logica del ganador si completa las 3 de forma diagonal.
	else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
		elGanador(topLeft);
		CELDAS[0].classList.add('won');
		CELDAS[4].classList.add('won');
		CELDAS[8].classList.add('won');
	}
	else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
		elGanador(topRight);
		CELDAS[2].classList.add('won');
		CELDAS[4].classList.add('won');
		CELDAS[6].classList.add('won');
	}
	//Logica si nadie completa las 3 celdas.
	else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
		juegoEnMarcha = false;
		RESULTADO.innerHTML = `¡Nadie Gana!`;
	}
	else {
		if (XComienza) {
			XComienza = ! XComienza;
			RESULTADO.innerHTML = `Turno de: ${oSymbol}`
		} else {
			XComienza = ! XComienza;
			RESULTADO.innerHTML = `Turno de: ${xSymbol}`
		} //Logica con con la expresión ! donde si X no es igual a X (true) pasa al simbolo O. Viceversa.
	};
};

//Eventos

const resetJuego = () => {
	XComienza = true;
	juegoEnMarcha = true;
	ganador = null;
	RESULTADO.innerHTML = `Comienza: ${xSymbol}`;

	//Bucle for (variable of iterable)
	//Cuando se ejecute el bloque cada propiedad o valor de la variable pasa al elemento iterable.
	for(let cellDiv of CELDAS) {
		cellDiv.classList.remove('x');
		cellDiv.classList.remove('o');
		cellDiv.classList.remove('won');
	};
};

const celdasClick = (e) => {
	const celdaSelect = e.target.classList; //el evento recorre la lista

	//Si la celda seleccionada ya tiene un simbolo puesto o si el juego esta detenido (false)
	//me finalizas el evento ejecutado. 
	if (celdaSelect[1]=== 'x' || celdaSelect[1] === 'o' || juegoEnMarcha == false) {
		return;
	}

	if (XComienza) {
		celdaSelect.add('x');
		comprobacion();
	} else {
		celdaSelect.add('o');
		comprobacion();
	}
	console.log(celdaSelect)
};


REINICIAR.addEventListener('click', resetJuego);

for (const cellDiv of CELDAS) {
	cellDiv.addEventListener('click', celdasClick)
};