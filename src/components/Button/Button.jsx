import './Button.css'
export default function({children,onClick,className, type}){
    return(
        <button onClick = {onClick} className = {className} type = {type}>{children}</button>
    )
}