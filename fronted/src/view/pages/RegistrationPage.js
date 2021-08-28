import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerWakanda } from "../../actions";
import { Redirect } from "react-router-dom";

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const { wakandaRegister, data, error } = useSelector((state) => state.wakandaReducer);
    const [wakandaAddress, setWakandaAddress] = useState("");
    
    function onWakandaAddressChange(e) {
        setWakandaAddress(e.currentTarget.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(registerWakanda(wakandaAddress));
    }

    if(wakandaRegister){
        return <Redirect to="/voting" />
    }

    return (
        <>
        <div className = "c-app c-default-layout flex-row align-items-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="area">Regestration page</Form.Label>
                    <Form.Control type="text" name="wakandaAddress" value={wakandaAddress} required onChange={(e) => onWakandaAddressChange(e)} />
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit">
                    Register   
                    </Button>
                </Form.Group>
            </Form>
        </div>
        {error && error !== "" ? error : ""}
        {data && data.reason ? data.reason : ""}
        </>
    );
};

export default RegistrationPage;