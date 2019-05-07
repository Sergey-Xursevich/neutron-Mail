window.onload = function () {
  let divCanvas = document.getElementsByClassName('item');
  const canvas = document.querySelector('.canvas__wrapper');
  const picker = document.querySelector('.pallete__colors');
  let colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
  const toolsList = document.getElementById('tools__list');
  let key = null;
  const keyboard = {
    move: 88,
    bucket: 81,
    color: 65,
    transform: 90,
    save: 83,
  };

  if (localStorage.getItem('myKey') !== null) {
    const desObj = JSON.parse(localStorage.getItem('myKey'));
    for (key in desObj) {
      if (desObj[key].indexOf('tmp-circle') !== -1) {
        divCanvas[key].classList.add('tmp-circle');
      } 
      if (desObj[key].indexOf('style=') !== -1) {
        const css = desObj[key].slice(desObj[key].indexOf('style=') + 7, -9);
        divCanvas[key].style.cssText = css;
        if (css.indexOf('top') !== -1) {
          divCanvas[key].classList.add('tmp');
        }
      }
    }
  }

  function changeColor(node) {
    const tmp = colorCurrent;
    if (colorCurrent === getComputedStyle(node).backgroundColor) return;

    document.querySelector('.tools__list__color-1').style.backgroundColor = getComputedStyle(node).backgroundColor;
    colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
    document.querySelector('.tools__list__color-2').style.backgroundColor = tmp;
  }

  function paintShape(node) {
    const element = node;
    element.style.backgroundColor = colorCurrent;
  }

  function addStyleObject() {
    const obj = {};

    divCanvas = document.getElementsByClassName('item');

    for (let i = 0; i < divCanvas.length; i += 1) {
      obj[i] = divCanvas[i].outerHTML;
    }
    const seralObj = JSON.stringify(obj);
    return seralObj;
  }

  function moveShape(node) {
    const element = node;
    element.className = 'item item-move';

    function moveAt(e) {
      const parametr = e;

      element.style.left = `${parametr.pageX - element.offsetWidth / 2}px`;
      element.style.top = `${parametr.pageY - element.offsetHeight / 2}px`;
    }
    moveAt(event);

    canvas.insertBefore(element, element);
    element.style.zIndex = 1000;

    canvas.onmousemove = function (e) {
      const parametr = e;

      moveAt(parametr);
    };

    element.onmouseup = function () {
      canvas.onmousemove = null;
      element.onmouseup = null;
    };
  }

  function transformElement(node) {
    const element = node;
    element.classList.toggle('tmp-circle');
  }

  canvas.addEventListener('click', event => {
    let { target, target: { tagName, parentNode } } = event;

    while (target !== canvas) {
      if (tagName === 'DIV') {
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
          default:
            return;
        }
      }
      target = parentNode;
    }
  });

  picker.addEventListener('click', event => {
    let { target, target: { tagName, parentNode } } = event;

    while (target !== picker) {
      if (tagName === 'DIV') {
        changeColor(target);
        return;
      }
      target = parentNode;
    }
  });

  function Tools(elem) {
    this.bucket = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: crosshair';
      key = 'bucket';
      picker.classList.remove('tmp-picker');
    };
    this.picker = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: copy';
      document.querySelector('.pallete__colors').style.cssText = 'cursor: copy';
      key = 'picker';
      picker.classList.add('tmp-picker');
    };
    this.move = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: move';
      key = 'move';
      picker.classList.remove('tmp-picker');
    };
    this.transform = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: nesw-resize';
      key = 'transform';
      picker.classList.remove('tmp-picker');
    };
    this.storage = function () {
      const res = confirm('Вы желаете сохранить результат?');
      if (res) {
        localStorage.setItem('myKey', addStyleObject());
      } else {
        localStorage.clear();
      }
    };

    const self = this;

    elem.addEventListener('click', event => {
      const target = event.target;
      const action = target.getAttribute('data-action');
      if (action) {
        self[action]();
      }
    });
  }

  new Tools(toolsList);
  document.addEventListener('keydown', e => {
    if (e.which === keyboard.color && e.altKey) {
      const tmp = new Tools(toolsList);
      tmp.picker();
    } else if (e.which === keyboard.transform && e.altKey) {
      const tmp = new Tools(toolsList);
      tmp.transform();
    } else if (e.which === keyboard.move && e.altKey) {
      const tmp = new Tools(toolsList);
      tmp.move();
    } else if (e.which === keyboard.save && e.altKey) {
      const tmp = new Tools(toolsList);
      tmp.storage();
    } else if (e.which === keyboard.bucket && e.altKey) {
      const tmp = new Tools(toolsList);
      tmp.bucket();
    }
  });
};
