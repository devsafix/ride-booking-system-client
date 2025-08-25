import { Facebook, Github, Globe, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="max-w-xs dark:text-muted-foreground text-foreground">
              Join thousands of riders and drivers in our trusted platform.
              Safe, reliable, and always available.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <Link
                  to="https://www.facebook.com/devsafix"
                  rel="noreferrer"
                  target="_blank"
                  className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Facebook</span>

                  <Facebook />
                </Link>
              </li>

              <li>
                <Link
                  to="https://www.instagram.com/devsafix"
                  rel="noreferrer"
                  target="_blank"
                  className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Instagram</span>

                  <Instagram />
                </Link>
              </li>

              <li>
                <Link
                  to="https://www.x.com/devsafix"
                  rel="noreferrer"
                  target="_blank"
                  className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <Twitter />
                </Link>
              </li>

              <li>
                <Link
                  to="https://www.github.com/devsafix"
                  rel="noreferrer"
                  target="_blank"
                  className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">GitHub</span>

                  <Github />
                </Link>
              </li>

              <li>
                <Link
                  to="https://devsafix.vercel.app/"
                  rel="noreferrer"
                  target="_blank"
                  className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                >
                  <span className="sr-only">Dribbble</span>

                  <Globe />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-medium dark:text-muted-foreground text-foreground">
                Pages
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    About Us{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/features"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Features{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium dark:text-muted-foreground text-foreground">
                Company
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    About Company{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Meet the Team{" "}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-medium dark:text-muted-foreground text-foreground">
                Helpful Links
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Contact Us{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/faq"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    FAQs{" "}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium dark:text-muted-foreground text-foreground">
                Settings
              </p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <Link
                    to="/safety-settings"
                    className="dark:text-muted-foreground text-foreground transition hover:opacity-75"
                  >
                    {" "}
                    Emergency Contact{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs dark:text-muted-foreground text-foreground">
          &copy; 2025. Ridaa. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
