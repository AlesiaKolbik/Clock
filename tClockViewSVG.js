

export class TClockViewSVG {
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
            this.element.setAttribute('style', 'display: inline-block; width:300px;margin:100px;');
            this.host.appendChild(this.element);
            this.element.appendChild(this.btnStart);
            this.element.appendChild(this.btnStop);
            this.element.appendChild(this.span);
            this.span.innerHTML = this.text;

            function getNode(n, v) {
                n = document.createElementNS("http://www.w3.org/2000/svg", n);
                for (let p in v)
                    n.setAttributeNS(null, p.replace(/[A-Z]/g, function (m, p, o, s) {
                        return "-" + m.toLowerCase();
                    }), v[p]);
                return n
            }

            this.clock = getNode('svg', {width: 300, height: 300});
            const clockFace = getNode('circle', {cx: 150, cy: 150, r: 150, fill: '#ffce3d'});
            this.element.appendChild(this.clock);
            this.clock.appendChild(clockFace);
            const centerClockX = 150;
            const centerClockY = 150;
            let radiusCircles = 120;   //радиус расположения кружков
            let textIntoCircle = 0;
            for (let h = 0; h < 12; h++) {
                let centerCircleX = centerClockX - radiusCircles * Math.cos(h * 30 * (Math.PI / 180) + Math.PI / 2);
                let centerCircleY = centerClockY - radiusCircles * Math.sin(h * 30 * (Math.PI / 180) + Math.PI / 2);
                this.circle = getNode('circle', {cx: centerCircleX, cy: centerCircleY, r: 22, fill: '#53b987'});
                this.clock.appendChild(this.circle);
                this.numberCircle = getNode('text', {x: centerCircleX - 6, y: centerCircleY + 9, fill: '#000000'});
                if (h === 0) {
                    this.numberCircle.textContent = '' + 12;
                    textIntoCircle++;
                }
                else {
                    this.numberCircle.textContent = '' + textIntoCircle;
                    this.numberCircle.style.fontSize = "20px";
                    textIntoCircle++;
                }

                this.clock.appendChild(this.numberCircle);
            }

            this.hourArrow = getNode('rect', {x: 145, y: 70, width: 10, rx: 5, ry: 5, height: 80, fill: '#000000'});
            this.minArrow = getNode('rect', {x: 146, y: 5, width: 8, rx: 5, ry: 5, height: 145, fill: '#000000'});
            this.secArrow = getNode('rect', {x: 148, y: 5, width: 4, rx: 5, ry: 5, height: 145, fill: '#000000'});
            this.clock.appendChild(this.hourArrow);
            this.clock.appendChild(this.minArrow);
            this.clock.appendChild(this.secArrow);
        }
        if (this.model) {
            let sec = this.model.seconds * 6;
            let min = this.model.minutes * 6;
            let hours = this.model.hour * 30;

            this.secArrow.setAttribute('transform', 'rotate(' + sec + ' 150 150 )');

            this.minArrow.setAttribute('transform', 'rotate(' + min + ' 150 150 )');

            this.hourArrow.setAttribute('transform', 'rotate(' + hours + ' 150 150 )');
        }
    }

    onClicked(isClicked) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(isClicked);
        }
    }

}
