'use strict';

var app = angular.module('vitoop', ['ui.tinymce']);

app.controller('MainController', function ($scope, $http, $compile) {
    $scope.content = '';
    $scope.ready = 0;
    $scope.click = function(text) {
        if (text == 'home') {
            $scope.ready = 1;
            
            setTimeout(function () {
              $compile(document.getElementById('todocontroller'))($scope);
            }, 1000);
            
        }
    };
});

app.controller('ToDoController', function ($scope, $http, $filter) {
    $scope.to_do_items = [];
    $scope.to_do_item = {};
    $scope.isNew = false;
    $scope.isDeleting = false;
    $scope.tinymceOptions = {
        width: 550,
        height: 600,
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
        $http.get('api/user/'+$scope.user.id+'/todo').success(function (data) {
            $scope.to_do_items = data;
            angular.copy($scope.to_do_items[0], $scope.to_do_item);
        });
    });

    $scope.edit = function(id) {
        angular.copy($filter('filter')($scope.to_do_items, {id: id}, true)[0], $scope.to_do_item);
        $scope.isNew = false;
    };

    $scope.newItem = function() {
      $scope.to_do_item = {};
      $scope.to_do_item.created_at = $filter('date')(new Date(), 'dd.MM.yyyy');
      $scope.to_do_item.updated_at = $filter('date')(new Date(), 'dd.MM.yyyy');
      $scope.isNew = true;
      $scope.isDeleting = false;
    };

    $scope.delete = function() {
        if (angular.isDefined($scope.to_do_item.id)) {
            $http.delete('api/user/'+$scope.user.id+'/todo/'+$scope.to_do_item.id).success(function () {
                var index = $scope.to_do_items.indexOf($filter('filter')($scope.to_do_items, {id: $scope.to_do_item.id}, true)[0]);
                $scope.to_do_items.splice(index, 1);
                $scope.newItem();
            });
        } else {
            $scope.newItem();
        }
    };

    $scope.save = function() {
        if ($scope.isNew) {
            $http.post('api/user/'+$scope.user.id+'/todo', JSON.stringify($scope.to_do_item)).success(function (data) {
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
    }
});
