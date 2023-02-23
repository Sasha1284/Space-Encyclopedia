function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
  
    /* Создать увеличительное стекло: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Вставить увеличительное стекло: */
    img.parentElement.insertBefore(glass, img);
  
    /* Установите свойства фона для стекла лупы: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Выполните функцию, когда кто-то перемещает лупу по изображению: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /* а также для сенсорных экранов: */
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Предотвратите любые другие действия, которые могут возникнуть при перемещении по изображению */
      e.preventDefault();
      /* Получить позиции курсора x и y: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Не допускайте, чтобы лупа находилась вне изображения: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Установите положение стекла лупы: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Покажите, что такое увеличительное стекло "смотреть": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Получить x и y позиции изображения: */
      a = img.getBoundingClientRect();
      /* Вычислите координаты курсора x и y относительно изображения: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }