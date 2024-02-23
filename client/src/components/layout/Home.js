import Title from "./Title";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import People from "../list/People";

const Home = () => {
  return (
    <div>
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
};

export default Home;
