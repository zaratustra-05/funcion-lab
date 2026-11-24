# Diagnóstico y matriz FODA de Función Lab

## Evidencia revisada

- Página pública verificada: https://funcionlab-urgbqrhr.manus.space/
- Repositorio indicado: https://github.com/zaratustra-05/funcion-lab
- Consulta pública a la API de GitHub realizada el 24 de noviembre de 2026: `GET https://api.github.com/repos/zaratustra-05/funcion-lab` respondió `404 Not Found`.
- El proyecto sí aparece conectado en la configuración autenticada de Manus como repositorio GitHub `zaratustra-05/funcion-lab`.

La combinación anterior es consistente con un repositorio privado o no visible para visitantes sin autenticación. La visibilidad pública no se cambiará sin autorización explícita.

## Fortalezas

- Integra seis familias: lineal, cuadrática, valor absoluto, cúbica, exponencial y logarítmica.
- Relaciona expresión, gráfica y tabla de una misma función.
- Permite modificar parámetros, cambiar escala, desplazar la vista y seleccionar puntos de la tabla.
- Incluye práctica, retos variables, modo oscuro y un asistente educativo en español.
- La propuesta es adecuada para explorar funciones en grados 10 y 11.

## Oportunidades

- Hacía falta una portada institucional que identificara al autor, la carrera y la finalidad académica.
- El visitante podía entrar a explorar sin recibir una ruta breve de aprendizaje ni criterios claros para saber qué observar.
- El repositorio no tenía una portada README orientada a un profesor o visitante.
- La página podía hacer más visible su intención pedagógica y el vínculo entre exploración, práctica y evaluación.

## Debilidades

- La portada anterior comunicaba bien la estética, pero no identificaba al integrante ni el contexto universitario.
- La información de autoría y propósito no estaba concentrada en un lugar fácil de encontrar.
- El enlace del repositorio devuelve 404 a visitantes porque el repositorio no está público.
- La matriz FODA no estaba visible como reflexión del proyecto.

## Amenazas

- Un profesor sin acceso autenticado no puede revisar el repositorio privado.
- Si solo se comparte GitHub, el visitante puede encontrar archivos en vez de la experiencia publicada.
- Un asistente de IA puede desviar el aprendizaje si entrega respuestas sin pedir razonamiento; por eso debe orientar y explicar.
- Cambios en el código no aparecen en la URL publicada hasta crear una nueva publicación.

## Mejoras aplicadas en esta iteración

- Portada institucional con autor, perfil académico, propósito y ruta recomendada.
- Sección visible de diagnóstico FODA con acciones de mejora.
- Accesos directos para explorar, aprender, practicar y revisar el diagnóstico.
- README de GitHub con botón a la página pública, autoría y explicación del proyecto.

## Revisión FODA: segunda dimensión interactiva

### Hallazgo y acción
- **Fortaleza:** la página ya conecta regla, gráfica, tabla y práctica en 2D, y la primera estación 3D conserva esa lógica de pasar de una curva conocida a una superficie.
- **Oportunidad:** una escena 3D sin escala ni vistas ortogonales podía convertirse en una imagen llamativa pero difícil de leer matemáticamente. Se añadieron cuadrícula, unidades, escala visible y vistas desde arriba, frontal y lateral.
- **Debilidad:** el laboratorio libre inicial solo superponía funciones 2D y obligaba a comparar superficies una por una. Se añadió una composición libre 3D con hasta cuatro superficies, visibilidad independiente y relieve editable.
- **Amenaza:** el zoom automático o el encuadre fijo podía ocultar transformaciones, tamaños relativos y cortes. Ahora el estudiante puede acercar, alejar, arrastrar, cambiar de cámara y restaurar la escala tanto en 2D como en 3D.

### Criterio pedagógico aplicado
La ruta queda separada en tres niveles: laboratorio guiado para aprender familias y representaciones, laboratorio 3D guiado para reconocer superficies y sus conexiones con curvas, y composición libre 2D/3D para formular hipótesis sin borrar exploraciones anteriores. La escala se presenta como una variable de lectura, no como un adorno visual: primero se observa la misma unidad y después se ajusta el encuadre para investigar.
