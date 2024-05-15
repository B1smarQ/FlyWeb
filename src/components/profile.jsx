import { useEffect, useState } from "react";
import Header from "./Header/header";
import userPhoto from'./../assets/userPhoto.jpg'
import './profile.css'
import UserTest from "./user_test/userTest";
import { Link } from "react-router-dom";
export default function UserProfilePage(){
    const [student,setStudent] = useState([]);
    const [tests,setTests] = useState([]);
    let token = localStorage.getItem('token');
    
    const GET_USER_INFO = 'http://localhost:8081/api/v1/student/id'
    async function parseUser(){
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
    async function parseTests(){
        const response = await fetch('http://localhost:8081/api/v1/fly');
        if(response.ok){
            let data = response.json();
            data.then((e) => {setTests(e)});
        }
    }
    useEffect(()=>{
        if(token)
        {parseUser();
        parseTests();}
    },[])
    return(
        <div>
            <Header></Header>
            <div id = 'user_info'>
                <div>
                    <img src = {userPhoto} id = 'user_photo'></img>
                    
                </div>
                <div>
                <h2>{student.name}</h2>
                    <p>Кафедра прикладной информатики</p>
                </div>
                <div id = 'buttons'>
                    <Link to = '/teams'> рейтинг по группам </Link>
                    <Link to = '/rating'> рейтинг по студентам </Link>
                </div>
            </div>
            <div id = 'user_tests'>
                {tests.map((test) => {return (<UserTest test = {test}></UserTest>)})}
            </div>

        </div>
    )
}