import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { Button, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_PEOPLE } from "../../graphql/queries";

const AddCar = () => {
  const { Option } = Select;
  const [id] = useState(uuid4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [personId, setPersonId] = useState(null);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [addCar] = useMutation(ADD_CAR);
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading ...";
  if (error) return `Error ${error.message}`;

  const onFinish = (values) => {
    const { make, model, price, year } = values;

    addCar({
      variables: {
        id,
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        personId,
      },

      update: (cache, { data: { addCar } }) => {
        const { personId } = addCar;
        try {
          const data = cache.readQuery({
            query: GET_PEOPLE,
          });

          const updatedPeople = data.people.map((person) => {
            if (person.id === personId) {
              return {
                ...person,
                cars: [...person.cars, addCar],
              };
            }
            return person;
          });

          const updatedData = {
            people: updatedPeople,
          };

          cache.writeQuery({
            query: GET_PEOPLE,
            data: updatedData,
          });
        } catch (error) {
          console.error("Error updating cache:", error);
        }
        form.resetFields();
      },
    });
  };

  const onPersonChange = (value) => {
    setPersonId(value);
  };

  return (
    <div>
      <h2 style= {{ textAlign: 'center', paddingTop: '20px', borderBottom: '1px solid gainsboro', margin: '0 20px'}}>Add Car</h2>
    <Form
    style= {{ padding: '28px', justifyContent: 'center', gap: '12px'}}
      name="add-car-form"
      layout="inline"
      size="large"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        label="Year"
        rules={[{ required: true, message: "Please enter the year" }]}
      >
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please enter the Make" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <Input placeholder="Price" />
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
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
    </div>
  );
};

export default AddCar;
