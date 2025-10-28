import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users, Award, TrendingUp, CheckCircle2, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-background md:py-4 py-1.5">
          <div className="container mx-auto px-4">
            <h1 className="font-bold text-foreground text-center md:text-4xl text-3xl">ABOUT US</h1>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">Welcome to FB General Hardware</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your one-stop shop for all building materials and hardware needs. We supply top quality products,
                exceptional customer care service, timely delivery, and expert advice to construction companies,
                furniture makers, plumbers, and wholesale resellers.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Building2 className="h-10 w-10 mx-auto text-secondary" />
                  <div className="text-3xl font-bold text-foreground">15+</div>
                  <div className="text-sm text-muted-foreground">Years in Business</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Users className="h-10 w-10 mx-auto text-secondary" />
                  <div className="text-3xl font-bold text-foreground">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Award className="h-10 w-10 mx-auto text-secondary" />
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Quality Products</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <TrendingUp className="h-10 w-10 mx-auto text-secondary" />
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2010, FB General Hardware has grown from a small local shop to one of Uganda's most trusted
                  suppliers of building materials and hardware. Our journey began with a simple mission: "Service Beyond Delivery".
                </p>
                <p>
                  Over the years, we have built strong relationships with leading manufacturers and suppliers, ensuring
                  that our customers always have access to the best products at competitive prices. From Tororo Cement
                  to premium iron sheets, power tools to plumbing supplies, we stock everything you need for your
                  construction and renovation projects.
                </p>
                <p>
                  Today, we serve construction companies, furniture makers, plumbers, electricians, and wholesale
                  resellers across Uganda. Our commitment to quality, reliability, and customer satisfaction remains at
                  the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Quality First</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We source only the highest quality products from trusted manufacturers to ensure durability and
                    reliability for all your projects.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Customer Focus</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your satisfaction is our priority. We provide expert advice, personalized service, and support at
                    every step of your project.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Reliability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Count on us for timely delivery, consistent stock availability, and dependable service that keeps
                    your projects on schedule.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Construction Companies</h3>
                    <p className="text-sm text-muted-foreground">
                      Bulk supplies of cement, iron sheets, and building materials for large-scale projects.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Furniture Makers</h3>
                    <p className="text-sm text-muted-foreground">
                      Quality tools, hardware, and materials for crafting exceptional furniture pieces.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Plumbers & Electricians</h3>
                    <p className="text-sm text-muted-foreground">
                      Specialized tools and supplies for professional installation and repair work.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Wholesale Resellers</h3>
                    <p className="text-sm text-muted-foreground">
                      Competitive pricing and reliable supply for businesses looking to stock quality hardware.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
