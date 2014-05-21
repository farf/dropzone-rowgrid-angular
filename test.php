<?php
/*
 * Example: linear_partition([9,2,6,3,8,5,8,1,7,3,4], 3) => [[9,2,6,3],[8,5,8],[1,7,3,4]]
 * @param array $seq
 * @param int $k
 * @return array
 */
function linear_partition(array $seq, $k)
{
    if ($k <= 0) {
        return array();
    }

    $n = count($seq) - 1;
    if ($k > $n) {
        return array_map(function ($x) {
            return array($x);
        }, $seq);
    }

    list($table, $solution) = $this->linear_partition_table($seq, $k);
    $k = $k - 2;
    $ans = array();

    while ($k >= 0) {
        $ans = array_merge(array(array_slice($seq, $solution[$n - 1][$k] + 1, $n - $solution[$n - 1][$k])), $ans);
        $n = $solution[$n - 1][$k];
        $k = $k - 1;
    }

    return array_merge(array(array_slice($seq, 0, $n + 1)), $ans);
}

function linear_partition_table($seq, $k)
{
    $n = count($seq);

    $table = array_fill(0, $n, array_fill(0, $k, 0));
    $solution = array_fill(0, $n - 1, array_fill(0, $k - 1, 0));

    for ($i = 0; $i < $n; $i++) {
        $table[$i][0] = $seq[$i] + ($i ? $table[$i - 1][0] : 0);
    }

    for ($j = 0; $j < $k; $j++) {
        $table[0][$j] = $seq[0];
    }

    for ($i = 1; $i < $n; $i++) {
        for ($j = 1; $j < $k; $j++) {
            $current_min = null;
            $minx = PHP_INT_MAX;

            for ($x = 0; $x < $i; $x++) {
                $cost = max($table[$x][$j - 1], $table[$i][0] - $table[$x][0]);
                if ($current_min === null || $cost < $current_min) {
                    $current_min = $cost;
                    $minx = $x;
                }
            }

            $table[$i][$j] = $current_min;
            $solution[$i - 1][$j - 1] = $minx;
        }
    }

    return array($table, $solution);
}
var_dump(linear_partition(array(18, 275, 186, 295, 171, 166, 206, 55, 202, 129, 79, 74, 93, 223, 260, 100, 240, 274, 44, 188, 173, 287, 224, 157, 50, 210, 211, 252, 72, 242, 79, 131, 19, 12, 109, 161, 26, 85, 39, 93, 279, 175, 24, 117, 227, 236, 296, 83, 93, 129), 50));
