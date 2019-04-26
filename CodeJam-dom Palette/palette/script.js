window.onload = function () {

    let canvas = document.querySelector(".canvas__wrapper");
    let picker = document.querySelector(".pallete__colors");
    let key = null;
    let colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
    let e = null;

    canvas.addEventListener('click', (event) => {
        let target = event.target;

        while (target != canvas) {
            if (target.tagName == "DIV") {
                switch (key) {
                    case 'transform':
                        transformElement(target);
                        break;
                    case 'picker':
                        changeColor(target);
                        break;
                    case 'bucket':
                        paintShape(target);
                        break;
                    case 'move':
                        moveShape(target);
                        break;
                }
            }
            target = target.parentNode;
        }
    });

    picker.addEventListener('click', (event) => {
        let target = event.target;

        while (target != picker) {
            if (target.tagName == "DIV") {
                changeColor(target);
                return;
            }
            target = target.parentNode;
        }
    });

    function Tools(elem) {
        this.bucket = function () {
            document.body.style.cssText = 'cursor: crosshair';
            key = 'bucket';
            picker.style.display = "none";
        };
        this.picker = function () {
            document.body.style.cssText = 'cursor: help';
            key = 'picker';
            picker.style.display = "block";
        };
        this.move = function () {
            document.body.style.cssText = 'cursor: move';
            key = 'move';
            picker.style.display = "none";
            e = elem;
        };
        this.transform = function () {
            document.body.style.cssText = 'cursor: pointer';
            key = 'transform';
            picker.style.display = "none";
        };

        var self = this;

        elem.onclick = function (event) {
            var target = event.target;
            var action = target.getAttribute('data-action');
            if (action) {
                self[action]();
            }
        };
    }

    new Tools(tools__list);


    function transformElement(node) {
        console.log(node.style.borderRadius);

        if (!node.style.borderRadius || node.style.borderRadius == "0%") {
            node.style.borderRadius = "50%";
        } else {
            node.style.borderRadius = "0%";
        }
    }

    function changeColor(node) {
        const tmp = colorCurrent;
        if (colorCurrent === getComputedStyle(node).backgroundColor) return;

        console.log(node.firstElementChild);


        document.querySelector('.tools__list__color-1').style.backgroundColor = getComputedStyle(node).backgroundColor;
        colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
        document.querySelector('.tools__list__color-2').style.backgroundColor = tmp;
    }

    function paintShape(node) {
        node.style.backgroundColor = colorCurrent;
    }

    function moveShape(node) {
        node.className = "item-move";
        moveAt(event);
        node.style.zIndex = 1000;

        function moveAt(e) {
            node.style.left = e.pageX - node.offsetWidth / 2 + 'px';
            node.style.top = e.pageY - node.offsetHeight / 2 + 'px';
        }


        canvas.addEventListener('mousemove', moveAt(e));
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', moveAt(e));
        });

        // canvas.onmousemove = function (e) {
        //     moveAt(e);
        // }

        // canvas.onmouseup = function () {
        //     canvas.onmousemove = null;
        //     node.onmouseup = null;
        // }
    }
};
