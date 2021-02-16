import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-server.herokuapp.com/user/signup",
        { username: username, email: email, phone: phone, password: password }
      );
      console.log(response);
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/publish");
      } else {
        alert("unauthorized");
      }
    } catch (error) {
      console.log({ message: error });
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Signup;
