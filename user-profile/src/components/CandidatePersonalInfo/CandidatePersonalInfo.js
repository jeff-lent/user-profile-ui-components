import { useState, useCallback, useEffect } from "react";
import DropdownField from "../DropdownField/DropdownField";
import InputField from "../InputField/InputField"
import PhoneComponent from "../PhoneComponent/PhoneComponent";
import Button from "../Button/Button";
import Heading from "../Heading/Heading";
import "./CandidatePersonalInfo.css";


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
        console.log(data)

        const response = await fetch(url, {
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
        });
        console.log(response, response.body);
    }

    const goToNextPage = () => {
        alert('next Page');
    }

    return (

        <div className="main-container">
            <form className="form" onSubmit={onSubmit}>
                <div className="inner-container">
                <Heading className="personal-info-heading" text="Personal Information"/>
                <InputField value={firstname} handler={handleFirstname} type='text' placeholder='First Name' className='first-name-input' required='required' icon='fa-solid fa-user' cnic_field={false}></InputField>
                <InputField value={lastname} handler={handleLastname} type='text' placeholder='Last Name' className='last-name-input' required='required' icon='fa-regular fa-user' cnic_field={false}></InputField> <br />
                <DropdownField value={gender} handler={handleGender} options={['Male', 'Female']} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress'  cnic_field={false}/>
                <DropdownField value={maritalstat} handler={handleMaritalstat} options={['Single', 'Married']} placeholder='Marital Status' icon='fa-solid fa-heart'  cnic_field={false}/><br />
                <InputField value={nin} handler={handleNin} type='text' placeholder='CNIC/Nation ID' className='cnic-input' required='required' icon='fa-solid fa-address-card' cnic_field={true}></InputField>
                <InputField value={dob} handler={handleDob} type='date' placeholder='' className='date-input' required='required' icon='fa-solid fa-calendar-days' cnic_field={false}></InputField> <br />
                <InputField disabled={true} value={email} type='email' placeholder='Email' className='email-input' required='required' icon='fa-solid fa-envelope' cnic_field={false}></InputField> <br />
                <PhoneComponent value={phone} handler={handlePhone} placeholder='Mobile Number' type='text' className='contact-input' required='required'  cnic_field={false}/>
                <InputField value={city} handler={handleCity} type='text' placeholder='City' className='city-input' required='required' icon='ffa-sharp fa-solid fa-city' cnic_field={false}></InputField> <br />
                <InputField value={address} handler={handleAddress} type='text' placeholder='Address' className='address-input' required='required' icon='fa-solid fa-location-dot' cnic_field={false}></InputField> <br />
                <InputField value={linkedin} handler={handleLinkedin} type='text' placeholder='LinkedIn Profile' className='linkedin-input' required='required' icon='fa-brands fa-linkedin' cnic_field={false}></InputField> <br />
                <Button type="submit" text="Save" className='save-button'/>
                </div>
            </form>
            
                <Button onClick={goToNextPage} disabled={false} text="Next" className='next-button' />
                
                
        </div>

    )
}

export default CandidatePersonalInfo;