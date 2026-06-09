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


    // ===== CARROSSEL =====
    const slides = document.querySelectorAll('.slide');
    const pontos = document.querySelectorAll('.ponto');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');
    const container = document.querySelector('.carrossel-container');
    
    let slideAtual = 0;
    const totalSlides = slides.length;
    let intervaloId = null;
    let estaPausado = false;

    function mostrarSlide(index) {
        slides.forEach(s => s.classList.remove('ativo'));
        pontos.forEach(p => p.classList.remove('ativo'));
        
        if (index >= totalSlides) {
            slideAtual = 0;
        } else if (index < 0) {
            slideAtual = totalSlides - 1;
        } else {
            slideAtual = index;
        }
        
        slides[slideAtual].classList.add('ativo');
        pontos[slideAtual].classList.add('ativo');
    }

    function avancar() {
        mostrarSlide(slideAtual + 1);
    }

    function voltar() {
        mostrarSlide(slideAtual - 1);
    }

    function iniciarAutoPlay() {
        if (intervaloId !== null) return;
        
        intervaloId = setInterval(function() {
            if (!estaPausado) {
                avancar();
            }
        }, 5000);
    }

    function pararAutoPlay() {
        if (intervaloId !== null) {
            clearInterval(intervaloId);
            intervaloId = null;
        }
    }

    function reiniciarTimer() {
        pararAutoPlay();
        iniciarAutoPlay();
    }

    // Setas de navegação
    btnProximo.addEventListener('click', function(e) {
        e.stopPropagation();
        avancar();
        reiniciarTimer();
    });

    btnAnterior.addEventListener('click', function(e) {
        e.stopPropagation();
        voltar();
        reiniciarTimer();
    });

    // Bolinhas indicadoras
    pontos.forEach((ponto, index) => {
        ponto.addEventListener('click', function(e) {
            e.stopPropagation();
            mostrarSlide(index);
            reiniciarTimer();
        });
    });

    // Pausar ao passar o mouse
    container.addEventListener('mouseenter', function() {
        estaPausado = true;
    });

    container.addEventListener('mouseleave', function() {
        estaPausado = false;
    });

        // ===== CLIQUE NO SLIDE PARA REDIRECIONAR =====
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            // Só redireciona se for o slide ativo
            if (!this.classList.contains('ativo')) return;
            
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });

    // Inicialização
    mostrarSlide(0);
    iniciarAutoPlay();
});