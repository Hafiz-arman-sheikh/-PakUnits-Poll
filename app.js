// Target Date: 20 November 2026
    const targetDate = new Date("Nov 20, 2026 23:59:59").getTime();

    // Live Countdown Timer
    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(timerInterval);
            document.getElementById("timerHeader").innerText = "VOTING IS NOW CLOSED";
            document.getElementById("btnYes").disabled = true;
            document.getElementById("btnNo").disabled = true;
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);

    // Initial Poll Data (Starts at 0%)
    const pollData = {
        "Sindhi": { yes: 0, no: 0 },
        "Punjabi": { yes: 0, no: 0 },
        "Pashtun": { yes: 0, no: 0 },
        "Balochi": { yes: 0, no: 0 },
        "Muhajir": { yes: 0, no: 0 },
        "Saraiki": { yes: 0, no: 0 },
        "Gilgiti / Balti": { yes: 0, no: 0 },
        "Kashmiri": { yes: 0, no: 0 }
    };

    function renderResults() {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = '';

        for (const [group, votes] of Object.entries(pollData)) {
            const total = votes.yes + votes.no;
            let yesPercent = 0;
            let noPercent = 0;

            if (total > 0) {
                yesPercent = Math.round((votes.yes / total) * 100);
                noPercent = 100 - yesPercent;
            }

            const statusText = total === 0 
                ? 'Abhi koi vote nahi' 
                : `Haq me: ${yesPercent}% (${votes.yes}) | Mukhalif: ${noPercent}% (${votes.no})`;

            const html = `
                <div class="ethnic-result">
                    <div class="ethnic-name">
                        <span><strong>${group}</strong> <small style="color:var(--text-muted);">(Total: ${total})</small></span>
                        <span>${statusText}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-yes" style="width: ${yesPercent}%;"></div>
                        <div class="progress-no" style="width: ${noPercent}%;"></div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        }

        updateAdminStats();
    }

    function submitVote(choice) {
        const name = document.getElementById('userName').value.trim();
        const ethnicity = document.getElementById('ethnicityInput').value.trim();

        if (!name || !ethnicity) {
            alert('Lutaf karke apna naam aur qoum/zuban enter karein.');
            return;
        }

        if (!pollData[ethnicity]) {
            pollData[ethnicity] = { yes: 0, no: 0 };
        }

        if (choice === 'YES') {
            pollData[ethnicity].yes += 1;
        } else {
            pollData[ethnicity].no += 1;
        }

        alert(`Shukriya ${name}! Aap ka vote record ho chuka hai.`);
        document.getElementById('voteForm').reset();
        renderResults();
    }

    // Overall Combined Calculation for Admin Panel
    function updateAdminStats() {
        let totalYes = 0;
        let totalNo = 0;

        for (const votes of Object.values(pollData)) {
            totalYes += votes.yes;
            totalNo += votes.no;
        }

        const grandTotal = totalYes + totalNo;
        let overallYesPercent = 0;
        let overallNoPercent = 0;

        if (grandTotal > 0) {
            overallYesPercent = Math.round((totalYes / grandTotal) * 100);
            overallNoPercent = 100 - overallYesPercent;
        }

        document.getElementById('adminTotalVotes').innerText = grandTotal;
        document.getElementById('adminYesPercent').innerText = `${overallYesPercent}% (${totalYes})`;
        document.getElementById('adminNoPercent').innerText = `${overallNoPercent}% (${totalNo})`;
    }

    // Admin Access
    function openAdminPanel() {
        const password = prompt("Admin Panel Access Password Enter Karein:");
        if (password === "Karachi123@") {
            document.getElementById('adminPanel').style.display = 'block';
            window.location.href = '#adminPanel';
        } else if (password !== null) {
            alert("Ghalat Password!");
        }
    }

    function closeAdminPanel() {
        document.getElementById('adminPanel').style.display = 'none';
    }

    renderResults();