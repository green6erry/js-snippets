let makeConfetti = () => {
    let { height } = document.body.getBoundingClientRect();

    const particleQty = 120;
    let random = (max) => {
        return Math.floor(Math.random() * max);
    }

    for (let i = 0; i < particleQty; i++) {
        let particle = document.createElement('div');
        let maxWidth = window.innerWidth;
        particle.classList.add('confetti');
        particle.style.marginLeft = `${random(maxWidth)}px`;
        particle.style.animationDelay = `${random(60) / 10}s`;
      particle.style.animationDuration = `${(random(60) / 10)+8}s`;
        particle.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
        document.body.insertBefore(particle, document.body.childNodes[0]);

    }

    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    let rules = document.createTextNode('@-webkit-keyframes confetti {' +
        'from { top:0; }' +
        'to { top:' + height + 'px; }' +
        '}');
    cssAnimation.appendChild(rules);
    
    let confettiStyle = document.createTextNode(`.confetti {
  width: 10px;
  height: 10px;
  margin-top: -10px;
  top: 0;
  border-radius: 30px;
  position: absolute;
  animation: confetti 10s;
  -webkit-animation: confetti 10s;
  animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
}`);
    cssAnimation.appendChild(confettiStyle);
    
    document.head.appendChild(cssAnimation);
}

console.log('started outside any fx');

function ready(fn) {
    if (document.readyState != 'loading') {
    console.log('started inside ready');
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(makeConfetti);
// makeConfetti();
let createHTML = (cb) => {
  let confettiControls = document.createElement('div');
  confettiControls.setAttribute('id', 'confetti-controls');
  confettiControls.innerHTML = `<div class="col-md-4 right">
  <div class="holder">
    <div id="Activator" class="icon-three Center">
      <i class="fa fa-list fa-2x"></i>
    </div>
    <div id="addDots" class="icon-three Center">
      <i class="fa fa-plus fa-2x"></i>
    </div>
    <div id="minusDots" class="icon-three Center">
      <i class="fa fa-minus fa-2x"></i>
    </div>
    <div id="stopDots" class="icon-three Center">
      <i class="fa fa-stop fa-2x"></i>
    </div>
  </div>
</div>`;
  document.body.appendChild(confettiControls);
  cb()
  
}

let addStyleAnimation= () => {
  var opaque = false;
  var activated = false;
  $('#confetti-controls #Activator').click(function() {
    $(this).children().toggleClass('fa-list');
    $(this).children().toggleClass('fa-close');
    if (activated) {
      $('#confetti-controls #addDots').removeClass('Left').addClass('Center');
      $('#confetti-controls #minusDots').removeClass('Right').addClass('Center');
      $('#confetti-controls #stopDots').removeClass('Top').addClass('Center');
      $('#confetti-controls #Bottom').removeClass('Bottom').addClass('Center');
    } else {
      $('#confetti-controls #addDots').removeClass('Center').addClass('Left');
      $('#confetti-controls #minusDots').removeClass('Center').addClass('Right');
      $('#confetti-controls #stopDots').removeClass('Center').addClass('Top');
      $('#confetti-controls #Bottom').removeClass('Center').addClass('Bottom');
    }
    activated = !activated;
  }); 
}

let callAfter = (fx, cb) => {
  fx(cb);
}

callAfter(createHTML, addStyleAnimation);
