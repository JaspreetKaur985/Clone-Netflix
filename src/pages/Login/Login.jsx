import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase'; // your firebase auth functions
import loader_spinner from '../../assets/loader_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userAuth = async (event) => {
    event.preventDefault();
    setError(null);

    if (signState === "Sign Up" && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="login-spinner">
          <img src={loader_spinner} alt="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className='login'>
        <img src={logo} className='login-logo' alt="Netflix Logo" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={userAuth}>
            {signState === "Sign Up" && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                autoComplete="name"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              autoComplete="email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              autoComplete={signState === "Sign In" ? "current-password" : "new-password"}
            />
            <button disabled={loading} type='submit'>{signState}</button>
            {error && <p className="error-msg">{error}</p>}

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          <div className='form-switch'>
            {signState === "Sign In" ? (
              <p>
                New to Netflix?{' '}
                <span onClick={() => setSignState("Sign Up")} className="switch-link">
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span onClick={() => setSignState("Sign In")} className="switch-link">
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = `
.login {
  height: 100vh;
  background-image: linear-gradient(#0000007e, #0000007e), url(/background_banner.jpg);
  padding: 20px 8%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.login-logo {
  width: 150px;
  margin-bottom: 20px;
  object-fit: contain;
}

.login-form {
  width: 100%;
  max-width: 450px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 60px 40px;
  margin: auto;
  box-sizing: border-box;
}

.login-form h1 {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 28px;
}

.login-form input {
  width: 100%;
  height: 50px;
  background: #333;
  color: white;
  margin: 12px 0;
  border: 0;
  outline: 0;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;
}

.login-form input::placeholder {
  font-size: 16px;
  font-weight: 500;
  color: #ccc;
}

.login-form button {
  width: 100%;
  border: 0;
  outline: 0;
  padding: 16px;
  background: #e50914;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 25px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-form button:disabled {
  background: #a00d0d;
  cursor: not-allowed;
}

.login-form button:hover:not(:disabled) {
  background: #f6121d;
}

.error-msg {
  color: #ff4d4f;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
}

.form-help {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b3b3b3;
  font-size: 13px;
  margin-top: 15px;
}

.remember {
  display: flex;
  align-items: center;
  gap: 5px;
}

.remember input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.remember label {
  cursor: pointer;
}

.form-switch {
  margin-top: 30px;
  font-size: 14px;
  text-align: center;
}

.switch-link {
  margin-left: 6px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

.login-spinner {
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-spinner img {
  width: 60px;
}

@media(max-width: 500px) {
  .login {
    padding: 15px 5%;
  }
  .login-form {
    padding: 20px;
    margin-top: 30px;
  }
}
`;

export default Login;
