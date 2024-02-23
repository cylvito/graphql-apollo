import { useState } from "react";
import { Card } from "antd";
import CarList from "./CarList";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName, cars } = props;

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <div>
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
        <Card
          title={`${firstName} ${lastName}`}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {cars.length !== 0 &&
            cars.map((car, index) => (
              <div>
                <CarList
                  key={index}
                  id={car.id}
                  year={car.year}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                />
              </div>
            ))}
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
        </div>
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {cars.length !== 0 &&
            cars.map((car, index) => (
              <div>
                <CarList
                  key={index}
                  id={car.id}
                  year={car.year}
                  make={car.make}
                  model={car.model}
                  price={car.price}
                />
              </div>
            ))}
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
    border: '1.5px solid grey'
  },
});

export default PersonCard;
