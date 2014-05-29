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

        // Get the ideal number of rows
        var summed_width = _.reduce(ret, (function(sum, p) {
            return sum += p.ratio * height;
        }), 0);

        var rows = Math.round(summed_width / width);

        //Manage the big number of pictures. The algo become too slow with many pictures.
        var NB_MAX = 10;
        var newret = [];
        if (rows > NB_MAX) {
            // repartition of the divs in batch
            var numberDivsByRow = Math.floor(divs.length / (Math.floor(rows/NB_MAX)));
            var batchs = [];
            var i = 0
            while (ret.length > 0) {
                if (i==0) {
                    batchs.push([]);
                }
                var batch = batchs[batchs.length-1];
                batch.push(ret.shift());
                i ++;
                if (i == numberDivsByRow || ret.length == 0) {
                    newret = newret.concat(this.layoutOneBatch(batch, width, height));
                    i = 0;
                }
            }

        } else {
            newret = this.layoutOneBatch(ret, width, height);
        }
        return newret;
    }

    this.layoutOneBatch = function(divs, width, height) {
        var ret = JSON.parse(JSON.stringify(divs));
        if (ret.length == 0) {
            return;
        }

        // Get the ideal number of rows
        var summed_width = _.reduce(ret, (function(sum, p) {
            return sum += p.ratio * height;
        }), 0);
        var rows = Math.round(summed_width / width);

        // Manage the case when it is 1
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
                var innerWidth = width;
                i = index;
                _.each(row, function(div) {
                    sum_ratios_line += ret[i].ratio;
                    innerWidth -= ret[i].outerWidth - ret[i].width;
                    i++;
                });
                var sum_ratio = 0;
                _.each(row, function(photo, i) {
                    $.extend(ret[index], {
                        // difference is a way to remove the problem of one pixel because of round to integer :)
                        newWidth : parseInt( innerWidth / sum_ratios_line * (sum_ratio + ret[index].ratio))
                                    - parseInt( innerWidth / sum_ratios_line * sum_ratio),
                        newHeight : parseInt(innerWidth / sum_ratios_line),
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
        return ret;

    }

    // Change the size of the children div
    this.resize = function(el, height) {
        var divs = this.getSize(el);
        var width = $(el).width();
        if (!height) {
            height = Math.round($(window).height() / 3);
        }

        var start = new Date().getTime();

        // launch the algo
        divs = this.layout(divs, width, height);

        // log the execution time
        var end = new Date().getTime();
        var time = end - start;
        console.log('execution time: ' + time);

        // resize the div
        $(el).find('.dj-child-container').each(function(index, child) {
            if ($(child).is('.dj-child')) {
                var djChild = child;
            } else {
                var djChild = $(child).find('.dj-child:first')[0];
            }
            if (typeof divs[index] == 'undefined') {
                alert('ok');
            }
            $(djChild).height(divs[index].newHeight);
            $(djChild).width(divs[index].newWidth);
            $(child).css('opacity', 1);
        });
    }

    // return the data for the algo: size of the div, ratio...
    this.getSize = function(el) {
        var divs = [];
        $(el).find('.dj-child-container').each(function(index, child) {
            if ($(child).is('.dj-child')) {
                var djChild = child;
            } else {
                var djChild = $(child).find('.dj-child:first')[0];
            }
            $(child).css('opacity', 0);
            // calculate aspect_ratio
            var width = $(child).width();
            var outerWidth = $(djChild).outerWidth(true);
            var height = $(child).height();
            var outerHeight = $(djChild).outerHeight(true);
            var ratio = width / height;
            $(child).attr('data-ratio', ratio);
            divs.push({
                width: width,
                outerWidth: outerWidth,
                outerHeight: outerHeight,
                height: height,
                ratio: ratio
            });
        });

        return divs;
    }

    this.init = function(el, height) {
        // clean the element
        $(el).css('overflow', 'auto');
        $(el).addClass('dj-container');
        $(el).width('auto');
        $(el).width($(el).width());
        $timeout(function () {
            this.resize(el, height);
        }.bind(this), 0);
    }

    // Manage the browser resize:
    this.timerResize = 0;
    this.onResize = function(el, height) {
        if (this.timerResize != 0) {
            clearTimeout(this.timerResize);
        }
        this.timerResize = setTimeout(function() {
            this.init(el, height);
        }.bind(this), 50);
    }

    return {
        restrict: 'A',
        link: function($scope, el, attrs) {

            // watch ideal height
            $scope.$watch("height",function(newValue,oldValue) {
                this.init(el, $scope.height);
            }.bind(this));

            // clean the element
            $(el).css('overflow', 'auto');
            $(el).addClass('dj-container');

            // launch the resize at the end of the render loop
            $timeout(function () {
                this.resize(el, $scope.height);
            }.bind(this), 0);

            // watch resize of the browser
            angular.element($window).bind('resize', function() {
                this.onResize(el, $scope.height);
            });
        },
        scope: {
            height: '='
        }
    }
}]);