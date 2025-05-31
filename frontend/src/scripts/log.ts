function createLoginFormHTML(): string {
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
  const form = document.getElementById('dbForm') as HTMLFormElement;
  const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      host: (document.getElementById('host') as HTMLInputElement).value,
      port: (document.getElementById('port') as HTMLInputElement).value,
      database: (document.getElementById('database') as HTMLInputElement).value,
      user: (document.getElementById('user') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };

    try {
      const response = await fetch('/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem('dbConnected', 'true');
        window.location.href = '/index.html';
      } else {
        throw new Error(result.message || 'Error de conexión');
      }
    } catch (err: any) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Cargar todo al iniciar
document.body.className = "bg-info bg-opacity-25";
loadBootstrapStyles();
document.body.innerHTML = createLoginFormHTML();
setupFormLogic();
