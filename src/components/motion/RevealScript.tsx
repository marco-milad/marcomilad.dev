/**
 * Arms the entrance cascade, inline, before the page below it is parsed.
 *
 * It has to run here rather than in the observer island: hiding elements from
 * an effect would mean painting them first and then pulling them away, which
 * is a visible flash. Setting one attribute during parse means they are hidden
 * from the very first frame instead.
 *
 * It is also the failsafe. If the bundle never arrives — blocked, stale
 * service worker, a parse error — the observer never reports in, the attribute
 * comes back off, and every element falls to its resting state. The site is
 * readable either way; only the motion is lost.
 */
// The failsafe is timed from load rather than from parse. A slow connection
// should not quietly switch the motion off just because hydration took a
// while; a bundle that never arrives at all still self-heals a moment later.
const ARM = `(function(){var d=document.documentElement;try{if(!('IntersectionObserver' in window))return;if(!window.matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.setAttribute('data-reveal-armed','');var f=function(){setTimeout(function(){if(!window.__revealsActive)d.removeAttribute('data-reveal-armed')},2500)};if(document.readyState==='complete')f();else window.addEventListener('load',f)}catch(e){d.removeAttribute('data-reveal-armed')}})()`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: ARM }} />;
}
