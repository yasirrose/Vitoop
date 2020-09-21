<template>
    <div id="vtp-res-tags" class="scrollbar-inner">
        <table id="tags-list" class="dataTable table-datatables noscroll-container">
            <thead>
            <tr>
                <td style="padding: 0 15px 0 0;">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 29%" class="ui-state-default">Tag:</th>
                                <th class="ui-state-default">X</th>
                                <th class="ui-state-default">Projekt:</th>
                                <th class="ui-state-default">Lexicon:</th>
                                <th class="ui-state-default">Pdf:</th>
                                <th class="ui-state-default">Textlink:</th>
                                <th class="ui-state-default">Link:</th>
                                <th class="ui-state-default">Buch:</th>
                                <th class="ui-state-default">Adresse:</th>
                            </tr>
                        </thead>
                    </table>
                </td>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 0 0;">
                        <div class="body-scroll">
                            <table v-if="!loading">
                                <tbody>
                                    <tr class="ui-corner-all"
                                        :class="{even: index % 2 === 0}"
                                        v-for="(tag,index) in tags"
                                        :key="tag.id">
                                        <td>{{ tag.text }}:</td>
                                        <td>{{ tag.cnt }}</td>
                                        <td>{{ tag.prjc }}</td>
                                        <td>{{ tag.lexc }}</td>
                                        <td>{{ tag.pdfc }}</td>
                                        <td>{{ tag.telic }}</td>
                                        <td>{{ tag.linkc }}</td>
                                        <td>{{ tag.bookc }}</td>
                                        <td>{{ tag.adrc }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div v-else class="body-loading">
                                <img src="/img/loader.gif" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Tags",
        data() {
            return {
                loading: true,
                tags: []
            }
        },
        mounted() {
            axios('/api/v1/tags')
                .then(({data}) => {
                    this.loading = false;
                    this.tags = data;
                })
            .catch(err => {
                console.dir(err);
            });
        }
    }
</script>

<style scoped lang="scss">
    .body-scroll {
        height: 350px;
        overflow: auto;
        position: relative;
    }

    .body-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);

        img {
            width: 40px;
        }
    }
</style>