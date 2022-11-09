//const { json } = require("express");

const signInForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const pass = document.querySelector('#password').value.trim();

    if(name && pass) {

        const res = await fetch('/api/user/signin', {
            method: 'POST',
            body: JSON.stringify({ "username": name, "password": pass }),
            headers: {'Content-Type': 'application/json'},

        });
        if(res.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(res.statusText)
        }
    } 
}

document.querySelector('#signin-form').addEventListener('submit', signInForm);
