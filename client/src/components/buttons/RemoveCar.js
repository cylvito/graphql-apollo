import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_CAR } from "../../graphql/queries";
import filter from "lodash.filter";

const RemoveCar = ({ id }) => {
  const [, forceUpdate] = useState();
  useEffect(() => {
    forceUpdate();
  }, []);

  const [deleteCarMutation] = useMutation(REMOVE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });


  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      deleteCarMutation({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleButtonClick}
    />
  );
};

export default RemoveCar;
