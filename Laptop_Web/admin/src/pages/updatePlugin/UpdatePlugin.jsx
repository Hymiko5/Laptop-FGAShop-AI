import "./updatePlugin.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import React, {Component} from 'react';
import updateRequest from "../../hooks/updateRequest";
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './modal.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

export const UpdatePlugin = ({ inputs, title }) => {
  const [_id, setId] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [onlinePrice, setOnlinePrice] = useState(0);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = React.useState({
    heading: "",
    center: "",
    message: ""
  });
  
  useEffect(() => {
    setId(searchParams.get("id"));

  });
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/admin/plugins`;
    navigate(path)
  }

  const handleChangeSinglePost = (value, id) => {
    if(id === 1) setName(value);
    if(id === 2)setOnlinePrice(value);
    if(id === "onlyOnline") setOnlyOnline(value == "true" ? true : false);
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
          <h2>{_id}</h2>
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const res = await updateRequest(`/admin/plugins/${_id}`, { name, onlyOnline, onlinePrice, image: file })
                console.log(res)
                if(res.success == false) {
                  setModalShow(true)
                  setMessage({
                    heading: "Cập nhật thông tin phụ kiện không thành công",
                    center: "Error",
                    message: res.message
                  })
                } else {
                  setModalShow(true)
                  setMessage({
                    heading: "Cập nhật thông tin phụ kiện thành công",
                    center: "Success",
                    message: "Cập nhật thành công " + res.data._id
                  })
                }
               }}>
              <div className="formInput">
                <label htmlFor="file">
                  Photo: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={e=>handleChangeSinglePost(e.target.value, input.id)} />
                </div>
              ))}
              <div className="formInput" >
                  <label>Only online</label>
                  <select id="admin" onChange={e=>handleChangeSinglePost(e.target.value, "onlyOnline")}>
                    <option value="true">True</option>
                    <option value="false" selected>False</option>
                  </select>
                </div>
              <input type="submit" value="Update Plugin"></input>
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
