import Question from '../question/question';
import './questionHolder.css'
import Button from '../Button/Button.jsx';
import { useState, useEffect, useRef, createRef } from 'react';
import axios from 'axios';
import QuestionGrid from '../questions_grid/questionGrid';
import useDidMountEffect from '../../hooks/componentDidMount.jsx';
export default function QuestionHolder({questions, testId}){
  const quests = questions;
  const MAXTIME = 900;
  let [time,setTime] = useState(0);
  let hours = String((Math.floor((MAXTIME-time)/3600))).padStart(2,'0');
  let minutes = String((Math.floor((MAXTIME-time)/60))).padStart(2,'0');
  let seconds = String(((MAXTIME-time)%60)).padStart(2,'0');
  const timeInterval = useRef();
  let [running,setRunning] = useState(false);
  let currentQuestionIndex = 0;
  let submitted = false;
  const isMounted = useRef(false);
  const API_POST_URL = 'http://localhost:8081/api/v1/fly/res';
  const token = localStorage.getItem('token');
  const [student,setStudent] = useState([])
  let lostFocus = false;
  let elem = [];
  
  function handleTestStart(){
    running?running:setRunning(true);
  }
  for(let i = 0; i<questions.length;i++){
    let question = questions[i];
    elem.push(<Question question = {question} key = {question.id} internid = {quests.indexOf(question)}/>)
     
  }
  function getAnswers(){
    let testanswers = {
      flyId:testId,
      answers:[],
      time:time,
      lostFocus:lostFocus
    }
    
    
    let ans_arr = document.getElementsByClassName('question');
    let obj = {};
    for(let j of ans_arr)
      for ( let i of j.children){
          if(i.checked){
            obj.questionId = j.attributes[1].value;
            obj.answerId = i.attributes[1].value;
            
            testanswers.answers.push(obj);
          }

        
      }
      if(testanswers.answers.length<questions.length){
        alert('Вы ответили не на все вопросы');
        return;
      }
    
      try{
        let response = fetch(API_POST_URL,{
          method:'POST',
          headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            flyId:testanswers.flyId,
            questionResponses:testanswers.answers,
            time:testanswers.time,
            lostFocus:lostFocus
          })
          
          
        });
        submitted = true;
        window.location.assign('/')
        response.then(response =>console.log(response));
        
        
        setRunning(false);
    } catch(error){
      alert(error);
    }
    
  
}

  useEffect(()=>{
    return() =>clearInterval(timeInterval.current);
  },[])

  useEffect(()=>{
    if(running){
      timeInterval.current = setInterval(()=>{
        setTime(++time);
      },1000)
    }
    else{
      clearInterval(timeInterval.current);
      timeInterval.current = null;
    }
  },[running])

  
  function handleQuestionChange(questionIndex){
    currentQuestionIndex = Math.abs(currentQuestionIndex+=questionIndex-currentQuestionIndex);
    console.log(questionIndex)
    !submitted?setRunning(true):setRunning(false);
    for(let i of document.getElementsByClassName('question')){
      i.style.display = 'none';
    }
    if(currentQuestionIndex<0){
      currentQuestionIndex = questions.length;
    }
    else if(currentQuestionIndex>questions.length-1){
      currentQuestionIndex = 1;
    }
    console.log(currentQuestionIndex);
    document.getElementById(`${questionIndex}`).style.display ='block';
    //document.getElementById(`button${currentQuestionIndex}`).className = 'active';

  }
  async function parseStudent(){
    const response = await fetch('http://localhost:8081/api/v1/student/id',{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
    if(response.ok){    
      let data = response.json();
      data.then((e) => {setStudent(e)});
    }
    else{
      console.log(response);
    }
  }
  useEffect(()=>{
    if(token)
      parseStudent();
  },[])
  function handleInput(event, method){
    method(event.target.value);
  }
  window.addEventListener('visibilitychange',(event)=>{
    if(document.visibilityState == 'visible'){

    }
    else{
       console.log('Партия забрать ваш миска рис');
       lostFocus = true;
    }
  });
    return(
      <div className =  'quests_grid'>
        <div className = 'quest_elem'>
          <div className = 'quest_grid_bg'><p>{hours}:{minutes}:{seconds} </p></div>
        
       
        <div className = 'quest_grid'>
            {questions?.map((option) =>{
                return(
                    <div>
                        <button onClick = {()=>{handleQuestionChange(questions.indexOf(option))}} >{questions.indexOf(option)+1}</button>
                    </div>
                )
            })}
            
            
        </div>
        
          
        </div>
        {elem}
        <button onClick = {()=>{handleQuestionChange(currentQuestionIndex+1)}} id = 'button_next'>Дальше</button>
        <button onClick = {()=>{
          
          getAnswers();
        
          }} id = 'button_next' style={{backgroundColor:'#D28154'}}>Отправить</button>
      </div>
      
    )
}