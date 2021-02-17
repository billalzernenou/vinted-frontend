import axios from "axios";
import { useState } from "react";

// import DropFile from "../components/MyDropzone";
import { useHistory, Redirect } from "react-router-dom";
// import Dropzone from "react-dropzone";

const Publish = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [picture, setPicture] = useState("");
  const History = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // const token = Cookies.get("userToken");
      if (token) {
        const formData = new FormData();
        formData.append("product_name", name);
        formData.append("product_price", price);
        formData.append("product_description", description);
        formData.append("picture", picture);
        formData.append("brand", brand);
        formData.append("size", "24");
        formData.append("condition", "qskldfhlqskd");
        formData.append("color", "qksjldq");
        formData.append("location", "kjhkljh");
        console.log(picture);

        const response = await axios.post(
          "https://vinted-server.herokuapp.com/offer/publish",
          formData,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          History.push(`/offer/${response.data._id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };
  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
    // console.log(event);
  };
  return token ? (
    <div className="publish-offer-form">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={(event) => {
            handleNameChange(event);
          }}
        />

        <textarea
          placeholder="description"
          type="textarea"
          value={description}
          onChange={(event) => {
            handleDescriptionChange(event);
          }}
        ></textarea>
        <input
          placeholder="price"
          type="text"
          value={price}
          onChange={(event) => {
            handlePriceChange(event);
          }}
        />
        <input
          placeholder="brand"
          type="brand"
          value={brand}
          onChange={(event) => {
            handleBrandChange(event);
          }}
        />
        <input
          placeholder="picture"
          type="file"
          onChange={(event) => {
            handlePictureChange(event);
          }}
        />
        {/* <Dropzone onDrop={this.handlePictureChange}>
          Drop your file here
        </Dropzone> */}
        <button type="submit">Publier</button>
      </form>
    </div>
  ) : (
    <Redirect to={{ pathname: "login", state: { fromPublish: true } }} />
  );
};

export default Publish;
