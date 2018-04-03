function ReadableButton(resourceType, resourceId) {
    this.resourceType = resourceType;
    this.resourceId = resourceId;
    this.buttonBehavior = new ReadableButtonBehavior();
}

ReadableButton.prototype.constructor = ReadableButton;
ReadableButton.prototype.buttonClass = '.vtp-button-read';
ReadableButton.prototype.resourceType = '';
ReadableButton.prototype.resourceId = '';
ReadableButton.prototype.init = function (isUserRead) {
    let self = this;
    let button = $(this.buttonClass);
    if (1 == isUserRead) {
        this.buttonBehavior.makeAsRead(button);
    } else {
        this.buttonBehavior.makeAsUnread(button)
    }

    button.on('click', function () {
        let checkedState = self.buttonBehavior.checkButtonState($(this));

        $.ajax({
            method: 'POST',
            url: vitoop.baseUrl + ([self.resourceType, self.resourceId, 'user-reads'].join('/')),
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                isUserRead: checkedState
            }),
            success: function () {
                refresh_list = true;
            }
        });
    });
};

