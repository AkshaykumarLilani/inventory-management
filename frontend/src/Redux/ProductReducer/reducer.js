import { notify } from "../../Utils/notify";
import { GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, VIEW_PRODUCT_REQUEST, VIEW_PRODUCT_FAILURE, VIEW_PRODUCT_SUCCESS, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_FAILURE, EDIT_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS } from "./actionTypes";

const initialState = {
    products: [],
    loading: false,
    selectedProduct: {},
    newProductAdded: false,
    productUpdated: false,
    productDeleted: false,
}
export const productReducer = (state = initialState, action) => {
    const type = action.type;
    switch (type) {
        case GET_ALL_PRODUCTS_REQUEST: {
            return { ...state, loading: true };
        }
        case GET_ALL_PRODUCTS_SUCCESS: {
            return { products: action.payload, loading: false };
        }
        case GET_ALL_PRODUCTS_FAILURE: {
            notify("Error occurred while fetching products", "error");
            return { products: [], loading: false };
        }
        case VIEW_PRODUCT_REQUEST: {
            return { ...state, loading: true, selectedProduct: null };
        }
        case VIEW_PRODUCT_SUCCESS: {
            return { ...state, selectedProduct: { ...action.payload }, loading: false };
        }
        case VIEW_PRODUCT_FAILURE: {
            notify("Error occurred while fetching this product", "error");
            return { ...state, selectedProduct: null, loading: false };
        }
        case EDIT_PRODUCT_REQUEST: {
            return { ...state, loading: true, productUpdated: false };
        }
        case EDIT_PRODUCT_SUCCESS: {
            notify("Product Updated", "success");
            return { ...state, selectedProduct: { ...action.payload }, loading: false, productUpdated: true };
        }
        case EDIT_PRODUCT_FAILURE: {
            notify("Error occurred while fetching this product", "error");
            return { ...state, loading: false, productUpdated: false};
        }
        case CREATE_PRODUCT_REQUEST: {
            return { ...state, loading: true, newProductAdded: false };
        }
        case CREATE_PRODUCT_SUCCESS: {
            notify("New Product Added", "success");
            return { ...state, loading: false, newProductAdded: true };
        }
        case CREATE_PRODUCT_FAILURE: {
            notify("Error occurred while Creating this product", "error");
            return { ...state, loading: false, newProductAdded: false };
        }
        case DELETE_PRODUCT_REQUEST: {
            return { ...state, loading: true, productDeleted: false };
        }
        case DELETE_PRODUCT_SUCCESS: {
            notify("Product Deleted!", "success");
            return { ...state, loading: false, productDeleted: true };
        }
        case DELETE_PRODUCT_FAILURE: {
            notify("Error occurred while Deleting this product", "error");
            return { ...state, loading: false, productDeleted: false };
        }
        default:
            return state;
    }
}