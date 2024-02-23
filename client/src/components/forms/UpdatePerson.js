import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON, GET_PEOPLE } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  useEffect(() => {
    forceUpdate();
  }, []);

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
        Update Person
      </h2>
      <Form
        style={{ padding: "28px", justifyContent: "center", gap: "12px" }}
        name="update-person-form"
        layout="inline"
        form={form}
        onFinish={onFinish}
        initialValues={{
          firstName,
          lastName,
        }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input placeholder="i.e. John" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter a last name" }]}
        >
          <Input placeholder="i.e. Smith" />
        </Form.Item>
        <Button htmlType="submit">Update</Button>

        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    </div>
  );
};

export default UpdatePerson;
