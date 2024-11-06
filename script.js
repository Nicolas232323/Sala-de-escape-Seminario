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
    
    // Ocultar el contenedor del código
    document.getElementById('codigo-container').classList.add('hidden');
    
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
        const codigo = Math.floor(Math.random() * 900) + 100;
        codigosDesbloqueo[nivelActual] = codigo;
        
        resultado.innerHTML = `
            <div class="correcto">
                ¡Correcto! Tu código de desbloqueo es: ${codigo}
                <br>Ingresa este código para avanzar al siguiente nivel.
            </div>
        `;
        
        // Mostrar el contenedor para ingresar el código
        document.getElementById('codigo-container').classList.remove('hidden');
        document.getElementById('formulario-container').classList.add('hidden');
    } else {
        resultado.innerHTML = `
            <div class="incorrecto">
                Algunas respuestas son incorrectas. Intenta nuevamente.
            </div>
        `;
    }
}

function verificarCodigo() {
    const codigoIngresado = document.getElementById('codigo-input').value;
    
    if (parseInt(codigoIngresado) === codigosDesbloqueo[nivelActual]) {
        if (nivelActual < niveles.length - 1) {
            nivelActual++;
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('codigo-input').value = '';
            document.getElementById('formulario-container').classList.remove('hidden');
            mostrarNivel(nivelActual);
        } else {
            document.getElementById('resultado').innerHTML = `
                <div class="correcto">
                    ¡Felicitaciones! Has completado todos los niveles.
                </div>
            `;
            document.getElementById('codigo-container').classList.add('hidden');
        }
    } else {
        document.getElementById('resultado').innerHTML = `
            <div class="incorrecto">
                Código incorrecto. Intenta nuevamente.
            </div>
        `;
    }
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    mostrarNivel(nivelActual);
    document.getElementById('verificar').addEventListener('click', verificarRespuestas);
    document.getElementById('verificar-codigo').addEventListener('click', verificarCodigo);
}); 