import { SwatchLine } from "@/components/shared/SwatchLine";
import siteConfig from "@/config/site";

function ContactBlock({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="mb-2.5 text-[15px] uppercase tracking-widest text-ink-soft">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ContactInfo() {
  return (
    <div>
      <ContactBlock title="Studio">
        <p className="mb-1 text-[15px] text-inked">
          {siteConfig.contact.studio}
        </p>
        <p className="mb-1 text-[15px] text-inked">
          {siteConfig.contact.availability}
        </p>
      </ContactBlock>

      <ContactBlock title="Email">
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-[15px] text-inked no-underline hover:text-orange"
        >
          {siteConfig.contact.email}
        </a>
      </ContactBlock>

      <ContactBlock title="Follow">
        <p className="mb-1 text-[15px] text-inked">
          {siteConfig.contact.instagram} on Instagram
        </p>
        <p className="mb-1 text-[15px] text-inked">
          {siteConfig.contact.tiktok} on TikTok
        </p>
      </ContactBlock>

      <ContactBlock title="Palette">
        <p className="text-[13px] text-ink-soft">
          A few of B. Van Sanders&apos; signature tones
        </p>
        <SwatchLine />
      </ContactBlock>
    </div>
  );
}

export default ContactInfo;