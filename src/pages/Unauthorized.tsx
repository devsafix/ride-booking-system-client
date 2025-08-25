import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div className="flex min-h-[calc(70vh-4rem)] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold tracking-tighter text-primary sm:text-6xl md:text-7xl">
          401
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Unauthorized Access
        </h2>
        <p className="text-lg text-muted-foreground">
          It looks like you don't have permission to view this page. Don't
          worry, it happens!
        </p>
      </div>
      <Button asChild className="mt-4">
        <Link to="/">Go back to the homepage</Link>
      </Button>
    </div>
  );
}
