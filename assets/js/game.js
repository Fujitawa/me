  document.addEventListener('DOMContentLoaded', function() {
      // Создаем игровое поле
      const boardSize = 10;
      const bombCount = 3;
      let gameBoard = [];
      let isGameOver = false;
      let cellsOpened = 0;

      // Генерируем игровое поле
      function generateBoard() {
        for (let i = 0; i < boardSize; i++) {
          gameBoard[i] = [];
          for (let j = 0; j < boardSize; j++) {
            gameBoard[i][j] = {
              isBomb: false,
              isOpen: false,
            };
          }
        }

        // Расставляем бомбы случайным образом
        let bombsPlaced = 0;
        while (bombsPlaced < bombCount) {
          const row = Math.floor(Math.random() * boardSize);
          const col = Math.floor(Math.random() * boardSize);
          if (!gameBoard[row][col].isBomb) {
            gameBoard[row][col].isBomb = true;
            bombsPlaced++;
          }
        }
      }

      // Функция для подсчета количества бомб вокруг клетки
      function countBombs(row, col) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < boardSize && j >= 0 && j < boardSize && gameBoard[i][j].isBomb) {
              count++;
            }
          }
        }
        return count;
      }

      // Функция для открытия клетки
      function openCell(row, col) {
        if (isGameOver || row < 0 || row >= boardSize || col < 0 || col >= boardSize || gameBoard[row][col].isOpen) {
          return;
        }

        gameBoard[row][col].isOpen = true;
        cellsOpened++;

        if (gameBoard[row][col].isBomb) {
          isGameOver = true;
          console.log("Game Over!");

          // Воспроизводим звук взрыва
          const explosionAudio = document.getElementById('explosion-audio');
          explosionAudio.play();

          // Добавляем эффект взрыва
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
          cell.classList.add('explosion');

          // Отображаем сообщение "Game Over"
          const gameOverMessage = document.querySelector('.game-over-message');
          gameOverMessage.style.display = 'block';

          // Отображаем overlay
          const overlay = document.querySelector('.overlay');
          overlay.classList.add('show');

          // Отображаем кнопку "Начать заново"
          const resetButton = document.querySelector('.reset-button');
          resetButton.style.display = 'block';
        } else {
          const bombCount = countBombs(row, col);
          if (bombCount > 0) {
            console.log("Bombs nearby:", bombCount);
          } else {
            openAdjacentCells(row, col);
          }

          if (cellsOpened === boardSize * boardSize - bombCount) {
            isGameOver = true;
            console.log("You Win!");

            // Воспроизводим звук выигрыша
            const winAudio = document.getElementById('win-audio');
            winAudio.play();

            // Отображаем сообщение "You Win"
            const youWinMessage = document.querySelector('.you-win-message');
            youWinMessage.style.display = 'block';

            // Отображаем overlay
            const overlay = document.querySelector('.overlay');
            overlay.classList.add('show');

            // Отображаем кнопку "Начать заново"
            const resetButton = document.querySelector('.reset-button');
            resetButton.style.display = 'block';
          }
        }
      }

      // Функция для автоматического открытия соседних клеток без бомб
      function openAdjacentCells(row, col) {
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            openCell(i, j);
          }
        }
      }

      // Функция для отображения игрового поля в HTML
      function renderBoard() {
        const boardContainer = document.querySelector('.board');
        boardContainer.innerHTML = '';

        for (let i = 0; i < boardSize; i++) {
          for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-col', j);

            if (gameBoard[i][j].isOpen) {
              cell.classList.add('open');
              if (gameBoard[i][j].isBomb) {
                cell.classList.add('bomb');
                cell.textContent = '💣';
              } else {
                const bombCount = countBombs(i, j);
                if (bombCount > 0) {
                  cell.textContent = bombCount;
                }
              }
            }

            cell.addEventListener('click', function() {
              openCell(i, j);
              renderBoard();
            });

            boardContainer.appendChild(cell);
          }
        }
      }

      // Функция для перезапуска игры
      function resetGame() {
        isGameOver = false;
        cellsOpened = 0;
        generateBoard();
        renderBoard();

        // Скрываем сообщение "Game Over"
        const gameOverMessage = document.querySelector('.game-over-message');
        gameOverMessage.style.display = 'none';

        // Скрываем сообщение "You Win"
        const youWinMessage = document.querySelector('.you-win-message');
        youWinMessage.style.display = 'none';

        // Скрываем overlay
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('show');

        // Скрываем кнопку "Начать заново"
        const resetButton = document.querySelector('.reset-button');
        resetButton.style.display = 'none';
      }

      // Генерируем игровое поле и запускаем игру
      generateBoard();
      renderBoard();

      // Назначаем обработчик события для кнопки "Начать заново"
      const resetButton = document.querySelector('.reset-button');
      resetButton.addEventListener('click', resetGame);
    });
