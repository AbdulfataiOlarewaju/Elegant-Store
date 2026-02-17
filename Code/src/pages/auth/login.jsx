import CommonForm from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AuthLogin() {

    const initialState = {
        email : '',
        password : ''
    }
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    

   function onSubmit(event){
    event.preventDefault()
    dispatch(loginUser(formData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
            toast.success(data?.payload?.message)
          } else{
            toast.error(data?.payload?.message)
          }
      
    })

   }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium text-primary hover:underline ml-2"
            to="/auth/register"
          >
            Sign up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
