"use client";
export const runtime = "edge";

import {
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  useRef,
  FormEvent,
} from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import Image from "next/image";

import {
  BadgeCheck,
  House,
  KeyRound,
  MapPinned,
  LineChart,
  Handshake,
} from "lucide-react";

type Neighborhood = {
  title: string;
  name: string;
  bg: string;
};

type Service = {
  name: string;
  use: string;
  img: string;
};

type Status = "" | "SUCCESS" | "ERROR" | "SENDING";

type FormDataState = {
  name: string;
  company: string;
  phone: string;
  user_email: string;
  message: string;
  file: File | null;
};

const initialFormData: FormDataState = {
  name: "",
  company: "",
  phone: "",
  user_email: "",
  message: "",
  file: null,
};

const neighborhoods: Neighborhood[] = [
  {
    title: "Downtown -",
    name: "Luxury condos, walkable dining, nightlife, and skyline views.",
    bg: "/images/downtownCondos.webp",
  },
  {
    title: "Lakefront -",
    name: "Waterfront homes, private docks, and scenic outdoor living.",
    bg: "/images/lakefrontHomes.webp",
  },
  {
    title: "Suburban -",
    name: "Family friendly neighborhoods, parks, and top-rated schools.",
    bg: "/images/suburbs.webp",
  },
  {
    title: "New Construction -",
    name: "Modern layouts, low energy use, and builder incentives.",
    bg: "/images/newConstruction.webp",
  },
  {
    title: "Investment* -",
    name: "Rental properties, duplexes, and high growth opportunities.",
    bg: "/images/duplex.webp",
  },
  {
    title: "Gated Communities -",
    name: "Privacy, amenities, and curated neighborhood living.",
    bg: "/images/gatedCommunity.webp",
  },
  {
    title: "Vacation Homes -",
    name: "Second homes near beaches, golf, and resorts.",
    bg: "/images/vacationHome.webp",
  },
];

const services = [
  {
    name: "Buyer Representation",
    use: "Search strategy, tours, offers, negotiations, inspections, and closing guidance.",
    icon: House,
  },
  {
    name: "Seller Strategy",
    use: "Pricing, presentation, launch planning, and contract negotiation to maximize value.",
    icon: LineChart,
  },
  {
    name: "Luxury Marketing",
    use: "Elevated listing presentation, refined media, and targeted exposure.",
    icon: BadgeCheck,
  },
  {
    name: "Relocation Support",
    use: "Neighborhood insight, commute planning, and local guidance for smooth moves.",
    icon: MapPinned,
  },
  {
    name: "Investment Guidance",
    use: "Rental potential, appreciation trends, and property fit for long-term goals.",
    icon: KeyRound,
  },
  {
    name: "Negotiation & Closing",
    use: "Clear communication, strategic advocacy, and support through final signatures.",
    icon: Handshake,
  },
];

export default function HomePageClient() {
  const [fadeIn, setFadeIn] = useState(false);
  const [status, setStatus] = useState<Status>("");

  const [activeNeighborhood, setActiveNeighborhood] =
    useState<Neighborhood | null>(null);

  const [formData, setFormData] = useState<FormDataState>(initialFormData);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    setFadeIn(true);

    emailjs.init({
      publicKey:
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "wZaUpLZvQucbZMd3J",
      blockHeadless: true,
      limitRate: {
        id: "app",
        throttle: 5000,
      },
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? (files[0] ?? null) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formRef.current) {
      setStatus("ERROR");
      return;
    }

    try {
      setStatus("SENDING");

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_7hogr9p",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_dh43i98",
        formRef.current,
      );

      setStatus("SUCCESS");
      setFormData(initialFormData);
      formRef.current.reset();

      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Failed to send email", error);
      setStatus("ERROR");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const currentBg = useMemo(
    () => activeNeighborhood?.bg ?? "/images/real-estate/suburban.jpg",
    [activeNeighborhood],
  );

  return (
    <div className="w-full">
      <div
        className={`relative flex h-screen md:h-[80vh] flex-col justify-center transition-colors duration-2000 ease-out ${
          fadeIn ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
        }`}
      >
        <Image
          src="/images/hero.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          alt="Luxury home in Central Florida representing Orlando and Kissimmee real estate services"
          width={1900}
          height={1226}
          priority
          draggable={false}
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 mx-auto max-w-7xl pb-20 pt-12 sm:pt-16 lg:pt-24">
          <header>
            <div
              className={`mb-12 text-left text-lg text-white xs:text-xl md:text-3xl lg:text-3xl transition-all duration-1000 delay-300 ease-out ${
                fadeIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              aria-labelledby="welcome-heading"
            >
              <div className="mx-auto flex h-fit w-[75%] flex-col md:w-1/2">
                <div className="mb-4 text-center">
                  <p className="mb-3 text-xs uppercase tracking-[0.45em] text-neutral-200 sm:text-sm font-semibold">
                    Trusted Local Real Estate Guidance
                  </p>
                  <h1
                    id="welcome-heading"
                    className="text-4xl font-bold sm:text-5xl md:text-6xl"
                  >
                    Find the Right Home With Confidence
                  </h1>
                </div>

                <div>
                  <hr className="mb-1" />
                  <p className="text-center text-xs uppercase tracking-[0.35em] text-neutral-200 sm:text-sm font-semibold">
                    Buying, selling, and relocating with a personal touch
                  </p>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-block rounded-md border-2 border-white bg-white px-6 py-3 text-center text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-transparent hover:text-white"
                  >
                    Schedule a Consultation
                  </Link>
                  <Link
                    href="/listings"
                    className="inline-block rounded-md border-2 border-white bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
                  >
                    View Featured Listings
                  </Link>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <section className="px-6 py-16 text-center md:text-left lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-2">
          <div
            className={`my-auto flex flex-col transition-all duration-1000 ease-out ${
              fadeIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="mb-3 text-xs font-semibold! uppercase tracking-[0.3em] dark:font-normal sm:text-base lg:text-lg">
              Roberto Arenas
            </p>
            <h2 className="mb-5 text-2xl font-bold sm:text-3xl md:text-4xl">
              Local Market Insight. Personal Representation.
            </h2>
            <p className="mb-5 text-sm leading-relaxed sm:text-base lg:text-lg">
              I help buyers, sellers, and investors navigate the market with a
              strategy built around clarity, communication, and results. From
              first showings to final signatures, every step is handled with
              close attention to timing, value, and the details that matter.
            </p>
            <p className="text-sm leading-relaxed sm:text-base lg:text-lg">
              My focus is simple: strong guidance, thoughtful negotiation, and a
              smooth experience from search to closing.
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className={`overflow-hidden rounded-2xl border-2 border-white shadow-neonDark transition-all duration-1000 ease-out dark:border-black dark:shadow-neonLight ${
                fadeIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative aspect-square min-w-full">
                <Image
                  src="/images/rob.jpg"
                  alt="Roberto Arenas, real estate agent serving Orlando, Kissimmee, and all of Florida"
                  width={500}
                  height={500}
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services"
        className="px-6 pb-14 text-center md:text-left lg:px-10 lg:pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm sm:text-base lg:text-lg font-semibold! uppercase tracking-[0.3em] dark:font-normal ">
              Services
            </p>

            <h2 id="services" className="text-3xl font-bold md:text-4xl">
              Real Estate Support For Every Stage
            </h2>

            <p className="mt-4 leading-relaxed text-neutral-700 dark:text-neutral-300 lg:text-lg">
              Whether you are buying your first home, selling a luxury property,
              or planning your next investment, each move deserves a clear
              strategy and responsive representation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.name}
                  className={`rounded-2xl border border-neutral-200 bg-white/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 dark:border-neutral-800 dark:bg-neutral-950/90 dark:hover:shadow-white/10 ${
                    fadeIn
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="mb-4 flex gap-4 align-middle items-center justify-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black dark:text-white">
                        {service.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-[15px] text-center">
                    {service.use}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section
        aria-labelledby="neighborhoods"
        className="px-6 pb-16 lg:px-10 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className="relative flex min-h-[26rem] flex-col justify-center bg-cover bg-center bg-no-repeat p-8 transition-all duration-300 ease-in lg:p-10"
              draggable={false}
              style={{ backgroundImage: `url(${currentBg})` }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-200 sm:text-base lg:text-lg">
                  Area Expertise
                </p>

                <h2
                  id="neighborhoods"
                  className="mb-4 text-3xl font-bold text-white md:text-4xl"
                >
                  Neighborhoods and Property Types
                </h2>

                <p className="mb-6 text-lg leading-relaxed text-neutral-200">
                  Explore the kinds of communities and homes I help clients find
                  across the market.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 dark:bg-neutral-950 lg:p-10">
              <p className="mb-8 text-sm font-bold text-neutral-600 dark:text-neutral-400">
                Ask about off-market and coming-soon opportunities.
              </p>

              <ul className="grid gap-4 text-neutral-600 dark:text-neutral-400 sm:grid-cols-2 lg:grid-cols-1">
                {neighborhoods.map((item) => (
                  <li
                    key={item.title}
                    onMouseEnter={() => setActiveNeighborhood(item)}
                    className="group flex cursor-pointer flex-col gap-2 border-b border-neutral-200 pb-3 transition-all duration-300 hover:pl-2 font-semibold dark:font-normal  hover:text-black dark:border-neutral-800  dark:hover:text-white lg:flex-row"
                  >
                    <h4 className="font-bold text-neutral-700 transition-all duration-300 group-hover:text-black dark:text-neutral-300 dark:group-hover:text-white">
                      {item.title}
                    </h4>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-semibold text-neutral-500 dark:font-normal dark:text-neutral-400">
                *Ideal for buyers seeking rental income or long-term equity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-contact"
        className="px-6 pb-14 lg:px-10 lg:pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-neonDark dark:border-neutral-800 dark:bg-neutral-950/95 dark:shadow-neonLightSlim">
            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.25fr]">
              <div className="border-b border-neutral-200 p-6 dark:border-neutral-800 lg:border-b-0 lg:border-r lg:p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-400">
                  Quick Contact
                </p>

                <h2
                  id="home-contact"
                  className="text-2xl font-bold text-black dark:text-white sm:text-3xl"
                >
                  Let’s Talk About Your Next Move
                </h2>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
                  Buying, selling, or just exploring your options? Send a quick
                  note and I’ll reach out with the next best steps.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                      Service Area
                    </p>
                    <p className="mt-1 text-sm text-black dark:text-white">
                      Orlando / Kissimmee, FL
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                      Direct Contact
                    </p>
                    <p className="mt-1 text-sm text-black dark:text-white">
                      (407) 615-9443
                    </p>
                    <p className="text-sm text-black dark:text-white">
                      Homes@RobertoArenas
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  aria-label="Home Contact Form"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-gray-600 dark:text-neutral-200">
                        Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-label="Name"
                        required
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:placeholder-neutral-600 dark:focus:border-neutral-500 dark:focus:ring-neutral-400/20"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-600 dark:text-neutral-200">
                        Email*
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        aria-label="Email Address"
                        required
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:placeholder-neutral-600 dark:focus:border-neutral-500 dark:focus:ring-neutral-400/20"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-600 dark:text-neutral-200">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-label="Phone Number"
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:placeholder-neutral-600 dark:focus:border-neutral-500 dark:focus:ring-neutral-400/20"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-600 dark:text-neutral-200">
                        Interest
                      </label>
                      <select
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        aria-label="Inquiry Type"
                        className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:focus:border-neutral-500 dark:focus:ring-neutral-400/20"
                      >
                        <option value="">Select one</option>
                        <option value="Buying">Buying</option>
                        <option value="Selling">Selling</option>
                        <option value="Investing">Investing</option>
                        <option value="Relocating">Relocating</option>
                        <option value="General Question">
                          General Question
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                      Message*
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      aria-label="Message"
                      required
                      className="block h-28 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-100/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300 dark:placeholder-neutral-600 dark:focus:border-neutral-500 dark:focus:ring-neutral-400/20"
                      placeholder="Tell me a little about what you’re looking for..."
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-h-[1.25rem]">
                      {status === "SUCCESS" && (
                        <p className="text-sm text-green-500">
                          Message sent successfully!
                        </p>
                      )}
                      {status === "ERROR" && (
                        <p className="text-sm text-red-500">
                          Failed to send message. Please try again later.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      aria-label="Submit Message"
                      disabled={status === "SENDING"}
                      className="inline-flex min-w-40 items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                      {status === "SENDING" ? "Sending..." : "Send Inquiry"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="contact"
        className="bg-white pt-4 transition-all duration-500 ease-in-out dark:bg-transparent dark:bg-linear-to-br dark:from-white/15 dark:via-transparent lg:pt-12"
      >
        <div className="container mx-auto max-w-7xl rounded-xl px-8 py-8 lg:px-12 lg:py-12">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center lg:justify-start">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.3em] text-neutral-700 dark:text-neutral-300  sm:text-base lg:text-lg lg:text-left">
                Orlando / Kissimmee
              </p>

              <h2
                id="contact"
                className="mb-4 text-center text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-left"
              >
                Ready to Buy or Sell?
              </h2>

              <p className="mx-auto mb-6 max-w-xl text-center leading-relaxed text-neutral-800 dark:text-neutral-300 md:max-w-2xl lg:mx-0 lg:text-left">
                Reach out to discuss your timeline, your goals, and what the
                current market means for your next move. I’m here to make the
                process feel informed, organized, and manageable.
              </p>

              <div className="mx-auto mb-8 gap-4 text-center sm:grid-cols-2 lg:mx-0 lg:text-left">
                <div>
                  <p className="mb-1 max-w-xl font-semibold leading-relaxed text-neutral-500 dark:font-normal dark:text-neutral-400">
                    Buyer / Seller Consultations
                  </p>
                  <p>Homes@RobertoArenas.com</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Link
                  href="/contact"
                  aria-label="Contact Realtor"
                  className="inline-block min-w-32 rounded-md border-2 border-black bg-white px-5 py-3 text-center font-semibold text-neutral-500 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white hover:shadow-md hover:shadow-white/50 dark:border-white dark:bg-black dark:font-normal dark:text-white dark:hover:border-neutral-500 dark:hover:bg-white dark:hover:text-neutral-700 dark:hover:shadow-black/50"
                >
                  Contact Me
                </Link>
              </div>
            </div>

            <div className="h-96 min-h-80 overflow-hidden rounded-xl border-2 border-white shadow-neonDark dark:border-black dark:shadow-neonLight lg:h-auto">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                title="Map showing service area"
                aria-label="Map showing realtor service area"
                src="https://www.google.com/maps?q=Orlando,+FL&z=11&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <hr className="mx-4 mt-4 border-neutral-300 dark:border-neutral-800 lg:mt-20" />
      </section>
    </div>
  );
}
