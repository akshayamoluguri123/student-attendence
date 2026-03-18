function calculate() {
    let name = document.getElementById("name").value;
    let totalDays = parseInt(document.getElementById("totalDays").value);
    let presentDays = parseInt(document.getElementById("presentDays").value);

    let classesPerDay = 7;

    let totalClasses = totalDays * classesPerDay;
    let presentClasses = presentDays * classesPerDay;
    let absentClasses = totalClasses - presentClasses;

    let percentage = (presentClasses / totalClasses) * 100;

    let result = `
        <h3>${name}'s Report</h3>
        Total Classes: ${totalClasses}<br>
        Present Classes: ${presentClasses}<br>
        Absent Classes: ${absentClasses}<br>
        Percentage: ${percentage.toFixed(2)}%<br>
    `;

    if (percentage >= 75) {
        result += "✅ Eligible";
    } else {
        result += "❌ Not Eligible<br>";

        let extraClasses = 0;
        let newPresent = presentClasses;
        let newTotal = totalClasses;

        while ((newPresent / newTotal) < 0.75) {
            extraClasses++;
            newPresent++;
            newTotal++;
        }

        let days = Math.floor(extraClasses / classesPerDay);
        let rem = extraClasses % classesPerDay;

        result += `Need ${extraClasses} classes (${days} days ${rem} classes)`;
    }

    document.getElementById("result").innerHTML = result;

    // Bar Chart
    new Chart(document.getElementById("barChart"), {
        type: 'bar',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [presentClasses, absentClasses]
            }]
        }
    });

    // Pie Chart
    new Chart(document.getElementById("pieChart"), {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [presentClasses, absentClasses]
            }]
        }
    });
}