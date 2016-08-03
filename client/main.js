/* global $, Chartist */
'use strict';
$(function(){
  plot();
})

function plot() {
  $('.ct-chart').empty();
  $.get('/api')
    .done(function(res){
      var data = res.data;
      data.series = [data.series];

      let points = Math.floor(data.labels.length / 20);

      new Chartist.Line('.ct-chart', data, {
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % points === 0 ? value : null;
          }
        }
      });
    })
    .fail(function(err) {
      console.error(err);
    });
}

$('.plot-btn').click(function() {
  plot();
});
