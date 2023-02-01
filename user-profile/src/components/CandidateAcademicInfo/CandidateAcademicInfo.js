import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from '../CandidateAcademicInfo/CandidateAcademicInfo.module.css'
import TextArea from "../Textarea/TextArea";
import { message, Popconfirm } from 'antd';
// import swal from 'sweetalert';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

const qualificationOptions = [
    'SSC',
    'O-level',
    'HSC',
    'A-level',
    'Bachelors',
    'Masters',
    'PhD'
]

function CandidateAcademicInfo() {
    const [degree, setDegree] = useState('');
    const [title, setTitle] = useState('');
    const [institute, setInstitute] = useState('');
    const [degreeProgress, setDegreeProgress] = useState(false);
    const [graduationDate, setGraduationDate] = useState('');
    const [percentage, setPercentage] = useState('');
    const [fypThesis, setFypThesis] = useState('')
    const [userId, setUserId] = useState(91);
    //setUserId(sessionStorage.getItem("user_id")),

    const [eduData, setEduData] = useState([]);

    const [view, setView] = useState('details')

    const [disGradDate, setDisGradDate] = useState(false);
    const [disNextBtn, setDisNextBtn] = useState(true);

    const [messageApi, contextHolder] = message.useMessage();
    const [showEdit, setShowEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null)

    const basicRoute = 'http://192.168.0.160:8080/api/educational_information'
    const getByUserIdUrl = `${basicRoute}/user`
    const postUrl = basicRoute
    const deleteUrl = basicRoute
    const putUrl = basicRoute

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
        setDeleteId(null)
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
        setShowEdit(false)
        setEditId(null)
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
                setDisNextBtn(!res)
                if (res) {
                    messageApi.success(updateUser);
                }
                else {
                    messageApi.error(updateUser)
                }
                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
                setEduData([...eduData, data])
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                messageApi.error(updateUser);
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

    const onDelete = (id) => {
        setDeleteId(id);
    }

    const deleteField = () => {
        fetch(`${deleteUrl}/${deleteId}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(response => {
                const res = response ? response.ok : false;
                console.log(response)
                if (res) {
                    messageApi.success('Details deleted successfully!')
                    const newData = eduData.filter((item) => item.id !== deleteId);
                    setEduData(newData)
                }
                else {
                    messageApi.error('Error deleting details!')
                }


                setDeleteId(null);

            })
            .catch((err) => {
                messageApi.error('Error deleting details!')
                console.log(err)
                setDeleteId(null);
            })
    }

    const dontDeleteField = () => {
        setDeleteId(null);
    }

    const onEdit = (obj) => {
        setDeleteId(null)

        setView('add field')
        setShowEdit(true)
        setEditId(obj.id)

        setDegree(obj.currentDegree)
        setTitle(obj.title)
        setInstitute(obj.institute)
        setDegreeProgress(obj.degreeProgress)
        if (obj.degreeProgress === "No") {
            setGraduationDate(obj.graduationDate)
        }
        else {
            setDisGradDate(true)
            setGraduationDate("")
        }
        setPercentage(obj.cgpa)
        setFypThesis(obj.finalYearProject)
    }

    const editField = () => {
        const obj = {
            id: editId,
            userId,
            currentDegree: degree,
            title,
            institute,
            degreeProgress,
            graduationDate,
            cgpa: percentage,
            finalYearProject: fypThesis
        }
        fetch(`${putUrl}/${editId}`, {
            method: 'PUT',
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
                const updateUser = res ? 'Info edited successfully!' : 'Error editing info!';
                if (res) {
                    messageApi.success(updateUser);
                    const newData = eduData.map((item) => {
                        if (item.id === editId) {
                            return data
                        }
                        else
                            return item;
                    })
                    setEduData(newData)
                }
                else {
                    messageApi.error(updateUser)
                }
                setDisNextBtn(!res)
                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error editing info!';
                messageApi.error(updateUser)
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

        setEditId(null)
        setShowEdit(false)
    }

    if (view == 'details') {
        return (
            <>
                {contextHolder}
                <div className={styles.mainContainer} style={{ display: 'block' }}>
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
                                <th>Action</th>
                            </tr>
                            {eduData.length === 0 ? <tr>
                                <td style={{ textAlign: 'center' }} colSpan={8}>No data to show</td>
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
                                            <td><Popconfirm
                                                title="Delete details"
                                                description="Are you sure to delete this details?"
                                                onConfirm={deleteField}
                                                onCancel={dontDeleteField}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button onClick={() => onDelete(item.id)} type="button" text={<i class="fa fa-trash"></i>} />
                                            </Popconfirm>
                                                <Button onClick={() => onEdit(item)} type="button" text={<i class="fas fa-edit"></i>} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {showDelete && <div style={{ backgroundColor: '#fa928e', border: '2px solid red', padding: '10px', borderRadius: '10px' }} >
                        Are you sure you want to delete this?
                        <Button text="Yes" onClick={deleteField} />
                        <Button text="No" onClick={dontDeleteField} />
                    </div>}
                </div> */}
                    <div>
                        <Button onClick={onAddAnother} text="+ Add New" type="button" className={styles.saveButton} />
                    </div>
                    <div>
                        {/* <Button onClick={onSave} text="Save" type="button" className={styles.saveButton} /> */}
                        <Button disabled={disNextBtn} text="Next" type="button" className={styles.nextButton} />
                    </div>
                </div>
            </>
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
                            <InputField value={title} handler={handleTitle} type='text' placeholder='Title (example Pre-Med, BSCS etc.)' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' />
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
                            {
                                showEdit ?
                                    <Button onClick={editField} type="button" text="Edit" className={styles.saveButton} /> :
                                    <Button type="submit" text="Add" className={styles.saveButton} />
                            }
                            <Button onClick={onCancel} disabled={''} text="Cancel" type="button" className={styles.saveButton} />
                        </div>
                    </form>
                </div>
            </>

        )
    }
}
export default CandidateAcademicInfo;