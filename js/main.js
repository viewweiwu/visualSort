((window, Bubble, Util, Squre) => {
    class Ctrl {
        constructor() {
            let arr = [22, 15, 35, 23, 1, 6, 5, 48, 10];
            let bubble = new Bubble(arr);
            this.squresPnlEl = document.querySelector("#squres");
            this.bubble = bubble;
            this.squres = this._createSqures();
            this._renderSqures();
            this._initStyle();
            this.loop(0);
            console.log("排序前：", bubble.arr);
            console.log("排序后：", bubble.sortedArr);
            console.log("快照：", bubble.snaps);
            console.log("柱子：", this.squres);
        }
        _createSqures() {
            return this.bubble.arr.map(obj => {
                let height = obj * 10;
                return new Squre(height, obj, obj > 5 ? false : true);
            });
        }
        _renderSqures() {
            let html = "";
            let el;
            this.squres.forEach(obj => html += obj.dom);
            this.squresPnlEl.innerHTML = html;
            el = this.squresPnlEl.querySelectorAll(".squre");
            this.squres.forEach((obj, i) => obj.el = el[i]);
        }
        _initStyle() {
            let totalWidth = 0;
            this.squres.forEach((obj, i) => {
                obj.setPosition(10 + totalWidth);
                totalWidth += parseInt(obj.width) + 20;
            });
            this.squresPnlEl.style.width = totalWidth + "px";
        }
        loop(index) {
            if (index <= this.bubble.snaps.length - 1) {
                let obj = this.bubble.snaps[index];
                index += 1;
                this.draw(obj);
                setTimeout(() => {
                    this.loop(index)
                }, 100);
            } else {
                return;
            }
        }
        draw(obj) {
            let arr = obj.arr;
            let curr = this.squres[obj.curr];
            let next = this.squres[obj.next];
            if (this.oldCurr) {
                this.oldCurr.setDefaultColor();
            }
            if (this.oldNext) {
                this.oldNext.setDefaultColor();
            }
            curr.setColor("#6cf");
            next.setColor("#6cf");
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
                this.squres[obj.curr].setColor("#f60");
                this.oldCurr = "";
                this.oldNext = "";
            } else {
                this.oldCurr = curr;
                this.oldNext = next;
            }
        }
    }
    new Ctrl();
})(window, Bubble, Util, Squre);