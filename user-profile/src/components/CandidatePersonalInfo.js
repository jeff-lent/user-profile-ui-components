import { InputField } from "./InputField"
import './CandidatePersonalInfo.css'
export function CandidatePersonalInfo (){
    return (
        <div className="personal-info-main-container">
            <div className="inner-container">
             <InputField inputType={'text'} placeholder='placeholder text' className="small" icon="fa-solid fa-user"></InputField>
             <InputField inputType={'email'} placeholder='email text' className="large" icon="fa-solid fa-user"></InputField>
             </div>
        </div>

    )
}