import { useEffect, useState } from "react";
import AnalyticsContainer from "./components/AnalyticsContainer/analytics_container";
import { user_results } from "./testDB/student_results";
import { Link } from "react-router-dom";
export default function AnalyticsPage(){
    let [students,setStudents] = useState([]);
    let [isLoading, setLoading] = useState(true);
    async function fetchStudents(){
        const response = await fetch('http://localhost:8081/api/v1/student');
        if (response.ok){
            let data = response.json();
            data.then((e) => setStudents(e));
            console.log(students);
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchStudents();
    },[])

   
    return(
        <div>
            <h1>Analytics Page</h1>
             {!isLoading &&<AnalyticsContainer students={students}/>}
            <Link to = '/'>Home</Link>
        </div>
    )

}