import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs } from "./formSource";
import { Home } from "./pages/home/Home";
import { ListProduct } from "./pages/list/ListProduct";
import { ListOrder } from "./pages/list/ListOrder";
import { ListUser } from "./pages/list/ListUser";
import Login from "./pages/login/Login"
import { New } from "./pages/new/New";
import { NewProduct } from "./pages/newProduct/NewProduct";
import { Update } from "./pages/update/Update";
import { Single } from "./pages/single/Single";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { productColumns, userColumns, orderColumns } from "./datatablesource";
import "./style/dark.scss";


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
            </Route>
            <Route path="orders">
              <Route index element={
                <ProtectedRoute>
                  <ListOrder columns={orderColumns} />
                </ProtectedRoute>
              } />
              <Route path=":orderId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              } />
              <Route path="new" element={
                <ProtectedRoute>
                  <New inputs={productInputs} title="Add New Product" />
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
