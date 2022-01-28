const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".cal-body");
const screen = calculator.querySelector(".cal-screen");
let completeOp = [];

keys.addEventListener("click", (event) => {
  if (!event.target.closest("button")) return;

  const key = event.target;
  const keyValue = key.textContent;
  const screenValue = screen.textContent;
  const type = key.dataset.type;
  const { previousKeyType } = calculator.dataset;

  if (type === "number") {
    completeOp.push(keyValue);

    if (screenValue == 0) {
      screen.textContent = keyValue;
    } else if (previousKeyType == "operator") {
      screen.textContent = keyValue;
    } else {
      screen.textContent = screenValue + keyValue;
    }
  }

  if (type == "operator") {
    completeOp.push(keyValue.trim());

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
    completeOp = [];
  }

  if (type == "decimal") {
    if (screenValue.includes(".")) {
      return;
    } else {
      screen.textContent = screenValue + ".";
    }
  }

  if (type == "equal") {
    const firstNumber = parseFloat(calculator.dataset.firstNumber);
    const secondNumber = parseFloat(screenValue);
    const operator = calculator.dataset.operator;
    screen.textContent = calculate(firstNumber, operator, secondNumber);
    console.log(completeOp);
  }

  let action = calculator.dataset.operator;
  console.log(action);

  if (
    action == "plus" ||
    action == "minus" ||
    action == "times" ||
    action == "divide"
  ) {
    const firstNumber = parseFloat(calculator.dataset.firstNumber);
    const secondNumber = parseFloat(screenValue);
    const operator = calculator.dataset.operator;

    if (firstNumber && operator) {
      screen.textContent = calculate(firstNumber, operator, secondNumber);
    }
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  let result = "";
  if (operator == "plus")
    result = parseFloat(firstNumber) + parseFloat(secondNumber);
  if (operator == "minus")
    result = parseFloat(firstNumber) - parseFloat(secondNumber);
  if (operator == "times")
    result = parseFloat(firstNumber) * parseFloat(secondNumber);
  if (operator == "divide")
    result = parseFloat(firstNumber) / parseFloat(secondNumber);
  return result;
}

console.log("Nice.");
