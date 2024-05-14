import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Header from "./components/Header/header";
import './teamStats.css'
import CheaterImg from './assets/cheater.png'
export default function TeamStats(props){
    let {id} = useParams();
    const [stats, setStats] = useState([]);
    const TEAM_STATS_URL = 'http://localhost:8082/api/v1/analytics/rating/team/'
    let token = localStorage.getItem('token');
    const [team,setTeam] = useState([]);
    console.log(team);
    
    
    async function parseStats(){
        const response = await fetch(TEAM_STATS_URL+id ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            let data = response.json();
            data.then((e) => {console.log(data);setStats(e)});
        }
        else{
            console.log(response);
        }
        console.log(response);
    }

    useEffect(()=>{
        parseStats();
    },[])
    
    return (
        <>
            <Header></Header>
            
            <div>
                {stats?.map((student) =>{
                    return(
                        <div className="studentStat">
                            {student.lostFocus?<img src = {CheaterImg} className = 'rating_position'></img>:<p className="rating_position">{stats.indexOf(student)+1}</p>}
                            <p className = 'student_name' class = 'student_name'>{student.studentId}</p>
                            <p className="student_time" class = 'student_time'>{student.time}</p>
                            <p className="student_score" class = 'student_score'>{student.score}</p>
                            
                        </div>
                    )
                })}
            </div>
        </>
    )
}