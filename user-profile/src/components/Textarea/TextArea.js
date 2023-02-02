import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css';

function TextArea({ placeholder, className, value, handler, rows, cols }) {

    const handleChange = (e) => {
        handler(e.target.value)
    }

    return (
        <>
       <textarea value={value} onChange={handleChange} rows={rows} placeholder={placeholder} cols={cols} className={`${className}`} />

        </>
    )
}

export default TextArea;