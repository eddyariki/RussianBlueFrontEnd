import Home from "./pages/Home/Home";
import Test from "./pages/Test/Test";
import ReviewForm from "./pages/ReviewForm/ReviewForm";
import Login from "./pages/Login/Login";
import ProductSearch from "./pages/ProductSearch/ProductSearch";
import Product from "./pages/Product/Product";
import ImageGeneration from "./pages/ImageGeneration/ImageGeneration";
import EditReviewForm from "./pages/EditReviewForm/EditReviewForm";
import Account from "./pages/Account/Account";
import Review from "./pages/Review/Review";
export const routes = [
  {
    path: "/",
    component: ProductSearch,
  },
  {
    path: "/reviewform",
    component: ReviewForm,
  },
  {
    path: "/editreviewform",
    component: EditReviewForm,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/product",
    component: Product,
  },
  {
    path: "/image",
    component: ImageGeneration,
  },
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/review",
    component: Review,
  },
];

export const privateRoutes = ["/account", "/reviewform", "/editreviewform"];
