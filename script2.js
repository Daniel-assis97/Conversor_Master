const camporeal = document.getElementById('camporeal')
const spanResultadoDolar = document.getElementById('resDolar')
const spanResultadoEuro = document.getElementById('resEuro')
let cotacaoDolar = 5.25
let cotacaoEuro = 6.05

const url ='https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL'
fetch(url)
.then(Response => {
    if(Response.ok){
        return Response.json()
    }
})
.then(info => {
    cotacaoDolar = parseFloat(info.USDBRL.bid)
    cotacaoEuro = parseFloat(info.EURBRL.bid)

    console.log(`Cotação atual do Euro: ${cotacaoEuro.toLocaleString("pt-br", {style:'currency', currency: 'BRL'})}`)
    console.log(`Cotação atual do Dólar: ${cotacaoDolar.toLocaleString("pt-br", {style:'currency', currency: 'BRL'})}`)
        
})

.catch(erro => {
        console.error("Não foi possível buscar as cotações reais. Usando valores fixos.");
        console.error(erro);
    });




function Enviar(event){
    if(event) event.preventDefault();
    
    const valor = camporeal.value 
    const valorTrocado = valor.replace(',','.')
    const valorFull = parseFloat(valorTrocado)

    if(valor === '' || isNaN(valorFull) || valorFull <= 0){
        alert("Erro! Digite um número válido.")

        camporeal.value = ''
        spanResultadoDolar.innerHTML = ''
        spanResultadoEuro.innerHTML = ''
        return 
    }

    spanResultadoDolar.innerHTML = 'Calculando...'
    spanResultadoEuro.innerHTML = 'Calculando...'

    setTimeout(() => {

    const ConvertDolar = valorFull/cotacaoDolar
    const ConvertEuro = valorFull/cotacaoEuro

    console.log("--- Conversão Realizada ---");
    console.log(`Valor inserido: R$ ${valorFull}`);
    console.log(`Cotação Dólar usada: ${cotacaoDolar}`);
    console.log(`Cotação Euro usada: ${cotacaoEuro}`);
    console.log("---------------------------");

    spanResultadoEuro.innerHTML = `${ConvertEuro.toLocaleString("pt-br", {style:'currency', currency: 'EUR'})}`
    spanResultadoDolar.innerHTML = `${ConvertDolar.toLocaleString("en", {style:'currency', currency: 'USD'})}`
    }, 500)
} 

function apagar(event){
    if (event) event.preventDefault();
    
    camporeal.value = ''
    spanResultadoDolar.innerHTML = ''
    spanResultadoEuro.innerHTML = ''
    camporeal.focus();
}
