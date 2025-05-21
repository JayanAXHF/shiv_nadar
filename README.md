# Shiv Nadar Interschool Chatbot

Welcome to the repository for our Interschool Chatbot project, developed for the Shiv Nadar University Interschool event! This project is a collaborative effort by students from Lotus Valley International School.

## 🏆 About the Project

This repository contains the code and resources for a chatbot designed to assist participants, organizers, and visitors during the Shiv Nadar University Interschool event. The chatbot provides information, answers questions, and helps users navigate event-related queries efficiently.

## 👨‍💻 Team (Lotus Valley International School)

This chatbot was created by:

- [Rachit Rustagi](https://github.com/QuantumCosmoCoder)
- [Aarav Khandpur](https://github.com/DetectiveAK)
- [Jayan Sunil](https://github.com/JayanAXHF)

We are proud to represent Lotus Valley International School in this interschool challenge!

## 📝 Features

- Answers frequently asked questions about the event
- Provides schedules, venue details, and real-time updates
- Offers support for participants and organizers
- Easy to extend with new features and information

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JayanAXHF/shiv-nadar.git
   cd shiv-nadar
   ```
2. **Install dependencies:**
    The project uses `uv` package manager for the backend. Run
    ```bash
    uv sync
    ```
    in the backend directory to install the dependencies.

    You can install the frontend dependencies by running
    ```bash
    pnpm i
    ```
    in the frontend directory.
3. **Run the backend:**
Running the backend is a quirky process. Starting from the root directory, run
```bash
cd backend/llm
fastapi dev ../main.py
```
Ensure that the `llm` folder contains the trained AI model. Please update your `llm/main.py` file with the path to your model.

4. **Run the frontend:**
Run the frontend by running
```bash
pnpm dev
```
in the frontend directory. You can spin up the database console by running
```bash
pnpm run db:studio
```

## 📂 Structure

```
.
├── backend/                   # Python backend for LLM logic and datasets
│   ├── llm/                   # Core LLM scripts, notebooks, data files
│   ├── logs/                  # TensorBoard logs
│   ├── results/               # Model checkpoints
│   ├── testing/               # Test scripts and data
│   ├── main.py                # Backend entry point
│   └── pyproject.toml         # Backend dependencies
│
├── front_end/                # Next.js frontend app
│   ├── src/                  # App pages, components, styles
│   ├── public/               # Static assets (favicon, etc.)
│   ├── package.json          # Frontend dependencies
│   └── drizzle.config.ts     # DB config (Drizzle ORM)
│
├── summary/                  # LaTeX report with flowcharts & PDF output
│   └── src/                  # Main .tex, custom class files, .bib
│
├── README.md                 # Project overview
└── indent.log                # Log file (optional/debug)
```


## 🤝 Contributing

We welcome feedback and suggestions! Please open an issue or submit a pull request if you have ideas for improvement.

## 📄 License

This project is released under the MIT License. See [LICENSE](LICENSE) for more details.

---

*Made with 💡 by students of Lotus Valley International School for the Shiv Nadar Interschool Event*
