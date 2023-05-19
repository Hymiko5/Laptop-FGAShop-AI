import { DataGridSelectBox } from "./components/dataGridSelectBox/DataGridSelectBox";
import Select from 'react-select';

export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "photo",
    headerName: "Photo",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,
  },
];


export const productColumns = [
  { field: "_id", headerName: "ID", width: 30 },
  {
    field: "laptopName",
    headerName: "Laptop Name",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.thumnail[0]} alt="avatar" />
          {params.row.shortName}
        </div>
      );
    },
  },
  {
    field: "policy.guide",
    headerName: "Guide",
    width: 150,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "onlinePrice",
    headerName: "Online Price",
    width: 100,
    renderCell: (params) => {
      if (params.row.onlinePrice || params.row.onlinePrice == 0) {
        return (
          <div>
            Unavailable
          </div>
        )
      }
      else {
        return (
          <div>
            {params.row.onlinePrice}
          </div>
        )
      }
    }
  },
  {
    field: "gift",
    headerName: "Gift",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="data-flex">
          <span>{params.row.amount}</span>
          <span>{params.row.expire}</span>
        </div>
      )
    }
  },
  {
    field: "laptopType",
    headerName: "Laptop Type",
    width: 150
  },
  {
    field: "brand",
    headerName: "brand",
    width: 100
  },
  {
    field: "isBusiness",
    headerName: "Business",
    width: 100
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100
  }
];

export const orderColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 30
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          {new Date(params.row.date).toDateString()}
        </div>
      )
    }
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      const statusOptions = [{ value: 0, label: "Pending" }, { value: 1, label: "Canceled" }, { value: 2, label: "Arrived" }];
      return (
        <DataGridSelectBox id = { params.row._id } options = { statusOptions } defaultStatus = { params.row.status } />
      )
    }
  },
  {
    field: "userName",
    headerName: "Customer",
    width: 120
  },
  {
    field: "deliverWay",
    headerName: "Method",
    width: 100,
  },
  {
    field: "deliverAddress",
    headerName: "Deliver Adress",
    width: 300,
    renderCell: (params) => {
      return (
        <div>
          {params.row.deliverAddress.ward}, {params.row.deliverAddress.district}, {params.row.deliverAddress.provincial}
        </div>
      )
    }
  }
]

export const pluginColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 30
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "onlyOnline",
    headerName: "Only Online",
    width: 100
  },
  {
    field: "stars",
    headerName: "Stars",
    width: 50
  },
  {
    field: "rateNumber",
    headerName: "RateNumber",
    width: 80
  },
  {
    field: "image",
    headerName: "image",
    width: 50,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.shortName}
        </div>
      )
    }
  },
]

export const GiftColumns = [
  {
    field: "title",
    headerName: "Title",
    width: 100
  },
  {
    field: "img",
    headerName: "Name",
    width: 50,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
        </div>
      )
    }
  }
]


export const orderProductColumns = [
  {
    field: "laptopDetail._id",
    headerName: "ID",
    width: 200,
    renderCell: (params) => {
      return (
        <div><p>{params.row.laptopDetail._id}</p></div>
      )
    }
  },
  {
    field: "laptopName",
    headerName: "Laptop Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div><p>{params.row.laptopDetail.laptopName}</p></div>
      )
    }
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div><p>{params.row.laptopDetail.price}</p></div>
      )
    }
  },
  {
    field: "onlinePrice",
    headerName: "Online Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div><p>{params.row.laptopDetail.onlinePrice}</p></div>
      )
    }
  },
  {
    field: "thumnail",
    headerName: "Thumnail",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" width="50" height="50" src={params.row.laptopDetail.thumnail} alt="avatar" />
        </div>
      )
    }
  },
  {
    field: "purchasedQuantity",
    headerName: "Purchased Quantity",
    width: 40
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 100
  }
]