const calcAverage = (list_score) =>
  list_score.reduce((sum, element) => sum + element, 0) / list_score.length;

function checkWinner(avgDolhins, avgKoalas) {
  if (avgDolhins >= avgKoalas * 2)
    return `Dolhins win (${avgDolhins} vs ${avgKoalas})`;
  else if (avgKoalas >= avgDolhins * 2)
    return `Koalas win (${avgKoalas} vs ${avgDolhins})`;
  else return "No team wins";
}

let avg_1 = calcAverage([44, 23, 17]);
let avg_1_1 = calcAverage([85, 54, 41]);
let avg_2 = calcAverage([65, 54, 49]);
let avg_2_2 = calcAverage([23, 34, 27]);

console.log(checkWinner(avg_1, avg_2));
console.log(checkWinner(avg_1_1, avg_2_2));
