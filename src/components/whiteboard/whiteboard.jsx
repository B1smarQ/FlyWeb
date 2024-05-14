import { Tldraw } from "tldraw";
import './whiteboard.css'
export default function WhiteboardPage(){
    return(
        <div className = 'whiteboard'>
            <Tldraw></Tldraw>
        </div>
    )
}