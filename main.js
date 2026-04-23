document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calcBtn');
    
    calcBtn.addEventListener('click', () => {
        // 사용자 입력값 가져오기
        const country = document.getElementById('country').value;
        const categoryRate = parseFloat(document.getElementById('category').value) / 100;
        const priceUSD = parseFloat(document.getElementById('price').value);
        const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);

        // 입력값 검증
        if (!priceUSD || !exchangeRate || priceUSD <= 0 || exchangeRate <= 0) {
            alert('물품 총액과 환율을 정확히 입력해 주세요.');
            return;
        }

        // 원화 환산 금액 계산
        const priceKRW = priceUSD * exchangeRate;
        
        // 면세 한도 설정 (미국 200달러, 기타 150달러 - 목록통관 기준 가정)
        const taxFreeLimit = (country === 'us') ? 200 : 150;
        
        let duty = 0;
        let vat = 0;
        let isTaxExempt = false;

        // 세금 계산 로직
        if (priceUSD <= taxFreeLimit) {
            // 면세 대상
            isTaxExempt = true;
        } else {
            // 과세 대상 (관세 = 원화금액 * 관세율)
            duty = priceKRW * categoryRate;
            // 부가세 = (원화금액 + 관세) * 10%
            vat = (priceKRW + duty) * 0.1;
        }

        // 결과 화면 출력 포맷팅
        const formatKRW = (num) => Math.floor(num).toLocaleString('ko-KR');

        document.getElementById('taxExemptStatus').textContent = isTaxExempt ? '면세 대상 (세금 0원)' : '과세 대상 (한도 초과)';
        document.getElementById('taxExemptStatus').style.color = isTaxExempt ? '#16a34a' : '#e11d48';
        
        document.getElementById('resPrice').textContent = formatKRW(priceKRW);
        document.getElementById('resDuty').textContent = formatKRW(duty);
        document.getElementById('resVat').textContent = formatKRW(vat);
        
        const total = priceKRW + duty + vat;
        document.getElementById('resTotal').textContent = formatKRW(total);

        // 결과 박스 보이기 (애니메이션 효과)
        const resultArea = document.getElementById('resultArea');
        resultArea.classList.remove('hidden');
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});