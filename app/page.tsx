"use client";

import { useMemo, useState } from "react";
import { RotateCcw, ScrollText, ShoppingBag, Sparkles, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createGame, drawToken, settlePlayer, buyHerb, nextTurn, rollChance, type GameState } from "@/src/game/engine";
import { HERBS } from "@/src/game/data";

const phaseName = { alchemy: "煉丹", chance: "機緣", settlement: "結算", market: "黑市場", gameover: "登仙榜" };

export default function Home() {
  const [playerCount, setPlayerCount] = useState(4);
  const [game, setGame] = useState<GameState | null>(null);
  const active = game?.players[game.activePlayer];
  const affordable = useMemo(() => active ? HERBS.filter(h => h.price <= active.spiritStones) : [], [active]);

  if (!game) return <main className="start-screen"><section className="title-seal">
    <div className="seal-mark">仙</div><p>九次閉關 · 一念登仙</p><h1>誤入仙途</h1>
    <p className="intro">一場關於機緣、貪念與修行的桌上冒險</p>
    <div className="player-picker" aria-label="玩家人數">{[1,2,3,4].map(n => <button key={n} className={playerCount === n ? "selected" : ""} onClick={() => setPlayerCount(n)}>{n} 位修士</button>)}</div>
    <Button className="main-action" onClick={() => setGame(createGame(playerCount))}>踏入仙途</Button><p className="version">V1.0 · 本機同屏輪流遊玩</p>
  </section></main>;

  const update = (fn: (g: GameState) => GameState) => setGame(g => g ? fn(g) : g);
  return <main className="game-shell">
    <header className="topbar"><div><span className="eyebrow">WU RU XIAN TU</span><h1>誤入仙途</h1></div><div className="round-medallion"><small>回合</small><strong>{game.round}</strong><span>/ 9</span></div><Dialog><DialogTrigger asChild><Button variant="outline" size="icon" aria-label="規則摘要"><ScrollText /></Button></DialogTrigger><DialogContent className="rule-dialog"><DialogHeader><DialogTitle>修行要訣</DialogTitle></DialogHeader><p>丹毒總值超過 7 立即炸爐。未炸爐可獲全部格位獎勵；炸爐只能在修為與靈石中選一項，晶石照常獲得。</p><p>每回合靈石用於黑市場，回合結束即清零。第九回合後，晶石、中上品藥材與丹毒一併計算最終修為。</p></DialogContent></Dialog></header>
    <nav className="phase-track" aria-label="回合階段">{(["alchemy","chance","settlement","market"] as const).map((p,i) => <div key={p} className={game.phase === p ? "active" : ""}><span>{i+1}</span>{phaseName[p]}</div>)}</nav>
    <section className="players-grid">{game.players.map((p,i) => <article key={p.id} className={`player-card ${i === game.activePlayer ? "active" : ""} ${p.exploded ? "danger" : ""}`}><div className="player-head"><span className="avatar">{["玄","靈","雲","月"][i]}</span><div><b>{p.name}</b><small>{p.done ? "已完成本階段" : i === game.activePlayer ? "正在修行" : "靜候"}</small></div></div><dl><div><dt>修為</dt><dd>{p.cultivation}</dd></div><div><dt>靈石</dt><dd>{p.spiritStones}</dd></div><div><dt>晶石</dt><dd>{p.crystals}</dd></div><div><dt>冰魄蓮</dt><dd>{p.lotus}</dd></div></dl></article>)}</section>
    {game.phase !== "gameover" && active && <section className="play-board"><div className="board-heading"><div><span className="eyebrow">{active.name}</span><h2>{phaseName[game.phase]}</h2></div><p>{game.message}</p></div>
      {game.phase === "alchemy" && <><div className="cauldron"><div className="flame"/><div className="pot"><span>{active.position + active.startPosition}</span><small>丹爐格位</small></div><div className="poison-meter"><span>丹毒 {active.poison}/7</span><div><i style={{width:`${Math.min(100,active.poison/7*100)}%`}}/></div></div></div><div className="drawn-row">{active.drawn.length ? active.drawn.map((t,i)=><span key={`${t.id}-${i}`} className={t.kind === "poison" ? "poison" : "herb"}>{t.name}<small>+{t.steps}步</small></span>) : <em>丹爐尚空，抽取第一枚靈材吧</em>}</div><div className="actions"><Button disabled={active.done || active.exploded} onClick={() => update(drawToken)}><Sparkles/>抽取靈材</Button><Button variant="outline" disabled={active.done} onClick={() => update(g => nextTurn(g,"stop"))}>見好就收</Button></div></>}
      {game.phase === "chance" && <div className="chance-panel">{game.currentChance ? <><span className="card-number">機緣 · {String(game.currentChance.id).padStart(2,"0")}</span><h3>{game.currentChance.name}</h3><p>{game.currentChance.story}</p>{game.lastRoll && <div className={`dice ${game.lastRoll.result}`}>{game.lastRoll.die}<small>{game.lastRoll.label}</small></div>}<p className="outcome">{game.lastRoll?.text}</p></> : <div className="card-back">機<br/>緣</div>}<Button disabled={!!game.lastRoll} onClick={() => update(rollChance)}>擲骰判命</Button>{game.lastRoll && <Button variant="outline" onClick={() => update(g => nextTurn(g,"chance"))}>收下結果</Button>}</div>}
      {game.phase === "settlement" && <div className="settlement-panel"><Sparkles/><h3>丹爐結算</h3><p>目前格位可得：修為 +{Math.floor((active.position + active.startPosition)/4)}、靈石 +{2 + Math.floor((active.position + active.startPosition)/3)}、晶石 +{(active.position + active.startPosition) >= 8 ? 1 : 0}</p>{active.exploded ? <div className="actions"><Button onClick={() => update(g => settlePlayer(g,"cultivation"))}>保留修為</Button><Button variant="outline" onClick={() => update(g => settlePlayer(g,"stones"))}>保留靈石</Button></div> : <Button onClick={() => update(g => settlePlayer(g,"all"))}>領取全部</Button>}</div>}
      {game.phase === "market" && <div className="market-panel"><div className="market-head"><ShoppingBag/><span>現有靈石：{active.spiritStones}</span></div><div className="market-grid">{HERBS.map(h => <button key={h.id} disabled={h.price > active.spiritStones} onClick={() => update(g => buyHerb(g,h.id))}><b>{h.name}</b><small>{h.grade} · {h.steps}步</small><span>{h.price} 靈石</span></button>)}</div>{!affordable.length && <p className="muted">靈石不足，亦可直接結束購買。</p>}<Button variant="outline" onClick={() => update(g => nextTurn(g,"market"))}>完成購買</Button></div>}
    </section>}
    {game.phase === "gameover" && <section className="final-board"><span className="eyebrow">築基大圓滿</span><h2>{game.players[0].name} 勝出</h2><div className="ranking">{game.players.map((p,i)=><div key={p.id}><span>第 {i+1} 名</span><b>{p.name}</b><strong>{p.finalScore} 修為</strong></div>)}</div><Button onClick={() => setGame(null)}><RotateCcw/>再開仙途</Button></section>}
    <footer className="event-log"><TriangleAlert size={16}/><span>{game.log[0]}</span></footer>
  </main>;
}
