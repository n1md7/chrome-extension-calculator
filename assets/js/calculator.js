class Calculator {
    constructor(btn) {
        this.btn = btn;
        this.calculatedValue = 0;
        this.operation = '';
        this.numberOne = '';
        this.numberTwo = '';
    }

    calculate() {
        if (!this.numberOne) {
            return;
        }
        if (!this.numberTwo) {
            return this.calculatedValue = +this.numberOne;
        }

        if (isNaN(parseFloat(this.numberOne)) || isNaN(parseFloat(this.numberTwo))) {
            throw new Error('Number expected');
        }

        switch (this.operation) {
            case OPERATION_VALUES_OBJ.ADDITION:
                this.calculatedValue = round(parseFloat(this.numberOne) + parseFloat(this.numberTwo));
                this.numberOne = `${this.calculatedValue}`;
                break;
            case OPERATION_VALUES_OBJ.DIVISION:
                this.calculatedValue = round(parseFloat(this.numberOne) / parseFloat(this.numberTwo));
                this.numberOne = `${this.calculatedValue}`;
                break;
            case OPERATION_VALUES_OBJ.MULTIPLICATION:
                this.calculatedValue = round(parseFloat(this.numberOne) * parseFloat(this.numberTwo));
                this.numberOne = `${this.calculatedValue}`;
                break;
            case OPERATION_VALUES_OBJ.SUBTRACTION:
                this.calculatedValue = round(parseFloat(this.numberOne) - parseFloat(this.numberTwo));
                this.numberOne = `${this.calculatedValue}`;
                break;
        }
        // reset
        this.numberTwo = '';
        this.operation = '';
    }

    formula(value) {
        if (isNaN(value)) {
            return this.render.output('Syntax error');
        }
        this.operation = '';
        this.numberTwo = '';
        this.calculatedValue = round(value);
        this.numberOne = `${this.calculatedValue}`;
        this.btn.output.innerText = this.calculatedValue;
        this.btn.output.adjustFontSizeByDecreasing();
        this.btn.output.adjustFontSizeByIncreasing();
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
                this.handler.calculate();
                const value = Math.sqrt(this.calculatedValue);
                this.formula(value);
            },
            pow: () => {
                // calculate values and render UI
                this.handler.calculate();
                const value = Math.pow(this.calculatedValue, 2);
                this.formula(value);
            },
            dot: (event) => this.handler.numbers(event),
            clear: () => {
                this.calculatedValue = 0;
                this.operation = '';
                this.numberOne = '';
                this.numberTwo = '';
                this.btn.output.innerText = '';
                this.btn.operations.forEach(deactivate);
                this.btn.output.adjustFontSizeByIncreasing();
            },
            backspace: () => {
                if (this.operation) {
                    this.numberTwo = this.numberTwo.slice(0, -1);
                    this.btn.output.innerText = this.numberTwo;
                } else {
                    this.numberOne = this.numberOne.slice(0, -1);
                    this.btn.output.innerText = this.numberOne;
                }
                this.btn.output.adjustFontSizeByIncreasing();
            },
            calculate: () => {
                try {
                    // calculate values and render UI
                    this.calculate();
                    this.render.output();
                } catch ({message}) {
                    this.render.output(message);
                } finally {
                    this.operation = '';
                    this.btn.operations.forEach(deactivate);
                    // adjust font-size
                    this.btn.output.adjustFontSizeByIncreasing();
                }
            },
            numbers: ({target}) => {
                this.btn.operations.forEach(deactivate);
                // when operation is set
                if (this.operation) {
                    const value = this.numberTwo + target.dataset.value;
                    if (isNaN(+value)) return;

                    this.numberTwo = value;
                    this.btn.output.innerText = value;
                } else {
                    const value = this.numberOne + target.dataset.value;
                    if (isNaN(+value)) return;

                    this.numberOne = value;
                    this.btn.output.innerText = value;
                }
                // render UI
                this.btn.output.adjustFontSizeByDecreasing();
            },
            operations: ({target}) => {
                // when operational symbol is set and clicking seconds time
                if (this.numberTwo) {
                    // trigger calculate
                    this.handler.calculate();
                }
                // set operation
                this.operation = target.dataset.value;
                this.btn.operations.forEach(deactivate);
                target.activate();
                // try to adjust by decreasing first and then vice versa
                this.btn.output.adjustFontSizeByDecreasing();
                this.btn.output.adjustFontSizeByIncreasing();
            }
        }
    }
}
