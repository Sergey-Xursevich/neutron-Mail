window.onload = function() {

  let flag = false,
      colorCurrent = getComputedStyle(document.querySelector(".tools__list__color-1")).backgroundColor,
      colorPrev = getComputedStyle(document.querySelector(".tools__list__color-2")).backgroundColor;

  let colour = {
    "current" : colorCurrent,
    "prev" : colorPrev
  }
  
  let transform = document.querySelector("#Transform");
  let div = document.getElementsByClassName("item");
  let picker = document.getElementById("Picker");
  let colors = document.querySelector(".pallete__colors");  

  picker.addEventListener('click', () => {
    console.log("click");
    document.body.style.cssText = "cursor: help"
    flag = true;    
  })

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


