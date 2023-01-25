import './InputField.css';

function InputField({ type, placeholder, className, required, icon, value, handler, disabled, pattern }) {

    const handleChange = (e) => {
        let value = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        handler(value)
    }

    return (
        <>
            <i class={icon + " input-field-icons"}></i>
            <input
                pattern={pattern}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                type={type}
                placeholder={placeholder}
                className={className + " input-fields"}
                required={required}
            />

        </>
    )
}

export default InputField;