/**
 * JavaScript GUI for Vitoop Module: resource_search.js
 */
resourceSearch = (function () {

    /*
     * Beim Neuladen der Seite die Tags des Suchstrings
     * ins div '#vtp-search-bytags-taglistbox' schreiben
     */

    var query = $.deparam.querystring(), // may be empty object

        query_taglist = query.taglist, // may be undefined

        query_tagcnt = query.tagcnt, // may be undefined

        arr_taglist = [],

        tagcnt = 0,

        cnt_tags = 0,

        tag,

        addTag = function (event, ui) {

            // check if tag is selected by autocomplete (ui will be defined) or
            // entered without autocomplete by hiting enter
            //@TODO you cannot select a tag without autocomplete by hitting enter. sort it out!
            if (typeof ui != "undefined") {
                pushTag(ui.item.value);
                // prevents writing back the value after it is already cleared by
                // .val('')
                event.preventDefault();
            } else {// @TODO Does this make sense
                // push_tag($("#taglist").val());
            }
            $('#vtp-search-bytags-taglist').val('');
        },

        pushTag = function (tag) {
            if (tag == '') {
                return;
            }
            arr_taglist.push(tag);
            decorateTag(tag).appendTo("#vtp-search-bytags-taglistbox");

            maintainCntTags();
        },

        removeTag = function (e) {
            if (cnt_tags === 1) {
                $('.vtp-uiaction-search-bytags-clear-taglistbox').trigger('click');
            }
            // find string tagtext in array arr_taglist and remove it
            var tagtext = $(this).parent().text();
            tagtext = $.trim(tagtext);
            for (var i = 0; i < arr_taglist.length; i += 1) {
                if (tagtext == arr_taglist[i]) {
                    arr_taglist.splice(i, 1);
                    break;
                }
            }
            // remove span.vtp-...-tag @TODO detach it for undo?
            $(this).parent().remove();

            maintainCntTags();

        },

        removeAllTags = function (e) {
            $(this).siblings().remove();
            arr_taglist = [];
            cnt_tags = 0;
            tagcnt = 0;
            maintainCntTags();
            resourceList.loadResourceListPage(e);
        },

        maintainCntTags = function () {
            var $_options;

            cnt_tags = arr_taglist.length;
            // show or hide the taglistbox when there are tags to show
            maintainTaglistbox();

            // append a new option-element or remove the (last) element with the given
            // value: if difference is 1, append or remove an element
            // otherwise renew all options e.g. for first initialization
            $_options = $('#vtp-search-bytags-tagcnt option');

            if ((($_options.length - 1) + 1 ) === cnt_tags) {
                $('<option></option>').val(cnt_tags).text(cnt_tags).appendTo('#vtp-search-bytags-tagcnt');
            } else if ((($_options.length - 1) - 1) === cnt_tags) {
                $_options.filter('[value="' + (cnt_tags + 1) + '"]').remove();
            } else {
                $('#vtp-search-bytags-tagcnt').empty();
                $('<option></option>').val(0).text('-').appendTo('#vtp-search-bytags-tagcnt');
                for (var i = 1; i <= cnt_tags; i += 1) {
                    $('<option></option>').val(i).text(i).appendTo('#vtp-search-bytags-tagcnt');
                }
            }

            tagcnt = (tagcnt > cnt_tags) ? cnt_tags : tagcnt;
            $('#vtp-search-bytags-tagcnt').val(tagcnt);

            resourceList.maintainResLinks({'taglist': arr_taglist, 'tagcnt': tagcnt});
        },

        maintainTaglistbox = function (force_hide) {
            if (typeof force_hide === "undefined") {
                force_hide = false;
            }

            if (force_hide) {
                $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
            } else {
                if (cnt_tags === 0) {
                    $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
                } else if (cnt_tags > 0) {
                    $('#vtp-search-bytags-taglistbox').show('blind', 'fast');
                }
            }
        },

        removeTagByName = function (tag) {
            // written accidently - not yet used :-(
            if (tag == '') {
                return;
            }
            for (var i = 0; i < arr_taglist.length; i += 1) {
                if (tag == arr_taglist[i]) {
                    arr_taglist.splice(i, 1);
                    break;
                }
            }
            $("#vtp-search-bytags-taglistbox span").each(function (i, ele) {
                if (tag == ele.text()) {
                    ele.remove();
                    return false;
                }
            });
            maintainCntTags();
        },

    // Same code on server-side !!!
        decorateTag = function (tag) {
            return $('<span class="vtp-search-bytags-tag ui-corner-all"><span class="vtp-icon-tag ui-icon ui-icon-tag"></span>'
                + tag + '<span class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"></span></span>');
        },

        /****************************************************************************
         * INIT
         ***************************************************************************/
            init = function () {

            $('#vtp-search-bytags-form').on('keypress', '#vtp-search-bytags-taglist', function (e) {
                if (e.keyCode == 13 || e.keyCode == 108) {
                    // prevent submitting the form by hitting the enter key (or
                    // numpad-enter)
                    e.preventDefault();
                }
            });

            // #APR# tag bytags SUBMIT
            $('#vtp-search-bytags-form').on('submit', resourceList.loadResourceListPage);

            $('#vtp-search-bytags-taglist').autocomplete({
                source: vitoop.baseUrl + (['tag', 'suggest'].join('/')),
                minLength: 2,
                autoFocus: true,
                select: addTag,
                response: function (e, ui) {
                    // filter already selected tag ui.content
                    for (var i = 0; i < arr_taglist.length; i += 1) {
                        for (var j = 0; j < ui.content.length; j += 1) {
                            // ui.content[j] is an object {label: 'label', value:
                            // 'value'}
                            if (arr_taglist[i] == ui.content[j].value) {
                                // found, remove it, next i
                                ui.content.splice(j, 1);
                                break;
                            }
                        }
                    }
                }});

            $('#vtp-search-bytags-taglistbox')
                .on('click', '.vtp-uiaction-search-bytags-removetag', removeTag)
                .on('click', '.vtp-uiaction-search-bytags-clear-taglistbox', removeAllTags);

            $('#vtp-search-bytags-tagcnt').on('change', function () {
                    tagcnt = +$(this).val();
                    resourceList.maintainResLinks({'tagcnt': tagcnt});
                }
            );

            /* START */

            // is taglist present? (got from querystring)
            if (typeof query_taglist != 'undefined') {
                // copy the taglist portion of querystring into taglistbox
                // taglist is already an array (it has been a comma separated list before)
                arr_taglist = query_taglist;
                cnt_tags = arr_taglist.length;

                if (false) {// currently not used... is done by server side
                    for (var i = 0; i < arr_taglist.length; i += 1) {
                        tag = arr_taglist[i];
                        decorateTag(tag).appendTo('#vtp-search-bytags-taglistbox');
                    }
                }
            } else {
                // set state holding variables to defined state
                arr_taglist = [];
                cnt_tags = 0;
            }
            if (typeof query_tagcnt === 'undefined' || query_tagcnt > cnt_tags || query_tagcnt < 0) {
                // invalid tagcnt results in 0
                tagcnt = 0;
            } else {
                tagcnt = +query_tagcnt;
            }

            maintainCntTags();
        };

    return {
        init: init,
        maintainTaglistbox: maintainTaglistbox
    };
})
    ();
