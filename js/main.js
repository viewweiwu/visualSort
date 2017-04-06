((window, Bubble, Select) => {
    class Ctrl {
        constructor() {
            this.squresPnlEl = document.querySelector("#squres");
            this.arr = [22, 15, 35, 23, 1, 6, 5, 48, 10];
            this.createSort("bubble");
            this.bind();
        }
        bind() {
            tabs.onclick = this.onTabsClick.bind(this);
            stopBtn.onclick = this.stopSort.bind(this);
            continueBtn.onclick = this.continueSort.bind(this);
            restore.onclick = this.restoreSort.bind(this);
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
        stopSort() {
            this.currSortMode.stopSort();
        }
        continueSort() {
            this.currSortMode.continueSort();
        }
        restoreSort() {
            this.currSortMode.restoreSort();
        }
        createSort(type) {
            if (type === "bubble") {
                this.bubble = new Bubble({
                    arr: this.arr,
                    el: this.squresPnlEl
                });
                this.currSortMode = this.bubble;
            } else {
                this.select = new Select({
                    arr: this.arr,
                    el: this.squresPnlEl
                });
                this.currSortMode = this.select;
            }
        }
    }
    new Ctrl();
})(window, Bubble, Select);