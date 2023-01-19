export function InputField({ inputType, placeholder, className, icon }) {
    return (
        <>

            {/* This is Icon for the input-field which is visible inside the input-field */}
            <i className={icon}></i>
            {/* This is common input-field for only textual text-field */}
            <input type={inputType} placeholder={placeholder} className={className} />
        </>
    )
}