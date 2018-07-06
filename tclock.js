class Model {
    constructor(gmt) {
        this.gmt = gmt;
        let self = this;
        let date = new Date();
        let ms = date.getTime() + (date.getTimezoneOffset() * 60000) + this.gmt * 3600000;
        let time = new Date(ms);
        this.hour = time.getHours();
        this.minutes = time.getMinutes();
        this.seconds = time.getSeconds();
        this.changeCallback = null;
        this.isActive = true;

        function recalculate() {
            if ( self.isActive && typeof (self.changeCallback) === 'function') {
                self.changeCallback();
            }
            if (self.timer) {
                clearTimeout(self.timer);
            }
            self.date = new Date();
            self.ms = self.date.getTime() + (self.date.getTimezoneOffset() * 60000) + self.gmt * 3600000;
            self.time = new Date(self.ms);
            self.hour = self.time.getHours();
            self.minutes = self.time.getMinutes();
            self.seconds = self.time.getSeconds();
            self.timer = setTimeout(recalculate, 1000);
        }

        this.timer = setTimeout(recalculate, 1000);

    }
    start(isOn) {
        this.isActive = isOn;
    }
}



















