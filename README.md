# Proyecto de Node.JS and MySQL para Argentina Programa 4.0

## Configuración

Asegúrate de haber realizado la configuración inicial antes de utilizar la API. Esto incluye la instalación de las dependencias y la configuración de variables de entorno. Puedes encontrar un archivo `.env` que contiene las variables de entorno necesarias.

# Instalación de dependencias
npm install

### Variables de Entorno

La aplicación utiliza variables de entorno para configurar diferentes aspectos de su funcionamiento. A continuación, se describen las variables de entorno necesarias y su significado.

- **PORT**: El puerto en el que la aplicación se ejecutará. Por defecto, se establece en `8080`.

    PORT=8080

- **HOST**: La dirección IP o el host en el que la aplicación estará disponible. Por defecto, se establece en `127.0.0.1`.


    HOST=127.0.0.1


- **DB_USER**: El nombre de usuario para la base de datos.

    DB_USER=root


- **DB_PASS**: La contraseña del usuario de la base de datos.

 
    DB_PASS=Root


- **DB_NAME**: El nombre de la base de datos que la aplicación utilizará.


    DB_NAME=trailerflix


- **DB_HOST**: La dirección del servidor de la base de datos. Por defecto, se establece en 127.0.0.1.


    DB_HOST=127.0.0.1


- **DB_PORT**: El puerto en el que la base de datos está escuchando. Por defecto, se establece en `3306`.


    DB_PORT=3306


- **FILE_URL**: La URL base para acceder a archivos o recursos. En este caso, se utiliza para acceder a archivos relacionados con la aplicación.

    ```shell
    FILE_URL=https://trailerflix.com/
    ```

Asegúrate de configurar estas variables de entorno correctamente en tu archivo `.env` antes de iniciar la aplicación. Puedes modificar los valores según tus necesidades específicas.

### Creación de la Base de Datos

Antes de ejecutar el servidor, asegúrate de crear la base de datos necesaria. Sigue estos pasos (todos los archivos esta en la carpeta DB)

1. Ejecuta el script SQL `modelo_DB_trailerflix.sql` para crear la base de datos. Puedes utilizar un cliente de MySQL.

### Pasos Adicionales

Si deseas migrar los datos del archivo JSON a la base de datos y crear la vista necesaria, sigue estos pasos adicionales:

1. Ejecuta el script `script_para_migrar.js` para migrar todos los datos del archivo JSON a la base de datos. Utiliza el siguiente comando:
2. Después de migrar los datos, ejecuta el script SQL JSON_VIEW.sql para crear la vista necesaria en la base de datos. Puedes utilizar un cliente de MySQL.

## Endpoints

Todas las rutas mencionadas devuelven resultados en formato JSON y manejan diferentes casos de error, como catálogos vacíos o parámetros inválidos.

---

## Endpoint `/catalogo`

El endpoint /catalogo ofrece las siguientes funcionalidades:

### Obtener Catálogo Completo mediante la vista JSON_VIEW

> Método: GET

> Descripción: Devuelve el catálogo completo de contenidos. Los datos se obtienen de la vista JSON_VIEW en la base de datos.

GET http://localhost:5000/catalogo/

### Obtener Catálogo por ID (GET /catalogo/:id)

> Método: GET

> Descripción: Permite obtener un contenido específico del catálogo según su ID.

> GET http://localhost:5000/catalogo/1

### Buscar Catálogo por Nombre (GET /catalogo/nombre/:nombre)

> Método: GET

> Descripción: Permite buscar contenidos en el catálogo por su nombre. Los resultados se devuelven en un arreglo y se mapean para incluir la URL del póster.

> ```shell GET http://localhost:5000/catalogo/nombre/Película```


### Buscar Catálogo por Género (GET /catalogo/genero/:genero)

> Método: GET

> Descripción: Permite buscar contenidos en el catálogo por género. Los resultados se devuelven en un arreglo y se mapean para incluir la URL del póster.

> ```shell GET http://localhost:5000/catalogo/genero/Acción```


## Endpoint `/categoria`

Este endpoint permite ver la información de las categorias registradas en la aplicación.

### Obtener Todas las categorias (GET `/categorias/`)

> Método: GET

> Descripción: Este endpoint devuelve una lista de todas las categorias registradas en la aplicación.

> shell GET http://localhost:5000/categorias/
