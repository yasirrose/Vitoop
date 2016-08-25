'use strict';

var app = angular.module('vitoop', ['ui.tinymce', 'angucomplete', 'validation.match', 'as.sortable', 'jQueryScrollbar']);

app.controller('MainController', function ($scope, $http, $compile) {
    $scope.content = '';
    $scope.nav = {
        resourceInfo: '',
        nocontent: {}
    };
    $scope.$watch('nav.resourceInfo', function (resourceInfo, oldval) {
        $scope.nav.nocontent = {};
        angular.forEach(resourceInfo, function(value, resType) {
            if (value == 0) {
                $scope.nav.nocontent[resType] = true;
            } else {
                $scope.nav.nocontent[resType] = false;
            }
        });
    }, true);
    $scope.click = function(text) {
        //IE fix - before it user can't focus on inputs after TinyMCE was clicked
        setTimeout(function() {
            $('#vtp-search-bytags-taglist').focus();
            $('#vtp-search-bytags-taglist').blur();
        }, 1000);
        if (text == 'home') {
            location.href = vitoop.baseUrl + "userhome";
            return false;
        };
        if (text == 'prjhome') {
            $('#vtp-content').hide();
            setTimeout(function () {
                $compile(document.getElementById('prjcontroller'))($scope);
            }, 1000);
            setTimeout(function () {
                $('#vtp-content').show();
            }, 1200);

        }
    };
});

app.controller('UserController', function ($scope, $http, $filter, $timeout) {
    $scope.user = {};
    $scope.user.password = "";
    $scope.user.email = "";
    $scope.message = "";
    $scope.email1 = "";
    $scope.pass1 = "";
    $scope.isError = false;
    $scope.isSuccess = false;
    $scope.isDeleting = false;

    $scope.delete = function() {
        $http.delete(vitoop.baseUrl + 'api/user/'+$scope.user.id).success(function(data) {
            if (data.success) {
                window.location = data.url;
            } else {
                $scope.isError = true;
                $scope.message = data.message;
            }

        });
    };

    $scope.save = function() {
        console.log($scope.user.email);
        if ($scope.user_email.email2.$error.match || $scope.user_password.pass2.$error.match || !$scope.userTodo.$valid || !$scope.userTodo1.$valid) {
            return false;
        }
        $http.post(vitoop.baseUrl + 'api/user/'+$scope.user.id+'/credentials', angular.toJson($scope.user)).success(function(data) {
            $scope.message = data.message;
            if (data.success) {
                $scope.user.email = "";
                $scope.user.password = "";
                $scope.email1 = "";
                $scope.pass1 = "";
                $scope.isError = false;
                $scope.isSuccess = true;
                $timeout(function() {
                    $scope.isSuccess = false;
                    window.location = '../userhome';
                }, 3000);
                $scope.user_email.$setPristine();
                $scope.user_password.$setPristine();
            } else {
                $scope.isError = true;
            }

        });
    };

});



app.controller('PrjController', function ($scope, $http, $filter, $timeout) {
    $scope.project = {};
    $scope.message = "";
    $scope.isError = false;
    $scope.isSuccess = false;
    $scope.isLoaded = false;
    $scope.isOwner = false;
    $scope.isDeleting = false;
    $scope.tinymceOptions = {
        width: 800,
        height: 550,
        plugins: 'textcolor link media resourceurl',
        menubar: false,
        skin : "vitoop",
        style_formats: [
            {title: 'p', block: 'p'},
            {title: 'h1', block: 'h1'},
            {title: 'h2', block: 'h2'},
            {title: 'h3', block: 'h3'},
            {title: 'h4', block: 'h4'},
            {title: 'h5', block: 'h5'},
            {title: 'h6', block: 'h6'}
        ],
        toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink resourceurl'
    };
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

app.controller('ToDoController', function ($scope, $http, $filter) {
    $scope.to_do_items = [];
    $scope.to_do_item = {};
    $scope.noscrollContainer = {};
    $scope.isNew = false;
    $scope.isDeleting = false;
    $scope.jqueryScrollbarOptions = {
        
    };
    
    $scope.tinymceOptions = {
        width: 550, //574 for new one button
        height: 550,
        plugins: 'textcolor link media resourceurl',
        menubar: false,
        skin : "vitoop",
        style_formats: [
            {title: 'p', block: 'p'},
            {title: 'h1', block: 'h1'},
            {title: 'h2', block: 'h2'},
            {title: 'h3', block: 'h3'},
            {title: 'h4', block: 'h4'},
            {title: 'h5', block: 'h5'},
            {title: 'h6', block: 'h6'}
        ],
        toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink resourceurl'
    };

    $scope.sortableOptions = {
        orderChanged: function(event) {
            $scope.to_do_items[event.dest.index].order += event.dest.index - event.source.index;
            $http.put('api/user/'+$scope.user.id+'/todo/'+$scope.to_do_items[event.dest.index].id, JSON.stringify($scope.to_do_items[event.dest.index]));
        },
        containment: '#noscroll-element'
    };

    $scope.$watch("user", function(){
        $http.get(vitoop.baseUrl + 'api/user/'+$scope.user.id+'/todo').success(function (data) {
            $scope.tinymceOptions.height = $scope.user.height_of_todo_list;
            console.log($scope.tinymceOptions);
            $scope.noscrollContainer.maxHeight = 33 * $scope.user.number_of_todo_elements;
            $scope.$broadcast('$tinymce:destroy');
            $scope.$broadcast('$tinymce:refresh');
            
            //jQuery('#noscroll-element').css('max-height', 33 * $scope.user.number_of_todo_elements+'px');
            $scope.to_do_items = data;
            $scope.loadItem();
        });
    });

    $scope.edit = function(id) {
        angular.copy($filter('filter')($scope.to_do_items, {id: id}, true)[0], $scope.to_do_item);
        $scope.isNew = false;
        $scope.toDoForm.$setPristine();
        $scope.toDoForm.todoText.$setPristine();
    };

    $scope.newItem = function() {
      $scope.to_do_item = {};
      $scope.to_do_item.created_at = $filter('date')(new Date(), 'dd.MM.yyyy');
      $scope.to_do_item.updated_at = $filter('date')(new Date(), 'dd.MM.yyyy');
      $scope.to_do_item.order = 0;
      $scope.isNew = true;
      $scope.isDeleting = false;
      $scope.toDoForm.$setDirty();
    };

    $scope.loadItem = function() {
        if ($scope.to_do_items.length == 0) {
            $scope.newItem();
        } else {
            angular.copy($scope.to_do_items[0], $scope.to_do_item);
            $scope.isDeleting = false;
        }
    };

    $scope.delete = function() {
        if (angular.isDefined($scope.to_do_item.id)) {
            $http.delete(vitoop.baseUrl + 'api/user/'+$scope.user.id+'/todo/'+$scope.to_do_item.id).success(function () {
                var index = $scope.to_do_items.indexOf($filter('filter')($scope.to_do_items, {id: $scope.to_do_item.id}, true)[0]);
                $scope.to_do_items.splice(index, 1);
                $scope.loadItem();
            });
        } else {
            $scope.loadItem();
        }
    };

    $scope.save = function() {
        if ($scope.isNew) {
            $http.post(vitoop.baseUrl + 'api/user/'+$scope.user.id+'/todo', JSON.stringify($scope.to_do_item)).success(function (data) {
                $scope.to_do_item.id = data.id;
                $scope.to_do_items.push(angular.copy($scope.to_do_item));
                $scope.to_do_items = $filter('orderBy')($scope.to_do_items, ['order', 'title']);
                $scope.isNew = false;
            });
        } else {
            $scope.to_do_item.updated_at = $filter('date')(new Date(), 'dd.MM.yyyy');
            $http.put('api/user/'+$scope.user.id+'/todo/'+$scope.to_do_item.id, JSON.stringify($scope.to_do_item)).success(function (data) {
                    angular.copy($scope.to_do_item, $filter('filter')($scope.to_do_items, {id: $scope.to_do_item.id}, true)[0]);
                    $scope.to_do_items = $filter('orderBy')($scope.to_do_items, ['order', 'title']);
            });
        }
        $scope.toDoForm.$setPristine();
    }
});
