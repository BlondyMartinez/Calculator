let operation = "";
let screenOperation = document.querySelector('.operation');

let result = "";
let screenResult = document.querySelector('.result');

let nums = [];
let operators = [];
let operatorCount = 0;

function addInputToOperation(input){
    operation += input;
    screenOperation.textContent = operation;
}

function clearAll() {
    operation = "";

    nums = [];
    operators = [];
    operatorCount = 0;

    screenOperation.textContent = operation;

    clearResult();
}

function clearResult(){
    result = "";
    screenResult.textContent = result;
}

function deleteLast(){
    //if there are operators and last 
    if (operators.length > 0 && lastCharIsOperator()) operators =  operators.slice(0, -1);
    else nums[numCount].slice(0, -1);

    operation = operation.slice(0, -1);
    screenOperation.textContent = operation;
}


function lastCharIsOperator(){
    char = operation[operation.length - 1];
    if (char == "+" || char == "-" || char == "*" || char == "/") return true;
    return false;
}

function numericButton(input){
    addInputToOperation(input);
    if (!nums[operatorCount]) nums[operatorCount] = "";
    nums[operatorCount] += input;
}

function operatorButton(input) {
    if(!lastCharIsOperator()) {
        //if there is a result sets first number in the operation as the result then clears the result
        if (result) {
            operation = result;
            nums[0] = result;
            clearResult();
        }
        
        addInputToOperation(input);
        
        //if it doesn't exist, initializes it
        if (!operators[operatorCount]) operators[operatorCount] = "";

        operatorCount++;
        operators[operatorCount - 1] += input;
    }
}

function dotButton(){
    if (!lastCharIsOperator && !nums[operatorCount].includes('.')){
        nums[operatorCount] += '.';
        addInputToOperation('.');
        console.log("ho")
    }
}

function equals(){
    if (operators.length > 0 && !lastCharIsOperator()) {
        for(let i = 0; i < operators.length; i++){
            if (i == 0) result += operate(parseFloat(nums[i]), parseFloat(nums[i+1]), operators[i]);
            else result = operate(parseFloat(result), parseFloat(nums[i+1]), operators[i])
        }

        result = parseFloat(result).toFixed(2);
        screenResult.textContent = result;
        
        nums = [];
        operators = [];
        operatorCount = 0;
    }
}

function operate(n1, n2, inputOperator) {
    operation = "";
    
    switch(inputOperator) {
        case "+":
            return n1 + n2;
        case "*":
            return n1 * n2;
        case "-":
            return n1 - n2;
        case "/":
            return n1 / n2;
    }
}