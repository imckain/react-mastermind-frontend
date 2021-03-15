import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../services/userService'

function SignupForm (props) {

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  });

  function handleChange(e) {
    props.updateMessage('');
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      await signup(formState);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      props.updateMessage(err.message);
    }
  }

  function isFormInvalid() {
    return !(formState.name && formState.email && formState.password === formState.passwordConf);
  }
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={handleSubmit} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="Name" value={formState.name} name="name" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" placeholder="Email" value={formState.email} name="email" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Password" value={formState.password} name="password" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="password" className="form-control" placeholder="Confirm Password" value={formState.passwordConf} name="passwordConf" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default" disabled={isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SignupForm;
