/**
 * JavaScript GUI for Vitoop Module: resource_search.js
 */

function extendTag (event) {
    var parent = $(event.target).parent();
    if (parent.hasClass('vtp-search-bytags-tag-active')) {
        $('.tag-icons-to-hide', parent).hide(400);
        parent.removeClass('vtp-search-bytags-tag-active');
    } else {
        $('.tag-icons-to-hide').hide(400);
        $('.vtp-search-bytags-tag').removeClass('vtp-search-bytags-tag-active');
        $('.tag-icons-to-hide', parent).show(400);
        parent.addClass('vtp-search-bytags-tag-active');
    }
};

function ignoreTag(event) {
    var parent = $(event.target).parent();
    if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
        parent.removeClass('vtp-search-bytags-tag-bulb');
        parent.addClass('vtp-search-bytags-tag-ignore');
        resourceSearch.ignoreTag(parent.text().trim(), true);
    } else {
        parent.removeClass('vtp-search-bytags-tag-ignore');
        resourceSearch.ignoreTag(parent.text().trim(), false);
    }
};


function highlightTag(event) {
    var parent = $(event.target).parent();
    if (!parent.hasClass('vtp-search-bytags-tag-bulb')) {
        parent.removeClass('vtp-search-bytags-tag-ignore');
        parent.addClass('vtp-search-bytags-tag-bulb');
        resourceSearch.highlightTag(parent.text().trim(), true);
    } else {
        parent.removeClass('vtp-search-bytags-tag-bulb');
        resourceSearch.highlightTag(parent.text().trim(), false);
    }

};

resourceSearch = (function () {

    /*
     * Beim Neuladen der Seite die Tags des Suchstrings
     * ins div '#vtp-search-bytags-taglistbox' schreiben
     */

    var query = $.deparam.querystring(), // may be empty object

        query_taglist = query.taglist, // may be undefined

        query_taglist_ignored = query.taglist_i, // may be undefined

        query_taglist_highlight = query.taglist_h, // may be undefined

        query_tagcnt = query.tagcnt, // may be undefined

        is_changed = false,

        arr_taglist = [],

        tag_count = 0,

        arr_taglist_ignore = [],

        ig_count = 0,

        arr_taglist_highlight = [],

        hl_count = 0,

        tagcnt = 0,

        cnt_tags = 0,

        tag,

    //direction - if true, thatn we move tag from general array to ignored array
        changeColor = function () {
            if ((!is_changed) && ((tag_count != arr_taglist.length) || (ig_count != arr_taglist_ignore.length) || (hl_count != arr_taglist_highlight.length))) {

                $('#vtp-search-bytags-form-submit').addClass('act');
                is_changed = true;
            }
            tag_count = arr_taglist.length;
            ig_count = arr_taglist_ignore.length;
            hl_count = arr_taglist_highlight.length;
        },

        ignoreTag = function (tag, direction) {
            var index;
            if (direction === true) {
                index = arr_taglist.indexOf(tag);
                if (index > -1) {
                    arr_taglist.splice(index, 1);
                    arr_taglist_ignore.push(tag);
                }
                index = arr_taglist_highlight.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
            } else if (direction === false) {
                index = arr_taglist_ignore.indexOf(tag);
                if (index > -1) {
                    arr_taglist_ignore.splice(index, 1);
                    arr_taglist.push(tag);
                }
            };
            if (direction != undefined) {
                maintainCntTags();
            }
        },

    //direction - if true, thatn we move tag from general array to highlighted array
        highlightTag = function (tag, direction) {
            var index;
            if (direction === true) {
                index = arr_taglist.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.push(tag);
                }
                index = arr_taglist_ignore.indexOf(tag);
                if (index > -1) {
                    arr_taglist_ignore.splice(index, 1);
                    arr_taglist.push(tag);
                    arr_taglist_highlight.push(tag);
                }
            } else if (direction === false) {
                index = arr_taglist_highlight.indexOf(tag);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
            };
            if (direction != undefined) {
                maintainCntTags();
            }
        },

        addTag = function (event, ui) {
            // check if tag is selected by autocomplete (ui will be defined) or
            // entered without autocomplete by hiting enter
            //@TODO you cannot select a tag without autocomplete by hitting enter. sort it out!
            if (typeof ui != "undefined") {
                pushTag(ui.item.text);
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
            decorateTag(tag, false, false).appendTo("#vtp-search-bytags-taglistbox");

            maintainCntTags();
        },

        removeTag = function (e) {
            if ((cnt_tags === 1) && (arr_taglist_ignore.length === 0)) {
                $('.vtp-uiaction-search-bytags-clear-taglistbox').trigger('click');
            }
            var parent = $(this).parent();
            var tagtext = parent.text().trim();
            var index;
            ignoreTag(tagtext, false);
            updateAutocomplete($('#vtp-search-bytags-taglist'));
            if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
                index = arr_taglist_highlight.indexOf(tagtext);
                if (index > -1) {
                    arr_taglist_highlight.splice(index, 1);
                }
                index = arr_taglist.indexOf(tagtext);
                if (index > -1) {
                    arr_taglist.splice(index, 1);
                }
            }
            // remove span.vtp-...-tag @TODO detach it for undo?
            parent.remove();
            maintainCntTags();
        },

        removeAllTags = function (e) {
            $(this).siblings().remove();
            arr_taglist = [];
            arr_taglist_highlight = [];
            arr_taglist_ignore = [];
            cnt_tags = 0;
            tagcnt = 0;
            updateAutocomplete($('#vtp-search-bytags-taglist'));
            maintainCntTags();
            $('#vtp-search-bytags-form-submit').removeClass('act').blur();
            is_changed = false;
            resourceList.loadResourceListPage(e);
        },

        maintainCntTags = function () {
            var $_options;
            changeColor();
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

            if ((cnt_tags === 0) && (arr_taglist_ignore.length > 0)) {
                $('#vtp-search-bytags-form-submit').attr("disabled", "disabled");
            } else {
                $('#vtp-search-bytags-form-submit').removeAttr("disabled");
            }

            tagcnt = (tagcnt > cnt_tags) ? cnt_tags : tagcnt;
            $('#vtp-search-bytags-tagcnt').val(tagcnt);

            var tempCount = (arr_taglist.length == 1)?(1):(tagcnt);
            resourceList.maintainResLinks({'taglist': arr_taglist, 'taglist_i': arr_taglist_ignore, 'taglist_h': arr_taglist_highlight, 'tagcnt': tempCount});
            $('select#vtp-search-bytags-tagcnt').selectmenu("refresh");
            $('#vtp-search-bytags-form span.ui-selectmenu-button').removeAttr('tabIndex');
            $('#vtp-search-bytags-tagcnt-button').attr('title', 'Übereinstimmungen der Tags');
        },

        maintainTaglistbox = function (force_hide) {
            if (typeof force_hide === "undefined") {
                force_hide = false;
            }

            if (force_hide) {
                $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
            } else {
                if ((cnt_tags === 0) && (arr_taglist_ignore.length === 0)) {
                    $('#vtp-search-bytags-taglistbox').hide('blind', 'fast');
                } else {
                    $('#vtp-search-bytags-taglistbox').show('blind', 'fast');
                }
            }
        },

    // Same code on server-side !!!
        decorateTag = function (tag, ignored, highlighted) {
            if (typeof(ignored) === 'undefined') {
                ignored = false;
            }
            if (typeof(highlighted) === 'undefined') {
                highlighted = false;
            }
            var ignoredClass = (ignored)?(' vtp-search-bytags-tag-ignore'):('');
            var highlightedClass = (highlighted)?(' vtp-search-bytags-tag-bulb'):('');

            return $('<span class="vtp-search-bytags-tag ui-corner-all'+ignoredClass+highlightedClass+'"><span class="vtp-icon-tag ui-icon ui-icon-tag" onclick="extendTag(event);"></span><span class="vtp-search-bytags-content" onclick="extendTag(event);">'
                + tag + '</span>' +
                '<span title="in der Ergebnisliste nach oben sortieren" class="ui-icon ui-icon-lightbulb tag-icons-to-hide vtp-icon-bulb" style="display: none" onclick="highlightTag(event)"></span>' +
                '<span title="Datensätze mit diesem Tag aussortieren" class="ui-icon ui-icon-cancel tag-icons-to-hide vtp-icon-cancel" style="display: none" onclick="ignoreTag(event)"></span>' +
                '<span title="Tag entfernen" class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"></span>' +
                '</span>'
            );
        },

        updateAutocomplete = function (seacrhByTag) {
            seacrhByTag.autocomplete('option', 'source',vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?extended=1&ignore='+arr_taglist.join());
        },
        
        /****************************************************************************
         * INIT
         ***************************************************************************/
            init = function () {

            $('#vtp-search-bytags-form').on('keypress', '#vtp-search-bytags-taglist', function (e) {
                if (e.keyCode == 13) {
                    // prevent submitting the form by hitting the enter key (or
                    // numpad-enter)
                    e.preventDefault();
                }
            });

            // #APR# tag bytags SUBMIT
            $('#vtp-search-bytags-form').on('submit', function(e, secondSuccessFunc) {

                resourceList.loadResourceListPage(e, secondSuccessFunc);
                $('#vtp-search-bytags-form-submit').removeClass('act').blur();
                is_changed = false;
            });

            var seacrhByTag = $('#vtp-search-bytags-taglist');
            if (seacrhByTag.length > 0) {
                seacrhByTag.autocomplete({
                    source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?extended=1&ignore='+arr_taglist_ignore.join(),
                    minLength: 2,
                    autoFocus: false,
                    select: function (event, ui) {
                        addTag(event, ui);
                        updateAutocomplete(seacrhByTag);
                    },
                    response: function (e, ui) {
                        if (0 === ui.content.length) {
                            ui.content.push({cnt:"",text:".. das tag existiert nicht."});
                            return;
                        }
                        // filter already selected tag ui.content
                        for (var i = 0; i < ui.content.length; i += 1) {
                            if ((arr_taglist.indexOf(ui.content[i].value) > -1)||(arr_taglist_ignore.indexOf(ui.content[i].value) > -1)) {
                                ui.content.splice(i, 1);
                                i -= 1;
                            }
                        }
                    }}).data("ui-autocomplete")._renderItem = function(ul, item) {
                    item.label = item.text;
                    var span = "<div class='vtp-search-bytags-item'>"+item.text + "</div><span>"+item.cnt+"</span>";
                    if (item.cnt == "") {
                        return $("<li class='ui-state-disabled' style='margin: 0px'></li>").append(span).appendTo(ul);
                    }
                    return $("<li></li>").append(span).appendTo(ul);
                };
            }

            $('#vtp-icon-clear-taglistbox').button({
                icons: {
                    primary: 'ui-icon-close'
                },
                text: false
            });
            $('#vtp-icon-clear-taglistbox').on('click', removeAllTags);

            $('#vtp-search-bytags-taglistbox')
                .on('click', '.vtp-uiaction-search-bytags-removetag', removeTag);
                //.on('click', '.vtp-uiaction-search-bytags-clear-taglistbox', removeAllTags);

            $('#vtp-search-bytags-tagcnt').on('selectmenuchange', function () {
                    tagcnt = +$(this).val();
                    $('#vtp-search-bytags-form-submit').addClass('act');

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
                        decorateTag(tag, false, false).appendTo('#vtp-search-bytags-taglistbox');
                    }
                }
            } else {
                // set state holding variables to defined state
                arr_taglist = [];
                cnt_tags = 0;
            }
            if (typeof query_taglist_ignored != 'undefined') {
                arr_taglist_ignore = query_taglist_ignored;
            } else {
                arr_taglist_ignore = [];
            }
            if (typeof query_taglist_highlight != 'undefined') {
                arr_taglist_highlight = query_taglist_highlight;
            } else {
                arr_taglist_highlight = [];
            }

            if (typeof query_tagcnt === 'undefined' || query_tagcnt > cnt_tags || query_tagcnt < 0) {
                // invalid tagcnt results in 0
                tagcnt = 0;
            } else {
                tagcnt = +query_tagcnt;
            }
            tag_count = arr_taglist.length;
            ig_count = arr_taglist_ignore.length;
            hl_count = arr_taglist_highlight.length;
            maintainCntTags();
        };

    return {
        init: init,
        maintainTaglistbox: maintainTaglistbox,
        ignoreTag: ignoreTag,
        highlightTag: highlightTag
    };
})();
