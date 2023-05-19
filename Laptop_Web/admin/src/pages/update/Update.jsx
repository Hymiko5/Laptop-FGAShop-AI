import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import React, {Component} from 'react';
import updateRequest from "../../hooks/updateRequest";
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './modal.css'
import useFetch from "../../hooks/useFetch";
// import 'bootstrap/dist/css/bootstrap.min.css';

export const Update = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [_id, setId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [userUpdate, setUserUpdate] = useState("")
  
  useEffect(() => {
    setId(searchParams.get("id"));

  });
  // const { data, loading, error } = useFetch(`/admin/users/${_id}`);
  // useEffect(() => {
  //   setUserUpdate(data);

  // }, [data]);

  // console.log(userUpdate)
  const [message, setMessage] = React.useState({
    heading: "",
    center: "",
    message: ""
  });
  
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/admin/users`; 
    navigate(path)
  }

  const handleChangeSinglePost = (value, id) => {
    if(id === 1) setUsername(value);
    if(id === 2) setEmail(value);
    if(id === 3) setPhoneNumber(value);
    if(id === 4) setPassword(value);
    if(id === "admin") setIsAdmin(value == "true" ? true : false);
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
          <div className="left">
          <h2>Id: {_id}</h2>
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={async (e) => {
                console.log("submit")
                e.preventDefault();
                const res = await updateRequest(`/admin/users/${_id}`, { userName, email, phoneNumber, password, isAdmin, photo: file })
                if(res.success == false) {
                  setModalShow(true)
                  setMessage({
                    heading: "Sửa thông tin user không thành công",
                    center: "Error",
                    message: res.message
                  })
                } else {
                  setModalShow(true)
                  setMessage({
                    heading: "Sửa thông tin user thành công",
                    center: "Success",
                    message: "Sửa thành công " + res.data.email
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
                  <label>Is admin</label>
                  <select id="admin" onChange={e=>handleChangeSinglePost(e.target.value, "admin")}>
                    <option value="true">True</option>
                    <option value="false" selected >False</option>
                  </select>
                </div>
              <input type="submit" value="Update User"></input>
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
