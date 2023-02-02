import styles from "../CandidatePersonalInfo/CandidatePersonalInfo.module.css"

function DropdownField({ options, placeholder, icon, value, handler, className }) {
    return (
        <>
            <select value={value} onChange={e => { handler(e.target.value) }} required className={`${className} ${styles.select}`}>
                <option value="" selected disabled>{placeholder}</option>
                {options && options.map(item => {
                    return <option key={item} value={item} className={styles.option}>{item}</option>
                })}
            </select>
        </>
    )
}

export default DropdownField;