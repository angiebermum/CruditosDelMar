# CRUDITOS DEL MAR — CONTEXTO MAESTRO DEL PROYECTO

**Proyecto:** Práctica Profesional — Cruditos del Mar  
**Estudiante:** Angie Bermúdez Mora  
**Última actualización:** 18 de octubre de 2026  
**Uso previsto:** Documento maestro de contexto para continuar el desarrollo en una nueva sesión de Codex, Claude u otro asistente de programación.

---

## 1. Instrucciones para cualquier nueva sesión de desarrollo

Antes de modificar código:

1. Leer este archivo completo.
2. Revisar brevemente la estructura actual del repositorio.
3. Revisar `git status`.
4. Localizar únicamente los archivos relacionados con la tarea.
5. Comparar el código real con este documento.
6. Si existe una discrepancia, no asumir: indicar cuál es.
7. No rehacer funciones que ya existen.
8. No inventar información del negocio.
9. No hacer refactors generales sin necesidad.
10. Priorizar desarrollo funcional sobre retoques puramente visuales.
11. Ejecutar `npm run build` y `npm run lint` después de cambios.
12. No hacer commit salvo solicitud explícita.
13. No usar Computer Use salvo que se solicite específicamente.
14. No agregar dependencias si no son necesarias.
15. Mantener cambios pequeños, claros, explicables y mantenibles.

En PowerShell de Windows puede ser necesario usar:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

porque `npm.ps1` puede estar bloqueado.

---

# 2. Contexto general

## Proyecto

**Nombre:** Cruditos del Mar

**Repositorio:**
```text
https://github.com/angiebermum/CruditosDelMar
```

**Ruta local habitual:**
```text
C:\Users\angie\source\repos\CruditosDelMar
```

Es un proyecto de Práctica Profesional universitaria.

**Empresa patrocinadora:** Cruditos del Mar  
**Propietario:** Vinicio Bonilla Fuentes

## Objetivo general

Desarrollar una aplicación web para que los clientes puedan:

- consultar productos;
- consultar promociones;
- personalizar productos;
- agregar productos al carrito;
- modificar el carrito;
- ingresar datos básicos para el pedido;
- escoger retiro o express;
- preparar el pedido;
- posteriormente enviarlo al negocio por WhatsApp.

---

# 3. Contexto académico

La práctica dura **15 semanas**.

Se deben registrar exactamente:

**27 horas por semana.**

El profesor indicó que a partir del primer avance se debe dedicar más tiempo a **DESARROLLO FUNCIONAL** y menos a trabajo puramente visual.

El sistema debe estar prácticamente terminado para la **semana 14**.

La **semana 15** debería quedar principalmente para:

- pruebas;
- correcciones;
- documentación;
- cierre.

No inventar actividades para la bitácora. Todo lo documentado debe corresponder con trabajo realizado realmente.

---

# 4. Tecnologías utilizadas

## Frontend
- React
- JavaScript
- Vite
- React Router

## Servicios / backend previstos
- Firebase
- Firestore
- Firebase Authentication

## Herramientas
- Visual Studio 2022
- Git
- GitHub
- GitHub Desktop
- Chrome
- Codex / Claude como apoyo de desarrollo

---

# 5. Forma de trabajo

La desarrolladora está aprendiendo mientras construye el proyecto.

Los cambios deben ser:
- pequeños;
- claros;
- explicables;
- mantenibles.

Evitar:
- overengineering;
- refactors generales innecesarios;
- dependencias nuevas sin justificación;
- cambios masivos no relacionados;
- comentarios innecesarios;
- comentarios relacionados con IA, prompts, asistentes o código generado.

## Uso recomendado de agentes
- **Low:** cambios pequeños, CSS puntual, datos, textos, enlaces.
- **Medium:** funciones completas que tocan varios archivos.
- **High:** evitar salvo problemas técnicos realmente complejos.

Para ahorrar uso del agente:
- no revisar todo el repositorio en cada tarea;
- revisar únicamente archivos relevantes;
- no usar Computer Use salvo necesidad;
- preferir una funcionalidad completa por prompt en vez de muchas rondas pequeñas;
- si se cambia de Codex a Claude, una funcionalidad debería terminarse con el mismo agente cuando sea posible.

---

# 6. Identidad visual

## Color principal
```text
#061536
```

## Estilo
- moderno;
- limpio;
- cálido;
- gastronómico;
- fondos crema/blancos;
- tarjetas redondeadas;
- sombras sutiles;
- animaciones discretas;
- responsive.

Evitar aspecto:
- administrativo;
- tabla de Excel;
- interfaz excesivamente plana.

No mostrar textos técnicos al usuario como:
- “Fotografía pendiente”;
- “Contenido temporal”;
- “Por definir”;
- “Espacio preparado”;
- etc.

## Cabeceras internas
Las páginas internas fueron unificadas aproximadamente en:
- Desktop: 56 px
- Tablet: 44 px
- Móvil: 36 px

El Home puede tener un hero diferente.

## Slogan
```text
Del mar a tu paladar
```

Pendiente:
- colocar una fotografía real atractiva de comida en el hero del Home.

No se recomienda repetir el logo gigante como imagen principal del hero.

---

# 7. Alcance del cliente

Los clientes **NO crean cuenta**.

No existe login para clientes.

El cliente puede:
- consultar productos;
- consultar promociones;
- personalizar productos;
- usar carrito;
- ingresar nombre;
- ingresar teléfono;
- escoger modalidad de entrega;
- preparar el pedido.

---

# 8. Modalidades de entrega y pago

## Retiro en el local
Formas de pago:
- Efectivo
- Tarjeta

El pago se realiza físicamente al retirar.

No existe pago con tarjeta en línea.

## Express
Forma de pago:
- SINPE Móvil

Se requiere:
- dirección de entrega.

Más adelante se debe solicitar:
- comprobante SINPE.

No permitir Efectivo ni Tarjeta para Express.

---

# 9. WhatsApp

El objetivo final es que la aplicación prepare el pedido y abra WhatsApp para enviarlo al negocio.

La aplicación **NO confirma automáticamente** que el restaurante aceptó el pedido.

Después del envío, la coordinación se realiza manualmente por WhatsApp.

**Número oficial de WhatsApp:** PENDIENTE DE CONFIRMAR.

No inventarlo.

---

# 10. SINPE

**Número SINPE:** PENDIENTE  
**Nombre del receptor:** PENDIENTE

No inventar estos datos.

Firebase Storage no se está utilizando actualmente porque requiere habilitar facturación/Blaze.

Más adelante debe resolverse el comprobante SINPE sin introducir costos innecesarios.

---

# 11. Rutas actuales

```text
/
```
Inicio

```text
/menu
```
Menú

```text
/promociones
```
Promociones

```text
/catalogo
```
Catálogo

```text
/quienes-somos
```
Quiénes somos

```text
/ubicacion
```
Ubicación

```text
/producto/:id
```
Detalle de producto

```text
/carrito
```
Carrito

```text
/pedido
```
Proceso de pedido

---

# 12. Home

El Home ya existe.

Actualmente tiene:
- hero;
- botón a productos;
- botón a promociones;
- navegación general.

Se simplificó para no repetir todo el contenido del resto del sitio.

Pendiente:
- colocar fotografía real atractiva de los productos;
- posiblemente usar el slogan “Del mar a tu paladar”.

No dedicar demasiado tiempo adicional al diseño del Home antes de terminar funcionalidad.

---

# 13. Menú

El Menú funciona como carta digital compacta.

No debe duplicar la experiencia visual del Catálogo.

El Menú es más:
- informativo;
- compacto;
- fácil de consultar.

Los productos se organizan por:
- categorías;
- grupos.

Se corrigió el diseño para evitar:
- grandes espacios vacíos;
- sensación de tabla administrativa.

---

# 14. Categorías actuales

- Platos fuertes
- Ceviches y caldosas
- Snacks
- Menú infantil
- Bebidas
- Postres

**IMPORTANTE:** Casados fue eliminado.

No volver a crear Casados salvo instrucción explícita.

---

# 15. Productos

Fuente de datos actual:
```text
src/data/products.js
```

Actualmente existen aproximadamente **44 productos reales**.

No duplicar datos dentro de componentes.

La estructura puede utilizar:
- `precio`
- `presentaciones`
- `opciones`
- `etiquetaOpciones`
- `variantes`
- `extras`

No asumir que todos los productos tienen la misma estructura.

---

# 16. Catálogo

El Catálogo ya es funcional.

Incluye:
- categorías;
- filtrado;
- tarjetas de productos;
- “Ver producto”.

Las categorías están centralizadas.

Existe ruta dinámica:
```text
/producto/:id
```

El botón “Ver producto” abre el detalle correspondiente.

---

# 17. Detalle de producto

Archivo:
```text
src/pages/ProductDetailPage.jsx
```

La página soporta:

## Precio único
Ejemplo:
```text
Arroz con camarones
₡4.500
```

## Presentaciones
Ejemplo: Ceviche de Pulpo:
- Caldosa
- Ceviche
- Medio
- Entero

La presentación seleccionada cambia el precio.

## Opciones
Ejemplo: Burrito

Etiqueta:
```text
Relleno a elegir
```

Opciones:
- Carne mechada
- Camarones empanizados
- Camarones al ajillo
- Pollo caribeño
- Mixto de camarón y carne mechada

## Presentaciones + opciones
Ejemplo: Frescos naturales.

## Variantes
Ejemplo: Gaseosas.

## Cantidad
```text
[-] 1 [+]
```

Nunca puede bajar de 1.

## Subtotal
```text
precio unitario × cantidad
```

## Observaciones
Todos los productos tienen textarea opcional.

Ejemplos:
- sin tomate;
- sin cebolla;
- salsa aparte.

Las observaciones **NO modifican el precio**.

## Extras
Los productos tienen actualmente:
```js
extras: []
```

La lógica ya soporta extras futuros:
```js
{
  id,
  nombre,
  precio
}
```

Permite selección múltiple.

Fórmula:
```text
precioUnitarioFinal = precioBase + sumaExtras
subtotal = precioUnitarioFinal × cantidad
```

Actualmente **NO existen extras reales configurados**.

No inventar extras ni precios. Esperar información real del dueño.

---

# 18. Información pendiente de productos

Se confirmó recientemente que:
- Arroz con camarones
- Arroz con mariscos

son porciones de:
```text
1/2
```

Además permiten escoger acompañamiento:
- ensalada + papas fritas
- ensalada + patacón

Esta información puede estar todavía pendiente de integrarse en `products.js`.

Antes de modificar, revisar el archivo actual.

---

# 19. Productos confirmados por categoría

## Platos fuertes
- Arroz con camarones — ₡4.500
- Camarones con arroz — ₡5.500
- Arroz con mariscos — ₡5.500
- Mariscos con arroz — ₡6.500
- Arroz con pulpo — ₡5.500
- Sopa de mariscos en agua — ₡4.500
- Sopa de mariscos en leche — ₡5.000
- Crema de mariscos — ₡4.500
- Camarones empanizados o al ajillo — ₡4.500
- Pargo frito — ₡7.500
- Pargo relleno de camarones — ₡8.500
- Filet de pescado empanizado — ₡4.200
- Chifrijo con camarones empanizados o pulpo al ajillo — ₡6.500

Grupos:
- Arroces
- Sopas y cremas
- Pescados y camarones
- Especialidades

## Ceviches y caldosas

### Vuelve a la Vida
Descripción: mix de pescado, pulpo, camarón y calamar con salsa de la casa.

Presentaciones:
- Caldosa — ₡2.700
- Ceviche — ₡4.400
- Medio — ₡6.600
- Entero — ₡9.000

### Ceviche Caribeño
Descripción: pescado, surimi y mango con salsa caribeña.

- Caldosa — ₡2.700
- Ceviche — ₡3.800
- Medio — ₡5.700
- Entero — ₡7.700

### Ceviche de Pulpo
- Caldosa — ₡2.600
- Ceviche — ₡4.500
- Medio — ₡7.300
- Entero — ₡9.600

### Ceviche de Camarón
- Caldosa — ₡2.300
- Ceviche — ₡3.600
- Medio — ₡6.200
- Entero — ₡7.700

### Pescado y Camarón
- Caldosa — ₡2.400
- Ceviche — ₡3.700
- Medio — ₡6.500
- Entero — ₡8.000

### Tropical
Descripción: pescado y piña con salsa tropical.
- Caldosa — ₡2.500
- Ceviche — ₡3.500
- Medio — ₡5.000
- Entero — ₡6.500

### Tipo Peruano
Descripción: pescado, elotitos tostados y Ají Peruano.
- Caldosa — ₡2.500
- Ceviche — ₡3.800
- Medio — ₡5.700
- Entero — ₡7.700

### Pescado
- Caldosa — ₡1.700
- Ceviche — ₡2.600
- Medio — ₡3.900
- Entero — ₡6.200

### Cóctel de Camarón
12 oz — ₡4.500

Descripción: camarón, aguacate, pepino, tomate y salsa de jugo de tomate.

### Chichaldosa
- Tradicional — ₡2.000
- Super Caldosa — ₡3.600

Descripción: chicharrón y pico de gallo.

### Carnosa
- Tradicional — ₡2.400
- Super — ₡3.700

Descripción: carne mechada y pico de gallo.

Grupos:
- Ceviches
- Cócteles
- Caldosas

## Snacks
- Flautas fritas a la cochinilla — ₡4.000
- Burrito — ₡4.200
- Hamburguesa de Mar y Tierra — ₡4.300
- Hamburguesa de pollo empanizado y guacamole — ₡4.300
- Wrap de cerdo cochinilla o camarones con salsa BBQ — ₡4.300
- Caribe Crunch — ₡4.500
- Papa Nacho — Mediana ₡4.000 / Grande ₡6.000
- Huevos de tortuga — 1 unidad ₡1.000

### Burrito
Opciones:
- Carne mechada
- Camarones empanizados
- Camarones al ajillo
- Pollo caribeño
- Mixto de camarón y carne mechada

Etiqueta:
```text
Relleno a elegir
```

### Papa Nacho
Opciones conocidas:
- carne mechada;
- camarones empanizados.

## Menú infantil
- Mini hamburguesa de carne o pollo — ₡2.200
- Nuggets de pescado o pollo — ₡2.800
- Salchipapas — ₡1.800

## Postres

### Apretados en leche
Precio:
```text
₡700
```

Sabores:
- Chocofresa
- Chocomaní
- Chocomenta
- Churchill
- Coco
- Maracuyá
- Melocotón
- Oreo
- Pie de limón
- Ron con pasas (sin licor)

### Apretado en agua
Precio:
```text
₡700
```

Sabor:
- Frutas

### Crepa con helado, fresa y banano
Precio:
```text
₡2.000
```

Opciones:
- Caramelo
- Nutella

Etiqueta:
```text
Relleno a elegir
```

### Postres de la casa
Información variable. No cargar nombres/precios sin confirmación.

---

# 20. Bebidas

## Frescos naturales
Sabores:
- Sandía
- Mango
- Piña
- Fresa
- Pitahaya

Presentaciones:
- Agua — ₡1.200
- Leche — ₡1.500

## Chamoyadas
Precio:
```text
₡2.200
```

Sabores:
- Mango
- Fresa
- Sandía
- Piña

## Gaseosas
Existe un único producto:
```text
Gaseosas
```

Variantes:
- Coca-Cola — 350 ml — ₡700
- Coca-Cola — 250 ml — ₡500
- Coca-Cola Zero — 350 ml — ₡700
- Fanta Naranja — 350 ml — ₡700
- Fanta Uva — 350 ml — ₡700
- Fresca — 350 ml — ₡700
- Canada Dry Ginger Ale — 350 ml — ₡700
- Zarzaparrilla La Mundial — 350 ml — ₡700
- Piña La Mundial — 350 ml — ₡700

En el Menú se agrupó Coca-Cola para que no se viera repetida visualmente.

## Agua
Precio:
```text
₡1.000
```
Tamaño pendiente.

## Powerade
Precio:
```text
₡1.000
```

Opciones actuales:
- Azul
- Rojo

Nombres reales de sabores pendientes.

## Hi-C
Precio:
```text
₡500
```
Sabores/presentaciones pendientes.

## Té frío
Existe, pero están pendientes:
- marca;
- sabores;
- presentación;
- precio.

## Fanta roja
Visible en fotografías, sabor exacto pendiente.

No inventar esos datos.

---

# 21. Carrito

Archivos:
```text
src/context/CartContext.jsx
src/context/useCart.js
src/pages/CartPage.jsx
```

CartContext proporciona:
- `items`
- `addItem`
- `removeItem`
- `updateItem`
- `updateQuantity`
- `clearCart`
- `totalItems`
- `totalPrice`

Persistencia:
```text
localStorage
```

Clave:
```text
cruditosDelMarCart
```

Al refrescar, el carrito permanece.

Si el contenido almacenado es inválido:
```text
[]
```

El carrito conserva:
- productId;
- nombre;
- cantidad;
- precio;
- presentación;
- opción;
- variante;
- extras;
- observaciones;
- subtotal.

Dos líneas se combinan únicamente cuando su configuración es equivalente.

---

# 22. Edición desde el carrito

El carrito permite:
- aumentar cantidad;
- disminuir cantidad;
- eliminar;
- vaciar;
- seguir comprando;
- editar producto.

Ruta de edición aproximada:
```text
/producto/{productId}?editar={lineId}
```

Al editar se precargan:
- presentación;
- opción;
- variante;
- extras;
- observaciones;
- cantidad.

El botón cambia de:
```text
Agregar al carrito
```

a:
```text
Guardar cambios
```

Si se cancela:
- la línea original no cambia.

Si termina exactamente igual a otra línea:
- se combinan cantidades.

---

# 23. Pedido

Archivo:
```text
src/pages/OrderPage.jsx
```

Ruta:
```text
/pedido
```

Desde el carrito existe:
```text
Continuar con el pedido
```

Si el carrito está vacío:
- no debe permitirse crear pedido.

Datos:
- Nombre
- Teléfono

Pregunta:
```text
¿Cómo deseas recibir tu pedido?
```

Opciones:
- Retiro en el local
- Express

---

# 24. Retiro en el local

Forma de pago:
- Efectivo
- Tarjeta

No se solicita dirección.

Se aclara que el pago se realiza físicamente al retirar.

---

# 25. Express

Se solicita:
```text
Dirección de entrega
```

Forma de pago:
```text
SINPE Móvil
```

No se muestran:
- Efectivo
- Tarjeta

---

# 26. Validaciones del pedido

Siempre:
- nombre;
- teléfono;
- tipo de entrega.

Retiro:
- forma de pago.

Express:
- dirección.

Los errores aparecen cerca de los campos.

No usar `alert()`.

---

# 27. Revisar pedido

Existe:
```text
Revisar pedido
```

Muestra:
- nombre;
- teléfono;
- entrega;
- dirección si aplica;
- forma de pago;
- productos;
- cantidades;
- total.

Existe:
```text
Editar datos
```

Existe:
```text
Editar carrito
```

Todavía NO existe:
- pedido confirmado;
- enviar pedido;
- pagar;
- WhatsApp;
- backend de pedidos.

---

# 28. Borrador del pedido

Usa:
```text
sessionStorage
```

Clave:
```text
cruditosDelMarOrderDraft
```

Guarda:
- nombre;
- teléfono;
- tipo de entrega;
- dirección;
- forma de pago.

Permite:
```text
/pedido
→ editar carrito
→ agregar otro producto
→ volver a /pedido
```

sin volver a escribir los datos.

El carrito sigue usando CartContext + localStorage.

---

# 29. Promociones

Fuente:
```text
src/data/promotions.js
```

Página:
```text
src/pages/PromotionsPage.jsx
```

Organización actual:
- Martes
- Miércoles
- Jueves
- Viernes
- Viernes y sábado
- Promociones de la semana

Lunes se muestra como cerrado.

No existe detección automática del día.

No bloquear promociones según fecha sin aprobación.

---

# 30. Promociones confirmadas recientemente

## Viernes

### Combo para dos
Precio:
```text
₡7.500
```

Incluye:
- 1 Hamburguesa Mar y Tierra
- 1 Flautas fritas a la cochinilla
- 2 Coca-Colas de 250 ml

### Combo Caribe + Camarones
Precio:
```text
₡8.000
```

Incluye:
- 1 Caribe Crunch
- 1 Camarones empanizados
- 2 Coca-Colas de 250 ml

Anteriormente se llamaba “Promo de viernes”; se cambió a “Combo Caribe + Camarones”.

---

# 31. Otras promociones existentes

Ya existen promociones de:
- Martes
- Miércoles
- Jueves
- Viernes y sábado
- Semana

Ejemplos:
- burritos;
- caldosas;
- wraps;
- Papa Nacho;
- parrilleros;
- promociones semanales.

La fuente de verdad es `src/data/promotions.js`.

No sobrescribir datos sin revisar el archivo.

---

# 32. Promociones y Catálogo

**Las promociones NO deben agregarse al Catálogo.**

El Catálogo contiene productos normales.

Promociones sigue siendo una sección independiente.

---

# 33. Próxima función prevista: Promociones → Carrito

Puede estar pendiente.

Flujo:
```text
/promociones
→ Ver promoción
→ /promocion/:id
→ configurar si corresponde
→ cantidad
→ Agregar al carrito
```

Las promociones deben llegar al mismo carrito.

Una promoción debe ser UNA línea del carrito.

No convertir cada elemento del combo en productos separados con precios normales.

Algunas promociones tienen opciones.

Ejemplo:
Papa Nacho:
- Camarones empanizados
- Carne mechada

No inventar opciones nuevas.

---

# 34. Quiénes somos

Ruta:
```text
/quienes-somos
```

Incluye:
- logo;
- historia;
- misión;
- visión.

## Misión actual
> Brindar a los clientes productos gastronómicos con altos estándares de calidad, destacando el sabor único del local y promover el bienestar a través de ingredientes frescos y nutritivos.

## Visión actual
> Ser reconocidos a nivel nacional como una de las mejores opciones de soda y cevichería, con proyección de crecimiento y expansión, manteniendo siempre el compromiso con la calidad y satisfacción del cliente.

Estas reemplazaron versiones anteriores.

---

# 35. Ubicación

Ruta:
```text
/ubicacion
```

Ubicación:
```text
Santiago de Puriscal
San José, Costa Rica
```

Referencia:
```text
50 metros al norte de la Delegación Policial de Puriscal,
diagonal a Maxi Palí.
```

Botón:
```text
Cómo llegar
```

Ya es funcional.

Google Maps:
```text
https://maps.app.goo.gl/wwxbWZedtMxFAk167?g_st=iw
```

No construir nuevamente la ubicación desde texto, porque anteriormente Google enviaba incorrectamente a Maxi Palí.

No requiere API key.

Se decidió no incrustar mapa por ahora.

Pendiente:
- fotografía real del frente del negocio.

Idea:
```text
dirección + foto del local + botón Cómo llegar
```

---

# 36. Firebase

Proyecto:
```text
CruditosDelMar
```

Project ID:
```text
cruditosdelmar-47ee3
```

Firestore:
- configurado.

Firebase Authentication:
- Email/Password configurado.

Existe un administrador creado anteriormente.

No exponer contraseñas.

Firebase Storage:
- no se utiliza porque requería Blaze/facturación.

No activar servicios pagos sin autorización.

---

# 37. Base de datos conceptual

Colecciones:
- categorias
- productos
- opcionesProducto
- pedidos
- detallePedido
- administradores

No existe colección:
```text
clientes
```

porque no hay cuentas de clientes.

La implementación real debe revisarse antes de conectar completamente estas colecciones.

---

# 38. Administrador

Pendiente en gran parte.

Alcance aprobado:
- login;
- visualizar productos;
- crear productos;
- editar productos;
- eliminar productos.

También se consideró cambio de contraseña del administrador.

No agregar automáticamente módulos de:
- clientes;
- pedidos;
- comprobantes;
- estadísticas;
- inventario;

salvo nueva decisión.

---

# 39. Imágenes

Pendientes fotografías reales.

## Home
Foto gastronómica atractiva.

## Ubicación
Foto real del frente del local.

## Catálogo
Fotografías reales de productos posteriormente.

No detener desarrollo funcional por falta de fotos.

---

# 40. Fuera del alcance actual

No implementar sin nueva autorización:
- cuentas de clientes;
- aplicación móvil nativa;
- pago con tarjeta en línea;
- pasarela de pagos;
- facturación electrónica;
- seguimiento de repartidor;
- inventario completo;
- contratación automática de mensajero;
- IA paga;
- módulos administrativos innecesarios.

---

# 41. Estado general actual

Funciona:
- navegación;
- Home;
- Menú;
- Promociones visuales;
- Catálogo;
- filtros;
- detalle de producto;
- presentaciones;
- opciones;
- variantes;
- cantidad;
- subtotal;
- observaciones;
- infraestructura de extras;
- carrito;
- persistencia de carrito;
- edición de productos en carrito;
- proceso inicial del pedido;
- Retiro;
- Express;
- formas de pago;
- validaciones;
- revisión del pedido;
- persistencia temporal de datos del pedido;
- ubicación con Google Maps;
- Quiénes somos.

El proyecto **NO está empezando**.

---

# 42. Próximas prioridades

1. Hacer funcional Promociones → Carrito.
2. Confirmar número SINPE y receptor.
3. Confirmar WhatsApp del negocio.
4. Completar Express + comprobante.
5. Preparar mensaje final de WhatsApp.
6. Limpiar carrito/borrador cuando corresponda.
7. Implementar Administrador.
8. CRUD real de productos.
9. Integración con Firestore.
10. Cargar fotografías.
11. Pruebas completas.
12. Deployment.
13. Documentación final.

---

# 43. Datos pendientes del negocio

Esperar confirmación real de:
- número SINPE;
- nombre receptor SINPE;
- WhatsApp;
- extras por producto;
- precio de cada extra;
- tamaño del agua;
- datos del Té frío;
- sabores/presentaciones Hi-C;
- sabor Fanta roja;
- fotografías;
- cambios futuros de promociones.

No inventar datos.

---

# 44. Cronograma / evidencia académica

La práctica se organiza en 15 semanas.

Cada semana:
```text
27 horas
```

## Semana 1
Trabajo:
- revisión del anteproyecto;
- alcance;
- diagnóstico;
- ajustes de diagramas;
- organización de requerimientos;
- creación inicial React + Vite;
- Git;
- documentación;
- identidad visual.

Archivo generado anteriormente:
```text
Semana 1 - 27 horas.docx
```

## Semana 2
Trabajo:
- Firebase;
- Firestore;
- Authentication;
- servicios;
- reglas restrictivas;
- administrador inicial;
- documentación.

Archivo:
```text
Semana 2 - 27 horas.docx
```

## Semana 3
Trabajo:
- diseño visual inicial;
- navegación;
- Home;
- Menú;
- Catálogo;
- categorías;
- tarjetas;
- detalle visual;
- Quiénes somos;
- Ubicación;
- footer.

Archivo:
```text
Semana 3 - 27 horas.docx
```

## Semana 4 y posteriores
Avances significativos:
- rutas independientes;
- Home simplificado;
- responsive;
- categorías reales;
- Catálogo;
- productos reales;
- presentaciones;
- promociones;
- Menú;
- About;
- Ubicación;
- detalle funcional;
- carrito;
- edición de carrito;
- pedido;
- validaciones;
- sessionStorage;
- Google Maps.

Al documentar:
- no exceder 27 horas;
- agrupar actividades realistas;
- no inventar;
- distinguir trabajo adelantado de semanas futuras cuando corresponda.

---

# 45. Reglas importantes

- No inventar información.
- Si falta un dato real, dejarlo PENDIENTE.
- No implementar funciones fuera del alcance.
- Priorizar funcionalidad.
- Mantener build y lint correctos.
- No usar APIs pagas innecesariamente.
- No modificar varias áreas no relacionadas en una misma tarea.
- No duplicar datos.
- Reutilizar utilidades existentes.
- Mantener responsive.
- No romper funcionalidades existentes.
- No hacer commits sin autorización.
- Mantener código explicable para la estudiante.

---

# 46. Primer mensaje recomendado para una nueva sesión

```text
Antes de hacer cambios:

1. Lee este archivo completo.
2. Revisa brevemente la estructura actual del repositorio.
3. Revisa git status.
4. Localiza los archivos principales mencionados.
5. Compara el código con este contexto.
6. No modifiques nada todavía.

Respóndeme solamente con:

- partes principales encontradas;
- si el código coincide en términos generales con este resumen;
- siguiente funcionalidad pendiente;
- cualquier discrepancia importante.

No uses Computer Use.
No hagas commit.
```

---

# 47. Nota final

Este documento representa el contexto maestro de la Práctica Profesional de **Cruditos del Mar**.

No mezclar con:
- IBM;
- Meteora;
- Essential Corredora de Seguros;
- sistema Emisiones/Cotizaciones;
- CV/postulaciones;
- CarPlay;
- otros proyectos.

Debe utilizarse exclusivamente para continuar el desarrollo y documentación de:

**Cruditos del Mar — Práctica Profesional.**
