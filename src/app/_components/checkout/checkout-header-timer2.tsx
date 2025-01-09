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
    <>
      <div className="w-full">
        <div className="flex w-full relative">
          <div className="flex w-full justify-center z-10 py-4 shadow-[0_3px_4px_0_rgba(0,0,0,0.1)]">
            <div className="flex w-full max-w-[1100px] px-4 flex-col lg:flex-row">
              {/* <div className="hidden lg:flex w-1/2 justify-start items-center">
                <Image
                  src={info.header.product}
                  alt={siteProduct}
                  width={300}
                  height={300}
                  priority
                />
              </div> */}
              <div className="flex w-full max-md:justify-center justify-between ">
                <Image
                  src={info.header.logo}
                  alt={siteProduct}
                  width={200}
                  height={120}
                  className="h-14 object-scale-down"
                  priority
                />
                <Image
                  src={info.header.badge}
                  alt={siteProduct}
                  width={130}
                  height={130}
                  className="h-14 object-scale-down max-md:hidden "
                  priority
                />
              </div>
              {/* <div className="flex lg:hidden w-full justify-center items-center">
                <Image
                  src={info.header.product}
                  alt={siteProduct}
                  width={200}
                  height={200}
                  priority
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutHeader;
