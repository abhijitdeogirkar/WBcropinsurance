// येथे तुमची Google Apps Script ची URL टाका
const API_URL = "https://script.google.com/macros/s/AKfycbxd8miGGkG1cZ26IWTYnCDJZGrdmSrAuIpF96Z2r_ne1Y5BXVIi5yWqV0xGiZc-ujU/exec";

let triggerMasterData = [];

// पेज लोड झाल्यावर गुगल शीटमधून ट्रिगर्सचा डेटा आणणे
document.addEventListener("DOMContentLoaded", () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                triggerMasterData = data.data;
                console.log("Trigger Data Loaded Successfully");
            }
        })
        .catch(error => alert("डेटाबेस कनेक्ट करण्यात अडचण आली!"));
});

function processData() {
    const fileInput = document.getElementById('csvFile');
    if (!fileInput.files.length) {
        alert("कृपया प्रथम CSV फाईल निवडा!");
        return;
    }

    Papa.parse(fileInput.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            const csvData = results.data;
            generateReport(csvData);
        }
    });
}

function generateReport(csvData) {
    // इथे बेसिक रिपोर्ट जनरेट करण्याचा कोड आहे. 
    // तुम्ही याला फळपीक आणि ट्रिगरनुसार अधिक विस्तृत करू शकता.
    
    let html = `<table>
                    <tr>
                        <th>तारीख</th>
                        <th>कमाल तापमान (Max Temp)</th>
                        <th>किमान तापमान (Min Temp)</th>
                        <th>पाऊस (Rain)</th>
                    </tr>`;
                    
    csvData.forEach(row => {
        html += `<tr>
                    <td>${row[' Date ']}</td>
                    <td>${row[' Max_Temp ']}</td>
                    <td>${row['  Min_Temp ']}</td>
                    <td>${row[' Cumulative_Rain'] || '0.0'}</td>
                 </tr>`;
    });
    
    html += `</table>`;
    
    document.getElementById('reportContent').innerHTML = html;
    document.getElementById('reportSection').style.display = "block";
}
