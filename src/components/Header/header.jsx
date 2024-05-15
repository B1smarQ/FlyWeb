import './header.css'
import { Link } from 'react-router-dom'
import user from '../../images/user.svg'
import logo from '../../assets/logo.svg'
import { useEffect, useState } from 'react';
export default function Header(){
    let token = localStorage.getItem('token');
    const GET_USER_INFO = 'http://localhost:8081/api/v1/student/id';
    const [student,setStudent] = useState([])
    async function parseStudent(){
        const response = await fetch(GET_USER_INFO,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        let data = response.json();
        data.then((e) => {
            setStudent(e);
        })
    }


        useEffect(() =>{
            if(token)
            parseStudent();
        },[])

    return(
        <header>
            <Link to = '/'><img src = {logo}></img></Link>
            
            <div>
            <img src = {user}></img>
            {token? <Link to = '/profile'><p>Личный кабинет</p></Link> :<Link to = {'/login'}><p>Войти</p></Link>}
            {token && <button onClick = {()=>{localStorage.clear(); location.reload()}}> Выйти</button>}
            
            </div>
        </header>
    )
}