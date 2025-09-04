import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import EcoGradeBadge from "@/components/EcoGradeBadge";
import { sampleProducts, type Product } from "@/data/sampleProducts";
import { useToast } from "@/hooks/use-toast";

const ProductResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const foundProduct = sampleProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Check if favorited (simulate with localStorage)
      const favorites = JSON.parse(localStorage.getItem('ecocheck-favorites') || '[]');
      setIsFavorited(favorites.includes(id));
    }
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('ecocheck-favorites') || '[]');
    let newFavorites;
    
    if (isFavorited) {
      newFavorites = favorites.filter((fav: string) => fav !== id);
      toast({
        title: "Removed from favorites",
        description: "Product removed from your favorites list.",
      });
    } else {
      newFavorites = [...favorites, id];
      toast({
        title: "Added to favorites",
        description: "Product saved to your favorites list.",
      });
    }
    
    localStorage.setItem('ecocheck-favorites', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: `Check out this product's eco-rating on EcoCheck!`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Link copied!",
        description: "Product link copied to clipboard.",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-heading mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find information about this product.</p>
          <Button onClick={() => navigate("/home")} variant="eco">
            Try Another Product
          </Button>
        </div>
      </div>
    );
  }

  const getCarbonImpactLevel = (footprint: number) => {
    if (footprint <= 1) return { level: 25, color: "bg-eco-grade-a" };
    if (footprint <= 5) return { level: 50, color: "bg-eco-grade-b" };
    if (footprint <= 15) return { level: 75, color: "bg-eco-grade-c" };
    return { level: 100, color: "bg-eco-grade-d" };
  };

  const carbonImpact = getCarbonImpactLevel(product.carbonFootprint);

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
          <div className="flex items-center gap-3">
            <div className="text-center">
              <h1 className="text-lg font-heading text-secondary-foreground truncate max-w-48">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-sm text-secondary-foreground/80">{product.brand}</p>
              )}
            </div>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-md mx-auto space-y-6">
        {/* Eco Rating */}
        <Card className="text-center">
          <CardContent className="pt-6">
            <EcoGradeBadge grade={product.ecoGrade} size="lg" className="mx-auto mb-4" />
            <h2 className="text-xl font-heading mb-2">Eco Rating</h2>
            <p className="text-muted-foreground">
              {product.ecoGrade === 'A' && "Excellent environmental impact"}
              {product.ecoGrade === 'B' && "Good environmental choice"}
              {product.ecoGrade === 'C' && "Moderate environmental impact"}
              {product.ecoGrade === 'D' && "High environmental impact"}
            </p>
          </CardContent>
        </Card>

        {/* Carbon Footprint */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Carbon Footprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Carbon Impact:</span>
                <span className="font-semibold">{product.carbonFootprint} kg CO₂ per unit</span>
              </div>
              <Progress 
                value={carbonImpact.level} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground">
                Lower is better for the environment
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              Eco Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleFavorite}
            variant={isFavorited ? "eco" : "eco-outline"}
            size="lg"
            className="flex-1"
          >
            <Heart className={`w-5 h-5 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
            {isFavorited ? "Favorited" : "Save to Favorites"}
          </Button>
          
          <Button
            onClick={handleShare}
            variant="eco-outline"
            size="lg"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProductResult;