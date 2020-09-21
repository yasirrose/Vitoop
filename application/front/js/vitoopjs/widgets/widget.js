export default class Widget {
    constructor() {
    }

    replaceContainer(containerName, html) {
        $('#' + containerName).empty().append(html);
        this.uifyContainer(containerName);
    }

    uifyContainer(containerName) {
        $('#' + containerName + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        !$('#' + containerName + ' .vtp-uiinfo-info').length || $('#' + containerName + ' .vtp-uiinfo-info').position({
            my: 'right top',
            at: 'right bottom',
            of: '#' + containerName + ' .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 3000);
    }
}

