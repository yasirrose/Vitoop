<template>
    <div class="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-terms-user"
                 class="ui-corner-all">
                <div v-if="dataP" v-html="dataP"></div>
                <div v-else class="preloader">
                    <img src="/img/loader.gif" />
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "UserDataP",
        data() {
            return {
                dataP: null,
            }
        },
        created() {
            axios('/api/v1/users/datap')
                .then(({ data: { datap } }) => this.dataP = datap)
                .catch(err => console.dir(err));
        }
    }
</script>

<style>
    #gtx-trans {
        display: none;
    }

    #vtp-terms-user {
        padding: 30px;
        position: relative;
    }
</style>

<style scoped lang="scss">
    .preloader {
        height: 100px;
        display: table-row;

        img {
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
