import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Visa support from Pakistan", description: "Visa checklists, document preparation and filing support for Umrah, UAE, Turkey, Azerbaijan, Malaysia, Thailand and Schengen from PunjKash, Lahore." };
export default function Page() {
  return <ServicePage title="Visa support, with the checklist before the fee" intro="Umrah, UAE, Turkey, Azerbaijan, Malaysia, Thailand, Schengen and more. We tell you exactly which documents, how long, and what it costs, before you commit." points={["Document checklist for each country", "Form filling, appointments and submission where allowed", "Honest processing times, no promises we cannot keep", "Fees stated upfront, embassy fees separate and shown"]} waText="Assalam o Alaikum, I need visa support. Country: __ Travel dates: __" />;
}
