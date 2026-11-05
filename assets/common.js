// 공통 숫자 포맷 및 한국어 단위 변환 유틸리티
function formatWon(num) {
  if (isNaN(num) || !isFinite(num)) return '0원';
  return Math.round(num).toLocaleString('ko-KR') + '원';
}

function formatNumber(num) {
  if (isNaN(num) || !isFinite(num)) return '0';
  return Math.round(num).toLocaleString('ko-KR');
}

function toKoreanCurrencyText(won) {
  const n = Math.round(Number(won) || 0);
  if (n <= 0) return '0원';
  const eok = Math.floor(n / 100000000);
  const man = Math.floor((n % 100000000) / 10000);
  const rest = n % 10000;
  const parts = [];
  if (eok > 0) parts.push(eok.toLocaleString('ko-KR') + '억');
  if (man > 0) parts.push(man.toLocaleString('ko-KR') + '만');
  if (rest > 0 && eok === 0) parts.push(rest.toLocaleString('ko-KR'));
  return parts.join(' ') + '원';
}

// 현재 페이지 네비게이션 활성화 표시
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href').replace('./', '');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
