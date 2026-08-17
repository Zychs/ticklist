/* ============================================================
   LEDGER CONTRACT  (replaces the old TRUNK CONTRACT, 2026-08-05)

   THIS FILE HOLDS READINGS. IT HOLDS NO STATE.

   A READING is your interpretation: what a decision would unblock,
   why a cluster matters, what to do next. It is never load-bearing,
   never counted, and renders under a literal "reading" label.

   A STATE CLAIM is anything that could be FALSE ABOUT THE WORLD:
   frozen/open, a chosen option, a date, a count, a quotation.
   State claims do not live here. They live as CITATIONS in
   experimental/todo-tree/gatelaw.jsonl, each one an address into a
   session file you did not write and cannot edit. The renderer
   re-opens that address and substring-checks the quote on every
   single paint. A citation you cannot back paints red with YOUR
   NAME on it.

   FORBIDDEN KEYS on any gate object: status, pick, stamp, frozen,
   open, note, hidden, or any date literal. The renderer consumes
   ONLY id, name, decides, options[], reading. ANY other key paints
   a red contamination banner and SUPPRESSES THE ENTIRE TALLY.
   You cannot hide a state field here. You can only break the card.

   FORBIDDEN PROSE anywhere in this file: settled, locked, decided,
   chosen, frozen, resolved, agreed, picked, already, no longer,
   nothing further, unblocked. Not near a gate id — anywhere.

   TO RECORD A DECISION, append ONE line to gatelaw.jsonl:
     with p.open("a", encoding="utf-8") as f:
         f.write(json.dumps(row, ensure_ascii=False) + "\n")
   No read-before-write. No dedupe. No cap. No compaction. Ever.
   Corrections are NEW ROWS. Do NOT model this on
   experimental/aytree/api.py:87-101 or on recent_paths_push
   (win_serve.py:518-564) — both truncate.

   IF YOU CANNOT ANCHOR IT, LEAVE THE GATE OPEN. Open costs nothing
   and needs no evidence. Only freezing needs evidence. A gate that
   is open when it should be frozen is a fifteen-second fix by the
   human. A gate that is frozen when it should be open cost him five
   days and his trust in this card. That asymmetry is the design.

   PHASE 0 (2026-08-05): gatelaw.jsonl does not exist yet, so every
   gate paints "no receipt" and counts open. That is correct. The
   card under-claims until the ledger ships.
   ============================================================ */

window.TODO_TREE_META = {
  source:
    "three /ta panes (left: day/queue/shelf · middle: ownership/host/archive · right: Josiah×Sesefus/economic)",

  /**
   * Readings only. Nothing here may say what the world currently IS.
   * The gate roster below names the questions; gatelaw.jsonl answers them.
   */
  trunk: {
    layman:
      "Four lines at a time govern how this product is built: the layout, where the agent surface lives, how instructions get typed to agents, and how “Other AIs” show up on the deck. Answer one and it stops being re-argued — the strip retires it and steps the next question up in its place. A line reads as answered when a receipt in gatelaw.jsonl carries your own words at an address the card can re-open.",

    oneReplyAnswers:
      "One line per gate: pick an option, or name your own change, in your own words. Not an essay. Whatever you say here becomes the receipt — so say it plainly enough that it reads back as an answer six weeks from now.",

    /**
     * ROSTER ONLY — these are the QUESTIONS, never the answers.
     * Whitelist enforced by the renderer: id · name · decides · options[] · reading.
     * Any other key paints a contamination banner and kills the tally.
     */
    gates: [
      {
        id: "O1",
        name: "Layout law",
        decides: "Are “columns” chips/lanes/radar with tabs as SSOT, or is multi-pane back?",
        options: [
          { label: "Tabbed columns WITH panes" },
          { label: "Chips-only Story A / tabs SSOT" },
        ],
        reading:
          "Everything with a window in it waits on this one. Whichever way it goes, the cost is re-drawing chrome once — not re-arguing it every session.",
      },
      {
        id: "O4",
        name: "Agent surface",
        decides: "Does the agent surface live docked in the primary window, or may it detach?",
        options: [
          { label: "Attached by default · detach allowed" },
          { label: "Always docked in primary" },
        ],
        reading:
          "Cheap either way to build. Expensive to keep ambiguous, because every companion-window change has to hedge both.",
      },
      {
        id: "O6",
        name: "Instruction rails",
        decides: "One shared instruction buffer for all agents, or a buffer per agent?",
        options: [
          { label: "One shared buffer" },
          { label: "Per-agent buffers" },
          { label: "Hybrid + detach send rules" },
        ],
        reading:
          "This one has a debate path (/aiia) and a handoff preamble sitting unspent. Answering it in-thread costs less than spinning the thread it was routed to.",
      },
      {
        id: "O8",
        name: "“Other AIs” treatment",
        decides: "How do non-permanent agents appear next to Grok / Claude / Cursor?",
        options: [
          { label: "Collapsed chip that expands" },
          { label: "Mini-list always visible" },
          { label: "Something else — name it" },
        ],
        reading:
          "The live board shows no Other-AIs chip at all, so this gate is the one standing between the designed discovery chrome and real chrome.",
      },
    ],

    /**
     * BENCH — the next questions up. Same whitelist, same rule: questions only,
     * never answers. The renderer keeps the live strip four wide, so each line
     * that earns a receipt pulls one of these onto the deck. When the bench runs
     * dry the card says so and asks for a new roster rather than going quiet.
     */
    bench: [
      {
        id: "Q4",
        name: "Toy in hand",
        decides: "Which single queue/shelf toy is in hand, and which ones wait behind it?",
        options: [
          { label: "Playable layered queues" },
          { label: "Project-area menus" },
          { label: "Day shelf itself — name it" },
        ],
        reading:
          "Four toys are open and none is in hand. This line costs one sentence and stops the shelf juggling that eats whole mornings.",
      },
      {
        id: "H1",
        name: "Measure order",
        decides: "Does host / session-map measurement run before layout work, or after the layout line?",
        options: [
          { label: "Measure first, then pin-vs-park" },
          { label: "After the layout line" },
        ],
        reading:
          "The host gates ask for a number nobody has taken yet. Taking it is a short slice; guessing at it re-opens the layout argument.",
      },
      {
        id: "J1",
        name: "Josiah re-open shape",
        decides: "Does Josiah × Sesefus re-open as a 2-minute voice pitch, or as the question magazine?",
        options: [
          { label: "2-minute pitch + one ask" },
          { label: "Load the magazine" },
          { label: "Something else — name it" },
        ],
        reading:
          "Both paths exist on disk. The cost here is not the work, it is carrying two half-plans into the same conversation.",
      },
      {
        id: "E1",
        name: "Floor numbers home",
        decides: "Do floor numbers / what work can pay live on this plate, or in a thread of their own?",
        options: [
          { label: "Own thread" },
          { label: "On this plate" },
        ],
        reading:
          "Money planning next to product gates turns both into mush. One line here keeps the plate honest about what it is for.",
      },
    ],

    landmarks: {
      explicit: [
        {
          name: "Ownership gates O1 / O4 / O6 / O8",
          plain:
            "Four numbered questions about who decides what on the scanner surface. Each is a pick-one line, not a research topic. Which of them have answers comes from the receipts, not from this file — and as they get answers, bench questions take their slots.",
        },
        {
          name: "One short reply",
          plain:
            "Your actual deliverable on any gate: one plain line in your own words — not code, not a redesign thread.",
        },
      ],
      latent: [
        {
          name: "Ownership gate",
          plain:
            "A question that needs one named answer before more work piles on top of it. Without that answer, every session re-argues it from scratch.",
        },
        {
          name: "Receipt",
          plain:
            "A citation into a session file: your own words, at an address the card can re-open and check on every paint. A line with a receipt reads as answered. A line without one has not been answered here yet — that is all the card claims either way.",
        },
        {
          name: "Next line",
          plain:
            "The one question the card puts in front of you right now — the first line on the strip without a receipt. It moves as receipts land, so it names today's work rather than the same gate forever.",
        },
        {
          name: "Bench",
          plain:
            "Questions queued behind the live strip. Answer four and four more step up, so the plate keeps steering the day instead of turning into a monument to the first four.",
        },
      ],
    },

    afterTrunk: [
      "Either: 2-minute plain pitch to re-open Josiah × Sesefus",
      "Or: pick up the single highest-leverage queue/shelf toy (Q4 playable queues)",
      "Not both in the same breath",
    ],
    afterPark:
      "Everything else stays parked behind the expandable dirs below until A is done.",
  },
};

window.TODOS = [
  {
    dir: "queues-and-shelf",
    title: "Playable queues + day shelf",
    priority: 5,
    origin: "left [5/5] + [4/5]",
    move: "pursue now",
    hidden: true,
    items: [
      "Q4: design layered pick-up / throw-down queues + project menus (import/overflow, no screenspace steal)",
      "Answer Q4 essay — or enqueue engage project-area-menus — plus design-to-queues + surfaces",
      "Day shelf juggling — four open toys, none in hand; resolve which toy is actually in hand first",
      "Walkthrough + your toy-queue ontology; pick up ONE queue and park the rest",
    ],
  },
  {
    dir: "ownership-and-freeze",
    title: "Ownership gate roster (O1 · O4 · O6 · O8)",
    priority: 5,
    origin: "middle [5/5]",
    move: "pursue now — this is the live strip",
    hidden: true,
    items: [
      "O1 layout law — tabbed columns with panes, vs chips-only Story A",
      "O4 agent surface — attached with detach permitted, vs docked always",
      "O6 instruction rails — shared buffer vs per-agent vs hybrid (+ detach send rules)",
      "O8 “Other AIs” — collapsed chip vs mini-list vs something else",
      "One plain line per gate; answered ones retire and the bench (Q4 · H1 · J1 · E1) steps up",
    ],
  },
  {
    dir: "josiah-sesefus-reopen",
    title: "Re-open Josiah × Sesefus without the freeze",
    priority: 5,
    origin: "right [5/5]",
    move: "pursue now — only after the strip, or as the afterTrunk fork",
    hidden: true,
    items: [
      'Essay jot + "help Josiah understand Sesefus"',
      "Load the magazine, answer stick-to Qs",
      "Or skip to a 2-min voice.bat pitch + one ask of him",
    ],
  },
  {
    dir: "real-job-economic-capacity",
    title: "Floor numbers / what work can actually pay",
    priority: 4,
    origin: "right [4/5]",
    move: "handoff preamble — or pursue now only if you want money-planning here",
    hidden: true,
    items: [
      "Success meter — the surprise-non-Jack framing, if it still holds",
      'Separate thread or slot: floor numbers, what "surprise" looks like, what work can actually pay',
      "Not more ontology of care",
    ],
  },
  {
    dir: "host-index-gates",
    title: "Host + index gates (01 / 03 + 05)",
    priority: 4,
    origin: "middle [4/5]",
    move: "pursue now (short measure slice) — blocked until ownership freezes if they touch host layout",
    hidden: true,
    items: [
      "Measure host behavior and session-map load cost",
      "Only then decide pin-in-slice vs park",
      "Tighten Q5 after the measurement",
    ],
  },
  {
    dir: "attentional-heads",
    title: "Attentional division of composite inference pillars / voice-only feel-better",
    priority: 4,
    origin: "right [4/5]",
    move: "prompt out (/prompt) if code/design; else pursue now for a one-page R&D spine only",
    hidden: true,
    items: [
      "Beginning work on attentional division of composite pillars of inference",
      "Heads model vs journal path",
      "What is R&D vs what Josiah can touch",
    ],
  },
  {
    dir: "multi-window-agent-discovery",
    title: "Discovery chrome + docked agent surface under tab SSOT",
    priority: 4,
    origin: "middle [4/5]",
    move: "prompt out (/prompt) once freezes land — this is code work",
    hidden: true,
    items: [
      "After freeze pack, implement discovery chrome + docked agent surface",
      "Under tab SSOT — NOT multi-pane",
    ],
  },
  {
    dir: "success-under-ai-essay",
    title: "Success-under-AI essay",
    priority: 3,
    origin: "right [3/5]",
    move: "pursue now (short stamp) — or drop if doctrine is enough",
    hidden: true,
    items: [
      "Write/stamp the essay",
      "Or leave it as doctrine and stop re-litigating",
    ],
  },
  {
    dir: "archive-browser-encryption",
    title: "Archive-browser polish + encryption queue",
    priority: 3,
    origin: "middle [3/5] + [2/5]",
    move: 'prompt out — or drop if archive is "good enough" for now',
    hidden: true,
    items: [
      "Pick 1–2 polish items on the live board — not a redesign",
      "Encryption nest: open Q5 alone → keep on day queue only",
    ],
  },
  {
    dir: "family-map-tooling-residual",
    title: "Family-map residual + tooling residual",
    priority: 2,
    origin: "right [2/5]",
    move: "drop as an open eng loop; keep as pack facts / drop or prompt out",
    hidden: true,
    items: [
      "Only if you want that material in Josiah talk (interview Q7) or the essay — else leave it be",
      'Optional wire "interview plan calls parse"; skip unless skills hygiene is the job',
    ],
  },
  {
    dir: "lower-priority-leftovers",
    title: "Cosmetics + hygiene leftovers",
    priority: 1,
    origin: "all panes [2/5]–[1/5]",
    move: "drop until higher items clear, or you explicitly want cosmetics / hygiene",
    hidden: true,
    items: [
      "Day-dir naming / residual rename of Fri2631th",
      "Penguin icon",
      "MSI kit unfinished",
      "Standing residue: identity copy + .grok cleanup",
      "Jason Liu / slacker projection → drop",
    ],
  },
];
