// app/page.tsx
import { Suspense } from "react";
import CategoryGrid from "@/components/custom/CategoryGrid";
import MysteryBoxGrid from "@/components/custom/MysteryBoxGrid";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-900 to-black text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover the Magic Inside Our Mystery Boxes
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Premium curated mystery boxes with guaranteed value. Excitement in
              every unboxing!
            </p>
            <div className="mt-8">
              <a
                href="#featured"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
            <Suspense fallback={<div>Loading categories...</div>}>
              <CategoryGrid />
            </Suspense>
          </div>
        </section>

        {/* Featured Mystery Boxes Section */}
        <section id="featured" className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Featured Mystery Boxes</h2>
            <Suspense fallback={<div>Loading mystery boxes...</div>}>
              <MysteryBoxGrid />
            </Suspense>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-foreground">
                    1
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose a Box</h3>
                <p className="text-muted-foreground">
                  Browse our selection of mystery boxes across different
                  categories.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-foreground">
                    2
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
                <p className="text-muted-foreground">
                  Complete your purchase securely through our checkout system.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-foreground">
                    3
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unbox & Enjoy</h3>
                <p className="text-muted-foreground">
                  Receive your mystery box and discover the exciting items
                  inside!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow border border-border"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary-foreground">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-card-foreground">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const testimonials = [
  {
    name: "Johnny G. Plate",
    text: "Saya cinta WRPL",
  },
  {
    name: "Anthony",
    text: "Seadanya aja, tapi saya suka!",
  },
  {
    name: "Bahlil Lahadalia",
    text: "IPK 2 bisa jadi menteri, tapi saya suka!",
  },
];
