# Project Description

## Draughts (aka Checkers)

![image](https://user-images.githubusercontent.com/91954372/170517614-540c1b85-0807-4a2a-985f-ac4155340004.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Drag and drop functionality implemented using [React DnD](https://github.com/react-dnd/react-dnd/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Approach to implementation

Game logic is currently client-side; all player moves are made using drag + drop, valid moves are highlighted. Page refresh resets the board state.

# Learnings

- Appropriate data structures and types make work easier; using standard chess notation e.g. 'd4', 'b5' is nice for users and the view, but using two numbers for board coordinates is more straightforward in the code.
- When you think the game logic is done, there are at least three things you've missed.
