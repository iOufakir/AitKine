var scaling = 1.5;
//count
var currentSliderCount = 0;
var videoCount = document.querySelectorAll(".slide").length;
var showCount = 4;
var sliderCount;
var controlsWidth = 40;
var scollWidth = 0;

window.onload = init;
window.onresize = init;

function init() {
  // elements
  var sliderFrame = document.querySelector(".slider-frame");
  var sliderContainer = document.querySelector(".slider-container");
  var slides = document.querySelectorAll(".slide");

  //counts
  var scollWidth = 0;

  //sizes
  var windowWidth = window.innerWidth;
  var frameWidth = window.innerWidth - 80;
  if (windowWidth >= 0 && windowWidth <= 414) {
    showCount = 2;
    controlsWidth = 20;
  } else if (windowWidth >= 414 && windowWidth <= 768) {
    showCount = 3;
    controlsWidth = 30;
  } else {
    showCount = 4;
  }
  sliderCount = videoCount / showCount;

  var videoWidth = (windowWidth - controlsWidth * 2) / showCount;
  var videoHeight = Math.round(videoWidth);

  var videoWidthDiff = videoWidth * scaling - videoWidth;
  var videoHeightDiff = videoHeight * scaling - videoHeight;

  //set sizes
  sliderFrame.style.width = windowWidth + "px";
  sliderFrame.style.height = videoHeight * scaling + "px";

  //sliderFrame.css("top", (videoHeightDiff / 2));

  sliderContainer.style.height = videoHeight * scaling + "px";
  sliderContainer.style.width = videoWidth * videoCount + videoWidthDiff + "px";
  sliderContainer.style.top = videoHeightDiff / 2 + "px";
  sliderContainer.style.marginLeft = controlsWidth + "px";

  slides.forEach((slide) => {
    slide.style.height = videoHeight + "px";
    slide.style.width = videoWidth + "px";

    //hover effect
    slide.addEventListener("mouseover", function () {
      var targetElement = this;
      targetElement.style.width = videoWidth * scaling + "px";
      targetElement.style.height = videoHeight * scaling + "px";
      targetElement.style.top = -(videoHeightDiff / 2) + "px";
      if (
        indexInParent(targetElement) == 0 ||
        indexInParent(targetElement) % 4 == 0
      ) {
        // do nothing
      } else if (
        (indexInParent(targetElement) + 1) % 4 == 0 &&
        indexInParent(targetElement) != 0
      ) {
        targetElement.parentElement.style.marginLeft =
          -(videoWidthDiff - controlsWidth) + "px";
      } else {
        targetElement.parentElement.style.marginLeft =
          -(videoWidthDiff / 2) + "px";
      }
    });
    slide.addEventListener("mouseout", function () {
      this.style.width = videoWidth * 1 + "px";
      this.style.height = videoHeight * 1 + "px";
      this.style.top = 0;
      this.parentElement.style.marginLeft = controlsWidth + "px";
    });
  });
  // controls
  controls(frameWidth, scollWidth);
}

function indexInParent(node) {
  var children = node.parentNode.childNodes;
  var num = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i] == node) return num;
    if (children[i].nodeType == 1) num++;
  }
  return -1;
}

function animate(render, from, to, duration, timeFx) {
  let startTime = performance.now();
  requestAnimationFrame(function step(time) {
    let pTime = (time - startTime) / duration;
    if (pTime > 1) pTime = 1;
    render(from + (to - from) * timeFx(pTime));
    if (pTime < 1) {
      requestAnimationFrame(step);
    }
  });
}

function controls(frameWidth, scollWidth) {
  let prev = document.querySelector(".prev");
  let next = document.querySelector(".next");

  next.onclick = function (event) {
    event.preventDefault();
    next.style.pointerEvents = 'none';
    console.log(currentSliderCount);
    console.log(sliderCount);
    scollWidth = scollWidth + frameWidth;

    document.querySelector(".slider-container").style.left = -scollWidth + "px";

    let start = Date.now(); // remember start time
    let timer = setInterval(function () {
      // how much time passed from the start?
      let timePassed = Date.now() - start;

      if (timePassed >= 500) {
        clearInterval(timer); // finish the animation less than 1 seconds
        return;
      }

      if (Math.round(sliderCount) - 1 - currentSliderCount <= 1) {
        next.style.display = "none";
        prev.style.display = "block";
      } else if (currentSliderCount >= sliderCount - 1) {
        document.querySelector(".slider-container").style.left = 0;
        currentSliderCount = 0;
        scollWidth = 0;
      } else {
        prev.style.display = "block";
      }
      currentSliderCount++;
      next.style.pointerEvents = 'auto';
    }, 250);
  };

  prev.onclick = function (event) {
    event.preventDefault();
    prev.style.pointerEvents = 'none';
    console.log(scollWidth);
    scollWidth = scollWidth - frameWidth;

    document.querySelector(".slider-container").style.left = -scollWidth + "px";

    let start = Date.now(); // remember start time
    let timer = setInterval(function () {
      // how much time passed from the start?
      let timePassed = Date.now() - start;

      if (timePassed >= 500) {
        clearInterval(timer); // finish the animation less than 1 seconds
        return;
      }

      currentSliderCount--;
      if (currentSliderCount <= 0) {
        prev.style.display = "none";
        next.style.display = "block";
      } else if (currentSliderCount < sliderCount) {
        next.style.display = "block";
      }
      prev.style.pointerEvents = 'auto';
    }, 250);
  };
}
