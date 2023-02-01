import InputField from "../InputField/InputField"
import styles from '../CandidateAcademicInfo/CandidateAcademicInfo.module.css'
import Heading from "../Heading/Heading"
import DropdownField from "../DropdownField/DropdownField"
import Button from "../Button/Button"
import InputLabel from "../Label/InputLabel"
import { useCallback, useState } from "react"
import { AlertMessage } from "../AlertMessage/AlertMessage"


export function CandidateWorkInfo() {

    const [company, setCompany] = useState("")
    const [CurrentlyWorking, setCurrentlyWorking] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [title, setTitle] = useState("")
    const [jobType, setJobType] = useState("")
    const [userId, setUserId] = useState(15)
    const [workData, setWorkData] = useState([])

    const [view, setView] = useState('details')

    const [disNextBtn, setDisNextBtn] = useState(true)
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('alert');
    const [message, setMessage] = useState('');
    const [disEndDate, setDisEndDate] = useState(false)



    const handleCompany = useCallback(val => {
        setCompany(val);
    }, []);

    const handleCurrentlyWorking = useCallback(e => {
        const val = e.target.value
        setCurrentlyWorking(val);
        if (val === 'Yes') {
            setDisEndDate(true)
            setEndDate('')
        }
        else if (val === 'No') {
            setDisEndDate(false)
        }

    }, []);

    const handleStartDate = useCallback(val => {
        setStartDate(val);
    }, []);
    const handleEndDate = useCallback(val => {
        setEndDate(val);
    }, []);
    const handleTitle = useCallback(val => {
        setTitle(val);
    }, []);
    const handleJobType = useCallback(val => {
        setJobType(val);
    }, []);
    const onAddAnother = useCallback(val => {
        setView('add field')
    }, []);



    const onCancel = useCallback(() => {
        setCompany('')
        setCurrentlyWorking('')
        setStartDate('')
        setEndDate('')
        setTitle('')
        setJobType('')
        setDisEndDate(false)
        setView('details')
    }, []);

    const postUrl = ""
    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            userId,
            company,
            CurrentlyWorking,
            startDate,
            endDate,
            jobType,
            title,
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
                // setDisNextBtn(!res)
                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
                setWorkData([...workData, data])
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                const alertUser = 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setAlertType(alertUser)
                // setDisNextBtn(true)
            });
        setCompany('')
        setCurrentlyWorking(false)
        setStartDate('')
        setEndDate('')
        setTitle('')
        setJobType('')

    }
    if (view == 'details') {
        return (
            <>

                <div className={styles.mainContainer} style={{ display: 'block' }}>
                    <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                        {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                        <Heading className={styles.personalInfoHeading} text="Work Experience" />
                        <div className={styles.tableContainer}>
                            <table className={styles.eduTable} >
                                <tr>
                                    <th>Company</th>
                                    <th>Currently Working</th>
                                    <th>Title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Job Type</th>

                                </tr>
                                {workData.length === 0 ? <tr>
                                    <td style={{ textAlign: 'center' }} colSpan={7}>No data to show</td>
                                </tr> : null}
                                {
                                    workData.map(item => {
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
                        <div>
                            <Button onClick={onAddAnother} text="+ Add New" type="button"  className={styles.saveButton} />
                        </div>
                        <div>
                            {/* <Button onClick={onSave} text="Save" type="button" className={styles.saveButton} /> */}
                            <Button disabled={disNextBtn} text="Next" type="button" className={styles.nextButton} />
                        </div>
                    </form>

                </div>
            </>
        )
    }


    else if (view == 'add field') {
        return (
            <>
                <div className={styles.mainContainer} style={{ display: 'block' }}>
                    <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                        {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                        <Heading className={styles.personalInfoHeading} text="Work Experience" />








                        <table>
                            <tr>

                                <td><InputLabel className={styles.inputLabel} text='Company'></InputLabel></td>
                                <td colspan="2"><InputField value={company} handler={handleCompany} type='text' pattern="[a-zA-Z ]*" placeholder='Company' className={styles.fullSize} required='required' icon='fa fa-briefcase' /></td>
                                <td><InputLabel className={styles.inputLabel} text='Start Date'></InputLabel></td>

                                <td colspan="2"><InputField value={startDate} handler={handleStartDate} min="1970-01-01" type='date' placeholder='Start Date' className={styles.inputFields} required='required' ></InputField></td>
                                
                            </tr>
                            <tr>
                                <td><InputLabel className={styles.inputLabel} text='Currently Working'></InputLabel></td>
                            <td colspan="2"><div className={styles.degreeProgressDiv}>
                                    <div>
                                      
                                        <input
                                            checked={CurrentlyWorking === 'Yes'}
                                            value={'Yes'}
                                            onChange={handleCurrentlyWorking}
                                            type={'radio'}
                                            className={`${styles.radioBtn} ${styles.inputFields}`}
                                            required={true}
                                        />
                                        <span>Yes</span>
                                        <input
                                            checked={CurrentlyWorking === 'No'}
                                            value={'No'}
                                            onChange={handleCurrentlyWorking}
                                            type={'radio'}
                                            className={`${styles.radioBtn} ${styles.inputFields}`}
                                            required={true}
                                        />
                                        <span>No</span>
                                    </div>
                                </div></td>
                                <td><InputLabel className={styles.inputLabel} text='End Date'></InputLabel></td>

                                <td colspan="2"><InputField disabled={disEndDate} value={endDate} handler={handleEndDate} min="1970-01-01" type='date' placeholder='End Date' className={styles.inputFields} required='required' ></InputField></td>
                            </tr>
                            <tr>
                                <td><InputLabel className={styles.inputLabel} text='Job Title'></InputLabel></td>
                                <td colspan="5"><InputField value={title} handler={handleTitle} type='text' pattern="[a-zA-Z ]*" placeholder='Job Title' className={styles.inputFields} required='required' /></td>
                            </tr>
                            <tr>
                                <td><InputLabel className={styles.inputLabel} text='Job Type'></InputLabel></td>

                                <td colspan="5"> <DropdownField value={jobType} handler={handleJobType} options={['FullTime', 'PartTime', 'Intern']} className={styles.inputFields} placeholder='Job Type' />
                                </td>
                            </tr>

                        </table>
                        <Button type="submit" text="Add"  className={styles.saveButton}  />
                        <Button onClick={onCancel} disabled={''} text="Cancel" type="button" className={styles.saveButton} />


                    </form>

                </div>


            </>

        )
    }

}