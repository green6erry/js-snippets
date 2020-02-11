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
    var rules = document.createTextNode('@-webkit-keyframes confetti {' +
        'from { top:0; }' +
        'to { top:' + height + 'px; }' +
        '}');
    cssAnimation.appendChild(rules);
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
makeConfetti();
