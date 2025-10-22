import { Title } from "@/components/Title";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="pb-16">
      <div className="container">
        <Title
          title="Built for the Bold"
          description="We craft clothes that empower self-expression every day"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://placehold.co/600x500"
              alt="Our Journey"
              width={600}
              height={500}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us/Journey</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Our journey began with a simple vision: to create clothing that
                combines comfort, style, and sustainability. From our humble
                beginnings to becoming a recognized brand, we&apos;ve always
                stayed true to our core values.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that fashion should be accessible to everyone while
                respecting our planet. That&apos;s why we use eco-friendly
                materials and ethical manufacturing processes in all our
                collections.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and inspire, bringing you the
                latest trends while maintaining our commitment to quality and
                sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
