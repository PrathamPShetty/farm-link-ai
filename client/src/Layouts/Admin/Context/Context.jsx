import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import { config } from "../../../Config/configure";
export const AdminContext = createContext();
export default function Context({ children }) {
  const { host } = config;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [allFarmers, setAllFarmers] = useState([]);
  const [allCustomerFeedback, setAllCustomerFeedback] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allCollection, setAllCollection] = useState([]);
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    setActiveNavOption(pathname);
  }, [pathname]);
  //alerts
  const autoCloseAlert = (msgTitle, msgHtml, msgTimer) => {
    let timerInterval;
    Swal.fire({
      title: msgTitle,
      html: msgHtml + " in <b></b> milliseconds.",
      timer: msgTimer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // console.log("I was closed by the timer");
      }
    });
  };

  const confirmation = (
    mainSubTitle,
    confirmButtonLabel,
    cancelMessage,
    successTitle,
    successSubTitle,
    performAction
  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: mainSubTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: confirmButtonLabel,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          performAction();
          swalWithBootstrapButtons.fire({
            title: successTitle,
            text: successSubTitle,
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: cancelMessage,
            icon: "error",
          });
        }
      });
  };

  const directAlert = (type, message, time) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: time,
    });
  };

  //functions
  const getProfile = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data.admin);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken") != null) {
      getProfile();
    } else {
      setAdmin(null);
      navigate("/admin/");
    }
  }, [state]);
  const LogoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setState(!state);
    navigate("/admin/");
  };

  const handleLogoutAdmin = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutAdmin
    );
  };
  const adminLogin = async (data) => {
    axios
      .post(`${host}/admin/Login`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setAdmin(res.data.admin);
          setState(!state);
          directAlert("success", res.data.message, 3000);
          navigate("/admin/Dashboard");
        } else {
          directAlert("error", "Login Failed", 3000);
        }
      })
      .catch((err) => {
        directAlert("error", err.message, 3000);
      });
  };

  const insertProduct = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertProduct`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProducts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllProducts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProduct = async (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateProduct/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFarmers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllFarmers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllFarmers(res.data.farmers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertFarmer = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertFarmer`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
          getAllFarmers();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateFarmer = (id, data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(`${host}/admin/updateFarmer/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getAllFarmers();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCustomers = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllCustomers`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCustomers(res.data.customers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCustomerStatus = (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateCustomerStatus/${id}`,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getAllCustomers();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFarmerStatus = (id, status) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateFarmerStatus/${id}`,
        { status },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getAllFarmers();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrders = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getOrders`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllOrders(res.data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCounts = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setCounts({
            customers: res.data.customers,
            farmers: res.data.farmers,
            products: res.data.products,
            orders: res.data.orders,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllRecords = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getAllRecords`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCollection(res.data.collection);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCustomerFeedback = async () => {
    let token = localStorage.getItem("adminToken");
    axios
      .get(`${host}/admin/getCustomerFeedback`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllCustomerFeedback(res.data.feedbacks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertNewRecord = async (data) => {
    let token = localStorage.getItem("adminToken");
    axios
      .post(`${host}/admin/insertNewRecord`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
          getAllRecords();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRecord = async (id) => {
    let token = localStorage.getItem("adminToken");
    axios
      .delete(`${host}/admin/deleteRecord/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setState(!state);
          getAllRecords();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrder = async (id, paymentStatus) => {
    let token = localStorage.getItem("adminToken");
    axios
      .put(
        `${host}/admin/updateOrder/${id}`,
        { paymentStatus },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          getOrders();
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        state,
        setState,
        loading,
        setLoading,
        pathname,
        navigate,
        adminLogin,
        handleLogoutAdmin,
        activeNavOption,
        setActiveNavOption,
        host,
        insertProduct,
        allProducts,
        getAllProducts,
        updateProduct,
        getAllFarmers,
        insertFarmer,
        allFarmers,
        updateFarmer,
        allCustomers,
        getAllCustomers,
        updateCustomerStatus,
        counts,
        getCounts,
        insertNewRecord,
        getAllRecords,
        allCollection,
        deleteRecord,
        allOrders,
        getOrders,
        updateOrder,
        getCustomerFeedback,
        allCustomerFeedback,
        updateFarmerStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
