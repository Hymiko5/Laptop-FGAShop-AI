import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import React, {Component} from 'react';
import insertRequest from "../../hooks/insertRequest";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './modal.css'
import { Gift } from "../../components/gift/Gift";
import useFetch from "../../hooks/useFetch";
import Select from 'react-select';

// import 'bootstrap/dist/css/bootstrap.min.css';

export const NewProduct = ({ inputs, title }) => {
  const [file, setFile] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [item, setItem] = useState([]);
  const [imgTitle, setImgTitle] = useState("");
  const [img, setImg] = useState("");
  const [pluginTitles, setPluginTitles] = useState([]);
  const [laptopName, setLaptopName] = useState("");
  const [guide, setGuide] = useState("");
  const [price, setPrice] = useState(0);
  const [installment, setInstallment] = useState("");
  const [CPU, setCPU] = useState("");
  const [RAM, setRAM] = useState("");
  const [hardware, setHardware] = useState("");
  const [monitor, setMonitor] = useState("");
  const [graphicCard, setGraphicCard] = useState("");
  const [connector, setConnector] = useState("");
  const [operation, setOperation] = useState("");
  const [design, setDesign] = useState("");
  const [dw, setDW] = useState("");
  const [releaseTime, setReleaseTime] = useState("");
  const [onlinePrice, setOnlinePrice] = useState("");
  const [giftAmount, setGiftAmount] = useState("");
  const [giftExpire, setGiftExpire] = useState("");
  const [promotion, setPromotion] = useState("");
  const [laptopDetail, setLaptopDetail] = useState("");
  const [shortName, setShortName] = useState("");
  const [laptopType, setLaptopType] = useState("");
  const [slug, setSlug] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [isBusiness, setIsBusiness] = useState(true);
  const [plugins, setPlugins] = useState([])
  const { data } = useFetch("/admin/plugins/title");
  const pluginOption = data.map(d => {return { "value": d._id, "label": d.name }})
  useEffect(() => {
    if(pluginTitles.length ==0) {
      setPluginTitles(pluginOption)
    }
    
  })
  const [message, setMessage] = React.useState({
    heading: "",
    center: "",
    message: ""
  });
  
  const navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/admin/products`; 
    navigate(path)
  }
  const handleChangeSinglePost = (value, id) => {
    if(id === 1) setLaptopName(value);
    if(id === 3) setGuide(value);
    if(id === 4) setPrice(parseFloat(value));
    if(id === 5) setInstallment(value);
    if(id === 6) setCPU(value);
    if(id === 7) setRAM(value);
    if(id === 8) setHardware(value);
    if(id === 9) setMonitor(value);
    if(id === 10) setGraphicCard(value);
    if(id === 11) setConnector(value);
    if(id === 12) setOperation(value);
    if(id === 13) setDesign(value);
    if(id === 14) setDW(value);
    if(id === 15) setReleaseTime(value);
    if(id === 16) setOnlinePrice(value);
    if(id === 19) setGiftAmount(value);
    if(id === 20) setGiftExpire(value);
    if(id === 21) setPromotion(value);
    if(id === 22) setLaptopDetail(value);
    if(id === 23) setShortName(value);
    if(id === 24) setSlug(value);
    if(id === 25) setQuantity(value);
    if(id === "type") setLaptopType(value);
    if(id === "business") setIsBusiness(value == "true" ? true : false);
    if(id === "brand") setBrand(value);
    console.log(file)
  }

  const handlePlugin = (selectedOption) => {
    setPlugins(prev => [...prev, selectedOption])
    console.log(plugins)
  }

  const uploadGiftImage = (gifts) => {
    for(let i = 0; i< gifts.length; i++) {
      const url = insertRequest(`/admin/file/upload`, {file: gifts[i].img});
      gifts[i].img = url;
    }
  }
  const handleFormData = () => {
    const arr = new FormData();
    for (var i = 0; i<file.length; i++) {
      arr.append("thumnail", file[i]);
    }
    arr.append("laptopName", laptopName);
    arr.append("policy.guide", guide );
    arr.append("price", price);
    arr.append("installment", installment);
    arr.append("configuration.CPU", CPU);
    arr.append("configuration.RAM", RAM);
    arr.append("configuration.Ổ cứng", hardware);
    arr.append("configuration.Màn hình", monitor);
    arr.append("configuration.Card màn hình", graphicCard);
    arr.append("configuration.Cổng kết nối", connector);
    arr.append("configuration.Hệ điều hành", operation);
    arr.append("configuration.Thiết kế", design);
    arr.append("configuration.Kích thước, trọng lượng", dw);
    arr.append("configuration.Thời điểm ra mắt", releaseTime);
    arr.append("onlinePrice", onlinePrice);
    arr.append("gift.items", item);
    arr.append("gift.amount", giftAmount);
    arr.append("gift.expire", giftExpire);
    arr.append("laptopDetail.promotion", [promotion]);
    arr.append("laptopDetail.detail", [laptopDetail]);
    arr.append("plugins", plugins.map(plugin =>  plugin.value));
    arr.append("laptopType", laptopType);
    arr.append("brand", brand);
    arr.append("shortName", shortName);
    arr.append("isBusiness", isBusiness);
    arr.append("slug", slug);
    arr.append("quantity", quantity);
    return arr;
    
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
            <img src={file.length > 0 ? URL.createObjectURL(file[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={async (e) => {
                console.log("submit")
                e.preventDefault();
                uploadGiftImage(item);
                const res = await insertRequest("/admin/laptops", handleFormData())
                if(res.success == false) {
                  setModalShow(true)
                  setMessage({
                    heading: "Thêm không thành công",
                    center: "Error",
                    message: res.message
                  })
                } else {
                  setModalShow(true)
                  setMessage({
                    heading: "Thêm thành công",
                    center: "Success",
                    message: "Thêm thành công " + res.data._id
                  })
                }
               }}>
              <div className="formInput">
                <label htmlFor="file">
                  Thumnail: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={e => setFile(e.target.files)} style={{ display: "none" }} multiple="multiple"  />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={e=>handleChangeSinglePost(e.target.value, input.id)} />
                </div>
              ))}
              <div className="formInput">
                  <label>Plugin</label>
                   <Select
                      onChange={handlePlugin}
                      options={pluginTitles}
                    />
                  <div>{plugins.map(plugin => plugin.label).join(",")}</div>
                </div>
                <div className="formInput" >
                  <label>Laptop type</label>
                  <select id="type" onChange={e=>handleChangeSinglePost(e.target.value, "type")}>
                    <option value="Laptop gaming" selected>Laptop gaming</option>
                    <option value="Macbook">Macbook</option>
                    <option value="Học tập văn phòng">Học tập văn phòng</option>
                    <option value="Đồ họa kĩ thuật">Đồ họa kĩ thuật</option>
                    <option value="Mỏng nhẹ">Mỏng nhẹ</option>
                    <option value="Cao cấp sang trọng">Cao cấp sang trọng</option>
                  </select>
                </div>
                <div className="giftInput" >
                  <label>Gifts</label>
                  <input type="text" onChange={ (e) => setImgTitle(e.target.value) } />
                  <input type="file" onChange={ (e) => setImg(e.target.files[0]) } />
                  <a onClick={ () => { const gift = { title: imgTitle, img }; setItem((prev) =>  [...prev, gift]); setImgTitle(""); setImg("") } }>Add</a>
                  <Gift gifts={item} />
                </div>
                <div className="formInput" >
                  <label>Brand</label>
                  <select id="brand" onChange={(e) => handleChangeSinglePost(e.target.value, "brand")}>
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
                  <select id="business" onChange={e=>handleChangeSinglePost(e.target.value, "business")}>
                    <option value="true" selected>True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              <input type="submit" value="Add Laptop"></input>
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
