import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./layouts/app-layout";
import { home as Home } from "./layouts/home";
import { search as SearchPage } from "./layouts/search";
import { singleGif as GifPage } from "./layouts/single-gif";
import { favourites as Favourites } from "./layouts/favourites";
import { category as CategoryPage } from "./layouts/category";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search/:query", element: <SearchPage /> },
      { path: "/:type/:slug", element: <GifPage /> },
      { path: "/favourites", element: <Favourites /> },
      { path: "/:category", element: <CategoryPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
