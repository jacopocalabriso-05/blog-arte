// Menu del sito: pulsante per telefono + tendina "Articoli"
// Sul computer la tendina si apre passando il mouse sopra "Articoli".
// Su telefono compare il pulsante a tre linee: toccandolo si apre il menu,
// e toccando "Articoli" si aprono le sottosezioni.
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
  var testata = document.querySelector('.testata');
  var nav = document.querySelector('.categorie');
  var voci = document.querySelectorAll('.voce-menu');

  var paginaCorrente = window.location.pathname.split('/').pop() || 'index.html';

  function chiudiTutto() {
    if (testata) testata.classList.remove('menu-aperto');
    for (var j = 0; j < voci.length; j++) voci[j].classList.remove('aperta');
    if (bottone) {
      bottone.setAttribute('aria-expanded', 'false');
      bottone.setAttribute('aria-label', 'Apri il menu');
    }
  }

  // ----- Pulsante a tre linee (visibile solo su telefono, via CSS) -----
  var bottone = null;
  if (testata && nav) {
    bottone = document.createElement('button');
    bottone.className = 'hamburger';
    bottone.type = 'button';
    bottone.setAttribute('aria-label', 'Apri il menu');
    bottone.setAttribute('aria-expanded', 'false');
    bottone.innerHTML = '<span></span><span></span><span></span>';
    testata.insertBefore(bottone, nav);

    bottone.addEventListener('click', function () {
      var aperto = testata.classList.toggle('menu-aperto');
      bottone.setAttribute('aria-expanded', aperto ? 'true' : 'false');
      bottone.setAttribute('aria-label', aperto ? 'Chiudi il menu' : 'Apri il menu');
      if (!aperto) {
        for (var j = 0; j < voci.length; j++) voci[j].classList.remove('aperta');
      }
    });
  }

  // ----- Tendina "Articoli" -----
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
        var telefono = window.matchMedia('(max-width: 700px)').matches;
        var touch = window.matchMedia('(hover: none)').matches;
        if (telefono) {
          // Su telefono "Articoli" apre e chiude le sottosezioni
          // ("Tutti gli articoli" porta alla pagina generale)
          e.preventDefault();
          voce.classList.toggle('aperta');
        } else if (touch && !voce.classList.contains('aperta')) {
          // Tablet: primo tocco apre la tendina, secondo apre la pagina
          e.preventDefault();
          voce.classList.add('aperta');
        }
      });
    })(voci[i]);
  }

  // Toccando fuori dalla testata il menu si chiude
  document.addEventListener('click', function (e) {
    if (testata && !testata.contains(e.target)) chiudiTutto();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chiudiTutto();
  });
  // Passando dal telefono al computer (es. ruotando lo schermo) si richiude tutto
  window.addEventListener('resize', function () {
    if (window.innerWidth > 700) chiudiTutto();
  });
})();
