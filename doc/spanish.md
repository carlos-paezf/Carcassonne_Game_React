# Juego: Carcassonne

## Introducción

Decidí desarrollar el juego Carcassonne con la librería de REACT en el template de TypeScript, con el fin de simplificar la creación e interacción de los componentes gráficos. Al principio había tratado de desarrollar la idea con Vanilla TS, implementando Programación Orientada a Objetos (POO), pero decidí hacer la transición a REACT con componentes funcionales, aunque mantuve algunas clases para generar instancias y representarlas en la interfaz.

Procuré desarrollar todo desde lo básico, pero también me apoyé en los conceptos de estado, API context, reducer y hooks de REACT, con el fin de conectar de manera global la lógica de la aplicación, y estar al tanto de los cambios que se realicen dentro del juego.

## Satisfacción de los requerimientos

Con respecto a los requerimientos obligatorios acerca de la aplicación, cumplí con el listado de los mismos. A continuación listare los resultados de cada uno:

1. El número total de piezas que el usuario puede jugar es `N^2`, donde `N` es el largo de uno de los lados del tablero.

   El número de piezas en el juego es determinado por la multiplicación del valor ingresado por el usuario como tamaño del tablero, por si mismo. Las fichas son usadas en 3 secciones del juego: El mazo de fichas, la mano del jugador, y el tablero de juego. La división inicial de las fichas es la siguiente: 1 ficha en el centro del tablero, 4 son entregadas a cada jugado en su mano inicial, y las fichas restantes serán puestas en el mazo.

2. El tablero debe ser un cuadrado de `11 x 11`.

   Cuando el usuario carga la página del juego, el campo de ingreso del tamaño del tablero tendrá un valor por defecto de `11`. Sin embargo, el usuario puede ajustar el valor con cualquier número par entre `3` y `n` como lo desee.

3. El jugador puede poner 1 ficha en el tablero por turno.

   El usuario puede colocar una ficha en el tablero de juego siempre y cuando tenga fichas en su mano o mazo. Sin embargo la colocación deber ser válida, considerando el tipo de mosaico y sus vecinos adyacentes.

4. Al comienzo del juego, el jugador obtiene 4 fichas random para elegir y se le repartirá una nueva ficha cada turno, reemplazando la ficha jugada anteriormente.

   Una vez el usuario define el tamaño del tablero e inicia el juego, recibe 4 fichas random, las cuales son restadas del total disponible de fichas. La mano del usuario se actualizará con nuevas fichas bajo las siguientes circunstancias: reiniciando el juego, actualizando el tamaño del tablero, descartando la mano, o jugando un ficha.

5. El jugador nunca sabrá qué ficha será la siguiente.

   Las fichas tienen un porcentaje de aparición basado en su tipo, tal como se explica en el punto 14 de este listado. Mediante la generación aleatoria de fichas, el usuario no puede predecir cual ficha que se aparecerá en su mano.

6. El jugador debería poder descartar su mano cada 5 turnos

   Cuando el juego empieza, el jugador debe esperar por 5 turnos antes de que pueda descartar su mano. Esta opción permanece disponible mientras el jugador no la use y el mazo tenga un mínimo de 4 fichas. Una vez el usuario haya usado esta opción, debe esperar por otros 5 turnos antes de que lo pueda usar otra vez. Adicionalmente, esta opción desaparece cuando el usuario tiene menos de 4 fichas en su mano. Cada acción de descarte remueve 4 fichas de la mano del usuario.

7. El juego es jugado hasta que el jugador no pueda ubicar una ficha, esto a causa de que no haya espacios vacíos o no hayan ubicaciones validas para las fichas en la mano.

   El jugador puede seguir jugando mientras hayan espacios libres y validos en el tablero para las fichas que tenga en la mano. Si el usuario no tiene algún lugar valido en el tablero pero cuente con la habilidad de descartar su mano, podrá seguir jugando una vez que use esta opción y tenga fichas que puedan ser ubicadas correctamente en el tablero. Si el usuario no tiene esta opción habilitada, se mostrará un mensaje de fin de juego y las estadísticas generales de la partida.

8. Si el jugador no puede jugar una ficha de su mano, el juego terminará a menos que el descarte este disponible, en cuyo caso, el jugador puede realizar un descarte.

   Como se mencionaba en el punto anterior, mientras el jugador cuente con la opción de hacer el descarte de su mano, el juego podrá continuar si alguna de las nuevas fichas tienen posiciones viables en el tablero.

9. El juego usas el algoritmo `von Neumann Neighborhoods` para adyacencia: Una pieza se dice ser adyacente a otra ficha si estas tienen una distancia Manhattan de 1 unidad entre ellas.

   El juego evalúa las piezas adyacentes de cada ficha cuando se coloca en el tablero. Las coordenadas (fila, columna) de la ficha se utilizan para determinar sus piezas vecinos. El algoritmo comprueba si hay una ficha en cada posición adyacente y si es compatible con el tipo de ficha nueva. Al contar los incrementos de puntos, el algoritmo calcula la distancia de Manhattan para obtener vecinos diagonales, pero se excluyen las posiciones que están a más de dos filas o dos columnas de distancia.

10. Una cadena de fichas es un conjunto de piezas donde cada ficha es adyacente, al menos, a otra ficha en la cadena.

    Al examinar los vecinos adyacentes de una ficha, el juego determina si una ciudad se encadena, lo que permite a los jugadores ganar puntos extra por sus construcciones. Este mecanismo alienta a los jugadores a colocar estratégicamente sus fichas y conectarlos con las funciones existentes en el tablero.

11. Las fichas de carretera obtienen 1 punto por pieza y solo se pueden colocar en posiciones adyacentes a las fichas de carretera, por lo que la cadena sigue creciendo. El juego comienza con una sola ficha de camino en el centro.

    Las fichas de camino deben colocarse adyacentes a otras fichas de camino en el tablero. Esta regla también sirve para determinar si no quedan posiciones válidas para que un jugador coloque una ficha y así desencadenar el final del juego.

12. Las piezas de abadía obtienen 1 punto por mosaico que rodea la ficha de abadía, por lo que la puntuación máxima que un jugador puede obtener es 8 si una pieza de abadía está completamente rodeado por otras fichas. Las abadías deben colocarse adyacentes a cualquier otra ficha.

    El algoritmo von Neumann Neighborhoods se usa con un radio de 2, pero las celdas que están a más de 1 fila o 1 columna de distancia se descartan. Cuando se juega una ficha de abadía, se otorgan puntos a sus vecinos adyacentes y la puntuación se actualiza cada vez que se coloca otra ficha junto a ella.

13. Las fichas de ciudad otorgan 2 puntos por ficha y solo se pueden colocar junto a ciudades, caminos y/o fichas de abadía. Las cadenas de ciudades otorgan un punto extra por cada ciudad de la cadena.

    Cuando se juega una ficha de ciudad, el algoritmo verifica si está adyacente a cualquier otra ficha utilizando el algoritmo de Vecindarios de von Neumann con un radio de 1. Si un vecino también es una ficha de ciudad, el algoritmo verifica si está rodeado por otras ciudades o si pertenece a una cadena. Si no está rodeado, se inicia una cadena, agregando 1 punto por cada mosaico en la cadena, incluido el nuevo. Si pertenece a una cadena, entonces se suma la puntuación de la ficha más 1 punto extra por agregarse a la cadena.

14. El reparto de fichas no debe ser completamente aleatorio. Debería haber más caminos que ciudades, y las abadías deberían ser escasas. No pueden ocurrir quince (15) turnos sin una abadía y al menos tres (3) ciudades. Cómo se hace esto depende del implementador.

    El juego implementa un sistema de probabilidad para la aparición de fichas, que se representa como fracciones. Para carreteras, la probabilidad es 9/15, para ciudades es 3/15 y para abadías es 1/5. Para generar una nueva ficha, se genera un número aleatorio entre 0 y 1, y se suman las probabilidades de cada ficha. Luego, el algoritmo verifica si el número aleatorio se encuentra dentro de un rango específico para cada ficha. Si el número aleatorio es menor que la probabilidad de una pieza de carretera, se devuelve una pieza de carretera. Si el número aleatorio es menor que la suma de las probabilidades de las losetas de carretera y ciudad, se devuelve una loseta de ciudad. De lo contrario, se devuelve una ficha de abadía.

## Bonus

- Permitir tableros de diferentes tamaños impares
