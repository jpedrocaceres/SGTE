document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3300/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        document.getElementById('errorMessage').textContent = data.message;
        console.log("Conexão realizada!");
    } catch (error) {
        document.getElementById('errorMessage').textContent = "Erro de conexão com o servidor.";
    }
});
