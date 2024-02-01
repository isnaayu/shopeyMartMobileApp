import ApiInstance from "../api/api";

export const getAllProduct = () => {
    return ApiInstance.get("product/page");
  };