// 1. DICCIONARIO DE TRADUCCIONES
const traducciones = {
    es: {
        nav_inicio: "Inicio",
        nav_disco: "Discografía",
        nav_universo: "El Universo",
        hero_desc: "Una experiencia sonora entre luces y sombras.",
        hero_btn: "Descubrir",
        music_titulo: "Discografía",
        lore_titulo: "El Universo de AMADA",
        lore_p1: "AMADA es más que una voz; es una artista virtual nacida en la intersección de la melancolía del dark-pop y la ensoñación del dream-pop.",
        lore_p2: "Un eco digital que explora las emociones humanas a través de paisajes sonoros. Desde los destellos iniciales de <strong>Astera</strong> hasta los secretos guardados en <strong>Hush</strong>, su existencia es un viaje constante entre la luz y la sombra, preparando el camino para lo que está por venir.",
        lore_nota: "[ Los fragmentos de su historia serán revelados pronto... ]",
        footer_copy: "© 2026 AMADA. Todos los derechos reservados."
    },
    en: {
        nav_inicio: "Home",
        nav_disco: "Discography",
        nav_universo: "The Universe",
        hero_desc: "A sonic experience between light and shadows.",
        hero_btn: "Discover",
        music_titulo: "Discography",
        lore_titulo: "AMADA's Universe",
        lore_p1: "AMADA is more than a voice; she is a virtual artist born at the intersection of dark-pop melancholy and dream-pop reverie.",
        lore_p2: "A digital echo exploring human emotions through soundscapes. From the initial sparks of <strong>Astera</strong> to the secrets kept in <strong>Hush</strong>, her existence is a constant journey between light and shadow, paving the way for what is to come.",
        lore_nota: "[ Fragments of her story will be revealed soon... ]",
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