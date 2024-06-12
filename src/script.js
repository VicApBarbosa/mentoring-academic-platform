document.addEventListener('DOMContentLoaded', function() {
    // Cadastro de Alunos e Mentores
    const cadastroForm = document.getElementById('cadastroForm');
    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const area = document.getElementById('area').value;
        const tipo = document.getElementById('tipo').value;

        const usuario = { nome, email, area, tipo };
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso!');
        cadastroForm.reset();
    });

    // Atualização de Perfis
    const perfilForm = document.getElementById('perfilForm');
    perfilForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nomePerfil = document.getElementById('nomePerfil').value;
        const experiencia = document.getElementById('experiencia').value;
        const disponibilidade = document.getElementById('disponibilidade').value;

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuario = usuarios.find(u => u.nome === nomePerfil);

        if (usuario) {
            usuario.experiencia = experiencia;
            usuario.disponibilidade = disponibilidade;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Usuário não encontrado!');
        }

        perfilForm.reset();
    });

    // Cancelamento de Sessões
    const cancelamentoForm = document.getElementById('cancelamentoForm');
    cancelamentoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const sessionId = document.getElementById('sessionId').value;

        // Lógica de cancelamento de sessão (exemplo simplificado)
        alert(`Sessão ${sessionId} cancelada com sucesso!`);

        cancelamentoForm.reset();
    });

    // Busca de Mentores
    const buscaForm = document.getElementById('buscaForm');
    buscaForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const filtroArea = document.getElementById('filtroArea').value.toLowerCase();
        const filtroDisponibilidade = document.getElementById('filtroDisponibilidade').value.toLowerCase();
        const resultadosBusca = document.getElementById('resultadosBusca');

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let mentores = usuarios.filter(u => u.tipo === 'mentor');
        let resultados = mentores.filter(mentor => {
            return (
                (!filtroArea || mentor.area.toLowerCase().includes(filtroArea)) &&
                (!filtroDisponibilidade || (mentor.disponibilidade && mentor.disponibilidade.toLowerCase().includes(filtroDisponibilidade)))
            );
        });

        resultadosBusca.innerHTML = resultados.length ? resultados.map(mentor => `
            <div class="mentorCard">
                <h3>${mentor.nome}</h3>
                <p>Área: ${mentor.area}</p>
                <p>Disponibilidade: ${mentor.disponibilidade || 'Não informada'}</p>
            </div>
        `).join('') : '<p>Nenhum mentor encontrado</p>';

        buscaForm.reset();
    });

    // Comunicação entre Alunos e Mentores
    const mensagemForm = document.getElementById('mensagemForm');
    mensagemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const destinatario = document.getElementById('destinatario').value;
        const mensagem = document.getElementById('mensagem').value;

        // Simulação de envio de mensagem
        let mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];
        mensagens.push({ destinatario, mensagem });
        localStorage.setItem('mensagens', JSON.stringify(mensagens));

        alert('Mensagem enviada com sucesso!');
        mensagemForm.reset();
    });
});
