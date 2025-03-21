import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../Config/configure";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const CustomerContext = createContext();
export default function Context({ children }) {
  const { pathname } = useLocation();
  const { host } = config;
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [activeNavOption, setActiveNavOption] = useState(null);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setActiveNavOption(pathname);
  }, [pathname]);

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

  const getProfile = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCustomer(res.data.customer);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("customerToken") != null) {
      getProfile();
    } else {
      setCustomer(null);
      // navigate("/");
    }
  }, [state]);
  const Register = async (data) => {
    axios
      .post(`${host}/customer/Register`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
          setValue(0);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const Login = async (data) => {
    axios
      .post(`${host}/customer/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("customerToken", res.data.token);
          setState(!state);
          autoCloseAlert(
            res.data.message,
            "You will redirected to the home page ",
            2000
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const customerFeedback = async (data) => {
    axios
      .post(`${host}/customer/customerFeedback`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const LogoutCustomer = () => {
    localStorage.removeItem("customerToken");
    setState(!state);
    navigate("/");
  };

  const handleLogoutCustomer = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutCustomer
    );
  };

  const viewAllProducts = async () => {
    axios
      .get(`${host}/customer/viewAllProducts`)
      .then((res) => {
        // console.log(res.data);
        setAllProducts(res.data.products);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewSingleProduct = async (id) => {
    axios
      .get(`${host}/customer/viewSingleProduct/${id}`)
      .then((res) => {
        // console.log(res.data);
        setSingleProduct(res.data.product);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const checkOut = async (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(`${host}/customer/checkOut`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "your order history load here ",
            3000
          );
          setTimeout(() => {
            navigate("/Orders");
          }, 2000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const feedback = async (id, feedback) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/feedback/${id}`,
        { feedback },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          directAlert("success", "Feedback submitted successfully", 3000);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewFavorites = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewFavorites`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setFavorites(res.data.favorites);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const manageFavorite = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(
        `${host}/customer/manageFavorite/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          viewFavorites();
          viewSingleProduct(id);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const viewOrders = async () => {
    let token = localStorage.getItem("customerToken");
    axios
      .get(`${host}/customer/viewOrders`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          directAlert("error", res.data.message, 3000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const orderProduct = async (data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .post(`${host}/customer/orderProduct`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/Orders");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const cancelOrder = async (id) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(
        `${host}/customer/cancelOrder/${id}`,
        {},
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        if (res.data.success) {
          viewOrders();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateOrder = async (id, data) => {
    let token = localStorage.getItem("customerToken");
    axios
      .put(`${host}/customer/updateOrder/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          viewOrders();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <CustomerContext.Provider
      value={{
        state,
        setState,
        loading,
        setLoading,
        pathname,
        navigate,
        Register,
        Login,
        handleLogoutCustomer,
        customer,
        setCustomer,
        getProfile,
        value,
        setValue,
        allProducts,
        viewAllProducts,
        singleProduct,
        viewSingleProduct,
        host,
        checkOut,
        orders,
        viewOrders,
        orderProduct,
        feedback,
        customerFeedback,
        manageFavorite,
        viewFavorites,
        favorites,
        cancelOrder,
        updateOrder,
      }}
    >
      {children}
      <ToastContainer />
    </CustomerContext.Provider>
  );
}
