const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".cal-body");
const screen = calculator.querySelector(".cal-screen");

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const screenValue = screen.textContent;
  const type = key.dataset.type;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    if (screenValue == 0) {
      screen.textContent = keyValue;
    } else if (previousKeyType == "operator") {
      screen.textContent = keyValue;
    } else {
      screen.textContent = screenValue + keyValue;
    }
  }

  if (type == "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    key.dataset.state = "selected";

    calculator.dataset.firstNumber = screenValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type == "clear") {
    calculator.dataset.firstNumber = 0;
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((el) => (el.dataset.state = ""));
    screen.textContent = 0;
  }

  if (type == "equal") {
    const firstNumber = parseInt(calculator.dataset.firstNumber);
    const secondNumber = parseInt(screenValue);
    const operator = calculator.dataset.operator;
    screen.textContent = calculate(firstNumber, operator, secondNumber);
  }
  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  let result = "";
  if (operator == "plus") result = firstNumber + secondNumber;
  if (operator == "minus") result = firstNumber - secondNumber;
  if (operator == "times") result = firstNumber * secondNumber;
  if (operator == "divide") result = firstNumber / secondNumber;
  return result;
}

console.log("Nice.");
