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
