<template>
    <form name="invitation" method="post" action="/invite" id="vtp-form-invite" novalidate="novalidate">
        <fieldset class="ui-corner-all">
            <legend>Einladung</legend>
            <div class="vtp-fh-top">
                <label for="invitation_email" class="vtp-fh-w20 required">eMail:</label>
                <input type="text"
                       id="invitation_email"
                       name="invitation[email]"
                       required="required"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-middle">
                <label for="invitation_days-button" class="vtp-fh-w20 required">Gültigkeit:</label>
                <select id="invitation_days"
                        name="invitation[days]"
                        class="vtp-fh-w10"
                        style="display: none">
                    <option value="1">1 Tag</option>
                    <option value="2">2 Tage</option>
                    <option value="3">3 Tage</option>
                    <option value="5">5 Tage</option>
                    <option value="7">7 Tage</option>
                    <option value="10">10 Tage</option>
                    <option value="15">15 Tage</option>
                </select>
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-middle">
                <label for="invitation_subject" class="vtp-fh-w20 required">Betreff:</label>
                <input type="text"
                       id="invitation_subject"
                       name="invitation[subject]"
                       required="required"
                       value="Einladung zum Informationsportal vitoop"
                       class="vtp-fh-w50">
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-bottom">
                <label for="invitation_mail" class="vtp-fh-w20 required">Einladungstext:</label>
                <textarea id="invitation_mail"
                          name="invitation[mail]"
                          required="required"
                          class="vtp-fh-w50" style="height: 200px;">Hallo!

Hiermit bist Du herzlich zum neuen Informationsportal vitoop eingeladen.

Du kannst Dich registrieren unter: {LINK}
(Beachte bitte, dass dieser Link bis zum {UNTIL} gültig ist.)

LG

David Rogalski
                </textarea>
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="right">
                <input type="submit"
                       id="invitation_save"
                       name="invitation[save]"
                       value="Einladung versenden"
                       class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default ui-corner-all"
                       role="button">
            </div>
        </fieldset>
    </form>
</template>

<script>
    export default {
        name: "Invite",
        mounted() {
            $('#invitation_days').selectmenu();
        }
    }
</script>

<style scoped>

</style>