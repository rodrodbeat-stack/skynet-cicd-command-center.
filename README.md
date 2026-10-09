# SKYNET/OPS — CI/CD Command Center

Dashboard estático, responsive e interactivo para visualizar el flujo CI/CD desde el desarrollador hasta producción, con estética futurista tipo centro de operaciones.

## Incluye
- Flujo de 8 etapas: Developer, GitLab, CI Pipeline, Quality Gate, Security, Artifact Registry, Staging y Producción.
- Botón **Ejecutar Pipeline** con simulación visual de cada etapa.
- Radar de infraestructura, métricas y stream de logs.
- Diseño adaptable a móvil y escritorio.

## Ejecutar localmente
No requiere Node.js ni instalación de dependencias. Abre `index.html` en el navegador, o sirve la carpeta con:

```bash
python -m http.server 8080
```

Después visita `http://localhost:8080`.

## Publicar en GitHub Pages
1. Sube `index.html`, `styles.css` y `app.js` a la raíz del repositorio.
2. En GitHub entra a **Settings → Pages**.
3. Selecciona **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.

> Los indicadores y eventos son datos de demostración. Para mostrar datos reales, hay que integrar la web con la API de GitLab, métricas de observabilidad y los permisos/tokens correspondientes. No incluye credenciales ni conexión real a producción.
