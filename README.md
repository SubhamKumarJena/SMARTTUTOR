<<<<<<< HEAD
# SmartTutor — Premium Tutoring & Coaching Website

![SmartTutor Banner](assets/images/hero-illustration.jpg)

> **Portfolio Demo Project** — Built by a first-year BTech CSE/AI-ML student as a professional freelancing showcase.

---

## 📌 Project Overview

**SmartTutor** is a fully static, single-page tutoring and coaching website. It is designed to be used by individual tutors or small coaching centres who want a professional online presence without needing to write complex backend code.

This project demonstrates:
- Modern, responsive HTML/CSS/JS web development
- Accessible and semantic HTML5
- Premium UI/UX design with light and dark modes
- Interactive features: course filtering, search, modal popups, FAQ accordion
- Client-side form validation (with a clearly labelled demo submission mode)
- A GitHub-ready project structure deployable to Netlify or Vercel

---

## ✨ Features

| Feature | Status |
|---|---|
| Responsive navbar with mobile menu | ✅ |
| Light / Dark theme toggle (persists in localStorage) | ✅ |
| Hero section with animated statistics | ✅ |
| Course listing with category filter + live search | ✅ |
| Course detail modal (accessible, keyboard-trappable) | ✅ |
| Why Choose Us — feature cards | ✅ |
| How It Works — four-step process | ✅ |
| About the Tutor — profile section | ✅ |
| Testimonials (clearly labelled as demo/sample) | ✅ |
| FAQ accordion (keyboard + ARIA accessible) | ✅ |
| Contact & demo booking form with full validation | ✅ |
| Demo form mode (no real email sent — clearly noted) | ✅ |
| WhatsApp contact button (configurable) | ✅ |
| Social media links (configurable, hidden if empty) | ✅ |
| Scroll animations (respects prefers-reduced-motion) | ✅ |
| Back-to-top button | ✅ |
| Footer with dynamic copyright year | ✅ |
| SEO meta tags + Open Graph | ✅ |
| Inline SVG favicon | ✅ |

---

## 🛠 Technology Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | CSS3 (Flexbox, Grid, custom properties, animations) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter |
| Persistence | localStorage (theme preference only) |
| Backend | None (static) — form is in demo mode |
| Deployment | Netlify / Vercel (static) |

---

## 📁 Project Structure

```
smarttutor/
├── index.html              ← Main page (all sections in one file)
├── css/
│   └── style.css           ← All styles: tokens, layout, components, dark mode, responsive
├── js/
│   └── script.js           ← All JavaScript: courses, modal, FAQ, form, theme, etc.
├── assets/
│   └── images/
│       ├── hero-illustration.jpg   ← Hero section illustration
│       └── tutor-avatar.jpg        ← Tutor profile photo
├── README.md               ← This file
└── .gitignore              ← Git ignore rules
```

---

## 🚀 How to Run Locally

This is a **100% static website**. No server, Node, or Python is needed.

### Option A — Open directly in the browser (simplest)
1. Download or clone this project.
2. Double-click `index.html`.
3. The website opens in your default browser.

> ⚠️ Some browsers restrict loading local files. If images or fonts do not appear, use Option B.

### Option B — Use VS Code Live Server (recommended for development)
1. Install [VS Code](https://code.visualstudio.com/).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Open the `SMARTTUTOR` folder in VS Code.
4. Right-click `index.html` → **Open with Live Server**.
5. Your browser opens at `http://127.0.0.1:5500/`.

### Option C — Use Python's built-in HTTP server
```bash
# Navigate into the project folder first
cd path/to/SMARTTUTOR

# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

---

## ⚙️ Configuration — Customise Before Publishing

All configurable values are at the top of **`js/script.js`** in the `CONFIG` object.

### 1. Tutor Name and Contact Details
```js
const CONFIG = {
  tutorName:  "Your Real Name",
  tutorTitle: "Your Specialisation",
  tutorEmail: "yourrealemail@domain.com",
  // ...
};
```
Also update these locations in `index.html`:
- Tutor name and title inside the `#about` section
- Contact details inside the `#contact` section
- Footer contact details

### 2. WhatsApp Contact Button
```js
// Set to E.164 format — country code + number, digits only
// Example: India +91 98765 43210 → "919876543210"
whatsappNumber: "919876543210",

// Customise the pre-filled message
whatsappMessage: "Hi! I'd like to enquire about your tutoring services.",
```
Leave `whatsappNumber` as `""` to hide the button.

### 3. Social Media Links
```js
social: {
  instagram: "https://instagram.com/youraccount",
  linkedin:  "https://linkedin.com/in/yourprofile",
  youtube:   "",  // leave empty to hide
  twitter:   "",  // leave empty to hide
},
```

### 4. Courses
Edit the `courseData` array in `js/script.js`. Each course object includes:
- `title`, `icon`, `description`, `category`, `difficulty`, `duration`, `mode`
- `topics` (array) — shown in the modal
- `fullDescription` — longer text shown in the modal

### 5. Testimonials
Edit the `testimonialData` array in `js/script.js`.
> **Important:** Only add real testimonials with explicit written permission from actual students.

---

## 📋 How to Test the Contact Form

### Demo Mode (default)
1. Open the website.
2. Fill in all required form fields.
3. Click **Send Enquiry**.
4. A green success message appears: "Demo submission received!"
5. **No email is sent** — this is intentional in demo mode.

### Connecting a Real Form Service (live use)
Choose one of these approaches:

#### Option 1 — Formspree (easiest, no backend needed)
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — copy the endpoint URL (e.g. `https://formspree.io/f/abcd1234`).
3. In `js/script.js`, set:
   ```js
   formMode:     "live",
   formEndpoint: "https://formspree.io/f/abcd1234",
   ```
4. Done — form submissions go directly to your email.

#### Option 2 — EmailJS (no backend needed)
1. Create an account at [emailjs.com](https://www.emailjs.com/).
2. Follow their docs to add the EmailJS SDK and send emails from the form's submit handler.

#### Option 3 — Flask Backend (full control)
See the **Flask Backend** section below.

---

## 🐍 Optional Flask Backend

If you need server-side processing (e.g. saving to a database, sending real emails with validation):

### Setup
```bash
# Install Python 3.10+ and create a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate      # Mac/Linux

# Install Flask
pip install Flask python-dotenv

# Create a .env file (do NOT commit this)
echo "SECRET_KEY=your_secret_key_here" > .env
echo "MAIL_USERNAME=your@email.com"   >> .env
echo "MAIL_PASSWORD=yourpassword"     >> .env
```

### Minimal Flask app structure
```
smarttutor-flask/
├── app.py
├── templates/
│   └── index.html     ← Move your index.html here
├── static/
│   ├── css/style.css
│   └── js/script.js
├── .env               ← Secrets (NEVER commit this)
├── requirements.txt
└── .gitignore
```

Keep secrets in `.env` — never hard-code them in Python or JavaScript files.

---

## 🌐 How to Deploy (Static — Free Hosting)

### Netlify (recommended)
1. Go to [netlify.com](https://netlify.com) and sign up free.
2. Drag and drop the `SMARTTUTOR` folder onto the Netlify dashboard.
3. Your site goes live instantly at a URL like `https://amazing-name-123.netlify.app`.
4. Optional: connect a custom domain in Netlify settings.

### Vercel
1. Go to [vercel.com](https://vercel.com) and sign up free.
2. Click **Add New → Project**.
3. Import your GitHub repository (see next section).
4. Vercel auto-detects it as a static site — click **Deploy**.

---

## 📂 How to Publish to GitHub

```bash
# 1. Initialise git (if not already done)
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: SmartTutor website"

# 4. Create a new repository on github.com (do not initialise it there)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/smarttutor.git
git branch -M main
git push -u origin main
```

After pushing, you can connect the GitHub repository to Netlify or Vercel for automatic deployments on every push.

---

## ⚠️ Known Limitations

1. **Form does not send real emails** in demo mode — connect Formspree or EmailJS for live use.
2. **WhatsApp button is hidden by default** — set `CONFIG.whatsappNumber` to enable it.
3. **Social links are not configured** — add real URLs in `CONFIG.social` before publishing.
4. **Tutor profile is fictional** — replace all demo content with real, verified information.
5. **Statistics in the hero section are demo figures** — replace with real, verified numbers.
6. **Testimonials are sample content** — only add real reviews with student permission.
7. No analytics tracking is included — add Google Analytics or Plausible if needed.
8. No backend — suitable for a single tutor or small operation.

---

## 🔮 Future Improvements

- [ ] Connect real form service (Formspree or EmailJS)
- [ ] Add a blog/resources section
- [ ] Add a proper pricing/packages section
- [ ] Integrate Google Calendar for live session booking
- [ ] Add a student login portal (requires backend)
- [ ] Progressive Web App (PWA) support — offline access
- [ ] Analytics integration
- [ ] Multi-language support

---

## 📄 Licence

This project is created for personal portfolio and educational purposes. Before using it commercially, ensure all demo/fictional content (tutor profile, testimonials, statistics, contact details) is replaced with real, accurate information. 

---

*Built with ❤️ as a first freelancing portfolio project by a BTech CSE/AI-ML student.*
=======
# SMARTTUTOR
>>>>>>> 522ccef9b18e7927b13aa720bf44e6913bfe9c2c
