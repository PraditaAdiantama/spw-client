export default function Input(props) {
    return (
        <div className="mb-3">
            <input name={props.name} ref={props.con} value={props.value} type={props.type} className="form-control w-100" aria-describedby="emailHelp" onChange={props.onChange}/>
        </div>
    )
}