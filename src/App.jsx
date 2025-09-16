import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./layouts/app-layout";
import { Home as Home } from "./layouts/home";
import { Search as SearchPage } from "./layouts/search";
import { SingleGif as GifPage } from "./layouts/single-gif";
import { Favourites as Favourites } from "./layouts/favourites";
import { Category as CategoryPage } from "./layouts/category";
import GifProvider from "./context/gif-context";

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
  return (
    <GifProvider>
      <RouterProvider router={router} />;
    </GifProvider>
  );
}

export default App;
