import React from "react";
import Logo from "../logo/Logo";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      data-testid="footer"
      className="min-h-[20] md:grid md:grid-cols-12 gap-2 md:gap-8 lg:gap-16 p-8 border-t flex flex-col"
    >
      <div className="col-span-7 lg:col-span-5 md:flex  gap-8">
        <Logo />
        <div className="">
          <h3 className="font-semibold mb-2">Ready to get started?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
          </p>
        </div>
      </div>
      <div className="col-span-1 w-1 h-full bg-black hidden lg:block "></div>
      <div className="col-span-4 lg:col-span-3 justify-start flex align-bottom items-end ">
        <p className="flex-shrink-0"> © 2010 — {currentYear} Privacy — Terms </p>
      </div>
    </footer>
  );
};

export default Footer;
