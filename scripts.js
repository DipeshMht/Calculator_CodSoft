const buttons = document.querySelectorAll('button');
const inputField = document.querySelector('input');

let pendingOperation = '';
let firstOperand = '';

function evaluateExpression(expression) {
  try {
    return eval(expression);
  } catch (error) {
    return 'Error';
  }
}

function calculatePercentage(expression) {
  const parts = expression.split('%');
  if (parts.length === 2) {
    const percentage = parseFloat(parts[0]);
    const value = parseFloat(parts[1]);
    if (!isNaN(percentage) && !isNaN(value)) {
      return ((percentage / 100) * value).toString();
    }
  }
  return 'Error';
}
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    const currentInput = inputField.value;

    if (buttonText === 'AC') {
      inputField.value = '';
      firstOperand = '';
    } else if (buttonText === 'DEL') {
      inputField.value = currentInput.slice(0, -1);
    } else if (buttonText === '=') {
      let expression = currentInput;
      expression = expression.replace(/X/g, '*').replace(/\/\//g, '/');
      expression = expression.replace(/\^/g, '**');
      expression = expression.replace(/(\d+)\s?\/\s?(\d+)/g, '($1)/($2)');
      expression = expression.replace(/(\d+)\s?X\s?(\d+)/g, '($1)*($2)');

      if (pendingOperation === '%') {
        const result = calculatePercentage(firstOperand + expression);
        inputField.value = result;
        pendingOperation = '';
        firstOperand = '';
      } else {
        inputField.value = evaluateExpression(expression);
        pendingOperation = '';
      }
      
    } else if (buttonText === '%') {
      if (currentInput && !currentInput.includes('%')) {
        inputField.value += buttonText;
        pendingOperation = buttonText;
      }
    } else {
      inputField.value += buttonText;
    }
  });
});
