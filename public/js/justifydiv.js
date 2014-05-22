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
            partition = linearPartition.run(weights, rows);
            index = 0;
            var indexLine = 0
            _.each(partition, function(row) {
                var indexInLine = 0;
                var sum_ratios_line = 0;
                i = index;
                _.each(row, function(div) {
                    sum_ratios_line += ret[i++].ratio;
                });
                var sum_ratio = 0;
                _.each(row, function(photo, i) {
                    $.extend(ret[index], {
                        // difference is a way to remove the problem of one pixel because of round to integer :)
                        newWidth : parseInt( width / sum_ratios_line * (sum_ratio + ret[index].ratio)) - parseInt( width / sum_ratios_line * sum_ratio),
                        newHeight : parseInt(width / sum_ratios_line),
                        summedRatios : sum_ratios_line,
                        line: indexLine,
                        indexInLine : indexInLine,
                        first_element_line: (indexInLine == 0 ? 1 : 0),
                        last_element_line: (indexInLine == row.length - 1 ? 1 : 0)
                    });
                    sum_ratio += ret[index].ratio;
                    index ++;
                    indexInLine ++;
                });
                indexLine ++;
                return;
            });
        }
        console.log(ret);
        return ret;
    }

    this.getWidth = function() {

    }

    this.resize = function(el, height) {
        var divs = this.getSize(el);
        var width = $(el).width();
        if (!height) {
            height = Math.round($(window).height() / 3);
        }

        var start = new Date().getTime();

        divs = this.layout(divs, width, height);

        var end = new Date().getTime();
        var time = end - start;
        console.log('execution time: ' + time);

        $(el).find('.dj-child').each(function(index, child) {
            $(child).height(divs[index].newHeight);
            $(child).width(divs[index].newWidth);
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