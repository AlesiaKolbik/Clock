export class TClockViewDOM {
    constructor(model, host, text) {
        this.model = model;
        this.element = null;
        this.host = host;
        this.text = text;
        this.btnStart = null;
        this.btnStop = null;
        this.onCheckedCallback = null;
        this.span = null;
        this.clock = null;
        this.hourArrow = null;
        this.minArrow = null;
        this.secArrow = null;
        this.circle = null;
    }
    render() {
        if (!this.element) {
            this.btnStart = document.createElement('input');
            this.btnStop = document.createElement('input');
            this.span = document.createElement('span');
            this.clock = document.createElement('div');
            this.hourArrow = document.createElement('div');
            this.minArrow = document.createElement('div');
            this.secArrow = document.createElement('div');
            this.clock.className = 'clock';
            this.hourArrow.className += 'arrow-hour';
            this.minArrow.className += 'arrow-min';
            this.secArrow.className += 'arrow-sec';
            this.btnStart.type = 'button';
            this.btnStop.type = 'button';
            this.btnStart.value = 'старт';
            this.btnStop.value = 'стоп';
            this.btnStart.style.margin = '5px';
            this.btnStop.style.margin = '5px';
            this.btnStart.style.padding = '0 10px';
            this.btnStop.style.padding = '0 10px';
            this.btnStart.addEventListener(
                'click',
                e => this.onClicked(true));
            this.btnStop.addEventListener(
                'click',
                e => this.onClicked(false));
            this.element = document.createElement('div');
            this.element.setAttribute('style', 'display: inline-block;width: calc((100vw - 200px) / 3);');
            this.host.appendChild(this.element);
            this.element.appendChild(this.btnStart);
            this.element.appendChild(this.btnStop);
            this.element.appendChild(this.span);
            this.element.appendChild(this.clock);
            this.clock.appendChild(this.hourArrow);
            this.clock.appendChild(this.minArrow);
            this.clock.appendChild(this.secArrow);
            let textIntoCircle = 0;
            for (let h = 0; h < 12; h++) {
                this.circle = document.createElement('div');
                let coordsClock = this.clock.getBoundingClientRect();
                const centerClockX = coordsClock.left + coordsClock.width / 2;
                const centerClockY = coordsClock.top + coordsClock.height / 2;
                this.clock.appendChild(this.circle);
                this.circle.className += 'circle';
                let radiusCircles = 120;   //радиус расположения кружков
                let centerCircleX = centerClockX - radiusCircles * Math.cos(h * 30 * (Math.PI / 180) + Math.PI / 2);
                let centerCircleY = centerClockY - radiusCircles * Math.sin(h * 30 * (Math.PI / 180) + Math.PI / 2);
                this.circle.style.top = centerCircleY - 15 - coordsClock.top + 'px';
                this.circle.style.left = centerCircleX - 15 - coordsClock.left + 'px';
                this.circle.textContent = textIntoCircle;
                this.span.innerHTML = this.text;
                textIntoCircle++;
                if (h === 0) {
                    this.circle.textContent = 12;
                }
            }
        }
        if (this.model) {
            let sec = this.model.seconds * 6;
            let min = this.model.minutes * 6;
            let hour = this.model.hour * 30 / 2;

            this.secArrow.style.transform = 'rotate(' + sec + 'deg)';

            this.minArrow.style.transform = 'rotate(' + min + 'deg)';

            this.hourArrow.style.transform = 'rotate(' + hour + 'deg)';
        }
    }
    onClicked(isClicked) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(isClicked);
        }
    }
}
