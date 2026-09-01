
const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const dados = new FormData(formulario);

    const usuario = {
        nome: dados.get("nameLogin"),
        senha: dados.get("passwordLogin")
    };

    const estaCadastrando =
        window.location.pathname.includes("cadastro");

    const endpoint = estaCadastrando
        ? "/cadastrar"
        : "/login";

    try {
        const resposta = await fetch(
            `https://diariopessoal.onrender.com${endpoint}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(usuario)
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert(resultado.mensagem || "Ocorreu um erro.");
            return;
        }

        // LOGIN
        if (!estaCadastrando) {

            // Guarda o JWT
            localStorage.setItem("token", resultado.token);

            window.location.href = "./dashboard.html";
            return;
        }

        // CADASTRO
        alert("Conta criada com sucesso!");
        window.location.href = "./login.html";

    } catch (erro) {
        console.error("Erro ao conectar com a API:", erro);
        alert("Não foi possível conectar com o servidor.");
    }
});

