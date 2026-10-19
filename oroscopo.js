// OROSCOPO della Home: pulsante in basso a destra che apre un pannello con i 12 segni.
//
// COME SI AGGIORNA: modifica solo i testi qui sotto (e il "periodo").
// Ogni segno ha: nome, simbolo, date e testo. Salva il file e caricalo su GitHub.
// I testi attuali sono ESEMPI inventati: sostituiscili con i vostri.

var oroscopoPeriodo = 'Settimana dal 19 al 25 ottobre';

var oroscopoSegni = [
  { nome: 'Ariete',      simbolo: '\u2648', date: '21 marzo - 19 aprile',
    testo: 'Una mostra che avevi rimandato torna a chiamarti. Vai senza fretta: la prima opera che ti ferma è quella giusta.' },
  { nome: 'Toro',        simbolo: '\u2649', date: '20 aprile - 20 maggio',
    testo: 'Settimana ideale per guardare con calma un quadro che pensavi di conoscere. Troverai un dettaglio nuovo.' },
  { nome: 'Gemelli',     simbolo: '\u264A', date: '21 maggio - 20 giugno',
    testo: 'Troppe idee, poco tempo: scegline una e portala fino in fondo. Un amico ti darà il consiglio decisivo.' },
  { nome: 'Cancro',      simbolo: '\u264B', date: '21 giugno - 22 luglio',
    testo: 'Un ricordo legato a un luogo ti ispira qualcosa di creativo. Appuntalo subito, domani sembrerà meno chiaro.' },
  { nome: 'Leone',       simbolo: '\u264C', date: '23 luglio - 22 agosto',
    testo: 'Sei sotto i riflettori, ma il merito è anche di chi ti sta accanto. Condividilo e la luce raddoppia.' },
  { nome: 'Vergine',     simbolo: '\u264D', date: '23 agosto - 22 settembre',
    testo: 'L\'ordine ti dà serenità, ma questa settimana prova a lasciare spazio all\'imprevisto: porta cose belle.' },
  { nome: 'Bilancia',    simbolo: '\u264E', date: '23 settembre - 22 ottobre',
    testo: 'Armonia nei rapporti e buon gusto nelle scelte. Un oggetto di design ti conquista: resisti almeno un giorno.' },
  { nome: 'Scorpione',   simbolo: '\u264F', date: '23 ottobre - 21 novembre',
    testo: 'Ti attirano i misteri: un artista poco noto merita la tua attenzione. Cerca, leggi, lasciati sorprendere.' },
  { nome: 'Sagittario',  simbolo: '\u2650', date: '22 novembre - 21 dicembre',
    testo: 'Voglia di viaggiare, anche solo con la fantasia. Un libro d\'arte ti porta lontano senza muoverti.' },
  { nome: 'Capricorno',  simbolo: '\u2651', date: '22 dicembre - 19 gennaio',
    testo: 'Costanza premiata: un lavoro iniziato da tempo comincia a dare risultati. Concediti una pausa per festeggiare.' },
  { nome: 'Acquario',    simbolo: '\u2652', date: '20 gennaio - 18 febbraio',
    testo: 'Un\'idea fuori dagli schemi trova ascolto. Non spiegarla troppo: mostrala, e sarà più chiara delle parole.' },
  { nome: 'Pesci',       simbolo: '\u2653', date: '19 febbraio - 20 marzo',
    testo: 'Sensibilità al massimo: musica e colori ti parlano più del solito. Usali per ricaricarti prima del weekend.' }
];

(function () {
  // \uFE0E forza il disegno "a tratto" dei simboli, senza emoji colorate
  var STILE_TESTO = '\uFE0E';

  var bottone = document.createElement('button');
  bottone.className = 'oroscopo-bottone';
  bottone.type = 'button';
  bottone.setAttribute('aria-label', 'Apri l\'oroscopo');
  bottone.setAttribute('aria-expanded', 'false');
  bottone.innerHTML = '<span class="oroscopo-icona" aria-hidden="true">\u2726</span>' +
                      '<span class="oroscopo-tooltip">Oroscopo</span>';

  var pannello = document.createElement('div');
  pannello.className = 'oroscopo-pannello';
  pannello.setAttribute('role', 'dialog');
  pannello.setAttribute('aria-label', 'Oroscopo');

  var testa = document.createElement('div');
  testa.className = 'oroscopo-testa';
  var titolo = document.createElement('div');
  var h2 = document.createElement('h2');
  h2.textContent = 'Oroscopo';
  var periodo = document.createElement('small');
  periodo.textContent = oroscopoPeriodo;
  titolo.appendChild(h2);
  titolo.appendChild(periodo);
  var chiudi = document.createElement('button');
  chiudi.type = 'button';
  chiudi.className = 'oroscopo-chiudi';
  chiudi.setAttribute('aria-label', 'Chiudi l\'oroscopo');
  chiudi.textContent = '\u00D7';
  testa.appendChild(titolo);
  testa.appendChild(chiudi);

  var griglia = document.createElement('div');
  griglia.className = 'oroscopo-segni';

  var testo = document.createElement('div');
  testo.className = 'oroscopo-testo';
  testo.textContent = 'Scegli il tuo segno per leggere l\'oroscopo.';

  var nota = document.createElement('p');
  nota.className = 'oroscopo-nota';
  nota.textContent = 'Solo per divertimento.';

  var pulsanti = [];

  function scegli(i) {
    for (var k = 0; k < pulsanti.length; k++) {
      pulsanti[k].classList.toggle('attivo', k === i);
    }
    var s = oroscopoSegni[i];
    testo.innerHTML = '';
    var nome = document.createElement('h3');
    nome.textContent = s.nome;
    var date = document.createElement('small');
    date.textContent = s.date;
    var p = document.createElement('p');
    p.textContent = s.testo;
    testo.appendChild(nome);
    testo.appendChild(date);
    testo.appendChild(p);
  }

  oroscopoSegni.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'oroscopo-segno';
    var simbolo = document.createElement('span');
    simbolo.className = 'oroscopo-simbolo';
    simbolo.textContent = s.simbolo + STILE_TESTO;
    var nome = document.createElement('span');
    nome.textContent = s.nome;
    b.appendChild(simbolo);
    b.appendChild(nome);
    b.addEventListener('click', function () { scegli(i); });
    griglia.appendChild(b);
    pulsanti.push(b);
  });

  pannello.appendChild(testa);
  pannello.appendChild(griglia);
  pannello.appendChild(testo);
  pannello.appendChild(nota);

  function apri() {
    pannello.classList.add('aperto');
    bottone.setAttribute('aria-expanded', 'true');
    bottone.setAttribute('aria-label', 'Chiudi l\'oroscopo');
  }
  function chiudiPannello() {
    pannello.classList.remove('aperto');
    bottone.setAttribute('aria-expanded', 'false');
    bottone.setAttribute('aria-label', 'Apri l\'oroscopo');
  }

  bottone.addEventListener('click', function () {
    if (pannello.classList.contains('aperto')) chiudiPannello(); else apri();
  });
  chiudi.addEventListener('click', chiudiPannello);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chiudiPannello();
  });
  // Cliccando fuori dal pannello si chiude
  document.addEventListener('click', function (e) {
    if (!pannello.contains(e.target) && !bottone.contains(e.target)) chiudiPannello();
  });

  document.body.appendChild(pannello);
  document.body.appendChild(bottone);
})();
