# Coding Rule

- TypeScript strict mode；禁止以 `any` 掩蓋資料問題。
- 遊戲規則放在 `src/game/`，畫面不可重複定義規則數值。
- 狀態轉換採純函式及複製後更新，禁止直接修改 React state。
- 新增卡牌或藥材時，同步更新 `data/`、型別與規則測試。
- 顯示文字使用繁體中文；程式識別字使用英文。
- 每次提交前執行 `npm run check`、`npm run lint`、`npm run build`。
