import { useState } from "react";
import { useResetPasswordRequestMutation } from "@/features/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetPasswordRequest, { isLoading }] = useResetPasswordRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordRequest(email).unwrap();
      setMessage(response.message || "Check your email for reset instructions.");
    } catch (error) {
      setMessage(error.message || "Error sending reset email.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200 text-center">
          Reset Password Request
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none"
            >
              {isLoading ? "Sending..." : "Send Reset Email"}
            </Button>
          </div>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Error")
                ? "text-red-500 dark:text-red-400"
                : "text-green-500 dark:text-green-400"
            }`}
          >
            {message}
          </p>
        )}
        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => window.history.back()}
            className="text-sm text-blue-600"
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
