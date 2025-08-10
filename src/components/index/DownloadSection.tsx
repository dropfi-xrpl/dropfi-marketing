import { Button } from '@/components/ui/button';
import appStoreBadge from '@/assets/badge-appstore.svg';
import googlePlayBadge from '@/assets/badge-googleplay.png';
import chromeBadge from '@/assets/badge-chrome.png';
import { Chrome } from 'lucide-react';
import { STORE_LINKS } from '@/constants/storeLinks';

const DownloadSection = () => {
  return (
    <section id="download" className="py-24">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-border/60">
          {/* Background video */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/glowing-blue.mp4"
            aria-label="Abstract glowing background"
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/40 to-background/70" />

          <div className="relative z-10 px-6 md:px-12 py-20 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-medium">Download DropFi today</h2>
            <p className="text-muted-foreground text-lg">Get true decentralized access to the XRP network.</p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={STORE_LINKS.appstore} aria-label="Download on the App Store">
                <img src={appStoreBadge} alt="Download on the App Store" className="h-12 w-auto" loading="lazy" />
              </a>
              <a href={STORE_LINKS.playstore} aria-label="Get it on Google Play">
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-12 w-auto" loading="lazy" />
              </a>

              <a
                href={STORE_LINKS.chrome}
                aria-label="Get it from Chrome Web Store"
                className="bg-white rounded-md flex items-center gap-3"
              >
                <img src={chromeBadge} alt="Get it from Chrome Web Store" className="h-12 w-auto" loading="lazy" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
