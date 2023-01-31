import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from '../CandidateAcademicInfo/CandidateAcademicInfo.module.css'
import { AlertMessage } from "../AlertMessage/AlertMessage";
import TextArea from "../Textarea/TextArea";
// import swal from 'sweetalert';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

const qualificationOptions = [
    'SSC / O-level',
    'HSC / A-level',
    'Bachelors',
    'Masters',
    'PhD',
    'Post Doctorate'
]

function CandidateAcademicInfo() {
    const [degree, setDegree] = useState('');
    const [title, setTitle] = useState('');
    const [institute, setInstitute] = useState('');
    const [degreeProgress, setDegreeProgress] = useState(false);
    const [graduationDate, setGraduationDate] = useState('');
    const [percentage, setPercentage] = useState('');
    const [fypThesis, setFypThesis] = useState('')
    const [userId, setUserId] = useState(2);
    //setUserId(sessionStorage.getItem("user_id")),

    const [eduData, setEduData] = useState([]);

    const [view, setView] = useState('details')

    const [disGradDate, setDisGradDate] = useState(false);
    const [disNextBtn, setDisNextBtn] = useState(true);

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('alert');
    const [message, setMessage] = useState('');

    const getByUserIdUrl = 'http://192.168.0.160:8080/api/educational_information/user'
    const postUrl = 'http://192.168.0.160:8080/api/educational_information'

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch(`${getByUserIdUrl}/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setEduData(data)
                if (data.length !== 0) {
                    setDisNextBtn(false)
                }
            })
            .catch(err => {
                console.log(err, "\nhello I caught this error");
                setEduData([]);
                setDisNextBtn(true)
            });
    }

    const handleDegree = useCallback(val => {
        setDegree(val);
    }, []);
    const handleTitle = useCallback(val => {
        setTitle(val);
    }, []);
    const handleInstitute = useCallback(val => {
        setInstitute(val)
    }, []);
    const handleDegreeProgress = useCallback(e => {
        const val = e.target.value
        setDegreeProgress(val);
        if (val === 'Yes') {
            setDisGradDate(true)
            setGraduationDate('')
        }
        else if (val === 'No') {
            setDisGradDate(false)
        }

    }, []);
    const handleGraduationDate = useCallback(val => {
        setGraduationDate(val);
        setDegreeProgress('No');
    }, []);
    const handlePercentage = useCallback(val => {
        setPercentage(val);
    }, []);
    const handleFypthesis = useCallback(val => {
        setFypThesis(val);
    }, []);

    const onAddAnother = useCallback(() => {
        setView('add field')
    }, []);

    const onCancel = useCallback(() => {
        setDegree('')
        setTitle('')
        setInstitute('')
        setDegreeProgress('')
        setGraduationDate('')
        setPercentage('')
        setFypThesis('')
        setDisGradDate(false)
        setView('details')
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            userId,
            currentDegree: degree,
            title,
            institute,
            degreeProgress,
            graduationDate,
            cgpa: percentage,
            finalYearProject: fypThesis
        }

        console.log(obj)
        fetch(postUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(obj)
        })
            .then(async response => {
                const data = await response.json();
                console.log(response);
                const res = response ? response.ok : false;
                const updateUser = res ? 'Info saved successfully!' : 'Error saving info!';
                const alertUser = res ? 'success' : 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setAlertType(alertUser)
                setDisNextBtn(!res)
                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
                setEduData([...eduData, data])
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                const alertUser = 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setAlertType(alertUser)
                setDisNextBtn(true)
            });
        setDegree('')
        setTitle('')
        setInstitute('')
        setDegreeProgress('')
        setGraduationDate('')
        setPercentage('')
        setFypThesis('')
        setDisGradDate(false)
        setView('details')
    }

    if (view == 'details') {
        return (
            <div className={styles.mainContainer} style={{display: 'block'}}>
                {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                <Heading className={styles.personalInfoHeading} text="Academic Background" />
                <div className={styles.tableContainer}>
                    <table className={styles.eduTable} >
                        <tr>
                            <th>Qualification</th>
                            <th>Title</th>
                            <th>School / University / College</th>
                            <th>In progress</th>
                            <th>Completion date</th>
                            <th>CGPA / Percentage</th>
                            <th>FYP / Project / Thesis</th>
                        </tr>
                        {eduData.length === 0 ? <tr>
                            <td style={{ textAlign: 'center' }} colSpan={7}>No data to show</td>
                        </tr> : null}
                        {
                            eduData.map(item => {
                                return (
                                    <tr key={item.id}>
                                        {
                                            Object.keys(item).map(it => {
                                                if (it !== 'userId' && it !== 'id')
                                                    if (!item[it])
                                                        return <td>---</td>;
                                                    else
                                                        return <td>{item[it]}</td>;
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={onAddAnother} disabled={''} text="+ Add Another" type="button" className={styles.addMoreBtn} />
                </div> */}
                <div>
                    <Button onClick={onAddAnother} text="+Add New" type="button" className={styles.saveButton} />
                </div>
                <div>
                    {/* <Button onClick={onSave} text="Save" type="button" className={styles.saveButton} /> */}
                    <Button disabled={disNextBtn} text="Next" type="button" className={styles.nextButton} />
                </div>
            </div>
        )
    }
    else if (view == 'add field') {
        return (
            <>
                <div className={styles.mainContainer}>
                    <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                        <Heading className={styles.personalInfoHeading} text="Academic Background" />
                        <div>
                            <DropdownField value={degree} handler={handleDegree} options={qualificationOptions} className={styles.fullSize} placeholder='Qualification' />
                        </div>
                        <div>
                            <InputField value={title} handler={handleTitle} type='text' placeholder='Title' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' />
                        </div>

                        <div>
                            <InputField value={institute} handler={handleInstitute} type='text' placeholder='School/University/College' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' />
                        </div>
                        <div className={styles.degreeProgressDiv}>
                            <div>
                                <span className={styles.degreeProgressText}>Degree in progress:</span>
                                <input
                                    checked={degreeProgress === 'Yes'}
                                    value={'Yes'}
                                    onChange={handleDegreeProgress}
                                    type={'radio'}
                                    className={`${styles.radioBtn} ${styles.inputFields}`}
                                    required={true}
                                />
                                <span>Yes</span>
                                <input
                                    checked={degreeProgress === 'No'}
                                    value={'No'}
                                    onChange={handleDegreeProgress}
                                    type={'radio'}
                                    className={`${styles.radioBtn} ${styles.inputFields}`}
                                    required={true}
                                />
                                <span>No</span>
                            </div>
                            <div>
                                <span className={styles.degreeProgressText}>Completion date: </span>
                                <InputField disabled={disGradDate} value={graduationDate} handler={handleGraduationDate} type='date' placeholder='' className={styles.graduationDate} required='required' />
                            </div>

                        </div>
                        <div>
                            <InputField value={percentage} handler={handlePercentage} type='text' pattern="[0-9.%]*" placeholder='CGPA/Percentage' className={styles.fullSize} required='required' />
                        </div>
                        <div>
                            <TextArea value={fypThesis} handler={handleFypthesis} rows="5" placeholder="Final Year Project or Thesis (If applicable)" className={styles.textArea} />
                        </div>
                        <div>
                            <Button type="submit" text="Add" className={styles.saveButton} />
                            <Button onClick={onCancel} disabled={''} text="Cancel" type="button" className={styles.saveButton} />
                        </div>
                    </form>
                </div>
            </>

        )
    }
}
export default CandidateAcademicInfo;