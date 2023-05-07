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
      switch (params.row.status) {
        case 0:
          return (
            <div className="cellWithStatus pending">
              Pending
            </div>
          )
          break;
        case 1:
          return (
            <div className="cellWithStatus passive">
              Passive
            </div>
          )
          break;
        case 2:
          return (
            <div className="cellWithStatus active">
              Active
            </div>
          )
          break;
      }
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
    width: 100
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