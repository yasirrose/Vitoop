<template>
  <transition name="slide">
    <div >
        <div v-show="get('secondSearch').show"
             id="vtp-second-search-box"
             class="dataTables_filter ui-corner-all" :class=" $store.state.secondSearch.selectedColor ">
            <div id="search_blue_box" title="Lesezeichen anzeigen">
                <select-color />
                <div v-show="/pdf|teli/.test(get('resource').type)"
                     id="search_date_range">
                    <div class="has-cross-icon">
                        <input id="search_date_from"
                               class="range-filter"
                               type="text"
                               v-model="dateFrom"
                               name="search_date_from"
                               placeholder="Datum von"
                               @keyup.enter="dateRangeSearch">
                        <i class="fa fa-times"
                           :class="{show: get('secondSearch').dateFrom}"
                           @click="dateFrom = ''"></i>
                    </div>
                    <div class="has-cross-icon">
                        <input id="search_date_to"
                               class="range-filter"
                               type="text"
                               name="search_date_to"
                               v-model="dateTo"
                               placeholder="Datum bis"
                               @keyup.enter="dateRangeSearch">
                        <i class="fa fa-times"
                           :class="{show: get('secondSearch').dateTo}"
                           @click="dateTo = ''"></i>
                    </div>
                    <button class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
                            @click="dateRangeSearch"
                            :class="{ 'ui-state-active': isDateRangeChanged }"
                            id="vtp_search_date">
                        <span class="ui-icon ui-icon-search"></span>
                        <span class="ui-button-text"></span>
                    </button>

                  <form id="vtp-search-byhrsg-form"
                        style="padding: 0 0 0 5px"
                        action=""
                        method="get"
                        novalidate="novalidate">
                        <div id="vtp-search-byhrsg-form-input-container" class="has-cross-icon">
                            <input id="vtp-search-byhrsg-hrsglist"
                                v-model="searchByHrsg"
                                name="hrsgslist[]"
                                type="text"
                                placeholder="Hrsg. suchen">
                            <i class="fa fa-times" style="padding-top: 23px;"
                            :class="{show: searchByHrsg !== null}"
                            @click="searchByHrsg = null"></i>
                        </div>
                        <div id="vtp-search-byhrsg-form-buttons">
                            <input id="vtp-search-byhrsg-restype"
                                name="restype"
                                type="hidden"
                                :value="getResource('type')"/>
                        </div>
                    </form> 

                    <form id="vtp-search-byurl-form"
                        style="padding: 0 0 0 5px"
                        action=""
                        method="get"
                        novalidate="novalidate">
                        <div id="vtp-search-byurl-form-input-container" class="has-cross-icon">
                            <input id="vtp-search-byurl-urllist"
                                v-model="searchByUrl"
                                name="urlslist[]"
                                type="text"
                                placeholder="URL suchen">
                            <i class="fa fa-times" style="padding-top: 23px;"
                            :class="{show: searchByUrl !== null}"
                            @click="searchByUrl = null"></i>
                        </div>
                        <div id="vtp-search-byurl-form-buttons">
                            <input id="vtp-search-byurl-restype"
                                name="restype"
                                type="hidden"
                                :value="getResource('type')"/>
                        </div>
                    </form>
                  
                </div>
                <div  id="art-select" >
                    <vue-select v-show="get('secondSearch').showArtSelect"
                              :options="artOptions"
                              v-model="artFilter"
                              :clearable="false">
                    </vue-select>
                </div>
            </div>
            <div id="vtp-second-search-panel" class="search-ui-button">
                    <button class="ui-button ui-state-default ui-widget ui-corner-all vtp-button"
                          id="vtp-second-search-is-read"
                          @click="isReadToggle"
                          :class="{ 'ui-state-active': $store.state.secondSearch.isReadFilter }">
                        {{ getReadButtonLabel }}
                    </button>

                <label class="has-cross-icon"
                       style="position: relative">
                    <input type="search"
                           class="vtp-second-search-input"
                           placeholder="ergebnisliste durchsuchen"
                           v-model="search"
                           aria-controls="list-link">
                    <img src="/img/loader.gif"
                         v-if="$store.state.secondSearch.isSearching"
                         class="preloader" />
                    <i class="fa fa-times"
                       :class="{ show: search.length > 0 && !$store.state.secondSearch.isSearching }"
                       @click="search = ''"></i>
                </label>
                <search-clear></search-clear>
            </div>
        </div>
        
      <div id="vtp-filterbox" style="margin: 0;">
        <div id="vtp-search-byhrsg-hrsglistbox"
            class="ui-corner-all">
                  <span class="vtp-search-byhrsg-hrsg ui-corner-all"
                        :class="{
                          'vtp-search-byhrsg-hrsg-ignore': hrsg.isIgnored,
                          'ui-state-active': hrsg.isHighlighted,
                          'vtp-search-byhrsg-hrsg-active': hrsg.extended
                        }"
                        v-for="hrsg in hrsgs"
                        :key="hrsg.publisher">
                      <span class=" ui-icon-hrsg"
                            @click="extendHrsg(hrsg,$event)">
                      </span>
                      <span class="vtp-search-byhrsg-content"
                            @click="extendHrsg(hrsg,$event)">
                          {{ hrsg.publisher }}
                      </span>
                      <span title="in der Ergebnisliste nach oben sortieren"
                            class="ui-icon ui-icon-lightbulb hrsg-icons-to-hide vtp-icon-bulb"
                            style="display: none"
                            @click="highlightHrsg(hrsg)"></span>
                      <span title="Datensätze mit diesem Tag aussortieren"
                            class="ui-icon ui-icon-cancel hrsg-icons-to-hide vtp-icon-cancel"
                            style="display: none"
                            @click="ignoreHrsg(hrsg)">
                      </span>
                      <span title="Tag entfernen"
                            class="vtp-icon-close vtp-uiaction-search-byhrsg-removehrsg ui-icon ui-icon-close"
                            @click="removeHrsg(hrsg)">
                      </span>
                  </span>
          <button id="vtp-icon-clear-hrsglistbox"
                  class="vtp-button vtp-uiaction-search-byhrsg-clear-hrsglistbox"
                  @click="removeAllHrsg">
          </button>
        </div>

        <div id="vtp-search-byurl-urllistbox"
            class="ui-corner-all">
                  <span class="vtp-search-byurl-url ui-corner-all"
                        :class="{
                          'vtp-search-byurl-url-ignore': url.isIgnored,
                          'ui-state-active': url.isHighlighted,
                          'vtp-search-byurl-url-active': url.extended
                        }"
                        v-for="url in urls"
                        :key="url.url">
                      <span class="vtp-icon-url ui-icon ui-icon-url"
                            @click="extendUrl(url,$event)">
                      </span>
                      <span class="vtp-search-byurl-content"
                            @click="extendUrl(url,$event)">
                          {{ url.url }}
                      </span>
                      <span title="in der Ergebnisliste nach oben sortieren"
                            class="ui-icon ui-icon-lightbulb url-icons-to-hide vtp-icon-bulb"
                            style="display: none"
                            @click="highlightUrl(url)"></span>
                      <span title="Datensätze mit diesem Tag aussortieren"
                            class="ui-icon ui-icon-cancel url-icons-to-hide vtp-icon-cancel"
                            style="display: none"
                            @click="ignoreUrl(url)">
                      </span>
                      <span title="Tag entfernen"
                            class="vtp-icon-close vtp-uiaction-search-byurl-removeurl ui-icon ui-icon-close"
                            @click="removeUrl(url)">
                      </span>
                  </span>
          <button id="vtp-icon-clear-urllistbox"
                  class="vtp-button vtp-uiaction-search-byurl-clear-urllistbox"
                  @click="removeAllUrl">
          </button>
        </div>

      </div>
    </div>
     
    </transition>
</template>

<script>
  import SearchClear from './SearchClear.vue';
  import {mapGetters} from 'vuex';
  import SelectColor from "../components/SelectColor.vue";
  import EventBus from "../../../app/eventBus";    
  import DataStorage from "../../../datastorage"
  import RowPerPageSelect from "../../RowPerPageSelect";

    export default {
        name: "SecondSearch",
        data: function() {
            return {
                isDateRangeChanged: false,
                artOptions: [
                    {label: 'Bücher-Auswahl', value: ''},
                    {label: 'XX', value: 'auswählen'},
                    {label: 'Sachbuch', value: 'Sachbuch'},
                    {label: 'Roman', value: 'Roman'},
                    {label: 'Essay', value: 'Essay'},
                    {label: 'Erlebnisbericht', value: 'Erlebnisbericht'},
                    {label: 'Biografie', value: 'Biografie'},
                    {label: 'Autobiografie', value: 'Autobiografie'},
                    {label: 'Thriller', value: 'Thriller'}
                ],
              active: false,
              searchByHrsg: null,
              searchByUrl: null,
              hrsgs: [],
              urls: [],
              restypeValue: '',
              ignoredHrsg: [],
              ignoredUrl: [],
              highlightedHrsg: [],
              highlightedUrl: [],
              hrsgCount: 0,
              urlCount: 0,
              igCount: 0,
              hlCount: 0,
              hrsgcnt: 0,
              urlcnt: 0,
              cnthrsgs: 0,
              cnturls: 0,
              isChanged: false,
              hrsgSearchListId: '#vtp-search-byhrsg-hrsglist',
              urlSearchListId: '#vtp-search-byurl-urllist',
              hrsgSearchAreaId: '#vtp-search-byhrsg-hrsglistbox',
              urlSearchAreaId: '#vtp-search-byurl-urllistbox',
              hrsgSearchFormId: '#vtp-search-byhrsg-form',
              urlSearchFormId: '#vtp-search-byurl-form',
              hrsgCntId: '#vtp-search-byhrsg-hrsgcnt',
              urlCntId: '#vtp-search-byurl-urlcnt',
              datastorage: new DataStorage(),
              hrsgsDSKey: 'dt-hrsgs',
              urlsDSKey: 'dt-urls',
              ignoredHrsgDSKey: 'dt-ignoredHrsg',
              ignoredUrlDSKey: 'dt-ignoredUrl',
              highlightedHrsgDSKey: 'dt-highlightedHrsg',
              highlightedUrlDSKey: 'dt-highlightedUrl',
              hrsgcntDSKey: 'dt-hrsgCnt',
              urlcntDSKey: 'dt-urlCnt',
              type: null,
            };
        },
        components: {
            SearchClear,
            SelectColor,
        },
        mounted() {
            this.init();
            this.$store.commit('setHrsg', {key: 'hrsgs', hrsgs: []});
            this.$store.commit('setUrl', {key: 'urls', urls: []});
        },
        computed: {
            ...mapGetters(['getResource','get']),
            isBlue: {
                get() {
                    return this.$store.state.secondSearch.isBlueFilter;
                },
                set(value) {
                    this.$store.commit('updateBlueFilter', value ? 1 : 0);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            search: {
                get() {
                    return this.$store.state.secondSearch.searchString;
                },
                set(value) {
                    this.$store.commit('secondSearchIsSearching', true);
                    this.$store.commit('updateSecondSearch', value);
                    vitoopApp.vtpDatatable.rowsPerPage.reloadSelect();
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            artFilter: {
                get() {
                    return this.restoreArtFilter(this.$store.state.secondSearch.artFilter);
                },
                set (artFilter) {
                    this.$store.commit('updateArtFilter', artFilter.value);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            dateFrom: {
                get() {
                    return this.$store.state.secondSearch.dateFrom;
                },
                set (value) {
                    this.isDateRangeChanged = true;
                    this.$store.commit('updateDateFrom', value);
                }
            },
            dateTo: {
                get() {
                    return this.$store.state.secondSearch.dateTo;
                },
                set (value) {
                    this.isDateRangeChanged = true;
                    this.$store.commit('updateDateTo', value);
                }
            },
            getReadButtonLabel: function () {
                if (this.$store.state.secondSearch.isReadFilter) {
                    return 'gelesen :-)';
                }

                return 'gelesen';
            }
        },
        methods: {
          removeAllHrsg(e) {
              console.log(this.$route.name);
              this.resetHrsg();
              this.cnthrsgs = 0;
              this.hrsgcnt = 0;
              this.$store.commit('set', {key: 'hrsgcnt', value: this.hrsgcnt});
              this.saveHrsgToStorage();
              this.updateAutocomplete($('#vtp-search-byhrsg-hrsglist'));
              this.maintainCntHrsg();
              this.active = false;
              this.isChanged = false;
              resourceList.loadResourceListPage(e);
          },
          removeAllUrl(e) {
              this.resetUrl();
              this.cnturls = 0;
              this.urlcnt = 0;
              this.$store.commit('set', {key: 'urlcnt', value: this.urlcnt});
              this.saveUrlToStorage();
              this.updateAutocompleteUrl($('#vtp-search-byurl-urllist'));
              this.maintainCntUrl();
              this.active = false;
              this.isChanged = false;
              resourceList.loadResourceListPage(e);
          },


        //   ----------------- 
          removeHrsg(hrsg) {
              this.hrsgs.splice(_.findIndex(this.hrsgs, hrsg), 1);
              const index_i = this.ignoredHrsg.indexOf(hrsg.publisher);
              const index_h = this.highlightedHrsg.indexOf(hrsg.publisher);

              if (index_i > -1) this.ignoredHrsg.splice(index_i, 1);
              if (index_h > -1) this.highlightedHrsg.splice(index_h, 1);

              this.$store.commit('setHrsg', {
                  key: 'hrsgs',
                  hrsgs: this.hrsgs.map(hrsg => hrsg.publisher)
              });
              console.log(this.ignoredHrsg);
              console.log(this.$route.name);

              this.$store.commit('setHrsg', {key: 'hrsgs_i', hrsgs: this.ignoredHrsg});
              this.$store.commit('setHrsg', {key: 'hrsgs_h', hrsgs: this.highlightedHrsg});

              this.updateAutocomplete($('#vtp-search-byhrsg-hrsglist'));
              this.maintainCntHrsg();
              if (this.hrsgs.length > 0)
                  EventBus.$emit('datatable:reload');
          },
          removeUrl(url) {
              
              this.urls.splice(_.findIndex(this.urls, url), 1);
              const indexx_i = this.ignoredUrl.indexOf(url.url);
              const indexx_h = this.highlightedUrl.indexOf(url.url);

              if (indexx_i > -1) this.ignoredUrl.splice(indexx_i, 1);
              if (indexx_h > -1) this.highlightedUrl.splice(indexx_h, 1);

              this.$store.commit('setUrl', {
                  key: 'urls',
                  urls: this.urls.map(url => url.url)
              });
              console.log(this.ignoredUrl);
              this.$store.commit('setUrl', {key: 'urls_i', urls: this.ignoredUrl});
              this.$store.commit('setUrl', {key: 'urls_h', urls: this.highlightedUrl});

              this.updateAutocompleteUrl($('#vtp-search-byurl-urllist'));
              this.maintainCntUrl();
              if (this.urls.length > 0)
                  EventBus.$emit('datatable:reload');
          },
        //   ------ 
          extendHrsg(hrsg,event) {
              let parent = $(event.target).parent();
              if (hrsg.extended) {
                  $('.hrsg-icons-to-hide', parent).hide(400);
                  hrsg.extended = false;
              } else {
                  hrsg.extended = true;
                  $('.hrsg-icons-to-hide', parent).show(400);
              }
          },
          extendUrl(url,event) {
              let parent = $(event.target).parent();
              if (url.extended) {
                  $('.url-icons-to-hide', parent).hide(400);
                  url.extended = false;
              } else {
                  url.extended = true;
                  $('.url-icons-to-hide', parent).show(400);
              }
          },
        //   testing 
          init() {
              this.loadHrsgFromStorage();
              this.loadUrlFromStorage();
              
              this.hrsgs.forEach(hrsg => {
                  hrsg.extended = false;
                  hrsg.isHighlighted = this.highlightedHrsg.indexOf(hrsg.publisher) !== -1;
                  hrsg.isIgnored = this.ignoredHrsg.indexOf(hrsg.publisher) !== -1;
              });
              this.urls.forEach(url => {
                  url.extended = false;
                  url.isHighlighted = this.highlightedUrl.indexOf(url.url) !== -1;
                  url.isIgnored = this.ignoredUrl.indexOf(url.url) !== -1;
              });
              $(this.hrsgCntId).val(this.hrsgcnt);
              $(this.hrsgCntId).selectmenu().selectmenu("refresh", true);
              $(this.hrsgSearchFormId).on('keypress',  function (e) {
                  if (e.keyCode == 13) {
                      // prevent submitting the form by hitting the enter key (or
                      // numpad-enter)
                      e.preventDefault();
                  }
              });
              $(this.urlCntId).val(this.urlcnt);
              $(this.urlCntId).selectmenu().selectmenu("refresh", true);
              $(this.urlSearchFormId).on('keypress', this.urlSearchListId, function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                    }
                });

              $(this.hrsgSearchFormId).on('submit', (e, secondSuccessFunc) => {
                  resourceList.loadResourceListPage(e, secondSuccessFunc);
                  this.active = false;
                  this.isChanged = false;
              }); 
              $(this.urlSearchFormId).on('submit', (e, secondSuccessFunc) => {
                  resourceList.loadResourceListPage(e, secondSuccessFunc);
                  this.active = false;
                  this.isChanged = false;
              });


              let searchByHrsg = $(this.hrsgSearchListId);
              if (searchByHrsg.length > 0) {
                let resType = 'pdf';
                searchByHrsg.autocomplete({
                    
                      source:                      
                           vitoop.baseUrl + resType  + '/' + (['hrsg', 'suggest'].join('/')) +
                          '?extended=1'+'&ignore=' +
                          this.ignoredHrsg.map(hrsg => hrsg.publisher).join() +
                          this.hrsgs.map(hrsg => hrsg.publisher).join(),
                      minLength: 1,
                      autoFocus: false,
                      select: (event, ui) => {
                          if (typeof ui != "undefined") {
                              ui.item.isHighlighted = false;
                              ui.item.isIgnored = false;
                              ui.item.extended = false;
                              $('body').addClass('overflow-hidden');
                              this.pushHrsg(ui.item);
                              event.preventDefault();
                          }
     
                          this.searchByHrsg = null;
                          this.updateAutocomplete(searchByHrsg);
                          if (this.hrsgs.length > 1) {
                              EventBus.$emit('datatable:reload');
                          }
                      },
                      response: (e, ui) => {
                          if (0 === ui.content.length) {
                              ui.content.push({cnt:"",publisher:".. das hrsg existiert nicht."});
                              return;
                          }
                          // filter already selected hrsg ui.content
                          for (let i = 0; i < ui.content.length; i += 1) {
                              if ((this.hrsgs.indexOf(ui.content[i].value) > -1)||(this.ignoredHrsg.indexOf(ui.content[i].value) > -1)) {
                                  ui.content.splice(i, 1);
                                  i -= 1;
                              }
                          }
                      }
                  }).data("ui-autocomplete")._renderItem = function(ul, item) {
                      item.label = item.publisher;
                      let span = "<div class='vtp-search-byhrsg-item'>"+item.publisher + "</div><span>"+item.cnt+"</span>";
                      if (item.cnt == "") {
                          return $("<li class='ui-state-disabled' style='margin: 0px'></li>").append(span).appendTo(ul);
                      }
                      return $("<li></li>").append(span).appendTo(ul);
                  };
              }

              let searchByUrl = $(this.urlSearchListId);
              if (searchByUrl.length > 0) {
                searchByUrl.autocomplete({
                      source:
                          vitoop.baseUrl +  (['url', 'suggest'].join('/')) +
                          '?extended=1&ignore=' +
                          this.ignoredUrl.map(url => url.url).join() +
                          this.urls.map(url => url.url).join(),
                      minLength: 1,
                      autoFocus: false,
                      select: (event, ui) => {
                          if (typeof ui != "undefined") {
                              ui.item.isHighlighted = false;
                              ui.item.isIgnored = false;
                              ui.item.extended = false;
                              $('body').addClass('overflow-hidden');
                              this.pushUrl(ui.item);
                              event.preventDefault();
                          }
                          this.searchByUrl = null;
                          this.updateAutocompleteUrl(searchByUrl);
                          if (this.urls.length > 1) {
                              EventBus.$emit('datatable:reload');
                          }
                      },
                      response: (e, ui) => {
                          if (0 === ui.content.length) {
                              ui.content.push({cnt:"",url:".. das url existiert nicht."});
                              return;
                          }
                          for (let i = 0; i < ui.content.length; i += 1) {
                              if ((this.urls.indexOf(ui.content[i].value) > -1)||(this.ignoredUrl.indexOf(ui.content[i].value) > -1)) {
                                  ui.content.splice(i, 1);
                                  i -= 1;
                              }
                          }
                      }
                  }).data("ui-autocomplete")._renderItem = function(ul, item) {
                      item.label = item.url;
                      let span = "<div class='vtp-search-byurl-item'>"+item.url + "</div><span>"+item.cnt+"</span>";
                      if (item.cnt == "") {
                          return $("<li class='ui-state-disabled' style='margin: 0px'></li>").append(span).appendTo(ul);
                      }
                      return $("<li></li>").append(span).appendTo(ul);
                  };
              }

            //   ------------ 
              $('#vtp-icon-clear-hrsglistbox').button({
                  icons: {
                      primary: 'ui-icon-close'
                  },
                  text: false
              });
              $('#vtp-icon-clear-urllistbox').button({
                  icons: {
                      primary: 'ui-icon-close'
                  },
                  text: false
              });
            //   ------- 
              $('#vtp-search-byhrsg-hrsgcnt').on('selectmenuchange', () => {
                  this.hrsgcnt = +$('#vtp-search-byhrsg-hrsgcnt').val();
                  this.active = true;
                  this.$store.commit('set', {key: 'hrsgcnt', value: this.hrsgcnt});
                  this.saveHrsgToStorage();
                  EventBus.$emit('datatable:reload');
              });

              $('#vtp-search-byurl-urlcnt').on('selectmenuchange', () => {
                  this.urlcnt = +$('#vtp-search-byurl-urlcnt').val();
                  this.active = true;
                  this.$store.commit('set', {key: 'urlcnt', value: this.urlcnt});
                  this.saveUrlToStorage();
                  EventBus.$emit('datatable:reload');
              });

            //   --------- 
              $(document).on('click', '#hrsg_search', () => {
                  var item = {};
                  $('div#vtp-hrsgbox > span').each(function(index) {
                      var text = $(this).text().trim();

                      var pos = text.search(new RegExp('\\(\\d+\\)'));
                      var cnt='';
                      if (pos > -1) {
                          cnt = text.substring(pos + 1, pos + 2).trim();
                          text = text.substring(0, pos).trim();
                      }

                      if($('#hrsg_text').val().toLowerCase() == '' || $('#hrsg_text').val().toLowerCase() == undefined)
                          return false;

                      if ((text.toLowerCase() == $('#hrsg_text').val().toLowerCase()) && text !=undefined ) {
                          item.text = text;
                          item.cnt = cnt;
                          item.label = text;
                          item.isHighlighted = false;
                          item.isIgnored = false;
                          item.extended = false;
                      }
                  });

                  
                  if(item.text != undefined){
                      this.pushHrsg(item)
                      this.searchByHrsg = null;
                      this.updateAutocomplete(searchByHrsg);
                      if (this.hrsgs.length > 1) {
                          EventBus.$emit('datatable:reload');
                      }
                      $('#hrsg_search').prop('disabled', true);
                      $('#hrsg_search').addClass('ui-button-disabled ui-state-disabled');
                      $(".vtp-uiaction-detail-previous").prop('disabled', true);
                      $(".vtp-uiaction-detail-previous").addClass('ui-button-disabled ui-state-disabled');
                      $(".vtp-uiaction-detail-next").prop('disabled', true);
                      $(".vtp-uiaction-detail-next").addClass('ui-button-disabled ui-state-disabled');
                  }
              });
              
              $(document).on('click', '#url_search', () => {
                  var item = {};
                  $('div#vtp-urlbox > span').each(function(index) {
                      var text = $(this).text().trim();

                      var pos = text.search(new RegExp('\\(\\d+\\)'));
                      var cnt='';
                      if (pos > -1) {
                          cnt = text.substring(pos + 1, pos + 2).trim();
                          text = text.substring(0, pos).trim();
                      }

                      if($('#url_text').val().toLowerCase() == '' || $('#url_text').val().toLowerCase() == undefined)
                          return false;

                      if ((text.toLowerCase() == $('#url_text').val().toLowerCase()) && text !=undefined ) {
                          item.text = text;
                          item.cnt = cnt;
                          item.label = text;
                          item.isHighlighted = false;
                          item.isIgnored = false;
                          item.extended = false;
                      }
                  });

                  
                  if(item.text != undefined){
                      this.pushUrl(item)
                      this.searchByUrl = null;
                      this.updateAutocompleteUrl(searchByUrl);
                      if (this.urls.length > 1) {
                          EventBus.$emit('datatable:reload');
                      }
                      $('#url_search').prop('disabled', true);
                      $('#url_search').addClass('ui-button-disabled ui-state-disabled');
                      $(".vtp-uiaction-detail-previous").prop('disabled', true);
                      $(".vtp-uiaction-detail-previous").addClass('ui-button-disabled ui-state-disabled');
                      $(".vtp-uiaction-detail-next").prop('disabled', true);
                      $(".vtp-uiaction-detail-next").addClass('ui-button-disabled ui-state-disabled');
                  }
              });

            //   -------- 

              this.maintainCntHrsg();
              this.maintainCntUrl();

              if (this.hrsgs.length > 0) {
                  $(this.hrsgSearchFormId).submit();
              }
              if (this.urls.length > 0) {
                  $(this.urlSearchFormId).submit();
              }
          },
          loadHrsgFromStorage() {
              this.hrsgs = this.datastorage.getArray(this.hrsgsDSKey);
              this.ignoredHrsg = this.datastorage.getArray(this.ignoredHrsgDSKey);
              this.highlightedHrsg = this.datastorage.getArray(this.highlightedHrsgDSKey);
              this.hrsgcnt = this.datastorage.getAlphaNumValue(this.hrsgcntDSKey);
              this.hrsgCount = this.hrsgs.length;
              this.igCount = this.ignoredHrsg.length;
              this.hlCount = this.highlightedHrsg.length;
          },
          loadUrlFromStorage() {
              this.urls = this.datastorage.getArray(this.urlsDSKey);
              this.ignoredUrl = this.datastorage.getArray(this.ignoredUrlDSKey);
              this.highlightedUrl = this.datastorage.getArray(this.highlightedUrlDSKey);
              this.urlcnt = this.datastorage.getAlphaNumValue(this.urlcntDSKey);
              this.urlCount = this.urls.length;
              this.igCount = this.ignoredUrl.length;
              this.hlCount = this.highlightedUrl.length;
          },
          saveHrsgToStorage() {
              this.datastorage.setArray(this.hrsgsDSKey, this.hrsgs);
              this.datastorage.setArray(this.ignoredHrsgDSKey, this.ignoredHrsg);
              this.datastorage.setArray(this.highlightedHrsgDSKey, this.highlightedHrsg);
              this.datastorage.setItem(this.hrsgcntDSKey, this.hrsgcnt)
          },
          saveUrlToStorage() {
              this.datastorage.setArray(this.urlsDSKey, this.urls);
              this.datastorage.setArray(this.ignoredUrlDSKey, this.ignoredUrl);
              this.datastorage.setArray(this.highlightedUrlDSKey, this.highlightedUrl);
              this.datastorage.setItem(this.urlcntDSKey, this.urlcnt)
          },
        //   end testing 
          resetHrsg() {
              this.hrsgs = [];
              this.ignoredHrsg = [];
              this.highlightedHrsg = [];

              this.$store.commit('setHrsg', {key: 'hrsgs', hrsgs: []});
              this.$store.commit('setHrsg', {key: 'hrsgs_i', hrsgs: []});
              this.$store.commit('setHrsg', {key: 'hrsgs_h', hrsgs: []});

              this.hrsgCount = 0;
              this.igCount = 0;
              this.hlCount = 0;
          },
          resetUrl() {
              this.urls = [];
              this.ignoredUrl = [];
              this.highlightedUrl = [];

              this.$store.commit('setUrl', {key: 'urls', urls: []});
              this.$store.commit('setUrl', {key: 'urls_i', urls: []});
              this.$store.commit('setUrl', {key: 'urls_h', urls: []});

              this.urlCount = 0;
              this.igCount = 0;
              this.hlCount = 0;
          },
        //   --------- 
          changeColor() {
              if ((!this.isChanged) && ((this.hrsgCount != this.hrsgs.length) || (this.igCount != this.ignoredHrsg.length) || (this.hlCount != this.highlightedHrsg.length))) {
                  this.active = true;
                  this.isChanged = true;
              }
              this.hrsgCount = this.hrsgs.length;
              this.igCount = this.ignoredHrsg.length;
              this.hlCount = this.highlightedHrsg.length;
          },
          changeColorUrl() {
              if ((!this.isChanged) && ((this.hrsgCount != this.urls.length) || (this.igCount != this.ignoredHrsg.length) || (this.hlCount != this.highlightedHrsg.length))) {
                  this.active = true;
                  this.isChanged = true;
              }
              this.urlCount = this.urls.length;
              this.igCount = this.ignoredUrl.length;
              this.hlCount = this.highlightedUrl.length;
          },

        //   -------------- 
          ignoreHrsg(hrsg) {
              hrsg.isIgnored = !hrsg.isIgnored;
              hrsg.isIgnored ? this.ignoredHrsg.push(hrsg.publisher) : this.ignoredHrsg.splice(_.findIndex(this.hrsgs, hrsg.publisher), 1);
              this.maintainCntHrsg();
              this.saveHrsgToStorage();
              this.$store.commit('setHrsg', {
                  key: 'hrsgs',
                  hrsgs: this.hrsgs.filter(hrsg => !hrsg.isIgnored).map(hrsg => hrsg.publisher)
              });
              this.$store.commit('setHrsg', {key: 'hrsgs_i', hrsgs: this.ignoredHrsg});
              this.changeColor();
              EventBus.$emit('datatable:reload');
          },
          
          ignoreUrl(url) {
              url.isIgnored = !url.isIgnored;
              url.isIgnored ? this.ignoredUrl.push(url.url) : this.ignoredUrl.splice(_.findIndex(this.urls, url.url), 1);
              this.maintainCntUrl();
              this.saveUrlToStorage();
              this.$store.commit('setUrl', {
                  key: 'urls',
                  urls: this.urls.filter(url => !url.isIgnored).map(url => url.url)
              });
              console.log('ignore url ' , url);
              this.$store.commit('setUrl', {key: 'urls_i', urls: this.ignoredUrl});
              this.changeColorUrl();
              EventBus.$emit('datatable:reload');
          },
        //   -------------- 
          highlightHrsg(hrsg) {
              hrsg.isHighlighted = !hrsg.isHighlighted;
              hrsg.isHighlighted ? this.highlightedHrsg.push(hrsg.publisher) : this.highlightedHrsg.splice(_.findIndex(this.hrsgs, hrsg.publisher), 1);
              this.maintainCntHrsg();
              this.saveHrsgToStorage();
              this.$store.commit('setHrsg', {key: 'hrsgs_h', hrsgs: this.highlightedHrsg});
              this.changeColor();
              EventBus.$emit('datatable:reload');
          },
          highlightUrl(url) {
              url.isHighlighted = !url.isHighlighted;
              url.isHighlighted ? this.highlightedUrl.push(url.url) : this.highlightedUrl.splice(_.findIndex(this.urls, url.url), 1);
              this.maintainCntUrl();
              this.saveUrlToStorage();
              this.$store.commit('setUrl', {key: 'urls_h', urls: this.highlightedUrl});
              this.changeColorUrl();
              EventBus.$emit('datatable:reload');
          },
        //   ------------------ 
          pushHrsg(hrsg) {
              if (hrsg == '') {
                  return;
              }
              if (this.hrsgs.indexOf(hrsg) === -1) {
                  this.hrsgs.push(hrsg);
                  this.$store.commit('setHrsg', {
                      key: 'hrsgs',
                      hrsgs: this.hrsgs.filter(hrsg => !hrsg.isIgnored).map(hrsg => hrsg.publisher)
                  });
                  this.maintainCntHrsg();
              }
          },
          pushUrl(url) {
                if (url === '') {
                    return;
                }
                if (this.urls.indexOf(url) === -1) {
                    this.urls.push(url);
                    this.$store.commit('setUrl', {
                        key: 'urls',
                        urls: this.urls.filter(url => !url.isIgnored).map(url => url.url)
                    });
                    this.maintainCntUrl();
                }
            },

        //   -------------------- 
          maintainCntHrsg() {
              let $_options;
              this.cnthrsgs = this.hrsgs.length;
              this.saveHrsgToStorage();
              this.maintainHrsglistbox();

              $_options = $('#vtp-search-byhrsg-hrsgcnt option');
              if ((($_options.length - 1) + 1 ) === this.cnthrsgs) {
                  $('<option></option>').val(this.cnthrsgs).text(this.cnthrsgs).appendTo('#vtp-search-byhrsg-hrsgcnt');
              } else if ((($_options.length - 1) - 1) === this.cnthrsgs) {
                  $_options.filter('[value="' + (this.cnthrsgs + 1) + '"]').remove();
              } else {
                  $('#vtp-search-byhrsg-hrsgcnt').empty();
                  $('<option></option>').val(0).text('-').appendTo('#vtp-search-byhrsg-hrsgcnt');
                  for (var i = 1; i <= this.cnthrsgs; i += 1) {
                      $('<option></option>').val(i).text(i).appendTo('#vtp-search-byhrsg-hrsgcnt');
                  }
              }

              if ((this.cnthrsgs === 0) && (this.ignoredHrsg.length > 0)) {
                  // $('#vtp-search-byhrsg-form-submit').attr("disabled", "disabled");
              } else {
                  // $('#vtp-search-byhrsg-form-submit').removeAttr("disabled");
              }

              this.hrsgcnt = (this.hrsgcnt > this.cnthrsgs) ? this.cnthrsgs : this.hrsgcnt;
              $('#vtp-search-byhrsg-hrsgcnt').val(this.hrsgcnt);

              let tempCount = (this.hrsgs.length == 1)?(1):(this.hrsgcnt);
              if (typeof $('#vtp-search-byhrsg-hrsgcnt').selectmenu('instance') === 'undefined') {
                  $('select#vtp-search-byhrsg-hrsgcnt').selectmenu();
              } else {
                  $('select#vtp-search-byhrsg-hrsgcnt').selectmenu("refresh");
              }

              $('#vtp-search-byhrsg-form span.ui-selectmenu-button').removeAttr('tabIndex');
              $('#vtp-search-byhrsg-hrsgcnt-button').attr('title', 'Übereinstimmungen der Hrsg');
          },  
          maintainCntUrl() {
              let $_options;
              this.cnturls = this.urls.length;
              this.saveUrlToStorage();
              this.maintainUrllistbox();

              $_options = $('#vtp-search-byurl-urlcnt option');
              if ((($_options.length - 1) + 1 ) === this.cnturls) {
                  $('<option></option>').val(this.cnturls).text(this.cnturls).appendTo('#vtp-search-byurl-urlcnt');
              } else if ((($_options.length - 1) - 1) === this.cnturls) {
                  $_options.filter('[value="' + (this.cnturls + 1) + '"]').remove();
              } else {
                  $('#vtp-search-byurl-urlcnt').empty();
                  $('<option></option>').val(0).text('-').appendTo('#vtp-search-byurl-urlcnt');
                  for (var i = 1; i <= this.cnturls; i += 1) {
                      $('<option></option>').val(i).text(i).appendTo('#vtp-search-byurl-urlcnt');
                  }
              }

              if ((this.cnturls === 0) && (this.ignoredUrl.length > 0)) {
                  // $('#vtp-search-byhrsg-form-submit').attr("disabled", "disabled");
              } else {
                  // $('#vtp-search-byhrsg-form-submit').removeAttr("disabled");
              }

              this.urlcnt = (this.urlcnt > this.cnturls) ? this.cnturls : this.urlcnt;
              $('#vtp-search-byurl-urlcnt').val(this.hrsgcnt);

              let tempCount = (this.urls.length == 1)?(1):(this.hrsgcnt);
              if (typeof $('#vtp-search-byurl-urlcnt').selectmenu('instance') === 'undefined') {
                  $('select#vtp-search-byurl-urlcnt').selectmenu();
              } else {
                  $('select#vtp-search-byurl-urlcnt').selectmenu("refresh");
              }

              $('#vtp-search-byurl-form span.ui-selectmenu-button').removeAttr('tabIndex');
              $('#vtp-search-byurl-urlcnt-button').attr('title', 'Übereinstimmungen der URL');
          },
        //   ---------------- 
          maintainHrsglistbox(force_hide) {
              if (typeof force_hide === "undefined") {
                  force_hide = false;
              }

              let displayCallback = function () {
                  let rowPerPage = new RowPerPageSelect();
                  rowPerPage.reloadSelect();
              };

              if (force_hide) {
                  $('#vtp-search-byhrsg-hrsglistbox').hide('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', false);
                  return;
              }
              if ((this.hrsgs.length === 0) && (this.ignoredHrsg.length === 0) || !$(this.hrsgSearchFormId).is(':visible')) {
                  $('#vtp-search-byhrsg-hrsglistbox').hide('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', false);
              } else {
                  $('#vtp-search-byhrsg-hrsglistbox').show('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', true);
              }

          }, 
          maintainUrllistbox(force_hide) {
              if (typeof force_hide === "undefined") {
                  force_hide = false;
              }

              let displayCallback = function () {
                  let rowPerPage = new RowPerPageSelect();
                  rowPerPage.reloadSelect();
              };

              if (force_hide) {
                  $('#vtp-search-byurl-urllistbox').hide('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', false);
                  return;
              }

              if ((this.urls.length === 0) && (this.ignoredUrl.length === 0) || !$(this.urlSearchFormId).is(':visible')) {
                  $('#vtp-search-byurl-urllistbox').hide('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', false);
              } else {
                  $('#vtp-search-byurl-urllistbox').show('blind', 'fast', displayCallback);
                  vitoopState.commit('updateTagListShowing', true);
              }

          },
        //   ---------------- 
            updateAutocomplete(searchByHrsg) {
                console.log(this.$route.name);
                searchByHrsg.autocomplete(
                    'option',
                    'source',
                    vitoop.baseUrl + (['hrsg', 'suggest'].join('/')) +
                    '?extended=1&ignore=' +
                    this.ignoredHrsg.map(hrsg => hrsg.publisher).join() +
                    this.hrsgs.map(hrsg => hrsg.publisher).join()
                );
            },
            updateAutocompleteUrl(searchByUrl) {
                searchByUrl.autocomplete(
                    'option',
                    'source',
                    vitoop.baseUrl + (['url', 'suggest'].join('/')) +
                    '?extended=1&ignore=' +
                    this.ignoredUrl.map(url => url.url).join() +
                    this.urls.map(url => url.url).join()
                );
            },
            isReadToggle() {
                this.$store.commit('updateReadFilter', !this.$store.state.secondSearch.isReadFilter ? 1 : 0);
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            },
            getLabelForArtFilterOption(value) {
                for (let i = 0; i < this.artOptions.length; i++) {
                    if (this.artOptions[i].value == value) {
                        return this.artOptions[i].label;
                    }
                }

                return '';
            },
            restoreArtFilter(value) {
                let filter = {
                    value: '',
                    label: ''
                };
                filter.value = value;
                filter.label = this.getLabelForArtFilterOption(value);

                return filter;
            },
            dateRangeSearch () {
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                this.isDateRangeChanged = false;
            },
        }
    }
</script>

<style lang="scss">
  .ui-menu-item {
      display: flex !important;
      box-sizing: border-box;

      &.ui-state-focus {
          width: 100% !important;
      }

      .vtp-search-byhrsg-item,
      .vtp-search-byurl-item {
          flex: 1;
          width: auto !important;
      }
  }
</style>

<style lang="scss" scoped>

#vtp-filterbox {
      margin-top: 2px;
      margin-left: -700px;
  }

  #vtp-search-byhrsg-hrsglistbox {
      display: flex;
      padding-right: 45px;
      flex-wrap: wrap;

      .vtp-search-byhrsg-hrsg {
          transition: .3s;
          display: flex;
          align-items: center;
      }
  }
  #vtp-search-byurl-urllistbox {
      display: flex;
      padding-right: 45px;
      flex-wrap: wrap;

      .vtp-search-byurl-url {
          transition: .3s;
          display: flex;
          align-items: center;
      }
  }


  .translate {

      &-enter {
          width: 0 !important;
          transform: scale(.3) !important;
          opacity: .3;

          &-to {
              /*width: 62px !important;*/
              transform: scale(1) !important;
              opacity: 1 !important;
          }

          &-active {
              transition: .3s !important;
          }
      }

      &-leave {
          /*width: 62px !important;*/
          transform: scale(1) !important;
          opacity: 1 !important;

          &-to {
              width: 0 !important;
              transform: scale(.3) !important;
              opacity: .3;
          }

          &-active {
              transition: .3s !important;
          }
      }
  }

$vitoop-body-background-color: #cfe7f7;
$table-row-height: 25px;

.preloader {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 16px;
  transform: translateY(-50%);
}

.vtp-blue {
  background: #7bc0f6; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #7bc0f6 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #7bc0f6 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #7bc0f6 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #7bc0f6 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-gray {
  background: #4e4d4d; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #4e4d4d , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #4e4d4d , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #4e4d4d , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #4e4d4d , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-cyan {
  background: #8feeee; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #8feeee , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #8feeee , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-lime {
  background: #87ee87; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #87ee87 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #87ee87 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-yellow {
  background: #f5f568; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #f5f568 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #f5f568 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-red {
  background: #f39090; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #f39090, $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #f39090 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #f39090 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #f39090 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

#vtp-second-search-is-read{
  height: 22px;
  padding: 0px 15px;
  font-size: 90%;
  margin-right: 4px;
  display: flex;
  align-items: center;
  line-height: 1.3;
}


#vtp-second-search-box{
  height: 29px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s;
}

:deep(#vtp-second-search-box) {
  height: 24px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s;

  .dropdown {
    &.v-select {
      width: 200px;
      margin-left: 125px
    }
  }

  .dropdown-toggle {
    height: 22px;
    font-size: 13px;
    padding: 0px !important;

    .selected-hrsg {
      color: #2779aa;
    }
  }
}

:deep(#vtp-second-search-box) .colorDropdown {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s;

  .dropdown {
    &.v-select {
      width: 200px;
      margin-left: 125px
    }
  }

  .dropdown-toggle {
    height: 18px;
    font-size: 13px;
    padding: 0px !important;

    .selected-hrsg {
      color: #2779aa;
      margin-top: -4px;
    }
  }
}

#vtp-second-search-panel {
  padding: 1px;
  display: flex;
  align-items: center;
}

.vtp-second-search-input {
  width: 220px;
  font-size: 13px;
  padding-left: 15px;
}

#search_date_range {
  margin-left: 7px;
  display: flex;
  align-items: center;

  input {
    margin-top: 0px;
    margin: 0;
    margin-right: 4px;
    width: 130px;
    vertical-align: baseline;
    font-size: 13px;
  }
  label {
    vertical-align: baseline;
  }

  #vtp_search_date {
    height: 22px;
  }
}

#search_blue_box {
  height: $table-row-height;
  padding-right: 20px;
  padding-left: 10px;
  display: flex;
  align-items: center;
}

#search_blue {
  margin: 4px 2px 4px;
  position: relative;
  width: 14px;
  height: 16px;
  border: 1px solid #111;
  background: #fff;
  -moz-appearance: checkbox;
  -webkit-appearance: checkbox;
  /*-webkit-appearance: none;*/
  appearance: none;
}
#art-select .v-select {width: 180px;}

div#art-select{
    margin-left: 0;
}
#vtp-search-byhrsg-hrsglistbox,
#vtp-search-byurl-urllistbox
{
    padding: 2px 8px;
}
button#vtp-icon-clear-hrsglistbox,
button#vtp-icon-clear-urllistbox {
    margin-left: auto;
}
.vtp-second-search-input{
    width: 175px;
}
#vtp-second-search #search_blue_box{
    padding-right: 0;
}
#search_date_range input{
    width: 120px;
}

</style>
