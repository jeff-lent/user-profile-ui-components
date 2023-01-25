import './AlertMessage.css'
export function AlertMessage({showAlert , setAlert, alertType, message}) {
    return (
        <>
            <div class='alert' id={alertType}> 
                <span role='button' class="closebtn" onClick={() => setAlert(!showAlert)}>&times;</span>
               {message && message}
            </div>
        </>
    )
}