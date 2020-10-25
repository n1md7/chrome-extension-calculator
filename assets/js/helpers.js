Array.prototype.attachEventListeners = function (callback, type = 'click') {
    this.forEach(element => element.addEventListener(type, callback));
};

Element.prototype.attachEventListener = function (callback, type = 'click') {
    this.addEventListener(type, callback);
};

Array.prototype.extractDOM = function () {
    const list = this.map(([variable, selector]) => [
        variable,
        document.querySelector(selector)
    ]);

    return {
        ...Object.fromEntries(list),
        numbers: list.slice(0, 10).map(([, val]) => val),
        operations: list.slice(10, 14).map(([, val]) => val)
    };
}

String.prototype.pixelSize = function (fontSize = 20, fontName = 'monospace') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSpec = `${fontSize}px ${fontName}`;
    if (ctx.font !== fontSpec) {
        ctx.font = fontSpec;
    }

    return ctx.measureText(this).width;
};

Element.prototype.adjustFontSizeByDecreasing = function () {
    const {width, fontSize} = this.dataset;
    // if(+fontSize < 10) return;
    const fontInPixels = this.innerText.pixelSize(fontSize);
    const reducedWidth = width * 0.9;
    if (fontInPixels > reducedWidth) {
        const reducedFontSize = +fontSize - 1;
        this.setAttribute('data-font-size', reducedFontSize);
        this.style.fontSize = `${reducedFontSize}px`;
        // call again recursively
        this.adjustFontSizeByDecreasing();
    }
};

Element.prototype.adjustFontSizeByIncreasing = function () {
    const {width, fontSize} = this.dataset;
    if (+fontSize >= 34) return;
    const increasedFontSize = +fontSize + 1;
    const fontInPixels = this.innerText.pixelSize(increasedFontSize);
    const reducedWidth = width * 0.8;
    if (fontInPixels > reducedWidth) return;
    this.setAttribute('data-font-size', increasedFontSize);
    this.style.fontSize = `${increasedFontSize}px`;
    // call again recursively
    this.adjustFontSizeByIncreasing();

};

Element.prototype.disable = function () {
    this.setAttribute('disabled', '');
};
Element.prototype.enable = function () {
    this.removeAttribute('disabled');
};

function disable(element) {
    element.disable();
}

function enable(element) {
    element.enable();
}

Array.prototype.alterLast = function (value = 0) {
    if (this.length) {
        this[this.length - 1] += `${value}`;
    } else {
        this[0] = value;
    }

    return this;
};

Array.prototype.alterLastRemoveLetter = function () {
    if (this.length) {
        if (this[this.length - 1].length === 1) {
            this.pop();
            return this;
        }
        this[this.length - 1] = this[this.length - 1].substr(0, this[this.length - 1].length - 1);
    } else {
        this[0] = this[0].substr(0, this[0].length - 1);
    }

    return this;
};

Array.prototype.operationIsSet = function () {
    return this.some(stack => OPERATION_VALUES.includes(stack));
};

Array.prototype.lastIsOperation = function () {
    let last = null;
    if (this.length) {
        last = this[this.length - 1];
    }
    if (!last) return false;
    return OPERATION_VALUES.includes(last);
};

function round(num, decimal = 5) {
    return +(Math.round(num + `e+${decimal}`) + `e-${decimal}`);
}
