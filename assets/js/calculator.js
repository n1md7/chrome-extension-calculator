class Calculator {
    constructor(btn) {
        this.btn = btn;
        this.calcStack = [];
        this.calculatedValue = 0;
    }

    calculate() {
        const [number1, operation, number2] = this.calcStack;
        if (this.calcStack.length === 1) {
            if (isNaN(parseFloat(number1))) {
                throw new Error('Number expected');
            }
            this.calculatedValue = parseFloat(number1);
            this.calcStack = [`${this.calculatedValue}`];

            return;
        }
        if (isNaN(parseFloat(number2))) {
            throw new Error('Number expected');
        }
        switch (operation) {
            case OPERATION_VALUES_OBJ.ADDITION:
                this.calculatedValue = round(parseFloat(number1) + parseFloat(number2));
                this.calcStack = [`${this.calculatedValue}`];
                break;
            case OPERATION_VALUES_OBJ.DIVISION:
                this.calculatedValue = round(parseFloat(number1) / parseFloat(number2));
                this.calcStack = [`${this.calculatedValue}`];
                break;
            case OPERATION_VALUES_OBJ.MULTIPLICATION:
                this.calculatedValue = round(parseFloat(number1) * parseFloat(number2));
                this.calcStack = [`${this.calculatedValue}`];
                break;
            case OPERATION_VALUES_OBJ.SUBTRACTION:
                this.calculatedValue = round(parseFloat(number1) - parseFloat(number2));
                this.calcStack = [`${this.calculatedValue}`];
                break;
        }
    }

    get render() {
        return {
            output: value => {
                this.btn.output.innerText = value || this.calculatedValue;
                this.btn.output.adjustFontSizeByDecreasing();
            }
        }
    }

    get handler() {
        return {
            sqrt: () => {
                // calculate values and render UI
                if (this.calcStack.length > 1) {
                    this.handler.calculate();
                    const value = Math.sqrt(this.calculatedValue);
                    if (isNaN(value)) {
                        this.handler.disableAll();
                        return this.render.output('Syntax error');
                    }
                    this.calculatedValue = round(value);
                } else {
                    const value = this.calcStack[0];
                    if (isNaN(parseFloat(value))) {
                        this.handler.disableAll();
                        return this.render.output('Syntax error');
                    }
                    this.calculatedValue = round(Math.sqrt(value));
                }
                this.calcStack = [this.calculatedValue];
                this.btn.output.innerText = this.calculatedValue;
                this.btn.output.adjustFontSizeByDecreasing();
                this.btn.output.adjustFontSizeByIncreasing();
            },
            pow: () => {
                // calculate values and render UI
                if (this.calcStack.length > 1) {
                    this.handler.calculate();
                    this.calculatedValue = round(Math.pow(this.calculatedValue, 2));
                } else {
                    const value = this.calcStack[0];
                    if (isNaN(parseFloat(value))) {
                        this.handler.disableAll();
                        return this.render.output('Syntax error');
                    }
                    this.calculatedValue = round(Math.pow(value, 2));
                }
                this.calcStack = [this.calculatedValue];
                this.btn.output.innerText = this.calculatedValue;
                this.btn.output.adjustFontSizeByDecreasing();
                this.btn.output.adjustFontSizeByIncreasing();
            },
            dot: ({target}) => {
                this.btn.dot.disable();
                // render UI
                this.btn.output.innerText += target.dataset.value;
                this.calcStack.alterLast(target.dataset.value);
                this.btn.output.adjustFontSizeByDecreasing();
            },
            clear: () => {
                this.handler.enableAll();
                this.calcStack = [];
                this.calculatedValue = 0;
                this.btn.output.innerText = '';
                this.btn.output.adjustFontSizeByIncreasing();
            },
            backspace: () => {
                this.handler.enableAll();
                this.btn.output.innerText = this.calcStack.alterLastRemoveLetter();
                this.btn.output.adjustFontSizeByIncreasing();
            },
            calculate: () => {
                console.log(this.calcStack)
                try {
                    // calculate values and render UI
                    this.calculate();
                    this.render.output();
                } catch (error) {
                    console.warn(error);
                    this.handler.disableAll();
                    this.render.output(error.message);
                }
                // adjust font-size
                this.btn.output.adjustFontSizeByIncreasing();
            },
            numbers: ({target}) => {
                // enable operational buttons
                this.btn.operations.forEach(enable);
                // when the last element is operation symbol
                if (this.calcStack.lastIsOperation()) {
                    // push as new element into stack
                    this.calcStack.push(target.dataset.value);
                } else {
                    // or it's a number and modify last element by concatenating the value
                    this.calcStack.alterLast(target.dataset.value);
                }
                // render UI
                this.btn.output.innerText += target.dataset.value;
                this.btn.output.adjustFontSizeByDecreasing();
            },
            operations: ({target}) => {
                // disable operational buttons
                this.btn.operations.forEach(disable);
                // enable dot btn
                this.btn.dot.enable();
                // when operational symbol is set and clicking seconds time
                if (this.calcStack.operationIsSet()) {
                    // trigger calculate
                    this.handler.calculate();
                }
                // or add to the stack prev number value
                this.calcStack.push(target.dataset.value);
                this.btn.output.innerText += target.dataset.value;
                // try to adjust by decreasing first and then vice versa
                this.btn.output.adjustFontSizeByDecreasing();
                this.btn.output.adjustFontSizeByIncreasing();
            },
            disableAll: () => {
                this.btn.operations.forEach(disable);
                this.btn.numbers.forEach(disable);
                this.btn.dot.disable();
                this.btn.sqrt.disable();
                this.btn.pow.disable();
                this.btn.equals.disable();
                this.btn.delete.disable();
            },
            enableAll: () => {
                this.btn.operations.forEach(enable);
                this.btn.numbers.forEach(enable);
                this.btn.dot.enable();
                this.btn.sqrt.enable();
                this.btn.pow.enable();
                this.btn.equals.enable();
                this.btn.delete.enable();
            }
        }
    }
}