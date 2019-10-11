'use strict';

var app = angular.module('vitoop', ['ui.tinymce', 'angucomplete', 'validation.match', 'as.sortable', 'ngScrollbars']);

app.controller('MainController', function ($scope, $http, $compile) {
    // $scope.content = '';
    // $scope.nav = {
    //     resourceInfo: '',
    //     nocontent: {}
    // };
    // $scope.$watch('nav.resourceInfo', function (resourceInfo, oldval) {
    //     $scope.nav.nocontent = {};
    //     angular.forEach(resourceInfo, function(value, resType) {
    //         if (value == 0) {
    //             $scope.nav.nocontent[resType] = true;
    //         } else {
    //             $scope.nav.nocontent[resType] = false;
    //         }
    //     });
    // }, true);
    // $scope.click = function(text, x) {
    //     //IE fix - before it user can't focus on inputs after TinyMCE was clicked
    //     setTimeout(function() {
    //         $('#vtp-search-bytags-taglist').focus();
    //         $('#vtp-search-bytags-taglist').blur();
    //     }, 1000);
    //     if (text == 'home') {
    //         location.href = vitoop.baseUrl + "userhome";
    //         return false;
    //     };
    //     if (text == 'prjhome') {
    //         $('#vtp-content').hide();
    //         setTimeout(function () {
    //             $compile(document.getElementById('prjcontroller'))($scope);
    //         }, 1000);
    //         setTimeout(function () {
    //             $('#vtp-content').show();
    //         }, 1200);
    //
    //     }
    // };
});

app.controller('PrjController', function ($scope, $http, $filter, $timeout) {
    $scope.project = {};
    $scope.message = "";
    $scope.isError = false;
    $scope.isSuccess = false;
    $scope.isLoaded = false;
    $scope.isOwner = false;
    $scope.isDeleting = false;
    $scope.tinymceOptions = window.vitoopApp.getTinyMceOptions();
    $scope.tinymceOptions.width = 800;
    $scope.tinymceOptions.height = 550;
    $scope.tinymceOptions.plugins = ['textcolor', 'link', 'media', 'resourceurl'];
    $scope.tinymceOptions.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink resourceurl';

    $scope.$watch("projectId", function(){
        $http.get(vitoop.baseUrl + 'api/project/'+$scope.projectId).success(function (data) {
            $scope.project = data.project;
            $scope.isOwner = data.isOwner;
            $timeout(function() {
                $scope.projectSheetForm.projectText.$setPristine();
                $scope.isLoaded = true;
            }, 300);
        });
    });

    $scope.delete = function() {
        if ($scope.isOwner) {
            $http.delete(vitoop.baseUrl + 'api/project/'+$scope.projectId).success(function(data) {
                if (data.success) {
                    $('#vtp-projectdata-project-close').trigger('click');
                } else {
                    $scope.isError = true;
                    $scope.message = data.message;
                }

            });
        }
    };

    $scope.save = function() {
        $http.post(vitoop.baseUrl + 'api/project/'+$scope.projectId, angular.toJson($scope.project)).success(function (data) {
            $scope.message = data.message;
            if (data.status == "success") {
                $scope.isError = false;
                angular.element('#usernames-autocomplete').isolateScope().searchStr = "";
                $scope.isSuccess = true;
                $timeout(function() {
                    $scope.isSuccess = false;
                }, 3000);
                $scope.projectSheetForm.projectText.$setPristine();
                $scope.projectDataForm.$setPristine();
            } else {
                $scope.isError = true;
            }
        });
    };

    $scope.addUser = function() {
        $http.post(vitoop.baseUrl + 'api/project/'+$scope.projectId+'/user', JSON.stringify($scope.user.originalObject)).success(function (data) {
            $scope.message = data.message;
            if (data.status == "success") {
                $scope.isError = false;
                $scope.project.project_data.rel_users.push(angular.copy(data.rel));
                angular.element('#usernames-autocomplete').isolateScope().searchStr = "";
                $scope.isSuccess = true;
                $timeout(function() {
                    $scope.isSuccess = false;
                }, 3000);
            } else {
                $scope.isError = true;
            }
        });
    };

    $scope.removeUser = function() {
        $http.delete(vitoop.baseUrl + 'api/project/'+$scope.projectId+'/user/'+$scope.user.originalObject.id).success(function (data) {
            $scope.message = data.message;
            if (data.status == "success") {
                $scope.isError = false;
                var index = $scope.project.project_data.rel_users.indexOf($filter('filter')($scope.project.project_data.rel_users, {id: data.rel.id}, true)[0]);
                $scope.project.project_data.rel_users.splice(index, 1);
                angular.element('#usernames-autocomplete').isolateScope().searchStr = "";
                $scope.isSuccess = true;
                $timeout(function() {
                    $scope.isSuccess = false;
                }, 3000);
            } else {
                $scope.isError = true;
            }
        });
    };
});
