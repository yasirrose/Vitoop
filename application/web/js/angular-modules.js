/**
 * Angucomplete
 * Autocomplete directive for AngularJS
 * By Daryl Rowland
 */

angular.module('angucomplete', [] )
    .directive('angucomplete', function ($parse, $http, $sce, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            "id": "@id",
            "placeholder": "@placeholder",
            "selectedObject": "=selectedobject",
            "url": "@url",
            "dataField": "@datafield",
            "titleField": "@titlefield",
            "descriptionField": "@descriptionfield",
            "imageField": "@imagefield",
            "imageUri": "@imageuri",
            "inputClass": "@inputclass",
            "userPause": "@pause",
            "localData": "=localdata",
            "searchFields": "@searchfields",
            "minLengthUser": "@minlength",
            "matchClass": "@matchclass"
        },
        template: '<div class="angucomplete-holder"><input id="{{id}}_value" ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()" /><div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching">Searching...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No results found</div><div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div ng-if="imageField" class="angucomplete-image-holder"><img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/><div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div></div><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div><div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div><div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div></div></div></div>',

        link: function($scope, elem, attrs) {
            $scope.lastSearchTerm = null;
            $scope.currentIndex = null;
            $scope.justChanged = false;
            $scope.searchTimer = null;
            $scope.hideTimer = null;
            $scope.searching = false;
            $scope.pause = 500;
            $scope.minLength = 3;
            $scope.searchStr = null;

            if ($scope.minLengthUser && $scope.minLengthUser != "") {
                $scope.minLength = $scope.minLengthUser;
            }

            if ($scope.userPause) {
                $scope.pause = $scope.userPause;
            }

            isNewSearchNeeded = function(newTerm, oldTerm) {
                return newTerm.length >= $scope.minLength && newTerm != oldTerm
            },

            $scope.processResults = function(responseData, str) {
                if (responseData && responseData.length > 0) {
                    $scope.results = [];

                    var titleFields = [];
                    if ($scope.titleField && $scope.titleField != "") {
                        titleFields = $scope.titleField.split(",");
                    }

                    for (var i = 0; i < responseData.length; i++) {
                        // Get title variables
                        var titleCode = [];

                        for (var t = 0; t < titleFields.length; t++) {
                            titleCode.push(responseData[i][titleFields[t]]);
                        }

                        var description = "";
                        if ($scope.descriptionField) {
                            description = responseData[i][$scope.descriptionField];
                        }

                        var imageUri = "";
                        if ($scope.imageUri) {
                            imageUri = $scope.imageUri;
                        }

                        var image = "";
                        if ($scope.imageField) {
                            image = imageUri + responseData[i][$scope.imageField];
                        }

                        var text = titleCode.join(' ');
                        if ($scope.matchClass) {
                            var re = new RegExp(str, 'i');
                            var strPart = text.match(re)[0];
                            text = $sce.trustAsHtml(text.replace(re, '<span class="'+ $scope.matchClass +'">'+ strPart +'</span>'));
                        }

                        var resultRow = {
                            title: text,
                            description: description,
                            image: image,
                            originalObject: responseData[i]
                        };

                        $scope.results[$scope.results.length] = resultRow;
                    }


                } else {
                    $scope.results = [];
                }
            };

            $scope.searchTimerComplete = function(str) {
                // Begin the search

                if (str.length >= $scope.minLength) {
                    if ($scope.localData) {
                        var searchFields = $scope.searchFields.split(",");

                        var matches = [];

                        for (var i = 0; i < $scope.localData.length; i++) {
                            var match = false;

                            for (var s = 0; s < searchFields.length; s++) {
                                match = match || (typeof $scope.localData[i][searchFields[s]] === 'string' && typeof str === 'string' && $scope.localData[i][searchFields[s]].toLowerCase().indexOf(str.toLowerCase()) >= 0);
                            }

                            if (match) {
                                matches[matches.length] = $scope.localData[i];
                            }
                        }

                        $scope.searching = false;
                        $scope.processResults(matches, str);

                    } else {
                        $http.get($scope.url + str, {}).
                            success(function(responseData, status, headers, config) {
                                $scope.searching = false;
                                $scope.processResults((($scope.dataField) ? responseData[$scope.dataField] : responseData ), str);
                            }).
                            error(function(data, status, headers, config) {
                                console.log("error");
                            });
                    }
                }
            };

            $scope.hideResults = function() {
                $scope.hideTimer = $timeout(function() {
                    $scope.showDropdown = false;
                }, $scope.pause);
            };

            $scope.resetHideResults = function() {
                if($scope.hideTimer) {
                    $timeout.cancel($scope.hideTimer);
                };
            };

            $scope.hoverRow = function(index) {
                $scope.currentIndex = index;
            };

            $scope.keyPressed = function(event) {
                if (!(event.which == 38 || event.which == 40 || event.which == 13)) {
                    if (!$scope.searchStr || $scope.searchStr == "") {
                        $scope.showDropdown = false;
                        $scope.lastSearchTerm = null
                    } else if (isNewSearchNeeded($scope.searchStr, $scope.lastSearchTerm)) {
                        $scope.lastSearchTerm = $scope.searchStr
                        $scope.showDropdown = true;
                        $scope.currentIndex = -1;
                        $scope.results = [];

                        if ($scope.searchTimer) {
                            $timeout.cancel($scope.searchTimer);
                        }

                        $scope.searching = true;

                        $scope.searchTimer = $timeout(function() {
                            $scope.searchTimerComplete($scope.searchStr);
                        }, $scope.pause);
                    }
                } else {
                    event.preventDefault();
                }
            };

            $scope.selectResult = function(result) {
                if ($scope.matchClass) {
                    result.title = result.title.toString().replace(/(<([^>]+)>)/ig, '');
                }
                $scope.searchStr = $scope.lastSearchTerm = result.title;
                $scope.selectedObject = result;
                $scope.showDropdown = false;
                $scope.results = [];
                //$scope.$apply();
            };

            var inputField = elem.find('input');

            inputField.on('keyup', $scope.keyPressed);

            elem.on("keyup", function (event) {
                if(event.which === 40) {
                    if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                        $scope.currentIndex ++;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                    $scope.$apply();
                } else if(event.which == 38) {
                    if ($scope.currentIndex >= 1) {
                        $scope.currentIndex --;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 13) {
                    if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                        $scope.selectResult($scope.results[$scope.currentIndex]);
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    } else {
                        $scope.results = [];
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } else if (event.which == 27) {
                    $scope.results = [];
                    $scope.showDropdown = false;
                    $scope.$apply();
                } else if (event.which == 8) {
                    $scope.selectedObject = null;
                    $scope.$apply();
                }
            });

        }
    };
});


angular.module('validation.match', []);

angular.module('validation.match').directive('match', match);

function match ($parse) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                if(console && console.warn){
                    console.warn('Match validation requires ngModel to be on the element');
                }
                return;
            }

            var matchGetter = $parse(attrs.match);

            scope.$watch(getMatchValue, function(){
                ctrl.$validate();
            });

            ctrl.$validators.match = function(){
                return ctrl.$viewValue === getMatchValue();
            };

            function getMatchValue(){
                var match = matchGetter(scope);
                if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
                    match = match.$viewValue;
                }
                return match;
            }
        }
    };
};
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce', [])
    .value('uiTinymceConfig', {})
    .directive('uiTinymce', ['uiTinymceConfig', function (uiTinymceConfig) {
        uiTinymceConfig = uiTinymceConfig || {};
        var generatedIds = 0;
        return {
            priority: 10,
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var expression, options, tinyInstance,
                    updateView = function () {
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$root.$$phase) {
                            scope.$apply();
                        }
                    };

                // generate an ID if not present
                if (!attrs.id) {
                    attrs.$set('id', 'uiTinymce' + generatedIds++);
                }

                if (attrs.uiTinymce) {
                    expression = scope.$eval(attrs.uiTinymce);
                } else {
                    expression = {};
                }

                // make config'ed setup method available
                if (expression.setup) {
                    var configSetup = expression.setup;
                    delete expression.setup;
                }

                options = {
                    // Update model when calling setContent (such as from the source editor popup)
                    setup: function (ed) {
                        var args;
                        ed.on('init', function(args) {
                            ngModel.$render();
                            ngModel.$setPristine();
                        });
                        // Update model on button click
                        ed.on('ExecCommand', function (e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on keypress
                        ed.on('KeyUp', function (e) {
                            ed.save();
                            updateView();
                        });
                        // Update model on change, i.e. copy/pasted text, plugins altering content
                        ed.on('SetContent', function (e) {
                            if (!e.initial && ngModel.$viewValue !== e.content) {
                                ed.save();
                                updateView();
                            }
                        });
                        ed.on('blur', function(e) {
                            elm.blur();
                        });
                        // Update model when an object has been resized (table, image)
                        ed.on('ObjectResized', function (e) {
                            ed.save();
                            updateView();
                        });
                        if (configSetup) {
                            configSetup(ed);
                        }
                    },
                    mode: 'exact',
                    elements: attrs.id
                };
                // extend options with initial uiTinymceConfig and options from directive attribute value
                angular.extend(options, uiTinymceConfig, expression);
                setTimeout(function () {
                    tinymce.init(options);
                });

                ngModel.$render = function() {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(attrs.id);
                    }
                    if (tinyInstance) {
                        tinyInstance.setContent(ngModel.$viewValue || '');
                    }
                };

                scope.$on('$destroy', function() {
                    if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
                    if (tinyInstance) {
                        tinyInstance.remove();
                        tinyInstance = null;
                    }
                });
            }
        };
    }]);
/**
 * jQuery CSS Customizable Scrollbar
 *
 * Copyright 2015, Yuriy Khabarov
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * If you found bug, please contact me via email <13real008@gmail.com>
 *
 * Compressed by http://jscompress.com/
 *
 * @author Yuriy Khabarov aka Gromo
 * @version 0.2.10
 * @url https://github.com/gromo/jquery.scrollbar/
 *
 */
!function(l,e){"function"==typeof define&&define.amd?define(["jquery"],e):e(l.jQuery)}(this,function(l){"use strict";function e(e){if(t.webkit&&!e)return{height:0,width:0};if(!t.data.outer){var o={border:"none","box-sizing":"content-box",height:"200px",margin:"0",padding:"0",width:"200px"};t.data.inner=l("<div>").css(l.extend({},o)),t.data.outer=l("<div>").css(l.extend({left:"-1000px",overflow:"scroll",position:"absolute",top:"-1000px"},o)).append(t.data.inner).appendTo("body")}return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)}}function o(){var l=e(!0);return!(l.height||l.width)}function s(l){var e=l.originalEvent;return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0}var r=!1,t={data:{index:0,name:"scrollbar"},macosx:/mac/i.test(navigator.platform),mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),overlay:null,scroll:null,scrolls:[],webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)};t.scrolls.add=function(l){this.remove(l).push(l)},t.scrolls.remove=function(e){for(;l.inArray(e,this)>=0;)this.splice(l.inArray(e,this),1);return this};var i={autoScrollSize:!0,autoUpdate:!0,debug:!1,disableBodyScroll:!1,duration:200,ignoreMobile:!1,ignoreOverlay:!1,scrollStep:30,showArrows:!1,stepScrolling:!0,scrollx:null,scrolly:null,onDestroy:null,onInit:null,onScroll:null,onUpdate:null},n=function(s){t.scroll||(t.overlay=o(),t.scroll=e(),a(),l(window).resize(function(){var l=!1;if(t.scroll&&(t.scroll.height||t.scroll.width)){var o=e();(o.height!==t.scroll.height||o.width!==t.scroll.width)&&(t.scroll=o,l=!0)}a(l)})),this.container=s,this.namespace=".scrollbar_"+t.data.index++,this.options=l.extend({},i,window.jQueryScrollbarOptions||{}),this.scrollTo=null,this.scrollx={},this.scrolly={},s.data(t.data.name,this),t.scrolls.add(this)};n.prototype={destroy:function(){if(this.wrapper){this.container.removeData(t.data.name),t.scrolls.remove(this);var e=this.container.scrollLeft(),o=this.container.scrollTop();this.container.insertBefore(this.wrapper).css({height:"",margin:"","max-height":""}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(e).scrollTop(o),this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),this.wrapper.remove(),l(document).add("body").off(this.namespace),l.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container])}},init:function(e){var o=this,r=this.container,i=this.containerWrapper||r,n=this.namespace,c=l.extend(this.options,e||{}),a={x:this.scrollx,y:this.scrolly},d=this.wrapper,h={scrollLeft:r.scrollLeft(),scrollTop:r.scrollTop()};if(t.mobile&&c.ignoreMobile||t.overlay&&c.ignoreOverlay||t.macosx&&!t.webkit)return!1;if(d)i.css({height:"auto","margin-bottom":-1*t.scroll.height+"px","margin-right":-1*t.scroll.width+"px","max-height":""});else{if(this.wrapper=d=l("<div>").addClass("scroll-wrapper").addClass(r.attr("class")).css("position","absolute"==r.css("position")?"absolute":"relative").insertBefore(r).append(r),r.is("textarea")&&(this.containerWrapper=i=l("<div>").insertBefore(r).append(r),d.addClass("scroll-textarea")),i.addClass("scroll-content").css({height:"auto","margin-bottom":-1*t.scroll.height+"px","margin-right":-1*t.scroll.width+"px","max-height":""}),r.on("scroll"+n,function(e){l.isFunction(c.onScroll)&&c.onScroll.call(o,{maxScroll:a.y.maxScrollOffset,scroll:r.scrollTop(),size:a.y.size,visible:a.y.visible},{maxScroll:a.x.maxScrollOffset,scroll:r.scrollLeft(),size:a.x.size,visible:a.x.visible}),a.x.isVisible&&a.x.scroll.bar.css("left",r.scrollLeft()*a.x.kx+"px"),a.y.isVisible&&a.y.scroll.bar.css("top",r.scrollTop()*a.y.kx+"px")}),d.on("scroll"+n,function(){d.scrollTop(0).scrollLeft(0)}),c.disableBodyScroll){var p=function(l){s(l)?a.y.isVisible&&a.y.mousewheel(l):a.x.isVisible&&a.x.mousewheel(l)};d.on("MozMousePixelScroll"+n,p),d.on("mousewheel"+n,p),t.mobile&&d.on("touchstart"+n,function(e){var o=e.originalEvent.touches&&e.originalEvent.touches[0]||e,s={pageX:o.pageX,pageY:o.pageY},t={left:r.scrollLeft(),top:r.scrollTop()};l(document).on("touchmove"+n,function(l){var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;r.scrollLeft(t.left+s.pageX-e.pageX),r.scrollTop(t.top+s.pageY-e.pageY),l.preventDefault()}),l(document).on("touchend"+n,function(){l(document).off(n)})})}l.isFunction(c.onInit)&&c.onInit.apply(this,[r])}l.each(a,function(e,t){var i=null,d=1,h="x"===e?"scrollLeft":"scrollTop",p=c.scrollStep,u=function(){var l=r[h]();r[h](l+p),1==d&&l+p>=f&&(l=r[h]()),-1==d&&f>=l+p&&(l=r[h]()),r[h]()==l&&i&&i()},f=0;t.scroll||(t.scroll=o._getScroll(c["scroll"+e]).addClass("scroll-"+e),c.showArrows&&t.scroll.addClass("scroll-element_arrows_visible"),t.mousewheel=function(l){if(!t.isVisible||"x"===e&&s(l))return!0;if("y"===e&&!s(l))return a.x.mousewheel(l),!0;var i=-1*l.originalEvent.wheelDelta||l.originalEvent.detail,n=t.size-t.visible-t.offset;return(i>0&&n>f||0>i&&f>0)&&(f+=i,0>f&&(f=0),f>n&&(f=n),o.scrollTo=o.scrollTo||{},o.scrollTo[h]=f,setTimeout(function(){o.scrollTo&&(r.stop().animate(o.scrollTo,240,"linear",function(){f=r[h]()}),o.scrollTo=null)},1)),l.preventDefault(),!1},t.scroll.on("MozMousePixelScroll"+n,t.mousewheel).on("mousewheel"+n,t.mousewheel).on("mouseenter"+n,function(){f=r[h]()}),t.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+n,function(s){if(1!=s.which)return!0;d=1;var n={eventOffset:s["x"===e?"pageX":"pageY"],maxScrollValue:t.size-t.visible-t.offset,scrollbarOffset:t.scroll.bar.offset()["x"===e?"left":"top"],scrollbarSize:t.scroll.bar["x"===e?"outerWidth":"outerHeight"]()},a=0,v=0;return l(this).hasClass("scroll-arrow")?(d=l(this).hasClass("scroll-arrow_more")?1:-1,p=c.scrollStep*d,f=d>0?n.maxScrollValue:0):(d=n.eventOffset>n.scrollbarOffset+n.scrollbarSize?1:n.eventOffset<n.scrollbarOffset?-1:0,p=Math.round(.75*t.visible)*d,f=n.eventOffset-n.scrollbarOffset-(c.stepScrolling?1==d?n.scrollbarSize:0:Math.round(n.scrollbarSize/2)),f=r[h]()+f/t.kx),o.scrollTo=o.scrollTo||{},o.scrollTo[h]=c.stepScrolling?r[h]()+p:f,c.stepScrolling&&(i=function(){f=r[h](),clearInterval(v),clearTimeout(a),a=0,v=0},a=setTimeout(function(){v=setInterval(u,40)},c.duration+100)),setTimeout(function(){o.scrollTo&&(r.animate(o.scrollTo,c.duration),o.scrollTo=null)},1),o._handleMouseDown(i,s)}),t.scroll.bar.on("mousedown"+n,function(s){if(1!=s.which)return!0;var i=s["x"===e?"pageX":"pageY"],c=r[h]();return t.scroll.addClass("scroll-draggable"),l(document).on("mousemove"+n,function(l){var o=parseInt((l["x"===e?"pageX":"pageY"]-i)/t.kx,10);r[h](c+o)}),o._handleMouseDown(function(){t.scroll.removeClass("scroll-draggable"),f=r[h]()},s)}))}),l.each(a,function(l,e){var o="scroll-scroll"+l+"_visible",s="x"==l?a.y:a.x;e.scroll.removeClass(o),s.scroll.removeClass(o),i.removeClass(o)}),l.each(a,function(e,o){l.extend(o,"x"==e?{offset:parseInt(r.css("left"),10)||0,size:r.prop("scrollWidth"),visible:d.width()}:{offset:parseInt(r.css("top"),10)||0,size:r.prop("scrollHeight"),visible:d.height()})}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),l.isFunction(c.onUpdate)&&c.onUpdate.apply(this,[r]),l.each(a,function(l,e){var o="x"===l?"left":"top",s="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(r.css(o),10)||0,n=e.size,a=e.visible+i,d=e.scroll.size[s]()+(parseInt(e.scroll.size.css(o),10)||0);c.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/n,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),e.scrollbarSize=e.scroll.bar[s](),e.kx=(d-e.scrollbarSize)/(n-a)||1,e.maxScrollOffset=n-a}),r.scrollLeft(h.scrollLeft).scrollTop(h.scrollTop).trigger("scroll")},_getScroll:function(e){var o={advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")};return o[e]&&(e=o[e]),e||(e=o.simple),e="string"==typeof e?l(e).appendTo(this.wrapper):l(e),l.extend(e,{bar:e.find(".scroll-bar"),size:e.find(".scroll-element_size"),track:e.find(".scroll-element_track")}),e},_handleMouseDown:function(e,o){var s=this.namespace;return l(document).on("blur"+s,function(){l(document).add("body").off(s),e&&e()}),l(document).on("dragstart"+s,function(l){return l.preventDefault(),!1}),l(document).on("mouseup"+s,function(){l(document).add("body").off(s),e&&e()}),l("body").on("selectstart"+s,function(l){return l.preventDefault(),!1}),o&&o.preventDefault(),!1},_updateScroll:function(e,o){var s=this.container,r=this.containerWrapper||s,i="scroll-scroll"+e+"_visible",n="x"===e?this.scrolly:this.scrollx,c=parseInt(this.container.css("x"===e?"left":"top"),10)||0,a=this.wrapper,d=o.size,h=o.visible+c;o.isVisible=d-h>1,o.isVisible?(o.scroll.addClass(i),n.scroll.addClass(i),r.addClass(i)):(o.scroll.removeClass(i),n.scroll.removeClass(i),r.removeClass(i)),"y"===e&&(s.is("textarea")||h>d?r.css({height:h+t.scroll.height+"px","max-height":"none"}):r.css({"max-height":h+t.scroll.height+"px"})),(o.size!=s.prop("scrollWidth")||n.size!=s.prop("scrollHeight")||o.visible!=a.width()||n.visible!=a.height()||o.offset!=(parseInt(s.css("left"),10)||0)||n.offset!=(parseInt(s.css("top"),10)||0))&&(l.extend(this.scrollx,{offset:parseInt(s.css("left"),10)||0,size:s.prop("scrollWidth"),visible:a.width()}),l.extend(this.scrolly,{offset:parseInt(s.css("top"),10)||0,size:this.container.prop("scrollHeight"),visible:a.height()}),this._updateScroll("x"===e?"y":"x",n))}};var c=n;l.fn.scrollbar=function(e,o){return"string"!=typeof e&&(o=e,e="init"),"undefined"==typeof o&&(o=[]),l.isArray(o)||(o=[o]),this.not("body, .scroll-wrapper").each(function(){var s=l(this),r=s.data(t.data.name);(r||"init"===e)&&(r||(r=new c(s)),r[e]&&r[e].apply(r,o))}),this},l.fn.scrollbar.options=i;var a=function(){var l=0,e=0;return function(o){var s,i,n,c,d,h,p;for(s=0;s<t.scrolls.length;s++)c=t.scrolls[s],i=c.container,n=c.options,d=c.wrapper,h=c.scrollx,p=c.scrolly,(o||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),n.debug&&(window.console&&console.log({scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,visibleHeight:d.height()+":"+c.scrolly.visible,visibleWidth:d.width()+":"+c.scrollx.visible},!0),e++));r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),l=setTimeout(a,300))}}();window.angular&&!function(l){l.module("jQueryScrollbar",[]).provider("jQueryScrollbar",function(){var e=i;return{setOptions:function(o){l.extend(e,o)},$get:function(){return{options:l.copy(e)}}}}).directive("jqueryScrollbar",["jQueryScrollbar","$parse",function(l,e){return{restrict:"AC",link:function(o,s,r){var t=e(r.jqueryScrollbar),i=t(o);s.scrollbar(i||l.options).on("$destroy",function(){s.scrollbar("destroy")})}}}])}(window.angular)});
/*
 ng-sortable v1.3.5
 The MIT License (MIT)

 Copyright (c) 2014 Muhammed Ashik

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/*jshint indent: 2 */
/*global angular: false */

(function () {
  'use strict';
  angular.module('as.sortable', [])
    .constant('sortableConfig', {
      itemClass: 'as-sortable-item',
      handleClass: 'as-sortable-item-handle',
      placeHolderClass: 'as-sortable-placeholder',
      dragClass: 'as-sortable-drag',
      hiddenClass: 'as-sortable-hidden',
      dragging: 'as-sortable-dragging'
    });
}());

/*jshint indent: 2 */
/*global angular: false */

(function () {
  'use strict';

  var mainModule = angular.module('as.sortable');

  /**
   * Helper factory for sortable.
   */
  mainModule.factory('$helper', ['$document', '$window',
    function ($document, $window) {
      return {

        /**
         * Get the height of an element.
         *
         * @param {Object} element Angular element.
         * @returns {String} Height
         */
        height: function (element) {
          return element[0].getBoundingClientRect().height;
        },

        /**
         * Get the width of an element.
         *
         * @param {Object} element Angular element.
         * @returns {String} Width
         */
        width: function (element) {
          return element[0].getBoundingClientRect().width;
        },

        /**
         * Get the offset values of an element.
         *
         * @param {Object} element Angular element.
         * @param {Object} [scrollableContainer] Scrollable container object for calculating relative top & left (optional, defaults to Document)
         * @returns {Object} Object with properties width, height, top and left
         */
        offset: function (element, scrollableContainer) {
          var boundingClientRect = element[0].getBoundingClientRect();
          if (!scrollableContainer) {
            scrollableContainer = $document[0].documentElement;
          }

          return {
            width: boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top: boundingClientRect.top + ($window.pageYOffset || scrollableContainer.scrollTop - scrollableContainer.offsetTop),
            left: boundingClientRect.left + ($window.pageXOffset || scrollableContainer.scrollLeft - scrollableContainer.offsetLeft)
          };
        },

        /**
         * get the event object for touch.
         *
         * @param  {Object} event the touch event
         * @return {Object} the touch event object.
         */
        eventObj: function (event) {
          var obj = event;
          if (event.targetTouches !== undefined) {
            obj = event.targetTouches.item(0);
          } else if (event.originalEvent !== undefined && event.originalEvent.targetTouches !== undefined) {
            obj = event.originalEvent.targetTouches.item(0);
          }
          return obj;
        },

        /**
         * Checks whether the touch is valid and multiple.
         *
         * @param event the event object.
         * @returns {boolean} true if touch is multiple.
         */
        isTouchInvalid: function (event) {

          var touchInvalid = false;
          if (event.touches !== undefined && event.touches.length > 1) {
            touchInvalid = true;
          } else if (event.originalEvent !== undefined &&
            event.originalEvent.touches !== undefined && event.originalEvent.touches.length > 1) {
            touchInvalid = true;
          }
          return touchInvalid;
        },

        /**
         * Get the start position of the target element according to the provided event properties.
         *
         * @param {Object} event Event
         * @param {Object} target Target element
         * @param {Object} [scrollableContainer] (optional) Scrollable container object
         * @returns {Object} Object with properties offsetX, offsetY.
         */
        positionStarted: function (event, target, scrollableContainer) {
          var pos = {};
          pos.offsetX = event.pageX - this.offset(target, scrollableContainer).left;
          pos.offsetY = event.pageY - this.offset(target, scrollableContainer).top;
          pos.startX = pos.lastX = event.pageX;
          pos.startY = pos.lastY = event.pageY;
          pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
          pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
          return pos;
        },

        /**
         * Calculates the event position and sets the direction
         * properties.
         *
         * @param pos the current position of the element.
         * @param event the move event.
         */
        calculatePosition: function (pos, event) {
          // mouse position last events
          pos.lastX = pos.nowX;
          pos.lastY = pos.nowY;

          // mouse position this events
          pos.nowX = event.pageX;
          pos.nowY = event.pageY;

          // distance mouse moved between events
          pos.distX = pos.nowX - pos.lastX;
          pos.distY = pos.nowY - pos.lastY;

          // direction mouse was moving
          pos.lastDirX = pos.dirX;
          pos.lastDirY = pos.dirY;

          // direction mouse is now moving (on both axis)
          pos.dirX = pos.distX === 0 ? 0 : pos.distX > 0 ? 1 : -1;
          pos.dirY = pos.distY === 0 ? 0 : pos.distY > 0 ? 1 : -1;

          // axis mouse is now moving on
          var newAx = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0;

          // calc distance moved on this axis (and direction)
          if (pos.dirAx !== newAx) {
            pos.distAxX = 0;
            pos.distAxY = 0;
          } else {
            pos.distAxX += Math.abs(pos.distX);
            if (pos.dirX !== 0 && pos.dirX !== pos.lastDirX) {
              pos.distAxX = 0;
            }

            pos.distAxY += Math.abs(pos.distY);
            if (pos.dirY !== 0 && pos.dirY !== pos.lastDirY) {
              pos.distAxY = 0;
            }
          }
          pos.dirAx = newAx;
        },

        /**
         * Move the position by applying style.
         *
         * @param event the event object
         * @param element - the dom element
         * @param pos - current position
         * @param container - the bounding container.
         * @param containerPositioning - absolute or relative positioning.
         * @param {Object} [scrollableContainer] (optional) Scrollable container object
         */
        movePosition: function (event, element, pos, container, containerPositioning, scrollableContainer) {
          var bounds;
          var useRelative = (containerPositioning === 'relative');

          element.x = event.pageX - pos.offsetX;
          element.y = event.pageY - pos.offsetY;

          if (container) {
            bounds = this.offset(container, scrollableContainer);

            if (useRelative) {
              // reduce positioning by bounds
              element.x -= bounds.left;
              element.y -= bounds.top;

              // reset bounds
              bounds.left = 0;
              bounds.top = 0;
            }

            if (element.x < bounds.left) {
              element.x = bounds.left;
            } else if (element.x >= bounds.width + bounds.left - this.offset(element).width) {
              element.x = bounds.width + bounds.left - this.offset(element).width;
            }
            if (element.y < bounds.top) {
              element.y = bounds.top;
            } else if (element.y >= bounds.height + bounds.top - this.offset(element).height) {
              element.y = bounds.height + bounds.top - this.offset(element).height;
            }
          }

          element.css({
            'left': element.x + 'px',
            'top': element.y + 'px'
          });

          this.calculatePosition(pos, event);
        },

        /**
         * The drag item info and functions.
         * retains the item info before and after move.
         * holds source item and target scope.
         *
         * @param item - the drag item
         * @returns {{index: *, parent: *, source: *,
                 *          sourceInfo: {index: *, itemScope: (*|.dragItem.sourceInfo.itemScope|$scope.itemScope|itemScope), sortableScope: *},
                 *         moveTo: moveTo, isSameParent: isSameParent, isOrderChanged: isOrderChanged, eventArgs: eventArgs, apply: apply}}
         */
        dragItem: function (item) {

          return {
            index: item.index(),
            parent: item.sortableScope,
            source: item,
            targetElement: null,
            targetElementOffset: null,
            sourceInfo: {
              index: item.index(),
              itemScope: item.itemScope,
              sortableScope: item.sortableScope
            },
            canMove: function(itemPosition, targetElement, targetElementOffset) {
              // return true if targetElement has been changed since last call
              if (this.targetElement !== targetElement) {
                this.targetElement = targetElement;
                this.targetElementOffset = targetElementOffset;
                return true;
              }
              // return true if mouse is moving in the last moving direction of targetElement
              if (itemPosition.dirX * (targetElementOffset.left - this.targetElementOffset.left) > 0 ||
                  itemPosition.dirY * (targetElementOffset.top - this.targetElementOffset.top) > 0) {
                this.targetElementOffset = targetElementOffset;
                return true;
              }
              // return false otherwise
              return false;
            },
            moveTo: function (parent, index) {
              // move the item to a new position
              this.parent = parent;
              // if the source item is in the same parent, the target index is after the source index and we're not cloning
              if (this.isSameParent() && this.source.index() < index && !this.sourceInfo.sortableScope.cloning) {
                index = index - 1;
              }
              this.index = index;
            },
            isSameParent: function () {
              return this.parent.element === this.sourceInfo.sortableScope.element;
            },
            isOrderChanged: function () {
              return this.index !== this.sourceInfo.index;
            },
            eventArgs: function () {
              return {
                source: this.sourceInfo,
                dest: {
                  index: this.index,
                  sortableScope: this.parent
                }
              };
            },
            apply: function () {
              if (!this.sourceInfo.sortableScope.cloning) {
                // if not cloning, remove the item from the source model.
                this.sourceInfo.sortableScope.removeItem(this.sourceInfo.index);

                // if the dragged item is not already there, insert the item. This avoids ng-repeat dupes error
                if (this.parent.options.allowDuplicates || this.parent.modelValue.indexOf(this.source.modelValue) < 0) {
                  this.parent.insertItem(this.index, this.source.modelValue);
                }
              } else if (!this.parent.options.clone) { // prevent drop inside sortables that specify options.clone = true
                // clone the model value as well
                this.parent.insertItem(this.index, angular.copy(this.source.modelValue));
              }
            }
          };
        },

        /**
         * Check the drag is not allowed for the element.
         *
         * @param element - the element to check
         * @returns {boolean} - true if drag is not allowed.
         */
        noDrag: function (element) {
          return element.attr('no-drag') !== undefined || element.attr('data-no-drag') !== undefined;
        },

        /**
         * Helper function to find the first ancestor with a given selector
         * @param el - angular element to start looking at
         * @param selector - selector to find the parent
         * @returns {Object} - Angular element of the ancestor or body if not found
         * @private
         */
        findAncestor: function (el, selector) {
          el = el[0];
          var matches = Element.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
          while ((el = el.parentElement) && !matches.call(el, selector)) {
          }
          return el ? angular.element(el) : angular.element(document.body);
        }
      };
    }
  ]);

}());

/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for Sortable.
   * @param $scope - the sortable scope.
   */
  mainModule.controller('as.sortable.sortableController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.modelValue = null; // sortable list.
    $scope.callbacks = null;
    $scope.type = 'sortable';
    $scope.options = {
      longTouch: false
    };
    $scope.isDisabled = false;

    /**
     * Inserts the item in to the sortable list.
     *
     * @param index - the item index.
     * @param itemData - the item model data.
     */
    $scope.insertItem = function (index, itemData) {
      if ($scope.options.allowDuplicates) {
        $scope.modelValue.splice(index, 0, angular.copy(itemData));
      } else {
        $scope.modelValue.splice(index, 0, itemData);
      }
    };

    /**
     * Removes the item from the sortable list.
     *
     * @param index - index to be removed.
     * @returns {*} - removed item.
     */
    $scope.removeItem = function (index) {
      var removedItem = null;
      if (index > -1) {
        removedItem = $scope.modelValue.splice(index, 1)[0];
      }
      return removedItem;
    };

    /**
     * Checks whether the sortable list is empty.
     *
     * @returns {null|*|$scope.modelValue|boolean}
     */
    $scope.isEmpty = function () {
      return ($scope.modelValue && $scope.modelValue.length === 0);
    };

    /**
     * Wrapper for the accept callback delegates to callback.
     *
     * @param sourceItemHandleScope - drag item handle scope.
     * @param destScope - sortable target scope.
     * @param destItemScope - sortable destination item scope.
     * @returns {*|boolean} - true if drop is allowed for the drag item in drop target.
     */
    $scope.accept = function (sourceItemHandleScope, destScope, destItemScope) {
      return $scope.callbacks.accept(sourceItemHandleScope, destScope, destItemScope);
    };

  }]);

  /**
   * Sortable directive - defines callbacks.
   * Parent directive for draggable and sortable items.
   * Sets modelValue, callbacks, element in scope.
   * sortOptions also includes a longTouch option which activates longTouch when set to true (default is false).
   */
  mainModule.directive('asSortable',
    function () {
      return {
        require: 'ngModel', // get a hold of NgModelController
        restrict: 'A',
        scope: true,
        controller: 'as.sortable.sortableController',
        link: function (scope, element, attrs, ngModelController) {

          var ngModel, callbacks;

          ngModel = ngModelController;

          if (!ngModel) {
            return; // do nothing if no ng-model
          }

          // Set the model value in to scope.
          ngModel.$render = function () {
            scope.modelValue = ngModel.$modelValue;
          };
          //set the element in scope to be accessed by its sub scope.
          scope.element = element;
          element.data('_scope',scope); // #144, work with angular debugInfoEnabled(false)

          callbacks = {accept: null, orderChanged: null, itemMoved: null, dragStart: null, dragMove:null, dragCancel: null, dragEnd: null};

          /**
           * Invoked to decide whether to allow drop.
           *
           * @param sourceItemHandleScope - the drag item handle scope.
           * @param destSortableScope - the drop target sortable scope.
           * @param destItemScope - the drop target item scope.
           * @returns {boolean} - true if allowed for drop.
           */
          callbacks.accept = function (sourceItemHandleScope, destSortableScope, destItemScope) {
            return true;
          };

          /**
           * Invoked when order of a drag item is changed.
           *
           * @param event - the event object.
           */
          callbacks.orderChanged = function (event) {
          };

          /**
           * Invoked when the item is moved to other sortable.
           *
           * @param event - the event object.
           */
          callbacks.itemMoved = function (event) {
          };

          /**
           * Invoked when the drag started successfully.
           *
           * @param event - the event object.
           */
          callbacks.dragStart = function (event) {
          };

          /**
           * Invoked when the drag move.
           *
           * @param itemPosition - the item position.
           * @param containment - the containment element.
           * @param eventObj - the event object.
          */
          callbacks.dragMove = angular.noop;

          /**
           * Invoked when the drag cancelled.
           *
           * @param event - the event object.
           */
          callbacks.dragCancel = function (event) {
          };

          /**
           * Invoked when the drag stopped.
           *
           * @param event - the event object.
           */
          callbacks.dragEnd = function (event) {
          };

          //Set the sortOptions callbacks else set it to default.
          scope.$watch(attrs.asSortable, function (newVal, oldVal) {
            angular.forEach(newVal, function (value, key) {
              if (callbacks[key]) {
                if (typeof value === 'function') {
                  callbacks[key] = value;
                }
              } else {
                scope.options[key] = value;
              }
            });
            scope.callbacks = callbacks;
          }, true);

          // Set isDisabled if attr is set, if undefined isDisabled = false
          if (angular.isDefined(attrs.isDisabled)) {
            scope.$watch(attrs.isDisabled, function (newVal, oldVal) {
              if (!angular.isUndefined(newVal)) {
                scope.isDisabled = newVal;
              }
            }, true);
          }
        }
      };
    });

}());

/*jshint indent: 2 */
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for sortableItemHandle
   *
   * @param $scope - item handle scope.
   */
  mainModule.controller('as.sortable.sortableItemHandleController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.itemScope = null;
    $scope.type = 'handle';
  }]);

  //Check if a node is parent to another node
  function isParent(possibleParent, elem) {
    if(!elem || elem.nodeName === 'HTML') {
      return false;
    }

    if(elem.parentNode === possibleParent) {
      return true;
    }

    return isParent(possibleParent, elem.parentNode);
  }

  /**
   * Directive for sortable item handle.
   */
  mainModule.directive('asSortableItemHandle', ['sortableConfig', '$helper', '$window', '$document', '$timeout',
    function (sortableConfig, $helper, $window, $document, $timeout) {
      return {
        require: '^asSortableItem',
        scope: true,
        restrict: 'A',
        controller: 'as.sortable.sortableItemHandleController',
        link: function (scope, element, attrs, itemController) {

          var dragElement, //drag item element.
            placeHolder, //place holder class element.
            placeElement,//hidden place element.
            itemPosition, //drag item element position.
            dragItemInfo, //drag item data.
            containment,//the drag container.
            containerPositioning, // absolute or relative positioning.
            dragListen,// drag listen event.
            scrollableContainer, //the scrollable container
            dragStart,// drag start event.
            dragMove,//drag move event.
            dragEnd,//drag end event.
            dragCancel,//drag cancel event.
            isDraggable,//is element draggable.
            placeHolderIndex,//placeholder index in items elements.
            bindDrag,//bind drag events.
            unbindDrag,//unbind drag events.
            bindEvents,//bind the drag events.
            unBindEvents,//unbind the drag events.
            hasTouch,// has touch support.
            isIOS,// is iOS device.
            longTouchStart, // long touch start event
            longTouchCancel, // cancel long touch
            longTouchTimer, // timer promise for the long touch on iOS devices
            dragHandled, //drag handled.
            createPlaceholder,//create place holder.
            isPlaceHolderPresent,//is placeholder present.
            isDisabled = false, // drag enabled
            escapeListen, // escape listen event
            isLongTouch = false; //long touch disabled.

          hasTouch = 'ontouchstart' in $window;
          isIOS = /iPad|iPhone|iPod/.test($window.navigator.userAgent) && !$window.MSStream;

          if (sortableConfig.handleClass) {
            element.addClass(sortableConfig.handleClass);
          }

          scope.itemScope = itemController.scope;
          element.data('_scope', scope); // #144, work with angular debugInfoEnabled(false)

          scope.$watchGroup(['sortableScope.isDisabled', 'sortableScope.options.longTouch'],
              function (newValues) {
            if (isDisabled !== newValues[0]) {
              isDisabled = newValues[0];
              if (isDisabled) {
                unbindDrag();
              } else {
                bindDrag();
              }
            } else if (isLongTouch !== newValues[1]) {
              isLongTouch = newValues[1];
              unbindDrag();
              bindDrag();
            } else {
              bindDrag();
            }
          });

          scope.$on('$destroy', function () {
            angular.element($document[0].body).unbind('keydown', escapeListen);
          });

          createPlaceholder = function (itemScope) {
            if (typeof scope.sortableScope.options.placeholder === 'function') {
              return angular.element(scope.sortableScope.options.placeholder(itemScope));
            } else if (typeof scope.sortableScope.options.placeholder === 'string') {
              return angular.element(scope.sortableScope.options.placeholder);
            } else {
              return angular.element($document[0].createElement(itemScope.element.prop('tagName')));
            }
          };

          /**
           * Listens for a 10px movement before
           * dragStart is called to allow for
           * a click event on the element.
           *
           * @param event - the event object.
           */
          dragListen = function (event) {

            var unbindMoveListen = function () {
              angular.element($document).unbind('mousemove', moveListen);
              angular.element($document).unbind('touchmove', moveListen);
              element.unbind('mouseup', unbindMoveListen);
              element.unbind('touchend', unbindMoveListen);
              element.unbind('touchcancel', unbindMoveListen);
            };

            var startPosition;
            var moveListen = function (e) {
              e.preventDefault();
              var eventObj = $helper.eventObj(e);
              if (!startPosition) {
                startPosition = { clientX: eventObj.clientX, clientY: eventObj.clientY };
              }
              if (Math.abs(eventObj.clientX - startPosition.clientX) + Math.abs(eventObj.clientY - startPosition.clientY) > 10) {
                unbindMoveListen();
                dragStart(event);
              }
            };

            angular.element($document).bind('mousemove', moveListen);
            angular.element($document).bind('touchmove', moveListen);
            element.bind('mouseup', unbindMoveListen);
            element.bind('touchend', unbindMoveListen);
            element.bind('touchcancel', unbindMoveListen);
            event.stopPropagation();
          };

          /**
           * Triggered when drag event starts.
           *
           * @param event the event object.
           */
          dragStart = function (event) {

            var eventObj, tagName;

            if (!hasTouch && (event.button === 2 || event.which === 3)) {
              // disable right click
              return;
            }
            if (hasTouch && $helper.isTouchInvalid(event)) {
              return;
            }
            if (dragHandled || !isDraggable(event)) {
              // event has already fired in other scope.
              return;
            }
            // Set the flag to prevent other items from inheriting the drag event
            dragHandled = true;
            event.preventDefault();
            eventObj = $helper.eventObj(event);
            scope.sortableScope = scope.sortableScope || scope.itemScope.sortableScope; //isolate directive scope issue.
            scope.callbacks = scope.callbacks || scope.itemScope.callbacks; //isolate directive scope issue.

            if (scope.itemScope.sortableScope.options.clone || (scope.itemScope.sortableScope.options.ctrlClone && event.ctrlKey)) {
                // Clone option is true
                // or Ctrl clone option is true & the ctrl key was pressed when the user innitiated drag
              scope.itemScope.sortableScope.cloning = true;
            } else {
              scope.itemScope.sortableScope.cloning = false;
            }

            // (optional) Scrollable container as reference for top & left offset calculations, defaults to Document
            scrollableContainer = angular.element($document[0].querySelector(scope.sortableScope.options.scrollableContainer)).length > 0 ?
              $document[0].querySelector(scope.sortableScope.options.scrollableContainer) : $document[0].documentElement;

            containment = (scope.sortableScope.options.containment)? $helper.findAncestor(element, scope.sortableScope.options.containment):angular.element($document[0].body);
            //capture mouse move on containment.
            containment.css('cursor', 'move');
            containment.css('cursor', '-webkit-grabbing');
            containment.css('cursor', '-moz-grabbing');
            containment.addClass('as-sortable-un-selectable');

            // container positioning
            containerPositioning = scope.sortableScope.options.containerPositioning || 'absolute';

            dragItemInfo = $helper.dragItem(scope);
            tagName = scope.itemScope.element.prop('tagName');

            dragElement = angular.element($document[0].createElement(scope.sortableScope.element.prop('tagName')))
              .addClass(scope.sortableScope.element.attr('class')).addClass(sortableConfig.dragClass);
            dragElement.css('width', $helper.width(scope.itemScope.element) + 'px');
            dragElement.css('height', $helper.height(scope.itemScope.element) + 'px');

            placeHolder = createPlaceholder(scope.itemScope)
              .addClass(sortableConfig.placeHolderClass).addClass(scope.sortableScope.options.additionalPlaceholderClass);
            placeHolder.css('width', $helper.width(scope.itemScope.element) + 'px');
            placeHolder.css('height', $helper.height(scope.itemScope.element) + 'px');

            placeElement = angular.element($document[0].createElement(tagName));
            if (sortableConfig.hiddenClass) {
              placeElement.addClass(sortableConfig.hiddenClass);
            }

            itemPosition = $helper.positionStarted(eventObj, scope.itemScope.element, scrollableContainer);

            // fill the immediate vacuum.
            if (!scope.itemScope.sortableScope.options.clone) {
              scope.itemScope.element.after(placeHolder);
            }

            if (scope.itemScope.sortableScope.cloning) {
              // clone option is enabled or triggered, so clone the element.
              dragElement.append(scope.itemScope.element.clone());
            }
            else {
              // add hidden placeholder element in original position.
              scope.itemScope.element.after(placeElement);
              // not cloning, so use the original element.
              dragElement.append(scope.itemScope.element);
            }

            containment.append(dragElement);
            $helper.movePosition(eventObj, dragElement, itemPosition, containment, containerPositioning, scrollableContainer);

            scope.sortableScope.$apply(function () {
              scope.callbacks.dragStart(dragItemInfo.eventArgs());
            });
            bindEvents();
          };

          /**
           * Allow Drag if it is a proper item-handle element.
           *
           * @param event - the event object.
           * @return boolean - true if element is draggable.
           */
          isDraggable = function (event) {

            var elementClicked, sourceScope, isDraggable;

            elementClicked = angular.element(event.target);

            // look for the handle on the current scope or parent scopes
            sourceScope = fetchScope(elementClicked);

            isDraggable = (sourceScope && sourceScope.type === 'handle');

            //If a 'no-drag' element inside item-handle if any.
            while (isDraggable && elementClicked[0] !== element[0]) {
              if ($helper.noDrag(elementClicked)) {
                isDraggable = false;
              }
              elementClicked = elementClicked.parent();
            }
            return isDraggable;
          };

          /**
           * Inserts the placeHolder in to the targetScope.
           *
           * @param targetElement the target element
           * @param targetScope the target scope
           */
          function insertBefore(targetElement, targetScope) {
            // Ensure the placeholder is visible in the target (unless it's a table row)
            if (placeHolder.css('display') !== 'table-row') {
              placeHolder.css('display', 'block');
            }
            if (!targetScope.sortableScope.options.clone) {
              targetElement[0].parentNode.insertBefore(placeHolder[0], targetElement[0]);
              dragItemInfo.moveTo(targetScope.sortableScope, targetScope.index());
            }
          }

          /**
           * Inserts the placeHolder next to the targetScope.
           *
           * @param targetElement the target element
           * @param targetScope the target scope
           */
          function insertAfter(targetElement, targetScope) {
            // Ensure the placeholder is visible in the target (unless it's a table row)
            if (placeHolder.css('display') !== 'table-row') {
              placeHolder.css('display', 'block');
            }
            if (!targetScope.sortableScope.options.clone) {
              targetElement.after(placeHolder);
              dragItemInfo.moveTo(targetScope.sortableScope, targetScope.index() + 1);
            }
          }

          /**
           * Triggered when drag is moving.
           *
           * @param event - the event object.
           */
          dragMove = function (event) {

            var eventObj, targetX, targetY, targetScope, targetElement;

            if (hasTouch && $helper.isTouchInvalid(event)) {
              return;
            }
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            if (dragElement) {

              event.preventDefault();

              eventObj = $helper.eventObj(event);

              // checking if dragMove callback exists, to prevent application
              // rerenderings on each mouse move event
              if (scope.callbacks.dragMove !== angular.noop) {
                scope.sortableScope.$apply(function () {
                  scope.callbacks.dragMove(itemPosition, containment, eventObj);
                });
              }

              targetX = eventObj.pageX - $document[0].documentElement.scrollLeft;
              targetY = eventObj.pageY - ($window.pageYOffset || $document[0].documentElement.scrollTop);

              //IE fixes: hide show element, call element from point twice to return pick correct element.
              dragElement.addClass(sortableConfig.hiddenClass);
              targetElement = angular.element($document[0].elementFromPoint(targetX, targetY));
              dragElement.removeClass(sortableConfig.hiddenClass);

              $helper.movePosition(eventObj, dragElement, itemPosition, containment, containerPositioning, scrollableContainer);

              //Set Class as dragging starts
              dragElement.addClass(sortableConfig.dragging);

              targetScope = fetchScope(targetElement);

              if (!targetScope || !targetScope.type) {
                return;
              }
              if (targetScope.type === 'handle') {
                targetScope = targetScope.itemScope;
              }
              if (targetScope.type !== 'item' && targetScope.type !== 'sortable') {
                return;
              }

              if (targetScope.type === 'item' && targetScope.accept(scope, targetScope.sortableScope, targetScope)) {
                // decide where to insert placeholder based on target element and current placeholder if is present
                targetElement = targetScope.element;

                // Fix #241 Drag and drop have trembling with blocks of different size
                var targetElementOffset = $helper.offset(targetElement, scrollableContainer);
                if (!dragItemInfo.canMove(itemPosition, targetElement, targetElementOffset)) {
                  return;
                }

                var placeholderIndex = placeHolderIndex(targetScope.sortableScope.element);
                if (placeholderIndex < 0) {
                  insertBefore(targetElement, targetScope);
                } else {
                  if (placeholderIndex <= targetScope.index()) {
                    insertAfter(targetElement, targetScope);
                  } else {
                    insertBefore(targetElement, targetScope);
                  }
                }
              }

              if (targetScope.type === 'sortable') {//sortable scope.
                if (targetScope.accept(scope, targetScope) &&
                  !isParent(targetScope.element[0], targetElement[0])) {
                  //moving over sortable bucket. not over item.
                  if (!isPlaceHolderPresent(targetElement) && !targetScope.options.clone) {
                    targetElement[0].appendChild(placeHolder[0]);
                    dragItemInfo.moveTo(targetScope, targetScope.modelValue.length);
                  }
                }
              }
            }
          };


          /**
           * Fetch scope from element or parents
           * @param  {object} element Source element
           * @return {object}         Scope, or null if not found
           */
          function fetchScope(element) {
            var scope;
            while (!scope && element.length) {
              scope = element.data('_scope');
              if (!scope) {
                element = element.parent();
              }
            }
            return scope;
          }


          /**
           * Get position of place holder among item elements in itemScope.
           * @param targetElement the target element to check with.
           * @returns {*} -1 if placeholder is not present, index if yes.
           */
          placeHolderIndex = function (targetElement) {
            var itemElements, i;
            // targetElement is placeHolder itself, return index 0
            if (targetElement.hasClass(sortableConfig.placeHolderClass)){
              return 0;
            }
            // find index in target children
            itemElements = targetElement.children();
            for (i = 0; i < itemElements.length; i += 1) {
              //TODO may not be accurate when elements contain other siblings than item elements
              //solve by adding 1 to model index of previous item element
              if (angular.element(itemElements[i]).hasClass(sortableConfig.placeHolderClass)) {
                return i;
              }
            }
            return -1;
          };


          /**
           * Check there is no place holder placed by itemScope.
           * @param targetElement the target element to check with.
           * @returns {*} true if place holder present.
           */
          isPlaceHolderPresent = function (targetElement) {
            return placeHolderIndex(targetElement) >= 0;
          };

          /**
           * Rollback the drag data changes.
           */

          function rollbackDragChanges() {
            if (!scope.itemScope.sortableScope.cloning) {
              placeElement.replaceWith(scope.itemScope.element);
            }
            placeHolder.remove();
            dragElement.remove();
            dragElement = null;
            dragHandled = false;
            containment.css('cursor', '');
            containment.removeClass('as-sortable-un-selectable');
          }

          /**
           * triggered while drag ends.
           *
           * @param event - the event object.
           */
          dragEnd = function (event) {
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            event.preventDefault();
            if (dragElement) {
              //rollback all the changes.
              rollbackDragChanges();
              // update model data
              dragItemInfo.apply();
              scope.sortableScope.$apply(function () {
                if (dragItemInfo.isSameParent()) {
                  if (dragItemInfo.isOrderChanged()) {
                    scope.callbacks.orderChanged(dragItemInfo.eventArgs());
                  }
                } else {
                  scope.callbacks.itemMoved(dragItemInfo.eventArgs());
                }
              });
              scope.sortableScope.$apply(function () {
                scope.callbacks.dragEnd(dragItemInfo.eventArgs());
              });
              dragItemInfo = null;
            }
            unBindEvents();
          };

          /**
           * triggered while drag is cancelled.
           *
           * @param event - the event object.
           */
          dragCancel = function (event) {
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            event.preventDefault();

            if (dragElement) {
              //rollback all the changes.
              rollbackDragChanges();
              scope.sortableScope.$apply(function () {
                scope.callbacks.dragCancel(dragItemInfo.eventArgs());
              });
              dragItemInfo = null;
            }
            unBindEvents();
          };

          /**
           * Binds the drag start events.
           */
          bindDrag = function () {
            if (hasTouch) {
              if (isLongTouch) {
                if (isIOS) {
                  element.bind('touchstart', longTouchStart);
                  element.bind('touchend', longTouchCancel);
                  element.bind('touchmove', longTouchCancel);
                } else {
                  element.bind('contextmenu', dragListen);
                }
              } else {
                element.bind('touchstart', dragListen);
              }
            }
            element.bind('mousedown', dragListen);
          };

          /**
           * Unbinds the drag start events.
           */
          unbindDrag = function () {
            element.unbind('touchstart', longTouchStart);
            element.unbind('touchend', longTouchCancel);
            element.unbind('touchmove', longTouchCancel);
            element.unbind('contextmenu', dragListen);
            element.unbind('touchstart', dragListen);
            element.unbind('mousedown', dragListen);
          };

          /**
           * starts a timer to detect long touch on iOS devices. If touch held for more than 500ms,
           * it would be considered as long touch.
           *
           * @param event - the event object.
           */
          longTouchStart = function(event) {
            longTouchTimer = $timeout(function() {
              dragListen(event);
            }, 500);
          };

          /**
           * cancel the long touch and its timer.
           */
          longTouchCancel = function() {
            $timeout.cancel(longTouchTimer);
          };

          //bind drag start events.
          //put in a watcher since this method is now depending on the longtouch option from sortable.sortOptions
          //bindDrag();

          //Cancel drag on escape press.
          escapeListen = function (event) {
            if (event.keyCode === 27) {
              dragCancel(event);
            }
          };
          angular.element($document[0].body).bind('keydown', escapeListen);

          /**
           * Binds the events based on the actions.
           */
          bindEvents = function () {
            angular.element($document).bind('touchmove', dragMove);
            angular.element($document).bind('touchend', dragEnd);
            angular.element($document).bind('touchcancel', dragCancel);
            angular.element($document).bind('mousemove', dragMove);
            angular.element($document).bind('mouseup', dragEnd);
          };

          /**
           * Un binds the events for drag support.
           */
          unBindEvents = function () {
            angular.element($document).unbind('touchend', dragEnd);
            angular.element($document).unbind('touchcancel', dragCancel);
            angular.element($document).unbind('touchmove', dragMove);
            angular.element($document).unbind('mouseup', dragEnd);
            angular.element($document).unbind('mousemove', dragMove);
          };
        }
      };
    }]);
}());

/*jshint indent: 2 */
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for sortable item.
   *
   * @param $scope - drag item scope
   */
  mainModule.controller('as.sortable.sortableItemController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.sortableScope = null;
    $scope.modelValue = null; // sortable item.
    $scope.type = 'item';

    /**
     * returns the index of the drag item from the sortable list.
     *
     * @returns {*} - index value.
     */
    $scope.index = function () {
      return $scope.$index;
    };

    /**
     * Returns the item model data.
     *
     * @returns {*} - item model value.
     */
    $scope.itemData = function () {
      return $scope.sortableScope.modelValue[$scope.$index];
    };

  }]);

  /**
   * sortableItem directive.
   */
  mainModule.directive('asSortableItem', ['sortableConfig',
    function (sortableConfig) {
      return {
        require: ['^asSortable', '?ngModel'],
        restrict: 'A',
        controller: 'as.sortable.sortableItemController',
        link: function (scope, element, attrs, ctrl) {
          var sortableController = ctrl[0];
          var ngModelController = ctrl[1];
          if (sortableConfig.itemClass) {
            element.addClass(sortableConfig.itemClass);
          }
          scope.sortableScope = sortableController.scope;
          if (ngModelController) {
            ngModelController.$render = function () {
              scope.modelValue = ngModelController.$modelValue;
            };
          } else {
            scope.modelValue = sortableController.scope.modelValue[scope.$index];
          }
          scope.element = element;
          element.data('_scope',scope); // #144, work with angular debugInfoEnabled(false)
        }
      };
    }]);

}());
