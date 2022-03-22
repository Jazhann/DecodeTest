const fs = require('fs');

const csvToReadPath = './assets/leaderboard.csv';
const csvToWritePath = './leaderboardFixed.csv';

fs.readFile(csvToReadPath, 'utf8' , (err, data) => {
  if (err) {
    console.error('Error reading leaderboard file');
    return
  }
  decode(data);
});

function decode(data) {
  const fileData = data.toString()
  .replaceAll('\n', '')
  .split("\r")
  .map(line => line.split(','));
  const result = fileData.map(line => ([line[0], getResult(line[1], line[2])])).sort((a, b) => b[1] - a[1]);
  saveCsv(result);
  }
  
function getResult(base, data) {
  let values = base.split('');
  values = values.reduce( (acc, value, index) => {
    acc[value] = index;
    return acc;
  }, {});
  let dataToDecimal = data.split('');
  dataToDecimal = dataToDecimal.map( data => values[data]);
  return parseInt(dataToDecimal.join(''), Object.keys(values).length);
}

function saveCsv(data) {
  fs.writeFile(csvToWritePath, data.join('\n'), 'utf8', function (err) {
    if (err) {
      console.error('Error saving file');
    }
  });
}
