//variable declarations
let operation = "";
let screenOperation = document.querySelector('.operation');

let result = "";
let screenResult = document.querySelector('.result');

let nums = [];
let operators = [];
let operatorCount = 0;

let orderOfOperations = true;

let order = document.getElementById('order');
let chain = document.getElementById('chain');

//sets the order of operations
function followOrder(choice){
    if (choice == 1) {
        orderOfOperations = true;
        order.classList.add('selected');
        chain.classList.remove('selected');
    } else {
        orderOfOperations = false;
        order.classList.remove('selected');
        chain.classList.add('selected');
    }
}

//updates the operation text
function addInputToOperation(input){
    if (operation.length > 14) {
        operation = operation.slice(1);
        console.log(operation);
    } 
    operation += input;
    screenOperation.textContent = operation;
}

//clears all variables and resets calculator
function clearAll() {
    operation = "";

    nums = [];
    operators = [];
    operatorCount = 0;

    screenOperation.textContent = operation;

    clearResult();
}

//clears the result
function clearResult(){
    result = "";
    screenResult.textContent = result;
}

//delete last element of operation and updates the text
function deleteLast(){
    if (operation && screenResult.textContent != "no"){
        if (operators.length > 0 && lastCharIsOperator()) operators =  operators.slice(0, -1);
        else if (nums.length > 0) nums[operatorCount] = nums[operatorCount].slice(0, -1);

        if (operation.length > 0) operation = operation.slice(0, -1);
        screenOperation.textContent = operation;
    }
}

//checks if the last char of operation is an operator
function lastCharIsOperator(){
    if (operation.length > 0) {
        char = operation[operation.length - 1];
        if (char == "+" || char == "-" || char == "*" || char == "/") return true;
        return false;
    }
}

//handles numeric clicks
function numericButton(input){
    if(screenResult.textContent != "no") {
        addInputToOperation(input);
        if (!nums[operatorCount]) nums[operatorCount] = "";
        nums[operatorCount] += input;
    }
}

//handles operator clicks
function operatorButton(input) {
    if(!lastCharIsOperator() && screenResult.textContent != "no" && (nums.length > 0 || screenResult.textContent.length > 0)) {
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

//handles dot clicks
function dotButton(){
    if (!lastCharIsOperator() && !nums[operatorCount].includes('.')) {
        nums[operatorCount] += '.';
        addInputToOperation('.');
    }
}

//evaluates the expression
function equals(){
    if (operators.length > 0 && !lastCharIsOperator()) {
        removeUndefined();
        if (orderOfOperations) sortOperations();

        for(let i = 0; i < operators.length; i++){
            if (parseFloat(nums[i + 1]) == 0) {
                result = "no";
                break;
            }

            if (i == 0) result = operate(parseFloat(nums[i]), parseFloat(nums[i+1]), operators[i]);
            else result = operate(parseFloat(result), parseFloat(nums[i+1]), operators[i])
        }

        if (result != "no") {
            result = parseFloat(result);
            //if result is a float, round to 2 decimals
            if (result % 1 !== 0) result = result.toFixed(2);
        }
        
        screenResult.textContent = result;

        nums = [];
        operators = [];
        operatorCount = 0;

        result= "";
    }
}

//removes undefined from arrays
function removeUndefined() {
    nums = nums.filter(function (element) {
        return element !== undefined;
    });

     operators = operators.filter(function (element) {
        return element !== undefined;
    });
}

//function to sort operations following the order of operations
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

//performs arithmetic operations
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

function invertLastNum(){
    nums[operatorCount] = nums[operatorCount] * -1;
    operation = "";
    for (let i = 0; i < nums.length ; i++) {
        operation += nums[i];
        if (operators[i]) operation += operators[i];
    }
    screenOperation.textContent = operation;
}