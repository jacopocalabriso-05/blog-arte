// Oroscopo del giorno (pallino in basso a destra nella Home)
//
// COME MODIFICARLO
// - Ogni segno ha 3 testi: ogni giorno ne viene mostrato uno diverso, a rotazione.
// - Per cambiare un testo, modifica la frase tra virgolette.
// - Per aggiungere altri testi, aggiungi una frase in più (sempre tra virgolette,
//   separata da una virgola) nell'elenco "testi" del segno.
var segniOroscopo = [
  { nome: "Ariete", date: "21 mar – 19 apr", testi: [
    "Giornata di slancio: una nuova idea merita di diventare un progetto. Parti subito, i dettagli li sistemerai strada facendo.",
    "Meno fretta oggi: davanti a un'opera fermati un minuto in più. Scoprirai cose che non avevi notato.",
    "L'energia è alta, ma qualcuno ha bisogno di ascolto. Trattieni la battuta pronta e guadagnerai un'alleanza preziosa."
  ]},
  { nome: "Toro", date: "20 apr – 20 mag", testi: [
    "Concediti un piacere semplice: un buon caffè e quella mostra che rimandi da tempo. La pazienza oggi ti premia.",
    "Una questione pratica si risolve con calma. Non cedere alla fretta altrui e segui il tuo ritmo.",
    "Sensibilità per la bellezza ai massimi: scegli con cura ciò che ti circonda, anche un solo oggetto sulla scrivania."
  ]},
  { nome: "Gemelli", date: "21 mag – 20 giu", testi: [
    "Le parole ti vengono facili: è il momento giusto per scrivere, proporre o raccontare. Qualcuno ti ascolterà con attenzione.",
    "Troppe idee insieme: sceglierne una e portarla fino in fondo sarà la mossa vincente della giornata.",
    "Una conversazione inattesa apre una prospettiva nuova. Resta curioso e fai una domanda in più."
  ]},
  { nome: "Cancro", date: "21 giu – 22 lug", testi: [
    "Giornata da trascorrere in un luogo che ti fa sentire a casa. Un ricordo ti suggerisce la strada da prendere.",
    "Le emozioni sono intense ma ti guidano bene: fidati dell'istinto, soprattutto nelle scelte creative.",
    "Una persona vicina apprezza un tuo piccolo gesto. Non servono grandi parole, basta esserci."
  ]},
  { nome: "Leone", date: "23 lug – 22 ago", testi: [
    "Sei sotto i riflettori e ti riesce bene: presenta il tuo lavoro senza falsa modestia.",
    "Generosità premiata: condividere un'idea con il gruppo la renderà più forte di quanto immagini.",
    "Evita di voler avere l'ultima parola. Lasciare spazio agli altri oggi ti rende ancora più brillante."
  ]},
  { nome: "Vergine", date: "23 ago – 22 set", testi: [
    "I dettagli fanno la differenza: rileggi, controlla, sistema. Un piccolo errore evitato ti farà fare bella figura.",
    "Ritaglia mezz'ora per riordinare ciò che hai in sospeso. Ti sentirai più leggero e pronto a creare.",
    "Non essere troppo severo con te stesso: un'opera non deve essere perfetta per essere riuscita."
  ]},
  { nome: "Bilancia", date: "23 set – 22 ott", testi: [
    "Cerchi equilibrio e lo trovi in una decisione condivisa. Il confronto con gli altri chiarisce le idee.",
    "Giornata ideale per l'estetica: dai un tocco di armonia a un lavoro o a un ambiente.",
    "Un dubbio ti trattiene da giorni: oggi la scelta è più semplice di quanto sembri. Datti un termine e decidi."
  ]},
  { nome: "Scorpione", date: "23 ott – 21 nov", testi: [
    "Intuito affilato: percepisci ciò che gli altri non dicono. Usalo con tatto e aprirai una porta.",
    "Un tema profondo ti assorbe. Dedicagli tempo, ma ricordati di staccare e fare due passi.",
    "Una piccola rivalità si scioglie con un gesto sincero. Fare il primo passo ti costa poco e rende molto."
  ]},
  { nome: "Sagittario", date: "22 nov – 21 dic", testi: [
    "Voglia di orizzonti nuovi: pianifica una gita, anche breve, verso un luogo ricco di arte.",
    "L'entusiasmo contagia il gruppo, ma attento alle promesse troppo grandi. Meglio poche e mantenute.",
    "Una lettura o un incontro ti suggerisce una direzione. Segui la curiosità: raramente sbaglia."
  ]},
  { nome: "Capricorno", date: "22 dic – 19 gen", testi: [
    "Costanza e metodo ti portano lontano: oggi puoi fare un passo concreto verso un obiettivo di lungo periodo.",
    "Qualcuno riconosce il tuo impegno. Accetta il complimento senza minimizzare.",
    "Alleggerisci l'agenda: un'ora di pausa farà bene al lavoro più di un'ora in più alla scrivania."
  ]},
  { nome: "Acquario", date: "20 gen – 18 feb", testi: [
    "Un'idea originale ti viene in mente nel momento meno atteso: annotala subito, potrebbe diventare qualcosa di grande.",
    "Giornata favorevole alle collaborazioni: unire forze diverse dà un risultato sorprendente.",
    "Prenditi un momento solo per te: la tua creatività si ricarica nel silenzio."
  ]},
  { nome: "Pesci", date: "19 feb – 20 mar", testi: [
    "L'ispirazione è alta: musica, immagini e sogni a occhi aperti alimentano ciò che stai creando.",
    "Sei molto empatico oggi: ascolta, ma non caricarti dei problemi altrui. Proteggi le tue energie.",
    "Un'opera o una pagina ti emoziona più del previsto: concediti il tempo di lasciarti attraversare."
  ]}
];

(function () {
  // ----- Elementi: pallino + pannello -----
  var bottone = document.createElement('button');
  bottone.className = 'oroscopo-bottone';
  bottone.type = 'button';
  bottone.setAttribute('aria-label', "Apri l'oroscopo");
  bottone.setAttribute('aria-expanded', 'false');
  bottone.innerHTML = '<span aria-hidden="true">\u2726</span>';

  var pannello = document.createElement('div');
  pannello.className = 'oroscopo-pannello';
  pannello.setAttribute('role', 'dialog');
  pannello.setAttribute('aria-label', 'Oroscopo del giorno');
  pannello.hidden = true;

  var oggi = new Date();
  var dataTesto = oggi.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  pannello.innerHTML =
    '<div class="oroscopo-testa">' +
      '<div><h2>Oroscopo del giorno</h2><p class="oroscopo-data"></p></div>' +
      '<button class="oroscopo-chiudi" type="button" aria-label="Chiudi">&times;</button>' +
    '</div>' +
    '<div class="oroscopo-segni"></div>' +
    '<div class="oroscopo-risultato" aria-live="polite"></div>' +
    '<p class="oroscopo-nota">Scritto per gioco e intrattenimento.</p>';

  document.body.appendChild(pannello);
  document.body.appendChild(bottone);

  pannello.querySelector('.oroscopo-data').textContent = dataTesto;
  var contenitoreSegni = pannello.querySelector('.oroscopo-segni');
  var risultato = pannello.querySelector('.oroscopo-risultato');
  var bottoniSegni = [];

  // Numero del giorno: cambia ogni giorno, così il testo cambia a rotazione
  var giorno = Math.floor(Date.UTC(oggi.getFullYear(), oggi.getMonth(), oggi.getDate()) / 86400000);

  function mostra(i) {
    var s = segniOroscopo[i];
    var testo = s.testi[(giorno + i) % s.testi.length];
    risultato.innerHTML = '';
    var titolo = document.createElement('h3');
    titolo.textContent = s.nome;
    var date = document.createElement('small');
    date.textContent = s.date;
    var p = document.createElement('p');
    p.textContent = testo;
    risultato.appendChild(titolo);
    risultato.appendChild(date);
    risultato.appendChild(p);
    for (var k = 0; k < bottoniSegni.length; k++) {
      bottoniSegni[k].className = 'segno' + (k === i ? ' scelto' : '');
    }
    try { localStorage.setItem('oroscopoSegno', String(i)); } catch (e) {}
  }

  segniOroscopo.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'segno';
    b.title = s.nome + ' (' + s.date + ')';
    var simbolo = document.createElement('span');
    simbolo.className = 'simbolo';
    simbolo.textContent = String.fromCharCode(0x2648 + i) + '\uFE0E';
    var nome = document.createElement('span');
    nome.className = 'nome';
    nome.textContent = s.nome;
    b.appendChild(simbolo);
    b.appendChild(nome);
    b.addEventListener('click', function () { mostra(i); });
    contenitoreSegni.appendChild(b);
    bottoniSegni.push(b);
  });

  // Se il visitatore aveva già scelto il suo segno, lo ritrova
  var salvato = null;
  try { salvato = localStorage.getItem('oroscopoSegno'); } catch (e) {}
  if (salvato !== null && segniOroscopo[parseInt(salvato, 10)]) {
    mostra(parseInt(salvato, 10));
  } else {
    var invito = document.createElement('p');
    invito.className = 'invito';
    invito.textContent = 'Scegli il tuo segno per leggere cosa dicono le stelle oggi.';
    risultato.appendChild(invito);
  }

  // ----- Apertura e chiusura -----
  function apri() {
    pannello.hidden = false;
    bottone.classList.add('aperto');
    bottone.setAttribute('aria-expanded', 'true');
    bottone.setAttribute('aria-label', "Chiudi l'oroscopo");
  }
  function chiudi() {
    pannello.hidden = true;
    bottone.classList.remove('aperto');
    bottone.setAttribute('aria-expanded', 'false');
    bottone.setAttribute('aria-label', "Apri l'oroscopo");
  }

  bottone.addEventListener('click', function () {
    if (pannello.hidden) apri(); else chiudi();
  });
  pannello.querySelector('.oroscopo-chiudi').addEventListener('click', chiudi);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chiudi();
  });
  document.addEventListener('click', function (e) {
    if (!pannello.hidden && !pannello.contains(e.target) && !bottone.contains(e.target)) chiudi();
  });
})();
