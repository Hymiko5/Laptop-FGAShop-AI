import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable"
import { useSearchParams } from "react-router-dom";
import searchRequest from "../../hooks/searchRequest";


export const ListUser = ({ columns }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keywords = searchParams.get("keywords")
  const {data} = searchRequest(`/admin/users/search?keywords=${keywords}`);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} datasearch={data} model={keywords != null?"search":"list"} />
      </div>
    </div>
  )
}
