import siteConfig from "@/config/site";

export function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-3.5 border-t border-line px-5 py-6 md:px-10 md:py-8"
    >
      <span className="text-sm font-semibold text-inked">
        © {siteConfig.year} {siteConfig.legalName}
      </span>
      <span className="font-mono text-xs text-ink-soft">
        Powered by {siteConfig.poweredBy}
      </span>
    </footer>
  );
}

export default Footer;