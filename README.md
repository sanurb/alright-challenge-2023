# Sistema de Revisión de Documentos (nx-giant)

Este proyecto tiene como finalidad permitir a los usuarios cargar documentos en formato PDF, solicitar revisiones de estos documentos por parte de otros usuarios y realizar anotaciones y comentarios.

## Índice

- [Requerimientos del sistema](#Requerimientos-del-sistema)
- [Instalación](#Instalación)
- [Uso](#Uso)
- [Diagrama de Casos de Uso](#Diagrama-de-Casos-de-Uso)
- [Diagrama Inicial de la BD](#Diagrama-Inicial-de-la-BD)
- [Dependencias](#Dependencias)
- [Licencia](#Licencia)

## Requerimientos del sistema

- Node.js v16.x
- npm v7.x

## Instalación

1. Clone este repositorio en su máquina local utilizando `git clone https://github.com/sanurb/alright-challenge-2023-nestjs-angular`.
2. Navegue a la carpeta del proyecto con `cd alright-challenge-2023`.
3. Instale todas las dependencias con `npm install`.

## Uso

Para iniciar el servidor backend, ejecute el siguiente comando:

```bash
npm run dev:backend
```

Para iniciar el servidor frontend, ejecute el siguiente comando:

```bash
npm start
```

Tambien para mayor facilidad se recomienda instalar la extension de nx la cual le brinda una interfaz para correr todos los comandos disponibles en las aplicaciones tanto de front como backend

## Diagrama de Casos de Uso

A continuación, se muestra el diagrama de casos de uso del sistema:

![Diagrama de Casos de Uso](public\assets\diagrama-caso-de-uso-sistema-revision-documentos.svg)

diagrama realizado con [PlantUML](http://www.plantuml.com/)

## Diagrama Inicial de la BD

Link: [Diagrama de Casos de Uso](https://dbdiagram.io/d/648633ca722eb77494c5eade)

## Dependencias

Este proyecto utiliza varias dependencias y tecnologías, incluyendo:

- [Angular](https://angular.io/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [RxJS](https://rxjs.dev/)
- [Husky](https://typicode.github.io/husky/#/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

Para más detalles, consulte el archivo `package.json` incluido en este repositorio.

## Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo `LICENSE` para más detalles.
