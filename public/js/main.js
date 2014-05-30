var app = angular.module('myApp', ['dropzone', 'justifydiv']);

app.controller("AppCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    $scope.files = ['hello', 'you'];
    $scope.images = [];
    for (var i = 0; i < 6 ; i++) {
        $scope.images.push({id: i, height: 100, width: Math.round(Math.random()*300)});
    }
    $timeout(function() {
        for (var i = 0; i < 6 ; i++) {
            $scope.images.push({id: i, height: 100, width: Math.round(Math.random()*300)});
        }
    }, 2000);
    var app = this;
}]);