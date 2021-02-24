"use strict"

const numButtons = document.querySelectorAll("[data-number]");
const operButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const scrTopTextElem = document.querySelector("[data-screen-top]");
const scrMainTextElem = document.querySelector("[data-screen-main]");

class Calculator {
    constructor(scrTopTextElem, scrMainTextElem) {
        this.scrTopTextElem = scrTopTextElem;
        this.scrMainTextElem = scrMainTextElem

        this.clear()
        this.reset = false;
    }

    clear() {
        this.scrMain = ""
        this.scrTop = ""
        this.operation = undefined
    }

    delete() {
        // this.scrMain = this.scrMain.toString().slice(0, -1)
        this.scrMain = this.scrMain.toString().slice(0, this.scrMain.length-1)
    }

    addNumToScr (number) {
        if (number === "." && this.scrMain.includes(".")) return

        this.scrMain = this.scrMain.toString() + number.toString()
    }

    chooseOper(operation) {
        if (this.scrMain === "") return
        if (this.scrTop !== "") {
            this.calculate()
        }

        this.operation = operation;
        this.scrTop = this.scrMain
        this.scrMain = ""
    }

    calculate() {

        let result;

        const top = +this.scrTop;
        const main = +this.scrMain;

        if (isNaN(top) || isNaN(main)) return;

        switch (this.operation) {
            case "+":
                result = top + main
                break
            case "-":
                result = top - main
                break
            case "×":
                result = top * main
                break
            case "÷":
                result = top / main
                break
            default:
                return
        }

        this.reset = true;
        this.scrMain = result;
        this.operation = undefined;
        this.scrTop = ""
    }

    updateScr() {
        this.scrMainTextElem.innerText = this.scrMain;

        if (this.operation != null) {
            this.scrTopTextElem.innerText = `${this.scrTop} ${this.operation}`;
        } else {
            this.scrTopTextElem.innerText = ""
        }
    }
}

const calculator = new Calculator(scrTopTextElem, scrMainTextElem);

numButtons.forEach(button => {

    button.addEventListener("click", () => {
        
        if (calculator.scrTop === "" && calculator.scrMain !== "" && calculator.reset) {
            calculator.scrMain = "";
            calculator.reset = false;
        }

        calculator.addNumToScr(button.innerText)
        calculator.updateScr()

    })
});


operButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOper(button.innerText)
        calculator.updateScr()
    })
});

equalsButton.addEventListener("click", button => {
    calculator.calculate();
    calculator.updateScr()
})

clearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateScr()
})

delButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateScr()
})