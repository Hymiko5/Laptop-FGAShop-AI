import "./updateOrder.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import React, {Component} from 'react';
import updateRequest from "../../hooks/updateRequest";
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { DataGrid } from "@mui/x-data-grid";
import './modal.css'
import useFetch from "../../hooks/useFetch";
import { orderProductColumns } from "../../datatablesource";

export const UpdateOrder = ({ inputs, title }) => {

  const [provincial, setProvincial] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [list, setList] = useState([])
  const [_id, setId] = useState(searchParams.get("id"));
  const [message, setMessage] = React.useState({
    heading: "",
    center: "",
    message: ""
  });
  const {data} = useFetch(`/admin/orders/${_id}/info`);
  useEffect(() => {
    if(data.products != undefined){
      setList(data.products);
      console.log(list);
    }
    
  }, [data]);
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/admin/orders`;
    navigate(path)
  }

  const handleChangeSinglePost = (value, id) => {
    if(id === 1) setProvincial(value);
    if(id === 2)setDistrict(value);
    if(id === 3)setWard(value);
    if(id === 4)setAddress(value);
  }
  
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {message.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{message.center}</h4>
          <p>
            {message.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { routeChange(); return props.onHide;  }}>Tới trang danh sách</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  
  return (
    <>
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <h2><p>Update Order:</p> {_id}</h2>
          <div className="right">
            <form onSubmit={async (e) => {
                console.log("submit")
                e.preventDefault();
                const res = await updateRequest(`/admin/orders/${_id}`, { deliverAddress: { provincial, district, ward, address } })
                console.log(res)
                if(res.success == false) {
                  setModalShow(true)
                  setMessage({
                    heading: "Cập nhật thông tin đơn hàng thành công",
                    center: "Error",
                    message: res.message
                  })
                } else {
                  setModalShow(true)
                  setMessage({
                    heading: "Cập nhật thông tin đơn hàng thành công",
                    center: "Success",
                    message: "Cập nhật thành công " + res.data._id
                  })
                }
               }}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={e=>handleChangeSinglePost(e.target.value, input.id)} />
                </div>
              ))}
              <div className="tb">
              <DataGrid
                className="datagrid"
                rows={list}
                columns={orderProductColumns}
                pageSize={1}
                rowsPerPageOptions={[1]}
                getRowId={(row) => row.laptopDetail._id}
              />
              </div>
              <div>
              <input type="submit" value="Update Order"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
