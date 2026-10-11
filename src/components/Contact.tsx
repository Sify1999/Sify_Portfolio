import { site } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="display">Let&rsquo;s build something.</h2>
        <ul className="contact-list">
          {site.telegram && (
            <li>
              <a href={site.telegram.url}>
                Telegram <small>@{site.telegram.handle}</small>
              </a>
            </li>
          )}
          <li>
            <a href={site.github}>
              GitHub <small>Sify1999</small>
            </a>
          </li>
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`}>
                Email <small>{site.email}</small>
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
