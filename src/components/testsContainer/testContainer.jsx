import { useState, useEffect } from "react"
import TestElement from "../testElement/testElement"
import './testContainer.css'
import {tests} from '../../test.js'
import { BrowserRouter, Link } from "react-router-dom"
export default function TestContainer({tests}){
    const test = tests;
    const [currentTests, setCurrentTests] = useState([tests]);
    const [search, setSearch] = useState('');
    function handleSearch(){
        if(search === ''){
            setCurrentTests(test)
            return;
        }
        const filterBySearch = test.filter((item)=>{
            if(item.name.toLowerCase().includes(search.toLowerCase())){
                return item;
            }
        })
        setCurrentTests(filterBySearch);
    }
    useEffect(()=>{
        handleSearch();
    })
    return(
        <>
            <div className="search_bar">
                <input type = 'text' onChange={(e)=>{setSearch(e.target.value);}} placeholder="Search"></input>
            </div>
            <div id="testContainer">
            {currentTests.map((t) =>{
                return(
                    
                    <TestElement testid = {t.id} name = {t.name} key = {t.id} time = {t.time} subject = {t.subject}/>
                    
                    
                )
            }
        )}
        </div>
        </>
    )
}