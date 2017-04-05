((window, Util, Squre) => {
    const util = new Util();
    class Sort {
        constructor(arr, el, selectedColor = "#6cf", doneColor = "#f60") {
            this.arr = arr;
            this.sortedArr = arr.concat(); // 拷贝数组
            this.snaps = this._getSnaps(); // 创建快照
            this.squres = this._createSqures(); // 在页面上创建方块 
            this.containerEl = el; // 父容器
            this.selectedColor = selectedColor; // 被选中时的颜色
            this.doneColor = doneColor; // 完成后的颜色
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
        _createSnap(curr, next, arr, isSwap = false, isDone = false) {
            return {
                curr,
                next,
                arr,
                isSwap,
                isDone
            }
        }
        loop(index = 0) {
            if (index <= this.snaps.length - 1) {
                let obj = this.snaps[index];
                index += 1;
                this.draw(obj);
                this.timer = setTimeout(() => this.loop(index), 100);
            } else {
                return;
            }
        }
        stop() {
            clearTimeout(this.timer);
        }
        continue () {
            this.loop(this.index);
        }
        draw(obj) {
            let arr = obj.arr;
            let curr = this.squres[obj.curr]; // 获取当前的 target 方块
            let next = this.squres[obj.next]; // 获取下一个的 target 方块

            // 重置上一步渲染完的方块
            if (this.oldCurr) {
                this.oldCurr.setDefaultColor();
            }
            if (this.oldNext) {
                this.oldNext.setDefaultColor();
            }

            // 给当前的的两个 target 加上 
            curr.setColor(this.selectedColor);
            next.setColor(this.selectedColor);
            if (obj.isSwap) {
                let p = curr.getPosition();
                let el = curr.el;
                curr.setPosition(next.getPosition()[0]);
                next.setPosition(p[0]);
                curr.el = next.el;
                next.el = el;
                this.oldCurr = curr;
                this.oldNext = next;
            } else if (obj.isDone) {
                this.squres[obj.curr].setColor(this.doneColor);
                this.oldCurr = "";
                this.oldNext = "";
            } else {
                this.oldCurr = curr;
                this.oldNext = next;
            }
        }
    }

    window.Sort = Sort;
})(window, Util, Squre);