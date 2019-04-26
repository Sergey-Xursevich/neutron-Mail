window.onload = function () {

    let canvas = document.querySelector(".canvas__wrapper");
    let selectedTd;
    let key = null;

    canvas.addEventListener('click', (event) => {
        let target = event.target;

        while(target != canvas) {
            if(target.tagName == "DIV") {
                switch (key) {
                    case 'transform':
                        transformElement(target);
                        break;
                }
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
            alert('picker');
        };
        this.move = function () {
            alert('move');
        };
        this.transform = function () {
            document.body.style.cssText = 'cursor: pointer';
            key = 'transform';
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
};
