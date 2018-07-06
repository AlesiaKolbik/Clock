class TClockControllerButtons {
    constructor(model, view) {
        this.view = view;
        let self = this;
        model.changeCallback = function() {
            self.renderView();
        }
        view.onCheckedCallback = function(isClicked) {
            model.start(isClicked);
        }
    }

    renderView() {
        this.view.render();
    }
}