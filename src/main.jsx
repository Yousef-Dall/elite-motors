// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { I18nProvider } from "./providers/I18nProvider.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";

import App from "./App";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import BookingPage from "./pages/BookingPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <LandingPage />
      </App>
    ),
  },
  {
    path: "/pricing",
    element: (
      <App>
        <PricingPage />
      </App>
    ),
  },
  {
    path: "/booking",
    element: (
      <App>
        <BookingPage />
      </App>
    ),
  },
  {
    path: "/blog",
    element: (
      <App>
        <BlogPage />
      </App>
    ),
  },
  {
    path: "/blog/:slug",
    element: (
      <App>
        <ArticlePage />
      </App>
    ),
  },
  {
    path: "*",
    element: (
      <App>
        <NotFoundPage />
      </App>
    ),
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true }}
        />
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>
);

