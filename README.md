# 💜 Bias Battle ⚔️

A fun and interactive K-pop showdown game where users choose their **Ultimate Bias** through dramatic elimination rounds! Built with love using HTML, CSS, and JavaScript.

---

## 🌟 Features

- 🎯 Displays 2 unique idol cards per round
- ✨ Click one to keep—opponent is replaced with a new random challenger
- 🔢 Choose number of rounds before starting (10, 15, 20, 25, All)
- 📊 Shows how many idols are available from the dataset
- 🕒 Live round counter (`Round X of Y`)
- 👑 Reveals your final champion as the **Ultimate Bias**

---

## 🛠 Tech Stack

- HTML
- CSS
- JavaScript
- JSON (`kpopnet.json` – contains idol & group data)

---

## 💻 Run Locally

### ✅ Requirements

- Any modern browser (Chrome, Firefox, Edge)
- Python 3 (recommended for running a local web server)
- A project folder containing:

/bias-battle/ ├── index.html ├── styles.css ├── script.js ├── kpopnet.json └── (optional) idol image files like nayeon.jpg, jimin.jpg...


---

### 🚀 Method 1: Run via Python Web Server (Recommended)
run:
python3 -m http.server 8000
open:
http://localhost:8000
