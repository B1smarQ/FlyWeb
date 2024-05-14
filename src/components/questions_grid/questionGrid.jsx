import './questionGrid.css'

export default function QuestionGrid({questions ,onClick, questionIndex}){
    function handleClick(index){
        let quests = document.getElementsByClassName('question');
        for (let i of quests){
            i.style.display = 'none';
        }
        let visible_question = document.getElementById(index);
        visible_question.style.display = 'block';
    }
    return(
        <div className = 'quest_grid'>
            {questions?.map((option) =>{
                return(
                    <div>
                        <button onClick = {()=>{handleClick(questions.indexOf(option)); onClick()}} id = {`button${questions.indexOf(option)}`}>{questions.indexOf(option)+1}</button>
                    </div>
                )
            })}
        </div>
    )
}