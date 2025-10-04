import SellerForm from "@/components/modules/shopkeeper/sellerForm";
import { Store } from "lucide-react";

export default function BecomeASeller() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Store className="text-blue-600" />
            Become a Seller
          </h1>
          <p className="text-gray-600">
            Fill out this form to register your shop on our platform
          </p>
        </div>
        <SellerForm />
      </div>
    </div>
  );
}
