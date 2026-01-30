"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Map,
  ArrowRight,
  Plane,
  Menu,
  Compass,
  MapPin,
  Globe,
  Calendar,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: "TOURS", href: "/tours" },
  { title: "DESTINATIONS", href: "#destinations" },
  { title: "ABOUT", href: "#about" },
  { title: "CONTACT", href: "#contact" },
]

const labels = [
  { icon: MapPin, label: "Local Guides" },
  { icon: Compass, label: "Custom Itineraries" },
  { icon: Globe, label: "Worldwide Destinations" },
]

const features = [
  {
    icon: Map,
    label: "Expert Planning",
    description:
      "Crafting exceptional journeys from global escape plans to unleash your wanderlust.",
  },
  {
    icon: Calendar,
    label: "Flexible Booking",
    description:
      "Book your next adventure with confidence and flexible cancellation policies.",
  },
  {
    icon: Plane,
    label: "Seamless Travel",
    description:
      "Experience stress-free travel with our end-to-end support and local expertise.",
  },
]

interface TourHeroProps {
  main_image?: string
  name?: string
  introduction?: string
  price?: string
  alt?: string
}

export function TourHero({
  main_image,
  name = "UNLEASH YOUR WANDERLUST",
  introduction = "Crafting exceptional journeys from global escape plans to unleash your wanderlust. Seamless travel, extraordinary adventures.",
  price,
  alt,
}: TourHeroProps = {}) {
  const controls = useAnimation()
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Use framer-motion's scroll detection
  const { scrollY } = useScroll()
  const [isAtTop, setIsAtTop] = React.useState(true)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest < 50)
  })

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Split name into words for animation
  const titleWords = name.split(" ")

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isAtTop
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <Compass
                  className={`h-8 w-8 text-primary ${
                    !isAtTop ? "drop-shadow-lg" : ""
                  }`}
                />
                <span
                  className={`font-mono text-xl font-bold ${
                    !isAtTop ? "text-white drop-shadow-lg" : "text-foreground"
                  }`}
                >
                  Travelu
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-mono hover:text-primary transition-colors ${
                    !isAtTop ? "text-white drop-shadow-lg" : "text-foreground"
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                className="rounded-lg hidden md:inline-flex bg-primary hover:bg-primary-dark font-mono shadow-lg"
              >
                BOOK NOW <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col gap-6 mt-6">
                    {navigationItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="text-sm font-mono text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                    <Button className="cursor-pointer rounded-lg bg-primary hover:bg-primary-dark font-mono">
                      BOOK NOW <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>

      <main>
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          {main_image && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={main_image}
                alt={alt || name}
                fill
                className="object-cover"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
            </div>
          )}

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 py-24">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`relative font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight ${
                  main_image ? "text-white" : "text-foreground"
                }`}
              >
                {titleWords.map((text, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                    }}
                    className="inline-block mx-2 md:mx-4"
                  >
                    {text}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className={`mx-auto mt-8 max-w-2xl text-xl font-mono ${
                  main_image ? "text-white/90" : "text-foreground"
                }`}
              >
                {introduction}
              </motion.p>

              {price && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="mt-6"
                >
                  <div
                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-full ${
                      main_image
                        ? "bg-white/20 backdrop-blur-md border-2 border-white/40"
                        : "bg-primary/10 border-2 border-primary"
                    }`}
                  >
                    <span
                      className={`text-sm font-mono ${
                        main_image ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      Starting from
                    </span>
                    <span
                      className={`text-3xl font-bold font-mono ${
                        main_image ? "text-white" : "text-primary"
                      }`}
                    >
                      {price}
                    </span>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-6"
              >
                {labels.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.6 + index * 0.15,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    className="flex items-center gap-2 px-6"
                  >
                    <feature.icon
                      className={`h-5 w-5 ${
                        main_image ? "text-white" : "text-primary"
                      }`}
                    />
                    <span
                      className={`text-sm font-mono ${
                        main_image ? "text-white" : "text-foreground"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                <Button
                  size="lg"
                  className={`cursor-pointer mt-12 font-mono ${
                    main_image
                      ? "rounded-lg bg-white text-black hover:bg-white/90"
                      : "rounded-lg bg-primary hover:bg-primary-dark text-white"
                  }`}
                >
                  DISCOVER TOURS <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container pb-24" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.0,
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="text-center text-4xl font-mono font-bold mb-6"
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.2 + index * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
                className="flex flex-col items-center text-center p-8 bg-background border border-gray-200 hover:border-primary transition-colors"
              >
                <div className="mb-6 rounded-full bg-primary/10 p-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-4 text-xl font-mono font-bold">
                  {feature.label}
                </h3>
                <p className="text-gray-600 font-mono text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  )
}
