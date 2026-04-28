import type { Metadata } from "next";
import HomePageClient from "./home/page";

const siteUrl = "https://www.robertoarenas.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Orlando & Kissimmee Real Estate Agent | Homes for Sale Across Florida | Roberto Arenas",
  description:
    "Work with Roberto Arenas, a real estate agent serving Orlando, Kissimmee, and buyers and sellers across Florida. Help with homes for sale, relocation, luxury homes, investment property, first-time buyers, and listing strategy.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Orlando & Kissimmee Real Estate Agent | Homes for Sale Across Florida",
    description:
      "Trusted real estate guidance for Orlando, Kissimmee, and all of Florida. Buying, selling, relocation, luxury homes, and investment property support.",
    url: "/",
    siteName: "Roberto Arenas Real Estate",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1900,
        height: 1226,
        alt: "Orlando and Kissimmee real estate agent hero image with luxury Florida home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Orlando & Kissimmee Real Estate Agent | Homes for Sale Across Florida",
    description:
      "Buying, selling, relocation, and investment real estate support in Orlando, Kissimmee, and across Florida.",
    images: ["/images/hero.jpg"],
  },
};

const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Roberto Arenas Real Estate",
  url: siteUrl,
  image: `${siteUrl}/images/rob.jpg`,
  telephone: "+1-407-615-9443",
  email: "homes@robertoarenas.com",
  areaServed: ["Orlando, FL", "Kissimmee, FL", "Central Florida", "Florida"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1451 W Landstreet St",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
  sameAs: [
    // Add your real social/profile URLs here
    // "https://www.instagram.com/...",
    // "https://www.facebook.com/...",
    // "https://www.linkedin.com/in/..."
  ],
  serviceArea: {
    "@type": "State",
    name: "Florida",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentJsonLd),
        }}
      />
      <HomePageClient />
    </>
  );
}
