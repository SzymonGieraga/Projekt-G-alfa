document.getElementById('new-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);

    if (newPassword !== confirmPassword) {
        errorMessage.innerText = 'Podane hasła nie są identyczne';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    try {
        const response = await fetch('/api/new-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPassword, token: token })
        });

        if (response.ok) {
            alert('Hasło zostało pomyślnie zaktualizowane.');
            window.location.href = '/api/login';
        } else {
            const errorData = await response.json();
            errorMessage.innerText = errorData.message || 'Wystąpił błąd podczas aktualizacji hasła.';
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Wystąpił błąd podczas aktualizacji hasła.');
    }
});
