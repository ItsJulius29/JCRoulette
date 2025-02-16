const numbersContainer = document.getElementById('numbers');
const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spinBtn');
const resultText = document.getElementById('result');
const resultList = document.getElementById('resultList');

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

    // Colocamos los números en el borde de la ruleta usando rotación y ajustamos su alineación
    const rotationAngle = (index * 360) / numbers.length; // 37 segmentos (incluyendo el 0)
    numberElement.style.transform = `rotate(${rotationAngle}deg) translateX(13px) translateY(-120px)`; // Ajustamos la posición

    numbersContainer.appendChild(numberElement);
});

// Inicializamos la bolita, pero no la mostramos hasta que se gire la ruleta
let ball;

spinButton.addEventListener('click', () => {
    // Si ya hay una bolita, la eliminamos antes de crear una nueva
    if (ball) {
        ball.remove();
    }

    // Generamos un ángulo aleatorio para la rotación
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomAngle = (randomIndex * 360) / numbers.length;

    // Generamos un número de vueltas aleatorias para que la ruleta gire varias veces
    const extraTurns = Math.floor(Math.random() * 3) + 3;

    // Calcular el ángulo final sumando las vueltas extra
    const totalRotation = (extraTurns * 360) + randomAngle;

    // Creamos la bolita (si no existe ya)
    ball = document.createElement('div');
    ball.classList.add('ball');
    wheel.appendChild(ball);

    // Añadimos la clase 'spin' para activar la animación de rotación
    wheel.classList.add('spin');

    // Aplicamos la rotación a la ruleta
    wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    wheel.style.transform = `rotate(${totalRotation}deg)`; // Rota la ruleta con el ángulo calculado

    // Esperamos que la animación termine (en este caso 4s) y luego mostramos el número ganador
    setTimeout(() => {
        wheel.classList.remove('spin');

        // Posicionamos la bolita en la casilla correcta
        const ballPositionAngle = randomIndex * (360 / numbers.length);
        const ballPositionX = 120 * Math.cos((ballPositionAngle - 90) * Math.PI / 180) - 25; // Cálculo de la posición en el eje X
        const ballPositionY = 120 * Math.sin((ballPositionAngle - 90) * Math.PI / 180); // Cálculo de la posición en el eje Y

        // Crear la bolita en la posición del número ganador
        ball.style.transform = `translateX(-50%) translateY(-50%) translate(${ballPositionX}px, ${ballPositionY}px)`;

        // Mostrar el número ganador en el resultado
        const winningNumber = numbers[randomIndex].number;
        const winningColor = numbers[randomIndex].color;
        resultText.textContent = `La ruleta ha caído en el número ${winningNumber} (${winningColor})`;

        // Actualizar la tabla con el número y color
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="${winningColor}">${winningNumber}</td>
        `;
        resultList.appendChild(newRow); // Insertamos el nuevo número al principio de la tabla

        // Limitar la cantidad de números en la lista (opcional)
        if (resultList.rows.length > 10) {
            resultList.deleteRow(resultList.rows.length - 1); // Eliminar la última fila si hay más de 10
        }
    }, 4000); // La duración de la animación de la ruleta
});
