export default class ReadableButtonBehavior {
    constructor() {
    }

    makeAsRead (buttonElement) {
        buttonElement.removeClass('ui-state-default');
        buttonElement.addClass('ui-state-active');
        this.setButtonLabel(buttonElement, "gelesen :-)");
    }

    makeAsUnread(buttonElement) {
        buttonElement.removeClass('ui-state-active');
        buttonElement.addClass('ui-state-default');
        this.setButtonLabel(buttonElement, 'gelesen');
    }

    checkButtonState(buttonElement) {
        if (buttonElement.hasClass('ui-state-active')) {
            this.makeAsUnread(buttonElement);
            return 0;
        }
        this.makeAsRead(buttonElement);
        return 1;
    }

    setButtonLabel(buttonElement, label) {
        if (buttonElement.is('button')) {
            buttonElement.text(label);
            return;
        }

        buttonElement.val(label)
    }
}
