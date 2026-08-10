let currentNumber = "";
let previousNumber = "";
let operator = null;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");


// Number add karna
function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (number === "." && currentNumber === "") {
        currentNumber = "0.";
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// Operator select karna
function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    previousNumber = currentNumber;
    currentNumber = "";
    operator = selectedOperator;

    updateDisplay();
}


// Calculation
function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === null) {
        return;
    }

    let firstNumber = parseFloat(previousNumber);
    let secondNumber = parseFloat(currentNumber);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    else if (operator === "-") {
        result = firstNumber - secondNumber;
    }

    else if (operator === "*") {
        result = firstNumber * secondNumber;
    }

    else if (operator === "/") {

        if (secondNumber === 0) {
            currentNumber = "Error";
            previousNumber = "";
            operator = null;

            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentNumber = result.toString();
    previousNumber = "";
    operator = null;

    updateDisplay();
}


// Display update
function updateDisplay() {

    currentDisplay.innerText = currentNumber || "0";

    if (previousNumber && operator) {

        let symbol = operator;

        if (operator === "*") {
            symbol = "×";
        }

        if (operator === "/") {
            symbol = "÷";
        }

        previousDisplay.innerText =
            previousNumber + " " + symbol;
    }

    else {
        previousDisplay.innerText = "";
    }
}


// Clear button
function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    updateDisplay();
}


// Delete button
function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendNumber(key);
    }

    else if (key === "+") {
        chooseOperator("+");
    }

    else if (key === "-") {
        chooseOperator("-");
    }

    else if (key === "*") {
        chooseOperator("*");
    }

    else if (key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});