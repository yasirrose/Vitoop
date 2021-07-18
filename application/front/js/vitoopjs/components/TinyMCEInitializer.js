export default class TinyMCEInitializer {
    constructor() {
    }

    getCommonOptions() {
        return {
            height: 300,
            plugins: ['textcolor', 'link', 'placeholder'],
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
            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink',
        };
    }

    isEditorActive(selector) {
        if(typeof tinyMCE == 'undefined'){
            return false;
        }

        let editor = null;
        if( typeof selector == 'undefined' ){
            editor = tinyMCE.activeEditor;
        }else{
            editor = tinymce.EditorManager.get(selector);
        }
        if(editor == null){
            return false;
        }

        return !editor.isHidden();
    }
}

