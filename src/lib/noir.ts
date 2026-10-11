/** Spider-Man Noir easter egg. Toggles a data attribute that swaps the colour tokens. */
export function toggleNoir(): boolean {
  const root = document.documentElement;
  const on = root.dataset.noir !== "true";
  if (on) root.dataset.noir = "true";
  else delete root.dataset.noir;
  return on;
}
