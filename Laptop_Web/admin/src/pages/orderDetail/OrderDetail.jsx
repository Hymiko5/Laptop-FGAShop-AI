import "./orderDetail.scss";
import React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { Chart } from "../../components/chart/Chart";
import { List } from "../../components/table/Table";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { orderProductColumns } from "../../datatablesource";
import { useReactToPrint } from 'react-to-print';

export const OrderDetail = () => {
  const [provincial, setProvincial] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalShow, setModalShow] = React.useState(false);
  const [list, setList] = useState([])
  const [_id, setId] = useState(searchParams.get("id"));
  const {data} = useFetch(`/admin/orders/${_id}/info`);
  const componentRef = useRef();
  useEffect(() => {
    if(data.products != undefined){
      setList(data.products);
    }
    
    console.log(list);
  }, [data]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    
    <div className="single" ref={componentRef}>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handlePrint}>Print</div>
            <h1 className="title">Infomation</h1>
            <div className="item">
              <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" className="itemImg" />
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Date: </span>
                  <span className="itemValue">{data.date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{data.userName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Deliver Way:</span>
                  <span className="itemValue">
                    {data.deliverWay}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
        <h1 className="title">Deliver address</h1>
        <div className="item">
        <div className="details">
        <div className="detailItem">
                  <span className="itemKey">Provincial:</span>
                  <span className="itemValue">{data.deliverAddress != undefined?data.deliverAddress.provincial:"empty"}</span>
          </div>
          <div className="detailItem">
                  <span className="itemKey">District:</span>
                  <span className="itemValue">{data.deliverAddress != undefined?data.deliverAddress.district:"empty"}</span>
          </div>
          <div className="detailItem">
                  <span className="itemKey">Ward:</span>
                  <span className="itemValue">{data.deliverAddress != undefined?data.deliverAddress.ward:"empty"}</span>
          </div>
          <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.deliverAddress != undefined?data.deliverAddress.address:"empty"}</span>
          </div>
          </div>
          </div>
          </div>

        </div>
        
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
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
              
        </div>
        
      </div>
    </div>
  )
}
