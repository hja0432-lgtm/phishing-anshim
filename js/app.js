// ===== 피싱안심 공통 스크립트 =====

// 오디오 재생 컨트롤 (한 번에 하나만 재생) - 투명 버튼(.hotspot) 위에 얹어서 사용
let currentAudio = null;
let currentBtn = null;

function fmtTime(sec){
  if (!isFinite(sec)) return '';
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function setStatus(statusEl, html){
  if (!statusEl) return;
  if (html === null) {
    statusEl.classList.remove('show');
    statusEl.innerHTML = '';
  } else {
    statusEl.innerHTML = html;
    statusEl.classList.add('show');
  }
}

function setupAudioButton(btn){
  if (btn.dataset.audioBound) return; // 중복 연결 방지
  btn.dataset.audioBound = '1';

  const src = btn.getAttribute('data-audio');
  if (!src) return;
  const statusEl = document.getElementById(btn.getAttribute('data-status-for'));

  btn.addEventListener('click', (e) => {
    e.preventDefault();

    // 이미 재생중인 버튼을 다시 누르면 정지
    if (currentBtn === btn && currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      btn.classList.remove('playing');
      setStatus(statusEl, null);
      currentAudio = null;
      currentBtn = null;
      return;
    }

    // 다른 오디오가 재생중이면 정지
    if (currentAudio) {
      currentAudio.pause();
      if (currentBtn) {
        currentBtn.classList.remove('playing');
        setStatus(document.getElementById(currentBtn.getAttribute('data-status-for')), null);
      }
    }

    const audio = new Audio(src);
    currentAudio = audio;
    currentBtn = btn;

    btn.classList.add('playing');
    setStatus(statusEl, '<span class="dot"></span> 재생 중입니다 · 다시 누르면 정지');
    if (statusEl && statusEl.scrollIntoView) {
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    audio.addEventListener('timeupdate', () => {
      if (isFinite(audio.duration)) {
        setStatus(statusEl, `<span class="dot"></span> 재생 중 ${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)} · 다시 누르면 정지`);
      }
    });

    audio.addEventListener('ended', () => {
      btn.classList.remove('playing');
      setStatus(statusEl, null);
      currentAudio = null;
      currentBtn = null;
    });

    audio.addEventListener('error', () => {
      setStatus(statusEl, '음성 파일을 불러올 수 없습니다');
      btn.classList.remove('playing');
      currentAudio = null;
      currentBtn = null;
    });

    audio.play().catch(() => {
      setStatus(statusEl, '재생 버튼을 다시 눌러주세요');
      btn.classList.remove('playing');
      currentAudio = null;
      currentBtn = null;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-audio]').forEach(setupAudioButton);
});

// ===== 이미지가 화면 높이에 맞춰 축소될 때(letterbox) 오버레이 버튼 위치를
// 실제 렌더링된 이미지 박스에 정확히 맞추는 로직.
// ResizeObserver를 사용해서, 재생 상태 표시줄이 나타나 이미지 크기가
// 미세하게 바뀌는 경우까지 포함해 항상 자동으로 재정렬합니다. =====
function syncHotspotLayer(img, layer){
  const wrap = img.parentElement;

  function update(){
    const wrapRect = wrap.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    layer.style.left = (imgRect.left - wrapRect.left) + 'px';
    layer.style.top = (imgRect.top - wrapRect.top) + 'px';
    layer.style.width = imgRect.width + 'px';
    layer.style.height = imgRect.height + 'px';
  }

  if (img.complete && img.naturalWidth) {
    update();
  } else {
    img.addEventListener('load', update);
  }

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    ro.observe(img);
  } else {
    // 구형 브라우저 대비 폴백
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    setTimeout(update, 60);
    setTimeout(update, 300);
  }
}
