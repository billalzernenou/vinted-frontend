import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-server.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);

        history.push("/");
      } else alert("unauthorized");
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
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required="true"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required="true"
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
