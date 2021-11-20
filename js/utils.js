class Utils {
    static SwitchGraphicsToGameOver(gameOverText) {
        Canvas.classList.add('unactive');
        GameOverPanel.classList.remove('d-none');
        GameOverMessage.innerText = gameOverText;
    }

    static getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}