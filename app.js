// 1. DICCIONARIO DE TRADUCCIONES
const traducciones = {
    es: {
        nav_escucha: "Escucha aquí",
        nav_disco: "Discografía",
        nav_universo: "El Universo",
        hero_desc: "Una experiencia sonora entre luces y sombras.",
        hero_btn: "Descubrir",
        music_titulo: "Discografía",
        card_astera: "<strong class=\"album-desc-name\">✦ Astera ✦</strong><span>Un escape mágico y fantástico lejos de la realidad.</span>",
        card_hush: "<strong class=\"album-desc-name\">✦ Hush ✦</strong><span>Un espacio oscuro y metafórico que explora el trauma, la soledad y las heridas ocultas.</span>",
        card_gravity: "<strong class=\"album-desc-name\">✦ Gravity ✦</strong><span>El aterrizaje en el mundo real; una mirada madura y segura frente a la belleza y crueldad de la vida.</span>",
        listen_titulo: "Escucha aquí",
        lore_titulo: "El Universo de AMADA",
        lore_p1: "AMADA es una artista virtual y cantante de IA creada como un proyecto musical narrativo. Une una estética femenina, juvenil, soñadora y ligeramente inquietante con un sonido dark-pop y dream-pop de melodías pegadizas, ritmos marcados, vocales expresivas y producción pop moderna, manteniendo una identidad reconocible en cada era.",
        footer_copy: "© 2026 AMADA. Todos los derechos reservados."
    },
    en: {
        nav_escucha: "Listen here",
        nav_disco: "Discography",
        nav_universo: "The Universe",
        hero_desc: "A sonic experience between light and shadows.",
        hero_btn: "Discover",
        music_titulo: "Discography",
        card_astera: "<strong class=\"album-desc-name\">✦ Astera ✦</strong><span>A magical, fantastical escape far from reality.</span>",
        card_hush: "<strong class=\"album-desc-name\">✦ Hush ✦</strong><span>A dark, metaphorical space exploring trauma, loneliness, and hidden wounds.</span>",
        card_gravity: "<strong class=\"album-desc-name\">✦ Gravity ✦</strong><span>The landing in the real world; a mature, confident gaze facing life's beauty and cruelty.</span>",
        listen_titulo: "Listen here",
        lore_titulo: "AMADA's Universe",
        lore_p1: "AMADA is a virtual artist and AI singer created as a narrative music project. She blends a feminine, youthful, dreamy, and slightly eerie aesthetic with a dark-pop and dream-pop sound of catchy melodies, punchy rhythms, expressive vocals, and modern pop production, maintaining a recognizable identity in every era.",
        footer_copy: "© 2026 AMADA. All rights reserved."
    }
};

// 2. SELECCIONAR ELEMENTOS
const btnEs = document.getElementById("btn-es");
const btnEn = document.getElementById("btn-en");
const elementosATraducir = document.querySelectorAll("[data-tr]");

// 3. FUNCIÓN PARA CAMBIAR IDIOMA
function cambiarIdioma(idioma) {
    // Cambiar los textos
    elementosATraducir.forEach((elemento) => {
        const clave = elemento.getAttribute("data-tr");
        elemento.innerHTML = traducciones[idioma][clave];
    });

    // Cambiar el estilo de los botones
    if (idioma === "en") {
        btnEn.classList.add("active");
        btnEn.classList.remove("inactive");
        btnEs.classList.add("inactive");
        btnEs.classList.remove("active");
    } else {
        btnEs.classList.add("active");
        btnEs.classList.remove("inactive");
        btnEn.classList.add("inactive");
        btnEn.classList.remove("active");
    }
}

// 4. ESCUCHAR LOS CLICS EN LOS BOTONES
btnEs.addEventListener("click", () => cambiarIdioma("es"));
btnEn.addEventListener("click", () => cambiarIdioma("en"));

// 5. GIRO 3D CONTINUO A LA IZQUIERDA (NOMBRE -> PORTADA -> TEXTO -> NOMBRE)
const albumCards = document.querySelectorAll(".album-card:not(.coming-soon)");
albumCards.forEach((card) => {
    const inner = card.querySelector(".album-card-inner");
    const front = card.querySelector(".album-front");
    const back = card.querySelector(".album-back");
    const stages = [
        card.querySelector(".album-stage-title"),
        card.querySelector(".album-stage-cover"),
        card.querySelector(".album-stage-desc")
    ];
    let step = 0;

    card.addEventListener("click", () => {
        step += 1;
        const nextStage = stages[step % stages.length];
        const incomingFace = step % 2 === 0 ? front : back;

        // Oculta cualquier etapa previa en la cara entrante y coloca la siguiente
        Array.from(incomingFace.children).forEach((child) => {
            child.hidden = true;
            card.appendChild(child);
        });
        nextStage.hidden = false;
        incomingFace.appendChild(nextStage);

        inner.style.setProperty("--flip-deg", `${step * -180}deg`);
    });
});

// 6. ESTELA DE ESTRELLAS BRILLANTES (BRILLANTINA) QUE SIGUE AL CURSOR
(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !hasFinePointer) return;

    const canvas = document.createElement("canvas");
    canvas.className = "sparkle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const colors = ["#ffffff", "#ffaee1", "#b178d2", "#a6f3fe", "#F06286"];
    const particles = [];
    const maxParticles = 140;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = null;
    let lastX = null;
    let lastY = null;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function spawnSparkle(x, y, burst = false) {
        if (particles.length >= maxParticles) {
            particles.shift();
        }
        const isStar = Math.random() < 0.52;
        const speed = burst ? 0.6 + Math.random() * 1.8 : 0.15 + Math.random() * 0.6;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
            x: x + (Math.random() - 0.5) * (burst ? 14 : 16),
            y: y + (Math.random() - 0.5) * (burst ? 14 : 16),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed + (burst ? 0.15 : 0.35),
            size: isStar ? 2.8 + Math.random() * 4.5 : 1 + Math.random() * 2,
            isStar,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: 34 + Math.random() * 34,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.08,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.22 + Math.random() * 0.28
        });
    }

    function drawFourPointStar(x, y, outerR, rotation) {
        const innerR = outerR * 0.28;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const a = (i * Math.PI) / 4;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life += 1;
            if (p.life >= p.maxLife) {
                particles.splice(i, 1);
                continue;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.018; // caída suave tipo brillantina
            p.vx *= 0.985;
            p.rotation += p.rotSpeed;

            const progress = p.life / p.maxLife;
            const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
            const twinkle = 0.55 + 0.45 * Math.sin(p.life * p.twinkleSpeed + p.twinklePhase);
            const alpha = Math.max(0, fade * twinkle);
            const scale = 0.65 + 0.35 * twinkle;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = p.isStar ? 10 : 6;

            if (p.isStar) {
                drawFourPointStar(p.x, p.y, p.size * scale, p.rotation);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        if (particles.length > 0) {
            rafId = requestAnimationFrame(animate);
        } else {
            rafId = null;
        }
    }

    function ensureLoop() {
        if (!rafId) {
            rafId = requestAnimationFrame(animate);
        }
    }

    window.addEventListener("pointermove", (e) => {
        if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        const dx = lastX === null ? 99 : e.clientX - lastX;
        const dy = lastY === null ? 99 : e.clientY - lastY;
        const dist = Math.hypot(dx, dy);

        if (dist >= 6) {
            const count = Math.min(3, Math.max(1, Math.floor(dist / 14)));
            for (let i = 0; i < count; i++) {
                spawnSparkle(e.clientX, e.clientY, false);
            }
            lastX = e.clientX;
            lastY = e.clientY;
            ensureLoop();
        }
    }, { passive: true });

    window.addEventListener("pointerdown", (e) => {
        if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        for (let i = 0; i < 9; i++) {
            spawnSparkle(e.clientX, e.clientY, true);
        }
        ensureLoop();
    }, { passive: true });
})();

// 7. BRILLOS DE ESTRELLAS EN LOS TÍTULOS DE SECCIÓN
(() => {
    const headings = document.querySelectorAll("#listen h2, #music h2, #lore h2");
    const sparkleLayout = [
        { x: "-14px", y: "18%", size: "11px", color: "#ffaee1", star: true, dur: "2.4s", delay: "0s" },
        { x: "-4px", y: "82%", size: "3.5px", color: "#ffffff", star: false, dur: "1.9s", delay: "0.7s" },
        { x: "18%", y: "-8px", size: "8px", color: "#a6f3fe", star: true, dur: "2.8s", delay: "0.4s" },
        { x: "48%", y: "-10px", size: "3px", color: "#ffffff", star: false, dur: "2.1s", delay: "1.1s" },
        { x: "78%", y: "-6px", size: "9px", color: "#b178d2", star: true, dur: "2.6s", delay: "1.5s" },
        { x: "calc(100% + 14px)", y: "22%", size: "12px", color: "#a6f3fe", star: true, dur: "2.5s", delay: "0.3s" },
        { x: "calc(100% + 6px)", y: "80%", size: "7px", color: "#F06286", star: true, dur: "2.2s", delay: "1.2s" },
        { x: "30%", y: "calc(100% + 6px)", size: "3px", color: "#ffaee1", star: false, dur: "2.3s", delay: "0.9s" },
        { x: "68%", y: "calc(100% + 5px)", size: "8px", color: "#ffffff", star: true, dur: "2.7s", delay: "1.8s" }
    ];

    headings.forEach((heading) => {
        const wrap = document.createElement("span");
        wrap.className = "title-sparkle-wrap";
        heading.parentNode.insertBefore(wrap, heading);
        wrap.appendChild(heading);

        sparkleLayout.forEach((s) => {
            const el = document.createElement("span");
            el.className = s.star ? "title-sparkle" : "title-sparkle title-sparkle-dot";
            el.setAttribute("aria-hidden", "true");
            if (s.star) el.textContent = "✦";
            el.style.setProperty("--sx", s.x);
            el.style.setProperty("--sy", s.y);
            el.style.setProperty("--ss", s.size);
            el.style.setProperty("--sc", s.color);
            el.style.setProperty("--sd", s.dur);
            el.style.setProperty("--sdelay", s.delay);
            wrap.appendChild(el);
        });
    });
})();