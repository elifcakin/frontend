import React, { Component } from 'react';
import Input from '../components/Input';
import {withTranslation} from 'react-i18next';
import { login } from '../api/apiCalls';
import axios from 'axios';

class LoginPage extends Component {

    state = {
        username: null,
        password: null,
        error: null,
        pendingApiCall: false
    };

    componentDidMount() {
        axios.interceptors.request.use(function (request) {

        })
    }


    onChangePassword = event => {
        const {name, value} = event.target.value;
        this.setState({
            [name]: value,
            error: null
        });
        this.state.password=event.target.value;

    };

    onChangeName= event => {
        const {name, value} = event.target.value;
        this.setState({
            [name]: value,
            error: null
        });
        this.state.username=event.target.value;
    };

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        };
        this.setState({
            error: null
        })
        try {

           await login(creds) 
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }

    };
 
    render() {
        const { t } = this.props;
        const { username, password, error  } = this.state;
        const buttonEnabled = username && password;
    
        return (
            
               <div className = "container"> 
              <form> 
                <h1 className="text-center">{t('Login')}</h1> 
                <Input name = "Username"  label={t("Username")} onChange={this.onChangeName}/>
                <Input name = "Password"  label={t("Password")} onChange={this.onChangePassword} type= "password" />
                {error && <div className="alert alert-danger" >{error}</div>}
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickLogin} disabled={!buttonEnabled} >
                         {t('Login')} 
                    </button>
                </div>
              </form>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);