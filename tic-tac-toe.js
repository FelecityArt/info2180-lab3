document.addEventListener('DOMContentLoaded', () => {
	let currentPlayer = 'X';
	const boardState = Array(9).fill(null);
	const statusDiv = document.getElementById('status');

	// Initialize the board
	const squares = document.querySelectorAll('#board div');
	squares.forEach((square, index) => {
		square.classList.add('square');

		square.addEventListener('click', () => {
		if (!boardState[index] && !checkWinner()) {
			boardState[index] = currentPlayer;
			square.textContent = currentPlayer;
			square.classList.add(currentPlayer);

			if (checkWinner()) {
				statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
				statusDiv.classList.add('you-won');
			} else {
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			}
		}
		});

		// Hover effect
		square.addEventListener('mouseover', () => square.classList.add('hover'));
		square.addEventListener('mouseout', () => square.classList.remove('hover'));
	});

	// Check for a winner
	function checkWinner() {
		const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
		[0, 4, 8], [2, 4, 6]             // Diagonals
		];

		return winningCombinations.some(combination => {
		const [a, b, c] = combination;
		return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
		});
	}

	// Reset the game when the 'New Game' button is clicked
	document.querySelector('.btn').addEventListener('click', () => {
		boardState.fill(null);
		squares.forEach(square => {
		square.textContent = '';
		square.classList.remove('X', 'O');
		});
		statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
		statusDiv.classList.remove('you-won');
		currentPlayer = 'X';
	});
});
