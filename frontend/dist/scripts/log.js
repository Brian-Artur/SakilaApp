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
function createLoginFormHTML() {
    return `
    <div class="container py-5">
      <h2 class="mb-4 display-4 text-center text-danger">Conectar a la base de datos Sakila</h2>

      <form id="dbForm" class="card border border-3 border-warning rounded-4 p-4 shadow-sm mx-auto" style="max-width: 500px;">
        <div class="mb-3">
          <label for="host" class="form-label">Host</label>
          <input type="text" class="form-control focus-ring focus-ring-warning" id="host" required />
        </div>
        <div class="mb-3">
          <label for="port" class="form-label">Puerto</label>
          <input type="number" class="form-control focus-ring focus-ring-warning" id="port" value="3306" required />
        </div>
        <div class="mb-3">
          <label for="database" class="form-label">Nombre de la base de datos</label>
          <input type="text" class="form-control focus-ring focus-ring-warning" id="database" required />
        </div>
        <div class="mb-3">
          <label for="user" class="form-label">Usuario</label>
          <input type="text" class="form-control focus-ring focus-ring-warning" id="user" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control focus-ring focus-ring-warning" id="password" />
        </div>

        <div id="errorMessage" class="text-warning mb-3" style="display: none;"></div>

        <button type="submit" class="btn btn-danger w-100 text-light">Conectar</button>
      </form>
    </div>
  `;
}
function loadBootstrapStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/bootstrap.min.css";
    document.head.appendChild(link);
}
function setupFormLogic() {
    const form = document.getElementById('dbForm');
    const errorDiv = document.getElementById('errorMessage');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const data = {
            host: document.getElementById('host').value,
            port: document.getElementById('port').value,
            database: document.getElementById('database').value,
            user: document.getElementById('user').value,
            password: document.getElementById('password').value
        };
        try {
            const response = yield fetch('/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = yield response.json();
            if (result.success) {
                sessionStorage.setItem('dbConnected', 'true');
                window.location.href = '/index.html';
            }
            else {
                throw new Error(result.message || 'Error de conexión');
            }
        }
        catch (err) {
            errorDiv.textContent = err.message;
            errorDiv.style.display = 'block';
        }
    }));
}
// Cargar todo al iniciar
document.body.className = "bg-info bg-opacity-25";
loadBootstrapStyles();
document.body.innerHTML = createLoginFormHTML();
setupFormLogic();
