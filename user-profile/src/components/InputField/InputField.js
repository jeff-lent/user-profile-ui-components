import './InputField.css';

function InputField({ type, placeholder, className, required, icon, value, handler, disabled, pattern }) {
    return (
        <>
            <i class={icon + " input-field-icons"}></i>
            <input
                pattern={pattern}
                disabled={disabled}
                value={value}
                onChange={e => handler(e)}
                type={type}
                placeholder={placeholder}
                className={className + " input-fields"}
                required={required}
            />

        </>
    )
}

export default InputField;