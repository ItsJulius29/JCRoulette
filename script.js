const numbersContainer = document.getElementById('numbers');
const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spinBtn');
const resultText = document.getElementById('result');
const resultList = document.getElementById('resultList');
const betAmountColorInput = document.getElementById('betAmountColor');
const betColorInput = document.getElementById('betColor');
const betAmountNumberInput = document.getElementById('betAmountNumber');
const betNumberInput = document.getElementById('betNumber');
const balanceElement = document.getElementById('balance');

let balance = 1000; // Monto inicial

// Números de la ruleta y sus colores
const numbers = [
    { number: "0", color: "green" },
    { number: "32", color: "red" },
    { number: "15", color: "black" },
    { number: "19", color: "red" },
    { number: "4", color: "black" },
    { number: "21", color: "red" },
    { number: "2", color: "black" },
    { number: "25", color: "red" },
    { number: "17", color: "black" },
    { number: "34", color: "red" },
    { number: "6", color: "black" },
    { number: "27", color: "red" },
    { number: "13", color: "black" },
    { number: "36", color: "red" },
    { number: "11", color: "black" },
    { number: "30", color: "red" },
    { number: "8", color: "black" },
    { number: "23", color: "red" },
    { number: "10", color: "black" },
    { number: "5", color: "red" },
    { number: "24", color: "black" },
    { number: "16", color: "red" },
    { number: "33", color: "black" },
    { number: "1", color: "red" },
    { number: "20", color: "black" },
    { number: "14", color: "red" },
    { number: "31", color: "black" },
    { number: "9", color: "red" },
    { number: "22", color: "black" },
    { number: "18", color: "red" },
    { number: "29", color: "black" },
    { number: "7", color: "red" },
    { number: "28", color: "black" },
    { number: "12", color: "red" },
    { number: "35", color: "black" },
    { number: "3", color: "red" },
    { number: "26", color: "black" }
];

// Distribuir los números dentro de la ruleta
numbers.forEach((num, index) => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number', num.color);
    numberElement.textContent = num.number;

    const rotationAngle = (index * 360) / numbers.length;
    numberElement.style.transform = `rotate(${rotationAngle}deg) translateX(13px) translateY(-120px)`;

    numbersContainer.appendChild(numberElement);
});

// Inicializamos la bolita
let ball;

spinButton.addEventListener('click', () => {
    // Si ya hay una bolita, la eliminamos antes de crear una nueva
    if (ball) {
        ball.remove();
    }

    // Generamos un ángulo aleatorio para la rotación
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomAngle = (randomIndex * 360) / numbers.length;

    const extraTurns = Math.floor(Math.random() * 3) + 3;
    const totalRotation = (extraTurns * 360) + randomAngle;

    // Creamos la bolita (si no existe ya)
    ball = document.createElement('div');
    ball.classList.add('ball');
    wheel.appendChild(ball);

    // Activamos la animación de rotación
    wheel.classList.add('spin');

    wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    wheel.style.transform = `rotate(${totalRotation}deg)`; 

    setTimeout(() => {
        wheel.classList.remove('spin');

        // Posicionamos la bolita en la casilla correcta
        const ballPositionAngle = randomIndex * (360 / numbers.length);
        const ballPositionX = 120 * Math.cos((ballPositionAngle - 90) * Math.PI / 180) - 25;
        const ballPositionY = 120 * Math.sin((ballPositionAngle - 90) * Math.PI / 180);

        ball.style.transform = `translateX(-50%) translateY(-50%) translate(${ballPositionX}px, ${ballPositionY}px)`;

        // Verificamos si el jugador ganó
        const winningNumber = numbers[randomIndex].number;
        const winningColor = numbers[randomIndex].color;
        resultText.textContent = `La ruleta ha caído en el número ${winningNumber} (${winningColor})`;

        // Apostar por color y número
        let betAmountColor = parseInt(betAmountColorInput.value) || 0;  // Si no hay apuesta por color, será 0
        const betColor = betColorInput.value;
        let betAmountNumber = parseInt(betAmountNumberInput.value) || 0; // Si no hay apuesta por número, será 0
        const betNumber = parseInt(betNumberInput.value);

        // Verificar que el jugador tiene suficiente saldo
        if ((betAmountColor + betAmountNumber) > balance) {
            alert('No tienes suficiente saldo para esta apuesta.');
            return;
        }

        balance -= (betAmountColor + betAmountNumber); // Restar lo apostado
        balanceElement.textContent = balance;

        let winAmount = 0;

        // Verificar si ganó por color
        if (betColor === winningColor && betAmountColor > 0) {
            winAmount += betAmountColor * 2; // Ganar el doble por color
            alert(`¡Ganaste! La ruleta ha caído en el color ${winningColor}`);
        }

        // Verificar si ganó por número
        if (betNumber === parseInt(winningNumber) && betAmountNumber > 0) {
            winAmount += betAmountNumber * 35; // Ganar 35 veces la apuesta por número
            alert(`¡Ganaste! La ruleta ha caído en el número ${winningNumber}`);
        }

        balance += winAmount; // Añadir ganancias al balance
        balanceElement.textContent = balance;

        // Actualizar la tabla con el número y color
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td class="${winningColor}">${winningNumber}</td>`;
        resultList.appendChild(newRow);

        // Limitar la cantidad de números en la lista
        if (resultList.rows.length > 10) {
            resultList.deleteRow(resultList.rows.length - 1); // Eliminar la última fila si hay más de 10
        }
    }, 4000); // La duración de la animación de la ruleta
});


// Captura de apuestas desde la tabla
const bettingTable = document.querySelector('.bettingTable table');

bettingTable.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('numberCell')) {
        const selectedColor = e.target.classList.contains('red') ? 'red' :
            e.target.classList.contains('black') ? 'black' : 'green';
        const selectedNumber = e.target.dataset.number;

        betColorInput.value = selectedColor;
        betNumberInput.value = selectedNumber;

        alert(`Has apostado al número ${selectedNumber} de color ${selectedColor}`);
    }
});
