angular.module('justifydiv', []).directive('ngJustifyDiv', ['$window', '$timeout', 'linearPartition', function($window, $timeout, linearPartition) {
    this.containerHeight = 0;
    this.checkForChanges = function(el) {
        if ($(el).height() != containerHeight) {
            this.containerHeight = $(el).height();
            this.resize();
            alert('ok');
        }
        setTimeout(checkForChanges, 200);
    }.bind(this);

    this.layout = function(divs, width, height) {
        var ret = JSON.parse(JSON.stringify(divs));
        if (ret.length == 0) {
            return;
        }
        var summed_width = _.reduce(ret, (function(sum, p) {
            return sum += p.ratio * height;
        }), 0);
        var rows = Math.round(summed_width / width);
        if (rows < 1) {
            _.each(ret, function(photo, index) {
                ret[index].width = parseInt(height * photo.ratio);
                ret[index].height = height;
            });
        } else {
            weights = _.map(ret, function(p) {
                return parseInt(p.ratio * 100);
            });
            console.log('weights');
            console.log(weights);
            console.log(weights.length);
            console.log('rows');
            console.log(rows);
            partition = linearPartition.run(weights, rows);
            console.log('partition');
            console.log(partition);
            index = 0;
            _.each(partition, function(row) {
                var summed_ratios = 0;
                i = index;
                _.each(row, function(div) {
                    summed_ratios += ret[i++].ratio;
                });
                _.each(row, function(photo, i) {
                    ret[index].width = parseInt(width / summed_ratios * ret[index].ratio);
                    ret[index].height = parseInt(width / summed_ratios);
                    index ++;
                });
                return;
            });
        }
        console.log('after');
        console.log(ret);
        return ret;
    }

    this.resize = function(el, height) {
        var divs = this.getSize(el);
        var width = $(el).width();
        if (!height) {
            height = Math.round($(window).height() / 2);
        }

        var start = new Date().getTime();

        divs = this.layout(divs, width, height);

        var end = new Date().getTime();
        var time = end - start;
        console.log('execution time: ' + time);

        $(el).find('.dj-child').each(function(index, child) {
            $(child).height(divs[index].height);
            $(child).width(divs[index].width);
        });
    }

    this.getSize = function(el) {
        var divs = [];
        $(el).find('.dj-child').each(function(index, child) {
            // calculate aspect_ratio
            var ratio = parseInt($(child).attr('data-width')) / parseInt($(child).attr('data-height'));
            $(child).attr('data-ratio', ratio);
            divs.push({
                width: parseInt($(child).attr('data-width')),
                height: parseInt($(child).attr('data-height')),
                ratio: ratio
            });
        });
        return divs;
    }

    this.go = function(el, height) {
        // clean the element
        $(el).css('overflow', 'auto');
        $(el).addClass('dj-container');
        $timeout(function () {
            this.resize(el, height);
        }.bind(this), 0);
    }

    this.timerResize = 0;
    this.onResize = function(el, height) {
        if (this.timerResize != 0) {
            clearTimeout(this.timerResize);
        }
        this.timerResize = setTimeout(function() {
            this.go(el, height);
        }.bind(this), 100);
    }

    return {
        restrict: 'A',
        link: function($scope, el, attrs) {
            $scope.$watch("height",function(newValue,oldValue) {
                this.go(el, $scope.height);
            }.bind(this));
            // clean the element
            $(el).css('overflow', 'auto');
            $(el).addClass('dj-container');
            $timeout(function () {
                this.resize(el, $scope.height);
            }.bind(this), 0);

            angular.element($window).bind('resize', function() {
                this.onResize(el, $scope.height);
            });
        },
        scope: {
            height: '='
        }
    }
}]);