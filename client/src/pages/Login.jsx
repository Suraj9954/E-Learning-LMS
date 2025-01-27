import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react"; // Import the loader icon
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle the password visibility state
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }

    if (registerError) {
      const errorMessage =
        registerError?.data?.message || "Signup Failed. Please try again.";
      toast.error(errorMessage);
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/"); // Redirect to home page after successful login
    }

    if (loginError) {
      const errorMessage =
        loginError?.data?.message ||
        "Login Failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account here. Click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="Enter your Name"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="Enter your email"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required={true}
                />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  name="password"
                  value={signupInput.password}
                  placeholder="Enter your password"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required={true}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility} // Toggle password visibility
                    className="mr-2"
                  />
                  <Label>Show Password</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Welcome back! Login to your account here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="Enter your email"
                  onChange={(e) => changeInputHandler(e, "login")}
                  required={true}
                />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  type={showPassword ? "text" : "password"} // Toggle password visibility
                  name="password"
                  value={loginInput.password}
                  placeholder="Enter your password"
                  onChange={(e) => changeInputHandler(e, "login")}
                  required={true}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility} // Toggle password visibility
                    className="mr-2"
                  />
                  <Label>Show Password</Label>
                </div>
              </div>
              <div className="mt-2 text-center">
                <Button
                  variant="link"
                  onClick={() => navigate("/reset-password-request")}
                  className="text-sm text-blue-600"
                >
                  Forgot Password?
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
/* 
stripe listen --forward-to http://localhost:8080/api/v1/purchase/webhook
 */
