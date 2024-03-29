export default class TinyMCEInitializer {
    constructor() {
    }

    getCommonOptions() {
        return {
            height: 300,
            plugins: [
                'advlist', 'autolink', 'link', 'image', 'lists', 'anchor', 'pagebreak',
                , 'code', 'fullscreen', 'media', 'table', 'emoticons', 'help', 'print', 'textcolor'
            ],
            menubar: false,
            skin : "vitoop",
            content_css: "/css/vtp-tinymce.css",
            formats: {
                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
                bold: { inline: 'strong' },
                italic: { inline: 'i' },
                underline: { inline: 'u' },
                strikethrough: { inline: 'del' },
            },
            default_link_target: "_blank",
            target_list: false,
            toolbar: 'styleselect | fontsizeselect | bold italic underline | indent outdent  | forecolor backcolor | textcolor | link unlink | emoticons | print | fullscreen  ',
        };
    }

    isEditorActive(selector) {
        if(typeof tinyMCE == 'undefined'){
            return false;
        }

        let editor = this.getEditor(selector);
        if (editor == null) {
            return false;
        }

        return !editor.isHidden();
    }

    getEditor(selector) {
        if(typeof selector == 'undefined' ) {
            return tinyMCE.activeEditor;
        }

        return tinymce.get(selector);
    }

    getEditorContent(selector) {
        let editor = this.getEditor(selector);
        if (null !== editor) {
            return editor.getContent();
        }

        return null;
    }
}

