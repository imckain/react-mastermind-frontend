import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/userService'
import './LoginPage.css';

function LoginPage(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      await login(formState);
      props.handleSignupOrLogin();
      props.history.push('/');
    } catch (err) {
      alert('Invalid Credentials');
    }
  }

  return (
    <div className="LoginPage">
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formState.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formState.password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
