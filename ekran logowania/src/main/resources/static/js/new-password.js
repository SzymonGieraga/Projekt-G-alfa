const { createClient } = supabase;

const supabaseUrl = 'https://lgfyfbsajqevelhnyiak.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('new-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);

    if (newPassword !== confirmPassword) {
        errorMessage.textContent = 'Podane hasła nie są identyczne';
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
        access_token: token
    });

    if (error) {
        console.error('Error updating password:', error.message);
        alert('Wystąpił błąd podczas aktualizacji hasła.');
    } else {
        alert('Hasło zostało pomyślnie zaktualizowane.');
        window.location.href = '/api/login';
    }
});
