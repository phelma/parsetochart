/* global $, Chartist */
'use strict';
$(function(){
  plot();
})

function plot() {
  $.get('/api')
    .done(function(res){
      var data = res.data;
      data.series = [data.series];
      new Chartist.Line('.ct-chart', data, options);
    })
    .fail(function(err) {
      console.error(err);
    });
}

$('.plot-btn').click(function() {
  plot();
});
