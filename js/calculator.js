const calculatorScreen = document.querySelector(".screen");
const calculatorScreenTop = document.querySelector(".screen-top");
const calculatorScreenTopNumber1 = document.querySelector(
  ".screen-top-number1"
);
const calculatorScreenTopNumber2 = document.querySelector(
  ".screen-top-number2"
);
const calculatorScreenTopOperatorSign = document.querySelector(
  ".screen-top-operator"
);

const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-opr");
const dotButton = document.querySelector(".btn-dot");
const delButton = document.querySelector(".btn-del");
const resetButton = document.querySelector(".btn-reset");
const equalsButton = document.querySelector(".btn-equals");

let number1 = 0;
let number2 = 0;
let selectedOperator = "";
let hasDotAdded = false;
let hasAnyOperatorSelected = false;
let hasSecondNumberEntered = false;
let hasAnyCalculationDone = false;

const onNumberClicked = function (number) {
  if (calculatorScreen.textContent == "0") {
    calculatorScreen.textContent = "";
  }

  if (hasAnyOperatorSelected && !hasSecondNumberEntered) {
    if (!hasDotAdded) calculatorScreen.textContent = "";

    hasSecondNumberEntered = true;
  }

  calculatorScreen.textContent += number;
};

const onDotClicked = function () {
  if (!hasDotAdded) {
    if (!hasSecondNumberEntered && !hasAnyOperatorSelected) {
      calculatorScreen.textContent += ".";
      hasDotAdded = true;
    } else if (!hasSecondNumberEntered && hasAnyOperatorSelected) {
      calculatorScreen.textContent = "0.";
      hasDotAdded = true;
    } else if (hasSecondNumberEntered) {
      calculatorScreen.textContent += ".";
      hasDotAdded = true;
    }
  }
};

const onOperatorClicked = function (operator) {
  if (hasDotAdded) {
    hasDotAdded = false;
  }

  let selectedOperatorTemp = "";

  switch (operator) {
    default:
    case "+":
      selectedOperatorTemp = "+";
      break;
    case "-":
      selectedOperatorTemp = "-";
      break;
    case "/":
      selectedOperatorTemp = "/";
      break;
    case "x":
      selectedOperatorTemp = "x";
      break;
  }

  if (!hasAnyOperatorSelected) {
    calculatorScreenTop.classList.remove("hidden");
    hasAnyOperatorSelected = true;
  }

  if (hasAnyCalculationDone) {
    calculatorScreenTopNumber2.textContent = "";
    calculatorScreenTopOperatorSign.textContent = selectedOperatorTemp;
  }

  if (!hasSecondNumberEntered) {
    number1 = calculatorScreen.textContent;
    calculatorScreenTopNumber1.textContent = number1;
  } else {
    calculate();
    calculatorScreenTopOperatorSign.textContent = selectedOperator;
    calculatorScreenTopNumber1.textContent = calculatorScreen.textContent;
    calculatorScreenTopNumber2.textContent = number2;
    number1 = calculatorScreen.textContent;
  }

  selectedOperator = selectedOperatorTemp;
};

const calculate = function () {
  if (!hasAnyOperatorSelected) return;

  let result = 0;

  if (hasSecondNumberEntered) {
    number2 = calculatorScreen.textContent;
  }

  switch (selectedOperator) {
    default:
      return;
    case "+":
      result = Number(number1) + Number(number2);
      break;
    case "-":
      result = Number(number1) - Number(number2);
      break;
    case "/":
      if (number2 == "0") {
        result = "Can't divide";
      } else {
        result = Number(number1) / Number(number2);
      }
      break;
    case "x":
      result = Number(number1) * Number(number2);
      break;
  }

  calculatorScreen.textContent = result.toFixed(4).replace(/\.?0*$/, "");
  calculatorScreenTopNumber1.textContent = number1;
  calculatorScreenTopNumber2.textContent = number2;

  hasSecondNumberEntered = false;
  hasAnyCalculationDone = true;

  number1 = result;
};

const reset = function () {
  number1 = 0;
  number2 = 0;
  calculatorScreen.textContent = "0";
  hasDotAdded = false;
  hasAnyOperatorSelected = false;
  hasSecondNumberEntered = false;
  calculatorScreenTop.classList.add("hidden");
  calculatorScreenTopNumber1.textContent = "";
  calculatorScreenTopNumber2.textContent = "";
};

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    onNumberClicked(number.textContent);
  });
});

operatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    onOperatorClicked(operator.textContent);
  });
});

dotButton.addEventListener("click", () => {
  onDotClicked();
});

resetButton.addEventListener("click", () => {
  reset();
});

delButton.addEventListener("click", () => {
  if (calculatorScreen.textContent != "0") {
    const screenContent = calculatorScreen.textContent;

    if (screenContent[screenContent.length - 1] == ".") {
      hasDotAdded = false;
    }

    calculatorScreen.textContent = screenContent.substring(
      0,
      screenContent.length - 1
    );

    if (calculatorScreen.textContent == "") {
      calculatorScreen.textContent = "0";
    }
  }
});

equalsButton.addEventListener("click", calculate);

reset();
