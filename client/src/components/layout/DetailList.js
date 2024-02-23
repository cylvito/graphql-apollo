import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { PERSON_WITH_CARS } from "../../graphql/queries";
import { List } from "antd";

const DetailList = () => {
  const { id } = useParams();

  const { loading, error, data, refetch } = useQuery(PERSON_WITH_CARS, {
    variables: { id },
  });

  useEffect(() => {
    refetch({ id });
  }, [id, refetch]);

  if (loading) return "Loading ...";
  if (error) return `Error ${error.message}`;
  console.log(data);

  if (!data || !data.personWithCars) {
    return <div>No data found</div>;
  }

  const { firstName, lastName, cars } = data.personWithCars;

  //   const handleGoBack = () => {
  //     history.goBack(); // Navigate back one step in the browser history
  //   };
  
  return (
    <div>
      <h2>
        {firstName} {lastName}
      </h2>
      <List
        bordered
        dataSource={cars}
        renderItem={(car) => (
          <List.Item>
            {car.year} {car.make} {car.model} {car.price}
          </List.Item>
        )}
      />
    </div>
  );
};

export default DetailList;
