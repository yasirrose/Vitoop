<template>
    <div class="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-terms-user" class="ui-corner-all">
                <div v-html="dataP"></div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "UserDataP",
        inject: ['dataP']
    }
</script>

<style>
    #gtx-trans {
        display: none;
    }
</style>