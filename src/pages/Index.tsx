import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Zap, 
  Users, 
  Shield, 
  Monitor, 
  CheckCircle, 
  Star, 
  ChevronRight,
  Play,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const features = [
    {
      icon: Zap,
      title: "Auto-detection",
      description: "Automatically detects your project dependencies and configuration requirements across any tech stack."
    },
    {
      icon: CheckCircle,
      title: "One-click setup",
      description: "Deploy perfect development environments instantly with a single command across your entire team."
    },
    {
      icon: Users,
      title: "Team collaboration",
      description: "Share environments seamlessly with your team. Everyone gets the same setup, every single time."
    },
    {
      icon: Monitor,
      title: "Cross-platform support",
      description: "Works flawlessly on Windows, macOS, and Linux. Docker, VM, or native - your choice."
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual developers",
      features: [
        "3 environments",
        "Basic auto-detection",
        "Community support",
        "Core integrations"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Team",
      price: "$15",
      period: "per user/month",
      description: "Built for growing teams",
      features: [
        "Unlimited environments",
        "Advanced auto-detection",
        "Team collaboration tools",
        "Priority support",
        "Custom integrations",
        "Analytics dashboard"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "For large organizations",
      features: [
        "Everything in Team",
        "SSO & advanced security",
        "Dedicated support",
        "Custom deployment",
        "SLA guarantees",
        "Training & onboarding"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      content: "EnvSync eliminated the 'works on my machine' problem entirely. Our onboarding time went from days to minutes.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Engineering Manager",
      company: "DevFlow",
      content: "The team collaboration features are game-changing. Everyone now has identical environments without any setup hassle.",
      rating: 5
    },
    {
      name: "Lisa Park",
      role: "DevOps Engineer",
      company: "CloudScale",
      content: "Cross-platform support is flawless. Whether our devs use Windows, Mac, or Linux, everything just works.",
      rating: 5
    }
  ];

  const comparisonFeatures = [
    { feature: "Auto-detection", free: true, team: true, enterprise: true },
    { feature: "One-click setup", free: true, team: true, enterprise: true },
    { feature: "Environment limit", free: "3", team: "Unlimited", enterprise: "Unlimited" },
    { feature: "Team collaboration", free: false, team: true, enterprise: true },
    { feature: "Advanced integrations", free: false, team: true, enterprise: true },
    { feature: "Priority support", free: false, team: true, enterprise: true },
    { feature: "SSO & Security", free: false, team: false, enterprise: true },
    { feature: "Custom deployment", free: false, team: false, enterprise: true }
  ];

  const AuthModal = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-smooth glow-primary">
          Start Free Trial
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-0 shadow-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
          </DialogTitle>
          <DialogDescription>
            {authMode === 'signup' 
              ? 'Start syncing environments in under 2 minutes' 
              : 'Sign in to access your environments'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full glass border-muted">
            <Github className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@company.com"
                className="glass border-muted"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="glass border-muted"
              />
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={() => navigate('/dashboard')}
          >
            {authMode === 'signup' ? 'Create Account' : 'Sign In'}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
              className="text-primary hover:underline"
            >
              {authMode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">EnvSync</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Features
              </button>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Pricing
              </button>
              <button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                Testimonials
              </button>
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>Sign In</Button>
              <AuthModal />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <Badge variant="secondary" className="glass border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                Now supporting 50+ frameworks
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Stop saying{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  "Works on my machine"
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                Set up perfect development environments in seconds, not hours. 
                Auto-detect dependencies, sync configurations, and eliminate setup friction forever.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <AuthModal />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass border-muted"
                  onClick={() => console.log('Demo requested')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Request Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in-up delay-200 lg:pl-8">
              <Card className="glass border-0 shadow-card overflow-hidden">
                <div className="video-placeholder aspect-video p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-muted-foreground">Watch EnvSync in action</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <Badge variant="secondary" className="glass border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Enterprise-grade reliability
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything you need to
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">sync environments</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From auto-detection to team collaboration, EnvSync provides all the tools 
              your team needs to eliminate environment setup friction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className={`glass border-0 shadow-card hover:shadow-glow transition-smooth animate-scale-in delay-${(index + 1) * 100}`}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold">
              Simple, transparent
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and scale as your team grows. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={plan.name} className={`glass border-0 shadow-card relative ${plan.popular ? 'glow-primary' : ''} animate-scale-in delay-${(index + 1) * 100}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      {plan.price !== 'Custom' && <span className="text-lg text-muted-foreground">/{plan.period}</span>}
                    </div>
                    {plan.price === 'Custom' && (
                      <div className="text-muted-foreground">{plan.period}</div>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary hover:opacity-90' : 'glass border-muted'}`} 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      if (plan.name === 'Enterprise') {
                        console.log('Contact sales clicked');
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Feature <span className="bg-gradient-primary bg-clip-text text-transparent">Comparison</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what's included in each plan
            </p>
          </div>
          
          <Card className="glass border-0 shadow-card overflow-hidden animate-scale-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Free</th>
                    <th className="text-center p-4 font-semibold">Team</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={row.feature} className={`border-b border-border ${index % 2 === 0 ? 'bg-muted/5' : ''}`}>
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? <CheckCircle className="h-5 w-5 text-primary mx-auto" /> : 
                          <span className="text-muted-foreground">—</span>
                        ) : row.free}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.team === 'boolean' ? (
                          row.team ? <CheckCircle className="h-5 w-5 text-primary mx-auto" /> : 
                          <span className="text-muted-foreground">—</span>
                        ) : row.team}
                      </td>
                      <td className="p-4 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <CheckCircle className="h-5 w-5 text-primary mx-auto" /> : 
                          <span className="text-muted-foreground">—</span>
                        ) : row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="bg-gradient-primary bg-clip-text text-transparent">developers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what teams are saying about EnvSync
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className={`glass border-0 shadow-card animate-scale-in delay-${(index + 1) * 100}`}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="glass border-0 shadow-card bg-gradient-card p-8 lg:p-12 animate-scale-in">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to eliminate
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  "works on my machine"?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of developers who've already streamlined their environment setup process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AuthModal />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glass border-muted"
                  onClick={() => console.log('Demo scheduled')}
                >
                  Schedule Demo
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EnvSync</span>
              </div>
              <p className="text-muted-foreground">
                Eliminating development environment friction, one sync at a time.
              </p>
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open('https://twitter.com', '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-smooth">Features</button></li>
                <li><button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-foreground transition-smooth">Pricing</button></li>
                <li><button onClick={() => navigate('/integrations')} className="hover:text-foreground transition-smooth">Integrations</button></li>
                <li><button onClick={() => console.log('Changelog clicked')} className="hover:text-foreground transition-smooth">Changelog</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => console.log('About clicked')} className="hover:text-foreground transition-smooth">About</button></li>
                <li><button onClick={() => console.log('Blog clicked')} className="hover:text-foreground transition-smooth">Blog</button></li>
                <li><button onClick={() => console.log('Careers clicked')} className="hover:text-foreground transition-smooth">Careers</button></li>
                <li><button onClick={() => console.log('Contact clicked')} className="hover:text-foreground transition-smooth">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/api-docs')} className="hover:text-foreground transition-smooth">Documentation</button></li>
                <li><button onClick={() => console.log('Help Center clicked')} className="hover:text-foreground transition-smooth">Help Center</button></li>
                <li><button onClick={() => console.log('Community clicked')} className="hover:text-foreground transition-smooth">Community</button></li>
                <li><button onClick={() => console.log('Status clicked')} className="hover:text-foreground transition-smooth">Status</button></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <button onClick={() => console.log('Privacy Policy clicked')} className="hover:text-foreground transition-smooth">Privacy Policy</button>
              <button onClick={() => console.log('Terms of Service clicked')} className="hover:text-foreground transition-smooth">Terms of Service</button>
              <button onClick={() => console.log('Cookie Policy clicked')} className="hover:text-foreground transition-smooth">Cookie Policy</button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EnvSync. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
