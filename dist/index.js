"use strict";
const input = document.querySelector("#input");
const displayBtn = document.querySelectorAll(".display-btns");
const memRecall = document.querySelector("#mem-recall");
const memClear = document.querySelector("#mem-clear");
const memory = document.querySelector(".memory");
const memoryDisplay = document.querySelector("#memory-display");
const sin = /sin(\d+)/;
const cos = /cos(\d+)/;
const tan = /tan(\d+)/;
const log = /log(\d+(?:\.\d+)?)/;
const ln = /ln(\d+(?:\.\d+)?)/;
const root = /(\d+(?:\.\d+)?) ?√ ?(\d+(?:\.\d+)?)/;
const raisedTo = /(\d+(?:\.\d+)?) ?\^ ?(\d+(?:\.\d+)?)/;
const otherTests = /(\d+(?:\.\d+)?) ?[\+-\/\*\%{E}]* ?(\d+(?:\.\d+)?)/; //Checks for other operations like add,subtract,multiply,divide,modulo,exp
// Clearing the input screen
const clearInput = () => (input.value = "");
// Displaying the result
const result = () => {
    if (raisedTo.test(input.value)) {
        input.value = input.value.replace("^", "**");
    }
    else if (log.test(input.value)) {
        let exp = input.value;
        const logAns = Math.log(Number(exp.slice(3))) / Math.log(10);
        input.value = logAns.toFixed(10).toString();
        return;
    }
    else if (ln.test(input.value)) {
        let exp = input.value;
        const lnAns = Math.log(Number(exp.slice(2)));
        input.value = lnAns.toFixed(10).toString();
        return;
    }
    else if (root.test(input.value)) {
        let exp = input.value;
        let exponent = exp.slice(0, exp.indexOf("√"));
        let base = exp.slice(exp.indexOf("√") + 1);
        const rootAns = Math.pow(Number(base), 1 / Number(exponent)).toString();
        input.value = rootAns;
        return;
    }
    else if (sin.test(input.value)) {
        let exp = input.value;
        let num = Number(exp.slice(3)) * (Math.PI / 180);
        input.value = Math.sin(num).toFixed(10).toString();
    }
    else if (cos.test(input.value)) {
        let exp = input.value;
        let num = Number(exp.slice(3)) * (Math.PI / 180);
        input.value = Math.cos(num).toFixed(10).toString();
    }
    else if (tan.test(input.value)) {
        let exp = input.value;
        let num = Number(exp.slice(3)) * (Math.PI / 180);
        input.value = Math.tan(num).toFixed(10).toString();
    }
    else if (!otherTests.test(input.value)) {
        alert("Invalid Input!");
    }
    input.value = input.value.replace(/(^|[^0-9])0+([0-9]+)/g, "$1$2"); // remove leading zeros from numbers in expression
    const ans = eval(input.value).toFixed(10);
    input.value = ans;
};
// Backspace
const backspace = () => (input.value = input.value.slice(0, input.value.length - 1));
// Change Sign
const changeSign = () => {
    if (input.value.charAt(0) == "-")
        input.value = input.value.slice(1);
    else
        input.value = "-" + input.value;
};
//Factorial
const factorial = () => {
    let num = Number(input.value);
    if (num != Infinity && !isNaN(num)) {
        let ans = 1;
        for (let i = 1; i <= num; i++)
            ans = ans * i;
        input.value = ans.toString();
    }
    else {
        alert("Invalid input!");
        input.value = "";
    }
};
// Inverse
const inverse = () => {
    let num = Number(input.value);
    input.value = (1 / num).toFixed(10).toString();
};
//Absolute
const absolute = () => {
    let num = Number(input.value);
    input.value = Math.abs(num).toString();
};
// Square
const square = () => {
    let num = Number(input.value);
    input.value = Math.pow(num, 2).toString();
};
//Cube
const cube = () => {
    let num = Number(input.value);
    input.value = Math.pow(num, 3).toString();
};
// Square Root
const squareRoot = () => {
    let num = Number(input.value);
    input.value = Math.sqrt(num).toString();
};
// Cube Root
const cubeRoot = () => {
    let num = Number(input.value);
    input.value = Math.pow(num, 1 / 3).toString();
};
// Fix to Exponential (F-E Button)
const fixToExp = () => {
    let num = input.value;
    num = Number(num).toExponential(2);
    input.value = num;
};
// Degree to Radian and Vice-versa
const changeUnitOfAngle = () => {
    let val = input.value;
    let button = document.querySelector("#changeUnit");
    let unit = button.innerText;
    if (unit == "DEG") {
        val = (Number(val) * (180 / Math.PI)).toFixed(10).toString();
        button.innerText = "RAD";
    }
    else if (unit == "RAD") {
        val = (Number(val) * (Math.PI / 180)).toFixed(10).toString();
        button.innerText = "DEG";
    }
    input.value = val;
};
// Change options (2nd Button)
const changeToSecond = () => {
    let button = document.querySelector("#second-btn");
    let option = button.innerText;
    let shownElements = document.querySelectorAll(".shown-btns");
    let hidnElements = document.querySelectorAll(".hidn-btns");
    if (option == "2nd") {
        button.innerHTML = "1<sup>st</sup>";
        shownElements.forEach((item) => {
            item.style.display = "none";
        });
        hidnElements.forEach((item) => {
            item.style.display = "block";
        });
    }
    else if (option == "1st") {
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
const logToBase2 = () => {
    let num = Number(input.value);
    input.value = (Math.log(num) / Math.log(2)).toFixed(5).toString();
};
// Enable MC and MR Buttons
const enable = () => {
    memRecall.disabled = false;
    memClear.disabled = false;
};
//Floor function
const findFloor = () => {
    let num = input.value;
    input.value = Math.floor(Number(num)).toString();
};
//Ceiling function
const findCeil = () => {
    let num = input.value;
    input.value = Math.ceil(Number(num)).toString();
};
// Memory Operations
memory.addEventListener("click", (e) => {
    let id = e.target.id;
    let arr;
    if (id == "mem-plus") {
        let value = Number(input.value);
        value = value + Number(localStorage.getItem("arr"));
        localStorage.setItem("arr", JSON.stringify(value));
        input.value = "";
    }
    else if (id == "mem-minus") {
        let value = Number(input.value);
        value = Number(localStorage.getItem("arr")) - value;
        localStorage.setItem("arr", JSON.stringify(value));
        input.value = "";
    }
    else if (id == "mem-store") {
        let value = Number(input.value);
        if (localStorage.getItem("arr") === null)
            arr = "";
        else
            arr = JSON.parse(localStorage.getItem("arr") || "");
        localStorage.setItem("arr", JSON.stringify(value));
        enable();
        input.value = "";
    }
    else if (id == "mem-recall") {
        input.value = localStorage.getItem("arr") || "".toString();
    }
    else if (id == "mem-clear") {
        memClear.disabled = true;
        memRecall.disabled = true;
        localStorage.clear();
        input.value = "";
    }
});
// Aliases for Buttons and Displaying input text
displayBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
        let btntext;
        const button = e.target;
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
