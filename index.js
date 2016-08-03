'use strict';

let port = process.env.PORT || 4000;
let client = 'client';
let file = 'test3.csv';

let path = require('path');
let fs = require('fs');
let parse = require('csv-parse');
let split = require('split');
let express = require('express');
let app = express();

app.use(express.static(path.join(__dirname, client)));

app.get('/api', (req, res, next) => {
  console.time('/api');
  let stream = fs.createReadStream(path.join(__dirname, file)).pipe(split());
  let data = {
    labels: [],
    series: [[],[]]
  };
  stream.on('data', (row) => {
    if (!row){
      return;
    }
    let tuple = row.split(',');
    data.labels.push(parseInt(tuple[0]));
    data.series[0].push(parseFloat(tuple[1]));
    data.series[1].push(parseFloat(tuple[1])+1);

  })

  stream.on('end', () => {
    res.json({message: 'success', data: data});
    console.timeEnd('/api');
  });

});

app.listen(port, () => {
  console.log(`Server listenting on port: ${port}`);
})
