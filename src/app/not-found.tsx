import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1 className="display">Nothing here.</h1>
      <p className="muted">That page does not exist. The projects are on the home page.</p>
      <div><Link className="btn btn-primary" href="/">Back home</Link></div>
    </div>
  );
}
