import { useEffect, useState } from "react";
import Header from "./Header/header";
import './teamresults.css'
import { Link } from "react-router-dom";
export default function TeamResults(){
    let token = localStorage.getItem('token');
    const [teams,setTeam] = useState([]);
    async function parseGroups(){
        const response = await fetch('http://localhost:8081/api/v1/team', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){    
            let data = response.json();
            data.then((e) => {setTeam(e)});
        }
        else{
            console.log(response);
        }
    }
    useEffect(()=>{
        parseGroups();
    },[])
    return(
        <>
        <Header></Header>
        <div className="teams_container">
            
            {teams?.map((team)=>{
                return(
                    <div >
                        <Link to = {`/teams/results/${teams.indexOf(team)+1}`}><h1 className="team_name">{team.name}</h1></Link>
                    </div>
                )
            })}
        </div>
        </>
    )
}