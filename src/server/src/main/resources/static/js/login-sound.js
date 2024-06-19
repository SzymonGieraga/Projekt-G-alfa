document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('login-button');
    const clickSound = document.getElementById('click-sound');

    button.addEventListener('click', () => {
        clickSound.play();
    });
});
