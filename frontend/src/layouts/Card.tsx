import { Link } from "react-router-dom";

const Card = (props: { img: string; nameOfSpot: string; locationOfSpot: string; spotId: string, workingHours: string }) => {
  return (
    <Link to={`/spot/${props.spotId}`} className="block w-full lg:w-64 bg-opacity-30 backdrop-filter backdrop-blur-lg bg-white p-3 rounded-lg m-2">
      <img className="rounded-lg w-full" src={props.img} alt="img" />
      <h3 className="font-semibold text-white">{props.nameOfSpot}</h3>
      <p className="text-white">{props.locationOfSpot}</p>
      <p className="text-white">{props.workingHours}</p>
    </Link>
  );
};

export default Card;
