import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css';

function InputField({ type, placeholder, className, required, icon, value, handler, disabled, pattern, min }) {

    const handleChange = (e) => {
        let value = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        handler(value)
    }

    return (
        <>
            <input
                min={min}
                pattern={pattern}
                disabled={disabled}
                value={value}
                onChange={handleChange}
                type={type}
                placeholder={placeholder}
                className={`${className} ${styles.inputFields}`}
                required={required}
            />

        </>
    )
}

export default InputField;