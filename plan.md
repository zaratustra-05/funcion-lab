# Plan de implementación — Función Lab

## Propósito
Crear una experiencia web interactiva, en español, para estudiantes de grados 10 y 11. Un selector permite explorar cinco familias —lineales, cuadráticas, valor absoluto, cúbicas y exponenciales—, cada una representada mediante ecuación, gráfica cartesiana y tabla. Las actividades conectan la resolución de ecuaciones como f(x)=0 con ceros e intersecciones.

## Alcance aprobado
- Selector de funciones lineales, cuadráticas, de valor absoluto, cúbicas y exponenciales, con ejemplos guiados adecuados para los grados 10 y 11.
- Vista sincronizada de una sola función en las representaciones algebraica, gráfica y tabular.
- Formas algebraicas pertinentes a cada familia; conversiones canónica, estándar/general y factorizada para cuadráticas, y formas desarrolladas, por tramos o ecuaciones de solución cuando corresponda.
- Gráfica cartesiana interactiva con puntos, ceros/intersecciones y el elemento característico de cada familia destacado.
- Tabla dinámica de pares ordenados vinculada a la gráfica.
- Controles para modificar parámetros y observar los cambios al instante.
- Explicaciones breves que conecten cada representación con la información que comunica.
- Actividades guiadas con verificación inmediata, pistas y explicación.
- Diseño responsivo y accesible para computador, tableta y móvil.

## Decisiones de implementación
La página será una aplicación estática sin backend, construida con HTML semántico, CSS y JavaScript nativo. Un motor matemático común usa parámetros `a`, `h` y `k` para modelos lineales, cuadráticos, de valor absoluto, cúbicos y exponenciales. Calcula formas equivalentes o reglas propias de cada familia, soluciones reales de `f(x)=0`, puntos notables y valores tabulares. Un lienzo Canvas representa cada curva y sus elementos clave, con actualización inmediata y sin dependencias externas.

## Diseño

- **Movimiento de diseño:** laboratorio científico editorial con estética de “cuaderno de matemáticas luminoso”.
- **Principios:** una función como protagonista; conexiones visibles entre paneles; información por capas; la exploración antes que la memorización.
- **Color:** fondo azul tinta para concentración, cian eléctrico para la gráfica, coral para interceptos y lima para la tabla/confirmaciones. Cada representación conserva un acento reconocible.
- **Estructura:** una columna narrativa con estaciones de exploración; el laboratorio central se divide en una banda de ecuaciones, una visualización dominante y una mesa de datos, en lugar de una cuadrícula de tarjetas uniforme.
- **Elementos distintivos:** retícula cartesiana luminosa, trazos de conexión curvos entre las tres representaciones y una cápsula de “misma función” que recalca la equivalencia.
- **Interacción:** los deslizadores actualizan todos los paneles; seleccionar una fila de la tabla ilumina y mantiene sincronizado su punto; la gráfica se explora con puntero o con flechas del teclado; selectores y ejemplos anuncian su estado; los retos devuelven retroalimentación específica.
- **Animación:** cambios suaves de curvas, entrada escalonada de módulos y pulso discreto de los elementos conectados; se respeta `prefers-reduced-motion`.
- **Tipografía:** Space Grotesk para jerarquía y fórmulas, Inter/sans-serif para lectura. Fórmulas grandes, etiquetas pequeñas con mayúsculas moderadas y alto contraste.
- **Esencia de marca:** “Función Lab convierte funciones y ecuaciones en una conversación entre símbolos, datos y geometría para 10.º y 11.º.” Personalidad: curiosa, clara y enérgica.
- **Voz:** directa, alentadora y precisa. Ejemplos: “Mueve un parámetro: las tres vistas responden.” / “No cambiaste de función; cambiaste de lente.”
- **Marca:** logotipo “ƒL” contenido en una cápsula con un trazo de parábola; color firma: cian laboratorio `#52e5ff`.

## Estructura del proyecto

```text
funcionlab/
├── dist/
│   ├── index.html          # Estructura semántica y contenido educativo
│   ├── styles.css          # Diseño responsivo, animaciones y accesibilidad
│   ├── app.js              # Estado matemático, Canvas, tabla, controles y retos
│   └── manus-routes.json   # Manifiesto de rutas de la vista estática
├── plan.md                 # Decisiones de producto, diseño e implementación
├── TODO.md                 # Resultados esperados y criterios funcionales
└── app.config.ts           # Metadato de logotipo para el proyecto
```

## Publicación
La salida estática se servirá desde `dist/`. No se requieren credenciales, servidor ni base de datos.
