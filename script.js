const produtos=[
{nome:'Trufa Amendoim',preco:3.50,img:'amendoim.jpg '},
{nome:'Trufa Oreo',preco:3.50,img:'oreon.jpg'},
{nome:'Trufa Brigadeiro',preco:3.50,img:'brigadeiro.webp'},
{nome:'Trufa Abacaxi',preco:3.50,img:'abacaxi.jpg'},
{nome:'Trufa Morango',preco:3.50,img:'morango.jpg'},
{nome:'Trufa Limão',preco:3.50,img:'limao.jpg'},
{nome:'Trufa Café',preco:3.50,img:'cafe.jpg'},
{nome:'Trufa Beijinho',preco:3.50,img:'beijinho.jpeg'}
];

let carrinho=[];

function renderProdutos(lista=produtos){
const div=document.getElementById('produtos');
div.innerHTML='';
lista.forEach((p,i)=>{
div.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h3>${p.nome}</h3>
<div class="preco">R$ ${p.preco.toFixed(2)}</div>
<div class="qtd">
<button onclick="alterar(${i},-1)">-</button>
<span id="q${i}">1</span>
<button onclick="alterar(${i},1)">+</button>
</div>
<button class="add" onclick="adicionar(${i})">Adicionar ao Carrinho</button>
</div>`;
});
}

const qtds={};
for(let i=0;i<8;i++)qtds[i]=1;

function alterar(i,v){
qtds[i]=Math.max(1,qtds[i]+v);
document.getElementById('q'+i).innerText=qtds[i];
}

function adicionar(i){
carrinho.push({...produtos[i],qtd:qtds[i]});
renderCarrinho();
document.getElementById('btnCarrinho').classList.add('pulse');
setTimeout(()=>btnCarrinho.classList.remove('pulse'),400);
}

function renderCarrinho(){
let html='';
let total=0;
carrinho.forEach((p,index)=>{
total+=p.preco*p.qtd;
html+=`<div class="item">${p.nome}<br>Qtd:${p.qtd} - R$ ${(p.preco*p.qtd).toFixed(2)}
<br><button onclick="remover(${index})">Remover</button></div>`;
});
itens.innerHTML=html;
contador.innerText=carrinho.length;
document.getElementById('total').innerText=total.toFixed(2);
}

function remover(i){carrinho.splice(i,1);renderCarrinho();}
function limparCarrinho(){carrinho=[];renderCarrinho();}
function abrirCarrinho(){document.getElementById('carrinho').classList.toggle('aberto');}

function finalizarPedido(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = 0;

    let msg='🍫 *PEDIDO DONA PAULA*%0A%0A';

    carrinho.forEach(i=>{
        msg+=`${i.nome} | Qtd:${i.qtd} | R$ ${(i.preco*i.qtd).toFixed(2)}%0A`;
        total+=i.preco*i.qtd;
    });

    let totalGeral = total + frete;

    msg+=`%0A💰 Produtos: R$ ${total.toFixed(2)}%0A`;
    msg+=`🚚 Frete: R$ ${frete.toFixed(2)}%0A`;
    msg+=`🧾 Total Geral: R$ ${totalGeral.toFixed(2)}%0A%0A`;

    msg+=`👤 Nome: ${nome.value}%0A`;
    msg+=`📞 Telefone: ${telefone.value}%0A`;
    msg+=`📍 Endereço: ${rua.value}, ${numero.value} - ${bairro.value}%0A`;
    msg+=`📝 Observações: ${obs.value}%0A`;

    window.open('https://wa.me/558888170526?text='+msg);
}

pesquisa.addEventListener('input',e=>{
let t=e.target.value.toLowerCase();
renderProdutos(produtos.filter(p=>p.nome.toLowerCase().includes(t)));
});

renderProdutos();

let slides=document.querySelectorAll('.slide');
let atual=0;
setInterval(()=>{
slides[atual].classList.remove('ativo');
atual=(atual+1)%slides.length;
slides[atual].classList.add('ativo');
},4000);
let frete = 0;

function calcularFrete() {

const cep = document.getElementById("cep").value.replace(/\D/g,'');

if (cep.length < 5) {
    alert("Digite um CEP válido.");
    return;
}

const prefixo = cep.substring(0,5);

if (prefixo === "62250") { // Ipu
    frete = 10;
}
else if (prefixo === "62370") { // São Benedito
    frete = 10;
}
else if (prefixo === "62270") { // Hidrolândia
    frete = 20;
}
else if (prefixo === "62350") { // Croatá
    frete = 20;
}
else if (prefixo === "62260") { // Reriutaba
    frete = 20;
}
else if (prefixo === "62380") { // Guaraciaba do Norte
    frete = 0;
}
else {
    alert("CEP fora da área de entrega.");
    frete = 0;
}

document.getElementById("freteTexto").innerHTML =
    "Frete: R$ " + frete.toFixed(2).replace(".", ",");

atualizarTotalGeral();

}

function atualizarTotalGeral(){

    let totalProdutos = parseFloat(
        document.getElementById("total").innerText.replace(",",".")
    );

    let totalFinal = totalProdutos + frete;

    document.getElementById("totalGeral").innerHTML =
        totalFinal.toFixed(2).replace(".",",");
}