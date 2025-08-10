import logo from '@/assets/logos/dropfi-logo.png';
import { GITHUB_LINK, X_LINK } from '@/constants/links';
import { Link } from '@tanstack/react-router';

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="DropFi" className="h-8 w-8 object-contain" />
              <span className="text-xl font-medium text-gradient">DropFi</span>
            </div>
            <p className="text-muted-foreground">The liberation layer for XRP. Zero permission, zero compromise.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Download
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Developers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/docs" className="hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to={'/docs/xrpl-injection-api' as any} className="hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to={'/docs/xrpl-injection-api' as any} className="hover:text-primary transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link to={GITHUB_LINK as any} target="_blank" className="hover:text-primary transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href={X_LINK} className="hover:text-primary transition-colors">
                  X (Formerly Twitter)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>&copy; 2025 DropFi. Liberation layer for XRP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
