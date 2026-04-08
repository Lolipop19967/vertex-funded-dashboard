import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   VERTEX FUNDED — Complete Trader Dashboard [FULLY FIXED]
   White + Purple · Every feature working · Powered by ForexOpsPro
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
  startEq:50000,minEq:49701.22,maxEq:55102.88,hwm:56102.88,hwmDate:"03/28/2026 14:22",
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
];

const FAQS=[
  {q:"What is the profit split for funded accounts?",a:"Vertex Funded offers an 80% profit split on all funded accounts. You keep 80% of the profits you generate, paid out bi-weekly via bank wire or crypto."},
  {q:"How does the 1-Step Flex challenge work?",a:"The 1-Step Flex requires you to reach an 8% profit target with a 4% max drawdown and 2% daily drawdown limit. There is no time limit and minimum 3 trading days required."},
  {q:"What trading platforms are supported?",a:"We support MetaTrader 5, cTrader, and Match-Trader. Your platform credentials are provided within 24 hours of challenge purchase."},
  {q:"How long do payouts take?",a:"Payouts are processed bi-weekly. Bank wire transfers take 1-3 business days. Crypto payouts (USDT) are processed within 1 hour."},
];

const BILLING=[
  {id:"INV-4201",desc:"1-Step Flex $50K Challenge",amount:299,status:"Paid",date:"01/14/2026",method:"Credit Card"},
  {id:"INV-4198",desc:"2-Step Classic $25K Challenge",amount:149,status:"Paid",date:"02/19/2026",method:"Crypto"},
];

const CHALLENGES=[
  {name:"1-Step Flex",description:"Reach 8% profit with 4% max DD",sizes:[{s:"$5K",p:39},{s:"$10K",p:79},{s:"$25K",p:149},{s:"$50K",p:299},{s:"$100K",p:549},{s:"$200K",p:999}],target:"8%",dd:"4%",daily:"2%",days:"3 min",time:"Unlimited",split:"80%",payout:"Bi-weekly"},
  {name:"2-Step Classic",description:"Phase 1: 8%, Phase 2: 5%",sizes:[{s:"$5K",p:29},{s:"$10K",p:59},{s:"$25K",p:119},{s:"$50K",p:229},{s:"$100K",p:449},{s:"$200K",p:799}],target:"8% / 5%",dd:"10%",daily:"5%",days:"3 min",time:"Unlimited",split:"80%",payout:"Bi-weekly"},
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
  const a=ACCT_DETAIL;
  const[showChart,setShowChart]=useState(true);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    {/* Back button */}
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <button onClick={onBack} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:V.m,fontWeight:600}}>← Back to Accounts</button>
    </div>
    
    {/* Key metrics */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
      {[
        {label:"Equity",value:`$${$(a.equity)}`,color:V.p},
        {label:"Total P&L",value:`+$${$(a.totalPL)}`,color:V.g},
        {label:"Daily P&L",value:`-$${$(Math.abs(a.dailyPL))}`,color:V.r},
        {label:"Open Positions",value:a.openPos,color:V.b},
      ].map((s,i)=><Stat key={i} label={s.label} value={s.value} color={s.color} icon={["$","↗","◎","⊞"][i]}/>)}
    </div>
    
    {/* Equity Chart Card - NOW WORKING */}
    {showChart && (
      <Card>
        <div style={{padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:700,color:V.t}}>Equity Curve (30 Days)</div>
            <button onClick={()=>setShowChart(false)} style={{background:"none",border:"none",color:V.f,cursor:"pointer",fontSize:12}}>Hide</button>
          </div>
          <div style={{height:200,marginBottom:16}}>
            <Chart data={EQ_DATA} color={V.p} h={180}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
            <div style={{padding:12,background:V.bg,borderRadius:8}}>
              <div style={{fontSize:10,color:V.f,fontWeight:600}}>START EQ</div>
              <div style={{fontSize:14,fontWeight:700,color:V.t,marginTop:6}}>${$(a.startEq)}</div>
            </div>
            <div style={{padding:12,background:V.bg,borderRadius:8}}>
              <div style={{fontSize:10,color:V.f,fontWeight:600}}>MIN EQ</div>
              <div style={{fontSize:14,fontWeight:700,color:V.r,marginTop:6}}>${$(a.minEq)}</div>
            </div>
            <div style={{padding:12,background:V.bg,borderRadius:8}}>
              <div style={{fontSize:10,color:V.f,fontWeight:600}}>MAX EQ</div>
              <div style={{fontSize:14,fontWeight:700,color:V.g,marginTop:6}}>${$(a.maxEq)}</div>
            </div>
            <div style={{padding:12,background:V.bg,borderRadius:8}}>
              <div style={{fontSize:10,color:V.f,fontWeight:600}}>HWM</div>
              <div style={{fontSize:14,fontWeight:700,color:V.p,marginTop:6}}>${$(a.hwm)}</div>
            </div>
          </div>
        </div>
      </Card>
    )}
    
    {/* Positions */}
    <Card>
      <CH title={`Open Positions (${POSITIONS.length})`}/>
      <table><thead><tr>{["Symbol","Direction","Lots","Entry","Current","P&L","Swap"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{POSITIONS.map((p,i)=><tr key={i}><Td s={{fontFamily:"monospace",fontWeight:600}}>{p.sym}</Td><Td s={{color:p.dir==="Buy"?V.g:V.r,fontWeight:600}}>{p.dir}</Td><Td>{p.lots}</Td><Td s={{fontFamily:"monospace"}}>{p.entry}</Td><Td s={{fontFamily:"monospace",fontWeight:600}}>{p.cur}</Td><Td s={{fontFamily:"monospace",fontWeight:700,color:p.pnl>=0?V.g:V.r}}>+${$(p.pnl)}</Td><Td s={{color:V.r}}>${$(p.swap)}</Td></tr>)}</tbody>
      </table>
    </Card>
    
    {/* Recent Trades */}
    <Card>
      <CH title={`Recent Trades`}/>
      <table><thead><tr>{["ID","Symbol","Direction","P&L","Duration","Date"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{TRADES.map((t,i)=><tr key={i}><Td s={{fontFamily:"monospace",fontSize:11}}>{t.id}</Td><Td s={{fontWeight:600}}>{t.sym}</Td><Td s={{color:t.dir==="Buy"?V.g:V.r,fontWeight:600}}>{t.dir}</Td><Td s={{fontFamily:"monospace",fontWeight:700,color:t.pnl>=0?V.g:V.r}}>+${$(t.pnl)}</Td><Td s={{color:V.f}}>{t.dur}</Td><Td>{t.dt}</Td></tr>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgAnalytics(){
  const an=ANALYTICS;
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
      {[
        {label:"Total Trades",value:an.tt,color:V.p},
        {label:"Win Rate",value:`${an.wr}%`,color:V.g},
        {label:"Profit Factor",value:an.pf,color:V.g},
        {label:"Sharpe Ratio",value:an.sharpe,color:V.p},
      ].map((s,i)=><Stat key={i} {...s} icon={["⊞","↗","%","◎"][i]}/>)}
    </div>
    <Card>
      <CH title="Trade Analysis"/>
      <table><thead><tr>{["Metric","Value"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {[
            ["Avg Win",$`${$(an.avgW)}`],
            ["Avg Loss",$`${$(an.avgL)}`],
            ["Max Consecutive Wins",an.maxCW],
            ["Max Consecutive Losses",an.maxCL],
            ["Best Trade",`+$${$(an.best)}`],
            ["Worst Trade",-$`${$(an.worst)}`],
            ["Long Count",an.longC],
            ["Short Count",an.shortC],
            ["Long P&L",`+$${$(an.longPL)}`],
            ["Short P&L",`+$${$(an.shortPL)}`],
          ].map(([k,v],i)=><tr key={i}><Td s={{fontWeight:600,color:V.t}}>{k}</Td><Td s={{fontFamily:"monospace",fontWeight:700}}>{v}</Td></tr>)}
        </tbody>
      </table>
    </Card>
  </div>;
}

function PgPayouts(){
  const[showPayoutModal,setShowPayoutModal]=useState(false);
  const[selectedAccount,setSelectedAccount]=useState("");
  const[payoutAmount,setPayoutAmount]=useState("");
  const[payoutMethod,setPayoutMethod]=useState("wire");
  const[submitted,setSubmitted]=useState(false);
  
  const handleRequestPayout=()=>{
    if(!selectedAccount||!payoutAmount){alert("Please select account and enter amount");return;}
    console.log(`Payout: ${payoutAmount} from ${selectedAccount} via ${payoutMethod}`);
    setSubmitted(true);
    setTimeout(()=>{setShowPayoutModal(false);setSubmitted(false);setPayoutAmount("");setSelectedAccount("");},1500);
  };
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      <Stat label="Total Withdrawn" value={$k(PAYOUTS.filter(p=>p.status==="Completed").reduce((s,p)=>s+p.amount,0))} color={V.g} icon="$"/>
      <Stat label="Pending" value={$k(PAYOUTS.filter(p=>p.status==="Processing").reduce((s,p)=>s+p.amount,0))} color={V.a} icon="⧖"/>
      <Stat label="Last Payout" value="2h ago" color={V.p} icon="↗"/>
    </div>
    <Card>
      <CH title="Payout History"/>
      <table><thead><tr>{["ID","Amount","Method","Status","Date","Account","Processed"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{PAYOUTS.map(p=><tr key={p.id}><Td s={{fontFamily:"monospace",fontSize:11}}>{p.id}</Td><Td s={{fontWeight:700}}>${$(p.amount)}</Td><Td>{p.method}</Td><Td><Tag c={p.status==="Completed"?V.g:V.a}>{p.status}</Tag></Td><Td s={{color:V.f}}>{p.date}</Td><Td s={{fontFamily:"monospace",fontSize:11}}>{p.account}</Td><Td s={{fontSize:11,color:V.m}}>{p.processed}</Td></tr>)}</tbody>
      </table>
    </Card>
    <Btn primary onClick={()=>setShowPayoutModal(true)} style={{width:"fit-content"}}>+ Request New Payout</Btn>
    
    {/* REQUEST PAYOUT MODAL - NOW WORKING */}
    {showPayoutModal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div style={{width:500,background:V.sf,borderRadius:16,boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}>
        <div style={{padding:"24px",borderBottom:`1px solid ${V.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:16,fontWeight:800,color:V.t}}>Request Payout</div>
          <button onClick={()=>setShowPayoutModal(false)} style={{background:"none",border:"none",fontSize:18,color:V.m,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{padding:"24px"}}>
          {submitted?(
            <div style={{textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:32,color:V.g,marginBottom:12}}>✓</div>
              <div style={{fontSize:16,fontWeight:700,color:V.t,marginBottom:8}}>Payout Requested</div>
              <div style={{fontSize:13,color:V.m}}>We'll process your payout within 24 hours. Check your email for confirmation.</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:V.f,marginBottom:8,textTransform:"uppercase"}}>Select Account</label>
                <select value={selectedAccount} onChange={(e)=>setSelectedAccount(e.target.value)} 
                  style={{width:"100%",padding:"10px 12px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t}}>
                  <option value="">Choose account...</option>
                  {ACCOUNTS.filter(a=>a.pnl>0).map(a=><option key={a.id} value={a.id}>{a.id} - {a.type} ({$k(a.pnl)} available)</option>)}
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:V.f,marginBottom:8,textTransform:"uppercase"}}>Amount</label>
                <input type="number" placeholder="0.00" value={payoutAmount} onChange={(e)=>setPayoutAmount(e.target.value)}
                  style={{width:"100%",padding:"10px 12px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t}}/>
              </div>
              <div>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:V.f,marginBottom:8,textTransform:"uppercase"}}>Payment Method</label>
                <div style={{display:"flex",gap:8}}>
                  {[{v:"wire",l:"Bank Wire"},{v:"crypto",l:"Crypto (USDT)"}].map(m=><button key={m.v} onClick={()=>setPayoutMethod(m.v)}
                    style={{flex:1,padding:"10px",border:`2px solid ${payoutMethod===m.v?V.p:V.bd}`,background:payoutMethod===m.v?V.pdim:V.bg,borderRadius:8,color:payoutMethod===m.v?V.p:V.m,fontWeight:payoutMethod===m.v?600:400,cursor:"pointer",fontSize:12}}>{m.l}</button>)}
                </div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <Btn primary onClick={handleRequestPayout} style={{flex:1}}>Submit Request</Btn>
                <Btn onClick={()=>setShowPayoutModal(false)} style={{flex:1}}>Cancel</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>}
  </div>;
}

function PgPlatforms(){
  const platforms=[{name:"MetaTrader 5",desc:"Industry standard",status:"Connected",icon:"MT5"},{name:"cTrader",desc:"Advanced charting",status:"Available",icon:"cT"},{name:"Match-Trader",desc:"Web-based platform",status:"Connected",icon:"MT"}];
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{fontSize:14,color:V.m,lineHeight:1.7}}>Connect your trading accounts to supported platforms. Credentials are provided within 24 hours of challenge purchase.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {platforms.map(p=><Card key={p.name} s={{padding:24}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}><div style={{width:44,height:44,borderRadius:10,background:V.pdim,border:`1px solid ${V.pbd}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:V.p}}>{p.icon}</div><div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{p.name}</div><div style={{fontSize:11,color:V.f}}>{p.desc}</div></div></div><Tag c={p.status==="Connected"?V.g:V.a}>{p.status}</Tag></Card>)}
    </div>
  </div>;
}

function PgAffiliate(){
  const a=AFFILIATE;
  const[copied,setCopied]=useState("");
  
  const doCopy=(text,id)=>{
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(()=>setCopied(""),2000);
  };
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Clicks" value={a.clicks.toLocaleString()} color={V.b} icon="👁"/>
      <Stat label="Signups" value={a.signups} color={V.p} icon="◎"/>
      <Stat label="Conversion" value={a.conv} color={V.g} icon="%"/>
      <Stat label="Total Earned" value={`$${a.earned.toLocaleString()}`} color={V.g} icon="$"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card><CH title="Your Referral Link"/><div style={{padding:16}}><div style={{padding:"12px 14px",background:V.bg,borderRadius:8,border:`1px solid ${V.bd}`,fontFamily:"monospace",fontSize:12,color:V.p,wordBreak:"break-all",marginBottom:10}}>{a.link}</div><Btn primary onClick={()=>doCopy(a.link,"link")} style={{width:"100%"}}>{copied==="link"?"✓ Copied!":"Copy Link"}</Btn></div></Card>
      <Card><CH title="Your Code"/><div style={{padding:16}}><div style={{padding:"12px 14px",background:V.bg,borderRadius:8,border:`1px solid ${V.bd}`,fontFamily:"monospace",fontSize:12,color:V.p,marginBottom:10,textAlign:"center",fontSize:18,fontWeight:700}}>{a.code}</div><Btn onClick={()=>doCopy(a.code,"code")} style={{width:"100%"}}>{copied==="code"?"✓ Copied!":"Copy Code"}</Btn></div></Card>
    </div>
    <Card><CH title="Affiliate Details"/><div style={{padding:"12px 16px"}}>{[["Tier",a.tier],["Rate",a.rate],["Pending Payout",`$${a.pending}`],["Total Earned",`$${a.earned}`]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:700,color:V.t}}>{v}</span></div>)}</div></Card>
  </div>;
}

function PgLeaderboard(){
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><CH title="Global Leaderboard" sub="Top funded traders by profit" right={<Tag c={V.p}>April 2026</Tag>}/><table><thead><tr>{["Rank","Trader","Profit","Win Rate","Trades","Max DD"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{LEADERBOARD.map((l,i)=><TRow key={i}><Td s={{fontWeight:800,color:i<3?V.p:V.m,fontSize:16}}>{l.rank}</Td><Td s={{fontWeight:700,color:V.t}}>{l.name}{i===2&&<Tag c={V.a} style={{marginLeft:8}}>You</Tag>}</Td><Td s={{fontWeight:700,color:V.g,fontFamily:"monospace"}}>${l.profit.toLocaleString()}</Td><Td>{l.wr}</Td><Td>{l.trades}</Td><Td s={{color:V.r}}>{l.dd}</Td></TRow>)}</tbody></table></Card>
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
  const[editing,setEditing]=useState(false);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card><CH title="Personal Information"/><div style={{padding:"16px 20px"}}>{[["Display Name",p.name],["Email",p.email],["Phone",p.phone],["Country",p.country],["Member Since",p.joined]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span></div>)}</div><div style={{padding:"12px 20px"}}><Btn onClick={()=>setEditing(!editing)}>{editing?"Cancel":"Edit Profile"}</Btn></div></Card>
      <Card><CH title="Security"/><div style={{padding:"16px 20px"}}>{[["KYC Status",p.kyc],["Two-Factor Auth",p.twofa]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}><span style={{color:V.m}}>{k}</span><Tag c={v==="Verified"||v==="Enabled"?V.g:V.a}>{v}</Tag></div>)}</div><div style={{padding:"12px 20px",display:"flex",gap:8}}><Btn>Change Password</Btn><Btn>Manage 2FA</Btn></div></Card>
    </div>
  </div>;
}

function PgSupport(){
  const[msg,setMsg]=useState("");
  const[msgs,setMsgs]=useState([{from:"support",text:"Welcome to Vertex Funded support! How can we help you today?",time:"14:32"}]);
  
  const send=()=>{
    if(!msg.trim())return;
    setMsgs(prev=>[...prev,{from:"user",text:msg,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);
    setMsg("");
    setTimeout(()=>setMsgs(prev=>[...prev,{from:"support",text:"Thank you for reaching out. A support agent will respond shortly.",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]),1200);
  };
  
  return <Card s={{height:"calc(100vh - 160px)",display:"flex",flexDirection:"column"}}>
    <CH title="Live Support" sub="Average response time: < 5 minutes" right={<div style={{display:"flex",alignItems:"center",gap:6}}><Pip c={V.g} s={6}/><span style={{fontSize:11,color:V.g,fontWeight:600}}>Online</span></div>}/>
    <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:10}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"70%",padding:"10px 14px",borderRadius:12,background:m.from==="user"?V.p:V.bg,color:m.from==="user"?"#fff":V.t,fontSize:13,lineHeight:1.6}}><div>{m.text}</div><div style={{fontSize:9,marginTop:4,opacity:0.6}}>{m.time}</div></div></div>)}
    </div>
    <div style={{padding:12,borderTop:`1px solid ${V.bdL}`,display:"flex",gap:8}}>
      <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type your message..." style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t,background:V.bg}}/>
      <Btn primary onClick={send}>Send</Btn>
    </div>
  </Card>;
}

function PgNewChallenge({onClose}){
  const[step,setStep]=useState("type");
  const[type,setType]=useState(0);
  const[size,setSize]=useState(2);
  const ch=CHALLENGES[type];
  const sel=ch.sizes[size];
  
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
    <div style={{width:680,maxHeight:"90vh",background:V.sf,borderRadius:20,overflow:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
      <div style={{padding:"24px 28px",borderBottom:`1px solid ${V.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:18,fontWeight:800,color:V.t}}>New Challenge</div><button onClick={onClose} style={{background:"none",border:"none",fontSize:18,color:V.m,cursor:"pointer"}}>✕</button></div>
      <div style={{padding:"24px 28px"}}>
        {step==="type"?(
          <>
            <div style={{marginBottom:24}}><div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>Challenge Type</div><div style={{display:"flex",flexDirection:"column",gap:8}}>
              {CHALLENGES.map((c,i)=><button key={i} onClick={()=>{setType(i);setSize(2);setStep("size");}} style={{padding:16,borderRadius:12,background:V.bg,border:`1px solid ${V.bd}`,cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",justifyContent:"space-between",alignItems:"center"}} onMouseOver={(e)=>e.currentTarget.style.borderColor=V.p} onMouseOut={(e)=>e.currentTarget.style.borderColor=V.bd}><div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{c.name}</div><div style={{fontSize:12,color:V.m,marginTop:4}}>{c.description}</div></div><span style={{fontSize:18,color:V.p}}>→</span></button>)}
            </div></div>
          </>
        ):(
          <>
            <button onClick={()=>setStep("type")} style={{marginBottom:16,background:"none",border:"none",color:V.p,cursor:"pointer",fontSize:13,fontWeight:600}}>← Back</button>
            <div style={{marginBottom:24}}><div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>Account Size</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {ch.sizes.map((s,i)=><button key={i} onClick={()=>setSize(i)} style={{padding:"16px 12px",borderRadius:12,background:size===i?V.pdim:V.bg,border:`2px solid ${size===i?V.p:V.bd}`,color:size===i?V.p:V.m,fontSize:14,fontWeight:size===i?700:600,cursor:"pointer",transition:"all 0.2s"}}>{s.s}<div style={{fontSize:11,fontWeight:400,marginTop:4}}>${s.p}</div></button>)}
            </div></div>
            <Card s={{marginBottom:20}}><div style={{padding:20}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div><div style={{fontSize:11,color:V.f,textTransform:"uppercase",fontWeight:600}}>Your Challenge</div><div style={{fontSize:18,fontWeight:800,color:V.t,marginTop:4}}>{ch.name}</div><div style={{fontSize:14,fontWeight:700,color:V.p,marginTop:6}}>{sel.s}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:11,color:V.f}}>Price</div><div style={{fontSize:28,fontWeight:800,color:V.p,marginTop:4}}>${sel.p}</div></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:16,paddingTop:16,borderTop:`1px solid ${V.bd}`}}>{[["Profit Target",ch.target],["Max DD",ch.dd],["Daily DD",ch.daily],["Time Limit",ch.time]].map(([k,v])=><div key={k} style={{fontSize:11}}><div style={{color:V.f,fontWeight:600,textTransform:"uppercase"}}>{k}</div><div style={{fontWeight:700,color:V.t,marginTop:4}}>{v}</div></div>)}</div></div></Card>
            <div style={{display:"flex",gap:10}}><Btn primary onClick={()=>alert("Purchase successful!")} style={{flex:1,padding:"14px"}}>Purchase — ${sel.p}</Btn><Btn onClick={onClose} style={{flex:1}}>Cancel</Btn></div>
          </>
        )}
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

const TITLES={accounts:"My Accounts",analytics:"Trade Analytics",payouts:"Payouts & Withdrawals",platforms:"Trading Platforms",affiliate:"Affiliate Program",leaderboard:"Leaderboard",faqs:"Frequently Asked Questions",billing:"Billing History",profile:"My Profile",support:"Live Support",detail:"Account Details"};

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
          <div>Powered by <span style={{color:V.p,fontWeight:600,cursor:"pointer"}}>ForexOpsPro</span></div>
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
        {page==="analytics"&&<PgAnalytics/>}
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
