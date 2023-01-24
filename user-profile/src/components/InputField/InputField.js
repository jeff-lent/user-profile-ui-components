import './InputField.css';

function InputField({ type, placeholder, className, required, icon, value, handler, disabled, cnic_field }) {
    return (
        <>
            <i class={icon + " input-field-icons"}></i>
            {cnic_field ? <input
                disabled={disabled}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        alert("Invalid input")
                    }
                }}
                value={value}
                onChange={e => handler(e.target.value)}
                type={type}
                placeholder={placeholder}
                className={className + " input-fields"}
                required={required}
            /> :
                <input
                    disabled={disabled}
                    value={value}
                    onChange={e => handler(e.target.value)}
                    type={type}
                    placeholder={placeholder}
                    className={className + " input-fields"}
                    required={required}
                />
            }

        </>
    )
}

export default InputField;