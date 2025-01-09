# MemoryGame

This is a memory game built using React, where players flip pairs of cards to find matches. The game keeps track of the number of clicks and time spent, offering a fun and engaging way to exercise memory. The game features dynamic card shuffling, timer functionality, and popup notifications upon completion.

![image](https://github.com/user-attachments/assets/d0892e3e-4dfa-4cfb-8c92-e778329fbaf5)


## Features
- **React Functional Components**: Built using React with hooks like `useState` to manage state and effects.
- **Card Component**: The individual cards are rendered using a custom `Card` component, which handles user interactions.
- **Timer**: The game tracks the elapsed time and displays it to the user.
- **Popup Notifications**: When the game is completed, a popup shows the final results, including the number of clicks and the total time spent.

## Technologies Used
- **React**: Core library used for building the user interface.
- **CSS**: Custom styles defined to provide visual appeal.
- **`reactjs-popup`**: A lightweight library used for creating popup modals in React.

## How It Works
1. **Card Preparation**: Cards are duplicated and shuffled to create pairs for gameplay.
2. **Gameplay**: Players flip cards by clicking on them. The game tracks clicks and checks for matching pairs.
3. **Timer**: The timer starts when the first card is flipped and stops when all pairs are matched.
4. **Popup**: Upon completing the game, a popup displays the total clicks and time taken to finish the game.
