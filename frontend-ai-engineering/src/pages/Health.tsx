import { Fragment, useEffect, useState } from 'react';
type HealthPayload = { service: string; status: string; version: string; source: string; checks: Record<string,string> };
type State = { kind:'loading' } | { kind:'error'; message: string } | { kind:'ready'; data: HealthPayload };
export function Health() {
 const [state,setState]=useState<State>({kind:'loading'});
 useEffect(()=>{const controller=new AbortController();
  fetch(`${import.meta.env.BASE_URL}health.json`,{signal:controller.signal,cache:'no-store'})
  .then(async response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return await response.json() as HealthPayload;})
  .then(data=>setState({kind:'ready',data}))
  .catch((error:unknown)=>{if(!controller.signal.aborted)setState({kind:'error',message:error instanceof Error?error.message:'Unknown error'});});
  return ()=>controller.abort();
 },[]);
 return <><header className="page-title"><span className="eyebrow">RUNTIME CHECK</span><h1>Health check</h1><p>Fetches a real JSON asset over HTTP and displays the response. This does not verify a live backend.</p></header><section className="panel" aria-live="polite">
 {state.kind==='loading'&&<p role="status">Loading response…</p>}
 {state.kind==='error'&&<div role="alert"><h2>Fetch failed</h2><p>{state.message}</p></div>}
 {state.kind==='ready'&&<><span className="pill success">{state.data.status}</span><h2>{state.data.service}</h2><dl className="kv"><dt>Version</dt><dd>{state.data.version}</dd><dt>Source</dt><dd>{state.data.source}</dd>{Object.entries(state.data.checks).map(([key,value])=><Fragment key={key}><dt>{key}</dt><dd>{value}</dd></Fragment>)}</dl></>}
 </section></>;
}
