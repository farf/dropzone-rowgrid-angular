var app = angular.module('myApp', ['dropzone']);

app.controller("AppCtrl", ['$scope', function($scope) {
    $scope.files = ['hello', 'you'];
    var app = this;
}]);