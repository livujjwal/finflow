import { Line } from "@ant-design/charts";

const LineChart = ({ data }) => {
  const config = {
    data,

    xField: "date",
    yField: "amount",
    label: {
      type: "inner",
      offset: "-50%",
      content: "{amount}",
      style: {
        textAlign: "center",
        fontSize: 14,
        color: "#e6e6e6",
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#fff",
        },
        content: "AntV\nG2Plot",
      },
    },
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl mt-2 mb-6 mx-4">Your Analytics</h2>
      <Line {...config} />
    </div>
  );
};
export default LineChart;
