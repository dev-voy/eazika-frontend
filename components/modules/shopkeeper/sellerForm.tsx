"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shopSchema, type ShopFormData } from "@/lib/validations/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Clock,
  MapPin,
  Phone,
  Image as ImageIcon,
  Store,
  X,
} from "lucide-react";
import axios, { isAxiosError } from "@/lib/axios";
import { useAppSelector } from "@/store/hooks";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
const DAY_LABELS = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default function SellerForm() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      address: {
        country: "India",
        state: "Maharashtra",
      },
      operatingHours: {
        monday: { open: "09:00", close: "18:00", isClosed: false },
        tuesday: { open: "09:00", close: "18:00", isClosed: false },
        wednesday: { open: "09:00", close: "18:00", isClosed: false },
        thursday: { open: "09:00", close: "18:00", isClosed: false },
        friday: { open: "09:00", close: "18:00", isClosed: false },
        saturday: { open: "09:00", close: "18:00", isClosed: false },
        sunday: { open: "09:00", close: "18:00", isClosed: true },
      },
    },
  });

  useEffect(() => {
    if (user.role === "SHOPKEEPER") {
      toast.warning("You are already a registered seller");
      setTimeout(() => router.push("/profile"), 1000);
    }
  }, [user.role, router]);

  const onSubmit = async (data: ShopFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form data:", data);

      // Here you would typically send the data to your API
      // await submitShopData(data);
      const response = await axios.post("/shop/become-a-seller", data);

      if (response.status !== 200) {
        throw new Error("Failed to submit shop registration");
      }
      toast.success("Shop registration submitted successfully!");
      reset();
      setTimeout(() => router.push("/shop"), 1000);
    } catch (error) {
      // console.error("Error submitting form:", error);
      if (isAxiosError(error)) {
        toast.error(
          error?.response?.data.message || error.message || "Submission failed"
        );
      } else if (error instanceof Error) {
        toast.error(error?.message || "Submission failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageUrl = () => {
    if (imageInput && imageUrls.length < 10) {
      const newImages = [...imageUrls, imageInput];
      setImageUrls(newImages);
      setValue("images", newImages);
      setImageInput("");
    }
  };

  const removeImageUrl = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    setValue("images", newImages);
  };

  const operatingHours = watch("operatingHours");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Shop Details Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Store className="text-blue-600 size-5" />
          Shop Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Shop Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your shop name"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your shop and what you sell"
              className="mt-1"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="text-blue-600 size-5" />
          Address Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="address.line1">Address Line 1 *</Label>
            <Input
              id="address.line1"
              {...register("address.line1")}
              placeholder="Street address, building number"
              className="mt-1"
            />
            {errors.address?.line1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.line1.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address.line2">Address Line 2</Label>
            <Input
              id="address.line2"
              {...register("address.line2")}
              placeholder="Apartment, suite, floor (optional)"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address.landmark">Landmark</Label>
            <Input
              id="address.landmark"
              {...register("address.landmark")}
              placeholder="Nearby landmark"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address.city">City *</Label>
            <Input
              id="address.city"
              {...register("address.city")}
              placeholder="City"
              className="mt-1"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address.state">State *</Label>
            <Input
              id="address.state"
              readOnly
              {...register("address.state")}
              placeholder="State"
              className="mt-1"
            />

            {errors.address?.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.state.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address.country">Country *</Label>
            <Input
              id="address.country"
              readOnly
              {...register("address.country")}
              placeholder="Country"
              className="mt-1"
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.country.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="address.pincode">Pincode *</Label>
            <Input
              id="address.pincode"
              {...register("address.pincode")}
              placeholder="6-digit pincode"
              className="mt-1"
            />
            {errors.address?.pincode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.pincode.message}
              </p>
            )}
          </div>

          {/* <div>
            <Label htmlFor="address.googleMapUrl">Google Maps URL</Label>
            <Input
              id="address.googleMapUrl"
              {...register("address.googleMapUrl")}
              placeholder="https://maps.google.com/..."
              className="mt-1"
            />
            {errors.address?.googleMapUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.googleMapUrl.message}
              </p>
            )}
          </div> */}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="text-blue-600 size-5" />
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contact.phone">Phone Number *</Label>
            <Input
              id="contact.phone"
              {...register("contact.phone")}
              placeholder="10-digit phone number"
              className="mt-1"
            />
            {errors.contact?.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="contact.email">Email Address *</Label>
            <Input
              id="contact.email"
              type="email"
              {...register("contact.email")}
              placeholder="shop@example.com"
              className="mt-1"
            />
            {errors.contact?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="contact.whatsapp">WhatsApp Number</Label>
            <Input
              id="contact.whatsapp"
              {...register("contact.whatsapp")}
              placeholder="10-digit WhatsApp number"
              className="mt-1"
            />
            {errors.contact?.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.whatsapp.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Operating Hours Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="text-blue-600 size-5" />
          Operating Hours
        </h2>

        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="flex items-center gap-4 p-4 bg-white rounded-lg"
            >
              <div className="w-24 font-medium">{DAY_LABELS[day]}</div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${day}-closed`}
                  checked={operatingHours?.[day]?.isClosed || false}
                  onChange={(e) => {
                    setValue(
                      `operatingHours.${day}.isClosed`,
                      e.target.checked
                    );
                  }}
                  className="rounded"
                />
                <Label htmlFor={`${day}-closed`}>Closed</Label>
              </div>

              {!operatingHours?.[day]?.isClosed && (
                <>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${day}-open`}>Open:</Label>
                    <Input
                      id={`${day}-open`}
                      type="time"
                      {...register(`operatingHours.${day}.open`)}
                      className="w-32"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${day}-close`}>Close:</Label>
                    <Input
                      id={`${day}-close`}
                      type="time"
                      {...register(`operatingHours.${day}.close`)}
                      className="w-32"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="text-blue-600 size-5" />
          Shop Images (Optional)
        </h2>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <Button
              type="button"
              onClick={addImageUrl}
              disabled={!imageInput || imageUrls.length >= 10}
              variant="outline"
            >
              Add Image
            </Button>
          </div>

          {imageUrls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Added Images ({imageUrls.length}/10):
              </p>
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-white rounded border"
                >
                  <span className="flex-1 text-sm truncate">{url}</span>
                  <Button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="px-8">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
