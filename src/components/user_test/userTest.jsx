import background from '../../assets/TestBanner.png';
import './userTest.css'
export default function UserTest({test}){
    return(
        <div id = 'test-info-container'>
            <div id = 'background-img'>
                <img src = {background}></img>
            </div>
            <div id = 'test-info'>
            <h2>{test.subject}</h2>
            <p>{test.name}</p>
            </div>
        </div>
    )
}