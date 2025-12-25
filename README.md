# Trello Board Clone 📋

A fully functional, responsive, single-page application (SPA) that mimics the core features of a project management board like Trello. Built with React and utilizing the modern, actively maintained `@hello-pangea/dnd` library for seamless drag-and-drop interactions.

## 🚀 Features

* **Dynamic Drag-and-Drop:** Seamlessly drag tasks to reorder them within a list or move them across different lists (columns).
* **State Management:** Efficient and immutable state updates to handle card movement across the entire board.
* **Component-Based Architecture:** Clean separation of concerns with dedicated components for the Board, List, and Task Cards.
* **Modern React Hooks:** Leverages `useState` for local component data and state management.

## 🛠️ Technology Stack

* **Core:** [React](https://reactjs.org/) (JavaScript library for building user interfaces)
* **Build Tool:** [Create React App (CRA)](https://create-react-app.dev/)
* **Drag & Drop:** [`@hello-pangea/dnd`](https://www.npmjs.com/package/@hello-pangea/dnd) (Modern, maintained fork of `react-beautiful-dnd`)
* **Language:** JavaScript (ES6+)
* **Styling:** Pure CSS (using inline styles and dedicated CSS files)

## 📦 Installation and Setup

Follow these steps to get a local copy of the project up and running.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your system.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd trello-clone-cra