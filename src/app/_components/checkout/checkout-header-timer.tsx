"use client";
import React, { useEffect, useState } from "react";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import Image from "next/image";
import { siteProduct } from "@/lib/site-info";

type Props = {
  info: CheckoutPageType;
};

const CheckoutHeader = ({ info }: Props) => {
  const [mins, setMins] = useState(10);
  const [secs, setSecs] = useState(0);
  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isExpired) {
      if (!message) {
        // Wait 2 seconds at 00:00 before showing the expiration message
        timer = setTimeout(() => {
          setMessage("Offer Expired... Requesting Extension!");
        }, 1000);
      } else if (message === "Offer Expired... Requesting Extension!") {
        // Show extension message after 3 seconds
        timer = setTimeout(() => {
          setMessage("Extension Granted - You've Got 5 Extra Minutes");
        }, 3000);
      } else {
        // Clear message and reset timer after 3 more seconds
        timer = setTimeout(() => {
          setMessage("");
          setMins(5);
          setSecs(0);
          setIsExpired(false);
        }, 3000);
      }
    } else {
      timer = setInterval(() => {
        if (secs > 0) {
          setSecs(secs - 1);
        } else if (mins > 0) {
          setMins(mins - 1);
          setSecs(59);
        } else {
          setIsExpired(true);
        }
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [mins, secs, isExpired, message]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
      <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#53a1ea] to-[#365bf2]">
        <div className="flex w-full max-w-[1100px] mx-auto justify-between items-center px-4 text-[16px] text-white">
          <p className="w-full p-2 text-center">
            {message || (
              <>
                Attention: This Special Offer Expires In{" "}
                <span className="font-bold whitespace-nowrap">
                  {formatTime(mins)} : {formatTime(secs)}
                </span>
                {" - "}
                Claim Your Discount Now!
              </>
            )}
          </p>
        </div>
      </div>

  );
};

export default CheckoutHeader;
