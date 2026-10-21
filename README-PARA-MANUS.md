# Función Lab — paquete para continuar en Manus

Este paquete contiene una copia editable del sitio educativo **Función Lab**, pensado para estudiantes de grados 10 y 11.

## Para continuar el proyecto en Manus

1. Adjunta `funcion-lab-compartir.zip` en un chat de Manus.
2. Copia y pega el texto de `PROMPT-PARA-EL-CHAT.txt`.
3. Pide a Manus que extraiga los archivos a un proyecto WebDev propio y use `dist/` como raíz del sitio estático.
4. Revisa la vista previa y solicita los cambios que quieras. Conserva el ZIP como copia de respaldo.

El ZIP trae el HTML, CSS y JavaScript editables, además del plan, los criterios funcionales, el logotipo y el manifiesto de rutas. **No necesita backend, credenciales, Node ni paquetes externos** para ejecutar la página. Las fuentes de Google se cargan por internet; si no hay conexión, se usan fuentes de respaldo.

## Probar el sitio fuera de Manus

Desde la carpeta que contiene `dist/`, ejecuta:

```bash
python3 -m http.server 3000 --directory dist
```

Después abre `http://localhost:3000`. También se puede abrir `dist/index.html` directamente en un navegador moderno.

## Alcance del paquete

- Familias lineal, cuadrática, valor absoluto, cúbica y exponencial.
- Representaciones algebraica, gráfica y tabular sincronizadas.
- Exploración de ecuaciones, ceros, ejemplos, parámetros y retos.
- Interfaz adaptable con controles etiquetados y acceso por teclado a la gráfica.

Este paquete **copia el código fuente**, pero no transfiere el proyecto WebDev original, sus versiones/checkpoints, su URL de vista previa, dominio, permisos de publicación ni el historial del chat. La persona que lo reciba debe trabajar en su propio proyecto/copia en Manus. No se incluyen `.git`, credenciales ni archivos de entorno.
