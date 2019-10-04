<template>
    <div id="vtp-header" class="ui-corner-all">
        <div id="vtp-header-status">
            <span class="vtp-admin-toolbar">
                {{$t('label.download.size')}}:
                {{ downloadSize }}
                {{$t('label.download.mb')}}
            </span>
            <form id="vtp-header-toggle-flag"
                  class="vtp-admin-toolbar"
                  style="display: none;"
                  action="/userhome"
                  method="get"
                  enctype="application/x-www-form-urlencoded">
                <label for="vtp-tgl-flag" class="vtp-button">{{ $t('label.flags.edit') }}</label>
                <input id="vtp-tgl-flag" class="vtp-uiaction-toggle-flag" name="flagged" type="checkbox" value="1">
                <button class="vtp-button" type="submit">{{ $t('label.flags.edit') }}</button>
            </form>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    id="button-terms-admin">
                <span class="ui-button-text">{{ $t('label.terms') }}</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    id="button-data-p">
                <span class="ui-button-text">{{ $t('label.datap') }}</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    @click="invitation.toggle"
                    id="invitations-toggle">
                {{ $t('invitations.label') }}:
                <span>
                    {{ $t(`label.checkbox.${invitation.text()}`) }}
                </span>
            </button>
            <a class="vtp-button vtp-uiaction-goto-invite vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-icons-only"

               role="button"
               :title="$t('invitations.send')">
                <span class="ui-button-icon-primary ui-icon ui-icon-mail-closed"></span>
                <span class="ui-button-icon-secondary ui-icon ui-icon-pencil"></span>
            </a>
            <a class="vtp-button vtp-uiaction-goto-edithome vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-icons-only"

               :title="$t('homepage.edit')">
                <span class="ui-button-icon-primary ui-icon ui-icon-home"></span>
                <span class="ui-button-icon-secondary ui-icon ui-icon-pencil"></span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppHeader",
        inject: [
            'downloadSize',
            'invitationValue'
        ],
        data() {
            return {
                invitation: {
                    value: this.invitationValue,
                    text: this.invitationValueText,
                    toggle: this.toggle
                }
            }
        },
        methods: {
            invitationValueText() {
                return this.invitation.value ? 'on' : 'off';
            },
            toggle() {
                axios.put(`/invitation/toggle`)
                    .then(({data: {invitation}}) => this.invitation.value = invitation)
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped>
    .vtp-admin-toolbar {
        margin-right: 6px;
        color: #2779aa;
    }
</style>