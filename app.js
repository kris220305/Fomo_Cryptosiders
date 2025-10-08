// ===== Mobile nav =====
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#mainnav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// ===== Build radio scales programmatically =====
const labels = ['STS','TS','SS','S'];
document.querySelectorAll('.scale').forEach(sc => {
  const name = sc.dataset.name;
  const labelsEl = document.createElement('div');
  labelsEl.className = 'labels';
  labelsEl.innerHTML = '<span>Sangat Tidak Sesuai</span>';
  const opts = document.createElement('div');
  opts.className = 'opts';
  labels.forEach((lab, i) => {
    const val = i + 1;
    const lbl = document.createElement('label');
    lbl.className = 'opt';
    lbl.innerHTML = `${lab} <input type="radio" name="${name}" value="${val}" aria-label="${lab}">`;
    opts.appendChild(lbl);
  });
  const far = document.createElement('div');
  far.className = 'labels';
  far.innerHTML = '<span>Sangat Sesuai</span>';
  sc.appendChild(labelsEl);
  sc.appendChild(opts);
  sc.appendChild(far);
});

// ===== Calculator =====
const btn = document.getElementById('calc');
const result = document.getElementById('result');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const descEl = document.getElementById('desc');

btn?.addEventListener('click', () => {
  const totalQ = 9;
  let total = 0;
  for(let i=1;i<=totalQ;i++){
    const picked = document.querySelector(`input[name="q${i}"]:checked`);
    if(!picked){ alert('Masih ada pertanyaan yang belum dijawab.'); return; }
    total += parseInt(picked.value);
  }
  scoreEl.textContent = String(total);

  // Threshold default 22 (dapat disesuaikan)
  const threshold = 22;
  if(total > threshold){
    levelEl.textContent = 'High FOMO';
    levelEl.className = 'tag high';
    descEl.textContent = 'Kecenderungan FOMO tinggi. Hindari keputusan impulsif; gunakan rencana entry/exit, batasi paparan berita berlebihan, dan tetapkan ukuran posisi yang jelas.';
  } else {
    levelEl.textContent = 'Low FOMO';
    levelEl.className = 'tag low';
    descEl.textContent = 'Kecenderungan FOMO rendah. Pertahankan disiplin riset dan risk management—tetap evaluasi strategi secara berkala.';
  }
  result.style.display = 'block';
  document.getElementById('preview-score').textContent = total;
  result.scrollIntoView({behavior:'smooth'});
});
