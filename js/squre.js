((window) => {
    class Squre {
        constructor(height = 0, value = 0, isTop = false, width = 50, color = 'transparent') {
            this.width = width;
            this.height = height;
            this.value = value;
            this.color = color;
            this.isTop = isTop;
            this.dom = this._createEl();
        }
        setColor(color) {
            this.el.style.background = color;
        }
        setDefaultColor() {
            this.el.style.background = this.color;
        }
        setPosition(left, bottom = 10) {
            this.el.style.left = left + "px";
            this.el.style.bottom = bottom + "px";
        }
        getPosition() {
            return [parseInt(this.el.style.left), parseInt(this.el.style.bottom)];
        }
        _createEl() {
            let dom = `
                <div class="squre" style="width: ${this.width}px; height: ${this.height}px; background: ${this.color}">
                    <div class="text  ${this.isTop ? 'top' : ''}">${this.value}</div>
                </div>
            `;
            return dom;
        }
    }
    window.Squre = Squre;
})(window);