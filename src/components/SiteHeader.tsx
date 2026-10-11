import Link from "next/link";
import { Glyph } from "./Glyph";
import { TerminalButton } from "./Terminal";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="wordmark" aria-label="Sify, home">
          <Glyph phase="mark" size={26} />
          Sify
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/#systems" className="nav-hide-sm">Systems</Link>
          <Link href="/#path" className="nav-hide-sm">Path</Link>
          <Link href="/#contact">Contact</Link>
          <TerminalButton />
        </nav>
      </div>
    </header>
  );
}
