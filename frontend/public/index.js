// function principal() {
//     var produtoPronto = false;

//     function listagemDeProdutos(home) {
//         fetch('./dados/produtos.json')
//             .then(resposta => resposta.json())
//             .then(dadosJson => {
//                 console.log(dadosJson)
//                 dadosJson.map(item => {
//                     const section = document.querySelector("section");
//                     if (section !== null) {
//                         section.innerHTML += montaHTMLhome(item.nome, item.valor, item.imagem, item.id, item.genero, item.parcela);
//                     }
//                 });
//             });
//     }

//     listagemDeProdutos(home)

//     function montaHTMLhome(nome, preco, imagem, id, genero, parcela) {
//         return ` <div class="tenis-content" id="${id}">
//         <a href="./produto.html?produto=${id}">
//           <img class="image" src="${imagem}" alt="" href="?produto=${id}" />
//         </a>
//         <a href="./produto.html?produto=${id}" id="product" class="name">${nome}</a>
//         <p class="genero">${genero}</p>
//         <p class="frete">Frete Gratis</p>
//         <p>${preco}</p>
//         <p class="parcelas">${parcela}</p>
//       </div>`
//     }

//     function pegarProduto() {
//         const queryString = window.location.search; // pega o texto da url
//         // método split que utiliza o separador = para retornar o que tem depois dele
//         const queryArray = queryString.split("="); // retorna um array onde produto é o indice 0 e o ID indice 1
//         const idProduto = queryArray[1]; // acessa o ID pelo indice 1
//         fetch('./dados/produtos.json')
//             .then((resposta) => resposta.json())
//             .then((dados) => {
//                 dados.map((produto) => {
//                     const main = document.querySelector("main");
//                     if (main !== null) {
//                         if (idProduto != 'undefined' && parseInt(idProduto) == produto.id) //verifica se tem produto na url e transforma string em numero
//                         {
//                             main.innerHTML = montaHTMLproduto(produto.nome, produto.valor, produto.imagem, produto.descricao, produto.id);
//                         }
//                     }
//                     const carrinhoProduto = document.getElementById("produto-carrinho");
//                     if (carrinhoProduto !== null) {
//                         if (idProduto != 'undefined' && parseInt(idProduto) == produto.id) {
//                             carrinhoProduto.innerHTML = montaHTMLcarrinho(produto.nome, produto.imagem, produto.valor, produto.id);
//                             produtoPronto = true;
//                         }
//                     }

//                 });
//             });
//     }

//     pegarProduto()

//     function montaHTMLproduto(nome, preco, imagem, descricao, id) {
//         return ` <div class="product">
//       <img class="img" src="${imagem}" alt="imagem tenis da nike" />
//       <p class="name">${nome}</p>
//       <p class="preço">${preco}</p>
//       <p class="descricao">${descricao}</p>
//       <div>
//         <a href="carrinho.html?carrinho=${id}">
//           <button class="press">Adicionar ao carrinho</button>
//         </a>
//       </div>
//     </div> `
//     }

//     function montaHTMLcarrinho(nome, imagem, preco, id) {
//         return `<div class="product">
//           <img class="photo" src="${imagem}" alt="" />
//           <h1 id="produto-nome">${nome}</h1>
//           <p id="produto-preco">${preco}</p>
//           <div class="button">
//           <button id = "bt1"> - </button>
//             <input id="campo" type="text" value="1">
//             <button id="bt2"> + </button>
//           </div>
//         </div>
//         <div class="button2">
//           <button class="payment">Pagamento</button>
//         </div>`

//       }
//       // setTimeout(() => {
//       //   var botao = document.getElementById('bt1');
//       //   var valor = 0

//       //   if (botao !== null) {
//       //     var campo = document.getElementById('campo');

//       //     botao.addEventListener('click', function (e) {
//       //       campo.value = valor--
//       //     });

//       //   }
//       // }, 2000);

//       //settimeout atrasar a funcionalidade do botao
//       setTimeout(() => {
//         var botao = document.getElementById('bt2');
//         var valor = 2;

//          if (botao !== null) {
//             var campo = document.getElementById('campo');

//            botao.addEventListener('click', function (e) {
//              campo.value = valor++
//            });

//          }
//       }, 1000);

// }

// principal();
