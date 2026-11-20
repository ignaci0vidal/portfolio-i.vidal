# Portfolio — Ignacio Vidal

Portfolio personal desarrollado como parte de las Prácticas Formativas 1 y 2 de la materia Desarrollo de Sistemas Web (Front End), del IFTS N.º 16.

El sitio presenta mi perfil como QA Engineer y estudiante de Desarrollo de Software, mis conocimientos técnicos y algunos de los proyectos realizados durante mi formación.

## Tecnologías utilizadas

- HTML5 — estructura y contenido semántico.
- CSS3 — estilos, Flexbox y diseño responsive.
- JavaScript — envío asíncrono del formulario de contacto.
- Formspree — recepción de consultas y notificaciones por correo.
- Google Fonts — tipografías Geist y Manrope.
- Font Awesome — iconos.
- Git y GitHub — control de versiones.
- GitHub Pages — publicación del sitio web.

## Funcionalidades y características

- Navegación entre secciones de una misma página.
- Presentación personal y profesional.
- Tabla de habilidades técnicas.
- Sección de proyectos con enlaces a repositorios.
- Formulario de contacto conectado a Formspree en español e inglés, con validación y estados de envío, éxito y error.
- Encabezado sticky con fondo semitransparente.
- Diseño responsive con media queries de 1080px, 768px, 480px y 375px.

## Estructura del proyecto

```text
portfolio-i.vidal/
├── index.html
├── README.md
├── css/
│   └── styles.css
└── assets/
    └── img/
        ├── banner.jpg
        ├── logo.jpg
        └── perfil.jpg
```

## Despliegue

El portfolio está preparado para publicarse mediante **GitHub Pages**, utilizando la rama `main` del repositorio.


https://ignaci0vidal.github.io/portfolio-i.vidal/

## Repositorio

https://github.com/ignaci0vidal/portfolio-i.vidal

## Autor

**Ignacio Vidal**

QA Engineer | Software Developer

Estudiante de la Tecnicatura Superior en Desarrollo de Software — IFTS N.º 16.

## Contacto con Formspree

Ambas páginas envían las consultas a `https://formspree.io/f/mzeradrv`. El nombre, correo y mensaje son obligatorios; el teléfono y apellido son opcionales. Sin JavaScript, el formulario conserva el envío POST estándar a Formspree.

El correo receptor y su verificación se administran en la cuenta de Formspree. Para comprobar la entrega, enviá una consulta desde el sitio publicado y verificá su recepción en Formspree y en el correo configurado (incluida la carpeta de spam).

El formulario valida espacios vacíos, formato de correo, mensaje de 10 a 5000 caracteres y teléfono opcional de 7 a 15 dígitos. Incluye mensajes por campo, honeypot `_gotcha`, bloqueo de duplicados, espera de 30 segundos tras un envío exitoso y un tiempo máximo de respuesta de 20 segundos. Estas medidas del navegador son básicas y no reemplazan los filtros de spam de Formspree.
