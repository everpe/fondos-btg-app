
# BtgFundsApp

Este proyecto es una **prueba técnica** desarrollada con [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.15.

## Servidor de desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Luego, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

## API simulada con JSON Server

Este proyecto utiliza [json-server](https://github.com/typicode/json-server) para simular una API REST utilizando el archivo `db.json` incluido en el repositorio.

Para iniciar la API localmente, ejecuta:

```bash
npm run api
```

Esto levantará un servidor en `http://localhost:3000/` con los endpoints definidos en `db.json`.

## Generación de código

Angular CLI incluye herramientas para generar código automáticamente. Para crear un nuevo componente, ejecuta:

```bash
ng generate component nombre-del-componente
```

Para ver la lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Compilación

Para compilar el proyecto, ejecuta:

```bash
ng build
```

Esto generará los archivos de compilación en el directorio `dist/`. Por defecto, la compilación de producción optimiza la aplicación para mayor rendimiento y velocidad.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io), utiliza el siguiente comando:

```bash
ng test
```

Angular CLI no incluye un framework de pruebas e2e por defecto. Puedes elegir el que mejor se adapte a tus necesidades.

