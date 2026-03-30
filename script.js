// Scripts de interactividad y animación NEURA-SYNC

document.addEventListener('DOMContentLoaded', () => {
    
    // Observadora de intersecciones para animaciones de desplazamiento
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar estados iniciales y observar
    const animElements = document.querySelectorAll('.bento-card, .pricing-card, .demo-text, .demo-visual');
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.98)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        animateOnScroll.observe(el);
    });

    // Animación de barra Humano vs AI al desplazar
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aiBar = document.getElementById('ai-progress');
                if(aiBar) {
                    aiBar.style.width = '5%';
                    // Animate it quickly to 100% to simulate extreme speed
                    setTimeout(() => {
                        aiBar.style.width = '100%';
                        setTimeout(() => {
                            aiBar.style.width = '5%';
                        }, 2000);
                    }, 500);
                }
            }
        });
    }, { threshold: 0.5 });

    const compContainer = document.querySelector('.comparison-container');
    if (compContainer) progressObserver.observe(compContainer);


    // Simular estadísticas de panel dinámico
    const formatCurrency = (val) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Math.round(val));
    
    let savingsValue = 4250000;
    const savingsElement = document.querySelector('.savings-card .stat-value');
    
    setInterval(() => {
        if (!savingsElement) return;
        // Aleatoriamente golpea ligeramente los ahorros para parecer viva
        savingsValue += (Math.random() * 2000);
        savingsElement.innerText = formatCurrency(savingsValue);
    }, 3000);

    // Dynamic Bar Chart Heights Simulation
    const bars = document.querySelectorAll('.chart-mockup .bar');
    setInterval(() => {
        bars.forEach(bar => {
            if (Math.random() > 0.6) {
                const newHeight = 30 + (Math.random() * 70);
                bar.style.height = `${newHeight}%`;
            }
        });
    }, 2000);
    
    // Scroll suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
