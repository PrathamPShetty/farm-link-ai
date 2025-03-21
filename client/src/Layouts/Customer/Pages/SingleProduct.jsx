import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Banner/PageBanner";
import SingleProductData from "../Components/Home/SingleProductData";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";

export default function SingleProduct() {
  const { id } = useParams();
  const { singleProduct, viewSingleProduct, host } =
    useContext(CustomerContext);
  useEffect(() => {
    viewSingleProduct(id);
  }, [id]);
  //   console.log(singleProduct);
  return (
    <Box>
      <Box>
        <PageBanner title="Product Details" />
      </Box>
      <Box>
        <SingleProductData
          product={singleProduct?.product}
          isFavorite={singleProduct?.isFavorite}
          host={host}
          farmer={singleProduct?.product?.farmer}
          posts={singleProduct?.productPortFolio}
        />
      </Box>
    </Box>
  );
}
