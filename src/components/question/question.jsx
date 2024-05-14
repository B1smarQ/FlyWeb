import './question.css';

export default function Question({question, internid}){
    

    return(
        <form className = 'question' questionid = {question.id} id = {internid}>
            <h2>{internid+1}. {question.content}</h2>
            
            
            
                {question.answers.map(option => {

                return(
                    <>
                    <input type = 'radio' answerid = {option.id} name = {`question${question.id}`} />  
                    <label>{option.content}</label>
                    <br/>
                    </>
                )
                })}
            
            
            

        </form>
    )
}