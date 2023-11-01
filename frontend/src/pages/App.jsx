import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Board from "./Board";
import Products from "./Products";
import Issues from "./Issues";
import Settings from "./Settings";
import Profile from "./Profile";
import Updateprofile from "./Updateprofile";
import Addproducts from "./Addproducts";
import Forgetten from "./Forgetten";
import Reset from "./Reset";
import Editproduct from "./Editproduct";
import PrivateRoute from "../components/privateRoute";
import Deleteproducts from "./Deleteproducts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signin />} />

      <Route path="/login" element={<Signup />} />


      <Route path="/resetpassword" element={<Reset />} />
      <Route path="/login/forgottenPassword" element={<Forgetten />} />

      <Route path="/resetPassword/:resetToken" element={<Reset/>}/>
      <Route path="/login/forgottenPassword" element={<Forgetten/>}/>


      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard/board" element={<Board />} />
        

        {/*Private Routes*/}
        <Route path='' element={<PrivateRoute />}>
          <Route path="/dashboard/products/:id" element={<Products />} />
        <Route path="/dashboard/editproduct/:id" element={<Editproduct />} />
        <Route path="/dashboard/addproducts" element={<Addproducts />} />
        <Route path="/dashboard/deleteproduct/:id" element={<Deleteproducts />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/update" element={<Updateprofile />} />
        </Route>
        <Route path="/dashboard/issues" element={<Issues />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;