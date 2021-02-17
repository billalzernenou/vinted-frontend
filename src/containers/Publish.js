import axios from "axios";
import { useState } from "react";

// import DropFile from "../components/MyDropzone";
import { useHistory, Redirect } from "react-router-dom";
// import Dropzone from "react-dropzone";

const Publish = ({ token }) => {
  //controlled form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [picture, setPicture] = useState("");
  const [location, setLocation] = useState("");

  const [loadedImages, setLoadedImages] = useState();
  // roure states
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
        formData.append("size", size);
        formData.append("condition", condition);
        formData.append("color", color);
        formData.append("location", location);
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
  // handle events functions
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

    // URL.revokeObjectURL();
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
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
          type="number"
          value={price}
          onChange={(event) => {
            handlePriceChange(event);
          }}
        />
        <input
          placeholder="brand"
          type="text"
          value={brand}
          onChange={(event) => {
            handleBrandChange(event);
          }}
        />
        <input
          placeholder="size"
          type="text"
          value={size}
          onChange={(event) => {
            handleSizeChange(event);
          }}
        />
        <input
          placeholder="color"
          type="text"
          value={color}
          onChange={(event) => {
            handleColorChange(event);
          }}
        />
        <input
          placeholder="condition"
          type="text"
          value={condition}
          onChange={(event) => {
            handleConditionChange(event);
          }}
        />
        <input
          placeholder="location"
          type="text"
          value={location}
          onChange={(event) => {
            handleLocationChange(event);
          }}
        />
        <input
          placeholder="picture"
          type="file"
          onClick={(event) => {
            setLoadedImages(URL.createObjectURL(event.target.files[0]));
            console.log("dkljfqsldkfjsqdf");
          }}
          onChange={(event) => {
            handlePictureChange(event);
          }}
        />
        <div className="publish-loaded-image">
          <img src={loadedImages} alt={`${name}`} />
        </div>
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
