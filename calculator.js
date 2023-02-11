class Calculator {
    constructor(previousOprandTextElement, currentOprandTextElement){
        this.previousOprandTextElement  = previousOprandTextElement
        this.currentOprandTextElement = currentOprandTextElement
        this.clear()
    }
    clear() {
        this.currentOprand = ''
        this.previousOprand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOprand = this.currentOprand.toString().slice(0,-1)
    }
    appendNumber(number){ 
        if (number === '.' && this.currentOprand.includes('.')) return
        this.currentOprand = this.currentOprand.toString() + number.toString()

    }
    chooseOperation(operation){
        if(this.currentOprand === '')return
        if (this.previousOprand !== '') {
            this.compute()
            
        }
        this.operation = operation
        this.previousOprand = this.currentOprand
        this.currentOprand = ""

    }
    compute(){
       let computation
       const prev = parseFloat(this.previousOprand)
       const current = parseFloat(this.currentOprand)
       if(isNaN(prev) || isNaN(current)) return
       switch (this.operation) {
        case "+":
            computation = prev + current
            break;
        case "-":
                computation = prev - current
             break;
        case "*":
             computation = prev * current
            break;
         case "/":
            computation = prev / current
            break;
        default:
            return
       }
       this.currentOprand = computation
       this.operation = undefined
       this.previousOprand = ''
    }
    getDisplay(number){  
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split(".")[0])
        const decimalDigit = stringNumber.split(".")[1] 
        let integerDisplay 
        if (isNaN(integerDigit)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigit.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if (decimalDigit!=null) {
            return `${integerDisplay}.${decimalDigit}`
        } else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOprandTextElement.innerHTML =
        this.getDisplay(this.currentOprand)
        if (this.operation != null) {
            this.previousOprandTextElement.innerHTML= 
            `${this.getDisplay(this.previousOprand)} ${ this.operation}`
            
        }else{this.previousOprandTextElement.innerHTML = ''}
    }
}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOprandTextElement = document.querySelector('[data-previous-oprand]')
const currentOprandTextElement = document.querySelector('[data-current-oprand]')

const calculator = new Calculator(previousOprandTextElement, currentOprandTextElement)


numberButton.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})
equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
} ) 
allClearButton.addEventListener('click', button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button=>{
    calculator.delete()
    calculator.updateDisplay()
})