var spots = [
  {
    name: "岡崎城",
    lat: 34.9563,
    lng: 137.1589,
    short: "家康公生誕の城",
    text: "天守から街と乙川が見えます。春は桜とセットで行く人が多いです。",
    image: "images/okazakijou.jpg",
  },
  {
    name: "岡崎中央総合公園",
    lat: 34.9483,
    lng: 137.2150,
    short: "広い総合公園",
    text: "体育館や球場などスポーツ施設が多い公園です。散歩やピクニックにも向いています。",
    image: "images/tyuusou.jpg",
  },
  {
    name: "大樹寺",
    lat: 34.9836,
    lng: 137.1585,
    short: "ビスタラインで有名",
    text: "三門の向こうに岡崎城がまっすぐ見えるスポットです。",
    image: "images/daijuzi.jpg",
  },
  {
    name: "岡崎世界こども美術博物館",
    lat: 34.9269,
    lng: 137.2137,
    short: "子ども向けの美術館",
    text: "子どもたちの作品を見たり、創作体験ができたりする美術館です。",
    image: "images/kobihaku.jpg",
  },
  {
    name: "岡崎公園",
    lat: 34.9569,
    lng: 137.1598,
    short: "城下の大きな公園",
    text: "岡崎城のまわり一帯です。散歩や花見に向いています。",
    image: "images/okakou.jpg",
  },
  {
    name: "東公園",
    lat: 34.9608,
    lng: 137.1915,
    short: "つつじと動物園",
    text: "つつじの季節は特ににぎわいます。小さな子ども連れにも向きます。",
    image: "images/higakou.jpg",
  },
];

var map;
var infoWindow;
var markerList = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 34.955, lng: 137.185 },
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
  });

  infoWindow = new google.maps.InfoWindow();

  for (var i = 0; i < spots.length; i++) {
    addMarker(i);
  }

  map.addListener("click", function () {
    infoWindow.close();
  });

  buildTable();
}

function addMarker(index) {
  var spot = spots[index];
  var marker = new google.maps.Marker({
    position: { lat: spot.lat, lng: spot.lng },
    map: map,
    title: spot.name,
  });

  marker.addListener("click", function () {
    showSpot(index);
  });

  markerList[index] = marker;
}

function showSpot(index) {
  var spot = spots[index];
  var marker = markerList[index];
  var html =
    '<div class="popup">' +
    '<img src="' + spot.image + '" alt="' + spot.name + '">' +
    "<strong>" + spot.name + "</strong>" +
    "<p>" + spot.text + "</p>" +
    "</div>";

  infoWindow.setContent(html);
  infoWindow.open(map, marker);
  map.panTo(marker.getPosition());
  if (map.getZoom() < 14) {
    map.setZoom(14);
  }
}

function buildTable() {
  var tbody = document.getElementById("photo-tbody");
  tbody.innerHTML = "";

  for (var i = 0; i < spots.length; i++) {
    var spot = spots[i];
    tbody.innerHTML +=
      "<tr>" +
      '<td><img src="' + spot.image + '" alt="' + spot.name + '"></td>' +
      '<td class="name">' + spot.name + "</td>" +
      '<td class="desc">' + spot.short + " 。 " + spot.text + "</td>" +
      "</tr>";
  }
}

window.initMap = initMap;
