Dropzone.autoDiscover = false;
angular.module('dropzone', []).directive('ngDropzone', function() {

    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $(el).dropzone({
                url: attrs.url,
                maxFilesize: attrs.maxsize,
                init: function() {
                    this.on('success', function(file, json) {
                    });
                    this.on('addedfile', function(file) {
                        scope.$apply(function(){
                            scope.files.push({file: 'added'});
                        });
                    });
                }
            });
        }
    }
});