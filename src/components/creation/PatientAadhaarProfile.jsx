import React, {useEffect, useState} from "react";
import './creation.scss';
import VerifyMobile from "./VerifyMobile";
import PatientDetails from "../patient-details/patientDetails";
import Footer from "./Footer";
const PatientAadhaarProfile = (props) => {
    const [proceed, setProceed] = useState(false);
    const [createABHAAddress, setCreateAbhaAdress] = useState(false);
    const patient = props.patient;
    const imgSrc = "data:image/jpg;base64," + patient.photo;
    const [mappedPatient,setMappedPatient] = useState({});
    const [isPatientMapped, setIsPatientMapped] = useState(false);
    const [setGoBack] = [props.setGoBack];
    const [back, goBack] = useState(false);

    function onClick(){
        setCreateAbhaAdress(true);
    }

    function onBack(){
        setGoBack(true);
    }

    function onProceed(){
        setProceed(true);
    }

    function mapPatient(){
        var identifier = patient?.phone !== undefined ? [{
            value: patient.phone
        }] : undefined;
        var address =  {
            line: [patient?.house,patient?.street, patient?.landmark, patient?.locality, patient?.villageTownCity, patient?.subDist].join(','),
            district: patient?.district,
            state: patient?.state,
            pincode: patient?.pincode
        };
        const ndhm = {
            healthNumber: patient.healthIdNumber,
            id: patient.healthId,
            gender: patient.gender,
            name: patient.name,
            isBirthDateEstimated: false,
            dateOfBirth: patient?.birthdate.split('-').reverse().join('-'),
            address: address,
            identifiers: identifier
        };
        console.log(ndhm);
        setMappedPatient(ndhm);
        setIsPatientMapped(true);
        return ndhm;
    }

    useEffect(() => {
        if(proceed) {
            setCreateAbhaAdress(true);
            setProceed(false);
        }
        console.log(back);
        if(back){
            setCreateAbhaAdress(false);
            setProceed(false);
            setIsPatientMapped(false);
            goBack(false);
        }
    },[proceed,back])

    return (
        <div>
            { console.log(back)}
            {!isPatientMapped && !proceed && !createABHAAddress &&
            <div>
                <div className="patient-profile">
                    <h3>Patient Profile</h3>
                    <img src={imgSrc} width="150" height="150" />
                    <div className="patient">
                        <p>Full Name:       {patient.name}</p>
                        <p>Gender:       {patient.gender}</p>
                        <p>DOB:       {patient.birthdate}</p>
                        {patient.healthIdNumber !== undefined && <p>
                            ABHA Number: {patient.healthIdNumber}
                        </p>}
                        {patient.healthId !== undefined && <p>
                            ABHA Address: {patient.healthId}
                        </p>}
                    </div>
                    {patient.healthIdNumber === undefined && patient.healthId === undefined && <Footer setProceed={setProceed} />}
                </div>
                {patient.healthIdNumber !== undefined && patient.healthId === undefined &&
                    <div>
                        <div className="buttons">
                            <button type="button" className="back" onClick={onBack}>Back</button>
                            <button type="button" className="proceed" onClick={onClick}>Create ABHA Address</button>
                            <button type="button" className="proceed" onClick={mapPatient}>Proceed without ABHA Address</button>
                        </div>
                    </div>
                }
            </div>}
            {createABHAAddress && <VerifyMobile setGoBack={goBack}/>}
            {isPatientMapped && <PatientDetails ndhmDetails={mappedPatient}/>}
        </div>
    );
}

export default PatientAadhaarProfile;