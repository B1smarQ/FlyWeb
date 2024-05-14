import { useEffect, useState } from "react";
import './components/student_ratings.css'
import Header from "./components/Header/header";
import userPhoto from'./assets/userPhoto.jpg'
import './components/profile.css'
import { Link } from "react-router-dom";
export default function StudentRatingPage(){
    let [rating,setRating] = useState([])
    let token = localStorage.getItem('token');
    const [student,setStudent] = useState([]);
    const [tests,setTests] = useState([]);
    
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
    async function parseRating(){
        const response = await fetch(' http://localhost:8082/api/v1/analytics/rating',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){    
          let data = response.json();
          data.then((e) => setRating(e));
          console.log(rating);
        }
        
    }
    useEffect(()=>{
        parseRating();
    },[])
    return(
        <>
        <Header></Header>
        <div id = 'user_info'>
                <div>
                    <img src = {userPhoto} id = 'user_photo'></img>
                    
                </div>
                <div>
                <h2>{student.name}</h2>
                    <p>Какафедра</p>
                </div>
                <div id = 'buttons'>
                    <Link to = '/teams'> рейтинг по группам </Link>
                    <Link to = '/rating'> рейтинг по студентам </Link>
                </div>
            </div>
        <div id ='rating_container'>
            {rating?.map((student)=> {return(
                <div key = {student.id} className = 'student_stats'>
                    <p className = "student_position">{rating.indexOf(student)+1}</p>
                    <h2 className="student_name">{student.studentId}</h2>
                    <p className = 'student_score'>{student.score}</p>
                </div >
            )})}
        </div>
        </>
    )
}