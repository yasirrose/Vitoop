export default {
    methods: {
        openResourcePopup(selector) {
            this.findPopupsAnchors();
            $(selector).on('click', 'a', function (e) {
                if (-1 !== e.target.href.indexOf('resources')) {
                    e.preventDefault();
                    let resourcesParts = this.href.match(/\/(\d+)/);
                    if (resourcesParts !== null) {
                        e.preventDefault();
                        vitoopApp.openResourcePopup(resourcesParts[1]);
                        return false;
                    }
                }
            });
        },
        findPopupsAnchors() {
            const anchors = Object.values(document.querySelectorAll('a'));
            anchors.forEach(anchor => {
                if (anchor.href.indexOf('resources') > -1) {
                    anchor.classList.add('vtp-resource-link')
                }
            })
        }
    }
}
