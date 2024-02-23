import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { List, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CarList from "./CarList";
import PersonCard from "./PersonCard";

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          paddingTop: "20px",
          borderBottom: "1px solid gainsboro",
          margin: "0 20px",
        }}
      >
        Records
      </h2>
      <List style={styles.list}>
        {data.people && data.people.length > 0 ? (
          data.people.map(({ id, firstName, lastName, cars }) => (
            <List.Item style={{ width: "100%" }} key={id}>
              <PersonCard
                key={id}
                id={id}
                firstName={firstName}
                lastName={lastName}
                cars={cars}
              />
            </List.Item>
          ))
        ) : (
          <div>There are no people to display.</div>
        )}
      </List>
    </div>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    padding: '40px'
  },
});

export default People;
