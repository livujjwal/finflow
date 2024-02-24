import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

const AddIncome = ({
  title,
  onFinish,
  handleIncomeCancel,
  isIncomeModalVisible,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={title}
      onCancel={handleIncomeCancel}
      footer={null}
      open={isIncomeModalVisible}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          className="font-semibold"
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          className="font-semibold"
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the income amount!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          className="font-semibold"
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the income date!",
            },
          ]}
        >
          <DatePicker type="date" className="w-full" />
        </Form.Item>
        <Form.Item
          className="font-semibold"
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select tag for the income!",
            },
          ]}
        >
          <Select>
            <Select.Option value="Investment">Investment</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Bonus">Bonus</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="text-sm rounded-md text-theme bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-full border-[1px] border-theme flex justify-center items-center h-auto"
          >
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddIncome;
