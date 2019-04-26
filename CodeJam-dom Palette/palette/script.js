window.onload = function () {
  let transFlag = false;

  let colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;

  const colorPrev = getComputedStyle(document.querySelector('.tools__list__color-2')).backgroundColor;

  const picker = document.getElementById('Picker');
  const bucket = document.getElementById('Bucket');
  const canva = document.querySelector('.canvas__wrapper');
  const transform = document.getElementById('Transform');
  const move = document.getElementById('Move');

  picker.addEventListener('click', () => {
    document.body.style.cssText = 'cursor: help';
    pallete__colors.style.opacity = 1;
  });

  bucket.addEventListener('click', () => {
    document.body.style.cssText = 'cursor: crosshair';
    pallete__colors.style.display = 'block'; 
  });

  transform.addEventListener('click', () => {
    transFlag = true;
    document.body.style.cssText = 'cursor: pointer'
  });

  move.addEventListener('click', () => {
    document.body.style.cssText = 'cursor: move';
    moveFlag = true;
  });


  canva.addEventListener('click', (event) => {
    let target = event.target;    

    while (target != this) {
      if (target.tagName == 'DIV') {
       
        target.ondragstart = function() {
          return false;
        };
        
        function getCoords(elem) {   // кроме IE8-
          var box = elem.getBoundingClientRect();
          return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
          };
        }

        if (transFlag) {
          changeShape(target);
          transFlag = false;
          return;
        }
        highlight(target);
        return;
      }
      target = target.parentNode;
    }
  });


  function highlight(node) {
    node.style.backgroundColor = colorCurrent;
  }

  function changeShape(node) {
    node.style.borderRadius = '50%';
  }



  function Colors(elem) {
    this.red = function (target) {
      changeColor(target);
    };

    this.blue = function (target) {
      changeColor(target);
    };

    this.grey = function (target) {
      changeColor(target);
    };

    this.green = function (target) {
      changeColor(target);
    };

    const self = this;

    elem.addEventListener('click', (e) => {
      const target = e.target;
      const action = target.getAttribute('data-action');
      if (action) {
        self[action](target);
      }
    });
  }
  
  function changeColor(elem) {
    const tmp = colorCurrent;

    if(colorCurrent === getComputedStyle(elem).backgroundColor) return;

    document.querySelector('.tools__list__color-1').style.backgroundColor = getComputedStyle(elem).backgroundColor;
    colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
    document.querySelector('.tools__list__color-2').style.backgroundColor = tmp;
  }

  new Colors(pallete__colors);
};
