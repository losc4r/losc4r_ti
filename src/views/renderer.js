/**
 * Processo de renderização
 */

console.log("Processor de renderização")

// envio de uma mensagem para o main abrir a janela cliente
function client() {
    //console.log("teste")
    //uso da api(autorizada no preload.js)
    api.clientWindow()
}

function os() {
    //console.log("teste")
    //uso da api(autorizada no preload.js)
    api.osWindow()
}