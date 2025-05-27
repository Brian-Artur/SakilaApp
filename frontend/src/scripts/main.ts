document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `<p class="text-success">¡Frontend listo y esperando datos de Sakila!</p>`;
  }
});

interface Film {
  film_id: number;
  title: string;
  description: string | null;
  release_year: number | null;
  language_id: number;
  rental_duration: number;
  rental_rate: number;
  length: number | null;
  replacement_cost: number;
  rating: string | null;
}

// Variables de paginación
let filmsData: Film[] = [];
let currentPage = 1;
const pageSize = 10;

const loadFilms = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/films');
    filmsData = await response.json();
    renderFilms();
    renderPagination();
  } catch (error) {
    console.error('Error al cargar películas:', error);
  }
};

const renderFilms = () => {
  const app = document.getElementById('app');
  if (!app) return;

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
        ${paginatedFilms.map(film => `
          <tr>
            <td>${film.film_id}</td>
            <td>${film.title}</td>
            <td>${film.description ?? ''}</td>
            <td>${film.release_year ?? ''}</td>
            <td>${film.length ?? ''} min</td>
            <td>${film.rating ?? ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div id="pagination" class="d-flex justify-content-center mt-3"></div>
  `;

  app.innerHTML = table;
  renderPagination();
};

const renderPagination = () => {
  const paginationDiv = document.getElementById('pagination');
  if (!paginationDiv) return;

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
