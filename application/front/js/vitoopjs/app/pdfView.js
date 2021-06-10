import TagWidget from '../widgets/tagWidget';
import RemarkWidget from  '../widgets/remarkWidget';
import PrivateRemarkWidget from '../widgets/privateRemarkWidget';
import CommentWidget from '../widgets/commentWidget';
import ProjectWidget from '../widgets/projectWidget';
import LexiconWidget from '../widgets/lexiconWidget';
import VitoopApp from '../app/vitoop';

class PdfView {
    constructor() {
        this.metadataWidth = '300px';
    }
    init(resourceId, resourceType, baseUrl) {
        let self = this;

        if (vitoopState.getters.isOpenInSameTabPdf) {
            $('.vtp-pdf-link-container').show();
        } else {
            $('.vtp-pdf-link-container').hide();
        }

        $('#vtp-pdf-view-toggle-button').on('click', function () {
            if ($('#pdf-view-wrapper').css('left') !== '0px') {
                $('#pdf-view-wrapper').css('left', 0);
                $('.toolbar').css('left', 0);
                $('#vtp-view-meta').hide();
                $('#vtp-pdf-view-toggle').css('left', 0);
                $('#vtp-pdf-view-toggle-button span').removeClass('ui-icon-seek-first').addClass('ui-icon-seek-end');
            } else {
                $('#pdf-view-wrapper').css('left', self.metadataWidth);
                $('.toolbar').css('left', '320px');
                $('#vtp-pdf-view-toggle').css('left', self.metadataWidth);
                $('#vtp-view-meta').show();
                $('#vtp-pdf-view-toggle-button span').removeClass('ui-icon-seek-end').addClass('ui-icon-seek-first');
            }
        });

        this.tagWidget = new TagWidget(resourceId, baseUrl);
        this.tagWidget.init();

        $('#vtp-remark-dialog').on('click', function () {
            self.openDialog('#resource-remark');
            let remarkWidget = new RemarkWidget(resourceId, baseUrl);
            remarkWidget.init();
        });

        $('#vtp-remark-private-dialog').on('click', function () {
            self.openDialog('#resource-remark_private');

            let privateRemarkWidget = new PrivateRemarkWidget(resourceId, baseUrl);
            privateRemarkWidget.init();
        });

        $('#vtp-comments-dialog').on('click', function () {
            self.openDialog('#resource-comments');

            let commentWidget = new CommentWidget(resourceId, resourceType, baseUrl);
            commentWidget.init();
        });

        $('#vtp-assignments-dialog').on('click', function () {
            self.openDialog('#resource-assignments');

            let projectWidget = new ProjectWidget(resourceId, baseUrl);
            projectWidget.init();

            let lexiconWidget = new LexiconWidget(resourceId, baseUrl);
            lexiconWidget.init();
        });
    }

    openDialog(containerId) {
        const dialog = $(containerId).dialog({
            autoOpen: false,
            width: 720,
            modal: true,
        });

        setTimeout(() => {
            dialog.dialog('open');
        }, 100)
    }
}

window.vitoopApp = new VitoopApp();
window.vitoopPdfView = new PdfView();
