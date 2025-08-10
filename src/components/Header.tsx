import { Button } from '@/components/ui/button';
import logo from '@/assets/dropfi-logo.png';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Menu, Apple, Play, Chrome } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { STORE_LINKS } from '@/constants/storeLinks';
import appStoreBadge from '@/assets/badge-appstore.svg';
import googlePlayBadge from '@/assets/badge-googleplay.png';
import chromeBadge from '@/assets/badge-chrome.png';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <span className="text-4xl font-light text-gradient-light">DropFi</span>
            <img src={logo} alt="DropFi" className="h-8 w-8 object-contain" />
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to={'/#features' as any} className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to={'/#developers' as any} className="text-muted-foreground hover:text-foreground transition-colors">
            Developers
          </Link>
          <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link to={'/support' as any} className="text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="liberation" size="lg" asChild className="hidden md:inline-flex">
            <a href="#download">Download Wallet</a>
          </Button>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 space-y-2">
                  <nav className="grid gap-2">
                    <DrawerClose asChild>
                      <a href="#features" className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                        Features
                      </a>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <a href="#developers" className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                        Developers
                      </a>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <a href="/docs" className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                        Docs
                      </a>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Link to={'/support' as any} className="px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                        Support
                      </Link>
                    </DrawerClose>
                  </nav>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Download</p>
                    <div className="grid grid-cols-1 gap-2">
                      <DrawerClose asChild>
                        <a href={STORE_LINKS.appstore} aria-label="Download on the App Store">
                          <img src={appStoreBadge} alt="Download on the App Store" className="h-12 w-auto" loading="lazy" />
                        </a>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <a href={STORE_LINKS.playstore} aria-label="Get it on Google Play">
                          <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12 w-auto" loading="lazy" />
                        </a>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <a
                          href={STORE_LINKS.chrome}
                          aria-label="Get it from Chrome Web Store"
                          className="bg-white rounded-md flex items-center gap-3"
                        >
                          <img src={chromeBadge} alt="Get it from Chrome Web Store" className="h-12 w-auto" loading="lazy" />
                        </a>
                      </DrawerClose>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
