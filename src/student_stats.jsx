import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function studentPage({student_name = 'John Doe'}){
    let student_id = useParams();
    let [student_stat,setStat] = useState([]);
    let STUDENT_STAT_URL = `http://localhost:8082/api/v1/analytics/student/${student_id.id}`;
    let [loading,setLoading] = useState(true);
    async function fetchStudent(){
        const response = await fetch(STUDENT_STAT_URL);
        if(response.ok){
            let data = response.json();
            data.then((e) => setStat(e));
            console.log(student_stat);
            setLoading(false);
        }
        
    }

    useEffect(()=>{fetchStudent()},[]);
    console.log(student_stat, loading);
    return(
        <div>
            {!loading && <div>
                <h1>{student_name}</h1>
                <h2>Средний балл: {student_stat.avgScore}</h2>
                <h2>Среднее время: {student_stat.avgTime}</h2>
                </div>}
        </div>
    )
}