import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value});
  };

  const registerHandler = async() => {
    try {
      const data = await request('/api/auth/register', {...form});
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async() => {
    try {
      const data = await request('/api/auth/login', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card white darken-1">
            <div className="card-content">
              <span className="card-title darken-1 center">car-data-management-application</span>

              <div>
                <div className="input-field">
                  <input id="email"
                         type="text"
                         name="email"
                         className="white-input"
                         value={
                           form.email
                         }
                         onChange={changeHandler}>
                  </input>

                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                  <input id="password"
                         type="password"
                         name="password"
                         className="white-input"
                         value={
                           form.password
                         }
                         onChange={changeHandler}>
                  </input>

                  <label htmlFor="email">Password</label>
                </div>

              </div>
            </div>
            <div className="card-action center">
              <button className="btn blue"
                      style={{
                        marginRight: 10
                      }}
                      onClick={loginHandler}
                      disabled={loading}>
                SIGN IN
              </button>

              <button className="btn blue"
                      onClick={registerHandler}
                      disabled={loading}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};
