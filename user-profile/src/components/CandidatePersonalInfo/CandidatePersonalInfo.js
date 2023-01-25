import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import "./CandidatePersonalInfo.css";
import { AlertMessage } from "../AlertMessage/AlertMessage";


function CandidatePersonalInfo() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
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
    }, [])

    const handleFirstname = useCallback(e => {
        let newValue = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        setFirstname(newValue);
    }, []);

    const handleLastname = useCallback(e => {
        let newValue = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        setLastname(newValue);
    }, []);

    const handleDob = useCallback(e => {
        setDob(e.target.value);
    }, []);

    const handleGender = useCallback(e => {
        setGender(e.target.value);
    }, []);

    const handleNin = useCallback(e => {
        let newValue = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        setNin(newValue);
    }, []);

    const handleCity = useCallback(e => {
        let newValue = e.target.validity.valid ? e.target.value : e.target.value.substr(0, e.target.value.length - 1);
        setCity(newValue);
    }, []);

    const handleAddress = useCallback(e => {
        setAddress(e.target.value);
    }, []);

    const handleLinkedin = useCallback(e => {
        setLinkedin(e.target.value);
    }, []);

    const handleMaritalstat = useCallback(e => {
        setMaritalstat(e.target.value);
    }, []);

    const handlePhone = useCallback(val => {
        console.log(val)
        setPhone(val);
    }, []);

    const url = 'http://192.168.0.128:8080/api/personal-information'

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
            phone: phone
        }

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
            })
            .catch(err => {
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
            <div className="main-container">
                <form className="form" onSubmit={onSubmit}>
                    {showAlert ? <AlertMessage showAlert={showAlert} setAlert={setShowAlert} alertType={alertType} message={message} /> : ''}
                    <Heading className="personal-info-heading" text="Personal Information" />
                    <InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' pattern="[a-zA-Z ]*" className='first-name-input' required='required' icon='fa-solid fa-user'></InputField>
                    <InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' pattern="[a-zA-Z ]*" className='last-name-input' required='required' icon='fa-regular fa-user'></InputField> <br />
                    <DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress' />
                    <DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} placeholder='Marital Status' icon='fa-solid fa-heart' /><br />
                    <InputField value={nin} handler={handleNin} type='text' pattern="[0-9]*" placeholder='CNIC/Nation ID' className='cnic-input' required='required' icon='fa-solid fa-address-card'></InputField>
                    <InputField value={dob} handler={handleDob} type='date' placeholder='' className='date-input' required='required' icon='fa-solid fa-calendar-days'></InputField> <br />
                    <InputField disabled={true} value={email} type='email' placeholder='Email' className='email-input' required='required' icon='fa-solid fa-envelope'></InputField> <br />
                    <PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='contact-input' required='required' />
                    <InputField value={city} handler={handleCity} type='text' placeholder='City' pattern="[a-zA-Z ]*" className='city-input' required='required' icon='ffa-sharp fa-solid fa-city'></InputField> <br />
                    <InputField value={address} handler={handleAddress} type='text' placeholder='Address' className='address-input' required='required' icon='fa-solid fa-location-dot'></InputField> <br />
                    <InputField value={linkedin} handler={handleLinkedin} type='url' placeholder='LinkedIn Profile' className='linkedin-input' required='required' icon='fa-brands fa-linkedin'></InputField> <br />
                    <Button disabled={disableNextBtn} text="Next" type="button" className='next-button' />
                    <Button type="submit" text="Save" className='save-button' />
                </form>
            </div>
        </>

    )
}

export default CandidatePersonalInfo;