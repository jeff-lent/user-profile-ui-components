export default function DropdownField({options, placeholder, icon}) {
    return (
        <>
       <i class={icon + " input-field-icons"}></i>
            <select required className="select">
                <option value="" selected disabled>{placeholder}</option>
                {console.log(options)}
                {options && options.map(item => {
                    return <option value={item} className="option">{item}</option>
                })}
            </select>
        </>
    )
}