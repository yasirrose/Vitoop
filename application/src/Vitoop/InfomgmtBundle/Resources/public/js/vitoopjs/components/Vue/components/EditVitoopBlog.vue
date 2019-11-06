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
                            {{ welcome_text.sheet }}
                        </textarea>
                        <div id="vtp-vitoopblog-save-container">
                            <input type="submit"
                                   @click.prevent="setWelcomeText"
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
        data() {
            return {
                welcome_text: {
                    id: null,
                    sheet: null
                }
            }
        },
        mounted() {
            tinymce.remove('#vitoop_blog_sheet');
            const tinyInit = new TinyMCEInitializer();
            const options = tinyInit.getCommonOptions();
            options.selector = 'textarea#vitoop_blog_sheet';
            options.width = 615;
            options.height = 600;
            options.plugins = ['textcolor', 'link', 'media', 'code'];
            options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code';
            options.init_instance_callback = (editor) => {
                editor.on('keyup', (e) => {
                    this.welcome_text.sheet = e.target.innerHTML;
                })
            };

            this.getWelcomeText()
                .then(() => {
                    tinymce.init(options);
                });
        },
        methods: {
            getWelcomeText() {
                return axios('/api/v1/vitoop-blog')
                    .then(({data}) => {
                        this.welcome_text = data;
                        return
                    })
                    .catch(err => console.dir(err));
            },
            setWelcomeText() {
                axios.put(`/api/v1/vitoop-blog/${this.welcome_text.id}`, {
                    "id": this.welcome_text.id,
                    "sheet": this.welcome_text.sheet
                })
                    .then(response => {})
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped>

</style>

<!--GET /api/v1/vitoop-blog - получить блог. (старый роут / )-->
<!--PUT /api/v1/vitoop-blog/{id} - редактировать блог для админа. -->
<!--старый роут ( /edit-vitoop-blog ), где id - id из верхниего роута-->
