import { Link } from "react-router-dom";
import ShowStarRating from "../components/ShowStarRating";

const Card = (props: { 
  img: string; 
  nameOfSpot: string; 
  locationOfSpot: string; 
  spotId: string; 
  workingFrom: string; 
  workingTo: string;
  rating: number; 
}) => {
  const workingHours = props.workingFrom && props.workingTo 
    ? `${props.workingFrom} - ${props.workingTo}` 
    : "24/7";

  return (
    <Link 
      to={`/spot/${props.spotId}`} 
      className="block w-full lg:w-64 bg-opacity-30 backdrop-filter backdrop-blur-lg bg-white p-3 rounded-lg m-2" 
      style={{ 
        width: '250px', 
        height: '360px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        overflow: 'hidden' 
      }}
    >
      <div className="relative" style={{ flex: '1', marginBottom: '1rem' }}>
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
  );
};

export default Card;
