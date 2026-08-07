"use client";

import { AnimatePresence, motion } from "framer-motion";
import { NavLinks } from "./NavLinks";

export function MobileMenu({ open, onNavigate }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-x-0 top-full z-50 border-b border-line bg-surface lg:hidden"
        >
          <NavLinks
            onNavigate={onNavigate}
            className="flex flex-col items-stretch gap-0.5 p-2.5"
            linkClassName="block rounded-lg px-4 py-3 text-left normal-case"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;