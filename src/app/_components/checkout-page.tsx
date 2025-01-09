import React from "react";
import CheckoutHeader from "./checkout/checkout-header";
import CheckoutForm from "./checkout/checkout-form";
import Footer from "./checkout/checkout-footer";
import { CheckoutPageType } from "@/interfaces/checkoutPage";
import FunnelFluxScripts from "@/lib/funnel-flux-scripts";
import CheckoutClickId from "./checkout/checkout-click-id";
import CheckoutPage2 from "./checkout-page2";
import CheckoutPage3 from "./checkout-page3";

type Props = {
  info: CheckoutPageType;
};

const CheckoutPage = ({ info }: Props) => {
  if (!info) {
    return (
      <div>
        Error: Unable to load checkout information. Please try again later.
      </div>
    );
  }

  return (
    <>
      {info.template === "1" && (
        <div className="flex flex-col items-center relative">
          <CheckoutPage2 info={info} />
        </div>
      )}
      {info.template === "2" && (
        <div className="flex flex-col items-center relative">
          <CheckoutPage3 info={info} />
          {/* Build this Page following the same patterns as Template1 */}
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
