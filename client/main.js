/* global $, Chartist */
'use strict';
$(function(){
  plot();
})

function plot() {
  $.get('/api')
    .done(function(res){
      let data = res.data;
      data.series = [data.series];
      new Chartist.Line('.ct-chart', data);
    })
    .fail(function(err) {
      console.error(err);
    });
}
