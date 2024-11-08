

let trendingMovies = [];
let genres = [];
let baseUrl = "https://api.themoviedb.org/3/";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmUyZTlhNGM5YjljZjRkZWU1NDg4ZGQ5MDA2YTVkOCIsIm5iZiI6MTczMDk2NzkwNS40OTkxMzYyLCJzdWIiOiI2NzJjNzZjNDUwZTE1ZThmNWE1ODY5ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1uMDzkgTRKHCrlo0eiN20mA3s14xByeMX4VyfHkHZo'
    }
};

// Genre-Liste laden und zwischenspeichern
async function fetchGenres() {
    try {
        let response = await fetch(`${baseUrl}genre/movie/list?language=en-US`, options);
        let data = await response.json();
        genres = data.genres; // Genres zwischenspeichern
    } catch (error) {
        console.error('Fehler beim Laden der Genres:', error);
    }
}

// Genres-IDs in Genre-Namen umwandeln
function getGenreNamesByIds(genreIds) {
    return genreIds.map(id => {
        let genre = genres.find(g => g.id === id);
        return genre ? genre.name : "Unknown";
    }).join(", ");
}

// Movies rendern
function renderMovies(movies) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ""; // Inhalt leeren
    movies.forEach(movie => {
        let genreNames = getGenreNamesByIds(movie.genre_ids);
        contentRef.innerHTML += `
        <div id="movieCard">
            <div class="cardHeader">
                <h2>${movie.title}</h2>
                <p>Genres: ${genreNames}</p>
            </div>
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"/>
            <div class="cardFooter"><b>${movie.overview}</b></div>
        </div>`;
    });
}

// Daten abrufen und rendern
async function init() {
    await getData();
    await dataIntoJson();
    await fetchGenres();
}

async function dataIntoJson() {
    let response = await getData('trending/movie/day?language=en-US');
    trendingMovies = response.results;
    renderMovies(trendingMovies);
}

async function getData(path = "") {
    try {
        let response = await fetch(baseUrl + path, options);
        return response.json();
    } catch (error) {
        console.error('failed to fetch', error);
    }
}



