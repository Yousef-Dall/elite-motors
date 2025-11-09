import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import { I18nProvider } from "./providers/I18nProvider.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import { SEOProvider } from "./components/seo/SEO.jsx";

import App from "./App.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PartsPage from "./pages/PartsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App><LandingPage /></App> },
  { path: "/parts", element: <App><PartsPage /></App> },
  { path: "/pricing", element: <Navigate to="/parts" replace /> },
  { path: "/booking", element: <App><BookingPage /></App> },
  { path: "/blog", element: <App><BlogPage /></App> },
  { path: "/blog/:slug", element: <App><ArticlePage /></App> },
  { path: "/privacy", element: <App><PrivacyPage /></App> },
  { path: "/terms", element: <App><TermsPage /></App> },
  { path: "*", element: <App><NotFoundPage /></App> }
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SEOProvider>
      <I18nProvider>
        <ThemeProvider>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </ThemeProvider>
      </I18nProvider>
    </SEOProvider>
  </React.StrictMode>
);
