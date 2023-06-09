import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { pluginInputs, productInputs, userInputs, orderInputs } from "./formSource";
import { Home } from "./pages/home/Home";
import { ListProduct } from "./pages/list/ListProduct";
import { ListOrder } from "./pages/list/ListOrder";
import { ListUser } from "./pages/list/ListUser";
import { ListPlugin } from "./pages/list/ListPlugin";
import Login from "./pages/login/Login"
import { New } from "./pages/new/New";
import { NewProduct } from "./pages/newProduct/NewProduct";
import { UpdateProduct } from "./pages/updateProduct/UpdateProduct";
import { NewPlugin } from "./pages/newPlugin/NewPlugin";
import { Update } from "./pages/update/Update";
import { Single } from "./pages/single/Single";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { productColumns, userColumns, orderColumns, pluginColumns } from "./datatablesource";

import "./style/dark.scss";
import { UpdatePlugin } from "./pages/updatePlugin/UpdatePlugin";
import { UpdateOrder } from "./pages/updateOrder/UpdateOrder";
import { OrderDetail } from "./pages/orderDetail/OrderDetail";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/admin/login" />;
    }

    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route index element={<Navigate to="/admin" replace={true} />}>
          </Route>
          <Route path="/admin" >
            <Route path="login" element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="users">
              <Route index element={
                <ProtectedRoute>
                  <ListUser columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path="search" element={
                <ProtectedRoute>
                  <ListUser columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path=":userId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path="new" element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              } />
              <Route path="update" element={
                <ProtectedRoute>
                  <Update inputs={userInputs} title="Update User" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="products">
              <Route index element={
                <ProtectedRoute>
                  <ListProduct columns={productColumns} />
                </ProtectedRoute>
              } />
              <Route path=":productId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path="new" element={
                <ProtectedRoute>
                  <NewProduct inputs={productInputs} title="Add New Product" />
                </ProtectedRoute>
              } />
              <Route path="update" element={
                <ProtectedRoute>
                  <UpdateProduct inputs={productInputs} title="Update Product" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="orders">
              <Route index element={
                <ProtectedRoute>
                  <ListOrder columns={orderColumns} />
                </ProtectedRoute>
              } />
              <Route path="detail" element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              } />
              {/* <Route path="new" element={
                <ProtectedRoute>
                  <New inputs={productInputs} title="Add New Product" />
                </ProtectedRoute>
              } /> */}
              <Route path="update" element={
                <ProtectedRoute>
                  <UpdateOrder inputs={orderInputs} title="Update Order" />
                </ProtectedRoute>
              } />
              
            </Route>
            <Route path="plugins">
              <Route index element={
                <ProtectedRoute>
                  <ListPlugin columns={pluginColumns} />
                </ProtectedRoute>
              } />
              <Route path="search" element={
                <ProtectedRoute>
                  <ListPlugin columns={pluginColumns} />
                </ProtectedRoute>
              } />
              <Route path=":pluginId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path="new" element={
                <ProtectedRoute>
                  <NewPlugin inputs={pluginInputs} title="Add New Plugin" />
                </ProtectedRoute>
              } />
              <Route path="update" element={
                <ProtectedRoute>
                  <UpdatePlugin inputs={pluginInputs} title="Update Plugin" />
                </ProtectedRoute>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
