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

function showToast(msg) {
  let toast = document.getElementById('commonToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'commonToast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function copyTextToClipboard(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(successMsg));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg);
  }
}

// 현재 페이지 네비게이션 활성화 + 계산 결과 공유 버튼 + 세부 키워드 내부 링크 자동 장착
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href').replace('./', '');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 계산 결과 하이라이트 박스에 공유/복사 버튼 자동 추가
  const highlightBox = document.querySelector('.result-highlight');
  if (highlightBox && !highlightBox.querySelector('.share-bar')) {
    const bar = document.createElement('div');
    bar.className = 'share-bar';
    bar.innerHTML = `
      <button type="button" class="btn-share" id="btnCopyResultSummary">📋 계산 결과 텍스트 복사</button>
      <button type="button" class="btn-share" id="btnSharePageUrl">🔗 계산기 주소 공유·복사</button>
    `;
    highlightBox.appendChild(bar);

    document.getElementById('btnCopyResultSummary').addEventListener('click', () => {
      const title = document.querySelector('h1') ? document.querySelector('h1').innerText : document.title;
      const label = highlightBox.querySelector('.label') ? highlightBox.querySelector('.label').innerText : '';
      const val = highlightBox.querySelector('.value') ? highlightBox.querySelector('.value').innerText : '';
      const sub = highlightBox.querySelector('.sub') ? highlightBox.querySelector('.sub').innerText : '';
      const details = [...document.querySelectorAll('.breakdown-item')]
        .map((li) => {
          const n = li.querySelector('.name')?.innerText || '';
          const a = li.querySelector('.amount')?.innerText || '';
          return n && a ? `• ${n}: ${a}` : '';
        })
        .filter(Boolean)
        .join('\n');
      const shareUrl = 'https://kimmiinfo.co.kr/' + (path === 'index.html' ? '' : path);
      const summary = `[${title}]\n${label}: ${val}\n(${sub})\n\n${details}\n\n👉 바로 계산해보기: ${shareUrl}`;
      copyTextToClipboard(summary, '계산 결과와 주소가 복사되었습니다! 카카오톡이나 메모장에 붙여넣기 하세요.');
    });

    document.getElementById('btnSharePageUrl').addEventListener('click', () => {
      const shareUrl = 'https://kimmiinfo.co.kr/' + (path === 'index.html' ? '' : path);
      if (navigator.share) {
        navigator.share({ title: document.title, url: shareUrl }).catch(() => {});
      } else {
        copyTextToClipboard(shareUrl, '계산기 주소가 복사되었습니다! 원하는 곳에 공유해 보세요.');
      }
    });
  }

  // 모든 페이지 하단(푸터 직전)에 20개 세부 키워드 내부 링크 그물망 섹션 자동 삽입 (SEO 크롤링 및 체류시간 극대화)
  const mainEl = document.querySelector('main.container');
  if (mainEl && !document.getElementById('seoKeywordDirectory')) {
    const sec = document.createElement('section');
    sec.id = 'seoKeywordDirectory';
    sec.className = 'content-section';
    sec.setAttribute('aria-label', '인기 금액별·조건별 바로가기');
    sec.innerHTML = `
      <h2>📌 인기 금액별·조건별 계산표 한눈에 바로가기</h2>
      <p>가장 많이 검색되는 연봉 구간, 대출 원금, 근무시간, 예·적금 조건별 상세 실수령액 및 상환금 비교 페이지입니다.</p>
      <h3>💼 연봉 구간별 실수령액 상세 계산표</h3>
      <div class="keyword-grid">
        <a class="keyword-pill" href="./salary-2800.html">연봉 2,800만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-3000.html">연봉 3,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-3500.html">연봉 3,500만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-4000.html">연봉 4,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-4500.html">연봉 4,500만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-5000.html">연봉 5,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-6000.html">연봉 6,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-7000.html">연봉 7,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-8000.html">연봉 8,000만 원 실수령액</a>
        <a class="keyword-pill" href="./salary-10000.html">연봉 1억 원 실수령액</a>
      </div>
      <h3>🏠 대출 금액별 월 상환금 & 이자 비교표</h3>
      <div class="keyword-grid">
        <a class="keyword-pill" href="./loan-50m.html">5,000만 원 대출 이자</a>
        <a class="keyword-pill" href="./loan-100m.html">1억 대출 이자·원리금</a>
        <a class="keyword-pill" href="./loan-200m.html">2억 대출 이자·주담대</a>
        <a class="keyword-pill" href="./loan-300m.html">3억 대출 이자·상환표</a>
        <a class="keyword-pill" href="./loan-500m.html">5억 대출 이자·상환표</a>
      </div>
      <h3>⏰ 주휴수당 · 퇴직금 · 3.3% 세금 · 예적금 만기표</h3>
      <div class="keyword-grid">
        <a class="keyword-pill" href="./weekly-15h.html">주 15시간·20시간·40시간 주휴수당</a>
        <a class="keyword-pill" href="./severance-1y.html">1년·3년·5년 근속 퇴직금 표</a>
        <a class="keyword-pill" href="./freelancer-100m.html">프리랜서 3.3% 세후 역산표</a>
        <a class="keyword-pill" href="./savings-100m.html">월 100만 원 적금 만기 수령액</a>
        <a class="keyword-pill" href="./savings-5000m.html">5,000만 원·1억 정기예금 이자표</a>
      </div>
    `;
    mainEl.appendChild(sec);
  }
});
