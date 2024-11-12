let trendingMovies = [];
let allGenres = [];
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

async function renderMovies(movies) {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = '';
    let genreNames = movies.map(movie => getNamesById(movie.genre_ids));
    let videoLinks = await Promise.all(movies.map(movie => getMovieLink(movie.id)));
    movies.forEach((movie) => {
        contentRef.innerHTML += getCardTemplate(movie);
    });
    document.querySelectorAll('.poster').forEach((poster, index) => {
        poster.addEventListener('click', () => openMoviePage(movies[index], genreNames[index], videoLinks[index]));
    });
}

async function openMoviePage(movie, genreNames, videoLink) {
    try {
        let newTab = window.open('about:blank', '_blank');
        let response = await fetch('moviePage.html');
        let hmtlContent = await response.text();
        hmtlContent = hmtlContent.replace(
            '<div id="contentMoviePage"></div>',
            `<div id="contentMoviePage">${movieTemplate(movie, genreNames, videoLink)}</div>`
        );
        newTab.document.open();
        newTab.document.write(hmtlContent);
        newTab.document.close();
    } catch (error) {
    }
}

async function fetchGenres() {
    let response = await fetch(`${baseUrl}genre/movie/list?language=en,`, options);
    let dataJson = await response.json();
    allGenres = dataJson.genres;
    console.log(allGenres);
    
}

function getNamesById(movieNames) {
    return movieNames.map(id => {
        let genre = allGenres.find(g => g.id === id);
        return genre.name;
    }).join(', ')
}

async function getMovieLink(movieId) {
    try {
        let response = await fetch(`${baseUrl}movie/${movieId}/videos?language=en-US`, options);
        let dataJson = await response.json();
        let videoKey = dataJson.results[0].key
        let videoLink = `https://www.youtube.com/watch?v=${videoKey}`;
        return videoLink;
         
    } catch (error) {
        console.log('failed to fetch', error);
    }
}



