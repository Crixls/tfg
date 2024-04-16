

import UserRegisterForm from "../../components/UserRegisterForm";

const RegisterPage = () => {

  
  return (
   
      <div  style={{ backgroundImage: 'url(/src/assets/registerfondo.webp)', backgroundSize: 'cover', backgroundPosition: 'center', padding:"49px" }}>
        <UserRegisterForm
          open={open}
        >
        </UserRegisterForm>
      </div>
  );
};




export default RegisterPage
