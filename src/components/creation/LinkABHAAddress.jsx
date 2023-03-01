import React, {useEffect, useState} from "react";
import './creation.scss';
import PatientDetails from "../patient-details/patientDetails";
import VerifyMobileEmail from "./VerifyMobileEmail";
import CreateABHAAddress from "./CreateABHAAddress";
import {getDate} from "../Common/DateUtil";
import {cmSuffix} from "../../api/constants";
import CheckIdentifierExists from "../Common/CheckIdentifierExists";

const LinkABHAAddress = (props) => {
    const patient = props.patient;
    const [abhaAddress, setAbhaAddress] = useState('');
    const [proceed, setProceed] = useState(false);
    const [link, setLink] = useState(false);
    const [createNewABHA, setcreateNewABHA] = useState(false);
    const [newAbhaAddress, setNewAbhaAddress] = useState('');
    const [abhaAddressCreated, setABHAAddressCreated]= useState(false);
    const [back, setBack] = useState(false);
    const [ABHAAlreadyExists, setABHAAlreadyExists] = useState(false);

    function onProceed() {
        mapPatient();
        setProceed(true);
    }

    let phrAddressList = patient.phrAddress !== undefined && patient.phrAddress.length > 0 && patient.phrAddress.map((item, i) => {
        return (
            <div>
                <button onClick={() => setAbhaAddress(patient.phrAddress[i])} className={abhaAddress === item ? "active" : "abha-list"}>{item}</button>
            </div>
        )
    });


    function mapPatient(){
        props.mappedPatient.id = abhaAddressCreated ? newAbhaAddress.concat(cmSuffix) : abhaAddress;
    }

    function gotoLink(){
        setLink(true);
    }

    function gotoCreate(){
        setcreateNewABHA(true);
    }

    useEffect(() => {
        if(abhaAddressCreated){
            onProceed();
        }
        if(back){
            setcreateNewABHA(false);
            setLink(false);
            setProceed(false);
            setAbhaAddress('');
            setNewAbhaAddress('');
            setABHAAddressCreated(false);
            setBack(false);
        }
    },[abhaAddressCreated, back])


    return (
        <div>
            {!createNewABHA && !link && !proceed &&
            <div>
                {patient.phrAddress === undefined &&
                <div className="no-abha-address">
                 <p className="note">No ABHA address found linked to the ABHA number</p>
                 <p className="note">Please proceed with linking the ABHA address that is already mapped to the mobile number or email, or create a new ABHA address.</p>
                </div>}
                {patient.phrAddress !== undefined &&
                <div>
                    <div className="choose-abha-address">
                        <div className="abha-list-label">
                            <label htmlFor="abha-address">Choose from existing ABHA Addresses</label>
                        </div>
                            {phrAddressList}
                    </div>
                    <CheckIdentifierExists id={abhaAddress} setABHAAlreadyExists={setABHAAlreadyExists} />
                    {abhaAddress !== '' && <div className="center">
                        <button type="button" disabled={ABHAAlreadyExists} className="proceed" onClick={onProceed}>Proceed</button>
                    </div>}
                </div>}
                <div className="left-button">
                    <button type="button" className="proceed" onClick={gotoLink}>Link ABHA Address</button>
                </div>

                <div className="right-button">
                    <button type="button" className="proceed" onClick={gotoCreate}>Create ABHA Address</button>
                </div>
            </div>}
            {!proceed && createNewABHA &&
             <CreateABHAAddress setBack={setBack} newAbhaAddress={newAbhaAddress} setNewAbhaAddress={setNewAbhaAddress} setABHAAddressCreated={setABHAAddressCreated} />
            }
            {link && <VerifyMobileEmail patient={patient} setBack={setBack} mappedPatient={props.mappedPatient}/>}
            {proceed && <PatientDetails ndhmDetails={props.mappedPatient} setBack={ !abhaAddressCreated ? setBack : undefined}/>}
        </div>
    );
}

export default LinkABHAAddress;