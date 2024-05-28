

import UserRegisterForm from "../../components/UserRegisterForm";
import fondo from "../../assets/registerfondo.webp"

const RegisterPage = () => {

  
  return (
   
      <div  style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', padding:"32px" }}>
        <UserRegisterForm
          open={open}
        >
        </UserRegisterForm>
      </div>
  );
};




export default RegisterPage
