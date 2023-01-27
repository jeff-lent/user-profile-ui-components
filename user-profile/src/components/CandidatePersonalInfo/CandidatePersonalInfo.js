import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import styles from "./CandidatePersonalInfo.module.css";
import { AlertMessage } from "../AlertMessage/AlertMessage";
//import swal from 'sweetalert';


function CandidatePersonalInfo() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('2009-01-01');
    const [gender, setGender] = useState('');
    const [nin, setNin] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [maritalstat, setMaritalstat] = useState('');
    const [email, setEmail] = useState('dummy@email.com');
    const [phone, setPhone] = useState('');

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setalertType] = useState('alert');
    const [message, setMessage] = useState('')
    const [disableNextBtn, setDisableNextBtn] = useState(true)

    const [userData, setUserData] = useState(null);
    const signupServiceUrl = '';

    useEffect(() => {
        // fetch(signupServiceUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         setUserData(null)
        //     });
        //
        setEmail(sessionStorage.getItem("user_email"));
    }, [])



    const handleFirstname = useCallback(val => {
        setFirstname(val);
    }, []);

    const handleLastname = useCallback(val => {
        setLastname(val);
    }, []);

    const handleDob = useCallback(val => {
        setDob(val);
    }, []);

    const handleGender = useCallback(val => {
        setGender(val);
    }, []);

    const handleNin = useCallback(val => {
        setNin(val);
    }, []);

    const handleCity = useCallback(val => {
        setCity(val);
    }, []);

    const handleAddress = useCallback(val => {
        setAddress(val);
    }, []);

    const handleLinkedin = useCallback(val => {
        setLinkedin(val);
    }, []);

    const handleMaritalstat = useCallback(val => {
        setMaritalstat(val);
    }, []);

    const handlePhone = useCallback(val => {
        setPhone(val);
    }, []);

    const url = 'http://35.168.113.87:8080/api/personal-information'

    async function onSubmit(event) {
        event.preventDefault();

        const data = {
            firstName: firstname,
            lastName: lastname,
            dateOfBirth: dob,
            gender: gender,
            nationalIdentityNumber: nin,
            city: city,
            address: address,
            linkedProfile: linkedin,
            maritalStatus: maritalstat,
            phoneNumber: phone
        }


        console.log(data)
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response);
                const res = response ? response.ok : false;
                const updateUser = res ? 'Info saved successfully!' : 'Error saving info!';
                const alertUser = res ? 'info' : 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setalertType(alertUser)
                setDisableNextBtn(!res)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")

                // swal({
                //     title: "Personal Information Saved!",
                //     icon: "success",
                // })
            })
            .catch(err => {
                console.log(err)
                const updateUser = 'Error saving info!';
                const alertUser = 'danger';
                setShowAlert(true);
                setMessage(updateUser)
                setalertType(alertUser)
                setDisableNextBtn(true)
                setTimeout(() => {
                    setShowAlert(false)
                }, "2000")
            });
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <form className={styles.formPersonalInfo} onSubmit={onSubmit}>
                    {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                    <Heading className={styles.personalInfoHeading} text="Personal Information" />
                    <div>
                        <InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-solid fa-user'></InputField>
                        <InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' pattern="[a-zA-Z ]*" className={styles.halfSize} required='required' icon='fa-regular fa-user'></InputField>
                    </div>
                    <div>
                        <DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} className={styles.halfSize} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress' />
                        <InputField value={dob} handler={handleDob} min="1970-01-01" type='date' placeholder='' className={styles.halfSize} required='required' icon='fa-solid fa-calendar-days'></InputField>
                    </div>
                    <div>
                        <InputField value={nin} handler={handleNin} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className={styles.halfSize} required='required' icon='fa-solid fa-address-card'></InputField>
                        <DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} className={styles.halfSize} placeholder='Marital Status' icon='fa-solid fa-heart' />
                    </div>
                    <div>
                        <InputField disabled={true} value={email} type='email' placeholder='Email' className={styles.fullSize} required='required' icon='fa-solid fa-envelope'></InputField>
                    </div>
                    <div>
                        <PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='' required='required' />
                    </div>
                    <div>
                        <InputField value={city} handler={handleCity} type='text' placeholder='City' pattern="[a-zA-Z ]*" className={styles.fullSize} required='required' icon='ffa-sharp fa-solid fa-city'></InputField>
                    </div>
                    <div>
                        <InputField value={address} handler={handleAddress} type='text' placeholder='Address' className={styles.fullSize} required='required' icon='fa-solid fa-location-dot'></InputField>
                    </div>
                    <div>
                        <InputField value={linkedin} handler={handleLinkedin} type='text' placeholder='LinkedIn Profile' className={styles.fullSize} required='required' icon='fa-brands fa-linkedin'></InputField>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button type="submit" text="Save" className={styles.saveButton} />
                        <Button disabled={disableNextBtn} text="Next" type="button" className={styles.nextButton} />
                    </div>
                </form>
            </div>
        </>

    )
}

export default CandidatePersonalInfo;