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

// ELENCO PER LA RICERCA: la lente cerca tra queste pagine.
// Quando ci saranno gli articoli, si aggiungono qui (titolo, link e qualche parola chiave).
var paginePerRicerca = [
  { titolo: 'Home',                  link: 'index.html',               parole: 'inizio principale carosello' },
  { titolo: 'Articoli',              link: 'articoli.html',            parole: 'approfondimenti storie' },
  { titolo: 'Filosofia',             link: 'filosofia.html',           sezione: 'Articoli', parole: 'idee riflessioni pensiero' },
  { titolo: 'Architettura e design', link: 'architettura-design.html', sezione: 'Articoli', parole: 'spazi forme oggetti edifici' },
  { titolo: 'Arte',                  link: 'arte.html',                sezione: 'Articoli', parole: 'opere artisti movimenti pittura scultura' },
  { titolo: 'News',                  link: 'news.html',                parole: 'novita notizie ultime' },
  { titolo: 'Università',            link: 'universita.html',          parole: 'corsi percorsi universitari' },
  { titolo: 'Interviste',            link: 'interviste.html',          parole: 'conversazioni artisti protagonisti' }
];

(function () {
  var testata = document.querySelector('.testata');
  var nav = document.querySelector('.categorie');
  var voci = document.querySelectorAll('.voce-menu');

  var paginaCorrente = window.location.pathname.split('/').pop() || 'index.html';

  function chiudiTutto() {
    chiudiRicerca();
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

  // ----- Ricerca: lente a destra nella testata, al clic compare la barra -----
  var ricerca = null;
  var campo = null;
  var risultati = null;

  function normalizza(testo) {
    return testo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function chiudiRicerca() {
    if (!ricerca) return;
    ricerca.classList.remove('aperta');
    risultati.hidden = true;
    ricerca.querySelector('.ricerca-bottone').setAttribute('aria-expanded', 'false');
  }

  function aggiornaRisultati() {
    var scritto = campo.value.trim();
    risultati.innerHTML = '';
    if (!scritto) { risultati.hidden = true; return; }

    var parole = normalizza(scritto).split(/\s+/);
    var trovati = paginePerRicerca.filter(function (p) {
      var testo = normalizza(p.titolo + ' ' + (p.sezione || '') + ' ' + (p.parole || ''));
      return parole.every(function (w) { return testo.indexOf(w) !== -1; });
    }).slice(0, 6);

    if (!trovati.length) {
      var vuoto = document.createElement('li');
      vuoto.className = 'nessuno';
      vuoto.textContent = 'Nessun risultato per "' + scritto + '"';
      risultati.appendChild(vuoto);
    } else {
      trovati.forEach(function (p) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = p.link;
        a.textContent = p.titolo;
        if (p.sezione) {
          var piccolo = document.createElement('small');
          piccolo.textContent = p.sezione;
          a.appendChild(piccolo);
        }
        li.appendChild(a);
        risultati.appendChild(li);
      });
    }
    risultati.hidden = false;
  }

  if (testata && nav) {
    ricerca = document.createElement('div');
    ricerca.className = 'ricerca';
    ricerca.innerHTML =
      '<form class="ricerca-form" role="search">' +
        '<input type="search" placeholder="Cerca nel blog…" aria-label="Cerca nel blog" autocomplete="off">' +
      '</form>' +
      '<button class="ricerca-bottone" type="button" aria-label="Cerca" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
        '<circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>' +
      '</button>' +
      '<ul class="ricerca-risultati" hidden></ul>';
    testata.appendChild(ricerca);

    campo = ricerca.querySelector('input');
    risultati = ricerca.querySelector('.ricerca-risultati');
    var bottoneRicerca = ricerca.querySelector('.ricerca-bottone');

    bottoneRicerca.addEventListener('click', function () {
      if (ricerca.classList.contains('aperta')) {
        chiudiRicerca();
      } else {
        // si chiude l'eventuale menu del telefono prima di aprire la ricerca
        testata.classList.remove('menu-aperto');
        for (var j = 0; j < voci.length; j++) voci[j].classList.remove('aperta');
        ricerca.classList.add('aperta');
        bottoneRicerca.setAttribute('aria-expanded', 'true');
        setTimeout(function () { campo.focus(); }, 50);
        aggiornaRisultati();
      }
    });

    campo.addEventListener('input', aggiornaRisultati);
    ricerca.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var primo = risultati.querySelector('a');
      if (primo) window.location.href = primo.getAttribute('href');
    });

    // Toccando fuori dalla barra, si chiude
    document.addEventListener('click', function (e) {
      if (!ricerca.contains(e.target)) chiudiRicerca();
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
