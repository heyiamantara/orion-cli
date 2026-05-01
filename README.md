<div align="center">

<img src="https://img.shields.io/badge/version-1.2.4-blue?style=for-the-badge" alt="Version 1.2.4" />
<img src="https://img.shields.io/badge/status-stable-brightgreen?style=for-the-badge" alt="Stable" />
<img src="https://img.shields.io/badge/node-%3E%3D18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 18+" />

# 🚀 Orion

**A command-line AI agent built for developers.**

Orion brings Google Gemini directly into your terminal with conversational AI, tool-assisted execution, autonomous code generation, and OAuth-secured authentication, all from your shell.

[Installation](#installation) | [Authentication](#authentication) | [Commands](#commands) | [Execution Modes](#execution-modes) | [Tools](#tool-configuration) | [Contributing](#contributing)

---

</div>

## ✨ What Orion Does

| Feature | Description |
|---|---|
| 💬 **AI Chat** | Stream responses from Google Gemini in your terminal with multi-turn conversations |
| 🔍 **Web Search** | Real-time Google Search integration for up-to-date answers |
| 💻 **App Generation** | Scaffold complete, production-ready applications from a single natural language prompt |
| 🔧 **Tool Calling** | Execute code, search the web, and analyze URLs autonomously |
| 🔐 **OAuth Auth** | Secure device authorization flow, no credentials typed in the terminal |
| 💾 **Conversation History** | Persistent conversation IDs backed by PostgreSQL with Prisma ORM |
| 🤖 **Autonomous Agent** | Deep-reasoning agentic mode that plans and executes multi-step engineering tasks |
| 🎨 **Beautiful CLI** | Modern terminal UI with colors, boxen layouts, and clack prompts |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Language** | Node.js (JavaScript, ESM) |
| **CLI Framework** | Commander.js |
| **AI Model** | Google Gemini via AI SDK |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | OAuth 2.0 Device Authorization Grant |
| **Terminal UI** | Chalk · Boxen · Clack Prompts |
| **Validation** | Zod |
| **Tools Runtime** | AI SDK by Vercel (`@ai-sdk/google` ≥ 2.0) |

---

## 📦 Installation

Orion is distributed as a global npm package. **Node.js 18 or later is required.**

```bash
npm install -g orion-ai
```

Once installed, the `orion` binary is available globally. Verify your installation:

```bash
~/workspace ❯ orion --version
1.2.4
```

> [!NOTE]
> On some systems, global npm installs require elevated permissions. If you encounter an `EACCES` error, either run the command with `sudo` or configure a user-level npm prefix to avoid permission issues.
>
> ```bash
> # Option A: Use sudo (quick fix)
> sudo npm install -g orion-ai
>
> # Option B: Configure npm prefix (recommended)
> mkdir ~/.npm-global
> npm config set prefix '~/.npm-global'
> export PATH=~/.npm-global/bin:$PATH
> npm install -g orion-ai
> ```

---

## 🔐 Authentication

Orion uses the **OAuth 2.0 Device Authorization Grant** to authenticate your terminal session against the Orion cloud backend. This flow does not require you to enter credentials directly in the terminal.

### Step-by-Step Login

**Step 1: Initiate Login**

Run the login command from any directory. Orion contacts the authorization server and retrieves a device code.

```bash
orion login
```

**Step 2: Authorize in Browser**

The terminal displays a verification URL and a short user code. Open the URL in your browser (Orion can open it automatically) and enter the code to authorize the device. The CLI polls the server at a configurable interval and resumes automatically once authorization is confirmed.

**Step 3: Token Storage**

Upon successful authorization, the access token, refresh token, token type, and expiry timestamp are written to `~/.orion/token.json`. This file is validated on every subsequent command. Tokens within **5 minutes of expiry** are treated as expired.

### Auth Commands Reference

| Command | Description |
|---|---|
| `orion login` | Initiates the device authorization flow and stores the resulting token locally |
| `orion logout` | Clears the stored token from `~/.orion/token.json` and ends the current session |
| `orion whoami` | Fetches and displays the authenticated user's name, email, and account ID |

---

## 📟 Commands

All Orion commands are invoked via the `orion` binary. Run `orion --help` at any time to list available commands and options.

### `orion wakeup` — Primary Entry Point

Authenticates the session, fetches the current user profile, and presents an interactive mode selection prompt. This is the main command to start an AI session.

```
~/workspace ❯ orion wakeup

  Fetching User Information... Done
  Welcome back, Developer!

  Select an option: Chat / Tool Calling / Agentic Mode
```

---

### `orion login [options]`

Starts the device authorization flow.

```bash
orion login [--server-url <url>] [--client-id <id>]
```

| Option | Description |
|---|---|
| `--server-url <url>` | Override the default backend server URL (useful for self-hosted instances) |
| `--client-id <id>` | Override the OAuth client ID |

---

### `orion logout`

Prompts for confirmation and removes the locally stored token file, effectively ending the authenticated session.

```bash
orion logout
```

---

### `orion whoami`

Validates the current token and prints the authenticated user's display name, email address, and unique account ID. Exits with an error if the session is expired or not found.

```bash
orion whoami
```

---

## ⚡ Execution Modes

After running `orion wakeup`, you are presented with three execution modes via an interactive prompt. Each mode is designed for a different class of task.

---

### 💬 Chat Mode

A standard multi-turn conversational interface. Responses are streamed **token-by-token** from the Orion backend and rendered with Markdown formatting directly in the terminal. Conversation state is maintained via a server-side conversation ID, allowing context to persist across multiple exchanges within the same session.

**Best suited for:** code explanation, debugging assistance, documentation lookup, and general engineering questions that do not require system interaction.

```
Type exit or press Ctrl+C to end the session.
```

---

### 🔧 Tool Calling Mode

Extends the conversational interface with access to registered system tools. In this mode, the model can invoke tools mid-response to retrieve real-time information or execute code before formulating its final answer.

**Available tools:**
- **Google Search**: live web results
- **Code Execution**: sandboxed Python computations
- **URL Context**: analysis of up to 20 URLs per request

**Best suited for:** tasks requiring up-to-date information, numerical computation, or analysis of external resources.

---

### 🤖 Agentic Mode

A deep-reasoning mode where Orion autonomously **plans and executes multi-step tasks** from a single high-level instruction. The agent uses structured output generation to scaffold complete applications, including all source files, configuration, and setup commands, written directly to your working directory.

The generation pipeline uses a **Zod-validated schema** to ensure every output includes:
- 📁 A folder name
- 🌲 A complete file tree
- 📄 Full file contents (no stubs or placeholders)
- ⚙️ An ordered list of setup commands

**Best suited for:** generating entire applications, bootstrapping new projects, or automating complex multi-file changes from a single description.

---

## 🧰 Tool Configuration

Orion's tool system is built on top of the **AI SDK's tool interface**, backed by Google Generative AI's native tool capabilities. Tools are registered in the tool configuration and resolved lazily at runtime to avoid initialization errors.

| Tool ID | Name | Description |
|---|---|---|
| `google_search` | Google Search | Retrieves live search results from Google. Useful for current events, documentation, and real-time technical references. |
| `code_execution` | Code Execution | Generates and executes Python code in a sandboxed environment. Suitable for calculations, data processing, and verifiable computations. |
| `url_context` | URL Context | Fetches and analyzes the content of up to 20 URLs per request. Useful for summarizing documentation pages or extracting structured data from web resources. |

> [!NOTE]
> All tools are **disabled by default**. They are enabled programmatically per session in Tool Calling Mode. Requires `@ai-sdk/google` version **2.0 or later**.

---

## 📁 Local Configuration

Orion stores all local state in the `~/.orion/` directory in your home folder. This directory is created automatically on first use.

```
~/.orion/
├── token.json      # OAuth tokens and session metadata
└── config.json     # User preferences and runtime settings
```

| File | Purpose |
|---|---|
| `~/.orion/token.json` | Stores the OAuth access token, refresh token, token type, expiry timestamp, and creation date. Managed automatically by `login` and `logout`. |
| `~/.orion/config.json` | General key-value configuration store for user preferences and runtime settings. Read and written via the internal config API. |

---

## 🏗️ Project Structure

```
orion/
├── server/
│   └── src/
│       ├── cli/
│       │   ├── main.js                    # CLI entry point, all commands registered here
│       │   └── commands/
│       │       └── auth/
│       │           ├── login.js           # Device authorization flow & token storage
│       │           ├── logout.js          # Token removal
│       │           └── whoami.js          # Session validation & user info
│       └── config/
│           └── tool.config.js             # Tool registry with lazy getTool() factories
├── package.json
└── README.md
```

---

## 🤝 Contributing

Orion is open source. Contributions, bug reports, and feature requests are welcome via the [project's GitHub repository](https://github.com/heyiamantara/orion-cli).

Before submitting a pull request, ensure the following guidelines are met:

- **New CLI commands** must be registered in `server/src/cli/main.js` via `program.addCommand()`.
- **Authentication logic** must follow the existing token storage pattern in `server/src/cli/commands/auth/login.js`.
- **New tools** must be registered in `server/src/config/tool.config.js` with a unique `id`, `name`, and lazy `getTool()` factory function.
- **Code style** must follow the existing ESM module format with named exports.
- All changes should be tested against the existing tool calling and agentic pipelines before submission.

```bash
# Clone the repository
git clone https://github.com/heyiamantara/orion-cli.git
cd orion

# Install dependencies
npm install

# Run in development
npm run dev
```

---

<div align="center">

Built with ❤️ for developers who live in the terminal.

**[⬆ Back to top](#-orion)**

</div>
