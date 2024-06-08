import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewSpot } from "../../store/spotsReducer";
import "./CreateNewSpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});
  const [visualErrors, setVisualErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    const newVisualErrors = {};

    // Validations
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (description.length < 30)
      newErrors.description = "Description needs a minimum of 30 characters";
    if (price < 1) newErrors.price = "Price is required";
    if (lat < -90 || lat > 90)
      newErrors.lat = "Latitude must be between -90 and 90";
    if (lng < -180 || lng > 180)
      newErrors.lng = "Longitude must be between -180 and 180";

    const checkImageUrl = (url) =>
      url &&
      (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"));

    if (previewImage && !checkImageUrl(previewImage))
      newErrors.previewImage =
        "Preview image is required and must end in .png, .jpg, or .jpeg";

    if (image1 && !checkImageUrl(image1))
      newVisualErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image2 && !checkImageUrl(image2))
      newVisualErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image3 && !checkImageUrl(image3))
      newVisualErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image4 && !checkImageUrl(image4))
      newVisualErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(newErrors);
    setVisualErrors(newVisualErrors);

    return (
      Object.keys(newErrors).length === 0 &&
      Object.keys(newVisualErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();

    if (isValid) {
      const newSpot = {
        address,
        city,
        state,
        country,
        name,
        price,
        description,
        lat,
        lng,
      };

      const response = await dispatch(
        createNewSpot(newSpot, previewImage, [image1, image2, image3, image4])
      );
      if (response && response.id)
        console.log('Reponse: ', response)
      console.log('ReponseID: ', response.id)

        navigate(`/spots/${response.id}`);
    }
  };

  return (
    <>
   {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}

<button
        className="demo-user-modal-button"
        type="submit"
        onClick={() => {
          setAddress("1");
          setCity("1");
          setState("1");
          setCountry("1");
          setName("1");
          setDescription(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          );
          setPrice(1);
          setLat(1);
          setLng(1);
          setPreviewImage(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481289/catbnb/Cat%27s%20Corner.png"
          );
          setImage1(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481395/catbnb/8-PxeIe9RIpGvMIqY_m3gyf8.png"
          );
          setImage2(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481451/catbnb/8-VHGdSOckSozju5k_q3y8ax.png"
          );
          setImage3(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717386122/catbnb/r-cat-manor_uesoqf.png"
          );
        }}
      >
        {" "}
        Demo Spots
      </button>


      <button
        className="demo-user-modal-button"
        type="submit"
        onClick={() => {
          setAddress(" ");
          setCity(" ");
          setState(" ");
          setCountry(" ");
          setName(" ");
          setDescription(
            "Lore"
          );
          setPrice(1);
          setLat(1);
          setLng(1);
          setPreviewImage(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482655/catbnb/8-ATANKZhXomcJ7Tc_rqhse8.png"
          );
          setImage1(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481451/catbnb/8-VHGdSOckSozju5k_q3y8ax.png"
          );
          setImage2(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481395/catbnb/8-PxeIe9RIpGvMIqY_m3gyf8.png"
          );
        }}
      >
        {" "}
        Demo Blank Spot Tester
      </button>


      <form onSubmit={handleSubmit} id="create-spot-form-container">
        <div id="spot-form-container">
          <header>
            <h2>Create a new Spot</h2>
            <h3>Where&apos;s your place located?</h3>
            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
          </header>

          {/* // Section 1 */}
          <section id="form-country-street-city-state">
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Country
                <div className="errors-object">
                  {errors.country && <p>{errors.country}</p>}
                </div>
              </div>
              <input
                style={{ width: "100%" }}
                type="text"
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Street Address
                <div className="errors-object">
                  {errors.address && <p>{errors.address}</p>}
                </div>
              </div>
              <input
                style={{ width: "100%" }}
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <label className="city-state-input">
              <div className="city-input" style={{ width: "60%" }}>
                <div className="create-spot-key-input">
                  City
                  <div className="errors-object">
                    {errors.city && <p>{errors.city}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="text"
                  value={city}
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>
              <div className="state-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  State
                  <div className="errors-object">
                    {errors.state && <p>{errors.state}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={state}
                  placeholder="STATE"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </label>
            <label className="lat-lng-input">
              <div className="lat-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Latitude
                  <div className="errors-object">
                    {errors.lat && <p>{errors.lat}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="number"
                  value={lat}
                  placeholder="Latitude"
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>
              <div className="lng-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Longitude
                  <div className="errors-object">
                    {errors.lng && <p>{errors.lng}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  value={lng}
                  placeholder="Longitude"
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
            </label>
          </section>

          <hr />

          <header>
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </header>

          <label id="description-label" className="description-input">
            <textarea
              style={{ width: "100%" }}
              type="text"
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="errors-object">
              {errors.description && <p>{errors.description}</p>}
            </div>
          </label>

          <hr />

          <header>
            <h2>Create a title for your spot</h2>
            <p>
              Catch guests&apos; attention with a spot title that highlights what
              makes your place special.
            </p>
          </header>

          <label className="name-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="errors-object">
              {errors.name && <p>{errors.name}</p>}
            </div>
          </label>

          <hr />

          <header>
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </header>

          <label className="price-input">
            <div className="price-icon-input">
              $
              <input
                style={{ width: "95%" }}
                type="number"
                value={price}
                placeholder="Price per night (USD)"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="errors-object">
              {errors.price && <p>{errors.price}</p>}
            </div>
          </label>

          <hr />

          <header>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
          </header>

          <label className="image-input">
            <div className="create-spot-key-input">
              Preview Image URL
              <div className="errors-object">
                {errors.previewImage && <p>{errors.previewImage}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="url"
              value={previewImage}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
          </label>
          <label className="image-input">
            <div className="create-spot-key-input">
              Image URL
              <div className="errors-object">
                {visualErrors.image1 && <p>{visualErrors.image1}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="url"
              value={image1}
              placeholder="Image URL"
              onChange={(e) => setImage1(e.target.value)}
            />
          </label>
          <label className="image-input">
            <div className="create-spot-key-input">
              Image URL
              <div className="errors-object">
                {visualErrors.image2 && <p>{visualErrors.image2}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="url"
              value={image2}
              placeholder="Image URL"
              onChange={(e) => setImage2(e.target.value)}
            />
          </label>
          <label className="image-input">
            <div className="create-spot-key-input">
              Image URL
              <div className="errors-object">
                {visualErrors.image3 && <p>{visualErrors.image3}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="url"
              value={image3}
              placeholder="Image URL"
              onChange={(e) => setImage3(e.target.value)}
            />
          </label>
          <label className="image-input">
            <div className="create-spot-key-input">
              Image URL
              <div className="errors-object">
                {visualErrors.image4 && <p>{visualErrors.image4}</p>}
              </div>
            </div>
            <input
              style={{ width: "100%" }}
              type="url"
              value={image4}
              placeholder="Image URL"
              onChange={(e) => setImage4(e.target.value)}
            />
          </label>

          <hr></hr>

          <button id="create-update-spot-button" type="submit">
            Create Spot
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateSpotForm;
