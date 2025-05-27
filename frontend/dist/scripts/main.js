"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `<p class="text-success">¡Frontend listo y esperando datos de Sakila!</p>`;
    }
});
// Variables de paginación
let filmsData = [];
let currentPage = 1;
const pageSize = 10;
const loadFilms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/films');
        filmsData = yield response.json();
        renderFilms();
        renderPagination();
    }
    catch (error) {
        console.error('Error al cargar películas:', error);
    }
});
const renderFilms = () => {
    const app = document.getElementById('app');
    if (!app)
        return;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedFilms = filmsData.slice(startIndex, startIndex + pageSize);
    const table = `
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Año</th>
          <th>Duración</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        ${paginatedFilms.map(film => {
        var _a, _b, _c, _d;
        return `
          <tr>
            <td>${film.film_id}</td>
            <td>${film.title}</td>
            <td>${(_a = film.description) !== null && _a !== void 0 ? _a : ''}</td>
            <td>${(_b = film.release_year) !== null && _b !== void 0 ? _b : ''}</td>
            <td>${(_c = film.length) !== null && _c !== void 0 ? _c : ''} min</td>
            <td>${(_d = film.rating) !== null && _d !== void 0 ? _d : ''}</td>
          </tr>
        `;
    }).join('')}
      </tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;
    app.innerHTML = table;
    renderPagination();
};
const renderPagination = () => {
    const paginationDiv = document.getElementById('pagination');
    if (!paginationDiv)
        return;
    const totalPages = Math.ceil(filmsData.length / pageSize);
    const maxVisible = 7;
    let buttons = '';
    // Botón primera página
    if (currentPage > 1) {
        buttons += `<button class="btn btn-outline-secondary me-2" data-page="1">1</button>`;
    }
    // Cálculo del rango de páginas visibles
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    // Botones numéricos del rango visible
    for (let i = startPage; i <= endPage; i++) {
        buttons += `<button class="btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} me-1" data-page="${i}">${i}</button>`;
    }
    // Botón con número de la última página (si no está visible ya)
    if (currentPage < totalPages && endPage < totalPages) {
        buttons += `<button class="btn btn-outline-secondary ms-2" data-page="${totalPages}">${totalPages}</button>`;
    }
    paginationDiv.innerHTML = buttons;
    // Eventos de cambio de página
    const allButtons = paginationDiv.querySelectorAll('button[data-page]');
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = Number(btn.getAttribute('data-page'));
            if (!isNaN(page)) {
                currentPage = page;
                renderFilms();
            }
        });
    });
};
document.addEventListener('DOMContentLoaded', () => {
    loadFilms();
});
