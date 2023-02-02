import InputField from "../InputField/InputField"
import styles from '../CandidateAcademicInfo/CandidateAcademicInfo.module.css'
import Heading from "../Heading/Heading"
import DropdownField from "../DropdownField/DropdownField"
import Button from "../Button/Button"
import InputLabel from "../Label/InputLabel"
import { useCallback, useState, useEffect } from "react"
import { AlertMessage } from "../AlertMessage/AlertMessage"
import { message, Popconfirm } from 'antd';


export function CandidateWorkInfo() {

    const [company, setCompany] = useState("")
    const [CurrentlyWorking, setCurrentlyWorking] = useState(false)
    const [startDate, setStartDate] = useState("01-01-2015")
    const [endDate, setEndDate] = useState("01-01-2015")
    const [title, setTitle] = useState("")
    const [jobType, setJobType] = useState("")
    const [userId, setUserId] = useState(15)
    const [workData, setWorkData] = useState([])

    const [view, setView] = useState('details')

    const [disNextBtn, setDisNextBtn] = useState(true)
    const [disEndDate, setDisEndDate] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [showEdit, setShowEdit] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editId, setEditId] = useState(null)


    const basicRoute = 'http://192.168.0.160:8081/api/work_experience'
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
                setWorkData(data)
                if (data.length !== 0) {
                    setDisNextBtn(false)
                }
            })
            .catch(err => {
                console.log(err, "\nhello I caught this error");
                setWorkData([]);
                setDisNextBtn(true)
            });
    }

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
        setCurrentlyWorking('No')
    }, []);
    const handleTitle = useCallback(val => {
        setTitle(val);
    }, []);
    const handleJobType = useCallback(val => {
        setJobType(val);
    }, []);
    const onAddAnother = useCallback(val => {
        setView('add field')
        setDeleteId(null)
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
        setShowEdit(false)
        setEditId(null)
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            userId,
            company,
            currentStatus: CurrentlyWorking,
            startDate,
            endDate,
            jobType,
            jobTitle: title,
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
                if (res) {
                    messageApi.success(updateUser);
                }
                else {
                    messageApi.error(updateUser)
                }
                setDisNextBtn(!res)
                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
                setWorkData([...workData, data])
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                messageApi.error(updateUser)
                setDisNextBtn(true)
            });
        setCompany('')
        setCurrentlyWorking(false)
        setStartDate('')
        setEndDate('')
        setTitle('')
        setJobType('')
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
                    const newData = workData.filter((item) => item.id !== deleteId);
                    setWorkData(newData)
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

        setCompany(obj.company)
        setCurrentlyWorking(obj.currentStatus)
        setStartDate(obj.startDate)

        if (obj.currentStatus === "No") {
            setEndDate(obj.endDate)
        }
        else {
            setDisEndDate(true)
            setEndDate("")
        }
        setTitle(obj.jobTitle)
        setJobType(obj.jobType)
    }

    const editField = () => {
        const obj = {
            id: editId,
            userId,
            company,
            currentStatus: CurrentlyWorking,
            startDate,
            endDate,
            jobTitle: title,
            jobType,

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
                    const newData = workData.map((item) => {
                        if (item.id === editId) {
                            return data
                        }
                        else
                            return item;
                    })
                    setWorkData(newData)
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

        setCompany('')
        setCurrentlyWorking('')
        setStartDate('')
        setEndDate('')
        setTitle('')
        setJobType('')
        setDisEndDate(false)
        setView('details')

        setEditId(null)
        setShowEdit(false)
    }

    if (view == 'details') {
        return (
            <>
                {contextHolder}
                <div className={styles.mainContainer} style={{ display: 'block' }}>
                    <Heading className={styles.personalInfoHeading} text="Work Experience" />
                    <div className={styles.tableContainer}>
                        <table className={styles.eduTable} >
                            <tr>
                                <th>Company</th>
                                <th>Currently Working</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Title</th>
                                <th>Job Type</th>
                                <th>Action</th>

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
                                            <td><Popconfirm
                                                title="Delete details"
                                                description="Are you sure to delete this details?"
                                                onConfirm={deleteField}
                                                onCancel={dontDeleteField}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button onClick={() => onDelete(item.id)} type="button" text={<i className="fa fa-trash"></i>} />
                                            </Popconfirm>
                                                <Button onClick={() => onEdit(item)} type="button" text={<i className="fas fa-edit"></i>} />
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </table>


                    </div>
                    <div>
                        <Button onClick={onAddAnother} text="+ Add New" type="button" className={styles.saveButton} />
                    </div>
                    <div>
                        <Button disabled={disNextBtn} text="Next" type="button" className={styles.nextButton} />
                    </div>

                </div>
            </>
        )
    }


    else if (view == 'add field') {
        return (
            <>
                <div className={styles.mainContainer} style={{ display: 'block' }}>
                    <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                        <Heading className={styles.personalInfoHeading} text="Work Experience" />
                        <table>
                            <tr>

                                <td><InputLabel className={styles.inputLabel} text='Company'></InputLabel></td>
                                <td colspan="2"><InputField value={company} handler={handleCompany} type='text' pattern="[a-zA-Z ]*" placeholder='Company' className={styles.fullSize} required='required' icon='fa fa-briefcase' /></td>
                                <td><InputLabel className={styles.inputLabel} text='Start Date'></InputLabel></td>

                                <td colspan="2"><InputField value={startDate} handler={handleStartDate} type='date' placeholder='Start Date' className={styles.inputFields} required='required' ></InputField></td>

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

                                <td colspan="2"><InputField disabled={disEndDate} value={endDate} handler={handleEndDate} type='date' placeholder='End Date' className={styles.inputFields} required='required' ></InputField></td>
                            </tr>
                            <tr>
                                <td><InputLabel className={styles.inputLabel} text='Job Title'></InputLabel></td>
                                <td colspan="5"><InputField value={title} handler={handleTitle} type='text' pattern="[a-zA-Z ]*" placeholder='Job Title' className={styles.inputFields} required='required' /></td>
                            </tr>
                            <tr>
                                <td><InputLabel className={styles.inputLabel} text='Job Type'></InputLabel></td>

                                <td colspan="5"> <DropdownField value={jobType} handler={handleJobType} options={['Full time', 'Part time', 'Intern']} className={styles.inputFields} placeholder='select type' />
                                </td>
                            </tr>

                        </table>
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