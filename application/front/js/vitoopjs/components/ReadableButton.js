import ReadableButtonBehavior from './ReadableButtonBehavior';

export default class ReadableButton {
    constructor(resourceType, resourceId) {
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        this.buttonBehavior = new ReadableButtonBehavior();
        // this.buttonClass = '.vtp-button-read';
        this.buttonClass = '.has_read_btn';
    }

    init(isUserRead) {
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
                    //refresh_list = true;
                }
            });
        });
    }
}

