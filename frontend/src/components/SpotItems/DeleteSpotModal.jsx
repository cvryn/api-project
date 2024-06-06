import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { deleteSpot, getAllSpots } from "../../store/spotsReducer";

import './DeleteSpotModal.css'


const DeleteSpotModal = ({ spot, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  // console.log(' wooooooooooooooooooooo', spotId)

  // Async to delete the spot, then fetch the spots.
  // Modal closes after deleting the spot
  const handleDelete = async (e) => {
    e.preventDefault();

    // Dispatch deleteSpot action on spot associated with spotId
    await dispatch(deleteSpot(spotId));

    // Dispatch getAllSpots action to fetch the updated list of spots for the spotId
    await dispatch(getAllSpots());

    await closeModal();
  };

  return (
    <>
    <div id='delete-spot-modal'>
      <h1 style={{textAlign: 'center'}}> Confirm Delete</h1>

    <div className='delete-spot-confirmation'>
      <span >Are you sure you want to delete this spot from the listings?</span>
      <button onClick={handleDelete}
      className='delete-spot-modal-button-yes'>
        Yes (Delete Spot)
        </button>
      <button
      onClick={() => closeModal()}
      className='delete-spot-modal-button-no'>
        No (Keep Spot)
        </button>
       </div>
        </div>
    </>
  );
};

export default DeleteSpotModal;
