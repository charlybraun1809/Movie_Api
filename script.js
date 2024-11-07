const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmUyZTlhNGM5YjljZjRkZWU1NDg4ZGQ5MDA2YTVkOCIsIm5iZiI6MTczMDk2NzkwNS40OTkxMzYyLCJzdWIiOiI2NzJjNzZjNDUwZTE1ZThmNWE1ODY5ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.G1uMDzkgTRKHCrlo0eiN20mA3s14xByeMX4VyfHkHZo'
    }
};

let trendingMovies = [];


async function getData() {
    await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(res => res.json())
        .then(data => {
            trendingMovies = data.results;
             renderMovies(trendingMovies);
             console.log(trendingMovies);
        })
        .catch(err => console.error(err));
}

function renderMovies(movies) {
    let contentRef = document.getElementById('content');
    movies.forEach(movie => {
        contentRef.innerHTML += `
        <div id="movieCard">
            <div class="cardHeader">${movie.title}</div>
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster"<img/>
        </div>`
    });
}


