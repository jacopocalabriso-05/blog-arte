// Menu a tendina "Articoli"
// Sul computer si apre passando il mouse sopra.
// Su telefono e tablet si apre toccando "Articoli" (il secondo tocco apre la pagina).
//
// QUI SOTTO c'è l'elenco delle sottosezioni: è l'unico posto da modificare
// per cambiare voci, link e immagini del menu in TUTTE le pagine.
// Per mettere una foto in una voce: carica l'immagine nel repository
// e scrivi il suo nome in "immagine", per esempio immagine: 'menu-arte.jpg'
var sottosezioni = [
  { nome: 'Tutti gli articoli',    link: 'articoli.html',            immagine: '' },
  { nome: 'Filosofia',             link: 'filosofia.html',           immagine: '' },
  { nome: 'Architettura e design', link: 'architettura-design.html', immagine: '' },
  { nome: 'Arte',                  link: 'arte.html',                immagine: '' }
];

(function () {
  var voci = document.querySelectorAll('.voce-menu');
  if (!voci.length) return;

  var paginaCorrente = window.location.pathname.split('/').pop() || 'index.html';

  function costruisci(voce) {
    var tendina = voce.querySelector('.tendina');
    if (!tendina) return;
    tendina.innerHTML = '';

    var elenco = document.createElement('div');
    elenco.className = 'elenco';
    var anteprime = document.createElement('div');
    anteprime.className = 'anteprime';
    anteprime.setAttribute('aria-hidden', 'true');

    var viste = [];

    function mostra(n) {
      for (var k = 0; k < viste.length; k++) {
        viste[k].className = viste[k].className.replace(' visibile', '');
        if (k === n) viste[k].className += ' visibile';
      }
    }

    sottosezioni.forEach(function (s, i) {
      var a = document.createElement('a');
      a.href = s.link;
      a.textContent = s.nome;
      if (s.link === paginaCorrente) a.className = 'attiva';
      a.addEventListener('mouseenter', function () { mostra(i); });
      a.addEventListener('focus', function () { mostra(i); });
      elenco.appendChild(a);

      var ant = document.createElement('div');
      ant.className = 'anteprima p' + (i + 1);
      if (s.immagine) {
        var img = document.createElement('img');
        img.src = s.immagine;
        img.alt = '';
        ant.appendChild(img);
      } else {
        var etichetta = document.createElement('span');
        etichetta.textContent = 'Qui andrà una foto';
        ant.appendChild(etichetta);
      }
      anteprime.appendChild(ant);
      viste.push(ant);
    });

    tendina.appendChild(elenco);
    tendina.appendChild(anteprime);
    mostra(0);
  }

  for (var i = 0; i < voci.length; i++) {
    (function (voce) {
      costruisci(voce);
      var link = voce.querySelector('a');
      link.addEventListener('click', function (e) {
        var touch = window.matchMedia('(max-width: 700px), (hover: none)').matches;
        if (touch && !voce.classList.contains('aperta')) {
          e.preventDefault();
          voce.classList.add('aperta');
        }
      });
    })(voci[i]);
  }

  // Toccando fuori dal menu, la tendina si chiude
  document.addEventListener('click', function (e) {
    for (var j = 0; j < voci.length; j++) {
      if (!voci[j].contains(e.target)) {
        voci[j].classList.remove('aperta');
      }
    }
  });
})();
