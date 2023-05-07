import { Chart } from "../../components/chart/Chart"
import { Navbar } from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { Widget } from "../../components/widget/Widget"
import "./home.scss"
import { Featured } from "../../components/featured/Featured"
import { List } from "../../components/table/Table"

export const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transaction</div>
          <List />
        </div>
      </div>
    </div>
  )
}
