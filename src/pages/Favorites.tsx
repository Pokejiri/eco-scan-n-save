import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EcoGradeBadge from "@/components/EcoGradeBadge";
import { sampleProducts, type Product } from "@/data/sampleProducts";

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem('ecocheck-favorites') || '[]');
    const favoriteProducts = sampleProducts.filter(product => 
      favoriteIds.includes(product.id)
    );
    setFavorites(favoriteProducts);
  }, []);

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case "eco-rating":
        return a.ecoGrade.localeCompare(b.ecoGrade);
      case "carbon-low":
        return a.carbonFootprint - b.carbonFootprint;
      case "carbon-high":
        return b.carbonFootprint - a.carbonFootprint;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary shadow-card p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/home")}
            className="text-secondary-foreground hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-heading text-secondary-foreground">Favorites</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-md mx-auto">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-heading mb-2">No Favorites Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start scanning products to build your favorites list!
              </p>
              <Button onClick={() => navigate("/home")} variant="eco">
                Start Scanning
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Sort Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="eco-rating">Best Eco Rating</SelectItem>
                    <SelectItem value="carbon-low">Lowest Carbon Impact</SelectItem>
                    <SelectItem value="carbon-high">Highest Carbon Impact</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="space-y-4">
              {sortedFavorites.map((product) => (
                <Card 
                  key={product.id}
                  className="cursor-pointer hover:shadow-card transition-eco"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">
                          {product.name}
                        </h3>
                        {product.brand && (
                          <p className="text-muted-foreground text-sm mb-2">
                            {product.brand}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{product.carbonFootprint} kg CO₂</span>
                          {product.category && <span>{product.category}</span>}
                        </div>
                      </div>
                      <EcoGradeBadge grade={product.ecoGrade} size="sm" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              {favorites.length} product{favorites.length !== 1 ? 's' : ''} saved
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;