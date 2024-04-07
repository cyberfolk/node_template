/******************************************************************************************************************
 *  LIB
 *  Di questo file js viene generato un codice HASH riportato in index.html
 *  <script src="./lib.js" integrity="sha256-[HASH-del-file]="></script>
 * 
 *  Se il codice HASH del file e il file stesso combacino è tutto ok,
 *  altrimenti il collegamento di questo file a index.html salta e viene generato un errore visibile nei log
 * 
 *  Per generare il codice HASH da questo file occorre:
 *  Posizionarsi col terminale nella directory di questo file e poi digitare: 
 *  $ openssl dgst -sha256 -binary lib.js | openssl base64 -A
 * 
 *  Questo comando genera un'impronta digitale unica del file usando SHA-256 e la converte in base64,
 *  formato richiesto dall'attributo 'integrity' nel tag <script> di HTML.
 *****************************************************************************************************************/

const hackerato = false