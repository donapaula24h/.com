const produtos=[
{nome:'Trufa Brigadeiro',preco:5,img:'img/trufa1.jpg'},
{nome:'Trufa Ninho',preco:5,img:'img/trufa2.jpg'},
{nome:'Trufa Morango',preco:5,img:'img/trufa3.jpg'},
{nome:'Trufa Prestigio',preco:5,img:'img/trufa4.jpg'},
{nome:'Trufa Oreo',preco:5,img:'img/trufa5.jpg'},
{nome:'Trufa Paçoca',preco:5,img:'img/trufa6.jpg'},
{nome:'Trufa Café',preco:5,img:'img/trufa7.jpg'},
{nome:'Trufa Especial',preco:5,img:'img/trufa8.jpg'}
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
let msg='🍫 *PEDIDO DONA PAULA*%0A%0A';
let total=0;
carrinho.forEach(i=>{
msg+=`${i.nome} | Qtd:${i.qtd} | R$ ${(i.preco*i.qtd).toFixed(2)}%0A`;
total+=i.preco*i.qtd;
});
msg+=`%0A💰 Total: R$ ${total.toFixed(2)}%0A%0A`;
msg+=`👤 ${nome.value}%0A📞 ${telefone.value}%0A📍 ${rua.value}, ${numero.value} - ${bairro.value}%0A📝 ${obs.value}`;
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
