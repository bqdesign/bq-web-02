function openTab(element) {
    console.log(element.value);
    const id = `${element.value}-tab`;
    const el = document.getElementById(id);
    console.log(el.click());
}
function syncChange(element, sync) {
    const id = `${element.value}-tab`;
    const syn = document.getElementById(sync);
    const el = document.getElementById(id);
    const value = element.getAttribute('data-bs-target').replace('#', "");
    console.log(value);
    syn.value = value;
    // console.log(el.click());
}

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

/*function initflexsliders(){
  const ww = $(window).width();
  if(ww < 768) {
    $('.flex-slider-sm').flexslider({
      animation: "slide",
      directionNav: false
    });
  }
}*/

/*const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

function reportWindowSize() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
}

window.onresize = reportWindowSize;*/


/*window.addEventListener('load', function() { 
    $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
      window.onresize = reportWindowSize;
    });
}, false);*/

