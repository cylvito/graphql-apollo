import Title from "./Title";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import People from "../list/People";
import { GET_PEOPLE } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const Home = () => {

    const { loading, error, data } = useQuery(GET_PEOPLE);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    console.log(data)
  return (
    <div>
      <Title />
      <AddPerson />
      {data.people && data.people.length !== 0 && <AddCar />}
      <People />
    </div>
  );
};

export default Home;
