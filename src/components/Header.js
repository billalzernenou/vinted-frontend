import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useHistory } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  const History = useHistory();
  const handleLogout = () => {
    setUser(null);
    History.push("/login");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo-vinted" />
        </Link>
      </div>
      <div className="header-buttons-container">
        {!userToken && (
          <>
            <Link to="/signup">
              <button className="header-buttons sign-in-button">
                S'inscrire
              </button>
            </Link>
            <Link to="/login">
              <button className="header-buttons login-button">
                Se connecter
              </button>
            </Link>
          </>
        )}

        {userToken && (
          <button
            onClick={handleLogout}
            className="header-buttons login-button"
          >
            Se déconnecter
          </button>
        )}

        <Link to="/">
          <button className="explore-button header-buttons">
            Vends tes articles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
