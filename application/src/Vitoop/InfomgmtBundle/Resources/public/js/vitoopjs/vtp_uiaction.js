/**
 * JavaScript GUI for Vitoop Module: VitoopUIAction
 */

var UIAction = {
    uiactions: [],
    initDone: false,
    register: function (action_name, action_func) {

    },
    clickHandler: function (e) {
        var target = $(e.target);
        var action = "noop";
        var arr_classes;
        if ('TD' == target.prop('tagName')) {
            target = target.parent();
        }
        arr_classes = target.attr('class');
        if (undefined != arr_classes) {
            arr_classes = arr_classes.split(' ');
            $.each(arr_classes, function (index, class_name) {
                if (-1 != class_name.indexOf('vtp-uiaction-')) {
                    action = class_name.substr(13);
                    return false;
                }
            });
        }
    },
    init: function () {
        if (this.initDone) {
            return;
        }
        // alert('INIT');
        // $('#vtp-application').click(this.clickHandler);
        //$('body').click(this.clickHandler);
        this.initDone = true;
    }
};

UIAction.register('showdetail', 'doDialog');
