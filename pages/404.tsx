import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [router]);
  return (
    <div className="flex min-h-4/5 items-center justify-center">
      <h3 className="max-w-xl text-3xl font-semibold leading-relaxed text-gray-900">
        Page you are looking at was not found. We are redirecting you to{" "}
        <Link className="text-primary underline" href="/">
          home page
        </Link>
      </h3>
    </div>
  );
};

export default NotFound;
