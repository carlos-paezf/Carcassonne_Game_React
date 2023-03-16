# Juego: Carcassonne

## Introducción

Decidí desarrollar el juego Carcassonne con la librería de REACT en el template de TypeScript, con el fin de simplificar la creación e interacción de los componentes gráficos. Al principio había tratado de desarrollar la idea con Vanilla TS, implementando Programación Orientada a Objetos (POO), pero decidí hacer la transición a REACT con componentes funcionales, aunque mantuve algunas clases para generar instancias y representarlas en la interfaz.

Procuré desarrollar todo desde lo básico, pero también me apoyé en los conceptos de estado, API context, reducer y hooks de REACT, con el fin de conectar de manera global la lógica de la aplicación, y estar al tanto de los cambios que se realicen dentro del juego.

## Satisfacción de los requerimientos

Con respecto a los requerimientos obligatorios acerca de la aplicación, cumplí con el listado de los mismos. A continuación listare los resultados de cada uno:

1. El número total de piezas que el usuario puede jugar es `N^2`, donde `N` es el largo de uno de los lados del tablero.

   El número de piezas en el juego es determinado por la multiplicación del valor ingresado por el usuario como tamaño del tablero, por si mismo. Las fichas son usadas en 3 secciones del juego: El mazo de fichas, la mano del jugador, y el tablero de juego. La división inicial de las fichas es la siguiente: 1 ficha en el centro del tablero, 4 son entregadas a cada jugado en su mano inicial, y las fichas restantes serán puestas en el mazo.
