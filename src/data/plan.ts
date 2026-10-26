import type { Owner, Phase, Risk } from '../types'

export const OWNERS: Owner[] = ['Delna', 'Diya', 'Joseph', 'Shared']

export const ROLES: Record<Owner, string> = {
  Delna: 'UI/UX Design',
  Diya: 'Frontend Development',
  Joseph: 'Backend, Computer Vision & Kinect',
  Shared: 'Whole team',
}

export const goal =
  'A web-based presentation that a presenter controls with hand gestures, using a Kinect sensor connected to a laptop.'

export const timeline =
  '6 weeks, starting the week of Oct 26. No deadline was given, so stretch or compress the phases to fit yours.'

export const inScope = [
  'Swipe right for next slide, swipe left for previous slide.',
  'Raised hand to show or hide a hand-tracked pointer.',
  'A keyboard fallback so a demo never fails.',
]

export const outOfScope = [
  'Voice control',
  'Multi-user tracking',
  'Slide authoring tools',
  'Cloud hosting',
]

export const architecture = [
  'Kinect sensor',
  'Joseph: skeleton tracking + gesture detection',
  'WebSocket events (localhost)',
  'Delna & Diya: web presentation UI',
]

export const phases: Phase[] = [
  {
    id: 'p1',
    title: 'Design and Setup',
    weeks: 'Week 1',
    summary: 'Lock the contract between backend and frontend, and prove the Kinect works on the laptop.',
    groups: [
      {
        owner: 'Shared',
        tasks: [
          'Agree on the event contract between backend and frontend so everyone can work in parallel. Example: { "type": "gesture", "name": "swipe_right", "confidence": 0.92 } and { "type": "pointer", "x": 0.42, "y": 0.61 }.',
          'Set up the shared repo, branch rules, and a weekly demo checkpoint.',
        ],
      },
      {
        owner: 'Delna',
        tasks: [
          'Define the gesture-to-action map and user flow (start, presenting, paused, tracking lost).',
          'Design low-fi wireframes for the presenter view and audience view.',
          'Design feedback states: "gesture recognized," "no user detected," "too far/too close."',
        ],
      },
      {
        owner: 'Diya',
        tasks: [
          'Set up the frontend project and pick the slide engine (e.g., Reveal.js or a custom slide component).',
          'Build a static 5-slide demo deck to test with.',
          'Build a mock WebSocket client that simulates gesture events with keyboard keys, so the frontend can progress without the Kinect.',
        ],
      },
      {
        owner: 'Joseph',
        tasks: [
          'Confirm the Kinect model and install the matching PC drivers/SDK on the laptop.',
          'Get a live skeleton or depth stream working and displayed on screen.',
          'Choose the backend stack (e.g., Python or C# with a WebSocket server) and document the setup steps so the team can reproduce it.',
          'Measure the usable range, lighting sensitivity, and frame rate.',
        ],
      },
    ],
    exitCriteria: 'Kinect streams data on the laptop, wireframes are approved, and the event contract is signed off.',
  },
  {
    id: 'p2',
    title: 'Core Development',
    weeks: 'Weeks 2–3',
    summary: 'Build real gesture detection on one side and the presentation shell on the other.',
    groups: [
      {
        owner: 'Joseph',
        tasks: [
          'Build the gesture detection pipeline: joint tracking → swipe detection using hand velocity and direction thresholds.',
          "Add cooldown and debounce so one swipe doesn't fire twice.",
          'Select the primary presenter (the closest tracked body) and ignore others.',
          'Stand up the WebSocket server that emits the agreed events.',
          'Add a debug mode that logs gestures and confidence values.',
        ],
      },
      {
        owner: 'Delna',
        tasks: [
          'Turn wireframes into high-fidelity designs: slide layout, controls, pointer style, status indicator, and a calibration or "get ready" screen.',
          'Deliver a lightweight design system (colors, type, spacing) and exportable assets to Diya.',
          'Write short on-screen gesture guidance copy.',
        ],
      },
      {
        owner: 'Diya',
        tasks: [
          'Build the presentation shell: slide navigation, transitions, and the presenter/audience views.',
          'Implement the WebSocket client that maps incoming events to next/previous/pointer actions.',
          "Build the pointer overlay and smoothing so hand jitter doesn't shake the cursor.",
          'Build the connection-status and tracking-lost indicators.',
        ],
      },
    ],
    exitCriteria:
      "Joseph's backend emits real gestures, and Diya's UI works end to end with mock data and with at least one live event type.",
  },
  {
    id: 'p3',
    title: 'Integration',
    weeks: 'Week 4',
    summary: 'Connect both halves, tune accuracy, and test with people outside the team.',
    groups: [
      {
        owner: 'Joseph',
        tasks: [
          'Run backend and frontend together on the laptop, and fix latency and dropped events.',
          'Tune gesture thresholds using test runs with all three team members at different heights and distances.',
          'Add auto-reconnect and a clean restart path if the Kinect stream drops.',
        ],
      },
      {
        owner: 'Diya',
        tasks: [
          'Connect the live gesture stream to the UI, replacing the mocks.',
          'Handle edge cases: duplicate events, out-of-order messages, disconnects, and first or last slide behavior.',
          'Add the keyboard fallback controls.',
        ],
      },
      {
        owner: 'Delna',
        tasks: [
          'Run usability sessions: have 3–5 outsiders present a short deck using only gestures, and record where they struggle.',
          'Refine the feedback states and on-screen guidance based on those sessions.',
          'Write a short test script and bug list for the team.',
        ],
      },
    ],
    exitCriteria:
      'A complete 5-minute presentation can be delivered by gesture alone, with accuracy above a target the team sets (suggested: 90% of swipes recognized correctly).',
  },
  {
    id: 'p4',
    title: 'Polish',
    weeks: 'Weeks 5–6',
    summary: 'Make it stable, repeatable, and demo-ready. Freeze features one week before the demo.',
    groups: [
      {
        owner: 'Delna',
        tasks: [
          'Final visual polish: animations, accessibility checks (contrast, text size), and a responsive layout for projector resolutions.',
          'Produce the demo deck content and a one-page "how to use ECHO-PPT" guide.',
        ],
      },
      {
        owner: 'Diya',
        tasks: [
          'Performance pass: remove lag, optimize assets, and test in the target browsers.',
          'Fix the frontend bugs from the Phase 3 sessions.',
          'Add a settings panel (sensitivity, pointer on/off) if time allows.',
        ],
      },
      {
        owner: 'Joseph',
        tasks: [
          'Stability testing: run the system for 30+ minutes continuously and test in varied room lighting.',
          'Reduce false positives, and package the app with a one-command or one-click launch script.',
          'Write the setup and troubleshooting notes for the backend.',
        ],
      },
      {
        owner: 'Shared',
        tasks: [
          'Run a full dress rehearsal on the final laptop in real venue conditions.',
          'Freeze features one week before the demo, so the last days go to bug fixes only.',
        ],
      },
    ],
    exitCriteria: 'A stable, repeatable demo, with documentation and a launch script anyone on the team can run.',
  },
]

export const risks: Risk[] = [
  {
    risk: 'Kinect drivers/SDK incompatible with the laptop OS',
    mitigation: 'Joseph validates this in Week 1 and reports immediately if a different setup is needed.',
  },
  {
    risk: 'Gestures misfire in bright light or crowded rooms',
    mitigation: 'Confidence thresholds, cooldowns, and a keyboard fallback.',
  },
  {
    risk: 'Frontend blocked waiting on the backend',
    mitigation: 'The mock event client lets Diya and Delna work independently from day one.',
  },
  {
    risk: 'Scope creep',
    mitigation: 'Anything beyond the three MVP gestures goes on a post-MVP backlog.',
  },
]
