import React, { useState, useEffect } from "react";

const COURSE = {
  name: "Grandview Golf Club",
  city: "Kalkaska", state: "MI",
  address: "3003 Hagni Road NE, Kalkaska, MI 49646",
  phone: "(231) 258-3244",
  website: "https://www.grandviewgolfnorth.com",
  tees: "White", rating: "69.5", slope: "129",
  holes: [
    { hole:  1, par: 4, yards: 362, handicap:  7 },
    { hole:  2, par: 5, yards: 483, handicap:  5 },
    { hole:  3, par: 3, yards: 137, handicap:  9 },
    { hole:  4, par: 4, yards: 366, handicap:  1 },
    { hole:  5, par: 4, yards: 326, handicap: 15 },
    { hole:  6, par: 4, yards: 337, handicap: 17 },
    { hole:  7, par: 5, yards: 552, handicap:  3 },
    { hole:  8, par: 3, yards: 172, handicap:  5 },
    { hole:  9, par: 4, yards: 358, handicap: 13 },
    { hole: 10, par: 4, yards: 327, handicap: 14 },
    { hole: 11, par: 5, yards: 506, handicap: 10 },
    { hole: 12, par: 4, yards: 329, handicap: 12 },
    { hole: 13, par: 4, yards: 267, handicap: 18 },
    { hole: 14, par: 3, yards: 202, handicap:  6 },
    { hole: 15, par: 5, yards: 556, handicap:  4 },
    { hole: 16, par: 3, yards: 147, handicap: 16 },
    { hole: 17, par: 4, yards: 380, handicap:  2 },
    { hole: 18, par: 4, yards: 374, handicap:  8 },
  ],
};

const ADMIN_PINS = ["1234", "5678"];
const initTeams  = () => [];
const initScores = () => ({});
const initMessages = () => [];

// Design tokens — Apple-inspired
const T = {
  green:     "#1C3D2A",
  greenMid:  "#2D5A3D",
  greenLight:"#E8F4EC",
  greenAccent:"#34C759",
  red:       "#FF3B30",
  amber:     "#FF9500",
  blue:      "#007AFF",
  label:     "rgba(60,60,67,0.6)",
  labelBright: "rgba(255,255,255,0.8)",
  sep:       "rgba(60,60,67,0.12)",
  card:      "rgba(255,255,255,0.85)",
  radius:    16,
  radiusSm:  10,
  radiusXl:  22,
  font:      "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { margin: 0; background: #f2f2f7; }

  .jvi-root { font-family: ${T.font}; min-height: 100vh; background: linear-gradient(160deg, #0a2015 0%, #1c3d2a 40%, #0f2d1c 100%); }

  /* Glassmorphism card */
  .glass {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.6);
  }
  .glass-dark {
    background: rgba(28,61,42,0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.12);
  }

  /* Inputs */
  .jvi-input {
    width: 100%; padding: 14px 16px;
    background: rgba(118,118,128,0.08);
    border: 1px solid rgba(118,118,128,0.2);
    border-radius: 12px;
    font-family: ${T.font}; font-size: 17px; color: #000;
    outline: none; transition: border-color 0.2s;
    -webkit-appearance: none;
  }
  .jvi-input:focus { border-color: #34C759; background: #fff; }
  .jvi-input::placeholder { color: rgba(60,60,67,0.4); }

  /* Buttons */
  .btn-primary {
    width: 100%; padding: 16px;
    background: ${T.green};
    color: #fff; border: none; border-radius: 14px;
    font-family: ${T.font}; font-size: 17px; font-weight: 600;
    cursor: pointer; letter-spacing: -0.2px;
    transition: opacity 0.15s, transform 0.1s;
  }
  .btn-primary:active { opacity: 0.82; transform: scale(0.985); }

  .btn-sm {
    padding: 9px 18px;
    background: ${T.green}; color: #fff;
    border: none; border-radius: 10px;
    font-family: ${T.font}; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: opacity 0.15s, transform 0.1s;
    white-space: nowrap;
  }
  .btn-sm:active { opacity: 0.8; transform: scale(0.97); }

  .btn-ghost {
    padding: 9px 18px;
    background: rgba(118,118,128,0.1); color: #000;
    border: none; border-radius: 10px;
    font-family: ${T.font}; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: background 0.15s;
  }
  .btn-ghost:active { background: rgba(118,118,128,0.2); }

  .btn-danger {
    padding: 8px 14px;
    background: rgba(255,59,48,0.1); color: ${T.red};
    border: 1px solid rgba(255,59,48,0.2); border-radius: 10px;
    font-family: ${T.font}; font-size: 13px; font-weight: 500;
    cursor: pointer;
  }

  /* Tabs */
  .tab-bar {
    display: flex; overflow-x: auto; gap: 0;
    border-bottom: 1px solid ${T.sep};
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab-btn {
    flex-shrink: 0; padding: 14px 20px;
    background: transparent; border: none;
    border-bottom: 2px solid transparent;
    font-family: ${T.font}; font-size: 15px; font-weight: 500;
    color: rgba(60,60,67,0.6); cursor: pointer;
    transition: color 0.15s;
    white-space: nowrap;
  }
  .tab-btn.active {
    color: ${T.green}; border-bottom-color: ${T.green}; font-weight: 600;
  }

  /* Hole pills */
  .hole-pill {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: ${T.font}; font-size: 14px; font-weight: 600;
    cursor: pointer; border: 2px solid transparent;
    transition: all 0.15s; flex-shrink: 0;
  }
  .hole-pill.selected { background: ${T.green}; color: #fff; border-color: ${T.green}; }
  .hole-pill.done { background: #FFD700; color: #1C3D2A; border-color: #FFD700; font-weight: 800; }
  .hole-pill.partial { background: rgba(255,149,0,0.12); color: #b36200; border-color: rgba(255,149,0,0.3); }
  .hole-pill.empty { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.2); }

  /* Score input */
  .score-box {
    border: 2.5px solid ${T.green};
    border-radius: 14px; background: rgba(52,199,89,0.06);
    display: inline-flex; align-items: center; justify-content: center;
  }
  .score-input {
    width: 110px; padding: 14px 8px;
    border: none; background: transparent; outline: none;
    font-family: ${T.font}; font-size: 38px; font-weight: 700;
    text-align: center; color: ${T.green};
    -webkit-appearance: none; appearance: none;
  }
  .score-input::placeholder { color: rgba(52,199,89,0.35); }

  /* Toast */
  .toast {
    position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
    background: rgba(28,28,30,0.9); color: #fff;
    padding: 12px 24px; border-radius: 20px;
    font-family: ${T.font}; font-size: 15px; font-weight: 500;
    backdrop-filter: blur(10px); z-index: 9999;
    white-space: nowrap;
  }
  .toast.error { background: rgba(255,59,48,0.9); }

  /* Leaderboard table */
  .lb-table { border-collapse: collapse; width: 100%; min-width: 700px; }
  .lb-table th { font-family: ${T.font}; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; padding: 8px 6px; text-align: center; background: ${T.green}; color: rgba(255,255,255,0.85); }
  .lb-table th.left { text-align: left; padding-left: 14px; }
  .lb-table td { font-family: ${T.font}; font-size: 13px; padding: 8px 6px; text-align: center; border-bottom: 1px solid ${T.sep}; }
  .lb-table td.left { text-align: left; padding-left: 14px; }
  .lb-table tr.team-row { cursor: pointer; transition: background 0.1s; }
  .lb-table tr.team-row:hover { background: rgba(52,199,89,0.04); }
  .lb-table tr.team-row.highlight { background: rgba(52,199,89,0.07); }
  .lb-table .subtotal { background: rgba(28,61,42,0.05); font-weight: 700; }
  .lb-table .meta-row td { background: rgba(28,61,42,0.03); font-size: 11px; color: rgba(60,60,67,0.55); padding: 5px 6px; border-bottom: 1px solid ${T.sep}; }
  .lb-table .meta-row td.left { text-align: left; padding-left: 14px; font-weight: 600; color: rgba(60,60,67,0.7); }
  .score-eagle2 { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:2px solid #7B2FBE;outline:2px solid #7B2FBE;outline-offset:2px;font-weight:800;color:#7B2FBE;font-size:12px; }
  .score-eagle  { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:2px solid #1D9E75;font-weight:800;color:#1D9E75;font-size:12px; }
  .score-birdie { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:1.5px solid #34C759;font-weight:700;color:#1C3D2A;font-size:12px; }
  .score-par    { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;font-weight:600;color:#333;font-size:12px; }
  .score-bogey  { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:1.5px solid #FF3B30;font-weight:700;color:#FF3B30;font-size:12px;border-radius:2px; }
  .score-double { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:1.5px solid #FF3B30;outline:2px solid #FF3B30;outline-offset:2px;font-weight:800;color:#FF3B30;font-size:12px;border-radius:2px; }
  .score-worse  { display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border:2px solid #8B0000;font-weight:800;color:#8B0000;font-size:11px;border-radius:2px;background:rgba(139,0,0,0.06); }
  .skin-winner  { background:linear-gradient(135deg,#FFD700,#FFA500);color:#5C3A00;border-radius:5px;padding:1px 4px;font-weight:800;box-shadow:0 1px 4px rgba(255,165,0,0.45);display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;font-size:12px; }
  .msg-bubble { border-radius:14px; padding:10px 14px; margin-bottom:8px; max-width:80%; }
  .msg-input-row { display:flex; gap:8px; padding:12px 16px; background:rgba(255,255,255,0.95); border-top:1px solid rgba(60,60,67,0.12); position:sticky; bottom:0; backdrop-filter:blur(10px); }
  .msg-input { flex:1; padding:11px 14px; border-radius:22px; border:1px solid rgba(118,118,128,0.25); background:rgba(118,118,128,0.07); font-family:${T.font}; font-size:15px; outline:none; }
  .msg-send { width:38px;height:38px;border-radius:50%;background:#1C3D2A;border:none;color:#fff;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0; }

  /* Section label */
  .section-label {
    font-family: ${T.font}; font-size: 12px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: rgba(60,60,67,0.5); margin-bottom: 8px;
  }

  /* List separator */
  .list-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .list-row { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid ${T.sep}; }
  .list-row:last-child { border-bottom: none; }

  /* Animations */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.4s ease both; }
  @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 400px; } }
`;

// Shared cloud storage so all devices see the same data
// ── Firebase Realtime Database — cross-device shared storage ─────────────────
// Free tier: 1GB storage, 10GB/month transfer — more than enough for a golf outing.
// Data URL is public but the database rules only allow read/write (no delete without auth).
const FB_URL = "https://jvi-golf-default-rtdb.firebaseio.com";

async function fbGet(key) {
  try {
    const r = await fetch(`${FB_URL}/${key}.json`);
    if (!r.ok) { console.error("fbGet failed:", key, r.status, r.statusText); return null; }
    return await r.json();
  } catch(e) { console.error("fbGet error:", key, e); return null; }
}

async function fbSet(key, value) {
  try {
    const r = await fetch(`${FB_URL}/${key}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value)
    });
    if (!r.ok) console.error("fbSet failed:", key, r.status, r.statusText);
    else console.log("fbSet OK:", key);
  } catch(e) { console.error("fbSet error:", key, e); }
}

// Test Firebase connectivity on startup
fbSet("jvi_ping", { ts: Date.now(), msg: "connection test" });

// Simple localStorage fallback hook (used for non-shared state)
function useStorage(key, init) {
  const [state, setState] = useState(() => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : init(); }
    catch { return init(); }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [state, key]);
  return [state, setState];
}

// Shared hook — Firebase is the single source of truth
// On mount: load from Firebase (ignore localStorage)
// On change: write to Firebase immediately
// Poll every 5s: pull latest from Firebase
function useSharedStorage(key, init) {
  const [state, setState] = useState(init);
  const [ready, setReady] = useState(false);
  const lastWrite = React.useRef(0);

  // On mount — always load from Firebase first, ignore localStorage
  useEffect(() => {
    fbGet(key).then(v => {
      if (v !== null) {
        setState(v);
      }
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  // Poll Firebase every 5 seconds
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      if (Date.now() - lastWrite.current < 3000) return;
      fbGet(key).then(v => {
        if (v !== null) setState(v);
      }).catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [ready]);

  // Setter — writes to Firebase immediately
  const setStateAndSync = React.useCallback((updater) => {
    setState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      lastWrite.current = Date.now();
      fbSet(key, next);
      return next;
    });
  }, [key]);

  return [state, setStateAndSync];
}

export default function JVI() {
  const [teams,  setTeams]  = useSharedStorage("jvi_teams",  initTeams);
  const [scores, setScores] = useSharedStorage("jvi_scores", initScores);
  const [notes,    setNotes]    = useSharedStorage("jvi_notes",    initScores);
  const [messages, setMessages] = useSharedStorage("jvi_messages", initMessages);

  const [view,         setView]         = useState("login");
  const [currentUser,  setCurrentUser]  = useState(null);
  const [adminPin,     setAdminPin]     = useState("");
  const [playerName,   setPlayerName]   = useState("");
  const [selectedHole, setSelectedHole] = useState(1);
  const [adminTab,     setAdminTab]     = useState("teams");
  const [editTeam,     setEditTeam]     = useState(null);
  const [newTeamName,  setNewTeamName]  = useState("");
  const [newPlayers,   setNewPlayers]   = useState(["","","",""]);
  const [newScorer,    setNewScorer]    = useState(0);
  const [scoreInput,   setScoreInput]   = useState({});
  const [noteInput,    setNoteInput]    = useState({});
  const [loginError,   setLoginError]   = useState("");
  const [toast,        setToast]        = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [signOutConfirm, setSignOutConfirm] = useState(false);

  const HOLES = COURSE.holes;

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2600); };

  const handleLogin = (userType) => {
    setLoginError("");
    if (userType === "admin") {
      if (adminPin === ADMIN_PINS[0]) { setCurrentUser({ name: "Admin Tony", isAdmin: true }); setView("admin"); return; }
      if (adminPin === ADMIN_PINS[1]) { setCurrentUser({ name: "Admin Brian", isAdmin: true }); setView("admin"); return; }
      setLoginError("Incorrect PIN. Please try again.");
      return;
    }
    const name = playerName.trim().toLowerCase();
    if (!name) { setLoginError("Please enter your name."); return; }

    if (userType === "captain") {
      // Must match players[0] of a team
      for (const team of teams) {
        if (team.players[0]?.toLowerCase() === name) {
          setCurrentUser({ name: team.players[0], teamId: team.id, isCapt: true });
          setAdminTab("leaderboard"); setView("scoring"); return;
        }
      }
      // Check if they are a non-captain player and warn them
      for (const team of teams) {
        for (let i = 1; i < team.players.length; i++) {
          if (team.players[i]?.toLowerCase() === name) {
            setLoginError("You are registered as a player, not a captain. Please select 'Player' instead.");
            return;
          }
        }
      }
      setLoginError("Captain name not found. Please check your name matches what the admin entered.");
      return;
    }

    if (userType === "player") {
      // Must match a non-captain player (players[1+])
      for (const team of teams) {
        for (let i = 1; i < team.players.length; i++) {
          if (team.players[i]?.toLowerCase() === name) {
            setCurrentUser({ name: team.players[i], isViewer: true });
            setAdminTab("leaderboard"); setView("viewer"); return;
          }
        }
      }
      // Check if they are actually a captain and warn them
      for (const team of teams) {
        if (team.players[0]?.toLowerCase() === name) {
          setLoginError("You are registered as a captain. Please select 'Captain' instead.");
          return;
        }
      }
      setLoginError("Player name not found. Please check your name matches what the admin entered.");
      return;
    }
  };

  const allPlayerNames = () => teams.flatMap(t => t.players.map(p => p.toLowerCase()));

  const addTeam = () => {
    const fp = newPlayers.map(p => p.trim()).filter(p => p);
    if (!newTeamName.trim() || fp.length < 1) { showToast("Fill in team name and at least 1 player", "error"); return; }
    if (teams.some(t => t.name.trim().toLowerCase() === newTeamName.trim().toLowerCase())) { showToast("A team with that name already exists", "error"); return; }
    const existingNames = allPlayerNames();
    const dupe = fp.find(p => existingNames.includes(p.toLowerCase()));
    if (dupe) { showToast(`"${dupe}" is already on another team`, "error"); return; }
    const dupeWithin = fp.find((p, i) => fp.findIndex(q => q.toLowerCase() === p.toLowerCase()) !== i);
    if (dupeWithin) { showToast(`Duplicate player name: "${dupeWithin}"`, "error"); return; }
    const si = newScorer < fp.length ? newScorer : 0;
    setTeams(prev => [...prev, { id: Date.now(), name: newTeamName.trim(), players: fp, scorerIndex: si }]);
    setNewTeamName(""); setNewPlayers(["","","",""]); setNewScorer(0); showToast("Team added!");
  };

  const removeTeam = (id) => {
    setTeams(prev => prev.filter(t => t.id !== id));
    const s = { ...scores }, n = { ...notes };
    Object.keys(s).forEach(k => { if (k.startsWith(id + "_")) delete s[k]; });
    Object.keys(n).forEach(k => { if (k.startsWith(id + "_")) delete n[k]; });
    setScores(s); setNotes(n);
  };

  const saveEditTeam = () => {
    const fp = editTeam.players.map(p => p.trim()).filter(p => p);
    if (!editTeam.name.trim() || fp.length < 1) { showToast("Fill in team name and at least 1 player", "error"); return; }
    if (teams.some(t => t.id !== editTeam.id && t.name.trim().toLowerCase() === editTeam.name.trim().toLowerCase())) { showToast("A team with that name already exists", "error"); return; }
    const existingNames = teams.filter(t => t.id !== editTeam.id).flatMap(t => t.players.map(p => p.toLowerCase()));
    const dupe = fp.find(p => existingNames.includes(p.toLowerCase()));
    if (dupe) { showToast(`"${dupe}" is already on another team`, "error"); return; }
    const dupeWithin = fp.find((p, i) => fp.findIndex(q => q.toLowerCase() === p.toLowerCase()) !== i);
    if (dupeWithin) { showToast(`Duplicate player name: "${dupeWithin}"`, "error"); return; }
    const si = editTeam.scorerIndex < fp.length ? editTeam.scorerIndex : 0;
    setTeams(prev => prev.map(t => t.id === editTeam.id ? { ...editTeam, name: editTeam.name.trim(), players: fp, scorerIndex: si } : t));
    setEditTeam(null); showToast("Team updated!");
  };

  const saveScore = (teamId, hole) => {
    const key = `${teamId}_${hole}`, val = scoreInput[key];
    if (!val || isNaN(parseInt(val)) || parseInt(val) < 1) { showToast("Enter a valid score", "error"); return; }
    setScores(prev => ({ ...prev, [key]: parseInt(val) }));
    if (noteInput[key] !== undefined) setNotes(prev => ({ ...prev, [key]: noteInput[key] }));
    showToast("Score saved!");
  };

  const getTeamTotal   = (team) => HOLES.reduce((a, h) => a + (scores[`${team.id}_${h.hole}`] || 0), 0);
  const getTeamToPar   = (team) => HOLES.reduce((a, h) => { const s = scores[`${team.id}_${h.hole}`]; return s ? a + s - h.par : a; }, 0);
  const getHolesPlayed = (team) => HOLES.filter(h => scores[`${team.id}_${h.hole}`]).length;

  const getSkin = (holeNum) => {
    const h = HOLES[holeNum - 1]; if (!h) return null;
    const hs = teams.map(t => ({ team: t, score: scores[`${t.id}_${holeNum}`] })).filter(x => x.score != null);
    if (hs.length < teams.length || teams.length === 0) return null;
    const min = Math.min(...hs.map(x => x.score));
    const winners = hs.filter(x => x.score === min);
    return winners.length === 1 ? { team: winners[0].team, score: min, toPar: min - h.par } : { tie: true, score: min };
  };

  const sortedTeams = [...teams].sort((a, b) => {
    const ap = getHolesPlayed(a), bp = getHolesPlayed(b);
    if (ap === 0 && bp === 0) return 0; if (ap === 0) return 1; if (bp === 0) return -1;
    return getTeamToPar(a) - getTeamToPar(b);
  });

  const formatToPar = (n) => n === 0 ? "E" : n > 0 ? `+${n}` : `${n}`;
  const toParColor  = (n) => n < 0 ? T.greenAccent : n > 0 ? T.red : "#000";
  const myTeam = currentUser?.teamId ? teams.find(t => t.id === currentUser.teamId) : null;
  const resetAll = () => { setTeams([]); setScores({}); setNotes({}); setMessages([]); setResetConfirm(false); showToast("All data reset"); };

  const frontPar = HOLES.slice(0,9).reduce((a,h) => a+h.par, 0);
  const backPar  = HOLES.slice(9,18).reduce((a,h) => a+h.par, 0);
  const frontYds = HOLES.slice(0,9).reduce((a,h) => a+h.yards, 0);
  const backYds  = HOLES.slice(9,18).reduce((a,h) => a+h.yards, 0);

  return (
    <div className="jvi-root">
      <style>{css}</style>

      {toast && <div className={`toast${toast.type === "error" ? " error" : ""}`}>{toast.msg}</div>}

      {/* ── HEADER ── */}
      <div style={{ padding: "20px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⛳</div>
          <div>
            <div style={{ color: "#fff", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", fontFamily: T.font, lineHeight: 1.1 }}>JVI</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: T.font }}>
              {COURSE.name}
            </div>
          </div>
        </div>
        {currentUser && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ color: "rgba(255,255,255,0.9)", fontFamily: T.font, fontSize: 13, fontWeight: 600, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 14px" }}>
              {currentUser.name}
            </div>
            {signOutConfirm ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.85)", fontFamily: T.font, fontSize: 13 }}>Sure?</span>
              <button onClick={() => { setCurrentUser(null); setView("login"); setPlayerName(""); setAdminPin(""); setLoginError(""); setSignOutConfirm(false); }}
                style={{ background: T.red, border: "none", color: "#fff", borderRadius: 16, padding: "6px 14px", cursor: "pointer", fontFamily: T.font, fontSize: 13, fontWeight: 600 }}>Yes</button>
              <button onClick={() => setSignOutConfirm(false)}
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 16, padding: "6px 14px", cursor: "pointer", fontFamily: T.font, fontSize: 13 }}>No</button>
            </div>
          ) : (
            <button onClick={() => setSignOutConfirm(true)}
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontFamily: T.font, fontSize: 13 }}>
              Sign out
            </button>
          )}
          </div>
        )}
      </div>

      {/* ── LOGIN ── */}
      {view === "login" && (
        <div className="fade-up" style={{ maxWidth: 420, margin: "32px auto 0", padding: "0 20px 40px" }}>
          {/* Course hero card */}
          <div className="glass-dark" style={{ borderRadius: 20, padding: "20px 22px", marginBottom: 16 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: T.font, marginBottom: 6 }}>Today's course</div>
            <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, fontFamily: T.font, letterSpacing: "-0.3px" }}>{COURSE.name}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: T.font, marginTop: 2 }}>{COURSE.city}, {COURSE.state}</div>
            <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
              {[["Par", "72"], ["Yards", "6,181"], ["Rating", COURSE.rating], ["Slope", COURSE.slope]].map(([l,v]) => (
                <div key={l}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: T.font }}>{l}</div>
                  <div style={{ color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: T.font }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Login card */}
          <LoginCard
            playerName={playerName} setPlayerName={setPlayerName}
            adminPin={adminPin} setAdminPin={setAdminPin}
            loginError={loginError} setLoginError={setLoginError}
            handleLogin={handleLogin}
          />
        </div>
      )}

      {/* ── ADMIN ── */}
      {view === "admin" && (
        <div style={{ marginTop: 20 }}>
          <div className="tab-bar" style={{ paddingLeft: 4, paddingRight: 4 }}>
            {["teams","scoring","leaderboard","skins","messages"].map(tab => (
              <button key={tab} className={`tab-btn${adminTab === tab ? " active" : ""}`} onClick={() => setAdminTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button onClick={() => setResetConfirm(true)} style={{ background: "transparent", border: "none", color: T.red, fontFamily: T.font, fontSize: 13, fontWeight: 500, padding: "0 16px", cursor: "pointer" }}>Reset</button>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 40px" }}>
            {resetConfirm && (
              <div style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 600, color: T.red, marginBottom: 8 }}>Reset all data?</div>
                <div style={{ fontFamily: T.font, fontSize: 14, color: T.label, marginBottom: 14 }}>This will permanently delete all teams, scores, and notes.</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-sm" style={{ background: T.red }} onClick={resetAll}>Delete everything</button>
                  <button onClick={() => setResetConfirm(false)} style={{ padding: "9px 20px", background: "#ffffff", color: "#000", border: "1.5px solid rgba(0,0,0,0.18)", borderRadius: 10, fontFamily: T.font, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}

            {adminTab === "teams"       && <TeamsTab teams={teams} editTeam={editTeam} setEditTeam={setEditTeam} saveEditTeam={saveEditTeam} newTeamName={newTeamName} setNewTeamName={setNewTeamName} newPlayers={newPlayers} setNewPlayers={setNewPlayers} newScorer={newScorer} setNewScorer={setNewScorer} addTeam={addTeam} removeTeam={removeTeam} />}
            {adminTab === "scoring"     && <AdminScoringTab teams={teams} scores={scores} notes={notes} setScores={setScores} setNotes={setNotes} selectedHole={selectedHole} setSelectedHole={setSelectedHole} HOLES={HOLES} getSkin={getSkin} formatToPar={formatToPar} showToast={showToast} scoreInput={scoreInput} setScoreInput={setScoreInput} noteInput={noteInput} setNoteInput={setNoteInput} />}
            {adminTab === "leaderboard" && <LeaderboardView teams={sortedTeams} scores={scores} notes={notes} HOLES={HOLES} getTeamTotal={getTeamTotal} getTeamToPar={getTeamToPar} getHolesPlayed={getHolesPlayed} formatToPar={formatToPar} toParColor={toParColor} getSkin={getSkin} frontPar={frontPar} backPar={backPar} frontYds={frontYds} backYds={backYds} />}
            {adminTab === "skins"       && <SkinsView teams={teams} HOLES={HOLES} getSkin={getSkin} formatToPar={formatToPar} />}
            {adminTab === "messages"    && <MessageBoard messages={messages} setMessages={setMessages} currentUser={currentUser} onRefresh={() => fbGet("jvi_messages").then(v => { if (v !== null) setMessages(v); })} />}
          </div>
        </div>
      )}

      {/* ── VIEWER ── */}
      {view === "viewer" && (
        <div style={{ marginTop: 20 }}>
          <div className="tab-bar" style={{ paddingLeft: 4 }}>
            {["leaderboard","skins","messages"].map(tab => (
              <button key={tab} className={`tab-btn${adminTab === tab ? " active" : ""}`} onClick={() => setAdminTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 80px" }}>
            {adminTab === "leaderboard" && <LeaderboardView teams={sortedTeams} scores={scores} notes={notes} HOLES={HOLES} getTeamTotal={getTeamTotal} getTeamToPar={getTeamToPar} getHolesPlayed={getHolesPlayed} formatToPar={formatToPar} toParColor={toParColor} getSkin={getSkin} frontPar={frontPar} backPar={backPar} frontYds={frontYds} backYds={backYds} />}
            {adminTab === "skins" && <SkinsView teams={teams} HOLES={HOLES} getSkin={getSkin} formatToPar={formatToPar} />}
            {adminTab === "messages" && <MessageBoard messages={messages} setMessages={setMessages} currentUser={currentUser} onRefresh={() => fbGet("jvi_messages").then(v => { if (v !== null) setMessages(v); })} />}
          </div>
        </div>
      )}

      {/* ── SCORER ── */}
      {view === "scoring" && myTeam && (
        <div style={{ marginTop: 20, maxWidth: 800, margin: "20px auto 0", padding: "0 16px 40px" }}>
          {/* Team card */}
          <div className="glass-dark fade-up" style={{ borderRadius: 18, padding: "16px 20px", marginBottom: 16 }}>
            <div style={{ color: "#fff", fontSize: 19, fontWeight: 700, fontFamily: T.font, letterSpacing: "-0.3px", marginBottom: 8 }}>{myTeam.name}</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {myTeam.players.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.font, fontSize: 13 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? T.greenAccent : "rgba(255,255,255,0.3)" }} />
                  <span style={{ color: i === 0 ? T.greenAccent : "rgba(255,255,255,0.65)" }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hole picker */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {HOLES.map(h => {
              const saved = scores[`${myTeam.id}_${h.hole}`];
              const cls = selectedHole === h.hole ? "selected" : saved ? "done" : "empty";
              return <div key={h.hole} className={`hole-pill ${cls}`} onClick={() => setSelectedHole(h.hole)}>{h.hole}</div>;
            })}
          </div>

          {/* Scoring card */}
          {(() => {
            const h = HOLES[selectedHole - 1];
            const key = `${myTeam.id}_${selectedHole}`;
            const saved = scores[key];
            const savedNote = notes[key] || "";
            const skin = getSkin(selectedHole);
            return (
              <div className="glass fade-up" style={{ borderRadius: 20, padding: "22px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: T.font, fontSize: 32, fontWeight: 800, letterSpacing: "-1px", color: "#000", lineHeight: 1 }}>Hole {selectedHole}</div>
                    <div style={{ fontFamily: T.font, fontSize: 15, color: T.label, marginTop: 4 }}>Par {h.par} · {h.yards} yds · Hdcp {h.handicap}</div>
                  </div>
                  {skin && (
                    <div style={{ background: skin.tie ? "rgba(255,149,0,0.1)" : "rgba(52,199,89,0.1)", border: `1px solid ${skin.tie ? "rgba(255,149,0,0.3)" : "rgba(52,199,89,0.3)"}`, borderRadius: 10, padding: "6px 12px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: skin.tie ? T.amber : T.green }}>
                      {skin.tie ? "Tied" : `Skin → ${skin.team.name}`}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div className="section-label">Team score</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div className="score-box">
                      <input className="score-input" type="number" min={1} max={20} key={`sc_${key}`}
                        defaultValue={saved || ""} placeholder="—"
                        onChange={e => setScoreInput(prev => ({ ...prev, [key]: e.target.value }))} />
                    </div>
                    <button className="btn-sm" onClick={() => saveScore(myTeam.id, selectedHole)}>Save</button>
                    {saved && <span style={{ fontFamily: T.font, fontSize: 14, color: T.greenAccent, fontWeight: 600 }}>✓ {saved} ({formatToPar(saved - h.par)})</span>}
                  </div>
                </div>

                <div>
                  <div className="section-label">Notes (optional)</div>
                  <textarea key={`nt_${key}`} defaultValue={savedNote} rows={2}
                    onChange={e => setNoteInput(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder="Closest to pin, longest drive, etc."
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(118,118,128,0.2)", background: "rgba(118,118,128,0.06)", fontFamily: T.font, fontSize: 15, color: "#000", outline: "none", resize: "vertical" }} />
                </div>
              </div>
            );
          })()}

          <div style={{ marginTop: 8 }}>
            <div className="tab-bar" style={{ borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
              {["leaderboard","skins","messages"].map(tab => (
                <button key={tab} className={"tab-btn" + (adminTab === tab || (adminTab !== "skins" && adminTab !== "messages" && tab === "leaderboard") ? " active" : "")} onClick={() => setAdminTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ paddingTop: 16 }}>
              {(adminTab !== "skins" && adminTab !== "messages") && <LeaderboardView teams={sortedTeams} scores={scores} notes={notes} HOLES={HOLES} getTeamTotal={getTeamTotal} getTeamToPar={getTeamToPar} getHolesPlayed={getHolesPlayed} formatToPar={formatToPar} toParColor={toParColor} getSkin={getSkin} highlightTeamId={myTeam.id} frontPar={frontPar} backPar={backPar} frontYds={frontYds} backYds={backYds} />}
              {adminTab === "skins" && <SkinsView teams={teams} HOLES={HOLES} getSkin={getSkin} formatToPar={formatToPar} />}
              {adminTab === "messages" && <MessageBoard messages={messages} setMessages={setMessages} currentUser={currentUser} onRefresh={() => fbGet("jvi_messages").then(v => { if (v !== null) setMessages(v); })} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Teams Tab ─────────────────────────────────────────────────────────────────
function TeamsTab({ teams, editTeam, setEditTeam, saveEditTeam, newTeamName, setNewTeamName, newPlayers, setNewPlayers, newScorer, setNewScorer, addTeam, removeTeam }) {
  const [confirmRemove, setConfirmRemove] = useState(null);
  const inp = { width: "100%", padding: "13px 14px", borderRadius: 12, border: "1px solid rgba(118,118,128,0.2)", background: "rgba(118,118,128,0.06)", fontFamily: T.font, fontSize: 15, color: "#000", outline: "none" };



  return (
    <div>
      {editTeam && (
        <div className="glass" style={{ borderRadius: 18, padding: "20px", marginBottom: 20 }}>
          <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Edit team</div>
          <input value={editTeam.name} onChange={e => setEditTeam(p => ({ ...p, name: e.target.value }))} placeholder="Team name" style={{ ...inp, marginBottom: 12 }} />
          {editTeam.players.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <input value={p} onChange={e => setEditTeam(prev => { const pl=[...prev.players]; pl[i]=e.target.value; return {...prev,players:pl}; })}
                placeholder={i === 0 ? "Captain (score entry)" : `Player ${i + 1} (optional)`} style={inp} />

            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <button className="btn-sm" onClick={saveEditTeam}>Save changes</button>
            <button className="btn-ghost" onClick={() => setEditTeam(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="glass" style={{ borderRadius: 18, padding: "20px", marginBottom: 24 }}>
        <div style={{ fontFamily: T.font, fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Add a team</div>
        <input value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="Team name" style={{ ...inp, marginBottom: 12 }} />
        {newPlayers.map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <input value={p} onChange={e => setNewPlayers(prev => { const np=[...prev]; np[i]=e.target.value; return np; })}
              placeholder={i === 0 ? "Captain (score entry)" : `Player ${i + 1} (optional)`} style={inp} />

          </div>
        ))}
        <button className="btn-sm" style={{ marginTop: 6 }} onClick={addTeam}>Add team</button>
      </div>

      {teams.length === 0
        ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontFamily: T.font, fontSize: 15, padding: "32px 0" }}>No teams yet. Add your first team above.</div>
        : <div style={{ display: "grid", gap: 10 }}>
            {teams.map(team => (
              <div className="glass" key={team.id} style={{ borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{team.name}</div>
                    <div style={{ display: "inline-block", background: "rgba(52,199,89,0.12)", borderRadius: 6, padding: "3px 9px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: T.green }}>
                      Scorer: {team.players[team.scorerIndex]}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-ghost" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => { const p=[...team.players]; while(p.length<4)p.push(""); setEditTeam({...team,players:p}); }}>Edit</button>
                    <button className="btn-danger" onClick={() => setConfirmRemove(team.id)}>Remove</button>
                  </div>
                  {confirmRemove === team.id && (
                    <div style={{ marginTop: 12, background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: 10, padding: "12px 14px" }}>
                      <div style={{ fontFamily: T.font, fontSize: 14, color: T.red, marginBottom: 10 }}>Remove <strong>{team.name}</strong>? This cannot be undone.</div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn-sm" style={{ background: T.red }} onClick={() => { removeTeam(team.id); setConfirmRemove(null); }}>Yes, remove</button>
                        <button onClick={() => setConfirmRemove(null)} style={{ padding: "8px 16px", background: "#fff", color: "#000", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 10, fontFamily: T.font, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                  {team.players.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.font, fontSize: 14, color: T.label }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === team.scorerIndex ? T.greenAccent : "rgba(118,118,128,0.3)" }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
}

// ── Admin Scoring Tab ─────────────────────────────────────────────────────────
function AdminScoringTab({ teams, scores, notes, setScores, setNotes, selectedHole, setSelectedHole, HOLES, getSkin, formatToPar, showToast, scoreInput, setScoreInput, noteInput, setNoteInput }) {
  const adminSave = (teamId) => {
    const key = `${teamId}_${selectedHole}`;
    if (scoreInput[key] !== undefined && !isNaN(parseInt(scoreInput[key])) && parseInt(scoreInput[key]) > 0)
      setScores(prev => ({ ...prev, [key]: parseInt(scoreInput[key]) }));
    if (noteInput[key] !== undefined) setNotes(prev => ({ ...prev, [key]: noteInput[key] }));
    showToast("Saved!");
  };
  const h = HOLES[selectedHole - 1];
  const skin = getSkin(selectedHole);

  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {HOLES.map(ho => {
          const allDone  = teams.length > 0 && teams.every(t => scores[`${t.id}_${ho.hole}`]);
          const someDone = teams.some(t => scores[`${t.id}_${ho.hole}`]);
          const cls = selectedHole === ho.hole ? "selected" : allDone ? "done" : someDone ? "partial" : "empty";
          return <div key={ho.hole} className={`hole-pill ${cls}`} onClick={() => setSelectedHole(ho.hole)}>{ho.hole}</div>;
        })}
      </div>

      <div className="glass" style={{ borderRadius: 18, padding: "18px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: skin ? 10 : 0 }}>
          <span style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Hole {selectedHole}</span>
          <span style={{ fontFamily: T.font, fontSize: 14, color: T.label }}>Par {h.par} · {h.yards} yards · Hdcp {h.handicap}</span>
        </div>
        {skin && (
          <div style={{ display: "inline-block", background: skin.tie ? "rgba(255,149,0,0.1)" : "rgba(52,199,89,0.1)", border: `1px solid ${skin.tie ? "rgba(255,149,0,0.3)" : "rgba(52,199,89,0.3)"}`, borderRadius: 10, padding: "5px 12px", fontFamily: T.font, fontSize: 12, fontWeight: 600, color: skin.tie ? T.amber : T.green }}>
            {skin.tie ? "Tied — no skin" : `Skin → ${skin.team.name} (${skin.score}, ${formatToPar(skin.toPar)})`}
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {teams.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontFamily: T.font, fontSize: 15, padding: "24px 0" }}>Add teams first.</div>}
        {teams.map(team => {
          const key = `${team.id}_${selectedHole}`, saved = scores[key];
          return (
            <div className="glass" key={team.id} style={{ borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{team.name}</div>
              <div style={{ marginBottom: 12 }}>
                <div className="section-label">Score</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="score-box">
                    <input className="score-input" type="number" min={1} max={20} key={`adm_${key}`}
                      defaultValue={saved || ""} placeholder="—"
                      onChange={e => setScoreInput(prev => ({ ...prev, [key]: e.target.value }))} />
                  </div>
                  <button className="btn-sm" onClick={() => adminSave(team.id)}>Save</button>
                  {saved && <span style={{ fontFamily: T.font, fontSize: 14, color: T.greenAccent, fontWeight: 600 }}>✓ {saved}</span>}
                </div>
              </div>
              <div>
                <div className="section-label">Notes</div>
                <input key={`admn_${key}`} defaultValue={notes[key] || ""} onChange={e => setNoteInput(prev => ({ ...prev, [key]: e.target.value }))} placeholder="Optional"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(118,118,128,0.2)", background: "rgba(118,118,128,0.06)", fontFamily: T.font, fontSize: 15, color: "#000", outline: "none" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Leaderboard ───────────────────────────────────────────────────────────────
function LeaderboardView({ teams, scores, notes, HOLES, getTeamTotal, getTeamToPar, getHolesPlayed, formatToPar, toParColor, getSkin, highlightTeamId, frontPar, backPar, frontYds, backYds }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4, color: "#FFD700" }}>Leaderboard</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <div style={{ fontFamily: T.font, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Tap any row to expand</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 12px" }}>
          <span style={{ background: "linear-gradient(135deg,#FFD700,#FFA500)", borderRadius: 5, width: 22, height: 22, display: "inline-block" }}></span>
          <span style={{ fontFamily: T.font, fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>= Skin winner</span>
        </div>
      </div>
      {teams.length === 0 && <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontFamily: T.font, fontSize: 15, padding: "32px 0" }}>No teams yet.</div>}
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="lb-table">
            <thead>
              <tr>
                <th className="left"></th>
                {HOLES.slice(0,9).map(h => <th key={h.hole}>{h.hole}</th>)}
                <th>Out</th>
                {HOLES.slice(9,18).map(h => <th key={h.hole}>{h.hole}</th>)}
                <th>In</th><th>Tot</th><th>+/-</th>
              </tr>
              <tr className="meta-row">
                <td className="left">Hdcp</td>
                {HOLES.slice(0,9).map(h => <td key={h.hole}>{h.handicap}</td>)}
                <td></td>
                {HOLES.slice(9,18).map(h => <td key={h.hole}>{h.handicap}</td>)}
                <td></td><td></td><td></td>
              </tr>
              <tr className="meta-row">
                <td className="left">Yards</td>
                {HOLES.slice(0,9).map(h => <td key={h.hole}>{h.yards}</td>)}
                <td style={{ fontWeight: 700 }}>{frontYds}</td>
                {HOLES.slice(9,18).map(h => <td key={h.hole}>{h.yards}</td>)}
                <td style={{ fontWeight: 700 }}>{backYds}</td>
                <td style={{ fontWeight: 700 }}>{frontYds+backYds}</td><td></td>
              </tr>
              <tr className="meta-row">
                <td className="left">Par</td>
                {HOLES.slice(0,9).map(h => <td key={h.hole}>{h.par}</td>)}
                <td style={{ fontWeight: 700 }}>{frontPar}</td>
                {HOLES.slice(9,18).map(h => <td key={h.hole}>{h.par}</td>)}
                <td style={{ fontWeight: 700 }}>{backPar}</td>
                <td style={{ fontWeight: 700 }}>{frontPar+backPar}</td><td></td>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => {
                const toPar = getTeamToPar(team), played = getHolesPlayed(team);
                const ft = HOLES.slice(0,9).reduce((a,h) => a+(scores[`${team.id}_${h.hole}`]||0), 0);
                const bt = HOLES.slice(9,18).reduce((a,h) => a+(scores[`${team.id}_${h.hole}`]||0), 0);
                const isOpen = expanded === team.id;
                const ScoreCell = ({ h }) => {
                  const s = scores[`${team.id}_${h.hole}`];
                  const skin = getSkin(h.hole);
                  const wonSkin = skin && !skin.tie && skin.team && skin.team.id === team.id;
                  const diff = s ? s - h.par : null;
                  if (!s) return <td><span style={{ color: "rgba(60,60,67,0.2)" }}>—</span></td>;
                  // Skin overrides everything — gold highlight
                  if (wonSkin) return <td style={{ padding: "4px 3px" }}><span className="skin-winner">{s}</span></td>;
                  let style = { display:"inline-flex", alignItems:"center", justifyContent:"center",
                    width:26, height:26, fontWeight:600, fontSize:12, color:"#000",
                    fontFamily:T.font };
                  if (diff <= -3) {
                    // Triple eagle / albatross: double circle
                    style = { ...style, borderRadius:"50%", border:"2px solid #000", outline:"2px solid #000", outlineOffset:"2px" };
                  } else if (diff === -2) {
                    // Eagle: double circle
                    style = { ...style, borderRadius:"50%", border:"2px solid #000", outline:"2px solid #000", outlineOffset:"2px" };
                  } else if (diff === -1) {
                    // Birdie: single circle
                    style = { ...style, borderRadius:"50%", border:"1.5px solid #000" };
                  } else if (diff === 1) {
                    // Bogey: single square
                    style = { ...style, borderRadius:2, border:"1.5px solid #000" };
                  } else if (diff === 2) {
                    // Double bogey: double square
                    style = { ...style, borderRadius:2, border:"1.5px solid #000", outline:"1.5px solid #000", outlineOffset:"2px" };
                  } else if (diff >= 3) {
                    // Triple+: double square
                    style = { ...style, borderRadius:2, border:"2px solid #000", outline:"2px solid #000", outlineOffset:"2px" };
                  }
                  return <td style={{ padding: "4px 3px" }}><span style={style}>{s}</span></td>;
                };
                return (
                  <React.Fragment key={team.id}>
                    <tr className={`team-row${highlightTeamId === team.id ? " highlight" : ""}`} onClick={() => setExpanded(isOpen ? null : team.id)}
                      style={{ borderLeft: `3px solid ${highlightTeamId === team.id ? T.greenAccent : "transparent"}` }}>
                      <td className="left" style={{ fontWeight: 700 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", background: idx === 0 && played > 0 ? T.green : "rgba(118,118,128,0.12)", color: idx === 0 && played > 0 ? "#fff" : T.label, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{idx+1}</span>
                          {team.name}
                          <span style={{ fontSize: 10, color: T.label, fontWeight: 400 }}>{isOpen ? "▲" : "▼"}</span>
                        </span>
                      </td>
                      {HOLES.slice(0,9).map(h => <ScoreCell key={h.hole} h={h} />)}
                      <td className="subtotal">{ft > 0 ? ft : "—"}</td>
                      {HOLES.slice(9,18).map(h => <ScoreCell key={h.hole} h={h} />)}
                      <td className="subtotal">{bt > 0 ? bt : "—"}</td>
                      <td className="subtotal">{played > 0 ? getTeamTotal(team) : "—"}</td>
                      <td className="subtotal" style={{ color: played > 0 ? toParColor(toPar) : T.label, fontSize: 14 }}>{played > 0 ? formatToPar(toPar) : "—"}</td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td colSpan={23} style={{ padding: 0, borderBottom: `1px solid ${T.sep}` }}>
                          <div style={{ padding: "14px 16px", background: "rgba(52,199,89,0.05)" }}>
                            <div className="section-label" style={{ color: T.green, marginBottom: 8 }}>Roster</div>
                            <div style={{ display: "flex", gap: "8px 24px", flexWrap: "wrap", marginBottom: 10 }}>
                              {team.players.map((p, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: T.font, fontSize: 14, color: "#000" }}>
                                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: i === team.scorerIndex ? T.greenAccent : "rgba(118,118,128,0.3)", flexShrink: 0 }} />
                                  {p}{i === 0 && <span style={{ fontSize: 11, color: T.green, fontWeight: 600 }}> · captain</span>}
                                </div>
                              ))}
                            </div>
                            {HOLES.some(h => notes[`${team.id}_${h.hole}`]) && (
                              <div>
                                <div className="section-label" style={{ color: T.green, marginBottom: 6 }}>Notes</div>
                                {HOLES.filter(h => notes[`${team.id}_${h.hole}`]).map(h => (
                                  <div key={h.hole} style={{ fontFamily: T.font, fontSize: 13, color: T.label, marginBottom: 3 }}>
                                    <span style={{ fontWeight: 600, color: "#000" }}>Hole {h.hole}:</span> {notes[`${team.id}_${h.hole}`]}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Skins ─────────────────────────────────────────────────────────────────────
function SkinsView({ teams, HOLES, getSkin, formatToPar }) {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const skins  = HOLES.map(h => ({ hole: h, skin: getSkin(h.hole) }));
  const wonSkins = skins.filter(({ skin }) => skin && !skin.tie && skin.team);
  const counts = {};
  teams.forEach(t => { counts[t.id] = { team: t, count: 0 }; });
  skins.forEach(({ skin }) => { if (skin && !skin.tie && skin.team) counts[skin.team.id].count++; });

  return (
    <div>
      <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4, color: "#fff" }}>Skins</div>
      <div style={{ fontFamily: T.font, fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>Resolves once all teams complete a hole.</div>

      {/* ── Top section: team skin counts, expandable ── */}
      {Object.values(counts).length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>Teams</div>
          <div style={{ display: "grid", gap: 8 }}>
            {Object.values(counts).sort((a,b) => b.count - a.count).map(({ team, count }) => {
              const isOpen = expandedTeam === team.id;
              return (
                <div key={team.id}>
                  <div className="glass" onClick={() => setExpandedTeam(isOpen ? null : team.id)}
                    style={{ borderRadius: isOpen ? "14px 14px 0 0" : 14, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {count > 0 && (
                        <div style={{ background: "linear-gradient(135deg,#FFD700,#FFA500)", borderRadius: 10, padding: "4px 12px", fontFamily: T.font, fontSize: 15, fontWeight: 800, color: "#5C3A00" }}>
                          {count} skin{count !== 1 ? "s" : ""}
                        </div>
                      )}
                      <div style={{ fontFamily: T.font, fontSize: 16, fontWeight: 700, color: "#000" }}>{team.name}</div>
                    </div>
                    <span style={{ color: T.label, fontSize: 11, fontFamily: T.font }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div style={{ background: "rgba(52,199,89,0.06)", border: "1px solid rgba(255,255,255,0.5)", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "12px 18px" }}>
                      <div style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: T.green, marginBottom: 8 }}>Roster</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
                        {team.players.map((p, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.font, fontSize: 14, color: "#000" }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: i === 0 ? T.greenAccent : "rgba(118,118,128,0.3)", flexShrink: 0 }} />
                            {p}{i === 0 && <span style={{ fontSize: 11, color: T.green, fontWeight: 600 }}> · captain</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Bottom section: hole-by-hole results with headers ── */}
      <div style={{ fontFamily: T.font, fontSize: 12, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>Results by Hole</div>
      <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        {/* Header row */}
        <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px", background: T.green, padding: "10px 16px", gap: 8 }}>
          {["Hole", "Team", "Score"].map(h => (
            <div key={h} style={{ fontFamily: T.font, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{h}</div>
          ))}
        </div>
        {/* Rows */}
        {skins.map(({ hole, skin }) => (
          <div key={hole.hole} style={{ display: "grid", gridTemplateColumns: "60px 1fr 80px", padding: "12px 16px", gap: 8, borderBottom: `1px solid ${T.sep}`, opacity: skin === null ? 0.45 : 1, alignItems: "center" }}>
            {/* Hole */}
            <div style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#000" }}>
              {hole.hole}
              <div style={{ fontSize: 11, color: T.label, fontWeight: 400 }}>Par {hole.par}</div>
            </div>
            {/* Team */}
            <div>
              {skin === null
                ? <span style={{ fontFamily: T.font, fontSize: 13, color: T.label }}>Pending</span>
                : skin.tie
                  ? <span style={{ fontFamily: T.font, fontSize: 13, color: T.amber, fontWeight: 600 }}>Tied — no winner</span>
                  : <span style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: "#000" }}>{skin.team.name}</span>}
            </div>
            {/* Score */}
            <div>
              {skin && !skin.tie && (
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#FFD700,#FFA500)", borderRadius: 8, padding: "3px 12px", fontFamily: T.font, fontSize: 14, fontWeight: 800, color: "#5C3A00", boxShadow: "0 1px 4px rgba(255,165,0,0.4)" }}>
                  {skin.score} ({formatToPar(skin.toPar)})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scorecard ─────────────────────────────────────────────────────────────────
function ScorecardView({ HOLES, frontPar, backPar, frontYds, backYds }) {
  const totalYds = frontYds + backYds;
  return (
    <div>
      <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", marginBottom: 4 }}>Scorecard</div>
      <div style={{ fontFamily: T.font, fontSize: 13, color: T.label, marginBottom: 20 }}>
        {COURSE.name} · White tees · Par 72 · {totalYds.toLocaleString()} yards · Rating {COURSE.rating} · Slope {COURSE.slope}
      </div>
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="lb-table">
            <thead>
              <tr>
                <th className="left">Hole</th>
                {HOLES.slice(0,9).map(h => <th key={h.hole}>{h.hole}</th>)}
                <th>Out</th>
                {HOLES.slice(9,18).map(h => <th key={h.hole}>{h.hole}</th>)}
                <th>In</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Par", h => h.par, frontPar, backPar, frontPar+backPar],
                ["Yards", h => h.yards, frontYds, backYds, totalYds],
                ["Hdcp", h => h.handicap, null, null, null],
              ].map(([label, fn, fTot, bTot, tot]) => (
                <tr key={label} style={{ background: label === "Yards" ? "rgba(28,61,42,0.03)" : label === "Hdcp" ? "rgba(28,61,42,0.02)" : "#fff" }}>
                  <td className="left" style={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: T.label }}>{label}</td>
                  {HOLES.slice(0,9).map(h => <td key={h.hole} style={{ fontFamily: T.font, fontSize: 13, color: "#000" }}>{fn(h)}</td>)}
                  <td style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, background: "rgba(28,61,42,0.06)" }}>{fTot ?? "—"}</td>
                  {HOLES.slice(9,18).map(h => <td key={h.hole} style={{ fontFamily: T.font, fontSize: 13, color: "#000" }}>{fn(h)}</td>)}
                  <td style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, background: "rgba(28,61,42,0.06)" }}>{bTot ?? "—"}</td>
                  <td style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, background: "rgba(28,61,42,0.06)" }}>{tot ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Login Card ────────────────────────────────────────────────────────────────
function LoginCard({ playerName, setPlayerName, adminPin, setAdminPin, loginError, setLoginError, handleLogin }) {
  const [userType, setUserType] = useState(null); // null | "player" | "captain" | "admin"

  const userTypes = [
    {
      key: "player",
      icon: "👀",
      label: "Player",
      desc: "View leaderboard, skins & message board",
    },
    {
      key: "captain",
      icon: "⛳",
      label: "Captain",
      desc: "Enter scores for your team + view everything",
    },
    {
      key: "admin",
      icon: "⚙️",
      label: "Admin",
      desc: "Full access — manage teams, scores & settings",
    },
  ];

  const handleContinue = () => {
    setLoginError("");
    if (!userType) { setLoginError("Please select who you are."); return; }
    handleLogin(userType);
  };

  return (
    <div className="glass" style={{ borderRadius: 20, padding: "24px 22px" }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", fontFamily: T.font, marginBottom: 4 }}>Welcome</div>
      <div style={{ fontSize: 15, color: T.label, fontFamily: T.font, marginBottom: 20 }}>Select who you are to get started.</div>

      {/* User type selector */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {userTypes.map(({ key, icon, label, desc }) => (
          <div key={key} onClick={() => { setUserType(key); setLoginError(""); }}
            style={{ background: userType === key ? T.green : "rgba(28,61,42,0.05)", border: `2px solid ${userType === key ? T.green : "rgba(28,61,42,0.12)"}`, borderRadius: 14, padding: "12px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: userType === key ? "#fff" : T.green, marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: userType === key ? "rgba(255,255,255,0.8)" : T.label, lineHeight: 1.3 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Name field — shown for player and captain */}
      {(userType === "player" || userType === "captain") && (
        <div style={{ marginBottom: 14 }}>
          <div className="section-label">{userType === "captain" ? "Captain name" : "Your name"}</div>
          <input className="jvi-input" value={playerName} onChange={e => setPlayerName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleContinue()}
            placeholder="Enter your full name" />
        </div>
      )}

      {/* PIN field — shown for admin only */}
      {userType === "admin" && (
        <div style={{ marginBottom: 14 }}>
          <div className="section-label">Admin PIN</div>
          <input className="jvi-input" type="password" value={adminPin} onChange={e => setAdminPin(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleContinue()} placeholder="••••" />
        </div>
      )}

      {loginError && (
        <div style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: 12, padding: "12px 14px", color: T.red, fontSize: 14, fontFamily: T.font, marginBottom: 14 }}>
          {loginError}
        </div>
      )}

      <button className="btn-primary" onClick={handleContinue} disabled={!userType}
        style={{ opacity: userType ? 1 : 0.4 }}>
        {userType === "player" ? "View Outing" : userType === "captain" ? "Sign In as Captain" : userType === "admin" ? "Sign In as Admin" : "Continue"}
      </button>
    </div>
  );
}

// ── Message Board ─────────────────────────────────────────────────────────────
function MessageBoard({ messages, setMessages, currentUser, onRefresh }) {
  const [text, setText] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const bottomRef = React.useRef(null);

  // Pull fresh messages from Firebase whenever the board is opened
  React.useEffect(() => {
    if (onRefresh) onRefresh();
  }, []);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const doRefresh = async () => {
    setRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const msg = { id: Date.now(), author: currentUser?.name || "Guest", text: t, ts: Date.now() };
    setMessages(prev => [...prev, msg]);
    setText("");
  };

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isMine = (msg) => msg.author === currentUser?.name;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 400 }}>
      <div style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, letterSpacing: "-0.4px", color: "#fff", marginBottom: 4 }}>Message Board</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontFamily: T.font, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Chat with everyone on the outing</div>
        <button onClick={doRefresh} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: T.font, fontSize: 13, fontWeight: 500 }}>
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontFamily: T.font, fontSize: 14, padding: "40px 0" }}>
            No messages yet. Say something! 👋
          </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isMine(msg) ? "flex-end" : "flex-start", marginBottom: 10 }}>
            {!isMine(msg) && (
              <div style={{ fontFamily: T.font, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 3, paddingLeft: 4 }}>{msg.author}</div>
            )}
            <div style={{
              background: isMine(msg) ? "#DCF0FF" : "#ffffff",
              color: "#000",
              border: isMine(msg) ? "1.5px solid rgba(0,122,255,0.25)" : "1.5px solid rgba(118,118,128,0.15)",
              borderRadius: isMine(msg) ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "10px 14px",
              maxWidth: "78%",
              fontFamily: T.font, fontSize: 15,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {msg.text}
            </div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 3, paddingLeft: 4, paddingRight: 4 }}>{formatTime(msg.ts)}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="msg-input-row" style={{ borderRadius: 14, marginTop: 12 }}>
        <input className="msg-input" value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Type a message…" />
        <button className="msg-send" onClick={send}>↑</button>
      </div>
    </div>
  );
}
