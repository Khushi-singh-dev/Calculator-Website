const display = document.querySelector("#display");
let string = "";
let justCalculated = false;
let isResultDisplayed = false;
let lastPressedOp = false;

let buttons = document.querySelectorAll(".button");
if (justCalculated) {
  justCalculated = false;
}
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerText == "=") {
      //let expr = display.value;
      let result = eval(string);

      let fullCalc = string + "=" + result;
      let history = JSON.parse(localStorage.getItem("history")) || [];
      history.push(fullCalc);
      localStorage.setItem("history", JSON.stringify(history));
      display.value = result;
      string = result;
      justCalculated = true;
      display.value = eval(display.value);
      isResultDisplayed = true;

      showHistory();
    } else if (e.target.innerHTML == "AC") {
      string = "";
      display.value = "";
    } else if (e.target.innerHTML == "C") {
      string = string.slice(0, -1);
      display.value = string;
    } else {
      let val = e.target.innerHTML;
      if (justCalculated && !isNaN(val)) {
        string = val;
        justCalculated = false;
      } else {
        string += val;
      }

      display.value = string;
    }
  });
});

window.addOp = function (op) {
  if (isResultDisplayed) {
    isResultDisplayed = false;
  }
  display.value += op;
};

function addNum(num) {
  if (isResultDisplayed && !lastPressedOp) {
    currInp = "";
    display.value = "";
    isResultDisplayed = false;
  }
  currInp += num;
  display.value = currInp;
  lastPressedOp = false;
}
function addOp(op) {
  if (isResultDisplayed) {
    currInp = display.value;
    isResultDisplayed = false;
  }
  currInp += op;
  display.value = currInp;
  lastPressedOp = true;
}

function calc() {
  try {
    let result = eval(currInp);
    display.value = result;
    currInp = result.toString();
    lastPressedOp = false;
    isResultDisplayed = true;
  } catch {
    display.value = "Error";
  }
}

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  localStorage.removeItem("history");
  document.getElementById("CalcHistory").innerHTML = "";
});

let history = JSON.parse(localStorage.getItem("history")) || [];

let result = eval(string);
let fullCalc = string + "=" + result;
history.push(`${fullCalc} (${new Date().toLocaleTimeString()})`);

function showHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  if (!Array.isArray(history)) {
    history = [];
  }
  let box = document.getElementById("CalcHistory");
  box.innerHTML = "";
  history.forEach((item) => {
    box.innerHTML += `<p>${item}</p>`;
  });
  box.scrollTop = box.scrollHeight;
}
showHistory();
