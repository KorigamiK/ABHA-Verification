import React, {useState} from "react";
import './creation.scss';
import VerifyOTP from "./verifyOtp";
import Spinner from "../spinner/spinner";

const VerifyMobile = () => {
    const [id, setId] = useState('');
    const [loader, setLoader] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [error, setError] = useState('');

    function idOnChangeHandler(e) {
        setId(e.target.value);
        setError('');
        setShowOtpInput(false);
    }

    function onVerify(){
        if(id === ''){
            setError("Mobile number cannot be empty")
        }
        else{
            setLoader(true);
            //make service call
            //setLoader false once received response showOtpInupt to true
            //check if any error from call if so setError
        }
    }

    return (
        <div>
            <div className="mobile">
                <label htmlFor="mobile" className="label">Enter Mobile Number</label>
                <div className="verify-mobile-input-btn">
                    <div className="verify-mobile-input">
                        <input type="text" id="mobile" name="mobile" value={id} onChange={idOnChangeHandler} />
                    </div>
                    <button name="verify-btn" type="submit" onClick={onVerify}>Verify</button>
                </div>
            </div>
            {error !== '' && <h6 className="error">{error}</h6>}
            <div className="message">This number will be used to authenticate your ABHA Number.
                It is recommended to use your AADHAAR linked mobile number
            </div>
            {loader && <Spinner />}
            {showOtpInput && <VerifyOTP />}
        </div>
    );
}


export default VerifyMobile;
