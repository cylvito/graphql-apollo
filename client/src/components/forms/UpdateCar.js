import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CAR, GET_PEOPLE } from "../../graphql/queries";

const UpdateCar = (props) => {
  const { Option } = Select;
  const { id, make, model, price, year } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [personId, setPersonId] = useState(null);

  const onPersonChange = (value) => {
    setPersonId(value);
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading ...";
  if (error) return `Error ${error.message}`;

  const onFinish = async (values) => {
    const { make, model, price, year } = values;

    try {
      await updateCar({
        variables: {
          id,
          make,
          model,
          year: parseInt(year),
          price: parseFloat(price),
          personId,
        },
      });

      props.onButtonClick();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

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
        Update Car
      </h2>
      <Form
        style={{ padding: "28px", justifyContent: "center", gap: "12px" }}
        name="update-car-form"
        layout="inline"
        form={form}
        onFinish={onFinish}
        initialValues={{
          make,
          model,
          price,
          year,
          personId,
        }}
      >
        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Please enter the make" }]}
        >
          <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please enter the model" }]}
        >
          <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please enter a year" }]}
        >
          <Input placeholder="Year" />
        </Form.Item>
        <Form.Item
          name="person"
          label="Person"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a person"
            onChange={onPersonChange}
            value={personId}
            allowClear
          >
            {data &&
              data.people.map((person, id) => (
                <Option key={id} value={person.id}>
                  {person.firstName} {person.lastName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Button htmlType="submit">Update</Button>
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </div>
  );
};

export default UpdateCar;
