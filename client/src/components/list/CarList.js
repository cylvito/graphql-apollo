import { useState } from "react";
import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import UpdateCar from "../forms/UpdateCar";
import { EditOutlined } from "@ant-design/icons";

const CarList = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, year, make, model, price, personId } = props;

  let formattedPrice =
    "$ " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          title={`(${year}) ${make} ${model} -> ${formattedPrice}`}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "900px",
    borderRadius: "0px",
    marginBottom: "12px",
  },
});

export default CarList;
