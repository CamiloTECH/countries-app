import { Button } from "@/components/ui";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md text-center p-8 bg-background rounded-lg ">
        <h1 className="text-4xl font-bold mb-4">
          404 - Not Found
        </h1>
        <p className="mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button>Return to homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
