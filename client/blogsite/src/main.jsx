import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BlogDataProvider as BlogProvider } from "./context/BlogDataContext.jsx";
import {
  CategoryDataProvider as CategoryProvider,
  SubCategoriesDataProvider as SubCategoryProvider,
} from "./context/CategoryDataContext.jsx";
import { UserDataProvider as UserDataProvider } from "./context/UserDataContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <BlogProvider>
          <CategoryProvider>
            <SubCategoryProvider>
              <UserDataProvider>
                <App />
              </UserDataProvider>
            </SubCategoryProvider>
          </CategoryProvider>
        </BlogProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
