const $name = $("#singleMovieName");
const $imgRes = $("#imgResponse");
const $castAndSeasons = $("#castAndSeasons");
const $seasonsNumber = $("#sesonsNumber");
const $seasonsList = $("#seasonsList");
const $castList = $("#castList");
const $showInfo = $("#showInfo");
const $showEpisodes = $("#allEpisodes");
const $crew = $("#crew");
const $akas = $("#akas");
const but = $("#butEpisodes");
const butCrew = $("#butCrew");
const $singleSrc = $("#singleSrc");

$(document).ready(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("name");
  // console.log(myParam);
  getShow(myParam);
  $singleSrc.on("keydown", (event) => {
    if (event.keyCode == 13) {
      $name.text("");
      $imgRes.text("");
      $showInfo.text("");
      $seasonsNumber.text("");
      $seasonsList.text("");
      $castList.text("");
      $showEpisodes.text("");
      $crew.text("");
      $akas.text("");
      // handleError.text("");
      const inputValue = $singleSrc.val();
      if (inputValue) {
        getShow(inputValue);
      };
      $singleSrc.val("");
    }
  });
});

const getShow = (showName) => {
  const request = "http://api.tvmaze.com/singlesearch/shows?q=" + showName;
  fetch(request).then((response) => response.json())
  .then((data) => {
    $name.text(data.name);
    $imgRes.append("<img src=" + data.image.original + ">");
    $showInfo.append(data.summary);
    const idShow = data.id;
    const getSesons =() => {
      const request = "http://api.tvmaze.com/shows/" + idShow + "/seasons";
      fetch(request).then(response => response.json())
      .then((data) => {
        $seasonsNumber.text("Sesons" + "(" + data.length + ")");
        data.forEach(function (element) {
          let li = $(
            "<li>" + element.premiereDate + " - " + element.endDate + "</li>"
          );
          $seasonsList.append(li);
        });
      });
    }
    const getCast = () => {
      const request = "http://api.tvmaze.com/shows/" + idShow + "/cast";
      fetch(request).then(response => response.json())
      .then((data) => {
        if (data.length == 0) {
          let p = $("<p>No information about cast!!!</p>");
          $castList.append(p);
        } else {
          data.forEach((element, i) => {
            if (i > 9) {
              return false;
            }
            let li = $("<li>" + element.person.name + "</li>");
            $castList.append(li);
          });
        }
      });
    }
    const getEpisodes = () => {
      const request = "http://api.tvmaze.com/shows/" + idShow + "/episodes";
      fetch(request).then(response => response.json())
      .then((data) => {
        data.forEach(function (element) {
          let li =
            "<li class =" +
            "hide" +
            " >S" +
            element.season +
            "E" +
            element.number +
            ": " +
            element.name +
            " </li>";
          $showEpisodes.append(li);
        });
      });
    };
    
    const getCrew = () => {
      const request = "http://api.tvmaze.com/shows/" + idShow + "/crew";
      fetch(request).then(response => response.json())
      .then((data) => {
        data.forEach(function (element, i) {
          var li =
            "<li class = hide1>" +
            element.type +
            ":<br>" +
            element.person.name +
            "</li>";
          $crew.append(li);
        });
      });
    }
    const getAkas = () => {
      const request = "http://api.tvmaze.com/shows/" + idShow + "/akas";
      fetch(request).then(response => response.json())
      .then((data) => {
        if (data.length == 0) {
          let p = "<li>No information about Aka's!!!</li>";
          $akas.append(p);
        } else {
          data.forEach(function (element, i) {
            if (i > 7) {
              return false;
            }
            let li = "<li>" + element.name + "</li>";
            $akas.append(li);
          });
        }
      });
    }
    getSesons();
    getCast();
    getEpisodes();
    getCrew();
    getAkas();
    but.on("click", () => {
      $(".hide").toggle();
    });
    butCrew.on("click", () => {
      $(".hide1").toggle();
    });
  });
}
