import { useContext } from "react";
import DataTable from "react-data-table-component";
import ThemeContext from "../utils/ThemeContext";

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    key: "name",
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    key: "amount",
  },
  {
    name: "Tag",
    selector: (row) => row.tag,
    sortable: true,
    key: "tag",
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
    key: "type",
  },

  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    key: "date",
  },
];
const customStylesDark = {
  rows: {
    style: {
      minHeight: "72px",
      backgroundColor: "#0B2C24",
      color: "#e6e6e6",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#0B2C24",
      color: "#e6e6e6",
    },
  },
  cells: {
    style: { backgroundColor: "#0B2C24", color: "#e6e6e6" },
  },
  bottom: {
    style: { backgroundColor: "#0B2C24", color: "#e6e6e6" },
  },
};

export const Basic = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={
        theme === "dark"
          ? " w-full text-[1px] md:w-[96%] mx-auto text-[#e6e6e6]  hover:bg-theme hover:text-white bg-gradient-to-tr from-[#CAF2EF] to-[#C9EFDC]"
          : "w-full mx-auto"
      }
    >
      <DataTable
        customStyles={theme === "dark" ? customStylesDark : ""}
        columns={columns}
        data={data}
        pagination
      />
    </div>
  );
};

export default Basic;
