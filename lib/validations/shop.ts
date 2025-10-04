import { z } from "zod";

export const shopSchema = z.object({
  name: z
    .string()
    .min(1, "Shop name is required")
    .max(100, "Shop name too long"),
  description: z.string().max(500, "Description too long").optional(),
  address: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    landmark: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode format"),
    geoLocation: z
      .object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      })
      .optional(),
    googleMapPlaceId: z.string().optional(),
    // googleMapUrl: z.string().url("Invalid Google Maps URL").optional(),
  }),
  contact: z.object({
    phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    whatsapp: z
      .string()
      .regex(/^\d{10}$/, "Invalid WhatsApp number")
      .optional(),
  }),
  operatingHours: z
    .object({
      monday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      tuesday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      wednesday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      thursday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      friday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      saturday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
          isClosed: z.boolean().optional(),
        })
        .optional(),
      sunday: z
        .object({
          open: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
            .optional(),
          close: z
            .string()
            .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format")
            .optional(),
          isClosed: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
  images: z
    .array(z.string().url("Invalid image URL"))
    .max(10, "Maximum 10 images allowed")
    .optional(),
});

export type ShopFormData = z.infer<typeof shopSchema>;
