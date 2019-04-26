window.onload = function() {

  let flag = false, transFlag = false,
      colorCurrent = getComputedStyle(document.querySelector(".tools__list__color-1")).backgroundColor,
      colorPrev = getComputedStyle(document.querySelector(".tools__list__color-2")).backgroundColor;

  let colour = {
    "current" : colorCurrent,
    "prev" : colorPrev
  }
  
  let picker = document.getElementById("Picker");
  let bucket = document.getElementById("Bucket");
  let canva = document.querySelector(".canvas__wrapper");
  let transform = document.getElementById("Transform");

  picker.addEventListener('click', () => {
    document.body.style.cssText = "cursor: help";
    pallete__colors.style.display = "block"; 
  });

  bucket.addEventListener('click', () => {
    document.body.style.cssText = "cursor: crosshair";
  });

  transform.addEventListener('click', () => {
    transFlag = true;
    document.body.style.cssText = "cursor: pointer";
  });

  canva.addEventListener('click', (event) => {
    let target = event.target;
    console.log(target);
    console.log(target.tagName);
      
    while (target != this) {
      if (target.tagName == 'DIV') {
        if(transFlag) {
          changeShape(target);
          transFlag = false;
          return;
        }
        highlight(target);
        return;
      }
      target = target.parentNode;
    }
  })


  function highlight(node) {
    node.style.backgroundColor = colorCurrent;
  }

  function changeShape(node) {
    node.style.borderRadius = "50%";
  }

  function Colors(elem) {
    this.red = function(target) {      
      changeColor(target);       
    };

    this.blue = function(target) {      
      changeColor(target);         
    };

    this.grey = function(target) {      
      changeColor(target);   
    };

    this.green = function(target) {      
      changeColor(target);            
    }

    let self = this;

    elem.addEventListener('click', (e) => {
      let target = e.target;  
      let action = target.getAttribute('data-action');
      if(action) {
        self[action](target);
      }
    });
  }

  new Colors(pallete__colors);

  function changeColor(elem) {
    let tmp = colorCurrent;   
       
    document.querySelector(".tools__list__color-1").style.backgroundColor = getComputedStyle(elem).backgroundColor;
    colorCurrent = getComputedStyle(document.querySelector(".tools__list__color-1")).backgroundColor;
    document.querySelector(".tools__list__color-2").style.backgroundColor = tmp; 
  }
  
}


