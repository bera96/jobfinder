import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="mb-2 md:mb-0 text-4xl">
      ACME
    </Link>
  );
};

export default Logo;
