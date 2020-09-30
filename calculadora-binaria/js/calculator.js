var resultDiv = document.createElement('div');
resultDiv.id = 'res';
resultDiv.addEventListener('click', buttonClick);
document.body.appendChild(resultDiv);

var buttonsDiv = document.createElement('div');
buttonsDiv.id = 'btns';
document.body.appendChild(buttonsDiv);

var ids = ['btn0', 'btn1', 'btnClr', 'btnEql', 'btnSum', 'btnSub', 'btnMul', 'btnDiv'];
var innerHTMLs = ['0', '1', 'C', '=', '+', '-', '*', '/'];
var styles = ['binaryButton', 'binaryButton', 'utilityButton', 'utilityButton', 'operatorButton', 'operatorButton', 'operatorButton', 'operatorButton'];

for (var i = 0; i < ids.length; i++) {
    var button = document.createElement('button');
    button.innerHTML = innerHTMLs[i];
    button.id = ids[i];
    button.className = 'button ' + styles[i];
    button.addEventListener('click', buttonClick);
    buttonsDiv.appendChild(button);
}

var operator = '';

function buttonClick(e) {
    var button = e.target || e.srcElement;

    if (button.id == 'btnClr') {
        operator = '';
        resultDiv.innerHTML = '';
    }
    else if (button.id != 'btnEql') {

        if (button.id != 'btn0' && button.id != 'btn1') {
            if (operator != '') {
                evaluate();
            }
            operator = button.innerHTML;
        }

        resultDiv.innerHTML += button.innerHTML;
    }
    else {
        evaluate();
    }
}

function evaluate() {
    var operands = resultDiv.innerHTML.split(operator);
    resultDiv.innerHTML = (
            Math.floor(
                eval(parseInt(operands[0], 2) 
                + operator 
                + parseInt(operands[1], 2))
            )
        ).toString(2);

    operator = '';
}