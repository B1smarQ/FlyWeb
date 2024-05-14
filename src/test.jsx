import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TestContainer from "./components/testsContainer/testContainer";
import QuestionHolder from "./components/questionHolder/questionHolder";
import { Link } from "react-router-dom";
import Header from "./components/Header/header";
export default function TestPage(props){
    const {id} = useParams();
    const API_PATH = 'http://localhost:8081/api/v1/fly/';
    let [questions, setQuestions] = useState([]);
    const token = localStorage.getItem('token');

    async function parseTests(){
        const response = await fetch(`http://localhost:8081/api/v1/fly/${id}` ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){    
          let data = response.json();
          data.then((e) => {setQuestions(  e.questions); });
        }
      }
    useEffect(()=>{
        parseTests();
    },[])

    
    return(
        <div>
            <Header></Header>
            <QuestionHolder questions= {questions} testId = {id} ></QuestionHolder>
            
        </div>
    )
}