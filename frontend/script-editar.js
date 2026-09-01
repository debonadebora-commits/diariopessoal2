const formulario = document.querySelector(".anotacao");
const token = localStorage.getItem("token");

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);

    const anotacao = {
        data: dados.get("data"),
        humor: dados.get("humor"),
        corpo: dados.get("texto")
    };

    const resposta = await fetch(
        `https://diariopessoal.onrender.com/anotacoes/${id}`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(anotacao)
        }
    );

    if (!resposta.ok) {
        console.error("Erro ao atualizar anotação");
        return;
    }

    window.location.href = "./dashboard.html";
});

async function carregarAnotacao() {

    const resposta = await fetch(
        `https://api-diario-pessoal-v2-0.onrender.com/anotacoes/${id}`
    );

    if (!resposta.ok) {
        console.error("Anotação não encontrada");
        window.location.href = "./dashboard.html";
        return;
    }

    const anotacao = await resposta.json();

    formulario.elements.data.value = anotacao.data;
    formulario.elements.humor.value = anotacao.humor;
    formulario.elements.corpo.value = anotacao.corpo;
}

//carregarAnotacao();

