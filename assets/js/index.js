const buttonsMaps = [
    ['one', '.btn-1'],
    ['two', '.btn-2'],
    ['three', '.btn-3'],
    ['four', '.btn-4'],
    ['five', '.btn-5'],
    ['six', '.btn-6'],
    ['seven', '.btn-7'],
    ['eight', '.btn-8'],
    ['nine', '.btn-9'],
    ['zero', '.btn-0'],
    ['multiplication', '.btn-multiplication'],
    ['addition', '.btn-addition'],
    ['subtraction', '.btn-subtraction'],
    ['division', '.btn-division'],
    ['dot', '.btn-dot'],
    ['equals', '.btn-equals'],
    ['sqrt', '.btn-sqrt'],
    ['pow', '.btn-pow'],
    ['delete', '.btn-delete'],
    ['clear', '.btn-clear'],
    ['output', '#output'],
    ['popup', '#popup-icon'],
];

const btn = buttonsMaps.extractDOM();
const calculator = new Calculator(btn);
btn.numbers.attachEventListeners(calculator.handler.numbers);
btn.operations.attachEventListeners(calculator.handler.operations);
btn.equals.attachEventListener(calculator.handler.calculate);
btn.clear.attachEventListener(calculator.handler.clear);
btn.dot.attachEventListener(calculator.handler.dot);
btn.sqrt.attachEventListener(calculator.handler.sqrt);
btn.pow.attachEventListener(calculator.handler.pow);
btn.delete.attachEventListener(calculator.handler.backspace);
