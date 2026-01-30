import Image from "next/image"
import React from "react"

interface Props {
  main_image: string
  name: string
  introduction: string
  alt: string
}
const Header = ({ main_image, name, introduction, alt }: Props) => {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-2xl">{introduction}</p>
      {main_image && (
        <Image
          src={main_image}
          alt={name}
          className="tour-main-image"
          width={900}
          height={450}
          priority
        />
      )}
    </header>
  )
}

export default Header
