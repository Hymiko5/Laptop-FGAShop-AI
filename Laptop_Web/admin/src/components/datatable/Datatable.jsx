import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { DataGridSelectBox } from "../dataGridSelectBox/DataGridSelectBox";
import Select from 'react-select';

const Datatable = ({ columns, datasearch, model }) => {
  const location = useLocation();
  let orPath = location.pathname.split("/")[2];
  let path = orPath !== "products" ? orPath : "laptops";
  const { data } = useFetch(`/admin/${path}`);
  const [list, setList] = useState([]);
  useEffect(() => {
      if(model == "list") {
        setList(data)
      } if (model == "search") setList(datasearch)
  }, [data]);

  

  const handleDelete = async (id) => {
    var result = window.confirm("Bạn có chắc muốn xóa?");
    if (result) {
      try {
        await axios.delete(`/admin/${path}/${id}`);
        console.log(`/admin/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
      } catch (err) { }
    }

    
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if(path != "orders")return (
          <div className="cellAction">
            <Link to={`/admin/${orPath}/update?id=${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
        else return (
          <div className="cellAction">
              <Link className="viewButton" to={`/admin/orders/detail?id=${params.row._id}`}>detail</Link>
              <Link to={`/admin/${orPath}/update?id=${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ];

  return (
    <div className="datatable" >
      <div className="datatableTitle">
        {path}
        <Link to={`/admin/${path == "laptops" ? "products" : path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />

    </div>
  )
}

export default Datatable;
