# FrontendWebMobileFirst

Consigna
Para la tercera entrega, se debe continuar el trabajo de la segunda etapa.  El objetivo es agregar nueva funcionalidad detallada a continuación. 

Tabla dinámica por API REST
La tabla dinámica que existe en sus páginas tiene que consultar la información disponible mediante un servicio web (API Rest). 

Agreguen en su página el código necesario para crear la tabla y llenarla con la información que obtienen del servicio. Cada “fila de la tabla” estará entonces asociado a un “item” o “elemento” del servicio web consultado. A su vez, dicha tabla debe mantenerse actualizada cuando el usuario agregue/edite/borre información.

El servicio REST deben generarlo utilizando https://mockapi.io/,  o alguno similar, creando la API con la colección de datos que corresponden a cada trabajo. En la unidad de 3 de moodle, está disponible el video donde se explica como crear un servicio en mockapi.

Requerimientos Funcionales

La tabla se debe cargar automáticamente al mostrarse en la página: Al entrar por el nav a la página que tiene la tabla, automáticamente debe mostrarse la tabla cargada sin que el usuario tenga que hacer ningún click adicional, con los mismos datos que inicialmente existen en el servicio rest.
El formulario que agrega información a la tabla debe mantener sincronizado el servicio. Estos datos se deben agregar usando la API Rest.

(OPCIONAL +1) Debe haber un botón que permita crear varios ítems automáticamente (al menos 3 items), esos datos deberán agregarse en el servicio y verse en la tabla.
Permitir eliminar filas de la tabla de a una. Cada fila tiene que tener una forma de indicarle “Borrar” que elimine la fila y el elemento correspondiente del servicio.	
Permitir editar filas de la tabla individualmente de alguna forma. Cada fila tiene que tener una forma de indicarle “Editar” que permita editar los valores de esa fila y los actualice en el servicio.

Agregar filtros de búsqueda en la tabla desde JS (local). Al filtrar los datos, se mostrarán solo los datos que cumplan ese criterio, los demás datos no se ven, pero no se borran realmente, se pueden ver al modificar el filtro de búsqueda. Sugerimos dos formas de hacer el filtro (otras opciones debatir con los docentes):
filtros por combo (tag select) para las columnas con opciones fijas
filtrar con un input por al menos una columna.

Limitar tamaño de imágenes y peso del sitio. La carpeta completa del sitio no puede superar los 5 Mb.


OPCIONALES
SPA / Partial Render (+2) Usar AJAX para la navegación de la página (técnica de partial render). La página no debe  refrescarse completamente, cuando hago click en un link de la navigation bar se refresca sólo la porción de la información que cambia.



