import { useState, useRef, useEffect } from 'react';
import { Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomDomainPanel } from '@/components/CustomDomainPanel';

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [showDomainPanel, setShowDomainPanel] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position and handle resize/orientation changes
  useEffect(() => {
    const updateNoButtonPosition = () => {
      if (noButtonRef.current && containerRef.current) {
        const container = containerRef.current.getBoundingClientRect();
        const button = noButtonRef.current.getBoundingClientRect();
        
        // Position No button to the right of center, on the same horizontal line
        const centerY = container.height / 2 - button.height / 2;
        const rightX = container.width / 2 + 80; // 80px to the right of center
        
        setNoButtonPosition({
          x: Math.min(rightX, container.width - button.width - 20),
          y: centerY
        });
      }
    };

    updateNoButtonPosition();
    
    // Handle window resize and orientation changes
    window.addEventListener('resize', updateNoButtonPosition);
    window.addEventListener('orientationchange', updateNoButtonPosition);
    
    return () => {
      window.removeEventListener('resize', updateNoButtonPosition);
      window.removeEventListener('orientationchange', updateNoButtonPosition);
    };
  }, []);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries with padding
    const padding = 20;
    const maxX = container.width - button.width - padding;
    const maxY = container.height - button.height - padding;

    // Generate random position within bounds, clamped to safe area
    const newX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(padding, Math.min(Math.random() * maxY, maxY));

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoInteraction = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
  };

  const handleYesClick = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4">
        <Button
          onClick={() => setShowDomainPanel(true)}
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 text-romantic-muted hover:text-romantic-primary"
        >
          <Settings className="w-5 h-5" />
        </Button>

        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="space-y-4">
            <Heart className="w-20 h-20 mx-auto text-romantic-primary fill-romantic-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-romantic-dark">
              Good choice Doctorsaab
            </h1>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-romantic-primary">
            <img
              src="/assets/generated/meme-good-choice-doctorsaab-v3.dim_800x800.gif"
              alt="Good choice Doctorsaab"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        <footer className="absolute bottom-4 text-center text-sm text-romantic-muted">
          © 2026. Built with <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
          <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-romantic-primary transition-colors">
            caffeine.ai
          </a>
        </footer>

        <CustomDomainPanel open={showDomainPanel} onOpenChange={setShowDomainPanel} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-romantic-lighter to-white p-4 overflow-hidden">
      <Button
        onClick={() => setShowDomainPanel(true)}
        size="icon"
        variant="ghost"
        className="absolute top-4 right-4 text-romantic-muted hover:text-romantic-primary z-20"
      >
        <Settings className="w-5 h-5" />
      </Button>

      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in duration-500">
        {/* Floating hearts decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Heart className="absolute top-10 left-10 w-8 h-8 text-romantic-accent/30 fill-romantic-accent/30 animate-pulse" style={{ animationDelay: '0s' }} />
          <Heart className="absolute top-20 right-20 w-6 h-6 text-romantic-accent/20 fill-romantic-accent/20 animate-pulse" style={{ animationDelay: '1s' }} />
          <Heart className="absolute bottom-32 left-20 w-10 h-10 text-romantic-accent/25 fill-romantic-accent/25 animate-pulse" style={{ animationDelay: '2s' }} />
          <Heart className="absolute bottom-20 right-32 w-7 h-7 text-romantic-accent/30 fill-romantic-accent/30 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Main content */}
        <div className="space-y-6 relative z-10">
          <Heart className="w-24 h-24 mx-auto text-romantic-primary fill-romantic-primary animate-bounce" />
          <h1 className="text-5xl md:text-7xl font-bold text-romantic-dark leading-tight">
            Will you be my Valentine?
          </h1>
          <p className="text-xl md:text-2xl text-romantic-muted font-medium">
            Choose wisely... 💝
          </p>
        </div>

        {/* Buttons container - horizontal layout */}
        <div 
          ref={containerRef}
          className="relative w-full h-64 md:h-80"
        >
          {/* Yes button - positioned left of center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 -mr-10">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-2xl md:text-3xl px-12 md:px-16 py-8 md:py-10 rounded-full bg-romantic-primary hover:bg-romantic-primary-dark text-white font-bold shadow-2xl hover:shadow-romantic-primary/50 transition-all duration-300 hover:scale-110 border-4 border-white"
            >
              Yes! 💕
            </Button>
          </div>

          {/* No button - starts right of center, moves on interaction */}
          <button
            ref={noButtonRef}
            onPointerEnter={handleNoInteraction}
            onPointerMove={handleNoInteraction}
            onPointerDown={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s ease-out',
              touchAction: 'none'
            }}
            className="text-2xl md:text-3xl px-12 md:px-16 py-8 md:py-10 rounded-full bg-romantic-muted hover:bg-romantic-muted text-romantic-dark font-bold shadow-xl border-4 border-romantic-border cursor-pointer"
          >
            No 😢
          </button>
        </div>

        <p className="text-lg text-romantic-muted/70 italic relative z-10">
          Hint: The "No" button is a bit shy... 😉
        </p>
      </div>

      <footer className="absolute bottom-4 text-center text-sm text-romantic-muted">
        © 2026. Built with <Heart className="inline w-4 h-4 text-romantic-primary fill-romantic-primary" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-romantic-primary transition-colors">
          caffeine.ai
        </a>
      </footer>

      <CustomDomainPanel open={showDomainPanel} onOpenChange={setShowDomainPanel} />
    </div>
  );
}
