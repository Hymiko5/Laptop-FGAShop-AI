import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import React, {Component} from 'react';
import insertRequest from "../../hooks/insertRequest";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './modal.css'

// import 'bootstrap/dist/css/bootstrap.min.css';

export const NewProduct = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [message, setMessage] = React.useState({
    heading: "",
    center: "",
    message: ""
  });
  const [plugins, setPlugins] = useState([])
  
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/admin/laptops`; 
    navigate(path)
  }

  const handleChangeSinglePost = (value, id) => {
    if(id === 1) setUsername(value);
    if(id === 2) setEmail(value);
    if(id === 3) setPhoneNumber(value);
    if(id === 4) setPassword(value);
    if(id === "admin") setIsAdmin(value);
    console.log(file)
  }

  const handlePlugin = (plugin) => {
    setPlugins([...plugins, plugin])
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
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={async (e) => {
                console.log("submit")
                e.preventDefault();
                const res = await insertRequest("/admin/users", { userName, email, phoneNumber, password, isAdmin, photo: file.name })
                console.log(res)
                if(res.success == false) {
                  setModalShow(true)
                  setMessage({
                    heading: "Thêm user không thành công",
                    center: "Error",
                    message: res.message
                  })
                } else {
                  setModalShow(true)
                  setMessage({
                    heading: "Thêm user thành công",
                    center: "Success",
                    message: "Thêm thành công " + res.data.email
                  })
                }
               }}>
              <div className="formInput">
                <label htmlFor="file">
                  Thumnail: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} multiple="multiple"  />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={e=>handleChangeSinglePost(e.target.value, input.id)} />
                </div>
              ))}
              <div className="formInput" >
                  <label>Plugin</label>
                  <input type="text" placeholder="Plugin" onChange={e=> { handlePlugin(e.target.value); return e.target.value = "" }}/>
                  <div>{plugins.join(", ")}</div>
                </div>
                <div className="formInput" >
                  <label>Laptop type</label>
                  <select id="type" onChange={e=>this.handleChangeSinglePost(e.target.value, "type")}>
                    <option value="Laptop gaming">Laptop gaming</option>
                    <option value="Macbook">Macbook</option>
                    <option value="Macbook">Học tập văn phòng</option>
                    <option value="Macbook">Đồ họa kĩ thuật</option>
                    <option value="Macbook">Mỏng nhẹ</option>
                    <option value="Macbook">Cao cấp sang trọng</option>
                  </select>
                </div>
                <div className="formInput" >
                  <label>Brand</label>
                  <select id="brand" onChange={e=>this.handleChangeSinglePost(e.target.value, "brand")}>
                    <option value="Dell">Dell</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Hp">Hp</option>
                    <option value="Intel">Intel</option>
                    <option value="Asus">Asus</option>
                    <option value="Msi">Msi</option>
                    <option value="Acer">Acer</option>
                    <option value="Thinkbook">Thinkbook</option>
                  </select>
                </div>
                <div className="formInput" >
                  <label>Is business?</label>
                  <select id="business" onChange={e=>this.handleChangeSinglePost(e.target.value, "business")}>
                    <option value="true">Dell</option>
                    <option value="false">Lenovo</option>
                  </select>
                </div>
              <input type="submit" value="Add User"></input>
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
