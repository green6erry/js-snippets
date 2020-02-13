let particles = [];
let particleIncrement = 20;
let particleQty = localStorage.getItem('particleQty') != null ? localStorage.getItem('particleQty') : 100; 

let makeConfetti = () => {
    let {
        height
    } = document.body.getBoundingClientRect();

    // const particleQty = 60;
    let random = (max) => {
        return Math.floor(Math.random() * max);
    }
console.log(particleQty + ' particles');


    for (let i = 0; i < particleQty; i++) {
        let particle = document.createElement('div');
        let maxWidth = window.innerWidth;
        particle.classList.add('confetti');
        particle.style.marginLeft = `${random(maxWidth)}px`;
        particle.style.animationDelay = `${random(60) / 10}s`;
        particle.style.animationDuration = `${(random(60) / 10)+8}s`;
        particle.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
        document.body.insertBefore(particle, document.body.children[0]);
        particles.push(particle);

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
      <i class="fa fa-list "></i>
    </div>
    <div id="addDots" class="icon-three Center">
      <i class="fa fa-plus "></i>
    </div>
    <div id="minusDots" class="icon-three Center">
      <i class="fa fa-minus "></i>
    </div>
    <div id="stopDots" class="icon-three Center">
      <i class="fa fa-stop "></i>
    </div>
  </div>
</div>`;
    let check = document && console.log(document.body)
    try {
        document.body.insertBefore(confettiControls, document.body.children[0]);
//         document.body.appendChild(confettiControls);
    } catch (err) {
        console.log("couldn't append controls");
    }
    cb();

}


let addStyleAnimation = () => {
    let opaque = false;
    let activated = false;
    let toggleBtn = document.getElementById('Activator');
    let toggleText = toggleBtn && toggleBtn.children[0];
    let addDots = document.getElementById('addDots');
    let minusDots = document.getElementById('minusDots');
    let stopDots = document.getElementById('stopDots');

let increaseConfetti = () => {
    particleQty = parseInt(particleQty) + 20;
    localStorage.setItem('particleQty', particleQty);
    console.log(particleQty);
    makeConfetti();
}
    let reduceConfetti = () => {

        let particlesToRemove = particles.length >= 40 ? particles.splice(0, 20) : null;

        
        let removeParticles = particlesToRemove && particlesToRemove.map(p => {
            return document.body.removeChild(p);
        });
        particleQty -= removeParticles.length != null && removeParticles.length || 0;
        console.log(particleQty);
        localStorage.setItem('particleQty', particleQty);
    }
    let stopConfetti = () => {
        particles.length > 0 && particles.forEach(p => {
            document.body.removeChild(p);
        });
        particles = [];
        particleQty = 0;
        console.log(particleQty);
        localStorage.setItem('particleQty', 0);
    }
    const buttons = [{
        el: addDots,
        direction: 'Left',
        cb: increaseConfetti
    }, {
        el: minusDots,
        direction: 'Right',
        cb: reduceConfetti
    }, {
        el: stopDots,
        direction: 'Top',
        cb: stopConfetti
    }];



    const toggleOpen = () => {

        const toggleBtnClasses = () => {
            const closed = toggleText.classList.contains('fa-list');
            toggleText.classList.toggle( 'fa-list');
            toggleText.classList.toggle( 'fa-close');
            buttons.forEach(btn => {
                (function() {
                    this.el.classList.toggle(this.direction);
                }).call(btn);
            });

            activated = !activated;
        }


        toggleBtnClasses();
    }

    toggleBtn.addEventListener('click', toggleOpen);
    buttons.forEach(btn => {
        (function() {
            this.el.addEventListener('click', this.cb)
        }).call(btn);
    });
}

let callAfter = (fx, cb) => {
    fx(cb);
}

ready(callAfter(createHTML, addStyleAnimation));
