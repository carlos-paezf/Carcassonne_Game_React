# Game: Carcassonne

## Introduction

I decided to develop the Carcassonne Game with the REACT library in the TypeScript template in order to simplify the creation process and improve interaction with the graphics components. Initially, I attempted to develop the idea using Vanilla TS and implementing Object-Oriented Programming (OOP). However, I eventually decided to the transition to REACT with functional components, while still using some classes to generate instances and render them in the interface.

Throughout the development process, I focused on building the project from the ground up, while also incorporating key REACT concepts such as state, API context, reducer and hooks. These tools allowed me to globally connect application logic and stay up-to-date with changes in the game.

## Satisfaction of the requirements

I have met all of the mandatory requirements of the application. In the following list, I will provide de results for each requirement:

1. The total number of tiles which the player can play is `N^2`, where `N` is the length of a side of the board.

   The number of tiles in the game is determined by multiplying the value entered by the user as the board size by itself. The tiles are used in three (3) different sections of the game: The deck of tiles, the player's hand, and the game board. The initial distribution of the tiles is as follows: one (1) tile in the center of the board, four (4) are given to each player as their starting hand, and the remaining tiles are placed in the deck.

2. The board size must be a `11 x 11` square.

   When the user loads the game page, the board size input field will have a default value of `11`. However, the user can adjust the value to any odd numbers between `3` and `n` as desired.

3. The player can put one (`1`) tile on the board per turn.

   The user may place one (1) tile on the game board as long as they have tiles in their hand or deck. However, the placement must be valid, considering the tile type and its adjacent neighbors.

4. At the start of the game the player gets four (4) random tiles to select from and will be dealt a new tile each turn, replacing the previously played tile.

   Once the user defines the board size an starts the game, they receive four (4) random tiles, which are then subtracted from the total available tiles. The user's hand will be updated with new tiles under the following circumstances: restarting the game, updating the board size, discarding the hand, or playing a tile.

5. The player will never know what tile will be the next.

   The tiles have a generation percentage based on their type, which is explained in point 14 of this list. Due to the random generation of tiles, the user cannot predict which tile will appear in their hand.

6. The player should be able to discard their hand every five (5) turns.

   When the game begins, the player must wait for five (5) turns before they can to discard their hand. This option will remain available as long as the user does not use it and the deck has a minimum of four (4) tiles. Once the user has used this option, they must wait for another five (5) turns before they can use it again. Additionally, this option disappears when the user has less than four tiles in their hand. Each discard action removes four tiles from the user's hand.

7. The game is played until the player can no longer play a tile, either because there are no empty places or there are no valid placements for the tiles at hand.

   The player can continue playing as long as there are empty and valid spaces on the board for the tiles they have in hand. If the user does not has any valid places on the board but has the ability to discard their hand, they can continue playing once they have used the option and have tiles that can be correctly placed on the board. If the user does not have this option enabled, a message with the phrase "End Game" and the general statistics about the game will be displayed.

8. If the player cannot play a tile in their hand, the game, will be end unless the this discard is available, in which case, the player can do a discard

   As mentioned in the previous point, if the player has the option to discard their hand, the game can continue if any of the new tiles have viable spaces on the board.

9. This game uses `von Neumann Neighborhoods` for adjacency: A tile is said to be adjacent to another tile if they have a Manhattan distance of 1 unit form each other.

   The game evaluates each tile's adjacent pieces when it is placed on the board. The (row, column) coordinates of the tile are used to determine its neighboring tiles. The algorithm checks whether there is a tile in each adjacent position and whether it is compatible with the new tile's type. When counting point increments, the algorithm calculates the Manhattan distance to obtain diagonal neighbors, but positions that are more than two (2) rows or two (2) columns away are excluded.

10. A chain of tiles is a set of tiles where every tile is adjacent to at least one tile on the chain.

    By examining the adjacent neighbors of a tile, the game determines whether a city chain, allowing players to earn extra points for their constructions. This mechanism encourages players to strategically place their tiles and connect them with existing features on the board.

11. Road tiles score 1 point per tile and can only be placed in positions adjacent to road tiles, so the chain keeps getting larger. The game starts with a single road tile in the center.

    Road tiles must be placed adjacent to other road tiles on the board. This rule also serves to determine if there are no valid positions left for a player to place a tile and thus trigger the end of the game.
