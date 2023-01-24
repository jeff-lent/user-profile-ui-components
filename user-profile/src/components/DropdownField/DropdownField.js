import "./DropdownField.css"

function DropdownField({options, placeholder, icon, value, handler}) {
    return (
        <>
       <i class={icon + " input-field-icons"}></i>
            <select value={value} onChange={e => handler(e.target.value)} required className="select">
                <option value="" selected disabled>{placeholder}</option>
                {options && options.map(item => {
                    return <option key={item} value={item} className="option">{item}</option>
                })}
            </select>
        </>
    )
}

export default DropdownField;