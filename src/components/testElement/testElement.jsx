import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import TestLink from "../links/link.jsx";
import './testElement.css'
import TestBanner from '../../assets/TestBanner.png'
export default function TestElement({testid, name, time, subject}){
    const dataToPass = {testid:1,name:'{name}'}
    return (
        <div className = 'testElement'>
            <div className = 'testElementBanner'>
                <img src = {TestBanner}></img>
            </div>
            <div className = 'test_info_container'>
                <h2>{subject}</h2>
                <p>{name}</p>
                <p>Время выполнения:{time/60} минут</p>
                <Link to= {{pathname:`/test/${testid}`}}><a>Начать выполнение</a></Link>
            </div>
        </div>
    )
}