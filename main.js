document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calcBtn');
    
    calcBtn.addEventListener('click', () => {
        // 사용자 입력값 가져오기
        const country = document.getElementById('country').value;
        const categoryRate = parseFloat(document.getElementById('category').value) / 100;
        
        // 가격 및 배송 관련 입력값 (없으면 0 처리)
        const priceUSD = parseFloat(document.getElementById('price').value) || 0;
        const localTax = parseFloat(document.getElementById('localTax').value) || 0;
        const localShipping = parseFloat(document.getElementById('localShipping').value) || 0;
        const intlShipping = parseFloat(document.getElementById('intlShipping').value) || 0;
        const insurance = parseFloat(document.getElementById('insurance').value) || 0;
        
        const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);
        const logicText = document.getElementById('logic-text');

        // 입력값 검증 (물품 가격과 환율은 필수)
        if (priceUSD <= 0 || !exchangeRate || exchangeRate <= 0) {
            alert('물품 가격(USD)과 현재 환율(KRW)을 정확히 입력해 주세요.');
            return;
        }

        // 과세 가격 계산 로직 (물품 가격 + 현지 세금 + 현지 배송비 + 국제 배송비 + 보험료)
        const totalValueUSD = priceUSD + localTax + localShipping + intlShipping + insurance;
        const totalValueKRW = totalValueUSD * exchangeRate;
        
        // 면세 한도 판정 기준 금액 (물품대금 + 현지세금 + 현지배송비)
        const assessmentValueUSD = priceUSD + localTax + localShipping; 
        
        // 면세 한도 설정 (미국 200달러, 기타 150달러)
        const taxFreeLimit = (country === 'us') ? 200 : 150;
        
        let duty = 0;
        let vat = 0;
        let isTaxExempt = false;

        // 세금 계산 로직
        if (assessmentValueUSD <= taxFreeLimit) {
            // 면세 대상
            isTaxExempt = true;
            if (logicText) {
                logicText.innerHTML = `입력하신 물품 기준 금액(물품대금+현지세금+현지배송비)인 <strong>$${assessmentValueUSD.toFixed(2)}</strong>이 ${country === 'us' ? '미국' : '해당 국가'} 면세 한도(<strong>$${taxFreeLimit}</strong>) 이하이므로 <strong>관세와 부가세가 모두 면제</strong>된 것으로 계산되었습니다.<br><br><small class="text-muted">*단, 선택하신 품목이 '일반통관' 대상이거나, 별도의 국제배송비 합산 규정에 따라 과세로 전환될 가능성도 있으니 유의 바랍니다.</small>`;
            }
        } else {
            // 과세 대상: 세금은 전체 과세가격(totalValueKRW)을 기준으로 부과
            duty = totalValueKRW * categoryRate;
            vat = (totalValueKRW + duty) * 0.1;

            if (logicText) {
                logicText.innerHTML = `기준 금액(<strong>$${assessmentValueUSD.toFixed(2)}</strong>)이 면세 한도(<strong>$${taxFreeLimit}</strong>)를 초과하여 <strong>과세 대상으로 분류</strong>되었습니다.<br>과세는 물품대금, 각종 배송비, 보험료를 모두 합친 과세가격(약 ${Math.floor(totalValueKRW).toLocaleString()}원)을 기준으로 선택하신 품목의 관세율(<strong>${(categoryRate * 100).toFixed(1)}%</strong>)과 부가세(<strong>10%</strong>)가 적용되었습니다.`;
            }
        }

        // 결과 화면 출력 포맷팅
        const formatKRW = (num) => Math.floor(num).toLocaleString('ko-KR');

        document.getElementById('taxExemptStatus').textContent = isTaxExempt ? '면세 대상 (세금 0원 예상)' : '과세 대상 (한도 초과)';
        document.getElementById('taxExemptStatus').style.color = isTaxExempt ? '#16a34a' : '#e11d48';
        
        document.getElementById('resPrice').textContent = formatKRW(totalValueKRW);
        document.getElementById('resDuty').textContent = formatKRW(duty);
        document.getElementById('resVat').textContent = formatKRW(vat);
        
        const total = totalValueKRW + duty + vat;
        document.getElementById('resTotal').textContent = formatKRW(total);

        // 결과 박스 보이기
        const resultArea = document.getElementById('resultArea');
        resultArea.classList.remove('hidden');
        
        // Smooth scroll to results
        setTimeout(() => {
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
});