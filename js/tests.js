cursedHoardItems = false;
cursedHoardSuits = false;

$(document).ready(function() {
  assertScoreByName(['Blizzard', 'Great Flood', 'Elven Archers'], 35);
  assertScoreByName(['Smoke', 'Dwarvish Infantry', 'War Dirigible'], 50);
  assertScoreByName(['Candle', 'Smoke', 'Dwarvish Infantry', 'War Dirigible'], 44);
  assertScoreByCode('FR21,FR24,FR25,FR31,FR32,FR43,FR46+', 265);
  assertScoreByCode('FR06,FR07,FR08,FR09,FR10,FR11,FR26+', 326);
  assertScoreByCode('FR18,FR22,FR31,FR32,FR43,FR46,FR47+', 351, 'Max score without special cards?');
  assertScoreByCode('FR01,FR08,FR13,FR14,FR15,FR16,FR52+FR52:FR11', 260, 'Rulebook example I')
  assertScoreByCode('FR03,FR17,FR32,FR43,FR46,FR47,FR49+FR49:FR47:Wizard', 380, 'Rulebook example II');
  assertScoreByCode('FR03,FR17,FR28,FR38,FR43,FR46,FR47,FR49+FR49:FR03:Leader', 397, 'Best hand ever?');
  assertScoreByCode('FR02,FR03,FR05,FR17,FR26,FR28,FR47,FR49+FR49:FR17:Land', 388, 'Second best');
  assertScoreByCode('FR03,FR17,FR28,FR32,FR43,FR46,FR47,FR49+FR49:FR03:Army', 388, 'Second best');
  assertScoreByCode('FR28,FR29,FR31,FR32,FR34,FR35,FR51,FR53+FR51:FR31,FR53:FR29', -74, 'Worst hand ever?');
  assertScoreByCode('FR37,FR53+FR53:FR37', 0, '2 Basilisks should blank eachother');
  assertScoreByCode('FR24,FR53+FR53:FR24', 26, '2 Dwarvish Infantries should penalty eachother');
  assertScoreByCode('FR09,FR12,FR16,FR37+FR09:FR16', 95, 'Island can be used even when blanked');
  assertScoreByCode('FR10,FR53+FR53:FR10', 23, 'Elementals count their Doppelgänger');
  assertScoreByCode('FR26,FR27,FR30,FR36,FR38,FR39,FR40+', 193, 'Collector can score multiple sets');
  assertScoreByCode('FR26,FR46,FR47,FR51,FR53+FR51:FR46,FR53:FR46', 20, 'Collector does not score duplicated cards');
  assertScoreByCode('FR22,FR31,FR36,FR43,FR44,FR46,FR47+', 206, 'Gem of Order can score multiple sets');
  assertScoreByCode('FR16,FR49,FR11,FR12+FR49:FR12:flood', 11, 'Blanking I');
  assertScoreByCode('FR12,FR08,FR16,FR49+FR49:FR12:beast', 3, 'Blanking II');
  assertScoreByCode('FR49,FR41,FR37,FR21+FR49:FR37:flood', 73, 'Blanking III');
  assertScoreByCode('FR49,FR41,FR24,FR22+FR49:FR24:flood', 56, 'Blanking IV');
  assertScoreByCode('FR49,FR41,FR06,FR08,FR22+FR49:FR08:wizard', 82, 'Blanking V');
  assertScoreByCode('FR49,FR41,FR45,FR23,FR15+FR49:FR45:flood', 47, 'Bug?');
  assertScoreByCode('FR49,FR41,FR45+FR49:FR45:flood', 61, 'War Dirigible does not need Army when Army cleared from penalty');
  assertScoreByCode('FR49,FR45,FR25+FR49:FR25:land', 53, 'War Dirigible does not need Army when Army cleared from penalty');
  assertScoreByCode('FR21,FR45,FR13+', 47, 'War Dirigible + Smoke');
  assertScoreByCode('FR21,FR13,FR45+', 47, 'Smoke + War Dirigible');
  deck.enableCursedHoardSuits();
  assertScoreByCode('CH10,FR41,FR10,FR07,FR22,FR23+', 114);
  assertScoreByCode('CH08,FR32,FR37+CH08:FR32', 57, 'Angel');
});

function assertScoreByName(cardNames, expectedScore, message) {
  hand.clear();
  for (const cardName of cardNames) {
    hand.addCard(deck.getCardByName(cardName));
  }
  assertScore(hand, expectedScore, message);
}

function assertScoreByCode(code, expectedScore, message) {
  hand.clear();
  hand.loadFromString(code);
  assertScore(hand, expectedScore, message);
}

function assertScore(hand, expectedScore, message) {
  var score = hand.score();
  if (score === expectedScore) {
    $('#tests').append('<li class="list-group-item list-group-item-success"><b>TEST SUCCESS</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST FAILED:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points (expected: ' + expectedScore + ')' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  }
}
