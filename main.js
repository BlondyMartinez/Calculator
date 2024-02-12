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
    if (operation){
        if (operators.length > 0 && lastCharIsOperator()) operators =  operators.slice(0, -1);
        else if (nums.length > 0) nums[operatorCount] = nums[operatorCount].slice(0, -1);

        if (operation.length > 0) operation = operation.slice(0, -1);
        screenOperation.textContent = operation;
    }
}


function lastCharIsOperator(){
    if (operation.length > 0) {
        char = operation[operation.length - 1];
        if (char == "+" || char == "-" || char == "*" || char == "/") return true;
        return false;
    }
}

function numericButton(input){
    addInputToOperation(input);
    if (!nums[operatorCount]) nums[operatorCount] = "";
    nums[operatorCount] += input;
}

function operatorButton(input) {
    if(!lastCharIsOperator()) {
        //if there is a result sets first number in the operation as the result then clears the result
        if (screenResult.textContent && !nums[0]) {
            operation = screenResult.textContent;
            nums[0] = screenResult.textContent;
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
    if (!lastCharIsOperator() && !nums[operatorCount].includes('.')) {
        nums[operatorCount] += '.';
        addInputToOperation('.');
    }
}

function equals(){
    if (operators.length > 0 && !lastCharIsOperator()) {
        removeUndefined();
        sortOperations();

        for(let i = 0; i < operators.length; i++){
            if (i == 0) result = operate(parseFloat(nums[i]), parseFloat(nums[i+1]), operators[i]);
            else result = operate(parseFloat(result), parseFloat(nums[i+1]), operators[i])
        }

        result = parseFloat(result);
        //if result is a float, round to 2 decimals
        if (result % 1 !== 0) result = result.toFixed(2);
        screenResult.textContent = result;
        
        nums = [];
        operators = [];
        operatorCount = 0;

        result= "";
    }
}

function removeUndefined() {
    nums = nums.filter(function (element) {
        return element !== undefined;
    });

     operators = operators.filter(function (element) {
        return element !== undefined;
    });
}

function sortOperations() {
    let priorityNums = [];
    let priorityOperators = [];

    for (let i = 0; i < operators.length; i++){
        if (operators[i] == '/' || operators[i] == '*'){
            priorityNums.push(nums[i]);
            priorityNums.push(nums[i + 1]);
            priorityOperators.push(operators[i]);
            nums.splice(i, 2);
            operators.splice(i, 1);
        }
    }

    nums = priorityNums.concat(nums);
    operators = priorityOperators.concat(operators);
    
    removeUndefined();
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