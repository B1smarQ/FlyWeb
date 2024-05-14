import { useEffect,useState,useRef } from "react";
import TestContainer from "./testsContainer/testContainer";
import Button from "./Button/Button";
import Header from "./Header/header";
import Footer from "./footer/footer";
import './home.css'
export default function HomePage(){
  let [tests, setTests] = useState([]);
  let loggedIn = false;
  let [student,setStudent] = useState([]);
  let token = localStorage.getItem('token');
  async function parseTests(){
    const response = await fetch(' http://localhost:8081/api/v1/fly ');
    if(response.ok){    
      let data = response.json();
      data.then((e) => {setTests(e)});
    }
    else{
      console.log(response);
    }
    
  }

  useEffect(()=>{
    parseTests();
  },[])
 

  return (
    
    <div id = 'main'>
      <Header/>
      {token && <TestContainer tests = { tests }></TestContainer>}
      <Footer></Footer>
    </div>
  )
}