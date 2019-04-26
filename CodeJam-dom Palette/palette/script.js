window.onload = function () {

    let canvas = document.querySelector(".canvas__wrapper");
    let picker = document.querySelector(".pallete__colors");
    let key = null;
    let colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;

    canvas.addEventListener('click', (event) => {
        let target = event.target;

        while(target != canvas) {
            if(target.tagName == "DIV") {
                switch (key) {
                    case 'transform':
                        transformElement(target);
                        break;
                    case 'picker':
                        changeColor(target);
                        break;
                }
            }
            target = target.parentNode;
        }
    });

    picker.addEventListener('click', (event) => {
        let target = event.target;

        while(target != picker) {
            if(target.tagName == "DIV") {
                changeColor(target);
                return;
            }
            target = target.parentNode;
        }
    });



    function transformElement(node) {
      alert("Click");
    }

    function Tools(elem) {
        this.bucket = function () {
            alert('bucket');
        };
        this.picker = function () {
            document.body.style.cssText = 'cursor: help';
            key = 'picker';
            picker.style.display = "block";
        };
        this.move = function () {
            alert('move');
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
        
        if(!node.style.borderRadius || node.style.borderRadius == "0%") {
            node.style.borderRadius = "50%";
        } else {
            node.style.borderRadius = "0%";
        }
    }

    function changeColor(node) {
        const tmp = colorCurrent;
        if(colorCurrent === getComputedStyle(node).backgroundColor) return;
        
        console.log(node.firstElementChild);
        

        document.querySelector('.tools__list__color-1').style.backgroundColor = getComputedStyle(node).backgroundColor;
        colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
        document.querySelector('.tools__list__color-2').style.backgroundColor = tmp;
    }
};
