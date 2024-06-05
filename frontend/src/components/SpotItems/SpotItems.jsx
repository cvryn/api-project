import { Link } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";

import "./SpotItems.css";

const SpotItems = ({ spot }) => {
  // console.log(spot);

  return (
    <>
      <div
        // data-tooltip-id="my-tooltip"
        // data-tooltip-content={spot.name}
        // data-tooltip-place="bottom"
      >
        <div id="spots-container" title={spot.name}>
          <Link to={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
            {/* <div className="spot-container"> */}
            <div className="spot-image-container">
              <img className="spots-image" src={spot.previewImage} />
            </div>

            <div className="spot-text-container">
              <div className="spot-text">
                {/* <a href="#" class='spot-titles'>{spot.name}</a> */}
                {/* <div class="spot-titles">{spot.name}</div> */}
                <div className="location-text">
                  {spot.city}, {spot.state}
                </div>
                <div className="price">
                  ${spot.price} <span className="price-span">night</span>
                </div>
              </div>
              <div className="rating">
                <TiStarFullOutline />{" "}
                {isNaN(spot.avgRating) || spot.avgRating === undefined
                  ? "New"
                  : spot.avgRating}{" "}
                {isNaN(spot.avgRating) || spot.avgRating === undefined
                  ? ""
                  : ""}{" "}
                {spot.numReviews === 1
                  ? "1 review"
                  : spot.numReviews > 1
                  ? `${spot.numReviews} reviews`
                  : ""}
              </div>
              {/* </div> */}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SpotItems;
