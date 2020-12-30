const registerForm = document.getElementById('reg-form')
registerForm.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const birthday = document.getElementById('birthday').value

    const result = await fetch('/api/register', {
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

    if(result.status === "ok") {
        //ok 
        alert("Success")
    } else {
        alert(result.error)
    }
}

const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', loginUser)

function loginUser(event) {
    event.preventDefault()
    const username = document.getElementById('loginusername').value
    const password = document.getElementById('loginpassword').value


    const result = fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        })
    }).then((res) => res.json())

}