// Buscar CEP
function buscarCEP() {
    //console.log("teste do evento blur")
    //armazenar o cep digitado na variável
    let cep = document.getElementById('inputCEPClient').value
    //console.log(cep) //teste de recebimento do CEP
    //"consumir" a API do ViaCEP
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    //acessando o web service par abter os dados
    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            //extração dos dados
            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf
        })
        .catch(error => console.log(error))
}

// vetor global que será usado na manipulação dos dados
let arrayClient = []

// capturar o foco na busca pelo nome
// a constant foco obtem o elemento html (input) identificado como 'searchCliente'
const foco = document.getElementById('searchClient')

// iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
    // desativar os botões
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Foco na busca do cliente
    foco.focus()
})

//captura dos dados dos inputs do formulario (passo 1: fluxo)
let frmClient = document.getElementById('frmClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let bairroClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')

// ===============================
// = CRUD Create/Update ===============

// Evento associado ao botão submmit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    //teste importante (recebimento dos dados do formulário - passo 1 do fluxo)
    console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, bairroClient.value, cityClient.value, ufClient.value)
    //criar um objeto para armazenar os dados cliente antes de enviar ao main
    const client = {
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        bairroCli: bairroClient.value,
        cityClient: cityClient.value,
        ufCli: ufClient.value
    }
    // enviar ao main o objeto client - (Passo 2 - fluxo)
    // uso do preload.js
    api.newClient(client)
})

// = Fim CRUD Create/Update

// ========= CRUD Read ================

function buscarCliente() {
    //console.log("teste do botão buscar")
    // passo 1: capturar o nome do cliente
    let name = document.getElementById('searchClient').value
    console.log(name) // teste do passo 1
    api.searchName(name) // passo 2: envio do nome ao main
    // recebimento dos dados do cliente
    api.renderClient((event, dataClient) => {
        console.log(dataClient) // teste do passo 5
        // passo 6 renderizar os dados do cliente no formulário 
        // - criar um vetor global para manipulação dos dados
        // - criar uma constante para converter os dados recebidos (string) para o formato JSON
        // usar o laço forEach para percorrer o vetor e setar os campos (caixas de texto) do formulário
        const dadosCliente = JSON.parse(dataClient)
        // atribuir ao vetor os dados do cliente
        arrayClient = dadosCliente
        // extrair os dados do cliente
        arrayClient.forEach((c) => {
            nameClient.value = c.nomeCliente,
            cpfClient.value = c.cpfCliente,
            emailClient.value = c.emailCliente,
            phoneClient.value = c.foneCliente,
            cepClient.value = c.cepCliente,
            addressClient.value = c.logradouroCliente,
            numberClient.value = c.numeroCliente,
            complementClient.value = c.complementoCliente,
            bairroClient.value = c.bairroCliente,
            cityClient.value = c.cidadeCliente,
            ufClient.value = c.ufCliente
        })
    })
}

// ========= Fim CRUD Read ============

// =================== Reset Form ============ //

function resetForm() {
    // limpar os campos e resetar o formulário com as configuraçoes pré definidas
    location.reload()
}

// recebimento do pedido do main para resetar o formulario
api.resetForm((args) => {
    resetForm()
})

// =================== Fim Reset Form ======== //