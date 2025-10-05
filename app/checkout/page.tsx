"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/app/components/MainLayout";

// --- SVG Icons ---
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Step Components ---

const ShippingAddressStep = ({ onNext }: { onNext: () => void }) => (
  <div className="p-6 space-y-4">
    {/* CORRECTED: Removed defaultValue and added placeholders for consistency */}
    <div>
      <label className="text-sm font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        placeholder="Enter your full name"
        className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Email Address</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Phone</label>
      <input
        type="tel"
        placeholder="Enter your phone number"
        className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Address</label>
      <input
        type="text"
        placeholder="Type your home address"
        className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
      />
    </div>
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          placeholder="Enter here"
          className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          placeholder="Enter here"
          className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700">Country</label>
      <select className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
        <option>Choose your country</option>
        <option>United States</option>
        <option>Canada</option>
        <option>India</option>
      </select>
    </div>
    <div className="flex items-center">
      <input
        id="save-address"
        type="checkbox"
        className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
      />
      <label
        htmlFor="save-address"
        className="ml-2 block text-sm text-gray-900"
      >
        Save shipping address
      </label>
    </div>
    <button
      onClick={onNext}
      className="w-full mt-4 bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center hover:bg-yellow-500 transition-colors"
    >
      NEXT
    </button>
  </div>
);

const PaymentMethodStep = ({ onConfirm }: { onConfirm: () => void }) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "Credit Card" | "UPI" | "Cash on Delivery"
  >("Credit Card");
  const [selectedCard, setSelectedCard] = useState<"gold" | "silver" | null>(
    null
  );

  const CreditCardForm = () => (
    <div className="space-y-4 mt-6">
      <div>
        <label className="text-sm font-medium text-gray-700">
          Card Holder Name
        </label>
        <input
          type="text"
          defaultValue="Customer Name"
          className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-xl shadow-sm py-3 px-4"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          placeholder="XXXX XXXX XXXX XXXX"
          className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">
            Month/Year
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            placeholder="123"
            className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          id="save-card"
          type="checkbox"
          className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="save-card" className="ml-2 block text-sm text-gray-900">
          Save credit card details
        </label>
      </div>
    </div>
  );
  const UpiForm = () => (
    <div className="space-y-4 mt-6">
      <div>
        <label className="text-sm font-medium text-gray-700">UPI ID</label>
        <input
          type="text"
          placeholder="yourname@bank"
          className="mt-1 block w-full bg-white border border-gray-300 rounded-xl shadow-sm py-3 px-4"
        />
      </div>
      <p className="text-xs text-gray-500">
        A payment request will be sent to this UPI ID.
      </p>
    </div>
  );
  const CodSection = () => (
    <div className="mt-6 p-4 bg-gray-100 rounded-xl border">
      <h3 className="font-bold text-gray-800">Confirm Shipping Address</h3>
      <p className="text-sm text-gray-600 mt-2">
        Customer Name <br />
        123 Main Street, Anytown, USA 12345 <br />
        +880 1617202070
      </p>
      <p className="text-xs text-gray-500 mt-4">
        Payment will be collected in cash upon delivery.
      </p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-around mb-6">
        <button
          onClick={() => {
            setPaymentMethod("Cash on Delivery");
            setSelectedCard(null);
          }}
          className={`px-4 py-2 rounded-full font-semibold ${
            paymentMethod === "Cash on Delivery"
              ? "bg-yellow-400 text-gray-800"
              : "bg-white border border-gray-300"
          }`}
        >
          COD
        </button>
        <button
          onClick={() => {
            setPaymentMethod("Credit Card");
            setSelectedCard(null);
          }}
          className={`px-4 py-2 rounded-full font-semibold ${
            paymentMethod === "Credit Card"
              ? "bg-yellow-400 text-gray-800"
              : "bg-white border border-gray-300"
          }`}
        >
          Credit Card
        </button>
        <button
          onClick={() => {
            setPaymentMethod("UPI");
            setSelectedCard(null);
          }}
          className={`px-4 py-2 rounded-full font-semibold ${
            paymentMethod === "UPI"
              ? "bg-yellow-400 text-gray-800"
              : "bg-white border border-gray-300"
          }`}
        >
          UPI
        </button>
      </div>

      {paymentMethod === "Credit Card" && (
        <div>
          <p className="text-center text-sm font-semibold text-gray-600 mb-4">
            Select a card to enter details
          </p>
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setSelectedCard("gold")}
              className={`relative border-2 rounded-xl p-2 transition-all ${
                selectedCard === "gold"
                  ? "border-yellow-400"
                  : "border-transparent"
              }`}
            >
              <Image
                src="/assests/images/CARD1.jpeg"
                alt="Gold Credit Card"
                width={128}
                height={80}
                className="rounded-lg"
              />
              {selectedCard === "gold" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-yellow-500" />
                </div>
              )}
            </button>
            <button
              onClick={() => setSelectedCard("silver")}
              className={`relative border-2 rounded-xl p-2 transition-all ${
                selectedCard === "silver"
                  ? "border-yellow-400"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src="/assests/images/CARD2.jpeg"
                alt="Silver Credit Card"
                width={128}
                height={80}
                className="rounded-lg"
              />
              {selectedCard === "silver" && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-yellow-500" />
                </div>
              )}
            </button>
          </div>
          {selectedCard && <CreditCardForm />}
        </div>
      )}

      {paymentMethod === "UPI" && <UpiForm />}
      {paymentMethod === "Cash on Delivery" && <CodSection />}

      <button
        onClick={onConfirm}
        className="w-full mt-6 bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center hover:bg-yellow-500 transition-colors"
      >
        CONFIRM ORDER
      </button>
    </div>
  );
};

const ConfirmationStep = () => (
  <div className="flex flex-col items-center justify-center text-center p-6 h-full">
    <Image
      src="/assests/images/66.png"
      alt="Order in process"
      width={300}
      height={225}
      className="w-64 h-auto"
    />
    <h2 className="text-2xl font-bold text-gray-800 mt-8">
      Your Order is in process
    </h2>
    <p className="text-gray-600 mt-2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    </p>
    <Link 
      href="/track-order"
      className="block w-full mt-8 bg-yellow-400 text-gray-800 font-bold py-4 rounded-full text-center hover:bg-yellow-500 transition-colors"
    >
      TRACK YOUR ORDER
    </Link>
  </div>
);

export default function CheckoutPage() {
  const [step, setStep] = useState<"address" | "payment" | "confirmation">(
    "address"
  );

  const renderContent = () => {
    switch (step) {
      case "address":
        return <ShippingAddressStep onNext={() => setStep("payment")} />;
      case "payment":
        return <PaymentMethodStep onConfirm={() => setStep("confirmation")} />;
      case "confirmation":
        return <ConfirmationStep />;
      default:
        return <ShippingAddressStep onNext={() => setStep("payment")} />;
    }
  };

  return (
    <MainLayout>
        <div className="w-full max-w-md mx-auto bg-gray-50 flex flex-col min-h-screen">
            <header className="px-4 py-4 flex items-center space-x-4 border-b bg-white sticky top-0 z-10">
            {step === "confirmation" ? (
                <Link href="/home" aria-label="Close and go home">
                <CloseIcon className="w-6 h-6 text-gray-800" />
                </Link>
            ) : step === "address" ? (
                <Link href="/cart" aria-label="Go back to cart">
                <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </Link>
            ) : (
                <button
                onClick={() => setStep("address")}
                aria-label="Go back to shipping"
                >
                <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
            )}
            <h1 className="text-xl font-bold text-gray-800">
                {step === "confirmation" ? "Thank You" : "Checkout"}
            </h1>
            </header>

            <main className="flex-grow overflow-y-auto pb-24">
            {step !== "confirmation" && (
                <div className="p-6 bg-white">
                <div className="relative w-full max-w-sm mx-auto">
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
                    <div
                    className="absolute top-4 left-0 h-1 bg-yellow-400 origin-left transition-transform duration-500 ease-in-out"
                    style={{ transform: `scaleX(${step === "address" ? 0 : 1})` }}
                    ></div>
                    <div className="relative flex justify-between">
                    <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white transition-colors duration-300">
                        {step === "payment" && <CheckIcon className="w-5 h-5" />}
                        </div>
                        <p className="text-sm font-semibold mt-2 text-black">
                        Shipping Address
                        </p>
                      </div>
                      <div className="text-center">
                          <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors duration-300 ${
                              step === "payment" ? "bg-yellow-400" : "bg-gray-200"
                          }`}
                          ></div>
                          <p
                          className={`text-sm font-semibold mt-2 transition-colors duration-300 ${
                              step === "payment" ? "text-black" : "text-gray-400"
                          }`}
                          >
                          Payment Method
                          </p>
                      </div>
                      </div>
                  </div>
                  </div>
              )}
              {renderContent()}
            </main>
        </div>
    </MainLayout>
  );
}

