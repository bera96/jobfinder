"use client";
import Footer from "@/components/footer/Footer";

export default function Dashboard() {
  return (
    <>
      <div className="bg-gray-300 flex justify-center gap-6 flex-col items-center text-center min-h-[60vh]">
        <h1 className="text-3xl md:text-5xl font-medium">Best Position Ever Found</h1>
        <p className="p-2 md:max-w-[400px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <Footer />
    </>
  );
}
