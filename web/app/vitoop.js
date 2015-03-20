'use strict';

var app = angular.module('vitoop', ['ui.tinymce', 'angucomplete', 'validation.match']);

app.controller('MainController', function ($scope, $http, $compile) {
    $scope.content = '';
    $scope.click = function(text) {
        if (text == 'home') {
            setTimeout(function () {
              $compile(document.getElementById('todocontroller'))($scope);
            }, 1000);
            
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
        if ($scope.user_email.email2.$error.match || $scope.user_password.pass2.$error.match || (($scope.user.email == "" || angular.isUndefined($scope.user.email)) && ($scope.user.password == "" || angular.isUndefined($scope.user.password)))) {
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
        plugins: 'textcolor link media',
        menubar: false,
        style_formats: [
            {title: 'p', block: 'p'},
            {title: 'h1', block: 'h1'},
            {title: 'h2', block: 'h2'},
            {title: 'h3', block: 'h3'},
            {title: 'h4', block: 'h4'},
            {title: 'h5', block: 'h5'},
            {title: 'h6', block: 'h6'}
        ],
        toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink '
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
    $scope.isNew = false;
    $scope.isDeleting = false;
    $scope.tinymceOptions = {
        selector: 'textarea#toDoArea',
        width: 550,
        height: 550,
        plugins: 'textcolor link media',
        menubar: false,
        style_formats: [
            {title: 'p', block: 'p'},
            {title: 'h1', block: 'h1'},
            {title: 'h2', block: 'h2'},
            {title: 'h3', block: 'h3'},
            {title: 'h4', block: 'h4'},
            {title: 'h5', block: 'h5'},
            {title: 'h6', block: 'h6'}
        ],
        toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink '
    };

    $scope.$watch("user", function(){
        $http.get(vitoop.baseUrl + 'api/user/'+$scope.user.id+'/todo').success(function (data) {
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
                $scope.to_do_items = $filter('orderBy')($scope.to_do_items, 'title');
                $scope.isNew = false;
            });
        } else {
            $scope.to_do_item.updated_at = $filter('date')(new Date(), 'dd.MM.yyyy');
            $http.post('api/user/'+$scope.user.id+'/todo/'+$scope.to_do_item.id, JSON.stringify($scope.to_do_item)).success(function (data) {
                    angular.copy($scope.to_do_item, $filter('filter')($scope.to_do_items, {id: $scope.to_do_item.id}, true)[0]);
                    $scope.to_do_items = $filter('orderBy')($scope.to_do_items, 'title');
            });
        }
        $scope.toDoForm.$setPristine();
    }
});
