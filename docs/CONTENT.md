# CONTENT.md
### Real Copy & Data — Portfolio Site
No fabricated stats or claims anywhere on the site — anything not yet finalized is marked `[PENDING]` per `AGENTS.md` §6, not filled with a plausible guess.

**Role of this document, going forward:** this file records the *reasoning and decisions* behind the content (why a tool is excluded, why a stat is framed a certain way, positioning calls). The actual *live values* the site reads at runtime — the ones you'll update routinely as you learn new skills, ship projects, and progress on certifications — live in **`data/content.json`**. Update the JSON for routine changes; come back and update this document only when an underlying *decision* changes, not for every data tweak.

---

## 1. Identity & Hero Text

- Large stylized hero display: **WIZARD**
- Smaller subtitle beneath it: **Piyush Kumawat**
- Real name used everywhere else — About, Contact, footer, resume link
- Hero title/role: **Red Teamer in Training**

---

## 2. Bio (About Page)

```
Final-year Computer Science & Engineering student at Parul University,
focused on offensive security and penetration testing. I build full-stack
applications from the ground up — then apply that knowledge to understand
how real systems can be attacked.

My approach is hands-on: I read penetration testing research and security
blogs, then implement what I learn directly into my own tools. Currently
sharpening my fundamentals through HackTheBox and TryHackMe labs, working
toward the HTB CPTS certification.

I'm driven by the process of taking something apart to understand it
completely — then figuring out exactly where it breaks.
```

---

## 3. Education

```
Bachelor of Technology — Computer Science & Engineering
Parul University, Vadodara, India
2023 – 2027
```

Confirmed consistent across resume, GitHub, LinkedIn, and this site — no contradictions.

No CGPA or honors listed — deliberate, below the threshold worth publishing.

---

## 4. Certifications

**Completed:**

| Certification | Issuer | Date |
|---|---|---|
| Oracle Cloud Infrastructure Foundations Associate | Oracle | 2024 |
| Oracle Certified Professional: Java SE 17 Developer | Oracle | 2024 |
| Oracle APEX Cloud Developer Certified Professional | Oracle | 2024 |
| Computer Networks and Internet Protocol | NPTEL — IIT Kharagpur | Completed |

**In Progress:**
```
HackTheBox CPTS (Certified Penetration Testing Specialist)
Status: Learning path — exam not yet purchased
Target: Ongoing (no specific date)
```

BSCP intentionally excluded — no exam purchased, only CPTS tracked publicly right now.

---

## 5. Projects

**Approach:** No project is presented as a finished, polished case study. All three are shown as work-in-progress with a clear in-progress label — honest framing over inflated claims.

### 1. Password Analyzer *(in progress)*
```
CLI tool for deep password strength analysis using mathematical entropy
scoring, HaveIBeenPwned API breach lookup (800M+ records), RockYou
wordlist matching (14M+ passwords), and mutation detection — built to
understand real credential attack vectors, not just label passwords
"weak" or "strong."
```
**Stack:** Python • HaveIBeenPwned API • RockYou Wordlist
**GitHub:** `[PENDING]`
**Live:** — (CLI tool, no live demo)

### 2. Port Scanner *(in progress)*
```
Scans a target IP across a defined port range, identifying open ports
and their associated service names. Built from scratch to understand
how recon tooling works internally. Supports both CLI and web UI modes.
```
**Stack:** Python
**GitHub:** `[PENDING]`
**Live:** `[PENDING]`

### 3. Recon Toolkit *(in progress)*
```
Currently building an automated reconnaissance toolkit — chaining
subdomain enumeration, DNS lookups, and service detection into a single
workflow. In active development.
```
**Stack:** Python
**GitHub:** `[PENDING — add once pushed]`

**Excluded from portfolio (confirmed decision):**
- Seacoin B2B website — resume only, not the public portfolio (client dev work, not a security project)
- Policy Checker — college project, kept off the public site by choice

---

## 6. HTB / TryHackMe Stats

**HackTheBox** — no numbers displayed; framed as active learning, not a scored metric.
```
Currently building HTB skills toward the CPTS certification path.
```
- Profile: `https://profile.hackthebox.com/profile/019ef552-003a-723c-8450-4897c503a6af`
- Handle: `Wizxrd1803`
- Toolstack: tcpdump, Netcat, hashcat, John, Wireshark
- Languages: Python, SQL, Bash

**TryHackMe**
- Profile: `https://tryhackme.com/p/amritkumawat1803`
- Rank: **Top 7%**
- Streak: **50+ day streak**
- Rooms completed: **70+**
- Badges: 10 earned (not used in headline stats — see note below)

**Labs page stat line:**
```
Top 7% on TryHackMe • 50+ Day Streak • 70+ Rooms Completed
```

**Badge count note:** left out of headline stats deliberately — rank, streak, and room count carry the story better on their own. Fine to show badge count further down the Labs page in a detailed stats table if wanted later.

### Hero Arc Stat Mapping (RPM / KMH hover-reveal, per `COMPONENTS.md` §5.1)

| Arc | Visible label | Hover-reveal | Fill level |
|---|---|---|---|
| Left | RPM | `TRYHACKME — TOP 7%` | ~93% (better than 93% of users — real, defensible number) |
| Right | KMH | `CPTS — IN PROGRESS` (qualitative status, not a percentage) | ~45–55%, illustrative only — not derived from any specific stat, simply reads as "in motion" |

---

## 7. Skills / Tags (Mousetrail Pool + About Page Tags)

**Confirmed, safe to display everywhere (About tags, hero mousetrail pool):**

```
Python, JavaScript, Java, Bash, SQL, Node.js, Express.js, React, MongoDB,
Oracle DB, EJS, JWT, Multer, Cloudinary, Tailwind CSS, Kali Linux, Linux,
Git, GitHub, Cloudflare, Render, VS Code, Vim, IntelliJ, tcpdump, Netcat,
hashcat, John the Ripper, Wireshark
```

**Explicitly excluded — not confirmed as hands-on, do not display anywhere on the site:**

| Tool | Why excluded |
|---|---|
| Burp Suite | Not in HTB toolstack — learning via THM/CPTS path, not hands-on yet |
| Nmap | Same — not confirmed as actually used |
| Metasploit | Same |
| BloodHound | Same |

If any of these become genuinely hands-on later (confirmable in an interview), add them back — not before.

---

## 8. Contact Page

**Top statement (final):**
```
Learning offensive security by building and breaking things — currently
deep in web app and Active Directory attack paths. Open to internships
where I can keep learning hands-on.
```

**Links:**
- GitHub: `github.com/Wizard1803`
- LinkedIn: `linkedin.com/in/kumawat-piyush`
- Email: `amritkumawat1803@gmail.com`

**Availability badge (final):**
```
RED TEAMER IN TRAINING — OPEN TO 2026 INTERNSHIPS
```

---

## 9. Assets Checklist

| Asset | Status |
|---|---|
| `resume.pdf` | `[PENDING — arriving via project folder]` |
| Headshot/photo | Not used — site is text/graphics only, no photo needed |
| Favicon | `[PENDING — arriving via project folder]` |

---

## 10. Open Items Before This Goes Live

1. GitHub repo links — Password Analyzer, Port Scanner, Recon Toolkit (add whenever pushed)
2. Confirm `resume.pdf` and favicon are placed in `/assets/` once delivered

Everything else in this document is final and locked.

---

## 11. Home Stats and Interface Copy

The home stats strip reuses confirmed TryHackMe facts only: **Top 7%**, **50+ day streak**, and **70+ rooms completed**. These values are stored under `home.stats` in `data/content.json` as numeric targets with display prefixes and suffixes, so the counter animation does not invent claims.

Home status, telemetry, recon output, and destination CTA text are interface copy rather than biographical claims. They are also stored under `home` in `data/content.json` so the site keeps its runtime-content architecture.
