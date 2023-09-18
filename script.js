const calculatorButtons = document.querySelectorAll(".number-button")
const calculatorDisplay = document.querySelector(".calculator-display")

const delBtn = document.querySelector("#del")
const resetBtn = document.querySelector("#reset")

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
    case "add":
      return add(firstNumber, secondNumber);
    case "subtract":
      return subtract(firstNumber, secondNumber);
    case "multiply":
      return multiply(firstNumber, secondNumber);
    case "divide":
      return divide(firstNumber, secondNumber);
  }
}

calculatorButtons.forEach(function(button) {
  if(button.textContent !== "RESET" && button.textContent !== "DEL" && button.textContent !== "=") {
    button.addEventListener('click', function() {
      displayValue = calculatorDisplay.textContent += button.textContent
    })
  }
})

resetBtn.addEventListener('click', function() {
  displayValue = "";
  calculatorDisplay.textContent = displayValue
})

delBtn.addEventListener('click', function() {
  displayValue = displayValue.slice(0,-1);
  calculatorDisplay.textContent = displayValue
});