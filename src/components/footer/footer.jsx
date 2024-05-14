import './footer.css'

export default function Footer(){
    return(
        <footer>
            <div>
                <p>Не хватает мотивации?</p>
                <p>Нажми на кнопку</p>

            </div>
            <button onClick = {()=>window.location.assign('https://www.youtube.com/watch?v=dnXr8Znm1XY')}>тык</button>
        </footer>
    )
}