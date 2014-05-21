var app = angular.module('myApp', ['dropzone', 'justifydiv']);

app.controller("AppCtrl", ['$scope', function($scope) {
    $scope.files = ['hello', 'you'];
    $scope.images = [];
    for (var i = 0; i < 50 ; i++) {
        $scope.images.push({id: i, height: 100, width: Math.round(Math.random()*300)});
    }
    console.log($scope.images);
    var app = this;
}]);