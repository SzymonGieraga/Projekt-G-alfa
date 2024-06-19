document.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('other-button');
    const clickSound = document.getElementById('click-sound');

    button.addEventListener('click', () => {
        clickSound.play();
    });
});
