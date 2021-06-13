import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { notify } from '../../../utils/toastr';

const defaultForm = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    temporaryAddress: '',
    permanentAddress: '',
}

const errorFields = {
    username: false,
    password: false,
    email: false,
    confirmPassword: false
}

export class Register extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm

            },
            error: {
                ...errorFields

            },
            isValidForm: false,
            isSubmitting: false,
            //chapter: 0

        }

        console.log('constructor at first')

    }

    componentDidMount() {
        // it will be invoked only once
        //console.log('i will be self invoked once component is fully loaded')
        // purpose
        // data preparation
        // ====> API call
        // state modification
        /*let i = 0;
        this.interval = setInterval(() => {
            i++;
            this.setState({
                chapter: i
            })
        }, 1000)  */

    }


    /*componentDidUpdate(preProps, preState) {
       // console.log('prevState >>', preState.data)
       // console.log('current state >>', this.state.data)
        //     // console.log('once state or props is changed')
        //     // check difference and perfrom necessary actions
    }  */

    componentWillUnmount() {
        console.log('once usage is over');
        // clearInterval(this.interval)
    }


    //submit button handle garney code
    handleSubmit = e => {
        notify.showError('show error')
        e.preventDefault();

        const isValidForm = this.validateRequiredFields();
        if (!isValidForm) {
            return;
        }

        //check weather required field are filled or not
        this.setState({
            isSubmitting: true
        })
        //data is ready 
        //API CALL 
        setTimeout(() => {
            this.setState({
                isSubmitting: false
            })
        }, 3000)
    }

    onChange = e => {
        let { name, value } = e.target;
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            // console.log('this.state is>>', this.state)
            this.validateForm(name)
        })
    }
    //doing form validation
    validateForm = (fieldName) => {
        let errMsg;
        switch (fieldName) {
            case 'username':
                errMsg = this.state.data[fieldName]
                    ? ''
                    : 'required field*';
                break;

            case 'password':
                errMsg = this.state.data[fieldName]
                    ? this.state.data['confirmPassword']
                        ? this.state.data['confirmPassword'] === this.state.data[fieldName]
                            ? ''
                            : 'password did not match'
                        : this.state.data[fieldName].length > 6
                            ? ''
                            : 'weak password'
                    : 'required field*'
                break;
            case 'confirmPassword':
                errMsg = this.state.data[fieldName]
                    ? this.state.data['password']
                        ? this.state.data['password'] === this.state.data[fieldName]
                            ? ''
                            : 'password did not match'
                        : this.state.data[fieldName].length > 6
                            ? ''
                            : 'weak password'
                    : 'required field*'
                break;

            case 'email':
                errMsg = this.state.data[fieldName]
                    ? this.state.data[fieldName].includes('@') && this.state.data[fieldName].includes('.com')
                        ? ''
                        : 'invalid email'
                    : 'required field*'
                break;

            default:
                break;
        }
        this.setState(preState => ({
            error: {
                ...preState.error,
                [fieldName]: errMsg
            }
        }), () => {
            const errors = Object
                .values(this.state.error)
                .filter(err => err);
            console.log('errors is >>', errors)
            this.setState({
                isValidForm: errors.length === 0
            })
        })
    }


    validateRequiredFields = () => {
        let validForm = true;
        let usernameErr = false;
        let passwordErr = false;
        let confirmPasswordErr = false;
        let emailErr = false;

        if (!this.state.data.username) {
            validForm = false
            usernameErr = 'required field*';
        }
        if (!this.state.data.password) {
            validForm = false
            passwordErr = 'required field*';
        }
        if (!this.state.data.confirmPassword) {
            validForm = false
            confirmPasswordErr = 'required field*';
        }
        if (!this.state.data.email) {
            validForm = false
            emailErr = 'required field*';
        }

        this.setState({
            error: {
                username: usernameErr,
                password: passwordErr,
                confirmPassword: confirmPasswordErr,
                email: emailErr
            }
        })

        return validForm;
    }




    render() {

        console.log('render at second')
        let btn = this.state.isSubmitting
            ? <button disabled className="btn btn-info m-t-10">submitting...</button>
            : <button disabled={!this.state.isValidForm} type="submit" className="btn btn-info m-t-10">submit</button>

        return (
            < div >

                <h2>Register</h2>
                {/*} <p>Current Chapter:{this.state.chapter}</p>  */}
                <p>please provide necessary detail</p>
                <form className='form-group' onSubmit={this.handleSubmit} noValidate >
                    <label>Name</label>
                    <input type='text' className="form-control" name='name' placeholder='Name' onChange={this.onChange}></input>
                    <label>Username</label>
                    <input type='text' className="form-control" name='username' placeholder='Username' onChange={this.onChange}></input>
                    <p className="error">{this.state.error.username && this.state.error.username}</p>

                    <lable>Password</lable>
                    <input type='password' className="form-control" name='password' placeholder='Password' onChange={this.onChange}></input>
                    <p className="error">{this.state.error.password && this.state.error.password}</p>


                    <lable>Confirm Password</lable>
                    <input type='password' className="form-control" name='confirmPassword' placeholder='Confirm Password' onChange={this.onChange}></input>
                    <p className="error">{this.state.error.confirmPassword && this.state.error.confirmPassword}</p>


                    <lable>Email</lable>
                    <input type="text" className="form-control" name='email' placeholder='Email' onChange={this.onChange}></input>
                    <p className="error">{this.state.error.email && this.state.error.email}</p>

                    <label>Phone Number</label>
                    <input type='number' className="form-control" name='phoneNumber' onChange={this.onChange}></input>
                    <lable>Gender</lable>
                    <br></br>
                    <input type="radio" value="male" name="gender" onChange={this.onChange} /> Male
                    <input type="radio" value="female" name="gender" onChange={this.onChange} /> Female
                    <input type="radio" value="others" name="gender" onChange={this.onChange} /> Others
                    <br></br>
                    <lable>D.O.B</lable>
                    <input type='date' className="form-control" name='dob' onChange={this.onChange}></input>
                    <lable>Temporary Address</lable>
                    <input type='text' className="form-control" name='temporaryAddress' placeholder='Temporary Address' onChange={this.onChange}></input>
                    <lable>Permanent Address</lable>
                    <input type='text' className="form-control" name='permanentAddres' placeholder='Permanent Address' onChange={this.onChange}></input>
                    {btn}



                </form>
                <p>Already Register? <Link to="/">back to login</Link></p>
            </ div>
        )
    }


}