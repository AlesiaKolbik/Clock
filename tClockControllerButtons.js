 export class TClockControllerButtons {
    constructor(model, view) {
        this.view = view;
        let self = this;
        model.events.sub('change', function() {
            self.renderView();
        });
        model.events.sub('change', function() {
            console.log('changed!!!');
        });
        view.events.sub('click', function (isClicked) {
            model.start(isClicked);
        });

        /*view.onCheckedCallback = function(isClicked) {
            model.start(isClicked);
        }*/

    }

    renderView() {
        this.view.render();
    }
}
