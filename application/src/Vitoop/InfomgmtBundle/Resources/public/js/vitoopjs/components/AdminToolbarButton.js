export default class AdminToolbarButton {
    constructor() {
        $('#vtp-admin-toolbar-toggle').on('click', function () {
            $('.vtp-admin-toolbar').each(function () {
                if ($(this).is(":visible")) {
                    $(this).hide();
                } else {
                    $(this).css('display', 'inline-block');
                }
            });

            return false;
        });
    }
}