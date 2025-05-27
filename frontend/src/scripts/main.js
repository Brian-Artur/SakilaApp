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
const loadFilms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/films');
        const films = yield response.json();
        renderFilms(films);
    }
    catch (error) {
        console.error('Error al cargar películas:', error);
    }
});
const renderFilms = (films) => {
    const app = document.getElementById('app');
    if (!app)
        return;
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
        ${films.map(film => {
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
  `;
    app.innerHTML = table;
};
document.addEventListener('DOMContentLoaded', () => {
    loadFilms();
});
