const listaAnotacoes = document.querySelector("#anotacoes");
const token = localStorage.getItem("token");

async function carregarAnotacoes() {
    
    const resposta = await fetch("https://diariopessoal.onrender.com/anotacoes", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!resposta.ok) {
        console.error("Erro ao buscar anotações");
        return;
    }

    const anotacoes = await resposta.json();
    console.log(anotacoes)
    anotacoes.dados.forEach(criarElementoAnotacao);
}

function criarElementoAnotacao(anotacao) {
    const item = document.createElement("li");

    const data = document.createElement("p");

    const dataFormatada = new Date(anotacao.data_entrada)
    .toLocaleDateString("pt-BR", {
        timeZone: "UTC"
    });

    data.textContent = `Data: ${dataFormatada}`;;

    const humor = document.createElement("p");
    humor.textContent = `Humor: ${anotacao.humor}`;

    const corpo = document.createElement("p");
    corpo.textContent = anotacao.corpo;

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    botaoEditar.addEventListener("click", () => {
        window.location.href = `./editar.html?id=${anotacao.id}`;
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", () => {
        excluirAnotacao(anotacao.id);
    });

    item.append(
        data,
        humor,
        corpo,
        botaoEditar,
        botaoExcluir
    );

    listaAnotacoes.appendChild(item);
}

carregarAnotacoes();

async function excluirAnotacao(id) {
    const resposta = await fetch(
        `https://diariopessoal.onrender.com/anotacoes/${id}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!resposta.ok) {
        console.error("Erro ao excluir anotação");
        return;
    }

    window.location.reload();
}