import {PubSubService} from "./pubSub.js";

export class TClockViewCanvas {
    constructor(model, host, text) {
        this.model = model;
        this.element = null;
        this.host = host;
        this.text = text;
        this.btnStart = null;
        this.btnStop = null;
        //this.onCheckedCallback = null;
        this.events = new PubSubService();
        this.span = null;
        this.clock = null;
        this.context = null;
        this.centerClockX = 0;
        this.centerClockY = 0;
        this.radiusClock = 0;
        this.radiusDrawCircles = 115;
        this.radiusCircles = 20;
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
            this.element = document.createElement('div');
            this.element.setAttribute('style', 'display: inline-block; width:300px;margin:100px;');
            this.host.appendChild(this.element);
            this.element.appendChild(this.btnStart);
            this.element.appendChild(this.btnStop);
            this.element.appendChild(this.span);
            this.span.innerHTML = this.text;
            this.btnStart.addEventListener(
                'click',
                e => this.events.pub('click', true));
            this.btnStop.addEventListener(
                'click',
                e => this.events.pub('click', false));
            this.clock = document.createElement('canvas');
            this.element.appendChild(this.clock);
            this.clock.setAttribute('width', '300');
            this.clock.setAttribute('height', '300');
            this.context = this.clock.getContext('2d');

            //расчет координат центра и радиуса часов

            this.radiusClock = this.clock.width / 2 - 10;
            this.centerClockX = this.clock.width / 2;
            this.centerClockY = this.clock.height / 2;

        }
        const lengthSecondArrow = this.radiusClock - 10;
        const lengthMinutesArrow = this.radiusDrawCircles - 5;
        const lengthHourArrow = this.radiusDrawCircles / 2;
        const widthSecondArrow = 4;
        const widthMinutesArrow = 8;
        const widthHourArrow = 10;

        if (this.model) {
            //очистка экрана
            this.context.fillStyle = 'white';
            this.context.fillRect(0, 0, this.clock.width, this.clock.height);

            //контур часов

            this.context.fillStyle = '#ffce3d';
            this.context.beginPath();
            this.context.arc(this.centerClockX, this.centerClockY, this.radiusClock, 0, 2 * Math.PI, true);
            this.context.moveTo(this.centerClockX, this.centerClockY);
            this.context.fill();
            this.context.closePath();

            //рисование кружков

            let textIntoCircle = 0;
            let textOffsetX = 0;
            let textOffsetY = 5;
            for (let h = 0; h < 12; h++) {
                if (h === 0) {
                    textIntoCircle = '12';
                }
                else {
                    textIntoCircle = h + '';
                }
                if (textIntoCircle.length > 1) {
                    textOffsetX = -10;
                }
                else {
                    textOffsetX = -5;
                }
                let centerCircleX = this.centerClockX - this.radiusDrawCircles * Math.cos(h * 30 * (Math.PI / 180) + Math.PI / 2);
                let centerCircleY = this.centerClockY - this.radiusDrawCircles * Math.sin(h * 30 * (Math.PI / 180) + Math.PI / 2);

                this.context.beginPath();
                this.context.fillStyle = '#53b987';
                this.context.arc(centerCircleX, centerCircleY, this.radiusCircles, 0, 2 * Math.PI, true);
                this.context.fill();
                this.context.fillStyle = 'black';
                this.context.font = '15px Arial';
                this.context.fillText(textIntoCircle, centerCircleX + textOffsetX, centerCircleY + textOffsetY);
                this.context.closePath();
            }
            let sec = this.model.seconds * 6; //рисуем стрелки
            let min = this.model.minutes * 6;
            let hours = this.model.hour * 30;

            this.context.fillStroke = 'black';

            let angleXSecond = lengthSecondArrow * Math.cos(Math.PI / 2 - sec * (Math.PI / 180));
            let angleYSecond = -(lengthSecondArrow * Math.sin(Math.PI / 2 - sec * (Math.PI / 180)));
            let angleXMinute = lengthMinutesArrow * Math.cos(Math.PI / 2 - min * (Math.PI / 180));
            let angleYMinute = -(lengthMinutesArrow * Math.sin(Math.PI / 2 - min * (Math.PI / 180)));
            let angleXHour = lengthHourArrow * Math.cos(Math.PI / 2 - hours * (Math.PI / 180));
            let angleYHour = -(lengthHourArrow * Math.sin(Math.PI / 2 - hours * (Math.PI / 180)));

            drawArrow(this.context, this.centerClockX, this.centerClockY, angleXSecond, angleYSecond, widthSecondArrow);
            drawArrow(this.context, this.centerClockX, this.centerClockY, angleXMinute, angleYMinute, widthMinutesArrow);
            drawArrow(this.context, this.centerClockX, this.centerClockY, angleXHour, angleYHour, widthHourArrow);

            function drawArrow(ctx, x, y, angleX, angleY, widthLine) {
                ctx.beginPath();
                ctx.lineCap = 'round';
                ctx.lineWidth = widthLine;
                ctx.moveTo( x, y );
                ctx.lineTo( x + angleX, y + angleY);
                ctx.stroke();
                ctx.closePath();
            }

        }
    }

    onClicked(isClicked) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(isClicked);
        }
    }
}

