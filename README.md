# 誤入仙途 Codex Project V1.0

> 一場關於機緣、貪念與修行的桌上冒險。

《誤入仙途》桌遊的 Web App 原型與長期開發基礎。V1.0 已可在同一裝置供 1–4 位玩家輪流完成九回合遊戲。

## 已完成

- 1–4 位本機同屏玩家
- 九回合狀態機：煉丹 → 機緣 → 結算 → 黑市場
- 乾坤袋抽取、丹毒累積及超過 7 炸爐
- 20 張機緣卡與六面骰判定
- 七大藥材、三種品級與黑市場購買
- 修為、靈石、鍊氣晶石、冰魄蓮及永久起始格狀態
- 第九回合最終修為與排名
- 手機及桌面響應式繁體中文介面

## 本機啟動

需要 Node.js 22.13 或以上版本。

```bash
npm ci
npm run dev
```

## 驗證與建置

```bash
npm run check
npm run lint
npm run build
```

## 上傳 GitHub

1. 在 GitHub 建立空白 Repository，例如 `WuRuXianTu`。
2. 解壓本專案，進入專案資料夾。
3. 執行：

```bash
git init
git add .
git commit -m "誤入仙途 V1.0"
git branch -M main
git remote add origin https://github.com/你的帳號/WuRuXianTu.git
git push -u origin main
```

也可以在 GitHub 網頁按 **Add file → Upload files**，把解壓後的所有內容拖曳上傳。

## 專案目錄

- `app/`：Web App 畫面及全域美術
- `src/game/`：資料模型與遊戲引擎
- `data/`：可供未來後台或其他前端使用的 JSON
- `rules/`：作者提供的三份原始規則
- `docs/`：GDD、流程、美術、UI、API、路線圖與編碼規範

## V1.0 規則註記

原始規則未列出丹爐每一格的獎勵表，因此 V1.0 使用集中且可替換的暫定計算式，詳見 `docs/RULE_CLARIFICATIONS.md`。特殊雙人機緣、冰魄蓮互動選擇、部分藥材完整連鎖效果及同分盲抽決鬥，列入下一版本。

## 授權

遊戲名稱、規則、文字與美術設定保留所有權利；原始碼見 `LICENSE`。
