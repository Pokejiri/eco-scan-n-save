import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/ecocheck-logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to home after 3 seconds if user doesn't click
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-in fade-in-50 duration-1000 slide-in-from-bottom-10">
        <div className="mb-8">
          <img 
            src={logoImage} 
            alt="EcoCheck Logo" 
            className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            EcoCheck
          </h1>
        </div>
        
        <p className="text-xl text-white/90 mb-12 max-w-sm mx-auto leading-relaxed">
          Scan smarter. Shop greener.
        </p>
        
        <Button 
          onClick={handleGetStarted}
          variant="outline"
          size="xl"
          className="bg-white text-primary border-white hover:bg-white/90 shadow-eco animate-pulse hover:animate-none"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Splash;