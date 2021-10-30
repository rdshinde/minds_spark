const movieNameArray = ["The+Avengers", "Kick", "Sultan", "Singham", "Sairat"];
const movieCardsDiv = document.querySelector(".movie-cards");
// serverURL for minion translation

function getURL(text) {
  serverURL = `https://www.omdbapi.com/?t=${text}&apikey=69905de4`;
  return serverURL;
}

function errorHandler(error) {
  alert(error.message + " Plaese Try again later.");
}

function tryIt(item) {
  let innerCardHtml = ``;

  $.ajax({
    url: `https://www.omdbapi.com/?t=${item}&apikey=69905de4`,
    dataType: "JSON",
  })
    .done(function (data) {
      let movieCard = document.createElement("div");
      innerCardHtml = `
            <div class="card">
            <div class="img-div">
              <img
                class="img-class"
                src="${data.Poster}"
                alt="Movie image"
              />
            </div>
            <div class="content">
              <h3 class="movie-name">${data.Title}</h3>
              <div class="movie-duration-clock">
                <i class="far fa-clock"></i>
                <h4 class="movie-duration">${data.Runtime}</h4>
              </div>
              <div class="rating-div">
                <i class="fas fa-star-half-alt"></i><h4 class="movie-reviews">${data.imdbRating}</h4>
              </div>
              <h4 class="movie-genre">${data.Genre}</h4>
              <h4 class="movie-cast">
                ${data.Actors}
              </h4>
    
              <h4 class="movie-overview">
                ${data.Plot}
              </h4>
            </div>
          </div>
            `;
      movieCard.innerHTML = innerCardHtml;
      movieCardsDiv.appendChild(movieCard);
    })
    .fail(function (data) {
      console.log("fail");
    });
}
function inputBlank() {
  movieNameArray.forEach((item) => {
    tryIt(item);
  });
}
inputBlank();
const searchBar = document.querySelector(".movie-name-input");
searchBar.addEventListener("input", function () {
  console.log(searchBar.value);
  if (searchBar.value == "") {
    inputBlank();
  }
  movieCardsDiv.innerHTML = ``;
  tryIt(searchBar.value);
});
