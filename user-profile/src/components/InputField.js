export function InputField({ inputType, placeholder, className, icon, children }) {
    return (
        <>

            {/* This is Icon for the input-field which is visible inside the input-field */}
            <i className={icon +" "+"info-icon"}></i>
            {/* This is common input-field for only textual text-field */}
            <input type={inputType} placeholder={placeholder} className={className}  />
        </>
    )
}