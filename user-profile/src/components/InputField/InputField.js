import './InputField.css';

function InputField({ type, placeholder, className, required, icon, value, handler, disabled }) {
    return (
        <>
            <i class={icon + " input-field-icons"}></i>
                   <input
                    disabled={disabled}
                    value={value}
                    onChange={e => handler(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    className={className + " input-fields"}
                    required={required}
                />

        </>
    )
}

export default InputField;