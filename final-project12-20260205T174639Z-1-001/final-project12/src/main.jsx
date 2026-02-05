import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Nav from "./nav.jsx";
import ErrorPage from "./Error.jsx";
import MoviesProvider from "./MoviesProvider.jsx";
import HomePage from "./HomePage.jsx";
import RootLayout from "./RootLayout.jsx";
import TVShowsPage from "./TVShowsPage.jsx";
import TVShowsProvider from "./TVShowsProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TVShowDetails from "./TVShowDetails.jsx";
import { DetailsContextProvider } from "./DetailsContextProvider.jsx";
import MovieDetail from "./MovieDetail";
import WishlistPage from "./WishlistPage.jsx";
import { WishlistProvider } from "./WishlistContext.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "tv-shows", element: <TVShowsPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      {path: "/movie/:id",
    element: <MovieDetail />},
      {
        path: "tv-shows/:series_id",
        element: (
          <DetailsContextProvider>
            <TVShowDetails />
          </DetailsContextProvider>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <MoviesProvider>
        <TVShowsProvider>
          <RouterProvider router={router} />
        </TVShowsProvider>
      </MoviesProvider>
    </WishlistProvider>
  </StrictMode>
);
