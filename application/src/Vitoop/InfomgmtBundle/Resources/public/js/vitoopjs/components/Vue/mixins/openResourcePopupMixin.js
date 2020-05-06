export default {
    methods: {
        openResourcePopup(selector) {
            $(selector).on('click', 'a', function (e) {
                e.preventDefault();
                let resourcesParts = this.href.match(/\/(\d+)/);
                if (resourcesParts !== null) {
                    e.preventDefault();
                    vitoopApp.openResourcePopup(resourcesParts[1]);
                    return false;
                }
            });
        }
    }
}
