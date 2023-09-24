const calculatorButtons = document.querySelectorAll(".number-button");
const calculatorDisplay = document.querySelector(".calculator-display");

const delBtn = document.querySelector("#del");
const resetBtn = document.querySelector("#reset");
const equals = document.querySelector("#equals");

let firstNumber;
let operator;
let secondNumber;

let displayValue;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "x":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
  }
}

calculatorButtons.forEach(function (button) {
  if (
    button.textContent !== "RESET" &&
    button.textContent !== "DEL" &&
    button.textContent !== "="
  ) {
    button.addEventListener("click", function () {
      displayValue = calculatorDisplay.textContent += button.textContent;
    });
  }
});

resetBtn.addEventListener("click", function () {
  displayValue = "";
  calculatorDisplay.textContent = displayValue;
});

delBtn.addEventListener("click", function () {
  displayValue = displayValue.slice(0, -1);
  calculatorDisplay.textContent = displayValue;
});

equals.addEventListener("click", function () {
  let operatorPosition;
  let firstNumberStr = "";
  let secondNumberStr = "";

  for (let i = 0; i < displayValue.length; i++) {
    const character = displayValue.charAt(i);
    if (
      character == "+" ||
      character == "-" ||
      character == "x" ||
      character == "/"
    ) {
      console.log(character);
      operator = character;
      operatorPosition = i ;
      break;
    }
  }
  firstNumberStr = displayValue.substring(0, operatorPosition);
  console.log(firstNumberStr);
  secondNumberStr = displayValue.substring(operatorPosition + 1);
  console.log(secondNumberStr);
  displayValue = operate(
    Number(firstNumberStr),
    Number(secondNumberStr),
    operator
  );
  calculatorDisplay.textContent = displayValue;
});
