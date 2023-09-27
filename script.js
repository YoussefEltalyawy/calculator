const calculatorButtons = document.querySelectorAll(".number-button");
const calculatorDisplay = document.querySelector(".calculator-display");

const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const decimalBtn = document.querySelector("#decimal");

const delBtn = document.querySelector("#del");
const resetBtn = document.querySelector("#reset");
const equals = document.querySelector("#equals");

const charactersToCheck = ["+", "-", "/", "x"];

let firstNumber;
let firstOperator;
let secondOperator;
let secondNumber;

let operatorPosition;
let firstNumberStr = "";
let secondNumberStr = "";

let displayValue;
let isOperationInProgress;

window.addEventListener("keydown", function(e) {
  const key = document.querySelector(`button[data-key='${e.key}']`)
  key.click();
});

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
      if (firstNumber === 0) {
        if (secondNumber === 0) {
          return "Math Error";
        }
      } else {
        return divide(firstNumber, secondNumber);
      }
  }
}

calculatorButtons.forEach(function (button) {
  if (
    button.textent !== "RESET" &&
    button.textContent !== "DEL" &&
    button.textContent !== "="
  ) {
    button.addEventListener("click", function () {
      displayValue = calculatorDisplay.textContent += button.textContent;
    });
  }
});

plusBtn.addEventListener("click", function () {
  parseNumbers();
  secondNumberStr = secondNumberStr.slice(0, -1);
  pairBehaviour("+");
});

minusBtn.addEventListener("click", function () {
  parseNumbers();
  secondNumberStr = secondNumberStr.slice(0, -1);
  pairBehaviour("-");
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
  resetCalculator();
});

delBtn.addEventListener("click", function () {
  // Check if the last character is a decimal point and remove it if it is
  if (displayValue.charAt(displayValue.length - 1) === ".") {
    decimalBtn.disabled = false; // Re-enable the decimal button
  }

  // Remove the last character from the displayValue
  displayValue = displayValue.slice(0, -1);
  calculatorDisplay.textContent = displayValue;
});

decimalBtn.addEventListener("click", function () {
  if (calculatorDisplay.textContent.includes(".")) {
    decimalBtn.disabled = true;
  }
});

equals.addEventListener("click", function () {
  parseNumbers();
  displayValue = operate(
    Number(firstNumberStr),
    Number(secondNumberStr),
    firstOperator
  );
  if (displayValue == "Math Error") {
    calculatorButtons.forEach(function (button) {
      button.disabled = true;
    });
    resetBtn.disabled = false;
  }
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
      firstOperator = character;
      operatorPosition = i;
      break;
    }
  }
  firstNumberStr = displayValue.substring(0, operatorPosition);
  secondNumberStr = displayValue.substring(operatorPosition + 1);

  secondOperator = secondNumberStr[secondNumberStr.length - 1];

  if (firstNumberStr && secondNumberStr) {
    isOperationInProgress = true;
  }
}
//Function responsible for the pair behaviour (when an operator is clicked twice)
function pairBehaviour() {
  if (isOperationInProgress) {
    displayValue = operate(
      Number(firstNumberStr),
      Number(secondNumberStr),
      firstOperator
    );

    isOperationInProgress = false;
    calculatorDisplay.textContent = displayValue + secondOperator;
    if (displayValue == "Math Error") {
      calculatorButtons.forEach(function (button) {
        button.disabled = true;
      });
      resetBtn.disabled = false;
      calculatorDisplay.textContent = displayValue;
    }
  }
}

function resetCalculator() {
  isOperationInProgress = false;
  displayValue = "";
  calculatorDisplay.textContent = displayValue;
  firstNumberStr = "";
  secondNumberStr = "";
  firstOperator = "";
  secondOperator = "";
  calculatorDisplay.textContent = displayValue;
  calculatorButtons.forEach(function (button) {
    button.disabled = false;
  });
}
