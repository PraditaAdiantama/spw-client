export default function Input(props) {
    return (
        <div className="mb-3">
            <input name={props.name} type={props.type} className="form-control w-100" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={props.onChange}/>
        </div>
    )
}