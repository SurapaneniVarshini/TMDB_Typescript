var _a;
var apiKey = '0dc79e9f8d8261756060e27eae2708db';
var itemsPerPage = 5; 
var currentPage = 1;
function searchForMovies() {
    var searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() === '') {
        alert('Please enter a search query');
        return;
    }
    var apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(searchInput);
    var r = new XMLHttpRequest();
    r.open("GET", apiUrl, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200)
            return;
        var results = JSON.parse(r.responseText).results;
        displayMovies(results);
        updatePagination(results.length);
    };
    r.send();
}
function handleSearchKeyUp(event) {
    if (event.key === 'Enter') {
        searchForMovies();
    }
}
function displayMovies(movies) {
    var tableContainer = document.getElementById('movieTableContainer');
    var tableBodyElement = document.getElementById('movieTableBody');
    if (!tableBodyElement) {
        console.error("Table body element not found");
        return;
    }
    var tableBody = tableBodyElement;
    tableBody.innerHTML = '';
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    for (var i = startIndex; i < endIndex && i < movies.length; i++) {
        var movie = movies[i];
        var row = tableBody.insertRow();
        var posterCell = row.insertCell();
        posterCell.innerHTML = "<img src=\"https://image.tmdb.org/t/p/w500/".concat(movie.poster_path, "\" alt=\"").concat(movie.title, "\" width=\"100\" height=\"100\">");
        row.insertCell().textContent = movie.title;
        row.insertCell().textContent = movie.release_date;
        row.insertCell().textContent = movie.overview;
        row.insertCell().textContent = movie.vote_average;
    }
    tableContainer.style.display = 'block';
}
function updatePagination(totalItems) {
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var paginationElement = document.getElementById('pagination');
    if (!paginationElement) {
        console.error("Pagination element not found");
        return;
    }
    paginationElement.innerHTML = '';
    var _loop_1 = function (i) {
        var pageButton = document.createElement('button');
        pageButton.textContent = i.toString();
        pageButton.addEventListener('click', function () {
            currentPage = i;
            searchForMovies();
        });
        paginationElement.appendChild(pageButton);
    };
    for (var i = 1; i <= totalPages; i++) {
        _loop_1(i);
    }
}

searchForMovies();

(_a = document.getElementById('searchInput')) === null || _a === void 0 ? void 0 : _a.addEventListener('keyup', handleSearchKeyUp);
