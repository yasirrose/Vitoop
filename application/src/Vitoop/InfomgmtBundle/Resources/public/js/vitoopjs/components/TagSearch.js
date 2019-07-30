import RowPerPageSelect from "./RowPerPageSelect";
import DataStorage from "../datastorage";

export default class TagSearch {
    constructor () {
        this.tagcnt = 0;
        this.cnttags = 0;
        this.isChanged = false;

        this.resetTags();

        this.tagSearchListId = '#vtp-search-bytags-taglist';
        this.tagSearchAreaId = '#vtp-search-bytags-taglistbox';
        this.tagSearchFormId = '#vtp-search-bytags-form';
        this.tagCntId = '#vtp-search-bytags-tagcnt';

        this.datastorage = new DataStorage();
        this.tagsDSKey = 'dt-tags';
        this.ignoredTagsDSKey = 'dt-ignoredTags';
        this.highlightedTagsDSKey = 'dt-highlightedTags';
        this.tagcntDSKey = 'dt-tagCnt';
    }

    init() {
        let self = this;

        this.loadTagsFromStorage();
        this.tags.forEach(function(tag) {

            let isHighlighted = self.highlightedTags.indexOf(tag) !== -1;
            self.decorateTag(tag, false, isHighlighted).appendTo(self.tagSearchAreaId);
        });
        this.ignoredTags.forEach(function (tag) {
            let isIgnored = self.ignoredTags.indexOf(tag) !== -1;
            self.decorateTag(tag, isIgnored, false).appendTo(self.tagSearchAreaId);
        });
        $(this.tagCntId).val(self.tagcnt);
        $(this.tagCntId).selectmenu("refresh");

        $(this.tagSearchFormId).on('keypress', this.tagSearchListId, function (e) {
            if (e.keyCode == 13) {
                // prevent submitting the form by hitting the enter key (or
                // numpad-enter)
                e.preventDefault();
            }
        });

        $(this.tagSearchFormId).on('submit', function(e, secondSuccessFunc) {

            resourceList.loadResourceListPage(e, secondSuccessFunc);
            $('#vtp-search-bytags-form-submit').removeClass('act').blur();
            self.isChanged = false;
        });

        let searchByTag = $(this.tagSearchListId);
        if (searchByTag.length > 0) {
            searchByTag.autocomplete({
                source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?extended=1&ignore='+self.ignoredTags.join(),
                minLength: 2,
                autoFocus: false,
                select: function (event, ui) {
                    // check if tag is selected by autocomplete (ui will be defined) or
                    // entered without autocomplete by hiting enter
                    //@TODO you cannot select a tag without autocomplete by hitting enter. sort it out!
                    if (typeof ui != "undefined") {
                        self.pushTag(ui.item.text);
                        // prevents writing back the value after it is already cleared by
                        // .val('')
                        event.preventDefault();
                    } else {// @TODO Does this make sense
                        // push_tag($("#taglist").val());
                    }
                    $('#vtp-search-bytags-taglist').val('');

                    self.updateAutocomplete(searchByTag);
                },
                response: function (e, ui) {
                    if (0 === ui.content.length) {
                        ui.content.push({cnt:"",text:".. das tag existiert nicht."});
                        return;
                    }
                    // filter already selected tag ui.content
                    for (let i = 0; i < ui.content.length; i += 1) {
                        if ((self.tags.indexOf(ui.content[i].value) > -1)||(self.ignoredTags.indexOf(ui.content[i].value) > -1)) {
                            ui.content.splice(i, 1);
                            i -= 1;
                        }
                    }
                }}
            ).data("ui-autocomplete")._renderItem = function(ul, item) {
                item.label = item.text;
                let span = "<div class='vtp-search-bytags-item'>"+item.text + "</div><span>"+item.cnt+"</span>";
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

        //remove all tags
        $('#vtp-icon-clear-taglistbox').on('click', function (e) {
            $(this).siblings().remove();
            self.resetTags();
            self.cnttags = 0;
            self.tagcnt = 0;
            self.saveTagsToStorage();
            self.updateAutocomplete($('#vtp-search-bytags-taglist'));
            self.maintainCntTags();
            $('#vtp-search-bytags-form-submit').removeClass('act').blur();
            self.isChanged = false;
            resourceList.loadResourceListPage(e);
        });

        //remove tag
        $('#vtp-search-bytags-taglistbox').on('click', '.vtp-uiaction-search-bytags-removetag', function(e) {
            if ((self.cnttags === 1) && (self.ignoredTags.length === 0)) {
                $('.vtp-uiaction-search-bytags-clear-taglistbox').trigger('click');
            }
            let parent = $(this).parent();
            let tagtext = parent.text().trim();
            let index;
            self.ignoreTag(tagtext, false);
            self.updateAutocomplete($('#vtp-search-bytags-taglist'));
            if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
                index = self.highlightedTags.indexOf(tagtext);
                if (index > -1) {
                    self.highlightedTags.splice(index, 1);
                }
                index = self.tags.indexOf(tagtext);
                if (index > -1) {
                    self.tags.splice(index, 1);
                }
            }
            // remove span.vtp-...-tag @TODO detach it for undo?
            parent.remove();
            self.maintainCntTags();
        });

        $('#vtp-search-bytags-tagcnt').on('selectmenuchange', function () {
            self.tagcnt = +$(this).val();
            $('#vtp-search-bytags-form-submit').addClass('act');

            self.saveTagsToStorage();
            resourceList.maintainResLinks({'tagcnt': self.tagcnt});
        });

        self.maintainCntTags();
    }

    loadTagsFromStorage() {
        this.tags = this.datastorage.getArray(this.tagsDSKey);
        this.ignoredTags = this.datastorage.getArray(this.ignoredTagsDSKey);
        this.highlightedTags = this.datastorage.getArray(this.highlightedTagsDSKey);
        this.tagcnt = this.datastorage.getAlphaNumValue(this.tagcntDSKey);
        this.tagCount = this.tags.length;
        this.igCount = this.ignoredTags.length;
        this.hlCount = this.highlightedTags.length;
    }

    saveTagsToStorage() {
        this.datastorage.setArray(this.tagsDSKey, this.tags);
        this.datastorage.setArray(this.ignoredTagsDSKey, this.ignoredTags);
        this.datastorage.setArray(this.highlightedTagsDSKey, this.highlightedTags);
        this.datastorage.setItem(this.tagcntDSKey, this.tagcnt)
    }

    resetTags() {
        this.tags = [];
        this.ignoredTags = [];
        this.highlightedTags = [];

        this.tagCount = 0;
        this.igCount = 0;
        this.hlCount = 0;
    }

    changeColor() {
        if ((!this.isChanged) && ((this.tagCount != this.tags.length) || (this.igCount != this.ignoredTags.length) || (this.hlCount != this.highlightedTags.length))) {
            $('#vtp-search-bytags-form-submit').addClass('act');
            this.isChanged = true;
        }
        this.tagCount = this.tags.length;
        this.igCount = this.ignoredTags.length;
        this.hlCount = this.highlightedTags.length;
    }

    ignoreTag(tag, direction) {
        let index;
        if (direction === true) {
            index = this.tags.indexOf(tag);
            if (index > -1) {
                this.tags.splice(index, 1);
                this.ignoredTags.push(tag);
            }
            index = this.highlightedTags.indexOf(tag);
            if (index > -1) {
                this.highlightedTags.splice(index, 1);
            }
        } else if (direction === false) {
            index = this.ignoredTags.indexOf(tag);
            if (index > -1) {
                this.ignoredTags.splice(index, 1);
                this.tags.push(tag);
            }
        }
        if (direction != undefined) {
            this.maintainCntTags();
        }

        this.saveTagsToStorage();
    }

    highlightTag(tag, direction) {
        let index;
        if (direction === true) {
            index = this.tags.indexOf(tag);
            if (index > -1) {
                this.highlightedTags.push(tag);
            }
            index = this.ignoredTags.indexOf(tag);
            if (index > -1) {
                this.ignoredTags.splice(index, 1);
                this.tags.push(tag);
                this.highlightedTags.push(tag);
            }
        } else if (direction === false) {
            index = this.highlightedTags.indexOf(tag);
            if (index > -1) {
                this.highlightedTags.splice(index, 1);
            }
        }
        if (direction != undefined) {
            this.maintainCntTags();
        }

        this.saveTagsToStorage();
    }

    decorateTag(tag, isIgnore, isHighlighted) {
        if (typeof(isIgnore) === 'undefined') {
            isIgnore = false;
        }
        if (typeof(isHighlighted) === 'undefined') {
            isHighlighted = false;
        }
        let ignoredClass = (isIgnore)?(' vtp-search-bytags-tag-ignore'):('');
        let highlightedClass = (isHighlighted)?(' vtp-search-bytags-tag-bulb'):('');

        return $('<span class="vtp-search-bytags-tag ui-corner-all'+ignoredClass+highlightedClass+'"><span class="vtp-icon-tag ui-icon ui-icon-tag" onclick="vitoopApp.extendTag(event);"></span><span class="vtp-search-bytags-content" onclick="vitoopApp.extendTag(event);">'
            + tag + '</span>' +
            '<span title="in der Ergebnisliste nach oben sortieren" class="ui-icon ui-icon-lightbulb tag-icons-to-hide vtp-icon-bulb" style="display: none" onclick="vitoopApp.highlightTag(event)"></span>' +
            '<span title="Datensätze mit diesem Tag aussortieren" class="ui-icon ui-icon-cancel tag-icons-to-hide vtp-icon-cancel" style="display: none" onclick="vitoopApp.ignoreTag(event)"></span>' +
            '<span title="Tag entfernen" class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"></span>' +
            '</span>'
        );
    }

    pushTag(tag) {
        if (tag == '') {
            return;
        }
        if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
            this.decorateTag(tag, false, false).appendTo(this.tagSearchAreaId);

            this.maintainCntTags();
        }
    }

    maintainCntTags() {
        let $_options;
        this.changeColor();
        this.cnttags = this.tags.length;
        this.saveTagsToStorage();

        // show or hide the taglistbox when there are tags to show
        this.maintainTaglistbox();

        // append a new option-element or remove the (last) element with the given
        // value: if difference is 1, append or remove an element
        // otherwise renew all options e.g. for first initialization
        $_options = $('#vtp-search-bytags-tagcnt option');
        if ((($_options.length - 1) + 1 ) === this.cnttags) {
            $('<option></option>').val(this.cnttags).text(this.cnttags).appendTo('#vtp-search-bytags-tagcnt');
        } else if ((($_options.length - 1) - 1) === this.cnttags) {
            $_options.filter('[value="' + (this.cnttags + 1) + '"]').remove();
        } else {
            $('#vtp-search-bytags-tagcnt').empty();
            $('<option></option>').val(0).text('-').appendTo('#vtp-search-bytags-tagcnt');
            for (var i = 1; i <= this.cnttags; i += 1) {
                $('<option></option>').val(i).text(i).appendTo('#vtp-search-bytags-tagcnt');
            }
        }

        if ((this.cnttags === 0) && (this.ignoredTags.length > 0)) {
            $('#vtp-search-bytags-form-submit').attr("disabled", "disabled");
        } else {
            $('#vtp-search-bytags-form-submit').removeAttr("disabled");
        }

        this.tagcnt = (this.tagcnt > this.cnttags) ? this.cnttags : this.tagcnt;
        $('#vtp-search-bytags-tagcnt').val(this.tagcnt);

        let tempCount = (this.tags.length == 1)?(1):(this.tagcnt);
        resourceList.maintainResLinks({'taglist': this.tags, 'taglist_i': this.ignoredTags, 'taglist_h': this.highlightedTags, 'tagcnt': tempCount});
        if (typeof $('#vtp-search-bytags-tagcnt').selectmenu('instance') === 'undefined') {
            $('select#vtp-search-bytags-tagcnt').selectmenu();
        } else {
            $('select#vtp-search-bytags-tagcnt').selectmenu("refresh");
        }

        $('#vtp-search-bytags-form span.ui-selectmenu-button').removeAttr('tabIndex');
        $('#vtp-search-bytags-tagcnt-button').attr('title', 'Übereinstimmungen der Tags');
    }

    maintainTaglistbox(force_hide) {
        if (typeof force_hide === "undefined") {
            force_hide = false;
        }

        let displayCallback = function () {
            let rowPerPage = new RowPerPageSelect();
            rowPerPage.checkDOMState();
        };

        if (force_hide) {
            $('#vtp-search-bytags-taglistbox').hide('blind', 'fast', displayCallback);
            vitoopState.commit('updateTagListShowing', false);
            return;
        }
        if ((this.tags.length === 0) && (this.ignoredTags.length === 0) || !$(this.tagSearchFormId).is(':visible')) {
            $('#vtp-search-bytags-taglistbox').hide('blind', 'fast', displayCallback);
            vitoopState.commit('updateTagListShowing', false);
        } else {
            $('#vtp-search-bytags-taglistbox').show('blind', 'fast', displayCallback);
            vitoopState.commit('updateTagListShowing', true);
        }

    }

    updateAutocomplete (searchByTag) {
        searchByTag.autocomplete('option', 'source',vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?extended=1&ignore='+this.tags.join());
    }
}