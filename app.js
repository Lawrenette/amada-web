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
        lore_p2: "Su historia se despliega álbum a álbum como etapas distintas de su experiencia, sin requerir una continuidad lineal estricta entre ellas:",
        lore_astera: "<strong class=\"era-astera\">✦ Astera:</strong> Un mundo mágico e imaginario creado como escape de la realidad, centrado en la fantasía y en un refugio lejos de lo que ocurre en Hush y Gravity.",
        lore_hush: "<strong class=\"era-hush\">✦ Hush:</strong> Un espacio oscuro e inquietante que, a través de metáforas, indaga en el trauma, la soledad y las heridas ocultas bajo la superficie.",
        lore_gravity: "<strong class=\"era-gravity\">✦ Gravity:</strong> El aterrizaje en el mundo real y sus reglas; una mirada curiosa, segura y madura que observa y enfrenta tanto la belleza como la crueldad de la vida.",
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
        lore_p2: "Her story unfolds album by album as distinct stages of her experience, without requiring a strict linear continuity between them:",
        lore_astera: "<strong class=\"era-astera\">✦ Astera:</strong> A magical, imaginary world created as an escape from reality, centered on fantasy and a refuge far from what happens in Hush and Gravity.",
        lore_hush: "<strong class=\"era-hush\">✦ Hush:</strong> A dark, unsettling space that uses metaphors to explore trauma, loneliness, and the wounds hidden beneath the surface.",
        lore_gravity: "<strong class=\"era-gravity\">✦ Gravity:</strong> The landing in the real world and its rules; a curious, confident, and mature perspective that observes and confronts both the beauty and the cruelty of life.",
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