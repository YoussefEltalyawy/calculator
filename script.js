const calculatorButtons = document.querySelectorAll(".number-button");
const calculatorDisplay = document.querySelector(".calculator-display");

const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");

const delBtn = document.querySelector("#del");
const resetBtn = document.querySelector("#reset");
const equals = document.querySelector("#equals");

let firstNumber;
let operator;
let secondNumber;

let operatorPosition;
let firstNumberStr = "";
let secondNumberStr = "";

let displayValue;
let isOperationInProgress;

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

plusBtn.addEventListener('click', function() {
  parseNumbers();
  secondNumberStr = secondNumberStr.slice(0, -1);
  pairBehaviour("+");
});
minusBtn.addEventListener("click", function () {
  // parseNumbers();
  // pairBehaviour("-");
});

multiplyBtn.addEventListener("click", function () {
  parseNumbers();
  secondNumberStr = secondNumberStr.slice(0, -1);
  pairBehaviour("x");
});

divideBtn.addEventListener("click", function () {
  parseNumbers();
  secondNumberStr = secondNumberStr.slice(0, -1);
  pairBehaviour("/");
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
  parseNumbers();
  displayValue = operate(
    Number(firstNumberStr),
    Number(secondNumberStr),
    operator
  );
  console.log(firstNumberStr, secondNumberStr, operator);
  console.log(displayValue);
  calculatorDisplay.textContent = displayValue;
  isOperationInProgress = false;
  displayValue = calculatorDisplay.textContent;
});

function parseNumbers() {
  for (let i = 0; i < displayValue.length; i++) {
    const character = displayValue.charAt(i);
    if (
      character == "+" ||
      character == "-" ||
      character == "x" ||
      character == "/"
    ) {
      operator = character;
      operatorPosition = i;
      break;
    }
  }
  firstNumberStr = displayValue.substring(0, operatorPosition);
  secondNumberStr = displayValue.substring(operatorPosition + 1);

  if(firstNumberStr && secondNumberStr) {
    console.log(firstNumberStr);
    console.log(secondNumberStr);
    isOperationInProgress = true;
  }
}

function pairBehaviour() {
  if(isOperationInProgress) {
    console.log("busy from function");
    displayValue = operate(
      Number(firstNumberStr),
      Number(secondNumberStr),
      operator
    );
    calculatorDisplay.textContent = displayValue;
    isOperationInProgress = false;
    displayValue = calculatorDisplay.textContent;
  }
}