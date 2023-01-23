import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
export function PhoneContact ({placeholder, inputType , contact, className, required}){
    const [value, setValue] = useState()
return (
    <>    <i class="fa-solid fa-globe global-icon"></i>
    <PhoneInput
        defaultCountry="PK"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        type={inputType}
        name={contact}
        className={className+" input-fields"}
        required={required}
    />
    </>

)
}