import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PERSON_WITH_CARS } from "../../graphql/queries";
import { List } from "antd";
import { Link } from "react-router-dom";

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

  if (!data || !data.personWithCars) {
    return <div>No data found</div>;
  }

  const { firstName, lastName, cars } = data.personWithCars;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>OWNER AND THEIR CARS</h1>
      <div
        style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}
      >
        <List
          style={{ width: "80%" }}
          bordered
          header={
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {firstName} {lastName}
            </div>
          }
          footer={
            <Link to="/">
              <button
                style={{
                  backgroundColor: "DodgerBlue",
                  padding: "12px",
                  borderRadius: "16px",
                  border: "2px solid DodgerBlue",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Back To Home
              </button>
            </Link>
          }
          dataSource={cars}
          renderItem={(car) => (
            <List.Item>
              {car.year} {car.make} {car.model} {car.price}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default DetailList;
