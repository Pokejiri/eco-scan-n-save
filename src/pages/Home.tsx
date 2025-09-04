import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Scan, Settings, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import EcoGradeBadge from "@/components/EcoGradeBadge";
import logoImage from "@/assets/ecocheck-logo.png";
import { sampleProducts, searchProducts, getRandomProduct } from "@/data/sampleProducts";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentScans] = useState(sampleProducts.slice(0, 3));

  const handleScan = () => {
    // Simulate scanning by selecting a random product
    const randomProduct = getRandomProduct();
    navigate(`/product/${randomProduct.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      if (results.length > 0) {
        navigate(`/product/${results[0].id}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-secondary shadow-card p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <img src={logoImage} alt="EcoCheck" className="w-8 h-8" />
          <h1 className="text-xl font-heading text-secondary-foreground">Home</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/favorites")}
              className="text-secondary-foreground hover:bg-white/10"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="text-secondary-foreground hover:bg-white/10"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-md mx-auto">
        {/* Scan Button */}
        <div className="text-center mb-8">
          <Button
            variant="eco-scan"
            size="scan"
            onClick={handleScan}
            className="mx-auto mb-4 animate-pulse hover:animate-none"
          >
            <Scan className="w-8 h-8" />
          </Button>
          <p className="text-muted-foreground">Tap to scan a product</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full bg-muted border-0 text-base"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
        </form>

        {/* Recent Scans */}
        <section>
          <h2 className="text-lg font-heading mb-4">Recent Scans</h2>
          <div className="space-y-3">
            {recentScans.map((product) => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:shadow-card transition-eco bg-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground">{product.name}</h3>
                      <p className="text-muted-foreground text-sm">{product.brand}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {product.carbonFootprint} kg CO₂
                      </p>
                    </div>
                    <EcoGradeBadge grade={product.ecoGrade} size="sm" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;