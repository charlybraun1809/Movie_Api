let trendingMovies = [];
let allGenres = [];
let movieLinks = [];
let baseUrl = "https://api.themoviedb.org/3/"
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmUyZTlhNGM5YjljZjRkZWU1NDg4ZGQ5MDA2YTVkOCIsIm5iZiI6MTczMDk2NzkwNS40OTkxMzYyLCJzdWIiOiI2NzJjNzZjNDUwZTE1ZThmNWE1ODY5ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1uMDzkgTRKHCrlo0eiN20mA3s14xByeMX4VyfHkHZo'
    }
};

async function init() {
    await fetchGenres();
    await getData();
}

async function getData() {
    await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(res => res.json())
        .then(data => {
            trendingMovies = data.results;
            console.log(trendingMovies);
            renderMovies(trendingMovies);
        })
        .catch(err => console.error(err));
}

function renderMovies(movies) {
    let contentRef = document.getElementById('content');
    movies.forEach((movie, index) => {
        let genreNames = getNamesById(movie.genre_ids);
        contentRef.innerHTML += getCardTemplate(genreNames, movie, index)
    });
}

async function openMoviePage(index) {
    try {
        let response = await fetch('moviePage.html');
        let hmtlContent = await response.text();
        //template hier in htmlContent einfügen
        console.log(hmtlContent);
        
        
    } catch (error) {
        
    }
}

async function fetchGenres() {
    let response = await fetch(`${baseUrl}genre/movie/list?language=en,`, options);
    let dataJson = await response.json();
    allGenres = dataJson.genres;
}

function getNamesById(movieNames) {
    return movieNames.map(id => {
        let genre = allGenres.find(g => g.id === id);
        return genre.name;
    }).join(', ')
}

function addLink() {
    let url = document.getElementById('link')
}



