let currentInput = "0"
let operator = null
let previousInput = null
let shouldResetDisplay = false

const display = document.getElementById("display")

function updateDisplay() {
    if (operator && previousInput) {
        const operatorSymbol = operator === "*" ? "×" : operator === "/" ? "÷" : operator
        if (shouldResetDisplay) {
            display.textContent = previousInput + " " + operatorSymbol
        } else {
            display.textContent = previousInput + " " + operatorSymbol + " " + currentInput
        }
    } else {
        display.textContent = currentInput
    }
}

function appendToDisplay(value) {
    if (shouldResetDisplay && !["+", "-", "*", "/"].includes(value)) {
        currentInput = "0"
        shouldResetDisplay = false
    }

    if (value === "." && currentInput.includes(".")) {
        return
    } else if (value === "." && currentInput === "0") {
        currentInput = "0."
    } else if (value === ".") {
        currentInput += value
    } else if (["+", "-", "*", "/"].includes(value)) {
        if (operator !== null && !shouldResetDisplay) {
            calculateResult()
        }
        operator = value
        previousInput = currentInput
        shouldResetDisplay = true
    } else {
        if (currentInput === "0") {
            currentInput = value
        } else {
            currentInput += value
        }
    }

    updateDisplay()
}

function clearDisplay() {
    currentInput = "0"
    operator = null
    previousInput = null
    shouldResetDisplay = false
    updateDisplay()
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1)
    } else {
        currentInput = "0"
    }
    updateDisplay()
}

function calculateResult() {
    if (operator === null || previousInput === null) {
        return
    }

    const prev = Number.parseFloat(previousInput)
    const current = Number.parseFloat(currentInput)
    let result

    if (operator === "+") {
        result = prev + current
    } else if (operator === "-") {
        result = prev - current
    } else if (operator === "*") {
        result = prev * current
    } else if (operator === "/") {
        if (current === 0) {
            alert("Error: Division by zero!")
            clearDisplay()
            return
        }
        result = prev / current
    } else {
        return
    }

    if (result % 1 === 0) {
        currentInput = result.toString()
    } else {
        currentInput = result.toFixed(8).replace(/\.?0+$/, "")
    }

    operator = null
    previousInput = null
    shouldResetDisplay = true
    updateDisplay()
}

document.addEventListener("keydown", (event) => {
    const key = event.key

    for (let i = 0; i <= 9; i++) {
        if (key === i.toString()) {
            appendToDisplay(key)
            return
        }
    }

    if (key === "+" || key === "-") {
        appendToDisplay(key)
    } else if (key === "*") {
        appendToDisplay("*")
    } else if (key === "/") {
        event.preventDefault()
        appendToDisplay("/")
    } else if (key === ".") {
        appendToDisplay(".")
    } else if (key === "Enter" || key === "=") {
        calculateResult()
    } else if (key === "Escape" || key === "c" || key === "C") {
        clearDisplay()
    } else if (key === "Backspace") {
        deleteLast()
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn")

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]

        button.addEventListener("click", function () {
            this.style.backgroundColor = "#e0e0e0"

            setTimeout(() => {
                this.style.backgroundColor = ""
            }, 100)
        })
    }
})

updateDisplay()