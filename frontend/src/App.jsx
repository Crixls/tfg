
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";
import router from "./router/router";
import { EntitiesProvider } from "./context/useEntitiesContext";


function App() {
  
  return (
    <>
      <AuthProvider>
        <EntitiesProvider> 
          <RouterProvider router={router} />
        </EntitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App
