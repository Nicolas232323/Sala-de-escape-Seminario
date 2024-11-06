class ParticleNetwork {
    constructor() {
        this.canvas = document.getElementById('particles-bg');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 100;
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.resize();
        this.init();
        
        // Event Listeners
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = Math.random() * 2 - 1;
            const directionY = Math.random() * 2 - 1;
            
            this.particles.push({
                x: x,
                y: y,
                size: size,
                baseX: x,
                baseY: y,
                density: (Math.random() * 30) + 1,
                directionX: directionX,
                directionY: directionY
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            let dx, dy, distance, forceDirectionX, forceDirectionY, force;
            
            // Movimiento natural
            particle.x += particle.directionX * 0.5;
            particle.y += particle.directionY * 0.5;
            
            // Rebote en los bordes
            if (particle.x > this.canvas.width || particle.x < 0) {
                particle.directionX *= -1;
            }
            if (particle.y > this.canvas.height || particle.y < 0) {
                particle.directionY *= -1;
            }
            
            // Interacción con el mouse
            if (this.mouse.x != null) {
                dx = this.mouse.x - particle.x;
                dy = this.mouse.y - particle.y;
                distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    force = (this.mouse.radius - distance) / this.mouse.radius;
                    forceDirectionX = dx / distance * force * particle.density;
                    forceDirectionY = dy / distance * force * particle.density;
                    
                    particle.x -= forceDirectionX;
                    particle.y -= forceDirectionY;
                }
            }
            
            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
            this.ctx.fill();
            
            // Conectar partículas cercanas
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 255, 0, ${0.3 - distance/100})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork();
}); 