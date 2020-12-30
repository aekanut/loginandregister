const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser)

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const birthday = document.getElementById("birthday").value;

    const result = fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            firstname,
            lastname,
            birthday
        })
    }).then((res) => res.json())

    console.log(result);
}