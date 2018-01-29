# Proyecto DAM 2017 - Grupo 02

Repositorio del módulo de proyecto de Desarrollo de Aplicaciones Multiplataforma en [Egibide Arriaga](http://www.egibide.org/2/es/25/donde-nos-encontramos.html).

La carpeta [docs](./docs/) contiene el [sitio web](https://egibide-dam.github.io/proyecto-2017/) con la documentación.

## Material utilizado
- [Photon Kit](https://store.particle.io/products/photon-kit)
- [Adafruit DHT22](https://www.adafruit.com/product/385)

## Tecnologías utilizadas
- Ubuntu 16.04 como servidor.
- MySQL como base de datos.
- API REST para interactuar con la base de datos.
- MQTT como protocolo de comunicación para IoT.
- Mosquitto como broker de mensajes MQTT.
- Arduino para la aplicación de Photon.
- PHP y JavaScript para la aplicación Web del Photon.
- NodeJS para la aplicación intermediaria entre los mensajes MQTT y la base de datos.

### Configurar Photon
1. Para mosntar nuesta placa Photon, seguiremos los pasos de [esta guía](https://www.hackster.io/kayakpete/multiple-sensors-particle-photon-thingspeak-3ff8a4). 
2. Una vez tengamos nuestro Photon montado, lo configuraremos con nuestro smartphone. Para ello, utilizaremos [esta guía](https://docs.particle.io/guide/getting-started/start/photon/#step-2b-connect-your-photon-to-the-internet-using-your-smartphone).
3. Desde [Particle IDE](https://build.particle.io/build/new) importaremos el script Arduino `particle/firmware.bin` y lo flashearemos en nuestro dispositivo.
4. **Nota:** En caso de utilizar una IP diferente en el servidor, deberemos especificarla en la variable `server`.

### Crear Base de Datos
1. Utilizando el archivo arduino_database.sql ubicado en la carpeta databse, procederemos a crear la base de datos donde guardaremos las mediciones y la configuración del termostato.

### Instalar Mosquitto MQTT Messaging Broker en el servidor
1. Instalamos Mosquitto: `sudo apt-get install mosquitto mosquitto-clients`. Por defecto, Ubuntu iniciará el servicio Mosquitto después de la instalación.
2. Nos subscribimos al topic photon y a todos sus sub-topics: `mosquitto_sub -h localhost -t photon/+`

### Instalar el proyecto
1. Lanzar el index.js (mosquitto/proyecto) como un servio o utilizar MP2. Este archivo sera el encargado de guardar las mediciones en la base de datos.
2. Lanzar el index.js (mosquitto/logica) como un servicio o utilizar MP2. Este archivo sera el encargado de encender y apagar el enchufe.

### Aplicación Web
1. Accedemos a `http://<ip del servidor>`
