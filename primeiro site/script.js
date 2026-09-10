let carrinho = [];
let categoriaAtual = "todos";

/* =========================
   ADICIONAR AO CARRINHO
========================= */

function adicionarCarrinho(nome, preco, tamanho, cor, imagem) {

    let produto = carrinho.find(item =>
        item.nome === nome &&
        item.tamanho === tamanho &&
        item.cor === cor
    );

    if (produto) {

        produto.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            tamanho: tamanho,
            cor: cor,
            imagem: imagem,
            quantidade: 1
        });

    }

    atualizarCarrinho();
    mostrarCarrinho();
    abrirCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}


/* =========================
   ATUALIZAR QUANTIDADE DO TOPO
========================= */

function atualizarCarrinho() {

    let quantidade = 0;

    carrinho.forEach(item => {
        quantidade += item.quantidade;
    });

    document.getElementById("quantidade").textContent = quantidade;
}


/* =========================
   ABRIR CARRINHO
========================= */

function abrirCarrinho() {

    document
        .getElementById("carrinhoLateral")
        .classList.add("aberto");

    mostrarCarrinho();
}


/* =========================
   FECHAR CARRINHO
========================= */

function fecharCarrinho() {

    document
        .getElementById("carrinhoLateral")
        .classList.remove("aberto");
}


/* =========================
   MOSTRAR CARRINHO
========================= */

function mostrarCarrinho() {

    let lista =
        document.getElementById("listaCarrinho");

    let total = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    } else {

        carrinho.forEach(function(item, index) {

            let subtotal =
                item.preco * item.quantidade;

            total += subtotal;

            let produto =
                document.createElement("div");

            produto.className =
                "item-carrinho";


            /* IMAGEM */

            let imagem =
                document.createElement("img");

            imagem.className =
                "imagem-carrinho";

            imagem.src =
                item.imagem;

            imagem.alt =
                item.nome;


            /* INFORMAÇÕES */

            let informacoes =
                document.createElement("div");

            informacoes.className =
                "informacoes-carrinho";


            /* NOME */

            let nome =
                document.createElement("h3");

            nome.textContent =
                item.nome;


            /* TAMANHO */

            let tamanho =
                document.createElement("p");

            tamanho.textContent =
                "Tamanho: " +
                item.tamanho;


            /* COR */

            let cor =
                document.createElement("p");

            cor.textContent =
                "Cor: " +
                item.cor;


            /* PREÇO */

            let preco =
                document.createElement("p");

            preco.textContent =
                "Preço: R$ " +
                item.preco.toFixed(2);


            /* CONTROLE DE QUANTIDADE */

            let controle =
                document.createElement("div");

            controle.className =
                "quantidade-controle";


            let diminuir =
                document.createElement("button");

            diminuir.textContent =
                "−";

            diminuir.onclick =
                function() {

                    diminuirQuantidade(index);

                };


            let quantidade =
                document.createElement("span");

            quantidade.textContent =
                item.quantidade;


            let aumentar =
                document.createElement("button");

            aumentar.textContent =
                "+";

            aumentar.onclick =
                function() {

                    aumentarQuantidade(index);

                };


            let remover =
                document.createElement("button");

            remover.textContent =
                "🗑️ Remover";

            remover.onclick =
                function() {

                    removerProduto(index);

                };


            controle.appendChild(diminuir);
            controle.appendChild(quantidade);
            controle.appendChild(aumentar);

            informacoes.appendChild(nome);
            informacoes.appendChild(tamanho);
            informacoes.appendChild(cor);
            informacoes.appendChild(preco);
            informacoes.appendChild(controle);
            informacoes.appendChild(remover);

            produto.appendChild(imagem);
            produto.appendChild(informacoes);

            lista.appendChild(produto);

        });

    }

    document.getElementById("total").textContent =
        total.toFixed(2);
}


/* =========================
   AUMENTAR QUANTIDADE
========================= */

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

    mostrarCarrinho();
}


/* =========================
   DIMINUIR QUANTIDADE
========================= */

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

    mostrarCarrinho();
}


/* =========================
   REMOVER PRODUTO
========================= */

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

    mostrarCarrinho();
}


/* =========================
   CALCULAR TOTAL
========================= */

function calcularTotal() {

    let total = 0;

    carrinho.forEach(function(item) {

        total +=
            item.preco * item.quantidade;

    });

    return total;
}


/* =========================
   FINALIZAR PEDIDO
========================= */

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    document
        .getElementById("modalPedido")
        .classList.add("aberto");
}


/* =========================
   FECHAR FORMULÁRIO
========================= */

function fecharFormulario() {

    document
        .getElementById("modalPedido")
        .classList.remove("aberto");
}


/* =========================
   ENVIAR PEDIDO PELO WHATSAPP
========================= */

function enviarPedidoWhatsApp() {

    let nome =
        document
            .getElementById("nomeCliente")
            .value
            .trim();

    let endereco =
        document
            .getElementById("enderecoCliente")
            .value
            .trim();

    let pagamento =
        document
            .getElementById("pagamentoCliente")
            .value;


    if (nome === "") {

        alert("Digite seu nome.");

        return;
    }


    if (endereco === "") {

        alert("Digite seu endereço.");

        return;
    }


    if (pagamento === "") {

        alert("Selecione a forma de pagamento.");

        return;
    }


    let mensagem =
        "🛍️ *NOVO PEDIDO - ARTISTAS136*\n\n";


    mensagem +=
        "👤 *Cliente:* " +
        nome +
        "\n";


    mensagem +=
        "📍 *Endereço:* " +
        endereco +
        "\n";


    mensagem +=
        "💳 *Pagamento:* " +
        pagamento +
        "\n\n";


    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n";


    mensagem +=
        "🛒 *PRODUTOS*\n";


    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    carrinho.forEach(function(item, index) {

        let subtotal =
            item.preco *
            item.quantidade;


        mensagem +=
            "📦 *Produto " +
            (index + 1) +
            "*\n";


        mensagem +=
            "👕 " +
            item.nome +
            "\n";


        mensagem +=
            "🎨 Cor: " +
            item.cor +
            "\n";


        mensagem +=
            "📏 Tamanho: " +
            item.tamanho +
            "\n";


        mensagem +=
            "🔢 Quantidade: " +
            item.quantidade +
            "\n";


        mensagem +=
            "💵 Preço: R$ " +
            item.preco.toFixed(2) +
            "\n";


        mensagem +=
            "💰 Subtotal: R$ " +
            subtotal.toFixed(2) +
            "\n\n";

    });


    let total =
        calcularTotal();


    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n";


    mensagem +=
        "💰 *TOTAL: R$ " +
        total.toFixed(2) +
        "*\n";


    mensagem +=
        "━━━━━━━━━━━━━━━━━━\n\n";


    mensagem +=
        "Olá! Gostaria de finalizar este pedido. 😊";


    let numero =
        "5516994240938";


    let link =
        "https://wa.me/" +
        numero +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(link, "_blank");


    fecharFormulario();
}


/* =========================
   CAMISETA
========================= */

function adicionarCamiseta() {

    let tamanho =
        document
            .getElementById("tamanhoCamiseta")
            .value;

    let cor =
        document
            .getElementById("corCamiseta")
            .value;


    adicionarCarrinho(
        "Camiseta Preta",
        59.90,
        tamanho,
        cor,
        "images/camiseta-preta.png"
    );
}


/* =========================
   CALÇA
========================= */

function adicionarCalca() {

    let tamanho =
        document
            .getElementById("tamanhoCalca")
            .value;

    let cor =
        document
            .getElementById("corCalca")
            .value;


    adicionarCarrinho(
        "Calça Jeans",
        129.90,
        tamanho,
        cor,
        "images/calca.png.png"
    );
}


/* =========================
   MOLETOM
========================= */

function adicionarMoletom() {

    let tamanho =
        document
            .getElementById("tamanhoMoletom")
            .value;

    let cor =
        document
            .getElementById("corMoletom")
            .value;


    adicionarCarrinho(
        "Moletom",
        99.90,
        tamanho,
        cor,
        "images/moletom.png"
    );
}


/* ==================================================
   PESQUISA + FILTRO DE CATEGORIA - PASSO 8
================================================== */

function aplicarFiltros() {

    let pesquisa =
        document
            .getElementById("pesquisaProduto")
            .value
            .toLowerCase()
            .trim();


    let produtos =
        document.querySelectorAll(".produto");


    produtos.forEach(function(produto) {

        let nome =
            produto
                .querySelector("h3")
                .textContent
                .toLowerCase();


        let categoria =
            produto.dataset.categoria;


        /* VERIFICA A PESQUISA */

        let correspondePesquisa =
            nome.includes(pesquisa);


        /* VERIFICA A CATEGORIA */

        let correspondeCategoria =
            categoriaAtual === "todos" ||
            categoria === categoriaAtual;


        /* MOSTRA OU ESCONDE */

        if (
            correspondePesquisa &&
            correspondeCategoria
        ) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });
}


/* =========================
   FILTRAR CATEGORIA
========================= */

function filtrarCategoria(categoria, botao) {

    categoriaAtual =
        categoria;


    /* REMOVE O ATIVO DOS BOTÕES */

    document
        .querySelectorAll(".filtro")
        .forEach(function(botaoFiltro) {

            botaoFiltro.classList.remove("ativo");

        });


    /* DEIXA O BOTÃO CLICADO ATIVO */

    if (botao) {

        botao.classList.add("ativo");

    }


    /* APLICA O FILTRO */

    aplicarFiltros();
}


/* =========================
   PESQUISA DE PRODUTOS
========================= */

document
    .getElementById("pesquisaProduto")
    .addEventListener(
        "input",
        function() {

            aplicarFiltros();

        }
    );
    /* =========================
   FAVORITOS ❤️
========================= */

function favoritarProduto(botao) {

    botao.classList.toggle("favoritado");

    if (botao.classList.contains("favoritado")) {

        botao.textContent = "♥";

    } else {

        botao.textContent = "♡";

    }

}