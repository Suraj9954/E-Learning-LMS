import { useState } from "react";
import { useParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/features/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ token, newPassword }).unwrap();
      setMessage(response.message || "Password reset successful.");
      setShowPopup(true);
    } catch (error) {
      setMessage(error.message || "Error resetting password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
          Reset Your Password
        </h2>
        <div className="mb-4">
          <Label
            htmlFor="newPassword"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
        {message && !showPopup && (
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
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
              Password Reset Successful
            </h3>
            <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
              {message}
            </p>
            <Button
              onClick={() => (window.location.href = "/login")}
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 text-white font-semibold rounded-md focus:outline-none"
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
