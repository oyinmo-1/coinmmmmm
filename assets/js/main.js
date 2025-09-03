// Simple front-end helpers
function performSearch() {
  const q = document.getElementById('searchBox').value.trim();
  if (!q) { alert('Enter a search term'); return; }
  window.location = 'faq.html#' + encodeURIComponent(q.toLowerCase().replace(/\s+/g,'-'));
}

document.addEventListener('DOMContentLoaded', () => {
  const status = document.getElementById('statusTime');
  if (status) status.textContent = new Date().toLocaleString();

  // Populate mock tickets
  const tbody = document.getElementById('ticketsBody');
  if (tbody) {
    const rows = [
      {id:'#4821', subject:'2FA reset request', pri:'High', st:'New', upd:'3m ago'},
      {id:'#4820', subject:'Withdrawal pending', pri:'Medium', st:'Open', upd:'12m ago'},
      {id:'#4819', subject:'Can’t verify ID', pri:'High', st:'New', upd:'22m ago'},
      {id:'#4818', subject:'Card declined at checkout', pri:'Low', st:'Solved', upd:'1h ago'}
    ];
    tbody.innerHTML = rows.map(r => (
      `<tr><td>${r.id}</td><td>${r.subject}</td><td>${r.pri}</td><td>${r.st}</td><td>${r.upd}</td></tr>`
    )).join('');
  }

  // Tiny canvas chart (no external libs)
  const c = document.getElementById('ticketsChart');
  if (c && c.getContext) {
    const ctx = c.getContext('2d');
    const data = [18, 24, 16, 29, 22, 31, 27];
    const w = c.width, h = c.height, pad = 40;
    const barW = (w - pad*2) / data.length * 0.6;
    const max = Math.max(...data);
    ctx.clearRect(0,0,w,h);
    ctx.font = '12px system-ui';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('Tickets (Last 7 days)', pad, 22);
    for (let i=0;i<data.length;i++) {
      const x = pad + i * ((w - pad*2)/data.length) + ((w - pad*2)/data.length - barW)/2;
      const y = h - pad;
      const bh = (h - pad*2) * (data[i]/max);
      // grid line
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath(); ctx.moveTo(pad, y - (h - pad*2)*(i/ data.length)); ctx.lineTo(w-pad, y - (h - pad*2)*(i/ data.length)); ctx.stroke();
      // bar
      const grad = ctx.createLinearGradient(0, y, 0, y - bh);
      grad.addColorStop(0, '#1652F0'); grad.addColorStop(1, '#5a84ff');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y - bh, barW, bh);
    }
    // axes
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.moveTo(pad, pad); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad, h - pad); ctx.stroke();
  }
});
