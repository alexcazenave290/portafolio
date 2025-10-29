// Animación del nivel de poder
document.addEventListener('DOMContentLoaded', function() {
    const powerLevel = document.getElementById('powerLevel');
    let currentPower = 0;
    const targetPower = 18000; // 18 años * 1000 para hacer más épico
    const duration = 3000; // 3 segundos
    const steps = 60;
    const increment = targetPower / steps;
    const stepDuration = duration / steps;

    function animatePower() {
        if (currentPower < targetPower) {
            currentPower += increment;
            powerLevel.textContent = Math.floor(currentPower).toLocaleString();
            setTimeout(animatePower, stepDuration);
        } else {
            powerLevel.textContent = targetPower.toLocaleString();
            // Efecto de "¡It's over 9000!"
            setTimeout(() => {
                powerLevel.classList.add('text-red-500');
                setTimeout(() => {
                    powerLevel.classList.remove('text-red-500');
                }, 500);
            }, 500);
        }
    }

    animatePower();

    // Scroll suave para los enlaces de navegación con efecto DBZ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Agregar animación al enlace clickeado
                this.classList.add('nav-link-clicked');
                setTimeout(() => {
                    this.classList.remove('nav-link-clicked');
                }, 400);
                
                // Crear efecto de energía durante el scroll
                createScrollEffect();
                
                // Calcular posición con offset para el navbar
                const navbarHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Scroll suave personalizado
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función para crear efecto visual durante el scroll
    function createScrollEffect() {
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)';
        flash.style.pointerEvents = 'none';
        flash.style.zIndex = '9999';
        flash.style.animation = 'scroll-flash 0.6s ease-out';
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 600);
    }

    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar tarjetas de tecnología
    document.querySelectorAll('.tech-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Observar tarjetas de "Actualmente"
    document.querySelectorAll('.currently-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Efecto de partículas adicionales al hacer hover en el botón de GitHub
    const githubButton = document.querySelector('.github-button');
    if (githubButton) {
        githubButton.addEventListener('mouseenter', function() {
            createEnergyBurst(this);
        });
    }

    function createEnergyBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = '#ffd700';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.boxShadow = '0 0 10px #ffd700';
            
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            animateParticle(particle, vx, vy);
        }
    }

    function animateParticle(particle, vx, vy) {
        let x = 0;
        let y = 0;
        let opacity = 1;
        const duration = 1000;
        const startTime = Date.now();

        function update() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                x += vx * 0.016;
                y += vy * 0.016;
                opacity = 1 - progress;

                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;

                requestAnimationFrame(update);
            } else {
                particle.remove();
            }
        }

        update();
    }

    // Efecto de destello en las tarjetas al pasar el mouse
    document.querySelectorAll('.tech-card, .currently-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'card-flash 0.5s ease-out';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Agregar animación CSS para el destello
    const style = document.createElement('style');
    style.textContent = `
        @keyframes card-flash {
            0% {
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            }
            50% {
                box-shadow: 0 0 50px rgba(255, 215, 0, 1), 0 0 100px rgba(255, 215, 0, 0.5);
            }
            100% {
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
            }
        }
    `;
    document.head.appendChild(style);

    // Cambiar el título de la página con un efecto de parpadeo
    let titleState = true;
    setInterval(() => {
        if (titleState) {
            document.title = '⚡ Alex Cazenave - Desarrollador Backend ⚡';
        } else {
            document.title = 'Alex Cazenave - Desarrollador Backend';
        }
        titleState = !titleState;
    }, 2000);

    // Efecto de sonido de poder (simulado con vibración en móviles)
    const objectiveCard = document.querySelector('.objective-card');
    if (objectiveCard && 'vibrate' in navigator) {
        objectiveCard.addEventListener('mouseenter', function() {
            navigator.vibrate([50, 30, 50]);
        });
    }

    // Easter egg: Konami Code para Super Saiyan mode
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSuperSaiyanMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateSuperSaiyanMode() {
        document.body.style.animation = 'super-saiyan 2s ease-out';
        const powerLevelElement = document.getElementById('powerLevel');
        powerLevelElement.textContent = '9001';
        powerLevelElement.style.color = '#ff0000';
        
        // Crear efecto de aura dorada
        const aura = document.createElement('div');
        aura.style.position = 'fixed';
        aura.style.top = '0';
        aura.style.left = '0';
        aura.style.width = '100%';
        aura.style.height = '100%';
        aura.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)';
        aura.style.pointerEvents = 'none';
        aura.style.zIndex = '9999';
        aura.style.animation = 'aura-expand 2s ease-out';
        document.body.appendChild(aura);

        setTimeout(() => {
            aura.remove();
            document.body.style.animation = '';
            powerLevelElement.textContent = '18.000';
            powerLevelElement.style.color = '';
        }, 3000);
    }

    // Añadir la animación de Super Saiyan
    const ssStyle = document.createElement('style');
    ssStyle.textContent = `
        @keyframes super-saiyan {
            0%, 100% {
                filter: brightness(1);
            }
            50% {
                filter: brightness(2) saturate(2);
            }
        }
        @keyframes aura-expand {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(ssStyle);

    console.log('%c¡Over 9000! 💪', 'font-size: 30px; color: #ffd700; text-shadow: 2px 2px 4px #000; font-weight: bold;');
    console.log('%cIntenta el código Konami: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 14px; color: #ff8c00;');
});

