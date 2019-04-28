window.onload = function () {
  let divCanvas = document.getElementsByClassName('item');
  const canvas = document.querySelector('.canvas__wrapper');
  const picker = document.querySelector('.pallete__colors');
  let key = null;
  let colorCurrent = getComputedStyle(document.querySelector('.tools__list__color-1')).backgroundColor;
  let e = null;

  if (localStorage.getItem('myKey') !== null) {
    const desObj = JSON.parse(localStorage.getItem('myKey'));
    console.log(desObj);
    for (key in desObj) {
      if (desObj[key].indexOf('style=') != -1) {
        const css = desObj[key].slice(desObj[key].indexOf('style=') + 7, -9);
        divCanvas[key].style.cssText = css;
        if (css.indexOf('top') != -1) {
          divCanvas[key].style.position = 'absolute';
        }
      }
    }
  }

  canvas.addEventListener('click', (event) => {
    let target = event.target;

    while (target != canvas) {
      if (target.tagName == 'DIV') {
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
      if (target.tagName == 'DIV') {
        changeColor(target);
        return;
      }
      target = target.parentNode;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.which === 65 && e.altKey) {
      const tmp = new Tools(tools__list);
      tmp.picker();
    } else if (e.which === 90 && e.altKey) {
      const tmp = new Tools(tools__list);
      tmp.transform();
    } else if (e.which === 88 && e.altKey) {
      const tmp = new Tools(tools__list);
      tmp.move();
    } else if (e.which === 83 && e.altKey) {
      const tmp = new Tools(tools__list);
      tmp.storage();
    } else if (e.which === 81 && e.altKey) {
      const tmp = new Tools(tools__list);
      tmp.bucket();
    }
  });

  function Tools(elem) {
    this.bucket = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: crosshair';
      key = 'bucket';
      picker.style.display = 'none';
    };
    this.picker = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: copy';
      document.querySelector('.pallete__colors').style.cssText = 'cursor: copy';
      key = 'picker';
      picker.style.display = 'block';
    };
    this.move = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: move';
      key = 'move';
      picker.style.display = 'none';
      e = elem;
      checkMove = true;
    };
    this.transform = function () {
      document.querySelector('.pallete__canvas').style.cssText = 'cursor: nesw-resize';
      key = 'transform';
      picker.style.display = 'none';
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

    elem.onclick = function (event) {
      const target = event.target;
      const action = target.getAttribute('data-action');
      if (action) {
        self[action]();
      }
    };
  }

  new Tools(tools__list);

  function transformElement(node) {
    console.log(node.style.borderRadius);

    if (!node.style.borderRadius || node.style.borderRadius == '0%') {
      node.style.borderRadius = '50%';
    } else {
      node.style.borderRadius = '0%';
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

  function addStyleObject() {
    const obj = {};

    divCanvas = document.getElementsByClassName('item');
    const divCanvasMove = document.getElementsByClassName('item-move');

    for (let i = 0; i < divCanvas.length; i++) {
      obj[i] = divCanvas[i].outerHTML;
    }
    const seralObj = JSON.stringify(obj);
    return seralObj;
  }

  function moveShape(node) {
    node.className = 'item item-move';
    moveAt(event);

    canvas.insertBefore(node, node);
    console.log(node);


    node.style.zIndex = 1000;

    function moveAt(e) {
      node.style.left = `${e.pageX - node.offsetWidth / 2}px`;
      node.style.top = `${e.pageY - node.offsetHeight / 2}px`;
    }

    canvas.onmousemove = function (e) {
      moveAt(e);
    };

    node.onmouseup = function () {
      canvas.onmousemove = null;
      node.onmouseup = null;
    };
  }
};
