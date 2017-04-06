((window, Util, Squre) => {
    const util = new Util();
    class Sort {
        constructor(opts) {
            this.arr = opts.arr;
            this.sortedArr = [...opts.arr]; // 拷贝数组
            this.snaps = this._getSnaps(); // 创建快照
            this.squres = this._createSqures(); // 在页面上创建方块 
            this.containerEl = opts.el; // 父容器
            this.color1 = opts.color1 || "pink";
            this.color2 = opts.color2 || "yellowgreen";
            this.color3 = opts.color3 || "orange";
            this._renderSqures();
            this._initStyle();
        }
        _createSqures() {
            return this.arr.map(obj => {
                let height = obj * 10;
                return new Squre(height, obj, obj > 5 ? false : true);
            });
        }
        _renderSqures() {
            let html = "";
            let el;
            this.squres.forEach(obj => html += obj.dom);
            this.containerEl.innerHTML = html;
            el = this.containerEl.querySelectorAll(".squre");
            this.squres.forEach((obj, i) => obj.el = el[i]);
        }
        _initStyle() {
            let totalWidth = 0;
            this.squres.forEach((obj, i) => {
                obj.setPosition(10 + totalWidth);
                totalWidth += parseInt(obj.width) + 20;
            });
            this.containerEl.style.width = totalWidth + "px";
        }
        _getSnaps() {
            // 由子类实现
        }
        _createSnap(mode, curr, next) {
            return {
                mode,
                curr,
                next
            }
        }
        draw(obj) {
            // 由子类实现
        }
        loop(index = 0) {
            if (index <= this.snaps.length - 1) {
                let obj = this.snaps[index];
                index += 1;
                this.index = index;
                this.draw(obj);
                this.timer = setTimeout(() => this.loop(index), 500);
            } else {
                return;
            }
        }
        stopSort() {
            this.timer && clearTimeout(this.timer);
        }
        continueSort() {
            this.stopSort();
            this.loop(this.index);
        }
        restoreSort() {
            this.index = 0;
            this.stopSort();
            this._renderSqures();
            this._initStyle();
        }
    }

    window.Sort = Sort;
})(window, Util, Squre);