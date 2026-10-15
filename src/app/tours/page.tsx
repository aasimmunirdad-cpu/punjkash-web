import ServicePage from "@/components/ServicePage";
export const metadata = { title: "Tours of Punjab, Kashmir and northern Pakistan", description: "Lahore, Neelum Valley, Skardu, Hunza and more, with PunjKash's own itineraries and trusted local hosts." };
export default function Page() {
  return <ServicePage title="Punjab, Kashmir and the north, planned by people from here" intro="The name is Punjab plus Kashmir. Lahore's old city, the Kashmir valleys, Skardu and Hunza, with our own itineraries and hosts we know by name." status="First tour departures are planned for early 2027. Join the list on WhatsApp and you will hear first." points={["Private family tours and small groups", "Own itineraries, plus partner packages where they are better", "Transport, hotels and guides priced together", "Honest advice on weather, roads and what is worth the drive"]} waText="Assalam o Alaikum, please add me to the PunjKash tours list. Interested in: __" />;
}
