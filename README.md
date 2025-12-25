# React Todo List 專案

本專案參考 [YouTube 教學影片](https://www.youtube.com/watch?v=aBTiZfShe-4) 實作，是一個使用 React 和 Vite 建置的待辦事項管理應用程式。

## 📋 專案簡介

這是一個功能完整的待辦事項（Todo List）應用程式，支援新增、編輯、刪除和標記完成待辦事項。

## 線上Demo
https://kim-my-react-todo.zeabur.app/

## 🛠️ 技術棧

- **React 19.2.0** - 前端框架
- **Vite 7.2.4** - 建置工具與開發伺服器
- **React Icons 5.5.0** - 圖標庫（使用 Material Design 圖標）

## 📦 使用的套件

### 生產環境依賴（dependencies）
- `react` (^19.2.0) - React 核心庫
- `react-dom` (^19.2.0) - React DOM 渲染
- `react-icons` (^5.5.0) - 圖標組件庫

### 開發環境依賴（devDependencies）
- `vite` (^7.2.4) - 快速的前端建置工具
- `@vitejs/plugin-react` (^5.1.1) - Vite 的 React 插件
- `eslint` (^9.39.1) - 程式碼檢查工具
- `@eslint/js` (^9.39.1) - ESLint JavaScript 配置
- `eslint-plugin-react-hooks` (^7.0.1) - React Hooks 規則
- `eslint-plugin-react-refresh` (^0.4.24) - React Refresh 支援
- `@types/react` (^19.2.5) - React TypeScript 類型定義
- `@types/react-dom` (^19.2.3) - React DOM TypeScript 類型定義
- `globals` (^16.5.0) - 全域變數定義

## 📁 專案結構

```
my-react-todo/
├── public/              # 靜態資源
├── src/
│   ├── components/      # React 組件
│   │   ├── TodoWrapper.jsx    # 待辦事項容器組件（狀態管理）
│   │   ├── Todo.jsx           # 單個待辦事項組件
│   │   ├── CreateForm.jsx     # 新增待辦事項表單
│   │   └── EditForm.jsx       # 編輯待辦事項表單
│   ├── App.jsx          # 主應用組件
│   ├── App.css          # 應用程式樣式
│   └── main.jsx         # 應用程式入口點
├── .vscode/             # VS Code 開發工具配置
│   ├── tasks.json       # 任務配置
│   └── launch.json      # 調試配置
├── vite.config.js       # Vite 配置
├── package.json         # 專案依賴與腳本
└── README.md           # 專案說明文件
```

## 🎯 功能說明

### 1. 新增待辦事項
- 透過 `CreateForm` 組件輸入待辦事項內容
- 點擊「Add」按鈕或按 Enter 鍵新增
- 新增後自動清空輸入框

### 2. 標記完成/未完成
- 點擊待辦事項文字即可切換完成狀態
- 完成的項目會顯示刪除線並降低透明度

### 3. 編輯待辦事項
- 點擊編輯圖標（✏️）進入編輯模式
- 在編輯表單中修改內容
- 點擊「完成」按鈕儲存修改

### 4. 刪除待辦事項
- 點擊刪除圖標（🗑️）即可刪除該待辦事項

## 💻 實作內容

### 狀態管理
專案使用 React Hooks 進行狀態管理，所有待辦事項的狀態集中在 `TodoWrapper` 組件中：

- `todos` - 待辦事項陣列，每個項目包含：
  - `id` - 唯一識別碼
  - `content` - 待辦事項內容
  - `completed` - 完成狀態（布林值）
  - `editing` - 編輯狀態（布林值）

### 主要函數
- `addTodo(content)` - 新增待辦事項
- `deleteTodo(id)` - 刪除待辦事項
- `toggleComplete(id)` - 切換完成狀態
- `toggleEditing(id)` - 切換編輯模式
- `editTodo(id, content)` - 更新待辦事項內容

### 組件說明

#### TodoWrapper.jsx
- 管理所有待辦事項的狀態
- 提供操作函數給子組件
- 渲染待辦事項列表

#### Todo.jsx
- 顯示單個待辦事項
- 根據 `editing` 狀態切換顯示模式（編輯表單或待辦事項）
- 使用 `react-icons` 顯示編輯和刪除圖標

#### CreateForm.jsx
- 新增待辦事項的表單
- 使用受控組件（controlled component）管理輸入狀態

#### EditForm.jsx
- 編輯待辦事項的表單
- 預設顯示原始內容
- 提交後更新待辦事項並退出編輯模式

## 🚀 安裝與執行

### 前置需求
- Node.js（建議版本 18 或以上）
- npm 或 yarn

### 安裝步驟

1. **安裝依賴套件**
```bash
npm install
```

2. **啟動開發伺服器**
```bash
npm run dev
```

開發伺服器預設會在 `http://localhost:5173` 啟動（Vite 預設端口）

3. **建置生產版本**
```bash
npm run build
```

4. **預覽生產版本**
```bash
npm run preview
```

5. **執行程式碼檢查**
```bash
npm run lint
```

## 🔧 VS Code 開發工具配置

本專案已配置 VS Code 的開發工具，方便開發和調試。

### tasks.json 配置說明

`.vscode/tasks.json` 檔案配置了自動化任務：

```json
{
  "label": "npm: dev",
  "type": "shell",
  "command": "npm run dev -- --port 3001",
  "problemMatcher": [],
  "detail": "執行 npm run dev 啟動開發伺服器（端口 3000）",
  "group": {
    "kind": "build",
    "isDefault": true
  }
}
```

**功能說明：**
- **label**: 任務名稱，在 VS Code 中顯示為 "npm: dev"
- **command**: 執行的命令，啟動開發伺服器並指定端口為 3001
- **group.isDefault**: 設為預設建置任務，可使用快捷鍵 `Ctrl+Shift+B` (Windows/Linux) 或 `Cmd+Shift+B` (Mac) 執行

**使用方式：**
1. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (Mac) 開啟命令面板
2. 輸入 "Tasks: Run Task"
3. 選擇 "npm: dev"
4. 或直接按 `Ctrl+Shift+B` 執行預設建置任務

### launch.json 配置說明

`.vscode/launch.json` 檔案配置了 Chrome 調試功能：

```json
{
  "name": "Launch Chrome",
  "request": "launch",
  "type": "chrome",
  "url": "http://localhost:3001",
  "webRoot": "${workspaceFolder}",
  "preLaunchTask": "npm: dev"
}
```

**功能說明：**
- **name**: 調試配置名稱
- **type**: 調試器類型（chrome）
- **url**: 應用程式運行的網址（必須與 tasks.json 中的端口一致）
- **webRoot**: 工作區根目錄
- **preLaunchTask**: 啟動調試前先執行的任務（會自動執行 "npm: dev"）

**使用方式：**
1. 在 VS Code 中按 `F5` 或點擊左側調試圖標
2. 選擇 "Launch Chrome" 配置
3. VS Code 會自動：
   - 執行 `npm: dev` 任務啟動開發伺服器
   - 開啟 Chrome 瀏覽器並連接到 `http://localhost:3001`
   - 啟用調試功能，可在程式碼中設定中斷點進行調試

**調試功能：**
- 設定中斷點：在程式碼行號左側點擊
- 查看變數值：滑鼠懸停在變數上
- 使用調試控制台：查看 console.log 輸出
- 逐步執行：使用調試工具列的控制按鈕

### 注意事項

⚠️ **端口配置一致性**
- `tasks.json` 中的端口（3001）必須與 `launch.json` 中的 URL 端口一致
- 如果修改了其中一個，記得同步修改另一個

⚠️ **Chrome 瀏覽器**
- 使用 `launch.json` 調試功能需要安裝 Chrome 瀏覽器
- 如果沒有 Chrome，可以修改 `type` 為 `msedge` 使用 Edge 瀏覽器

## 🔌 Cursor/VS Code React 擴充套件推薦

本專案在 Cursor 編輯器（或 VS Code）中開發，以下是推薦安裝的 React 相關擴充套件：

### 核心 React 擴充套件

1. **ES7+ React/Redux/React-Native snippets**
   - 擴充套件 ID: `dsznajder.es7-react-js-snippets`
   - 功能：提供 React、Redux 和 React Native 的程式碼片段
   - 用途：快速生成常用的 React 組件和 Hooks 程式碼

2. **ESLint**
   - 擴充套件 ID: `dbaeumer.vscode-eslint`
   - 功能：整合 ESLint 程式碼檢查工具
   - 用途：即時顯示程式碼錯誤和警告，與專案的 ESLint 配置整合
   - 注意：本專案已配置 `eslint-plugin-react-hooks` 和 `eslint-plugin-react-refresh`

3. **Prettier - Code formatter**
   - 擴充套件 ID: `esbenp.prettier-vscode`
   - 功能：自動格式化程式碼
   - 用途：統一程式碼風格，提升可讀性



## 🎨 樣式說明

專案使用 CSS 進行樣式設計：
- 深色主題配色（深藍色背景）
- 響應式設計，固定寬度 450px
- 完成的待辦事項使用刪除線和透明度效果
- 使用 Flexbox 進行布局

## 📝 程式碼風格

專案使用 ESLint 進行程式碼檢查，確保程式碼品質和一致性。

## 📄 授權

本專案僅供學習使用。

## 🔗 參考資源

- [教學影片](https://www.youtube.com/watch?v=aBTiZfShe-4)
- [React 官方文件](https://react.dev/)
- [Vite 官方文件](https://vitejs.dev/)
- [React Icons 文件](https://react-icons.github.io/react-icons/)

