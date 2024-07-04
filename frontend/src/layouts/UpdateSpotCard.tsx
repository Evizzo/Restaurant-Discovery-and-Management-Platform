import { Link } from "react-router-dom";
import ShowStarRating from "../components/ShowStarRating"; 
import { deleteSpot } from "../api/ApiService";
import { Alert } from "react-bootstrap";

const UpdateSpotCard = (props: { 
  img: string; 
  nameOfSpot: string; 
  locationOfSpot: string; 
  spotId: string; 
  workingFrom: string; 
  workingTo: string;
  rating: number; 
  approved: boolean;
  reloadData: () => void;
}) => {
  const handleDeleteSpot = async (spotId: string) => {
    try {
      await deleteSpot(spotId);
      props.reloadData();
    } catch (error: any) {
      Alert(error.data.message)
    }
  };

  const workingHours = props.workingFrom && props.workingTo 
    ? `${props.workingFrom} - ${props.workingTo}` 
    : "24/7";

  return (
    <div 
      className="block w-full lg:w-64 bg-opacity-30 backdrop-filter backdrop-blur-lg bg-white p-3 rounded-lg m-2 relative" 
      style={{ 
        width: '250px', 
        height: '360px', 
        overflow: 'hidden'
      }}
    >
      <Link to={`/edit-spot/${props.spotId}`}>
        <div className="relative">
          <img className="rounded-lg w-full h-48 object-cover" src={props.img} alt="img" />
        </div>
        <h3 className="font-semibold text-white" style={{ 
          marginBottom: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {props.nameOfSpot}
        </h3>
        <div style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          <p className="text-white">{props.locationOfSpot}</p>
          <p className="text-white">Radno vreme: {workingHours}</p>
        </div>
        <ShowStarRating
          key={props.rating}
          maxStars={5}
          initialRating={props.rating}
        />
      </Link>
      <p className="text-white">Status: {props.approved ? "Vidljivo" : "Nije vidljivo"}</p>
      <button
        onClick={() => handleDeleteSpot(props.spotId)}
        className="absolute bottom-1 right-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full focus:outline-none"
      >
        Delete
      </button>
    </div>
  );
};

export default UpdateSpotCard;
