document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username, password);

    try {
        const response = await fetch('http://localhost:3300/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        document.getElementById('registerMessage').textContent = data.message;
    } catch (error) {
        document.getElementById('registerMessage').textContent = "Erro de conexão com o servidor.";
    }
});
