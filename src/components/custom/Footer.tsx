// components/custom/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">MysteryBox</h3>
            <p className="text-sm text-muted-foreground">
              Discover the thrill of opening mystery boxes with exclusive items inside.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">SHOP</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-sm text-muted-foreground hover:text-primary">
                  Featured Boxes
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-sm text-muted-foreground hover:text-primary">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">ACCOUNT</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">HELP</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MysteryBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}