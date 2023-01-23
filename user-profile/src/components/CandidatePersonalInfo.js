import DropdownField from "./DropdownField";
import { InputField } from "./InputField"
import './InputField.css';
import { PhoneContact } from "./PhoneContact";
export function CandidatePersonalInfo() {
    return (

        <div className="main-container">
            <div className="form">
                <h2 className="personal-info-heading">Personal Information</h2>
                <InputField inputType={'text'} input_field="first-name" placeholder='First Name' className='first-name-input' required='required' icon='fa-solid fa-user'></InputField>
                <InputField inputType={'text'} input_field="last-name" placeholder='Last Name' className='last-name-input' required='required' icon='fa-regular fa-user'></InputField> <br />
                <DropdownField options={['Male', 'Female']} placeholder='Gender' icon='fa-sharp fa-solid fa-person-dress'/>
                <DropdownField options={['Single', 'Married']} placeholder='Marital Status' icon='fa-solid fa-heart'/><br />
                <InputField inputType={'text'} input_field="cnic-input" placeholder='CNIC/Nation ID' className='cnic-input' required='required' icon='fa-solid fa-address-card'></InputField>
                <InputField inputType={'date'} input_field="date" placeholder='' className='date-input' required='required' icon='fa-solid fa-calendar-days'></InputField> <br />
                <InputField inputType={'email'} input_field="email" placeholder='Email' className='email-input' required='required' icon='fa-solid fa-envelope'></InputField> <br />
                <PhoneContact placeholder='Mobile Number' type='text' name='contact' className='contact-input' required='required' />
                <InputField inputType={'text'} input_field="city" placeholder='City' className='city-input' required='required' icon='ffa-sharp fa-solid fa-city'></InputField> <br />
                <InputField inputType={'text'} input_field="address" placeholder='Address' className='address-input' required='required' icon='fa-solid fa-location-dot'></InputField> <br />
                <InputField inputType={'text'} input_field="linkedin" placeholder='LinkedIn Profile' className='linkedin-input' required='required' icon='fa-brands fa-linkedin'></InputField> <br />
            </div>
        </div>

    )
}