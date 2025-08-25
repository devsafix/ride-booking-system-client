import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const AccountStatus = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(70vh-64px)] p-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Account Blocked</h1>
      <p className="text-lg max-w-2xl mb-6">
        Your account has been blocked or suspended due to a violation of our
        terms of service. You will not be able to access your dashboard or use
        our services.
      </p>
      <p className="text-md mb-8">
        For more information or to resolve this issue, please contact support.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button>
          <Link to="/" className="hover:underline">
            Go to Homepage
          </Link>
        </Button>
        <Button variant="outline" className="border border-black">
          <Link to="/contact" className="hover:underline">
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountStatus;
