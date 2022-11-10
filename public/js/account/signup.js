const signUpForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#newname').value.trim();
    const pass = document.querySelector('#newpass').value.trim();

    if(name && pass) {

        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ "username": name, "password": pass }),
            headers: {'Content-Type': 'application/json'},

        });
        if(res.ok) {
            document.location.replace('/dashboard')
            alert(`${name}, your account has been created!`)
        } else {
            alert(res.statusText)
        }
    } 
};

document.querySelector('#signup-form').addEventListener('submit', signUpForm);