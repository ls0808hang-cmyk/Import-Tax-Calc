document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Category mapping: itemType -> duty rate (%)
    const categoryMapping = {
        'fashion': 13,
        'beauty': 6.5,
        'electronics': 8,
        'digital': 0,
        'food': 8,
        'general': 20
    };

    function formatKRW(value) {
        if (!Number.isFinite(value)) return "-";
        return Math.floor(value).toLocaleString("ko-KR") + "원";
    }

    calculateBtn?.addEventListener('click', () => {
        // 사용자 입력값 가져오기
        const country = document.getElementById('country').value;
        const itemType = document.getElementById('itemType').value;
        const dutyRate = (categoryMapping[itemType] || 0) / 100;
        
        // 가격 및 배송 관련 입력값 (없으면 0 처리)
        const itemPrice = parseFloat(document.getElementById('itemPrice').value) || 0;
        const localTax = parseFloat(document.getElementById('localTax').value) || 0;
        const localShipping = parseFloat(document.getElementById('localShipping').value) || 0;
        const intlShipping = parseFloat(document.getElementById('intlShipping').value) || 0;
        const insurance = parseFloat(document.getElementById('insurance').value) || 0;
        const exchangeRate = parseFloat(document.getElementById('exchangeRate').value) || 0;
        
        const logicText = document.getElementById('logic-text');

        // 입력값 검증 (물품 가격과 환율은 필수)
        if (itemPrice <= 0 || exchangeRate <= 0) {
            alert('물품 가격(USD)과 현재 환율(KRW)을 정확히 입력해 주세요.');
            return;
        }

        // 과세 가격 계산 로직 (물품 가격 + 현지 세금 + 현지 배송비 + 국제 배송비 + 보험료)
        const totalValueUSD = itemPrice + localTax + localShipping + intlShipping + insurance;
        const totalValueKRW = totalValueUSD * exchangeRate;
        
        // 면세 한도 판정 기준 금액 (물품대금 + 현지세금 + 현지배송비)
        const assessmentValueUSD = itemPrice + localTax + localShipping; 
        
        // 면세 한도 설정 (미국 200달러, 기타 150달러)
        // 만약 품목이 '식품'이나 '화장품' 등 일반통관 대상일 경우 실제로는 $150가 적용되지만 
        // 여기서는 기본 국가 기준 로직을 따름 (사용자 가이드에서 보완 설명)
        const taxFreeLimit = (country === 'us') ? 200 : 150;
        
        let duty = 0;
        let vat = 0;
        let isTaxExempt = false;

        // 세금 계산 로직
        if (assessmentValueUSD <= taxFreeLimit) {
            // 면세 대상
            isTaxExempt = true;
            if (logicText) {
                logicText.innerHTML = `입력하신 물품 기준 금액(물품대금+현지세금+현지배송비)인 <strong>$${assessmentValueUSD.toFixed(2)}</strong>이 ${country === 'us' ? '미국' : '해당 국가'} 면세 한도(<strong>$${taxFreeLimit}</strong>) 이하이므로 <strong>관세와 부가세가 모두 면제</strong>된 것으로 계산되었습니다.<br><br><small style="color: var(--muted);">*단, 선택하신 품목이 '일반통관' 대상이거나, 별도의 국제배송비 합산 규정에 따라 과세로 전환될 가능성도 있으니 유의 바랍니다.</small>`;
            }
        } else {
            // 과세 대상: 세금은 전체 과세가격(totalValueKRW)을 기준으로 부과
            duty = totalValueKRW * dutyRate;
            vat = (totalValueKRW + duty) * 0.1;

            if (logicText) {
                logicText.innerHTML = `기준 금액(<strong>$${assessmentValueUSD.toFixed(2)}</strong>)이 면세 한도(<strong>$${taxFreeLimit}</strong>)를 초과하여 <strong>과세 대상으로 분류</strong>되었습니다.<br>과세는 물품대금, 각종 배송비, 보험료를 모두 합친 과세가격(약 ${Math.floor(totalValueKRW).toLocaleString()}원)을 기준으로 선택하신 품목의 관세율(<strong>${(dutyRate * 100).toFixed(1)}%</strong>)과 부가세(<strong>10%</strong>)가 적용되었습니다.`;
            }
        }

        // 결과 화면 출력
        document.getElementById("result-item-value").textContent = formatKRW(totalValueKRW);
        document.getElementById("result-duty").textContent = formatKRW(duty);
        document.getElementById("result-vat").textContent = formatKRW(vat);
        
        const total = totalValueKRW + duty + vat;
        document.getElementById("result-total").textContent = formatKRW(total);

        // 결과 영역으로 스크롤
        const resultArea = document.getElementById('result-area');
        if (resultArea) {
            setTimeout(() => {
                resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    });
});