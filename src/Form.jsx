import React, {useState} from "react";
import './App.css';
import formImage from './assets/formImage.png';


function Form() {  
  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('');
  const [number, setNum] = useState('')
  const [isChecked, setIsChecked] = useState(false);

  
  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [checkboxError, setCheckboxError] = useState('');

  function validateForm() {
      let isValid = false
    if(name.length === 0){
      setNameError("Field is required");
      isValid = true;
    } else {
      setNameError('');
    }

    if(username.length === 0){
      setUsernameError("Field is required");
      isValid = true;
    } else {
      setUsernameError('');
    }

    if(email.length === 0){
      setEmailError("Field is required");
      isValid = true;
    } else {
      setEmailError('');
    }

    if(number.length === 0){
      setNumberError("Field is required");
      isValid = true;
    } else {
      setNumberError('');
    }

    if(!isChecked){
      setCheckboxError("Check this box if you want to proceed");
      isValid = true;
    } else {
      setCheckboxError('');
    }

    if(!isValid){
      const formData = {
        name,
        username,
        email,
        number,
        isChecked,
      };
  
      localStorage.setItem('formData', JSON.stringify(formData));
    }
  }

    return (
      <div className="form_container">
       <div className="form_left_container">
        <img src={formImage} alt="formImage" className="formImage"></img>
        <div className="textBox">
        <p className="text">Discover new things on Superapp</p>
        </div>
       </div>
       <div className="form_right_container">
            <p className="form_heading">Super app</p>
            <p className="create">Create your new account</p> <br />       
            <form>
              <input type="text" placeholder="Name" className="name" onChange={(e) => setName(e.target.value)}/>
              <p className="required">{nameError}</p> 
              <input type="text" placeholder="Username" className="name" onChange={(e) => setUserName(e.target.value)} />
              <p className="required">{usernameError}</p> 
              <input type="email" placeholder="Email" className="name" onChange={(e) => setEmail(e.target.value)} />
              <p className="required">{emailError}</p>   
              <input type="number" placeholder="Mobile" className="name"  onChange={(e) => setNum(e.target.value)}/>
              <p className="required">{numberError}</p> 
              <div className="registration_data">
              <input type="checkbox" className="checkBox" onChange={(e) => setIsChecked(e.target.checked)}/>
              <p className="share">Share my registration data with Superapp</p>
              </div>
              <p className="required">{checkboxError}</p> 
            </form> <br />
            <button className="sign_up" onClick={() => validateForm()}>SIGN UP</button><br />
            <p className="tc">By clicking on Sign up. you agree to Superapp <span style={{ color: '#72DB73' }}>Terms and Conditions</span></p><br />
            <p className="pp">To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span style={{ color: '#72DB73' }}>Privacy Policy</span></p>
       </div>
      </div>
    );
  }
  
  export default Form;

