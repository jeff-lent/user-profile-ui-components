export function InputField({ inputType, input_field, placeholder, className, required, icon }) {


    return (
        <>
            <i class={icon + " input-field-icons"}></i>
            <input
                type={inputType}
                placeholder={placeholder}
                name={input_field}
                className={className + " input-fields"}
                required={required}
            ></input>
        </>
    )
}