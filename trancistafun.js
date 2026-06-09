document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU HAMBÚRGUER =====
    const menuBtn = document.getElementById('menu-btn');
    const menuLateral = document.getElementById('menu-lateral');
    const fecharMenuBtn = document.getElementById('fechar-menu');
    const overlay = document.getElementById('overlay');

    function abrirMenu() {
        menuLateral.classList.add('aberto');
        overlay.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    }

    function fecharMenu() {
        menuLateral.classList.remove('aberto');
        overlay.classList.remove('ativo');
        document.body.style.overflow = '';
        fecharSubmenuCursos();
    }

    menuBtn.addEventListener('click', abrirMenu);
    fecharMenuBtn.addEventListener('click', fecharMenu);
    overlay.addEventListener('click', fecharMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') fecharMenu();
    });

    document.querySelectorAll('.menu-item:not(.btn-expandir)').forEach(link => {
        link.addEventListener('click', function() {
            fecharMenu();
        });
    });

    // ===== SUBMENU DE CURSOS =====
    const btnCursos = document.getElementById('btn-cursos');
    const submenuCursos = document.getElementById('submenu-cursos');

    function toggleSubmenuCursos() {
        const estaAberto = submenuCursos.classList.contains('aberto');
        if (estaAberto) {
            fecharSubmenuCursos();
        } else {
            abrirSubmenuCursos();
        }
    }

    function abrirSubmenuCursos() {
        submenuCursos.classList.add('aberto');
        btnCursos.classList.add('expandido');
    }

    function fecharSubmenuCursos() {
        submenuCursos.classList.remove('aberto');
        btnCursos.classList.remove('expandido');
    }

    btnCursos.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSubmenuCursos();
    });

    document.querySelectorAll('.btn-curso').forEach(curso => {
        curso.addEventListener('click', function() {
            fecharMenu();
        });
    });
})
