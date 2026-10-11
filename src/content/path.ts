/**
 * The progression motif. Each phase of Change → Adapt → Evolve → Learn is
 * matched to real repositories. Ordered by complexity, not by date,
 * because commit dates were not part of the research.
 */
export const phases = [
  {
    key: "change",
    word: "Change",
    line: "Start something small and real.",
    body: "Small Windows and Python tools: a to-do list and a password generator in C#, a weather app, and a script that converts currencies to Iranian tomans.",
    repos: ["To-Do-List", "CSharp-PasswordGen", "Weather-App", "CurrencyScraperToman"],
  },
  {
    key: "adapt",
    word: "Adapt",
    line: "Make one program work with another.",
    body: "A Python script that reads a saved web page with BeautifulSoup, filters video links by quality and queues them in Internet Download Manager through pyautogui. Windows only, and it says so in the README.",
    repos: ["DigiMovie-Downloader"],
  },
  {
    key: "evolve",
    word: "Evolve",
    line: "Turn the idea into a product.",
    body: "Riff: accounts, uploads, metadata, playlists and a player, in Flask and SQLite. 32 commits and a deployment story with a real wrong turn in it.",
    repos: ["Riff"],
  },
  {
    key: "learn",
    word: "Learn",
    line: "Build the larger system, and keep learning from it.",
    body: "FD CrossFit: a typed frontend, an async API, PostgreSQL migrations, two languages and a Docker setup. Tests and payments are next.",
    repos: ["FDCrossfit"],
  },
] as const;

export type PhaseKey = (typeof phases)[number]["key"];
