# StockFlow – Inventory Items Manager

StockFlow is a production-quality full-stack Inventory Items Manager designed for tracking basic inventory. It features a modern, clean, and professional "SaaS dashboard" UI built with React, Vite, and Tailwind CSS, powered by a robust ASP.NET Core Web API backend.

## 🚀 Features

- **Inventory Dashboard**: View all items in a beautifully designed, responsive table.
- **Stock Status Badges**: Automatically computed statuses based on quantity:
  - **Red Badge (Out of Stock)**: Quantity = 0
  - **Yellow Badge (Low Stock)**: Quantity ≤ 10
  - **Green Badge (In Stock)**: Quantity > 10
- **Add Inventory Item**: A clean form with real-time validation to seamlessly add new items to your stock.
- **Modern UI/UX**: Professional layout, smooth hover states, custom scrollbars, and aesthetic typography, tailored to impress.

## 🛠 Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (Icons)

**Backend:**
- ASP.NET Core Web API (.NET 8)
- In-Memory Data Storage
- Swagger / OpenAPI

## 📂 Folder Structure

```text
stockflow/
├── backend/
│   ├── Controllers/
│   │   └── ItemsController.cs     # API Endpoints (GET, POST)
│   ├── Models/
│   │   └── InventoryItem.cs       # Data Model & Status Logic
│   ├── Properties/
│   │   └── launchSettings.json    # Local environment config
│   ├── Program.cs                 # API Configuration & CORS setup
│   └── StockFlow.Api.csproj       # .NET Project file
│
└── frontend/
    ├── src/
    │   ├── api.js                 # Axios API configuration
    │   ├── App.jsx                # Main Layout and State
    │   ├── index.css              # Tailwind Base & Custom Styles
    │   ├── main.jsx               # React Entry
    │   └── components/
    │       ├── AddItemForm.jsx    # Add Item form component
    │       ├── InventoryTable.jsx # Items display table
    │       └── StockStatusBadge.jsx # Dynamic status badge
    ├── package.json               # Node.js dependencies
    ├── tailwind.config.js         # Tailwind configuration
    └── vite.config.js             # Vite configuration
```

## 📸 Screenshots
*(Placeholder for actual application screenshots)*
- **Dashboard View**: Clean grid layout with the inventory list on the left and add form on the right.
- **Validation State**: Clean error messages for invalid form submissions.

## ⚙️ Environment Setup

### Prerequisites
1. **Node.js** (v18+)
2. **.NET 8 SDK** (Download from [Microsoft](https://dotnet.microsoft.com/en-us/download/dotnet/8.0))

---

## 🏃‍♂️ Run Commands & Setup Instructions

### 1. Run the Backend (.NET Web API)
Open a terminal in the root directory and run:
```bash
cd backend
dotnet run
```
*The API will start at `http://localhost:5000`.*
*You can access the Swagger documentation at `http://localhost:5000/swagger`.*

### 2. Run the Frontend (React + Vite)
Open a **new** terminal in the root directory and run:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start at `http://localhost:5173` (or the port Vite provides).*

### 3. Usage
- Navigate to the frontend URL in your browser.
- The app will automatically fetch and display dummy data preloaded in the backend.
- Fill out the form on the right to instantly add a new item to the inventory.

## 🧠 How Stock Status Logic Works

The computed property is evaluated cleanly on the backend within the `InventoryItem` model and rendered dynamically on the frontend via the `StockStatusBadge` component.

```csharp
// Backend Logic
public string StockStatus => Quantity switch
{
    0 => "Out of Stock",
    <= 10 => "Low Stock",
    _ => "In Stock"
};
```

This strict adherence to Single Source of Truth prevents frontend-backend mismatch and maintains a crisp architecture!
