import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   VERTEX FUNDED — Complete Trader Dashboard
   White + Purple · Every page works · Powered by ForexOpsPro
   ═══════════════════════════════════════════════════════════ */

const V = {
  bg:"#F8F7FC",sf:"#FFFFFF",card:"#FFFFFF",hover:"#F5F3FF",sel:"#EEEBFF",
  bd:"#E8E5F0",bdL:"#F0EDF8",bdD:"#D4D0E0",
  p:"#7C3AED",pm:"#8B5CF6",pl:"#A78BFA",pdim:"rgba(124,58,237,0.06)",pglow:"rgba(124,58,237,0.12)",pbd:"rgba(124,58,237,0.15)",
  g:"#10B981",gd:"rgba(16,185,129,0.08)",gb:"rgba(16,185,129,0.18)",
  r:"#EF4444",rd:"rgba(239,68,68,0.08)",rb:"rgba(239,68,68,0.18)",
  a:"#F59E0B",ad:"rgba(245,158,11,0.08)",
  b:"#3B82F6",bd2:"rgba(59,130,246,0.08)",
  pk:"#EC4899",pkd:"rgba(236,72,153,0.08)",
  t:"#1A1A2E",m:"#6B7280",f:"#9CA3AF",h:"#D1D5DB",
  rr:"10px",rl:"14px",
};

const $=(n)=>typeof n==="number"?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00";
const $k=(n)=>n>=1e6?`$${(n/1e6).toFixed(2)}M`:n>=1e3?`$${(n/1e3).toFixed(1)}K`:`$${$(n)}`;
const $i=(n)=>typeof n==="number"?`$${n.toLocaleString()}`:"$0";

/* ═══ DATA ═══ */
const ACCOUNTS=[
  {id:"VTX-850042",login:"850042",size:"$50,000",type:"1-Step Flex",phase:"Funded",equity:54847.30,pnl:4847.30,dailyPnl:-127.40,startDate:"01/15/2026",status:"active"},
  {id:"VTX-850038",login:"850038",size:"$25,000",type:"2-Step Classic",phase:"Phase 2",equity:26420.10,pnl:1420.10,dailyPnl:312.50,startDate:"02/20/2026",status:"active"},
  {id:"VTX-850029",login:"850029",size:"$100,000",type:"1-Step Flex",phase:"Phase 1",equity:101200.80,pnl:1200.80,dailyPnl:-48.20,startDate:"03/10/2026",status:"active"},
  {id:"VTX-850015",login:"850015",size:"$10,000",type:"2-Step Classic",phase:"Failed",equity:8420.00,pnl:-1580.00,dailyPnl:0,startDate:"12/01/2025",status:"failed"},
];

const ACCT_DETAIL={
  id:"VTX-850042",login:"850042",challenge:"$50,000",type:"1-Step Flex",phase:"Funded",start:"01/15/2026",end:"Unlimited",
  totalPL:4847.30,dailyPL:-127.40,equity:54847.30,balance:54974.70,openPos:3,floatPL:-127.40,
  startEq:54974.70,minEq:54701.22,maxEq:55102.88,hwm:56102.88,hwmDate:"03/28/2026 14:22",
  maxLoss:45000,dailyLimit:47500,profitTarget:4000,profitMade:4847.30,
};

const EQ_DATA=Array.from({length:30},(_,i)=>{const b=50000;return{day:30-i,v:Math.round((b+i*180+Math.sin(i*0.8)*600+(Math.random()-0.3)*400)*100)/100};}).reverse();

const POSITIONS=[
  {sym:"EURUSD",dir:"Buy",lots:1.50,entry:1.08842,cur:1.08921,pnl:118.50,swap:-2.40},
  {sym:"XAUUSD",dir:"Buy",lots:0.50,entry:2648.20,cur:2651.80,pnl:180.00,swap:-8.10},
  {sym:"GBPUSD",dir:"Sell",lots:2.00,entry:1.29410,cur:1.29622,pnl:-424.00,swap:-1.90},
];

const TRADES=[
  {id:"T-9841",sym:"NASDAQ",dir:"Buy",lots:1.25,pnl:1892.50,dur:"4h 22m",dt:"04/04",open:18442.50,close:18594.00},
  {id:"T-9840",sym:"EURUSD",dir:"Buy",lots:2.00,pnl:640.00,dur:"2h 15m",dt:"04/03",open:1.08420,close:1.08740},
  {id:"T-9839",sym:"XAUUSD",dir:"Sell",lots:0.75,pnl:-312.00,dur:"1h 44m",dt:"04/03",open:2655.40,close:2659.56},
  {id:"T-9838",sym:"GBPUSD",dir:"Buy",lots:1.00,pnl:228.00,dur:"5h 02m",dt:"04/02",open:1.29120,close:1.29348},
  {id:"T-9837",sym:"USDJPY",dir:"Sell",lots:1.50,pnl:445.50,dur:"3h 18m",dt:"04/01",open:151.420,close:151.123},
  {id:"T-9836",sym:"BTCUSD",dir:"Buy",lots:0.10,pnl:-189.00,dur:"45m",dt:"04/01",open:84200,close:82310},
  {id:"T-9835",sym:"EURUSD",dir:"Sell",lots:2.50,pnl:780.00,dur:"6h 11m",dt:"03/31",open:1.08880,close:1.08568},
  {id:"T-9834",sym:"XAUUSD",dir:"Buy",lots:1.00,pnl:1340.00,dur:"2h 55m",dt:"03/30",open:2632.10,close:2645.50},
];

const ANALYTICS={tt:96,wr:64.6,pf:3.10,avgW:482.30,avgL:-215.40,maxDD:-1631.70,sharpe:4.57,days:27,avgVol:21400,maxCW:6,maxCL:3,best:1892.50,worst:-824.00,longC:58,shortC:38,longPL:5240.80,shortPL:-393.50};

const PAYOUTS=[
  {id:"PO-1201",amount:3200,method:"Bank Wire",status:"Completed",date:"03/28/2026",account:"VTX-850042",split:"80%",processed:"2h 14m"},
  {id:"PO-1198",amount:1800,method:"Crypto (USDT)",status:"Completed",date:"03/14/2026",account:"VTX-850042",split:"80%",processed:"18m"},
  {id:"PO-1195",amount:2400,method:"Bank Wire",status:"Processing",date:"04/05/2026",account:"VTX-850042",split:"80%",processed:"Pending"},
];

const LEADERBOARD=[
  {rank:1,name:"AlphaTrader_X",profit:12840,wr:"72.1%",trades:142,dd:"-2.1%"},
  {rank:2,name:"QuantKing",profit:11200,wr:"68.4%",trades:98,dd:"-3.4%"},
  {rank:3,name:"FX_Maverick",profit:9847,wr:"64.6%",trades:96,dd:"-3.3%"},
  {rank:4,name:"GoldBull_22",profit:8420,wr:"61.2%",trades:110,dd:"-4.1%"},
  {rank:5,name:"SwingMaster",profit:7650,wr:"59.8%",trades:88,dd:"-2.8%"},
  {rank:6,name:"NightOwl_FX",profit:6890,wr:"57.3%",trades:134,dd:"-5.2%"},
  {rank:7,name:"PipHunter",profit:6120,wr:"55.1%",trades:76,dd:"-3.9%"},
  {rank:8,name:"TrendRider",profit:5480,wr:"62.4%",trades:64,dd:"-2.6%"},
];

const FAQS=[
  {q:"What is the profit split for funded accounts?",a:"Vertex Funded offers an 80% profit split on all funded accounts. You keep 80% of the profits you generate, paid out bi-weekly via bank wire or crypto."},
  {q:"How does the 1-Step Flex challenge work?",a:"The 1-Step Flex requires you to reach an 8% profit target with a 4% max drawdown and 2% daily drawdown limit. There is no time limit and minimum 3 trading days required."},
  {q:"What trading platforms are supported?",a:"We support MetaTrader 5, cTrader, and Match-Trader. Your platform credentials are provided within 24 hours of challenge purchase."},
  {q:"How long do payouts take?",a:"Payouts are processed bi-weekly. Bank wire transfers take 1-3 business days. Crypto payouts (USDT) are processed within 1 hour."},
  {q:"Can I hold trades over the weekend?",a:"Yes, weekend holding is permitted on all Vertex Funded accounts. Swap fees apply as per standard market conditions."},
  {q:"What happens if I breach a rule?",a:"If you breach the max drawdown or daily loss limit, your account is automatically disabled. You will receive an email notification with a detailed breakdown of the breach."},
  {q:"Is news trading allowed?",a:"Yes, news trading is allowed on all account types. There are no restrictions on trading during high-impact news events."},
  {q:"Can I use Expert Advisors (EAs)?",a:"Yes, EAs are permitted as long as they are not designed for HFT exploitation, latency arbitrage, or copy-trading abuse across multiple accounts."},
];

const BILLING=[
  {id:"INV-4201",desc:"1-Step Flex $50K Challenge",amount:299,status:"Paid",date:"01/14/2026",method:"Credit Card"},
  {id:"INV-4198",desc:"2-Step Classic $25K Challenge",amount:149,status:"Paid",date:"02/19/2026",method:"Crypto"},
  {id:"INV-4210",desc:"1-Step Flex $100K Challenge",amount:549,status:"Paid",date:"03/09/2026",method:"Credit Card"},
  {id:"INV-4180",desc:"2-Step Classic $10K Challenge",amount:79,status:"Refunded",date:"11/28/2025",method:"Credit Card"},
];

const CHALLENGES=[
  {name:"1-Step Flex",sizes:[{s:"$5K",p:39},{s:"$10K",p:79},{s:"$25K",p:149},{s:"$50K",p:299},{s:"$100K",p:549},{s:"$200K",p:999}],target:"8%",dd:"4%",daily:"2%",days:"3 min",time:"Unlimited",split:"80%",payout:"Bi-weekly"},
  {name:"2-Step Classic",sizes:[{s:"$5K",p:29},{s:"$10K",p:59},{s:"$25K",p:119},{s:"$50K",p:229},{s:"$100K",p:449},{s:"$200K",p:799}],target:"8% / 5%",dd:"10%",daily:"5%",days:"3 min",time:"Unlimited",split:"80%",payout:"Bi-weekly"},
];

const AFFILIATE={code:"FXMAV2026",link:"vertexfunded.com/?ref=FXMAV2026",clicks:1420,signups:87,conv:"6.1%",earned:2840,pending:640,tier:"Silver",rate:"15%"};

const PROFILE={name:"FX_Maverick",email:"trader@email.com",phone:"+1 (555) 842-9100",country:"United States",joined:"Nov 2025",kyc:"Verified",twofa:"Enabled"};

/* ═══ ATOMS ═══ */
const Pip=({c=V.p,s=7})=><span style={{width:s,height:s,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>;
const Tag=({children,c=V.p})=><span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:600,background:`${c}12`,color:c,border:`1px solid ${c}20`,whiteSpace:"nowrap"}}>{children}</span>;
const Btn=({children,primary,onClick,disabled,style:s={}})=><button onClick={onClick} disabled={disabled} style={{padding:primary?"10px 22px":"8px 16px",background:primary?`linear-gradient(135deg,${V.p},${V.pm})`:V.sf,color:primary?"#fff":V.m,border:`1px solid ${primary?V.p:V.bd}`,borderRadius:8,fontSize:13,fontWeight:primary?700:500,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.15s",boxShadow:primary?`0 2px 12px ${V.pglow}`:"none",opacity:disabled?0.5:1,...s}}>{children}</button>;

const Card=({children,s={}})=><div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)",...s}}>{children}</div>;
const CH=({title,right,sub})=><div style={{padding:"14px 18px",borderBottom:`1px solid ${V.bdL}`,display:"flex",justifyContent:"space-between",alignItems:sub?"flex-start":"center"}}><div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{title}</div>{sub&&<div style={{fontSize:11,color:V.f,marginTop:2}}>{sub}</div>}</div>{right}</div>;

const Stat=({label,value,sub,color=V.t,icon})=>(
  <div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,padding:"16px 18px",position:"relative",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color}40,transparent)`}}/>
    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>{icon&&<span style={{fontSize:12,opacity:0.5}}>{icon}</span>}<span style={{fontSize:10,color:V.m,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</span></div>
    <div style={{fontSize:22,fontWeight:800,color,letterSpacing:"-0.02em",lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:V.f,marginTop:6}}>{sub}</div>}
  </div>
);

const Th=({children})=><th style={{padding:"10px 14px",fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"left",borderBottom:`1px solid ${V.bdL}`,background:V.bg}}>{children}</th>;
const Td=({children,s={}})=><td style={{padding:"11px 14px",fontSize:13,color:V.m,borderBottom:`1px solid ${V.bdL}`,verticalAlign:"middle",...s}}>{children}</td>;
const TRow=({children,onClick,hl})=>{const[h,setH]=useState(false);return<tr style={{background:hl?V.rd:h?V.hover:"transparent",cursor:onClick?"pointer":"default",transition:"background 0.1s"}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick}>{children}</tr>;};

const Ring=({pct,color=V.g,size=72,sw=5,label,sub})=>{const r=(size-sw)/2;const c=2*Math.PI*r;const o=c-(Math.min(pct,100)/100)*c;return(
  <div style={{display:"flex",alignItems:"center",gap:14}}>
    <svg width={size} height={size} style={{transform:"rotate(-90deg)",flexShrink:0}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={V.bdL} strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={c} strokeDashoffset={o} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s"}}/>
      <text x={size/2} y={size/2} textAnchor="middle" dy="0.35em" style={{transform:"rotate(90deg)",transformOrigin:"center",fontSize:11,fontWeight:700,fill:color}}>{pct.toFixed(0)}%</text>
    </svg>
    <div><div style={{fontSize:13,fontWeight:600,color:V.t}}>{label}</div>{sub&&<div style={{fontSize:11,color:V.f,marginTop:2}}>{sub}</div>}</div>
  </div>
);};

const Chart=({data,color=V.p,h=80})=>{const max=Math.max(...data.map(d=>d.v));const min=Math.min(...data.map(d=>d.v));const rng=max-min||1;const w=100;const pts=data.map((d,i)=>`${(i/(data.length-1))*w},${h-((d.v-min)/rng)*(h-10)-5}`).join(" ");return(
  <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height}} preserveAspectRatio="none">
    <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.12"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
    <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#cg)"/>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
  </svg>
);};

/* ═══ PAGES ═══ */

function PgAccounts({onSelect}){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Accounts" value={ACCOUNTS.length} color={V.p} icon="⊞"/>
      <Stat label="Active" value={ACCOUNTS.filter(a=>a.status==="active").length} color={V.g} icon="✓"/>
      <Stat label="Total Equity" value={$k(ACCOUNTS.reduce((s,a)=>s+a.equity,0))} color={V.p} icon="$"/>
      <Stat label="Total P&L" value={`+$${$(ACCOUNTS.reduce((s,a)=>s+a.pnl,0))}`} color={V.g} icon="↗"/>
    </div>
    <Card>
      <CH title="My Accounts" right={<Tag c={V.p}>{ACCOUNTS.length}</Tag>}/>
      <table><thead><tr>{["Account","Size","Type","Phase","Equity","P&L","Daily P&L","Status",""].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{ACCOUNTS.map(a=><TRow key={a.id} onClick={()=>onSelect(a.id)}>
          <Td s={{fontFamily:"monospace",color:V.p,fontWeight:600,fontSize:12}}>{a.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{a.size}</Td>
          <Td>{a.type}</Td>
          <Td><Tag c={a.phase==="Funded"?V.g:a.phase==="Failed"?V.r:V.p}>{a.phase}</Tag></Td>
          <Td s={{fontFamily:"monospace",fontWeight:600,color:V.t}}>${$(a.equity)}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:a.pnl>=0?V.g:V.r}}>{a.pnl>=0?"+":""}${$(a.pnl)}</Td>
          <Td s={{fontFamily:"monospace",color:a.dailyPnl>=0?V.g:V.r}}>{a.dailyPnl>=0?"+":""}${$(a.dailyPnl)}</Td>
          <Td><Pip c={a.status==="active"?V.g:V.r} s={6}/></Td>
          <Td><span style={{fontSize:12,color:V.p,cursor:"pointer",fontWeight:600}}>View →</span></Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgAccountDetail({onBack}){
  const a=ACCT_DETAIL;const pp=Math.min((a.profitMade/a.profitTarget)*100,100);const ml=((a.balance-a.minEq)/(a.balance-a.maxLoss))*100;const dl=a.dailyPL<0?(Math.abs(a.dailyPL)/(a.balance-a.dailyLimit))*100:0;
  const[tab,setTab]=useState("details");
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}><span onClick={onBack} style={{cursor:"pointer",color:V.p,fontSize:13,fontWeight:600}}>← Back to Accounts</span><span style={{fontSize:16,fontWeight:700,color:V.t}}>Account #{a.login}</span><Tag c={V.g}>{a.phase}</Tag></div>
    <div style={{display:"flex",gap:4,background:V.sf,border:`1px solid ${V.bd}`,borderRadius:10,padding:3,width:"fit-content"}}>
      {[["details","Account Details"],["analytics","Trade Analytics"]].map(([id,lb])=><button key={id} onClick={()=>setTab(id)} style={{padding:"7px 18px",borderRadius:7,background:tab===id?V.p:"transparent",color:tab===id?"#fff":V.m,border:"none",fontSize:13,fontWeight:tab===id?600:400,cursor:"pointer",fontFamily:"inherit"}}>{lb}</button>)}
    </div>
    {tab==="details"&&<>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr 1fr",gap:14}}>
        <Card><CH title="Account Basics"/><div style={{padding:"12px 16px"}}>{[["Login",a.login],["Challenge",a.challenge],["Type",a.type],["Phase",a.phase],["Start",a.start],["End",a.end]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:12}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div></Card>
        <Card><CH title="Real-time Equity" sub="Last 30 ticks"/><div style={{padding:"10px 14px"}}><div style={{fontSize:26,fontWeight:800,color:V.p,marginBottom:6}}>${$(a.equity)}</div><Chart data={EQ_DATA} color={V.p} h={90}/></div></Card>
        <Card><CH title="Daily Reset" sub="Next: 5pm EST"/><div style={{padding:"12px 16px"}}><div style={{fontSize:24,fontWeight:800,color:V.t,marginBottom:12}}>2h : 14m : 33s</div>{[["Starting Equity",`$${a.startEq.toLocaleString()}`],["Min Equity",`$${a.minEq.toLocaleString()}`],["Max Equity",`$${a.maxEq.toLocaleString()}`],["All-time HWM",`$${a.hwm.toLocaleString()}`],["HWM Time",a.hwmDate]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:11}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div></Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        <Stat label="Total P/L" value={`+$${$(a.totalPL)}`} color={V.g} icon="$"/>
        <Stat label="Daily P/L" value={`${a.dailyPL>=0?"+":""}$${$(a.dailyPL)}`} color={a.dailyPL>=0?V.g:V.r} icon="$"/>
        <Stat label="Open Positions" value={a.openPos} color={V.p} icon="⊞"/>
      </div>
      <Card><CH title="Goals & Limits"/><div style={{padding:"18px 22px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        <Ring pct={pp} color={pp>=100?V.g:V.p} label="Payout Progress" sub={`Target: $${a.profitTarget.toLocaleString()}`}/>
        <Ring pct={ml} color={ml>60?V.r:ml>30?V.a:V.g} label="Max Loss Used" sub={`Level: $${a.maxLoss.toLocaleString()}`}/>
        <Ring pct={dl} color={dl>60?V.r:dl>30?V.a:V.g} label="Daily Loss Used" sub={`Limit: $${a.dailyLimit.toLocaleString()}`}/>
      </div></Card>
      <Card><CH title="Open Positions" right={<Tag c={V.p}>{POSITIONS.length}</Tag>}/><table><thead><tr>{["Symbol","Direction","Lots","Entry","Current","Swap","P&L"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{POSITIONS.map((p,i)=><TRow key={i}><Td s={{fontWeight:700,color:V.t}}>{p.sym}</Td><Td><Tag c={p.dir==="Buy"?V.g:V.r}>{p.dir}</Tag></Td><Td s={{fontFamily:"monospace"}}>{p.lots.toFixed(2)}</Td><Td s={{fontFamily:"monospace",fontSize:11}}>{p.entry}</Td><Td s={{fontFamily:"monospace",fontSize:11}}>{p.cur}</Td><Td s={{fontFamily:"monospace",color:V.r,fontSize:11}}>${p.swap.toFixed(2)}</Td><Td s={{fontFamily:"monospace",fontWeight:700,color:p.pnl>=0?V.g:V.r}}>{p.pnl>=0?"+":""}${p.pnl.toFixed(2)}</Td></TRow>)}</tbody></table></Card>
    </>}
    {tab==="analytics"&&<>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        <Stat label="Closed P/L" value={`$${$(ANALYTICS.longPL+ANALYTICS.shortPL)}`} color={V.g} icon="$"/>
        <Stat label="Total Trades" value={ANALYTICS.tt} color={V.p} icon="≡"/>
        <Stat label="Win Rate" value={`${ANALYTICS.wr}%`} color={V.g} icon="%"/>
        <Stat label="Profit Factor" value={ANALYTICS.pf.toFixed(2)} color={V.p} icon="↗"/>
        <Stat label="Max Drawdown" value={`-$${Math.abs(ANALYTICS.maxDD).toLocaleString()}`} color={V.r} icon="↓"/>
        <Stat label="Sharpe" value={ANALYTICS.sharpe.toFixed(2)} color={V.g} icon="σ"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card><CH title="Long / Short Split"/><div style={{padding:"20px",display:"flex",alignItems:"center",justifyContent:"center",gap:20}}>
          <svg width={100} height={100} viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke={V.bdL} strokeWidth="10"/><circle cx="50" cy="50" r="40" fill="none" stroke={V.p} strokeWidth="10" strokeDasharray={`${(ANALYTICS.longC/ANALYTICS.tt)*251} 251`} strokeLinecap="round" transform="rotate(-90 50 50)"/><text x="50" y="48" textAnchor="middle" style={{fontSize:12,fontWeight:700,fill:V.t}}>{ANALYTICS.tt}</text><text x="50" y="60" textAnchor="middle" style={{fontSize:8,fill:V.f}}>trades</text></svg>
          <div><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><Pip c={V.p}/><span style={{fontSize:12}}>Long: <b>{ANALYTICS.longC}</b></span></div><div style={{display:"flex",alignItems:"center",gap:6}}><Pip c={V.pk}/><span style={{fontSize:12}}>Short: <b>{ANALYTICS.shortC}</b></span></div></div>
        </div></Card>
        <Card><CH title="P&L by Direction"/><div style={{padding:"20px",display:"flex",flexDirection:"column",gap:14}}>
          <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:V.m}}>Long</span><span style={{fontSize:13,fontWeight:700,color:V.g}}>+${ANALYTICS.longPL.toLocaleString()}</span></div><div style={{height:7,background:V.bdL,borderRadius:4}}><div style={{height:"100%",width:`${(ANALYTICS.longPL/(ANALYTICS.longPL+Math.abs(ANALYTICS.shortPL)))*100}%`,background:V.g,borderRadius:4}}/></div></div>
          <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,color:V.m}}>Short</span><span style={{fontSize:13,fontWeight:700,color:V.r}}>-${Math.abs(ANALYTICS.shortPL).toLocaleString()}</span></div><div style={{height:7,background:V.bdL,borderRadius:4}}><div style={{height:"100%",width:`${(Math.abs(ANALYTICS.shortPL)/(ANALYTICS.longPL+Math.abs(ANALYTICS.shortPL)))*100}%`,background:V.r,borderRadius:4}}/></div></div>
        </div></Card>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        <Card><CH title="Daily KPIs"/><div style={{padding:"12px 16px"}}>{[["Trading Days",ANALYTICS.days],["Avg Daily Vol",`$${(ANALYTICS.avgVol/1e3).toFixed(1)}K`],["Max Consec Wins",ANALYTICS.maxCW],["Max Consec Losses",ANALYTICS.maxCL]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:12}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div></Card>
        <Card><CH title="Averages"/><div style={{padding:"12px 16px"}}>{[["Avg Win",`+$${ANALYTICS.avgW}`],["Avg Loss",`-$${Math.abs(ANALYTICS.avgL)}`],["Best Day",`+$${ANALYTICS.best.toLocaleString()}`],["Worst Day",`-$${Math.abs(ANALYTICS.worst).toLocaleString()}`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:12}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:v.startsWith("+")?V.g:V.r}}>{v}</span></div>)}</div></Card>
        <Card><CH title="Risk & Ratios"/><div style={{padding:"12px 16px"}}>{[["Sharpe",ANALYTICS.sharpe.toFixed(3)],["Profit Factor",ANALYTICS.pf.toFixed(2)],["Max DD",`-$${Math.abs(ANALYTICS.maxDD).toLocaleString()}`],["Win Rate",`${ANALYTICS.wr}%`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:12}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div></Card>
      </div>
      <Card><CH title="Recent Trades" right={<Tag c={V.f}>{TRADES.length}</Tag>}/><table><thead><tr>{["ID","Symbol","Dir","Lots","P&L","Duration","Date"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{TRADES.map(t=><TRow key={t.id}><Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{t.id}</Td><Td s={{fontWeight:700,color:V.t}}>{t.sym}</Td><Td><Tag c={t.dir==="Buy"?V.g:V.r}>{t.dir}</Tag></Td><Td s={{fontFamily:"monospace"}}>{t.lots.toFixed(2)}</Td><Td s={{fontFamily:"monospace",fontWeight:700,color:t.pnl>=0?V.g:V.r}}>{t.pnl>=0?"+":""}${Math.abs(t.pnl).toFixed(2)}</Td><Td>{t.dur}</Td><Td s={{color:V.f}}>{t.dt}</Td></TRow>)}</tbody></table></Card>
    </>}
  </div>;
}

function PgPayouts(){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Withdrawn" value={`$${(PAYOUTS.filter(p=>p.status==="Completed").reduce((s,p)=>s+p.amount,0)).toLocaleString()}`} color={V.g} icon="$"/>
      <Stat label="Pending" value={`$${(PAYOUTS.filter(p=>p.status==="Processing").reduce((s,p)=>s+p.amount,0)).toLocaleString()}`} color={V.a} icon="⏳"/>
      <Stat label="Profit Split" value="80%" color={V.p} icon="%"/>
      <Stat label="Payout Cycle" value="Bi-weekly" color={V.b} icon="↻"/>
    </div>
    <Card><CH title="Payout History" right={<Btn primary>Request Payout</Btn>}/><table><thead><tr>{["ID","Account","Amount","Split","Method","Status","Date","Processing"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{PAYOUTS.map(p=><TRow key={p.id}><Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{p.id}</Td><Td s={{fontSize:12}}>{p.account}</Td><Td s={{fontWeight:700,color:V.g,fontFamily:"monospace"}}>${p.amount.toLocaleString()}</Td><Td>{p.split}</Td><Td>{p.method}</Td><Td><Tag c={p.status==="Completed"?V.g:p.status==="Processing"?V.a:V.r}>{p.status}</Tag></Td><Td s={{color:V.f,fontSize:12}}>{p.date}</Td><Td s={{fontSize:12}}>{p.processed}</Td></TRow>)}</tbody></table></Card>
  </div>;
}

function PgPlatforms(){
  const platforms=[{name:"MetaTrader 5",desc:"Industry standard for forex and CFD trading",status:"Connected",icon:"MT5"},{name:"cTrader",desc:"Advanced charting and algorithmic trading",status:"Available",icon:"cT"},{name:"Match-Trader",desc:"Modern web-based trading platform",status:"Connected",icon:"MT"}];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{fontSize:14,color:V.m,lineHeight:1.7}}>Connect your trading accounts to supported platforms. Credentials are provided within 24 hours of challenge purchase.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {platforms.map(p=><Card key={p.name} s={{padding:24}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><div style={{width:44,height:44,borderRadius:10,background:V.pdim,border:`1px solid ${V.pbd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:V.p}}>{p.icon}</div><div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{p.name}</div><div style={{fontSize:11,color:V.f}}>{p.desc}</div></div></div><Tag c={p.status==="Connected"?V.g:V.a}>{p.status}</Tag></Card>)}
    </div>
    <Card s={{padding:20}}><div style={{fontSize:13,color:V.m,lineHeight:1.7}}>Need help connecting? Contact <span style={{color:V.p,fontWeight:600,cursor:"pointer"}}>Live Support</span> for assistance with platform setup and credential delivery.</div></Card>
  </div>;
}

function PgAffiliate(){
  const a=AFFILIATE;
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Clicks" value={a.clicks.toLocaleString()} color={V.b} icon="👁"/>
      <Stat label="Signups" value={a.signups} color={V.p} icon="◎"/>
      <Stat label="Conversion" value={a.conv} color={V.g} icon="%"/>
      <Stat label="Total Earned" value={`$${a.earned.toLocaleString()}`} color={V.g} icon="$"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card><CH title="Your Referral Link"/><div style={{padding:16}}><div style={{padding:"12px 14px",background:V.bg,borderRadius:8,border:`1px solid ${V.bd}`,fontFamily:"monospace",fontSize:12,color:V.p,wordBreak:"break-all"}}>{a.link}</div><div style={{marginTop:10,display:"flex",gap:8}}><Btn primary>Copy Link</Btn><Btn>Copy Code: {a.code}</Btn></div></div></Card>
      <Card><CH title="Affiliate Details"/><div style={{padding:"12px 16px"}}>{[["Tier",a.tier],["Commission Rate",a.rate],["Pending Payout",`$${a.pending}`],["Total Earned",`$${a.earned}`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div></Card>
    </div>
  </div>;
}

function PgLeaderboard(){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><CH title="Global Leaderboard" sub="Top funded traders by profit this month" right={<Tag c={V.p}>April 2026</Tag>}/><table><thead><tr>{["Rank","Trader","Profit","Win Rate","Trades","Max DD"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{LEADERBOARD.map((l,i)=><TRow key={i}><Td s={{fontWeight:800,color:i<3?V.p:V.m,fontSize:16}}>{l.rank}</Td><Td s={{fontWeight:700,color:V.t}}>{l.name}{i===2&&<Tag c={V.a} style={{marginLeft:8}}>You</Tag>}</Td><Td s={{fontWeight:700,color:V.g,fontFamily:"monospace"}}>${l.profit.toLocaleString()}</Td><Td>{l.wr}</Td><Td>{l.trades}</Td><Td s={{color:V.r}}>{l.dd}</Td></TRow>)}</tbody></table></Card>
  </div>;
}

function PgFAQs(){
  const[open,setOpen]=useState(null);
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {FAQS.map((f,i)=><Card key={i} s={{cursor:"pointer"}}><div onClick={()=>setOpen(open===i?null:i)} style={{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:14,fontWeight:600,color:V.t}}>{f.q}</span><span style={{fontSize:18,color:V.p,transform:open===i?"rotate(45deg)":"none",transition:"transform 0.2s"}}>+</span></div>{open===i&&<div style={{padding:"0 20px 16px",fontSize:13,color:V.m,lineHeight:1.8,borderTop:`1px solid ${V.bdL}`,paddingTop:14}}>{f.a}</div>}</Card>)}
  </div>;
}

function PgBilling(){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      <Stat label="Total Spent" value={`$${BILLING.filter(b=>b.status==="Paid").reduce((s,b)=>s+b.amount,0).toLocaleString()}`} color={V.p} icon="$"/>
      <Stat label="Active Challenges" value={ACCOUNTS.filter(a=>a.status==="active").length} color={V.g} icon="⊞"/>
      <Stat label="Refunds" value={`$${BILLING.filter(b=>b.status==="Refunded").reduce((s,b)=>s+b.amount,0)}`} color={V.a} icon="↩"/>
    </div>
    <Card><CH title="Billing History"/><table><thead><tr>{["Invoice","Description","Amount","Method","Status","Date"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{BILLING.map(b=><TRow key={b.id}><Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{b.id}</Td><Td s={{fontWeight:600,color:V.t}}>{b.desc}</Td><Td s={{fontFamily:"monospace",fontWeight:700}}>${b.amount}</Td><Td>{b.method}</Td><Td><Tag c={b.status==="Paid"?V.g:V.a}>{b.status}</Tag></Td><Td s={{color:V.f}}>{b.date}</Td></TRow>)}</tbody></table></Card>
  </div>;
}

function PgProfile(){
  const p=PROFILE;
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card><CH title="Personal Information"/><div style={{padding:"16px 20px"}}>{[["Display Name",p.name],["Email",p.email],["Phone",p.phone],["Country",p.country],["Member Since",p.joined]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div><div style={{padding:"12px 20px"}}><Btn>Edit Profile</Btn></div></Card>
      <Card><CH title="Security"/><div style={{padding:"16px 20px"}}>{[["KYC Status",p.kyc],["Two-Factor Auth",p.twofa]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><Tag c={v==="Verified"||v==="Enabled"?V.g:V.a}>{v}</Tag></div>)}</div><div style={{padding:"12px 20px",display:"flex",gap:8}}><Btn>Change Password</Btn><Btn>Manage 2FA</Btn></div></Card>
    </div>
  </div>;
}

function PgSupport(){
  const[msg,setMsg]=useState("");const[msgs,setMsgs]=useState([{from:"support",text:"Welcome to Vertex Funded support! How can we help you today?",time:"now"}]);
  const send=()=>{if(!msg.trim())return;setMsgs(prev=>[...prev,{from:"user",text:msg,time:"now"}]);setMsg("");setTimeout(()=>setMsgs(prev=>[...prev,{from:"support",text:"Thank you for reaching out. A support agent will respond shortly. Average response time is under 5 minutes.",time:"now"}]),1200);};
  return <Card s={{height:"calc(100vh - 160px)",display:"flex",flexDirection:"column"}}>
    <CH title="Live Support" sub="Average response time: < 5 minutes" right={<div style={{display:"flex",alignItems:"center",gap:6}}><Pip c={V.g} s={6}/><span style={{fontSize:11,color:V.g}}>Online</span></div>}/>
    <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"70%",padding:"10px 14px",borderRadius:12,background:m.from==="user"?V.p:V.bg,color:m.from==="user"?"#fff":V.t,fontSize:13,lineHeight:1.6}}>{m.text}</div></div>)}
    </div>
    <div style={{padding:12,borderTop:`1px solid ${V.bdL}`,display:"flex",gap:8}}>
      <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type your message..." style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t,background:V.bg}}/>
      <Btn primary onClick={send}>Send</Btn>
    </div>
  </Card>;
}

function PgNewChallenge({onClose}){
  const[type,setType]=useState(0);const[size,setSize]=useState(2);
  const ch=CHALLENGES[type];const sel=ch.sizes[size];
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
    <div style={{width:680,maxHeight:"90vh",background:V.sf,borderRadius:20,overflow:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
      <div style={{padding:"24px 28px",borderBottom:`1px solid ${V.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:18,fontWeight:800,color:V.t}}>New Challenge</div><button onClick={onClose} style={{background:"none",border:"none",fontSize:18,color:V.m,cursor:"pointer"}}>✕</button></div>
      <div style={{padding:"24px 28px"}}>
        <div style={{marginBottom:20}}><div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Challenge Type</div><div style={{display:"flex",gap:6}}>{CHALLENGES.map((c,i)=><button key={i} onClick={()=>{setType(i);setSize(2);}} style={{padding:"10px 20px",borderRadius:8,background:type===i?V.p:"transparent",color:type===i?"#fff":V.m,border:`1px solid ${type===i?V.p:V.bd}`,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{c.name}</button>)}</div></div>
        <div style={{marginBottom:24}}><div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Account Size</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{ch.sizes.map((s,i)=><button key={i} onClick={()=>setSize(i)} style={{padding:"10px 18px",borderRadius:8,background:size===i?V.p:"transparent",color:size===i?"#fff":V.m,border:`1px solid ${size===i?V.p:V.bd}`,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{s.s}</button>)}</div></div>
        <Card s={{marginBottom:20}}><div style={{padding:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><div style={{fontSize:11,color:V.f,textTransform:"uppercase",fontWeight:600}}>Selected</div><div style={{fontSize:24,fontWeight:800,color:V.t}}>{ch.name} · {sel.s}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:V.f}}>Price</div><div style={{fontSize:28,fontWeight:800,color:V.p}}>${sel.p}</div></div></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
            {[["Profit Target",ch.target],["Max DD",ch.dd],["Daily DD",ch.daily],["Min Days",ch.days],["Time Limit",ch.time],["Profit Split",ch.split],["Payouts",ch.payout],["Leverage","1:100"]].map(([k,v])=><div key={k} style={{padding:"10px 12px",background:V.bg,borderRadius:8,border:`1px solid ${V.bdL}`}}><div style={{fontSize:9,color:V.f,textTransform:"uppercase",fontWeight:600,marginBottom:4}}>{k}</div><div style={{fontSize:13,fontWeight:700,color:V.t}}>{v}</div></div>)}
          </div>
        </div></Card>
        <div style={{display:"flex",gap:10}}><Btn primary style={{flex:1,padding:"14px",fontSize:15}}>Purchase Challenge — ${sel.p}</Btn><Btn onClick={onClose} style={{padding:"14px 24px"}}>Cancel</Btn></div>
      </div>
    </div>
  </div>;
}

/* ═══ NAV ═══ */
const NAV=[
  {id:"accounts",label:"Accounts",icon:"⊞"},
  {id:"analytics",label:"Analytics",icon:"◎"},
  {id:"payouts",label:"Payouts",icon:"$"},
  {id:"platforms",label:"Platforms",icon:"□"},
  {id:"affiliate",label:"Affiliate",icon:"◈"},
  {id:"leaderboard",label:"Leaderboard",icon:"↗"},
  {id:"faqs",label:"FAQs",icon:"?"},
  {id:"billing",label:"Billing",icon:"≡"},
  {id:"profile",label:"My Profile",icon:"◉"},
  {id:"support",label:"Live Support",icon:"✉"},
];

const TITLES={accounts:"My Accounts",analytics:"Trade Analytics",payouts:"Payouts & Withdrawals",platforms:"Trading Platforms",affiliate:"Affiliate Program",leaderboard:"Leaderboard",faqs:"Frequently Asked Questions",billing:"Billing History",profile:"My Profile",support:"Live Support",detail:"Account Details",newchallenge:"New Challenge"};

/* ═══ APP ═══ */
export default function App(){
  const[page,setPage]=useState("accounts");
  const[detailId,setDetailId]=useState(null);
  const[showNew,setShowNew]=useState(false);

  const goDetail=(id)=>{setDetailId(id);setPage("detail");};
  const goBack=()=>{setDetailId(null);setPage("accounts");};

  return(
    <div style={{display:"flex",minHeight:"100vh",background:V.bg,fontFamily:'"Inter","DM Sans",system-ui,sans-serif',color:V.m}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${V.h};border-radius:2px}table{border-collapse:collapse;width:100%}button:focus,input:focus,textarea:focus{outline:none}`}</style>

      {/* SIDEBAR */}
      <aside style={{position:"fixed",top:0,left:0,bottom:0,width:220,background:V.sf,borderRight:`1px solid ${V.bd}`,display:"flex",flexDirection:"column",zIndex:100}}>
        <div style={{padding:"18px 16px",borderBottom:`1px solid ${V.bdL}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:16,fontWeight:800,color:V.t,letterSpacing:"-0.02em"}}>Vertex <span style={{color:V.p}}>Funded</span></div><div style={{fontSize:9,color:V.f,letterSpacing:"0.04em",textTransform:"uppercase"}}>Trader Portal</div>
          </div>
        </div>
        <div style={{padding:"10px 10px 4px"}}><button onClick={()=>setShowNew(true)} style={{width:"100%",padding:"10px",background:`linear-gradient(135deg,${V.p},${V.pm})`,color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 2px 12px ${V.pglow}`}}>+ New Challenge</button></div>
        <nav style={{flex:1,padding:"6px 8px",display:"flex",flexDirection:"column",gap:1,overflowY:"auto"}}>
          {NAV.map(n=>{const act=page===n.id||(page==="detail"&&n.id==="accounts");return(
            <button key={n.id} onClick={()=>{setPage(n.id);setDetailId(null);}}
              style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",borderRadius:8,background:act?V.pdim:"transparent",border:`1px solid ${act?V.pbd:"transparent"}`,color:act?V.p:V.m,fontSize:13,fontWeight:act?600:400,cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%",transition:"all 0.12s"}}>
              <span style={{fontSize:12,opacity:act?1:0.45,fontFamily:"monospace",width:16,textAlign:"center",flexShrink:0}}>{n.icon}</span>{n.label}
            </button>
          );})}
        </nav>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${V.bdL}`,fontSize:10,color:V.h}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><Pip c={V.g} s={5}/><span style={{color:V.f}}>All systems operational</span></div>
          <div>Powered by <span style={{color:V.p,fontWeight:600}}>ForexOpsPro</span></div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{marginLeft:220,flex:1,padding:"22px 26px 60px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div><div style={{fontSize:10,color:V.f,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{TITLES[page]||page}</div><h1 style={{fontSize:20,fontWeight:800,color:V.t,letterSpacing:"-0.02em",lineHeight:1}}>{TITLES[page]||page}</h1></div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{padding:"7px 14px",background:V.sf,border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,color:V.m,display:"flex",alignItems:"center",gap:6}}><Pip c={V.g} s={5}/>Live</div>
          </div>
        </div>

        {page==="accounts"&&!detailId&&<PgAccounts onSelect={goDetail}/>}
        {page==="detail"&&detailId&&<PgAccountDetail onBack={goBack}/>}
        {page==="analytics"&&<PgAccountDetail onBack={()=>setPage("accounts")}/>}
        {page==="payouts"&&<PgPayouts/>}
        {page==="platforms"&&<PgPlatforms/>}
        {page==="affiliate"&&<PgAffiliate/>}
        {page==="leaderboard"&&<PgLeaderboard/>}
        {page==="faqs"&&<PgFAQs/>}
        {page==="billing"&&<PgBilling/>}
        {page==="profile"&&<PgProfile/>}
        {page==="support"&&<PgSupport/>}
      </main>

      {showNew&&<PgNewChallenge onClose={()=>setShowNew(false)}/>}
    </div>
  );
}
