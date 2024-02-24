import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const AddExpenses = ({
  title,
  onFinish,
  handleExpensesCancel,
  isExpensesModalVisible,
}) => {
  const { theme } = useContext(ThemeContext);
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        title={title}
        onCancel={handleExpensesCancel}
        footer={null}
        open={isExpensesModalVisible}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expenses");
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
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Insurance">Insurance</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Tour">Tour</Select.Option>
              <Select.Option value="Shopping">Shopping</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="text-sm rounded-md text-theme bg-white hover:bg-theme hover:text-white text-center my-2 p-1 w-full border-[1px] border-theme flex justify-center items-center h-auto"
            >
              Add Expenses
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpenses;
