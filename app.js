// ==========================================
// PASO 1: CANCHA Y BALONCESTO PRO (Doble Efecto Deportivo)
// ==========================================
(() => {
    const canvas = document.getElementById('demoCanvas');
    const ctx = canvas.getContext('2d');
    
    const nameInput = document.getElementById('nameInput');
    const speedInput = document.getElementById('speedInput');
    const speedValue = document.getElementById('speedValue');
    const btnPlay = document.getElementById('btn-play');
    const btnPause = document.getElementById('btn-pause');
    const btnReset = document.getElementById('btn-reset');

    let animationId = null;
    let lastTime = 0;
    let isRunning = false;
    let rotationAngle = 0;

    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 30,
        dx: 320, 
        dy: 250, 
        color: '#ff6b35'
    };

    const draw = (text) => {
        // EFECTO 1: Estela difuminada de alta velocidad (Motion Blur)
        ctx.fillStyle = 'rgba(14, 22, 38, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Líneas de la cancha de fondo (Estética deportiva)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
        ctx.stroke();

        // Nombre del equipo con brillo de neón deportivo
        ctx.save();
        ctx.shadowColor = 'rgba(255, 107, 53, 0.5)';
        ctx.shadowBlur = 25;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.font = 'bold 80px Segoe UI';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
        ctx.restore();

        // EFECTO 2: Rotación Dinámica y Textura de Balón
        ctx.save();
        ctx.translate(ball.x, ball.y);
        ctx.rotate(rotationAngle);

        ctx.beginPath();
        ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#ffffff'; 
        ctx.stroke();

        // Costuras del balón
        ctx.beginPath();
        ctx.moveTo(-ball.radius, 0);
        ctx.lineTo(ball.radius, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -ball.radius);
        ctx.lineTo(0, ball.radius);
        ctx.stroke();

        ctx.restore();
    };

    const update = (dt) => {
        const speedMult = parseFloat(speedInput.value) / 5;
        ball.x += ball.dx * dt * speedMult;
        ball.y += ball.dy * dt * speedMult;
        rotationAngle += 0.05 * speedMult;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
            ball.dx *= -1;
            ball.x = ball.x + ball.radius > canvas.width ? canvas.width - ball.radius : ball.radius;
        }
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy *= -1;
            ball.y = ball.y + ball.radius > canvas.height ? canvas.height - ball.radius : ball.radius;
        }
    };

    const loop = (timestamp) => {
        if (!isRunning) return;
        if (!lastTime) lastTime = timestamp;
        const dt = (timestamp - lastTime) / 1000; 
        lastTime = timestamp;

        update(dt);
        draw(nameInput.value);
        animationId = requestAnimationFrame(loop);
    };

    btnPlay.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            lastTime = performance.now();
            loop(performance.now());
        }
    });

    btnPause.addEventListener('click', () => {
        isRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
    });

    btnReset.addEventListener('click', () => {
        isRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        rotationAngle = 0;
        lastTime = 0;
        draw(nameInput.value);
    });

    speedInput.addEventListener('input', (e) => speedValue.textContent = e.target.value);
    nameInput.addEventListener('input', (e) => { if (!isRunning) draw(e.target.value); });
    
    ctx.fillStyle = '#0e1626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw(nameInput.value);
})();

// ==========================================
// PASO 2: TABLERO DE ANOTACIONES (CLOSURES)
// ==========================================
(() => {
    let frames = 0;
    let clicks = 0;
    let lastActionStr = "Ninguna";

    const frameEl = document.getElementById('frameCount');
    const clickEl = document.getElementById('clickCount');
    const actionEl = document.getElementById('lastAction');
    const btnIncrement = document.getElementById('btn-increment');

    const triggerPop = (element) => {
        element.classList.add('pop');
        setTimeout(() => element.classList.remove('pop'), 200);
    };

    const updateUI = () => {
        frameEl.textContent = frames;
        triggerPop(frameEl);
        clickEl.textContent = clicks;
        triggerPop(clickEl);
        actionEl.textContent = lastActionStr;
    };

    btnIncrement.addEventListener('click', (e) => {
        frames += 24; 
        clicks++;
        lastActionStr = `¡Canasta #${clicks}!`;
        updateUI();
    });
})();

// ==========================================
// PASO 3: MANIPULACIÓN DOM DEPORTIVA
// ==========================================
(() => {
    const demoBox = document.querySelector('#demoBox');
    const boxText = document.querySelector('#boxText');
    const btnHighlight = document.querySelector('#btn-highlight');
    const btnPulse = document.querySelector('#btn-pulse');
    const btnResetBox = document.querySelector('#btn-reset-box');
    const playerInput = document.querySelector('#playerInput');
    const validationMsg = document.querySelector('#validationMsg');

    btnHighlight.addEventListener('click', () => demoBox.classList.toggle('highlight-effect'));
    btnPulse.addEventListener('click', () => demoBox.classList.toggle('pulse-effect'));

    btnResetBox.addEventListener('click', () => {
        demoBox.className = 'demo-box'; 
        playerInput.value = '';
        playerInput.classList.remove('input-error');
        validationMsg.classList.remove('show');
        boxText.textContent = 'Estadio PRO';
    });

    playerInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value === '') {
            playerInput.classList.remove('input-error');
            validationMsg.classList.remove('show');
            boxText.textContent = 'Estadio PRO';
            return;
        }
        if (isNaN(value) || parseInt(value) < 0 || parseInt(value) > 99) {
            playerInput.classList.add('input-error'); 
            validationMsg.textContent = '⚠ Dorsal (0-99)';
            validationMsg.classList.add('show');
        } else {
            playerInput.classList.remove('input-error');
            validationMsg.classList.remove('show');
            boxText.textContent = `Atleta #${parseInt(value)}`;
        }
    });
})();

// ==========================================
// PASO 4: TORNEO DE BALONES CON GLOW
// ==========================================
(() => {
    const canvas = document.getElementById('canvasStep4');
    const ctx = canvas.getContext('2d');
    const btnStart = document.getElementById('btn-start-4');
    const btnStop = document.getElementById('btn-stop-4');
    const btnAdd = document.getElementById('btn-add-4');

    let animationId = null;
    let lastTime = 0;
    let isRunning = false;
    let particles = [];

    const addParticle = () => {
        const radius = Math.random() * 14 + 12;
        const colors = ['#ff6b35', '#1d428a', '#20c997', '#f50057', '#38bdf8']; 
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: radius,
            dx: (Math.random() - 0.5) * 550,
            dy: (Math.random() - 0.5) * 550,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    };

    addParticle();
    addParticle();
    addParticle();

    const drawParticle = (p) => {
        // EFECTO 1: Destellos Radiales de Neón (Glow)
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.restore();
    };

    const update = (dt) => {
        // EFECTO 2: Rebote Uniforme con Delta Time
        particles.forEach(p => {
            p.x += p.dx * dt;
            p.y += p.dy * dt;
            if (p.x + p.radius > canvas.width || p.x - p.radius < 0) {
                p.dx *= -1;
                p.x = p.x + p.radius > canvas.width ? canvas.width - p.radius : p.radius;
            }
            if (p.y + p.radius > canvas.height || p.y - p.radius < 0) {
                p.dy *= -1;
                p.y = p.y + p.radius > canvas.height ? canvas.height - p.radius : p.radius;
            }
        });
    };

    const loop = (timestamp) => {
        if (!isRunning) return;
        if (!lastTime) lastTime = timestamp;
        const dt = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        ctx.fillStyle = 'rgba(13, 13, 18, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        update(dt);
        particles.forEach(drawParticle);
        animationId = requestAnimationFrame(loop);
    };

    btnStart.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            lastTime = performance.now();
            loop(performance.now());
        }
    });

    btnStop.addEventListener('click', () => {
        isRunning = false;
        if (animationId) cancelAnimationFrame(animationId);
    });

    btnAdd.addEventListener('click', () => {
        addParticle();
        if (!isRunning) {
            ctx.fillStyle = '#0d0d12';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(drawParticle);
        }
    });

    ctx.fillStyle = '#0d0d12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(drawParticle);
})();

// ==========================================
// PASO 5: SCOUTING DE RENDIMIENTO
// ==========================================
(() => {
    const fpsValue = document.getElementById('fpsValue');
    const memValue = document.getElementById('memValue');
    const heapPercent = document.getElementById('heapPercent');
    const heapProgress = document.getElementById('heapProgress');
    const leaksValue = document.getElementById('leaksValue');
    const healthBadge = document.getElementById('health-badge');
    const fpsChart = document.getElementById('fpsChart');
    const ctxChart = fpsChart.getContext('2d');

    const btnAnalyze = document.getElementById('btn-analyze');
    const btnLeak = document.getElementById('btn-leak');
    const btnClean = document.getElementById('btn-clean');

    let frames = 0;
    let lastTime = performance.now();
    let fpsHistory = new Array(60).fill(60); 
    let detachedNodes = []; 

    btnAnalyze.addEventListener('click', () => {
        console.profile('ScoutingRendimientoPro');
        alert("Escaneo de rendimiento deportivo iniciado en consola...");
        setTimeout(() => {
            console.profileEnd('ScoutingRendimientoPro');
            console.log("¡Reporte de scouting generado!");
        }, 3000);
    });

    btnLeak.addEventListener('click', () => {
        for(let i = 0; i < 15000; i++) {
            const div = document.createElement('div');
            div.textContent = "Fatiga Node " + i;
            detachedNodes.push(div);
        }
        leaksValue.textContent = detachedNodes.length;
        healthBadge.textContent = "ALERTA FATIGA";
        healthBadge.style.backgroundColor = "#dc3545";
        healthBadge.style.color = "white";
    });

    btnClean.addEventListener('click', () => {
        detachedNodes = []; 
        leaksValue.textContent = 0;
        healthBadge.textContent = "EN FORMA";
        healthBadge.style.backgroundColor = "#20c997";
        healthBadge.style.color = "#0e1626";
        alert("Memoria liberada por el Garbage Collector (Descanso completado).");
    });

    const drawChart = () => {
        ctxChart.clearRect(0, 0, fpsChart.width, fpsChart.height);
        ctxChart.strokeStyle = '#1e293b';
        ctxChart.setLineDash([4, 4]);
        ctxChart.beginPath();
        ctxChart.moveTo(0, fpsChart.height / 2);
        ctxChart.lineTo(fpsChart.width, fpsChart.height / 2);
        ctxChart.stroke();
        ctxChart.setLineDash([]);

        const barWidth = fpsChart.width / 60;
        ctxChart.fillStyle = '#38bdf8';
        
        fpsHistory.forEach((fps, i) => {
            if (fps > 0) {
                let barHeight = (fps / 144) * fpsChart.height; 
                if(barHeight > fpsChart.height) barHeight = fpsChart.height;
                ctxChart.fillRect(i * barWidth, fpsChart.height - barHeight, barWidth - 1.5, barHeight);
            }
        });
    };

    const monitorLoop = (timestamp) => {
        frames++;
        const elapsed = timestamp - lastTime;

        if (elapsed >= 1000) {
            const currentFps = Math.round((frames * 1000) / elapsed);
            fpsValue.textContent = currentFps;
            
            fpsHistory.push(currentFps);
            fpsHistory.shift();
            drawChart();

            frames = 0;
            lastTime = timestamp;

            if (performance.memory) {
                const usedMB = performance.memory.usedJSHeapSize / (1024 * 1024);
                const limitMB = performance.memory.jsHeapSizeLimit / (1024 * 1024);
                memValue.textContent = usedMB.toFixed(2);
                
                const percent = ((usedMB / limitMB) * 100).toFixed(1);
                heapPercent.textContent = percent + '%';
                heapProgress.style.width = percent + '%';

                if (percent > 80) heapProgress.style.backgroundColor = "#dc3545"; 
                else if (percent > 50) heapProgress.style.backgroundColor = "#f59f00"; 
                else heapProgress.style.backgroundColor = "#20c997"; 
            } else {
                memValue.textContent = "14.20";
                heapPercent.textContent = "28%";
                heapProgress.style.width = "28%";
            }
        }
        requestAnimationFrame(monitorLoop);
    };

    requestAnimationFrame(monitorLoop);
})();