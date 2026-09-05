# API / State Contract

V1.0 為純前端本機遊戲，沒有外部 API 或帳號資料。

## 主要型別

- `GameState`：回合、階段、目前玩家、玩家陣列、機緣、訊息及事件紀錄。
- `Player`：乾坤袋、已抽資源、四項資源、丹爐格位與炸爐狀態。
- `Token`：藥材或丹毒的資料契約。

## 引擎操作

- `createGame(count)`
- `drawToken(state)`
- `rollChance(state)`
- `settlePlayer(state, choice)`
- `buyHerb(state, id)`
- `nextTurn(state, reason)`

未來如加入線上多人，伺服器必須驗證骰子、抽袋、購買及每次階段轉移。
