const Button = ({type, text, className, onClick, onSubmit, disabled}) => {
    return <button disabled={disabled} type={type} className={className} onClick={onClick} onSubmit={onSubmit} >{text}</button>
}

export default Button;