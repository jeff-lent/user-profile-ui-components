import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from '../CandidatePersonalInfo/CandidatePersonalInfo.module.css'
import { AlertMessage } from "../AlertMessage/AlertMessage";
import TextArea from "../Textarea/TextArea";
// import AddCircleIcon from '@material-ui/icons/AddCircle';

function CandidateAcademicInfo() {
    const [degree, setDegree] = useState('');
    const [title, setTitle] = useState('');
    const [institute, setInstitute] = useState('');
    const [degreeProgress, setDegreeProgress] = useState(false);
    const [graduationDate, setGraduationDate] = useState('2015-01-01');
    const [percentage, setPercentage] = useState('');
    const [fypThesis, setFypThesis] = useState('')

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('alert');
    const [message, setMessage] = useState('');
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);

    useEffect(() => {

    })

    const handleDegree = useCallback(val => {
        console.log(val);
        setDegree(val);
    }, []);
    const handleTitle = useCallback(val => {
        setTitle(val);
    }, []);
    const handleInstitute = useCallback(val => {
        setInstitute(val)
    }, []);
    const handleDegreeProgress = useCallback(val => {
        setDegreeProgress(val);
    }, []);
    const handleGraduationDate = useCallback(val => {
        setGraduationDate(val);
    }, []);
    const handlePercentage = useCallback(val => {
        setPercentage(val);
    }, []);
    const handleFypthesis = useCallback(val => {
        setFypThesis(val);
    }, []);



    const onSubmit = () => { }

    return (
        <>
            <div className={styles.mainContainer}>
                <form className={styles.formPersonalInfo} onSubmit={onSubmit}>

                    {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                    <Heading className={styles.personalInfoHeading} text="Academic Background" />
                    <div>
                        <DropdownField value={degree} handler={handleDegree} options={['Secondary School Certificate / Matriculation / O - level', 'Higher Secondary School Certificate / Intermediate/ A - level', 'Bachelor (16 Years) Degree', 'Master (16 Years) Degree']} className={styles.fullSize} placeholder='Qualification Level' />
                    </div>
                    <div>
                        <InputField value={title} handler={handleTitle} type='text' placeholder='Ttile' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' />
                    </div>

                    <div>
                        <InputField value={institute} handler={handleInstitute} type='text' placeholder='University/Collage' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' />
                    </div>
                    <div className={styles.degreeProgressDiv}>
                        <div><InputField value={degreeProgress} handler={handleDegreeProgress} id='degree-in-progress' type='radio' placeholder='' className={styles.radioBtn} required='required' />
                            <span className={styles.degreeProgressText}>Degree in progress</span>
                        </div>
                        <div>
                            <span className={styles.degreeProgressText}>Completaion date: </span>
                            <InputField value={graduationDate} handler={handleGraduationDate} min="" type='date' placeholder='' className={styles.graduationDate} required='required' />
                        </div>

                    </div>
                    <div>
                        <InputField value={percentage} handler={handlePercentage} type='text' pattern="[0-9.%]*" placeholder='CGPA/Percentage' className={styles.fullSize} required='required' />
                    </div>
                    <div>
                        <TextArea value={fypThesis} handler={handleFypthesis} rows="5" placeholder="Final Year Project or Thesis (If applicable)" className={styles.textArea} />
                    </div>
                    <div>
                        <Button disabled={''} text="+ Add Another" type="button" className={styles.addMoreBtn} />
                        <Button type="submit" text="Submit" className={styles.saveButton} />
                    </div>


                </form>
            </div>
        </>

    )
}
export default CandidateAcademicInfo;