((window, Util, Squre) => {
    const util = new Util();
    class Sort {
        constructor(type, opts) {
            this.arr = opts.arr;
            this.type = type;
            this.sortedArr = [...opts.arr]; // 拷贝数组
            this.squres = this._createSqures(); // 在页面上创建方块 
            this.snaps = []; // 创建快照
            this.containerEl = opts.el; // 父容器
            this.progressEl = opts.progressEl; // 进度条
            this.color1 = opts.color1 || "pink";
            this.color2 = opts.color2 || "orange";
            this.color3 = opts.color3 || "yellowgreen";
            this.index = 0;
            this.progressEl.oninput = this.onRangeChange.bind(this);
            this._getSnaps();
            this._renderSqures();
            this._initStyle();
            this._initProgress();
        }

        onRangeChange(e) {
            let target = e.target;
            this.goStep(parseInt(target.value));
        }

        // 创建 value 对应的方块
        _createSqures() {
            return this.arr.map((obj, i) => {
                let height = obj * 10;
                return new Squre(this.type + i, height, obj, obj > 4 ? false : true);
            });
        }

        // 渲染方块
        _renderSqures() {
            let html = "";
            let el;
            this.squres.forEach(obj => html += obj.dom);
            this.containerEl.innerHTML = html;
            el = this.containerEl.querySelectorAll(".squre");
            this.squres.forEach((obj, i) => obj.el = el[i]);
        }

        // 取得具体某个方块
        getSqure(value) {
            for (let i = 0; i < this.squres.length; i++) {
                if (this.squres[i].value === value) {
                    return this.squres[i]
                }
            }
        }

        // 初始化 方块样式 和 容器
        _initStyle() {
            let totalWidth = 0;
            this.squres.forEach((obj, i) => {
                obj.setPosition(10 + totalWidth);
                totalWidth += parseInt(obj.width) + 20;
            });
            this.containerEl.style.width = totalWidth + "px";
        }

        // 初始化进度条
        _initProgress() {
            this.progressEl.max = this.snaps.length - 1;
        }

        // 获取快照
        _getSnaps() {
            // 由子类实现
        }

        // 创建一张快照
        _createSnap(opts) {
            let result = [];
            let arr = [...opts.arr];

            arr.forEach((obj, i) => result.push(this.getSnapSettings(obj, i, opts.markArr, opts.doneArr, opts.mode, opts.curr, opts.next)));

            if (opts.mode === "swap") {
                let temp = arr[opts.curr];
                arr[opts.curr] = arr[opts.next];
                arr[opts.next] = temp;
            }

            return result;
        }

        _addSnap(opts) {
            this.snaps.push(this._createSnap(opts));
        }

        // 获取具体快照的设定
        getSnapSettings(obj, i, markArr, doneArr, mode, curr, next) {
            let temp = {
                left: 10 + i * 70,
                bottom: 10,
                value: obj,
                color: "default"
            }
            if (doneArr[i] === true) {
                temp.color = "done";
            }
            if (markArr && markArr[i] === true) {
                temp.color = "mark";
            }
            if (curr === i || next === i) {
                temp.color = mode;
            }
            return temp;
        }

        // 画 TMD
        draw(snap = []) {
            snap.forEach((obj, i) => {
                let targetSqure = this.getSqure(obj.value);

                targetSqure.setPosition(obj.left, obj.bottom);

                if (obj.color === "find")
                    targetSqure.setColor(this.color1);
                else if (obj.color === "swap")
                    targetSqure.setColor(this.color2);
                else if (obj.color === "mark")
                    targetSqure.setColor(this.color2);
                else if (obj.color === "done")
                    targetSqure.setColor(this.color3);
                else
                    targetSqure.setDefaultColor();

            });
        }

        // 自动播放
        loop(index = 0) {
            if (index <= this.snaps.length - 1) {
                let obj = this.snaps[index];
                index += 1;
                this.index = index;
                this.draw(obj);
                this.progressEl.value = this.index;
                this.timer = setTimeout(() => this.loop(index), 100);
            } else {
                return;
            }
        }

        // 渲染一张快照
        renderSnap() {
            this.draw(this.snaps[this.index]);
            this.progressEl.value = this.index;
            this.stopSort();
        }

        // 暂停自动播放
        stopSort() {
            this.timer && clearTimeout(this.timer);
        }

        // 继续自动播放帧
        continueSort() {
            this.stopSort();
            this.loop(this.index);
        }

        // 重置数组到第 0 帧
        resetSort() {
            this.goStep(0);
        }

        // 跳到对应帧
        goStep(index) {
            this.index = index;
            this.renderSnap();
        }

        // 上一帧
        prev() {
            this.index = this.index <= 0 ? 0 : this.index - 1;
            this.renderSnap();
        }

        // 下一帧
        next() {
            this.index = this.index >= this.snaps.length - 1 ? this.snaps.length - 1 : this.index + 1;
            this.renderSnap();
        }
    }

    window.Sort = Sort;
})(window, Util, Squre);