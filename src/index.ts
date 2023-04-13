const input: HTMLInputElement = document.querySelector("#input")!;
const displayBtn =
  document.querySelectorAll<HTMLButtonElement>(".display-btns");
const memRecall = document.querySelector<HTMLButtonElement>("#mem-recall")!;
const memClear = document.querySelector<HTMLButtonElement>("#mem-clear")!;
const memory: HTMLDivElement = document.querySelector(".memory")!;
const memoryDisplay: HTMLDivElement =
  document.querySelector("#memory-display")!;
const sin: RegExp = /sin(\d+)/;
const cos: RegExp = /cos(\d+)/;
const tan: RegExp = /tan(\d+)/;
const log: RegExp = /log(\d+(?:\.\d+)?)/;
const ln: RegExp = /ln(\d+(?:\.\d+)?)/;
const root: RegExp = /(\d+(?:\.\d+)?) ?√ ?(\d+(?:\.\d+)?)/;
const raisedTo: RegExp = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/;
const otherTests: RegExp = /(\d+(?:\.\d+)?) ?[\+-\/\*\%{E}]* ?(\d+(?:\.\d+)?)/; //Checks for other operations like add,subtract,multiply,divide,modulo,exp

// Clearing the input screen
const clearInput = (): string => (input.value = "");

// Displaying the result
const result = (): void => {
  if (raisedTo.test(input.value)) {
    input.value = input.value.replace("^", "**");
  } else if (log.test(input.value)) {
    let exp = input.value;
    const logAns = Math.log(Number(exp.slice(3))) / Math.log(10);
    input.value = logAns.toFixed(10).toString();
    return;
  } else if (ln.test(input.value)) {
    let exp = input.value;
    const lnAns = Math.log(Number(exp.slice(2)));
    input.value = lnAns.toFixed(10).toString();
    return;
  } else if (root.test(input.value)) {
    let exp = input.value;
    let exponent = exp.slice(0, exp.indexOf("√"));
    let base = exp.slice(exp.indexOf("√") + 1);
    const rootAns = Math.pow(Number(base), 1 / Number(exponent)).toString();
    input.value = rootAns;
    return;
  } else if (sin.test(input.value)) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI / 180);
    input.value = Math.sin(num).toFixed(10).toString();
  } else if (cos.test(input.value)) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI / 180);
    input.value = Math.cos(num).toFixed(10).toString();
  } else if (tan.test(input.value)) {
    let exp = input.value;
    let num = Number(exp.slice(3)) * (Math.PI / 180);
    input.value = Math.tan(num).toFixed(10).toString();
  } else if (!otherTests.test(input.value)) {
    alert("Invalid Input!");
  }
  input.value = input.value.replace(/(^|[^0-9])0+([0-9]+)/g, "$1$2"); // remove leading zeros from numbers in expression

  const ans: string = eval(input.value).toFixed(10) as string;
  input.value = ans;
};

// Backspace
const backspace = (): string =>
  (input.value = input.value.slice(0, input.value.length - 1));

// Change Sign
const changeSign = (): void => {
  if (input.value.charAt(0) == "-") input.value = input.value.slice(1);
  else input.value = "-" + input.value;
};

//Factorial
const factorial = (): void => {
  let num = Number(input.value);
  if (num != Infinity && !isNaN(num)) {
    let ans = 1;
    for (let i = 1; i <= num; i++) ans = ans * i;
    input.value = ans.toString();
  } else {
    alert("Invalid input!");
    input.value = "";
  }
};

// Inverse
const inverse = (): void => {
  let num = Number(input.value);
  input.value = (1 / num).toFixed(10).toString();
};

//Absolute
const absolute = (): void => {
  let num = Number(input.value);
  input.value = Math.abs(num).toString();
};

// Square
const square = (): void => {
  let num = Number(input.value);
  input.value = Math.pow(num, 2).toString();
};

//Cube
const cube = (): void => {
  let num = Number(input.value);
  input.value = Math.pow(num, 3).toString();
};

// Square Root
const squareRoot = (): void => {
  let num = Number(input.value);
  input.value = Math.sqrt(num).toString();
};

// Cube Root
const cubeRoot = (): void => {
  let num = Number(input.value);
  input.value = Math.pow(num, 1 / 3).toString();
};

// Fix to Exponential (F-E Button)
const fixToExp = (): void => {
  let num = input.value;
  num = Number(num).toExponential(2);
  input.value = num;
};

// Degree to Radian and Vice-versa
const changeUnitOfAngle = (): void => {
  let val = input.value;
  let button: HTMLButtonElement = document.querySelector("#changeUnit")!;
  let unit = button.innerText;
  if (unit == "DEG") {
    val = (Number(val) * (180 / Math.PI)).toFixed(10).toString();
    button.innerText = "RAD";
  } else if (unit == "RAD") {
    val = (Number(val) * (Math.PI / 180)).toFixed(10).toString();
    button.innerText = "DEG";
  }
  input.value = val;
};

// Change options (2nd Button)
const changeToSecond = (): void => {
  let button: HTMLButtonElement = document.querySelector("#second-btn")!;
  let option = button.innerText;

  let shownElements =
    document.querySelectorAll<HTMLButtonElement>(".shown-btns");

  let hidnElements = document.querySelectorAll<HTMLButtonElement>(".hidn-btns");

  if (option == "2nd") {
    button.innerHTML = "1<sup>st</sup>";

    shownElements.forEach((item) => {
      item.style.display = "none";
    });

    hidnElements.forEach((item) => {
      item.style.display = "block";
    });
  } else if (option == "1st") {
    button.innerHTML = "2<sup>nd</sup>";

    shownElements.forEach((item) => {
      item.style.display = "block";
    });

    hidnElements.forEach((item) => {
      item.style.display = "none";
    });
  }
};

//Log to the base 2
const logToBase2 = (): void => {
  let num = Number(input.value);
  input.value = (Math.log(num) / Math.log(2)).toFixed(5).toString();
};

// Enable MC and MR Buttons
const enable = (): void => {
  memRecall.disabled = false;
  memClear.disabled = false;
};

//Floor function
const findFloor = (): void => {
  let num = input.value;
  input.value = Math.floor(Number(num)).toString();
};

//Ceiling function
const findCeil = (): void => {
  let num = input.value;
  input.value = Math.ceil(Number(num)).toString();
};

// Memory Operations
memory.addEventListener("click", (e: MouseEvent): void => {
  let id = (e.target as Element).id;
  let arr: string;
  if (id == "mem-plus") {
    let value = Number(input.value);
    value = value + Number(localStorage.getItem("arr"));
    localStorage.setItem("arr", JSON.stringify(value));
    input.value = "";
  } else if (id == "mem-minus") {
    let value = Number(input.value);
    value = Number(localStorage.getItem("arr")) - value;
    localStorage.setItem("arr", JSON.stringify(value));
    input.value = "";
  } else if (id == "mem-store") {
    let value = Number(input.value);
    if (localStorage.getItem("arr") === null) arr = "";
    else arr = JSON.parse(localStorage.getItem("arr") || "");
    localStorage.setItem("arr", JSON.stringify(value));
    enable();
    input.value = "";
  } else if (id == "mem-recall") {
    input.value = localStorage.getItem("arr") || "".toString();
  } else if (id == "mem-clear") {
    memClear.disabled = true;
    memRecall.disabled = true;
    localStorage.clear();
    input.value = "";
  }
});

// Aliases for Buttons and Displaying input text
displayBtn.forEach((item) => {
  item.addEventListener("click", (e: Event): void => {
    let btntext: string;
    const button = e.target as HTMLButtonElement;
    btntext = button.innerText;
    switch (btntext) {
      case "÷":
        btntext = "/";
        break;
      case "x":
        btntext = "*";
        break;
      case "mod":
        btntext = "%";
        break;
      case "π":
        btntext = "3.14159";
        break;
      case "e":
        btntext = "2.71828";
        break;
      case "ex":
        btntext = "2.71828^";
        break;
      case "xy":
        btntext = "^";
        break;
      case "exp":
        btntext = "E";
        break;
      case "10x":
        btntext = "10^";
        break;
      case "2x":
        btntext = "2^";
        break;
      case "y√x":
        btntext = "√";
        break;
    }
    input.value += btntext;
  });
});
