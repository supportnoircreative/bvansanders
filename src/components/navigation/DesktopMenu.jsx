import { NavLinks } from "./NavLinks";

export function DesktopMenu() {
  return (
    <NavLinks
      className="hidden items-center gap-1.5 lg:flex"
      aria-label="Primary"
    />
  );
}

export default DesktopMenu;