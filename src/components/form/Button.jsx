export default function Button (props){
    return (
        <div className="button">
            <button onClick={props.onClick} className={props.color}>{props.text}</button>
        </div>
    )
}