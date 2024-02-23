import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../graphql/queries";
import filter from "lodash.filter";

const RemovePerson = ({ id }) => {
  const [deletePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (c) => {
            return c.id !== deletePerson.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (result) {
      deletePerson({
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

export default RemovePerson;
