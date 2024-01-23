const apiKey: string = '0dc79e9f8d8261756060e27eae2708db';
const itemsPerPage: number = 5; 

let currentPage: number = 1;

function searchForMovies(): void {
    const searchInput: string = (<HTMLInputElement>document.getElementById('searchInput')).value;
    if (searchInput.trim() === '') {
        alert('Please enter a search query');
        return;
    }
    const apiUrl: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`;
    const r: XMLHttpRequest = new XMLHttpRequest();
    r.open("GET", apiUrl, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        const results = JSON.parse(r.responseText).results;
        displayMovies(results);
        updatePagination(results.length);
    };
    r.send();
}

function handleSearchKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
        searchForMovies();
    }
}

function displayMovies(movies: any[]): void {
    const tableContainer: HTMLElement = document.getElementById('movieTableContainer');
    const tableBodyElement: HTMLElement | null = document.getElementById('movieTableBody');

    if (!tableBodyElement) {
        console.error("Table body element not found");
        return;
    }

    const tableBody: HTMLTableElement = tableBodyElement as HTMLTableElement;
    tableBody.innerHTML = '';

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < movies.length; i++) {
        const movie = movies[i];
        const row: HTMLTableRowElement = tableBody.insertRow();
        const posterCell: HTMLTableCellElement = row.insertCell();
        posterCell.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" width="100" height="100">`;
        row.insertCell().textContent = movie.title;
        row.insertCell().textContent = movie.release_date;
        row.insertCell().textContent = movie.overview;
        row.insertCell().textContent = movie.vote_average;
    }

    tableContainer.style.display = 'block';
}

function updatePagination(totalItems: number): void {
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);
    const paginationElement: HTMLElement = document.getElementById('pagination');

    if (!paginationElement) {
        console.error("Pagination element not found");
        return;
    }

    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton: HTMLButtonElement = document.createElement('button');
        pageButton.textContent = i.toString();
        pageButton.addEventListener('click', () => {
            currentPage = i;
            searchForMovies();
        });
        paginationElement.appendChild(pageButton);
    }
}

searchForMovies();

document.getElementById('searchInput')?.addEventListener('keyup', handleSearchKeyUp);
