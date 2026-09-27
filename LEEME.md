# CIC · Prototipo navegable

Abre `index.html` en un navegador. Los enlaces también funcionan con un servidor estático. Incluye 15 páginas adaptables a celular, biblioteca filtrable, calculadora de punto de equilibrio y vistas de demostración del campus y la gestión.

## Alcance

El portal sigue la estructura del benchmarking facilitado por el cliente. No se ha instalado Moodle ni implementado autenticación, base de datos, reportes automáticos, carga de evidencias o certificación. El progreso de muestra no se guarda. No se recopilan datos personales. Los indicadores del panel son ficticios; las cifras del portal son las previstas en el informe, no resultados acreditados.

Los módulos temáticos HACER y SER son propuestas editoriales que deben sustituirse o validarse con el material oficial. La calculadora es ilustrativa y no representa una plantilla oficial A1–A24. Se requieren logos, directorio territorial, videos y materiales autorizados.

## Antes de publicar

- Confirmar dominio, alojamiento, identidad visual, aliados y canales de soporte.
- Conectar Moodle en un subdominio y establecer permisos, reglas de evaluación y criterios de constancia definitivos.
- Publicar la política institucional de datos y configurar la activación de cuentas.
- Todas las páginas están en `noindex,nofollow` para evitar indexar el prototipo. Al lanzar, permitir indexación únicamente de las páginas públicas y mantener campus, gestión y verificación fuera del índice.
- Incorporar canonical, og:url, URL de organización y sitemap.xml con el dominio verdadero. No se han inventado dominios.
- Validar los datos estructurados y añadir proveedor/organización oficiales a las fichas de curso.
- Configurar Search Console y, si se autoriza, analítica con consentimiento sin información personal.
- Medir rendimiento en el alojamiento definitivo: objetivos LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1. No son mediciones del prototipo.

Fuentes tipográficas: Google Fonts con fuentes locales de respaldo. Para una instalación totalmente autónoma, alojar las fuentes localmente. La ilustración es SVG original integrada en el HTML.

## Actualización v3 · movimiento y coherencia visual
- Sello y favicon vectoriales con fondo transparente (`assets/sello-cic.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`). El antiguo `sello-cic.png` (fondo blanco) ya no se usa.
- Registro únicamente con número de cédula (solo dígitos) y contraseña; sin correo electrónico.
- Capa compartida `assets/v3.css` + `assets/v3.js` en las 15 páginas: auroras de color en los héroes, cintas en movimiento, apariciones al desplazarse, contadores animados, tarjetas con inclinación 3D, pilares que avanzan solos y botón para pausar el movimiento. Todo respeta «reducir movimiento» del sistema.
- Páginas rediseñadas: Recursos (caja de herramientas animada, categorías, calculadora rápida con controles), Sobre el CIC (sello animado, manifiesto, modelo en cascada, cinco pilares), Territorio (mapa esquemático interactivo sincronizado con el explorador), Ayuda (conversación animada, buscador de preguntas, temas, ingreso en tres pasos) y Campus (anillo de progreso, recorrido de seis semanas, logros y celebración).
- Estos cambios se aplicaron directamente sobre `outputs/cic`. Si se vuelven a ejecutar `work/build.cjs`, `rebrand.cjs` o `polish.cjs`, se sobrescribirán.

## Actualización de marca v2
Paleta y tipografías del Manual de Marca CIC v2, sello extraído del PDF, menú flotante, cinco pilares interactivos y registro de demostración con perfiles dinamizador, mentor y aliado. Los datos del formulario nunca se envían ni almacenan. Para reconstruir: node work/build.cjs seguido de node work/rebrand.cjs desde el directorio del proyecto.

