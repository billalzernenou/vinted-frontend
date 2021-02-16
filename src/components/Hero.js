import image from "../images/vinted-caro.jpg";
const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        height: "465px",
        maxWidth: "100%",
        backgroundPositionX: "center",
        backgroundPositionY: "20%",
        backgroundPosition: "50%",
        backgroundSize: "cover",
      }}
      className="hero"
    ></div>
  );
};

export default Hero;
