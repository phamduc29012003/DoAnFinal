import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const { setUpRecaptcha } = useUserAuth();
  const [flag,setFlag] = useState(false)
  const [confirmObj, setConfirmObj] = useState('')
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter valid Phone Number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response)
      setFlag(true)
    } catch (err) {
      setError(err.mesage);
    }
    console.log(number);
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp)
    if (otp === "" || otp === null ) return
    try {
        setError('')
        await confirmObj.confirm(otp)
        navigate("/home")
    } catch (err) {
        setError(err.mesage)
    }
  };
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Đăng nhập bằng điện thoại</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display: !flag ? "block" : 'none'}}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry="VN"
              value={number}
              onChange={setNumber}
              placeholder="Nhập số điện thoại của bạn"
            />
            <div id="recaptcha-container" />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Đóng</Button> &nbsp;
            </Link>
            <Button variant="primary" type="submit">
              Gửi OTP
            </Button>
          </div>
        </Form>
        <Form onSubmit={verifyOtp} style={{display: flag ? "block" : 'none'}}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control 
            type='otp' 
            placeholder = 'Nhập OTP'
            onChange ={(e)=>setOtp(e.target.value)}
              />
            </Form.Group>
            <div id="recaptcha-container" />
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Đóng</Button> &nbsp;
            </Link>
            <Button variant="primary" type="submit">
              Xác thực OTP
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;
