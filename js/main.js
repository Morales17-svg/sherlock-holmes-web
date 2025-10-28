// === main.js completo para historia interactiva ===

document.addEventListener("DOMContentLoaded", () => {
    // === ELEMENTOS DEL DOM ===
    const sceneText = document.getElementById("scene-text");
    const sceneImg = document.getElementById("scene-img");
    const choicesDiv = document.getElementById("choices");
    const bgMusic = document.getElementById("bg-music");

    // === SONIDO MÁQUINA DE ESCRIBIR ===
    const typeSound = new Audio("audio/typewriter_effect.mp3");
    typeSound.volume = 0.4;
    typeSound.loop = false;

    // === FUNCIONES ===

    // Efecto máquina de escribir
    async function typeWriter(text, speed = 35) {
        sceneText.innerHTML = "";
        typeSound.currentTime = 0;
        typeSound.play().catch(() => {});

        for (let i = 0; i < text.length; i++) {
            sceneText.innerHTML += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }

        typeSound.pause();
        typeSound.currentTime = 0;
    }

    // Reproducir música de escena
    function playMusic(file) {
        if (!file) return;
        bgMusic.src = `audio/${file}`;
        bgMusic.volume = 0.5;
        bgMusic.loop = true;
        bgMusic.play().catch(err => console.warn("Audio bloqueado hasta interacción:", err));
    }

    // Mostrar escena con ocultamiento de botones mientras se escribe
    async function showScene(scene) {
        if (!scene) return;

        sceneImg.src = scene.img;
        playMusic(scene.music);

        // --- NUEVO: ocultar botones mientras se escribe ---
        choicesDiv.style.display = "none";

        await typeWriter(scene.text);

        // --- NUEVO: mostrar botones después de escribir ---
        choicesDiv.style.display = "block";

        // Limpiar y crear botones de elección
        choicesDiv.innerHTML = "";
        scene.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.className = "btn btn-outline-light choice-btn m-2";
            btn.textContent = choice.text;
            btn.onclick = () => nextScene(choice.next);
            choicesDiv.appendChild(btn);
        });
    }

    // Ir a la siguiente escena
    function nextScene(key) {
        const next = scenes[key];
        if (next) showScene(next);
    }

    // === ACTIVAR AUDIO TRAS PRIMER INTERACCIÓN ===
    document.addEventListener("click", () => {
        bgMusic.play().catch(() => {});
        typeSound.play().catch(() => {});
    }, { once: true });

    // === DEFINICIÓN DE ESCENAS ===
    const scenes = {
        // INTRODUCCIÓN
        "intro": {
            img: "img/escena1.png",
            music: "misterio.mp3",
            text: "Una noche envuelta en neblina asfixiante sobre Baker Street. El aire muerde, y el carillón del Big Ben parece latir con una cadencia lúgubre, anunciando la medianoche. El sello del Ministerio brilla, ominoso, en la cera de un sobre lacrado. El misterio aguarda, pesado y frío. ¿Aceptarás el caso, Mi querida Estefania?",
            choices: [
                { text: "Aceptar el caso", next: "rutaElegir" },
                { text: "Rechazar y descansar", next: "finNegativo" }
            ]
        },
        "finNegativo": {
            img: "img/final_negativo.png",
            music: "final.mp3",
            text: "Holmes exhala una bocanada de humo, el gesto concluyente. La lámpara se extingue, arrojando la habitación a un abismo de sombras. La ciudad duerme; el crimen, sin embargo, nunca descansa. El caso, por ahora, se disuelve en la implacable noche londinense.",
            choices: []
        },
        "rutaElegir": {
            img: "img/escena2.png",
            music: "laboratorio.mp3",
            text: "Holmes desliza la mirada sobre el caos ordenado de la mesa. El tablero está dispuesto. Elemental, mi querida Estefania, estos indicios nos presentan no un camino, sino una encrucijada. Debemos elegir la ruta, pues la naturaleza del caso pende de la ciencia, el corazón, o quizás, el filo de la acción.",
            choices: [
                { text: "Ruta de acción", next: "accion1" },
                { text: "Ruta científica", next: "cientifico1" },
                { text: "Ruta romántica", next: "romantico1" },
                { text: "Ruta trágica", next: "tragico1" }
            ]
        },

        // === RUTA DE ACCIÓN ===
        "accion1": { img: "img/accion1.png", music: "accion.mp3", text: "Los tejados de Londres son un laberinto de sombra y vapor. El ladrón, una mancha oscura contra la luna brumosa, se precipita con un maletín de cuero negro. Es el juego del gato y el ratón sobre un abismo de hollín.", choices: [{ text: "Perseguirlo", next: "accion2" }] },
        "accion2": { img: "img/accion2.png", music: "accion.mp3", text: "Saltas sobre el vacío, el viento aúlla, rasgando tu abrigo. Las chimeneas son obstáculos mortales. Cada paso resuena en tu pecho: la adrenalina es tu única red de seguridad.", choices: [{ text: "Continuar", next: "accion3" }] },
        "accion3": { img: "img/accion3.png", music: "accion.mp3", text: "El ladrón tropieza, un gemido ahogado en la niebla. El maletín, golpeando las pizarras, se abre. No hay joyas, ni documentos. Solo un mecanismo de bronce: un reloj que no marca la hora, sino una fecha enigmática. 30 de Octubre.", choices: [{ text: "Examinar el reloj", next: "accion4" }] },
        "accion4": { img: "img/accion4.png", music: "romance.mp3", text: "Un tic-tac brutal rompe el silencio: el reloj es una bomba camuflada, y el temporizador se agota. El acero contra el alambre. La respiración contenida. La suerte y la precisión se enfrentan en un pulso mortal. El último cable...", choices: [{ text: "Finalizar caso", next: "accionFin" }] },
        "accionFin": { img: "img/accion5.png", music: "final.mp3", text: "(Mientras el último cable cortado cae y el silencio regresa) Curioso, ¿no cree? El crimen se ha detenido, literalmente, en el umbral del 30 de Octubre. No es solo la ciudad lo que ha salvado, querida amiga... Es como si el universo mismo hubiese conspirado para celebrar su existencia. ¡Feliz Cumpleaños!", choices: [] },

        // === RUTA CIENTÍFICA ===
        "cientifico1": { img: "img/cientifico1.png", music: "laboratorio.mp3", text: "En el laboratorio, la penumbra es rota por el fulgor de la química. Una serie de compuestos en matraces de cuello largo emiten un espectro de luz sobrenatural: un brillo azul verdoso, frío y elocuente.", choices: [{ text: "Analizar reacción", next: "cientifico2" }] },
        "cientifico2": { img: "img/cientifico2.png", music: "laboratorio.mp3", text: "(Concentrado, mezclando un par de reactivos) La química nunca miente. Su verdad es absoluta. El vapor sube, golpeando un espejo de plata, y por un instante, el vaho dibuja un mensaje claro: Feliz Cumpleaños, Detective.", choices: [{ text: "Seguir analizando", next: "cientifico3" }] },
        "cientifico3": { img: "img/cientifico3.png", music: "misterio.mp3", text: "El mensaje se disuelve, pero los vapores restantes se condensan sobre el mapa de Londres, iluminando una serie de cruces exactas. Las coordenadas: una ruta para descifrar un secreto aún más profundo.", choices: [{ text: "Ir al lugar", next: "cientifico4" }] },
        "cientifico4": { img: "img/cientifico4.png", music: "romance.mp3", text: "Siguiendo el rastro, llegas a un pabellón abandonado. En el centro de la sala, un proyector artesanal, ingenio de Estefi, se activa. Un haz de luz iridiscente danza en la pared, formando, nítido y brillante: MI QUERIDA ESTEFANIA. Un regalo inesperado.", choices: [{ text: "Finalizar caso", next: "cientificoFin" }] },
        "cientificoFin": { img: "img/cientifico5.png", music: "final.mp3", text: "(Con una sonrisa enigmática, mientras el brillo de los químicos los baña) La gente cree que la ciencia es solo lógica. Una falacia. La ciencia también tiene un corazón, mi querida Estefi, y hoy, el suyo late con el entusiasmo de un buen experimento... preparado solo para usted. Feliz Cumpleaños.", choices: [] },

        // === RUTA ROMÁNTICA ===
        "romantico1": { img: "img/romantico1.png", music: "romance.mp3", text: "Una carta de un color carmesí llega con el correo de la mañana. La firma es inconfundible. Estefania Silguero. Una misiva que huele a terciopelo y a desafío intelectual.", choices: [{ text: "Abrirla", next: "romantico2" }] },
        "romantico2": { img: "img/romantico2.png", music: "romance.mp3", text: "El aroma de un perfume olvidado, las palabras precisas y cortantes. Un torbellino de viejos recuerdos asalta la mente. ¿Qué buscaba ella? ¿Un recuerdo? ¿Un duelo de ingenio? ¿O algo más delicado?", choices: [{ text: "Buscar a Irene", next: "romantico3" }] },
        "romantico3": { img: "img/romantico3.png", music: "romance.mp3", text: "El encuentro es fugaz, bajo la implacable llovizna londinense. Dos almas brillantes, dos destinos divergentes, unidos momentáneamente por el mismo deber y una innegable conexión. Un momento robado al tiempo y al deber.", choices: [{ text: "Hablar sinceramente", next: "romantico4" }] },
        "romantico4": { img: "img/romantico5.png", music: "final.mp3", text: "(Entregando un sobre sencillo, sin lacre, con la mirada profunda) Reciba esto. Es una pequeña dedicatoria a quien resolvió el mayor misterio que existe... el del corazón. Usted es mi querida cómplice en el arte de pensar... y en el arte, mucho más peligroso, de sentir. Feliz Cumpleaños.", choices: [] },

        // === RUTA TRÁGICA ===
        "tragico1": { img: "img/tragico1.png", music: "misterio.mp3", text: "La niebla es un muro opaco en el callejón. Demasiada prisa, un detalle obviado. La pista era falsa, una trampa perfecta. El enemigo se burla, desde las sombras, con la ventaja.", choices: [{ text: "Revisar de nuevo", next: "tragico2" }] },
        "tragico2": { img: "img/tragico2.png", music: "final.mp3", text: "Un rugido ensordecedor. El cielo se tiñe de un naranja agónico. Has llegado tarde. La explosión sacude los cimientos de la ciudad, una derrota amarga que resuena en el puerto. El caso se ha perdido.", choices: [{ text: "Correr hacia el muelle", next: "tragico3" }] },
        "tragico3": { img: "img/tragico3.png", music: "accion.mp3", text: "Entre las cenizas y el humo, una silueta se aleja, indiferente al caos. Es la encarnación de la verdad eludiéndote. Se marcha con la última pieza del rompecabezas, dejando solo el silencio de la derrota.", choices: [{ text: "Intentar detenerlo", next: "tragico4" }] },
        "tragico4": { img: "img/tragico4.png", music: "final.mp3", text: "La lluvia cae, un luto sobre el adoquinado. Holmes cae de rodillas, el alma devastada por el fracaso. No todos los casos tienen un final feliz, pero incluso en esta derrota hay una verdad. Holmes: (Murmurando al vacío, con voz rota) Feliz Cumpleaños... Estefi. Quizá el único misterio que jamás resolveré sea el de su sonrisa. Y, sinceramente, es mejor así.", choices: [] },
    };

    // === INICIAR HISTORIA ===
    showScene(scenes.intro);
});
