import React from "react"
import { getStoryblokApi } from "@/lib/storyblok"
import { TourStory } from "@/types/tour"
import RichTextRenderer from "@/components/RichTextRenderer"
import { TourHero } from "@/components/ui/tour-hero"

export async function fetchTourPage(slug: string): Promise<TourStory> {
  const storyblokApi = getStoryblokApi()
  return (await storyblokApi.get(`cdn/stories/tours/${slug}`)).data.story
}

const TourPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const { content: tourPage } = await fetchTourPage(slug)

  return (
    <div className="tour-page">
      {/* Hero Section with Tour Data */}
      <TourHero
        main_image={tourPage.main_image.filename}
        name={tourPage.name}
        introduction={tourPage.introduction}
        price={tourPage.price}
        alt={tourPage.main_image.alt}
      />

      {/* Rich Text Content */}
      <div className="container mx-auto px-4 py-12">
        <RichTextRenderer
          content={tourPage.body}
          className="tour-content prose prose-lg max-w-4xl mx-auto"
        />
      </div>
    </div>
  )
}

export default TourPage
