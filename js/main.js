const $input = $("#search");
const $srcResult = $("#result");
const handleError = $("#error");
let list = [];
const $singleMovie = $("#singleMovie");
const $droplist = $('#dropList');
$(document).ready(() => {
  getTop50();
  $input.val("");
  $input.keyup(function () {
    $droplist.text('');
    const inputValue = $input.val();
      search(inputValue);
      if(inputValue == ''){
        getTop50();
      }
  });
});

const search = (inputVal) => {
  const request = "http://api.tvmaze.com/search/shows?q=" + inputVal;
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      list = [];
      $srcResult.html("");
      data.forEach(function (element) {
        console.log(element);
        list.push(element);
      });
      showList();
      showOnPage();
    });
};

const searchList = (inputVal) => {
  const request = "http://api.tvmaze.com/search/shows?q=" + inputVal;
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      list = [];
      $srcResult.html("");
      data.forEach(function (element) {
        console.log(element);
        list.push(element);
      });
      showOnPage();
    });
};
 
const showList = () => {
  list.forEach(function (element, i) {
    let li = $(`<li>`);
    li.text(list[i].show.name)
    li.on("click", function () {
      window.location;
      window.location.href = "pageInfoMovie.html?name=" + list[i].show.name;
    });
    $droplist.append(li);
  });
};

const showOnPage = () => {
  list.forEach(function (element, i) {
    const div = $("<div class = col-lg-4>");
    div.addClass("col-md-6");
    // div.append("<img src=" + list[i].show.image.original + ">");
    const imgSource = list[i].show.image;
    const noImg =
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
    if (imgSource) {
      div.append("<img src=" + list[i].show.image.original + ">");
    } else {
      div.append("<img src=" + noImg + ">");
    }
    div.append("<p class = 'text-primary'>" + list[i].show.name + "</p>");
    div.on("click", function () {
      window.location;
      window.location.href = "pageInfoMovie.html?name=" + list[i].show.name;
    });
    $srcResult.append(div);
  });
};

const getTop50 = () => {
  const request = "http://api.tvmaze.com/shows";
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      const div = $("<div class = col-lg-4>");
      div.addClass("col-md-6");
      data.sort(function (a, b) {
        return b.rating.average - a.rating.average;
      });
      for (var i = 0; i < 50; i++) {
        list.push(data[i]);
      }
      list.sort(function (a, b) {
        return b.rating.average - a.rating.average;
      });
      displayTop50();
    });
};

const displayTop50 = () => {
  list.forEach(function (element, i) {
    const div = $("<div class = col-lg-4>");
    div.addClass("col-md-6");
    div.append("<img src=" + list[i].image.original + ">");
    div.append("<p class = 'text-primary'>" + list[i].name + "</p>");
    $srcResult.append(div);
    div.on("click", function () {
      window.location;
      window.location.href = "pageInfoMovie.html?name=" + list[i].name;
    });
  });
};
