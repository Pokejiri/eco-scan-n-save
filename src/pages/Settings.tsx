import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, User, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import logoImage from "@/assets/ecocheck-logo.png";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    toast({
      title: `${newDarkMode ? 'Dark' : 'Light'} mode enabled`,
      description: "Theme preference saved successfully.",
    });
  };

  const clearFavorites = () => {
    localStorage.removeItem('ecocheck-favorites');
    toast({
      title: "Favorites cleared",
      description: "All saved products have been removed from your favorites.",
    });
  };

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
          <h1 className="text-xl font-heading text-secondary-foreground">Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="p-6 max-w-md mx-auto space-y-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch to dark theme for better night viewing
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium">Demo User</p>
              <p className="text-sm text-muted-foreground">demo@ecocheck.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Clear All Favorites
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Favorites</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently remove all products from your favorites list. 
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearFavorites}>
                    Clear Favorites
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* About EcoCheck */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              About EcoCheck
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <img 
                src={logoImage} 
                alt="EcoCheck Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="font-heading font-semibold mb-2">EcoCheck v1.0</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Helping you make more sustainable choices by providing 
                eco-ratings and carbon footprint information for everyday products.
              </p>
            </div>
            
            <div className="border-t pt-4 space-y-2 text-sm text-muted-foreground">
              <p><strong>Mission:</strong> Scan smarter. Shop greener.</p>
              <p><strong>Impact:</strong> Making sustainability accessible to everyone.</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground py-4">
          Made with 💚 for a sustainable future
        </div>
      </main>
    </div>
  );
};

export default Settings;