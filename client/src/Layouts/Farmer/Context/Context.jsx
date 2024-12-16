import React, { createContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../Config/configure";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const FarmerContext = createContext();
export default function Context({ children }) {
  const { pathname } = useLocation();
  const { host, flaskHost } = config;
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [counts, setCounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cropPrediction, setCropPrediction] = useState(null);
  const [fertilizerPrediction, setFertilizerPrediction] = useState(null);
  const [cropDisease, setCropDisease] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [productPortFolio, setProductPortFolio] = useState(null);
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
    let token = localStorage.getItem("farmerToken");
    axios
      .get(`${host}/farmer/getProfile`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setFarmer(res.data.farmer);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getCounts = async () => {
    let token = localStorage.getItem("farmerToken");
    axios
      .get(`${host}/farmer/getCounts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setCounts({
          customers: res.data.customers,
          products: res.data.products,
          orders: res.data.orders,
          revenue: res.data.revenue,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("farmerToken") != null) {
      getProfile();
    } else {
      if (pathname != "/farmer/") {
        autoCloseAlert(
          "You have been logged out!",
          "You will redirected to the login page  ",
          3000
        );
        setTimeout(() => {
          setFarmer(null);
          navigate("/farmer/");
        }, 3000);
      } else {
        setFarmer(null);
        navigate("/farmer/");
      }
    }
  }, [state]);
  const Login = async (data) => {
    axios
      .post(`${host}/farmer/Login`, data)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("farmerToken", res.data.token);
          setState(!state);
          autoCloseAlert(
            res.data.message,
            "You will redirected to the home page ",
            2000
          );
          setTimeout(() => {
            navigate("/farmer/Dashboard");
          }, 1000);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const LogoutFarmer = () => {
    localStorage.removeItem("farmerToken");
    setState(!state);
    navigate("/farmer/");
  };

  const handleLogoutFarmer = () => {
    confirmation(
      "You want to logout",
      "Yes, Logout",
      "your account is safe!",
      "Logged out!",
      "You have been logged out from your account!",
      LogoutFarmer
    );
  };

  const Register = async (data) => {
    axios
      .post(`${host}/farmer/Register`, data)
      .then((res) => {
        if (res.data.success) {
          directAlert("success", res.data.message, 2000);
          setValue(0);
        } else {
          directAlert("error", res.data.message, 2000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getOrders = async () => {
    let token = localStorage.getItem("farmerToken");
    axios
      .get(`${host}/farmer/getOrders`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        // console.log(res.data);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateOrder = async (id, data) => {
    let token = localStorage.getItem("farmerToken");
    axios
      .put(`${host}/farmer/updateOrder/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getOrders();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProfile = async (farmerInfo) => {
    // console.log(farmerInfo);
    let token = localStorage.getItem("farmerToken");
    axios
      .put(`${host}/farmer/updateProfile`, farmerInfo, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          autoCloseAlert(
            res.data.message,
            "Your profile will load here ",
            3000
          );
          setTimeout(() => {
            setState(!state);
          }, 1000);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getAllProducts = async () => {
    let token = localStorage.getItem("farmerToken");
    axios
      .get(`${host}/farmer/getAllProducts`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const insertProduct = async (data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .post(`${host}/farmer/insertProduct`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllProducts();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const updateProduct = async (id, data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .put(`${host}/farmer/updateProduct/${id}`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getAllProducts();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getProductPortFolio = async (productId) => {
    let token = localStorage.getItem("farmerToken");
    axios
      .get(`${host}/farmer/getProductPortFolio/${productId}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setProductPortFolio(res.data.posts);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const uploadProductPortFolio = async (productId, data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .post(`${host}/farmer/uploadProductPortFolio`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getProductPortFolio(productId);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const deleteProductFolio = async (id, productId) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .delete(`${host}/farmer/deleteProductFolio/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          getProductPortFolio(productId);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //crop recommendation
  const recommendCrop = async (data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .post(`${flaskHost}/predict_crop`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(true);
          // console.log(res.data);
          setButtonDisable(true);
          setCropPrediction({
            growing_tips: res.data.growing_tips,
            predicted_crop: res.data.predicted_crop,
          });
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };
  //fertilizer recommendation
  const recommendFertilizer = async (data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .post(`${flaskHost}/predict_fertilizer`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(true);
          // console.log(res.data);
          setButtonDisable(true);
          setFertilizerPrediction({
            water_requirements: res.data.water_requirements,
            predicted_fertilizer: res.data.predicted_fertilizer,
          });
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };
  //crop disease detection
  const cropDiseaseDetection = async (data) => {
    // console.log(data);
    let token = localStorage.getItem("farmerToken");
    axios
      .post(`${flaskHost}/predict`, data, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(true);
          // console.log(res.data);
          setButtonDisable(true);
          setCropDisease({
            prediction: res.data.prediction,
            pesticide_recommendation: res.data.pesticide_recommendation,
          });
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  return (
    <FarmerContext.Provider
      value={{
        state,
        host,
        setState,
        loading,
        setLoading,
        pathname,
        navigate,
        Login,
        handleLogoutFarmer,
        farmer,
        setFarmer,
        getProfile,
        value,
        setValue,
        Register,
        activeNavOption,
        orders,
        getOrders,
        updateProfile,
        insertProduct,
        updateProduct,
        getAllProducts,
        products,
        uploadProductPortFolio,
        deleteProductFolio,
        getProductPortFolio,
        productPortFolio,
        updateOrder,
        getCounts,
        counts,
        recommendCrop,
        recommendFertilizer,
        cropDiseaseDetection,
        cropPrediction,
        fertilizerPrediction,
        cropDisease,
        setCropPrediction,
        setFertilizerPrediction,
        setCropDisease,
        buttonDisable,
        setButtonDisable,
      }}
    >
      {children}
      <ToastContainer />
    </FarmerContext.Provider>
  );
}
