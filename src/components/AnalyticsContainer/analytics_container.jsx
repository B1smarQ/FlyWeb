import { useState } from "react"
import { Link } from "react-router-dom";
export default function AnalyticsContainer({students}){
    let stud_results =students?students:null;
    console.log(students);
    return(
        <div className="analytics-container">
            {stud_results?.map((student) =>{
                return(
                    <div className="student-result">

                        <div className="student-name">
                            <Link to = {{pathname: `/student/${student.id}`}}>{student.name}</Link></div>
                        <div className="student-score"><p>{student.mail}</p></div>
                    </div>
                )
            })}
        </div>
    )
}