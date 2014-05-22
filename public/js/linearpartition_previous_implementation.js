app.service('linearPartition', function() {
    this.run =  function(seq, k) {
        var ans, i, j, m, n, solution, table, x, y, _i, _j, _k, _l;
        n = seq.length;
        if (k <= 0) {
            return [];
        }
        if (k > n) {
            return seq.map(function(x) {
                return [x];
            });
        }

        this.linear_partition_table = function(seq, k) {
            // array fill
            var table = [];
            for (var i = 0 ; i < n; i++) {
                var filli = [];
                for (var j = 0 ; j < k ; j++) {
                    filli.push([0]);
                }
                table.push(filli);
            }
            var solution = [];
            for (var i = 0 ; i < n - 1; i++) {
                var filli = [];
                for (var j = 0 ; j < k - 1 ; j++) {
                    filli.push([0]);
                }
                solution.push(filli);
            }

            for ( var i = 0 ; i < n ; i++) {
                table[i][0] = seq[i] + (i ? table[i-1][0] : 0);
            }

            for ( var j = 0 ; j < k ; j++) {
                table[0][j] = seq[0];
            }

            for (var i = 1; i < n ; i++) {
                for (var j = 1 ; j < k ; j++) {
                    var current_min = null;
                    var minx = Number.MAX_VALUE;

                    for (var x = 0; x < i ; x++) {
                        var cost = Math.max(table[x][j-1], table[i][0] - table[x][0]);
                        if ( current_min === null || cost < current_min) {
                            current_min = cost;
                            minx = x;
                        }
                    }

                    table[i][j] = current_min;
                    solution[i-1][j-1] = minx;
                }
            }

            return {table:table, solution:solution};


        }

        var lpt = this.linear_partition_table(seq, k);
        var table = lpt.table;
        var solution = lpt.solution;
        k = k-2;
        var ans = [];
        while (k >= 0) {
            ans = [
              (function() {
                var _m, _ref, _ref1, _results;
                _results = [];
                for (i = _m = _ref = solution[n - 1][k] + 1, _ref1 = n + 1; _ref <= _ref1 ? _m < _ref1 : _m > _ref1; i = _ref <= _ref1 ? ++_m : --_m) {
                  _results.push(seq[i]);
                }
                return _results;
              })()
            ].concat(ans);
            n = solution[n - 1][k];
            k = k - 1;
        }

        return [
            (function() {
                var _m, _ref, _results;
                _results = [];
                for (i = _m = 0, _ref = n + 1; 0 <= _ref ? _m < _ref : _m > _ref; i = 0 <= _ref ? ++_m : --_m) {
                _results.push(seq[i]);
            }
            return _results;
            })()
        ].concat(ans);

    };
});