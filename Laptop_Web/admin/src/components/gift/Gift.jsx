import useFetch from "../../hooks/useFetch";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { DataGrid } from "@mui/x-data-grid";
import { GiftColumns } from "../../datatablesource";

export const Gift = ({ gifts }) => {
  return (
    <DataGrid
    className="datagrid"
    rows={gifts}
    columns={GiftColumns}
    pageSize={2}
    rowsPerPageOptions={[2]}
    checkboxSelection
    getRowId={(row) => row.title}
  />)
}
