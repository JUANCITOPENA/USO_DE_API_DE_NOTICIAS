const apiKey = 'bbdc901c176b4de5bdc05c6de697c010';
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const noticiasPorPagina = 10;
let paginaActual = 1;
let totalPaginas = 1;

const noticiasElemento = document.getElementById('noticias');
const paginacionElemento = document.getElementById('paginacion');

async function mostrarNoticias() {
  try {
    const respuesta = await fetch(`${url}&pageSize=${noticiasPorPagina}&page=${paginaActual}`);
    const noticias = await respuesta.json();
    const noticiasHTML = noticias.articles.map(crearNoticia).join('');
    noticiasElemento.innerHTML = noticiasHTML;
    totalPaginas = Math.ceil(noticias.totalResults / noticiasPorPagina);
    paginacionElemento.innerHTML = crearBotonesDePaginacion();
  } catch (error) {
    console.error(error);
    noticiasElemento.innerHTML = '<p>Ocurrió un error al obtener las noticias.</p>';
    paginacionElemento.innerHTML = '';
  }
}

function crearNoticia(noticia) {
  return `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
        <img src="${noticia.urlToImage || 'https://via.placeholder.com/500x300.png?text=No+image+disponible'}" class="img-fluid rounded-start" alt="${noticia.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${noticia.title}</h5>
         
            <p>${noticia.description}</p>
          
            <a href="${noticia.url}" class="btn btn-primary">Leer más</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function crearBotonesDePaginacion() {
  let botones = '';

  if (totalPaginas > 1) {
    botones += `<li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Anterior" onclick="cambiarPagina(${paginaActual - 1})">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>`;

    for (let i = 1; i <= totalPaginas; i++) {
      botones += `<li class="page-item ${i === paginaActual ? 'active' : ''}">
        <a class="page-link" href="#" onclick="cambiarPagina(${i})">${i}</a>
      </li>`;
    }

    botones += `<li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">
      <a class="page-link" href="#" aria-label="Siguiente" onclick="cambiarPagina(${paginaActual + 1})">  <span aria-hidden="true">&raquo;</span>
      </a>
        </li>`;
        }
      return botones;
      }
      
      function cambiarPagina(numeroDePagina) {
      if (numeroDePagina >= 1 && numeroDePagina <= totalPaginas) {
      paginaActual = numeroDePagina;
      mostrarNoticias();
      }
      }
      
      mostrarNoticias();
