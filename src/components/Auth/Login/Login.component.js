
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from './../../../utils/toastr';
import axios from 'axios';
import { handleError } from '../../../utils/errorHandler';

const BASE_URL = 'http://localhost:8080/api'

const defaultForm = {
    username: '',
    password: ''
}
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false,
            remember_me: false
        }
    }

    componentDidMount() {
        var rememberMe = JSON.parse(localStorage.getItem('remember_me'));
        if (rememberMe) {
            this.props.history.push('/dashboard')
        }
    }


    onSubmit = (e) => {
        //notify.showInfo("login clicked")
        this.setState({
            isSubmitting: true
        })
        e.preventDefault();
        //console.log('form submit here',this.state)
        let isValidForm = this.validateForm()
        if (!isValidForm) return;

        //API call
        console.log(this.state.data)

        axios
            .post(`${BASE_URL}/auth/login`, this.state.data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                responseType: 'json'
            })
            .then((response) => {
                notify.showSuccess(`welcome ${response.data.user.username}`);
                //local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('remember_me', this.state.remember_me);

                //navigate to dashboard
                this.props.history.push('/dashboard')


                console.log('response is >>', response)
            })
            .catch(err => {
                handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })
        /*setTimeout(() =>{
            notify.showSuccess('Login Successfully')
            //once API response is ready
            //setup local storage
            localStorage.setItem('remember_me',JSON.stringify(this.state.remember_me));
            this.props.history.push('/home/broadway');
          
 
        },2000)*/


    }

    handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        // console.log('name >>', name);
        // console.log('value is >>', value)
        if (type === 'checkbox') {
            return this.setState({
                remember_me: checked
            })
        }

        this.setState(preState => ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), () => {
            if (this.state.error[name]) {
                this.validateForm()
            }
        })
    }




    validateForm = () => {
        let usernameErr = this.state.data['username'] ? '' : 'required field*'
        let passwordErr = this.state.data['password'] ? '' : 'required field*'

        this.setState({
            error: {
                username: usernameErr,
                password: passwordErr
            }
        })

        let validForm = !(usernameErr || passwordErr)

        return validForm;
    }



    render() {

        let btn = this.state.isSubmitting
            ? <button disabled className="btn btn-info m-t-10">Loading in...</button>
            : <button type="submit" className="btn btn-info m-t-10">Login</button>
        return (
            <div>
                <h2>Login</h2>
                <p>Please Login To Start Your Session</p>
                <form onSubmit={this.onSubmit} className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" value={this.state.username} name="username" id="username" onChange={this.handleChange} placeholder="Username"></input>
                    <p className="error">{this.state.error.username}</p>

                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={this.state.password} name="password" id="password" onChange={this.handleChange} placeholder="Password"></input>
                    <p className="error">{this.state.error.password}</p>

                    <input type="checkbox" name="remember_me" onChange={this.handleChange}></input>
                    <label> &nbsp;Remember Me</label>
                    <br></br>
                    {btn}


                </form>
                <p>Don't have an Account?</p>

                <p style={{ float: 'left' }}>Register <Link to="/register">here</Link></p>

                <p style={{ float: 'right' }}><Link to="/forgot-password">forgot password?</Link ></p>


            </div >
        )

    }
}
