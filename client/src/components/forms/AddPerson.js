import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";

const AddPerson = () => {
  const [id] = useState(uuid4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });

        form.resetFields();
      },
    });
  };

  return (
    <Form
      name="add-person-form"
      layout="inline"
      size="large"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter first name" }]}
      >
        <Input placeholder="i.e John" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter last name" }]}
      >
        <Input placeholder="i.e Smith" />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
