function ReadableButtonBehavior() {
}

ReadableButtonBehavior.prototype.constructor = ReadableButtonBehavior;
ReadableButtonBehavior.prototype.makeAsRead = function (buttonElement) {
    buttonElement.removeClass('ui-state-default');
    buttonElement.addClass('ui-state-active');
    this.setButtonLabel(buttonElement, "gelesen :-)");
};

ReadableButtonBehavior.prototype.makeAsUnread = function (buttonElement) {
    buttonElement.removeClass('ui-state-active');
    buttonElement.addClass('ui-state-default');
    this.setButtonLabel(buttonElement, 'gelesen');
};

ReadableButtonBehavior.prototype.checkButtonState = function (buttonElement) {
    if (buttonElement.hasClass('ui-state-active')) {
        this.makeAsUnread(buttonElement);
        return 0;
    }
    this.makeAsRead(buttonElement);
    return 1;
};

ReadableButtonBehavior.prototype.setButtonLabel = function (buttonElement, label) {
    if (buttonElement.is('button')) {
        buttonElement.text(label);
        return;
    }

    buttonElement.val(label)
};