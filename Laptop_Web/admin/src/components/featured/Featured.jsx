import "./featured.scss";
import useFetch from "../../hooks/useFetch";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export const Featured = () => {
  const { data, loading, error } = useFetch("/admin/orders/revenue");
  const moneyFormater = (money) => {
    return (Math.round(money * 100) / 100).toLocaleString().replace(/,/g, '.');
  }
  return (
    <div className="featured">
      {loading ? ("Loading please wait") : (<>
        <div className="top">
          <div className="title">Total Revenue</div>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
          </div>
          <p className="title">Total sales made today</p>
          <p className="amount">{data.today ? `${moneyFormater(data.today.revenue)}đ` : "0đ"}</p>
          <p className="desc">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Week</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">{data.lastWeek ? `${moneyFormater(data.lastWeek.revenue)}đ` : "0đ"}</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">{data.lastMonth ? `${moneyFormater(data.lastMonth.revenue)}đ` : "0đ"}</div>
              </div>
            </div>
          </div>
        </div>
      </>)}
    </div>
  )
}
