import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./app/store.js";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/RoutesFile.jsx";
import { RouterProvider } from "react-router-dom";

import "./App.css";

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim();
  const appContent = (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );

  return (
    <>
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          {appContent}
        </GoogleOAuthProvider>
      ) : (
        appContent
      )}
    </>
  );
}

export default App;
