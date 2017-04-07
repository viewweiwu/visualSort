((window, Bubble, Select, Insert) => {
    class Ctrl {
        constructor() {
            this.squresPnlEl = document.querySelector("#squres");
            this.arr = [22, 15, 35, 23, 1, 6, 5, 48, 10];
            this.createSort("insert");
            this.bind();
        }
        bind() {
            tabs.onclick = this.onTabsClick.bind(this);
            stopBtn.onclick = this.stopSort.bind(this);
            continueBtn.onclick = this.continueSort.bind(this);
            restore.onclick = this.resetSort.bind(this);
            prev.onclick = this.onPrevBtnClick.bind(this);
            next.onclick = this.onNextBtnClick.bind(this);
        }
        onTabsClick(e) {
            let target = e.target;
            let siblings = target.parentNode.children;
            [...siblings].forEach(obj => {
                if (obj === target) {
                    let dataSort = target.getAttribute("data-sort");
                    obj.classList.add("active");
                    this.createSort(dataSort);
                } else {
                    obj.classList.remove("active")
                }
            });
        }
        onPrevBtnClick() {
            this.currSortMode.prev();
        }
        onNextBtnClick() {
            this.currSortMode.next();
        }
        stopSort() {
            this.currSortMode.stopSort();
        }
        continueSort() {
            this.currSortMode.continueSort();
        }
        resetSort() {
            this.currSortMode.resetSort();
        }
        createSort(type) {
            if (type === "bubble") {
                this.bubble = new Bubble({
                    arr: this.arr,
                    el: this.squresPnlEl
                });
                this.currSortMode = this.bubble;
            } else if (type === "select") {
                this.select = new Select({
                    arr: this.arr,
                    el: this.squresPnlEl
                });
                this.currSortMode = this.select;
            } else if (type === "insert") {
                this.insert = new Insert({
                    arr: this.arr,
                    el: this.squresPnlEl
                });
                this.currSortMode = this.insert;
            }
        }
    }
    new Ctrl();
})(window, Bubble, Select, Insert);