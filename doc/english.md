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
