# 在 IIS 上部署 React 應用程式

本指南說明如何將建置後的 React 應用程式部署到 Windows IIS（Internet Information Services）伺服器。

## 📋 前置需求

- Windows Server 或 Windows 10/11（已安裝 IIS）
- 已建置完成的 React 應用程式（`dist` 資料夾）
- IIS URL Rewrite 模組（用於處理 SPA 路由）

## 🚀 部署步驟

### 步驟 1：建置專案

在專案根目錄執行：

```bash
npm run build
```

這會在 `dist` 資料夾產生所有靜態檔案（HTML、CSS、JS）。

### 步驟 2：複製檔案到 IIS 網站目錄

將 `dist` 資料夾內的所有檔案複製到 IIS 網站目錄，例如：
- `C:\inetpub\wwwroot\my-react-todo\`
- 或您自訂的網站目錄

### 步驟 3：設定 IIS 網站

1. 開啟 **IIS 管理員**（Internet Information Services (IIS) Manager）
2. 在左側「網站」上按右鍵 → 選擇「新增網站」
3. 設定以下項目：
   - **網站名稱**：`my-react-todo`（或您喜歡的名稱）
   - **實體路徑**：指向 `dist` 資料夾（例如：`C:\inetpub\wwwroot\my-react-todo`）
   - **連接埠**：80（預設）或自訂埠號（如 8080）
   - **主機名稱**：（可選）如果有多個網站，可設定網域名稱

### 步驟 4：安裝 URL Rewrite 模組（重要）

React SPA 需要 URL 重寫功能，讓所有路由都指向 `index.html`，否則重新整理頁面會出現 404 錯誤。

1. 下載並安裝 [IIS URL Rewrite Module](https://www.iis.net/downloads/microsoft/url-rewrite)
2. 安裝完成後重啟 IIS 服務

**檢查是否已安裝：**
- 在 IIS 管理員中，點選網站
- 如果看到「URL Rewrite」圖示，表示已安裝

### 步驟 5：建立 web.config 檔案

在網站根目錄（與 `index.html` 同一層）建立 `web.config` 檔案：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <!-- 處理 React Router 或 SPA 路由 -->
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    
    <!-- 設定 HTTP 標頭（可選，用於快取控制） -->
    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

**說明：**
- `rewrite` 規則：將所有非檔案、非目錄的請求重寫到根目錄，讓 React Router 處理路由
- `staticContent`：確保 JSON 和字型檔案能正確載入
- `customHeaders`：增加安全性標頭

### 步驟 6：設定應用程式集區（建議）

1. 在 IIS 管理員中，點選左側「應用程式集區」
2. 找到您的網站對應的應用程式集區
3. 按右鍵 → 選擇「基本設定」
4. 建議設定：
   - **.NET CLR 版本**：無 Managed 程式碼（因為是純靜態檔案）
   - **受控管線模式**：整合式

### 步驟 7：設定權限

確保 IIS 使用者對網站目錄有讀取權限：

1. 在網站資料夾上按右鍵 → 選擇「內容」→「安全性」標籤
2. 確認 `IIS_IUSRS` 使用者群組有「讀取和執行」權限
3. 如果沒有，點選「編輯」→「新增」→ 輸入 `IIS_IUSRS` → 勾選「讀取和執行」

### 步驟 8：測試網站

在瀏覽器中開啟：
- `http://localhost`（如果使用預設 80 埠）
- 或 `http://localhost:8080`（如果使用自訂埠）
- 或 `http://您的伺服器IP`（從其他電腦存取）

## 🔧 自動化部署腳本

### PowerShell 部署腳本

建立 `deploy-to-iis.ps1` 檔案：

```powershell
# deploy-to-iis.ps1
# 設定 IIS 部署路徑
$iisPath = "C:\inetpub\wwwroot\my-react-todo"
$distPath = ".\dist\*"

Write-Host "開始部署到 IIS..." -ForegroundColor Green

# 步驟 1: 建置專案
Write-Host "`n[1/3] 建置專案..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "建置失敗！" -ForegroundColor Red
    exit 1
}

# 步驟 2: 建立 IIS 目錄（如果不存在）
Write-Host "`n[2/3] 準備 IIS 目錄..." -ForegroundColor Yellow
if (-not (Test-Path $iisPath)) {
    New-Item -ItemType Directory -Path $iisPath -Force
    Write-Host "已建立目錄: $iisPath" -ForegroundColor Green
}

# 步驟 3: 複製檔案
Write-Host "`n[3/3] 複製檔案到 IIS 目錄..." -ForegroundColor Yellow
Copy-Item -Path $distPath -Destination $iisPath -Recurse -Force

Write-Host "`n部署完成！" -ForegroundColor Green
Write-Host "網站路徑: $iisPath" -ForegroundColor Cyan
Write-Host "請確認 web.config 檔案已正確設定。" -ForegroundColor Yellow
```

**使用方法：**
```powershell
.\deploy-to-iis.ps1
```

## ❗ 常見問題排除

### 問題 1：404 錯誤（重新整理頁面時）

**症狀：** 直接輸入網址或重新整理頁面時出現 404 錯誤

**解決方案：**
- 確認已安裝 **URL Rewrite 模組**
- 檢查 `web.config` 檔案是否存在且設定正確
- 在 IIS 管理員中確認「URL Rewrite」功能已啟用

### 問題 2：JS/CSS 檔案無法載入

**症狀：** 頁面空白，或瀏覽器開發者工具顯示 404 錯誤

**解決方案：**
- 檢查檔案路徑是否正確（確認檔案已複製到 IIS 目錄）
- 檢查 MIME 類型設定（`web.config` 中的 `staticContent`）
- 確認 IIS 權限設定正確
- 檢查瀏覽器開發者工具（F12）的 Network 標籤，查看哪些檔案載入失敗

### 問題 3：空白頁面

**症狀：** 頁面載入但顯示空白

**解決方案：**
- 開啟瀏覽器開發者工具（F12）查看 Console 錯誤
- 檢查是否有 CORS 錯誤
- 確認 `index.html` 中的路徑正確（Vite 建置的檔案通常使用相對路徑，應該沒問題）
- 檢查是否有 JavaScript 執行錯誤

### 問題 4：需要 HTTPS

**設定步驟：**
1. 在 IIS 管理員中，點選您的網站
2. 在右側「動作」面板中，點選「繫結」
3. 點選「新增」
4. 選擇類型：`https`
5. 選擇或匯入 SSL 憑證
6. 設定連接埠：443（預設）
7. 點選「確定」

### 問題 5：權限不足

**症狀：** 無法存取網站或檔案

**解決方案：**
- 確認 `IIS_IUSRS` 群組有讀取權限
- 確認網站資料夾的權限設定正確
- 檢查應用程式集區的識別身分設定

## 📝 檢查清單

部署前請確認：

- [ ] 已執行 `npm run build` 建置專案
- [ ] `dist` 資料夾包含所有必要檔案
- [ ] 已複製 `dist` 資料夾內容到 IIS 目錄
- [ ] 在 IIS 中建立新網站並指向正確路徑
- [ ] 已安裝 URL Rewrite 模組
- [ ] 已建立 `web.config` 檔案
- [ ] 已設定適當的檔案權限（IIS_IUSRS）
- [ ] 已設定應用程式集區（建議使用「無 Managed 程式碼」）
- [ ] 測試網站是否正常運作
- [ ] 測試重新整理頁面是否正常（確認路由功能）

## 🔗 相關資源

- [IIS 官方文件](https://www.iis.net/)
- [URL Rewrite 模組下載](https://www.iis.net/downloads/microsoft/url-rewrite)
- [Vite 部署文件](https://vitejs.dev/guide/static-deploy.html)

## 📌 注意事項

1. **路徑問題**：如果您的應用程式需要部署到子目錄（例如：`http://example.com/my-app/`），需要在 `vite.config.js` 中設定 `base` 選項：

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/my-app/',  // 設定子目錄路徑
})
```

2. **快取問題**：Vite 建置的檔案名稱包含 hash（如 `index-a1b2c3.js`），用於快取控制。每次建置後，舊檔案不會自動刪除，建議手動清理或使用部署腳本。

3. **效能優化**：IIS 可以設定靜態檔案快取，提升效能。可在 `web.config` 中新增快取設定。

4. **安全性**：生產環境建議：
   - 啟用 HTTPS
   - 設定適當的 HTTP 安全標頭
   - 定期更新依賴套件

