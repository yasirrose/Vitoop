<template>
    <div class="vtp-content">
        <form name="vitoop_blog"
              method="post"
              action="/edit-vitoop-blog"
              id="vtp-form-vitoop-blog"
              novalidate="novalidate">
            <fieldset class="ui-corner-all">
                <legend>Neuigkeiten</legend>
                <div id="vtp-vitoopblog-box">
                    <div id="vtp-vitoopblog-sheet-edit">
                        <textarea id="vitoop_blog_sheet"
                                  name="vitoop_blog[sheet]"
                                  required="required"
                                  aria-hidden="true">
                            &lt;h3 style="padding-left: 30px;"&gt;&lt;span style="color: #003366;"&gt;&lt;strong&gt;Willkommen auf vitoop.org wqedqw wef&lt;/strong&gt;&lt;/span&gt;&lt;/h3&gt;
                        </textarea>
                        <div id="vtp-vitoopblog-save-container">
                            <input type="submit"
                                   id="vitoop_blog_save"
                                   name="vitoop_blog[save]"
                                   value="speichern"
                                   class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default ui-corner-all"
                                   role="button">
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import TinyMCEInitializer from "../../TinyMCEInitializer";

    export default {
        name: "EditVitoopBlog",
        mounted() {
            const tinyInit = new TinyMCEInitializer();
            const options = tinyInit.getCommonOptions();
            options.selector = 'textarea#vitoop_blog_sheet';
            options.width = 615;
            options.height = 600;
            options.plugins = ['textcolor', 'link', 'media', 'code'];
            options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code'

            tinymce.init(options);
        }
    }
</script>

<style scoped>

</style>