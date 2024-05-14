import Header from '../Header/header';
import './loginForm.css'
import axios from 'axios'
export default function LoginForm(){
     function submitLogin(){
        const url = 'http://localhost:8081/api/v1/student/login';
            const data = {
            login: document.getElementById('login').value,
            password: document.getElementById('password').value
            };

            fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.text(); 
            })
            .then(data => {
                localStorage.setItem('token',data);
                window.location.assign('/');
            })
            .catch(error => {
                alert('Неверные данные');
            });
            
    }
    return(
        <>
        <Header></Header>
        <div className = "login-form">
            <div className = 'container'>
                <h1>Войдите в аккаунт</h1>
                <input type = 'text' name = 'login' placeholder="username" formEncType='text/plain' id = 'login'></input>
                <input type = 'password' name = 'password' placeholder="********" formEncType='text/plain' id = 'password'></input>
                    
                
                <button onClick = {submitLogin}>Вход</button>
            </div>
                
            
        </div>
        </>
    )
}