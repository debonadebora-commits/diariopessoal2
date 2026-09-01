const formRegistrarAnotacao = document.querySelector(".anotacao");
const token = localStorage.getItem("token");

formRegistrarAnotacao.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formRegistrarAnotacao);

    const anotacao = {
        data: dados.get("data"),
        humor: dados.get("humor"),
        corpo: dados.get("texto")
    };

    const resposta = await fetch("https://diariopessoal.onrender.com/anotacoes", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(anotacao)
    });

    if (!resposta.ok) {
        console.error("Erro ao criar anotação");
        return;
    }

    window.location.href = "./dashboard.html";
});


