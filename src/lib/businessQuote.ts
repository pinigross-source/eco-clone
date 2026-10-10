import { z } from "zod";

export const businessSpaceTypes = ["Hotel, resort or rental", "Office", "Healthcare or senior living", "School, university or childcare", "Gym or fitness club", "Pet business", "Other"] as const;
const optionalText = (max: number) => z.string().trim().max(max).default("");
export const businessQuoteSchema = z.object({
  source: z.literal("business"),
  name: z.string().trim().min(1, "Full name is required").max(100, "Use 100 characters or fewer"),
  company: optionalText(150),
  email: z.string().trim().email("Enter a valid work email").max(255),
  phone: optionalText(30).refine(value => !value || /^[+\d\s().-]{7,30}$/.test(value), "Enter a valid phone number"),
  spaceType: z.union([z.enum(businessSpaceTypes), z.literal("")]).default(""),
  area: optionalText(100),
  needs: optionalText(1000),
});
export type BusinessQuoteData = z.infer<typeof businessQuoteSchema>;
export const BUSINESS_QUOTE_SUBJECT = "Business facility quote request";
export function businessQuoteMessage(data: BusinessQuoteData) {
  return `Company: ${data.company || "Not provided"}\nPhone: ${data.phone || "Not provided"}\nType of space: ${data.spaceType || "Not provided"}\nApprox. area or rooms: ${data.area || "Not provided"}\n\nWhat do you need?\n${data.needs || "Not provided"}`;
}
