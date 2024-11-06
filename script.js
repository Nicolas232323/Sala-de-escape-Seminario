const niveles = [
    {
        titulo: "Nivel 1: Configuración de Dispositivos de Red",
        preguntas: [
            {
                pregunta: "En Packet Tracer, redondo soy, conecto dos computadoras pero no soy un switch. Si me abris vas a ver dos conexiones FastEthernet",
                opciones: ["Router", "Access Point", "Switch"],
                respuestaCorrecta: "Router",
                pista: "Es uno de los dispositivos más básicos que permite conectar dos equipos directamente"
            },
            {
                pregunta: "Puedo contectar muchos cables, mis luces verdes se encienden al trabajar. A diferencia de mi amigo redondo, no necesito configuración especial para hacer las computadoras comunicarse",
                opciones: ["Router", "Modem", "Switch"],
                respuestaCorrecta: "Switch",
                pista: "Es el dispositivo más común para crear una red local básica"
            },
            {
                pregunta: "Quieres conectar dos switches en Packet Tracer y permitir que todos los dispositivos de ambos se comuniquen. ¿Qué tipo de cable deberías utilizar?",
                opciones: ["Cable directo", "Cable cruzado", "Cable serial"],
                respuestaCorrecta: "Cable cruzado",
                pista: "Cuando conectas dos switches, necesitas un cable que cruce las señales"
            }
        ]
    },
    {
        titulo: "Nivel 2: Protocolos de Comunicación",
        preguntas: [
            {
                pregunta: "Escribo una dirección web y la transformo en números. Sin mí, Google sería solo una IP",
                opciones: ["GATEWAY", "DHCP", "DNS"],
                respuestaCorrecta: "DNS",
                pista: "Es la configuración necesaria para navegar usando nombres en lugar de IP's"
            },
            {
                pregunta: "En Packet Tracer, configuras un servidor para que asigne direcciones IP automáticamente a los dispositivos de la red. ¿Qué protocolo necesitas activar en el servidor?",
                opciones: ["DNS", "FTP", "DHCP"],
                respuestaCorrecta: "DHCP",
                pista: "Este protocolo permite que los dispositivos nuevos puedan recibir una dirección IP sin configuración manual"
            },
            {
                pregunta: "Configuraste una red en Packet Tracer con un servidor de correo. ¿Qué protocolo necesitas en el servidor para permitir el envío de correos electrónicos?",
                opciones: ["SMTP", "POP3", "IMAP"],
                respuestaCorrecta: "SMTP",
                pista: "Este protocolo es el estándar para el envío de correos electrónicos"
            }
        ]
    },
    {
        titulo: "Nivel 3: Direccionamiento IP",
        preguntas: [
            {
                pregunta: "En la ventana de configuración IP me encontrás, cuatro números separados por puntos debés completar. Si uso la máscara 255.255.255.0 y quiero estar en la misma red que 192.168.1.1, ¿Cual es la menor direccion ip que puedo usar?",
                opciones: ["192.168.1.255", "192.168.1.0", "192.168.1.2"],
                respuestaCorrecta: "192.168.1.2",
                pista: "Los primeros tres números deben coincidir para estar en la misma red"
            },
            {
                pregunta: "En Packet Tracer, dos PC's tienen IP 192.168.1.10. ¿Es esto un error?",
                opciones: ["Si", "No"],
                respuestaCorrecta: "Si",
                pista: "Cada dispositivo en una red debe ser único"
            },
            {
                pregunta: "Tenes una red con dirección 192.168.0.0/25, ¿cuántos hosts puedes tener en esta red?",
                opciones: ["126", "128", "254"],
                respuestaCorrecta: "126",
                pista: "2^n - 2"
            }
        ]
    }
];

let nivelActual = 0;
let codigosDesbloqueo = [];

function mostrarNivel(nivel) {
    document.getElementById('titulo-nivel').textContent = niveles[nivel].titulo;
    const preguntasContainer = document.getElementById('preguntas');
    preguntasContainer.innerHTML = '';
    
    // Ocultar el contenedor de código cada vez que se muestra un nuevo nivel
    ocultarContenedorCodigo();
    
    niveles[nivel].preguntas.forEach((pregunta, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.className = 'pregunta';
        
        preguntaDiv.innerHTML = `
            <p>${pregunta.pregunta}</p>
            <div class="opciones">
                ${pregunta.opciones.map(opcion => `
                    <div>
                        <input type="radio" name="pregunta${index}" value="${opcion}">
                        <label>${opcion}</label>
                    </div>
                `).join('')}
            </div>
            <p class="pista">Pista: ${pregunta.pista}</p>
        `;
        
        preguntasContainer.appendChild(preguntaDiv);
    });
}

function generarEcuacionAlgebraica() {
    const tiposEcuaciones = [
        // ax = b (asegurando que b sea divisible por a)
        {
            generar: () => {
                const a = Math.floor(Math.random() * 8) + 2; // 2 a 9
                const resultado = Math.floor(Math.random() * 10) + 1; // 1 a 10
                return {
                    ecuacion: `${a}x = ${a * resultado}`,
                    resultado: resultado
                };
            }
        },
        // x/a = b (asegurando que el resultado sea b*a)
        {
            generar: () => {
                const a = Math.floor(Math.random() * 5) + 2; // 2 a 6
                const b = Math.floor(Math.random() * 5) + 1; // 1 a 5
                return {
                    ecuacion: `x/${a} = ${b}`,
                    resultado: a * b
                };
            }
        },
        // ax + b = c (asegurando que (c-b) sea divisible por a)
        {
            generar: () => {
                const a = Math.floor(Math.random() * 5) + 2; // 2 a 6
                const resultado = Math.floor(Math.random() * 8) + 1; // 1 a 8
                const b = Math.floor(Math.random() * 10) + 1; // 1 a 10
                return {
                    ecuacion: `${a}x + ${b} = ${a * resultado + b}`,
                    resultado: resultado
                };
            }
        },
        // x² = a² (asegurando que la raíz sea entera)
        {
            generar: () => {
                const resultado = Math.floor(Math.random() * 6) + 2; // 2 a 7
                return {
                    ecuacion: `x² = ${resultado * resultado}`,
                    resultado: resultado
                };
            }
        }
    ];

    // Seleccionar tipo de ecuación basado en el nivel
    let ecuacionesDisponibles;
    switch (nivelActual) {
        case 0: // Nivel 1: ecuaciones más simples
            ecuacionesDisponibles = [tiposEcuaciones[0], tiposEcuaciones[1]];
            break;
        case 1: // Nivel 2: ecuaciones intermedias
            ecuacionesDisponibles = [tiposEcuaciones[1], tiposEcuaciones[2]];
            break;
        case 2: // Nivel 3: todas las ecuaciones
            ecuacionesDisponibles = tiposEcuaciones;
            break;
        default:
            ecuacionesDisponibles = tiposEcuaciones;
    }

    const tipoEcuacion = ecuacionesDisponibles[Math.floor(Math.random() * ecuacionesDisponibles.length)];
    return tipoEcuacion.generar();
}

function verificarRespuestas() {
    const respuestas = niveles[nivelActual].preguntas.map((_, index) => {
        const seleccionada = document.querySelector(`input[name="pregunta${index}"]:checked`);
        return seleccionada ? seleccionada.value : null;
    });

    const todasCorrectas = respuestas.every((respuesta, index) => 
        respuesta === niveles[nivelActual].preguntas[index].respuestaCorrecta
    );

    const resultado = document.getElementById('resultado');
    
    if (todasCorrectas) {
        const ecuacion = generarEcuacionAlgebraica();
        codigosDesbloqueo[nivelActual] = ecuacion.resultado;
        
        resultado.innerHTML = `
            <div class="correcto">
                <p>¡Correcto! Para avanzar al siguiente nivel, resuelve esta ecuación:</p>
                <div class="ecuacion">
                    ${ecuacion.ecuacion}
                </div>
                <p>Encuentra el valor de x</p>
                <div class="pista-matematica">
                    Ingresa solo el número (resultado entero)
                </div>
            </div>
        `;
        
        // Mostrar el contenedor del código y el texto
        mostrarContenedorCodigo();
        document.getElementById('formulario-container').classList.add('hidden');
    } else {
        resultado.innerHTML = `
            <div class="incorrecto">
                Algunas respuestas son incorrectas. Intenta nuevamente.
            </div>
        `;
        // Asegurar que el contenedor de código permanezca oculto
        ocultarContenedorCodigo();
    }
}

// Agregar esta función para crear el efecto matriz
function createBinaryRain() {
    const container = document.querySelector('.victory-screen');
    const characters = '10';
    
    setInterval(() => {
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.style.left = Math.random() * 100 + 'vw';
        binary.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        container.appendChild(binary);
        
        setTimeout(() => {
            binary.remove();
        }, 2000);
    }, 50);
}

// Modificar la función que muestra la victoria
function mostrarPantallaVictoria() {
    const victoryScreen = document.createElement('div');
    victoryScreen.className = 'victory-screen';
    
    victoryScreen.innerHTML = `
        <div class="victory-title">MISIÓN COMPLETADA</div>
        <div class="victory-icon">🔓</div>
        <div class="victory-message">Has superado todos los niveles de seguridad</div>
        <div class="victory-message">Acceso total concedido</div>
        <div class="matrix-bg"></div>
    `;
    
    document.body.appendChild(victoryScreen);
    createBinaryRain();
}

// Modificar la función verificarCodigo para mostrar la pantalla de victoria
function verificarCodigo() {
    const codigoIngresado = parseInt(document.getElementById('codigo-input').value);
    
    if (codigoIngresado === codigosDesbloqueo[nivelActual]) {
        if (nivelActual < niveles.length - 1) {
            nivelActual++;
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('codigo-input').value = '';
            document.getElementById('formulario-container').classList.remove('hidden');
            mostrarNivel(nivelActual);
        } else {
            // Mostrar pantalla de victoria cuando se complete el último nivel
            mostrarPantallaVictoria();
        }
    } else {
        // Mantener visible la ecuación y el contenedor de código en caso de error
        const ecuacionActual = document.querySelector('.ecuacion').textContent;
        document.getElementById('resultado').innerHTML = `
            <div class="correcto">
                <p>La respuesta es incorrecta. Intenta nuevamente:</p>
                <div class="ecuacion">
                    ${ecuacionActual}
                </div>
                <p>Encuentra el valor de x</p>
                <div class="pista-matematica">
                    Ingresa solo el número (resultado entero)
                </div>
            </div>
            <div class="incorrecto">
                El valor ingresado no es correcto. ¡Sigue intentando!
            </div>
        `;
        mostrarContenedorCodigo();
    }
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    mostrarNivel(nivelActual);
    document.getElementById('verificar').addEventListener('click', verificarRespuestas);
    document.getElementById('verificar-codigo').addEventListener('click', verificarCodigo);
    
    // Ocultar inicialmente el contenedor de código y el texto
    ocultarContenedorCodigo();
});

// Función para ocultar el contenedor de código
function ocultarContenedorCodigo() {
    document.getElementById('codigo-container').style.display = 'none';
    document.getElementById('texto-codigo').style.display = 'none';
}

// Función para mostrar el contenedor de código
function mostrarContenedorCodigo() {
    document.getElementById('codigo-container').style.display = 'block';
    document.getElementById('texto-codigo').style.display = 'block';
} 