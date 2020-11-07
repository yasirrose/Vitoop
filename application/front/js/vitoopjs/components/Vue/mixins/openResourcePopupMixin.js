export default {
    methods: {
        openResourcePopup(selector) {
            this.findPopupsAnchors(selector);
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
        findPopupsAnchors(selector) {
            const anchors = Object.values(document.querySelectorAll(`${selector} a`));
            anchors.forEach(anchor => {
                if (/\/(\d+)/.test(anchor.href)) {
                    anchor.classList.add('vtp-resource-link');
                    anchor.href = `resources${anchor.href.match(/\/(\d+)/)[0]}`;
                }
            })
        }
    }
}
