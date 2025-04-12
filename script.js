document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const page3 = document.getElementById("page3");
  const page4 = document.getElementById("page4");

  const grayText = document.getElementById("grayText");
  const blackText = document.getElementById("blackText");
  const inputField = document.getElementById("inputField");
  const resultText = document.getElementById("resultText");

  const originalText = "あいうえおかきくけこさしすせそたちつてと";

  function showPage(page) {
    [page1, page2, page3, page4].forEach(p => p.classList.remove('active'));
    page.classList.add('active');
  }

  startButton.addEventListener("click", function () {
    showPage(page2);
    grayText.textContent = originalText;
    blackText.textContent = "";
    inputField.value = "";
    inputField.focus();

    inputField.addEventListener("input", function () {
      blackText.textContent = inputField.value;
    });

    // 60秒で入力終了
    setTimeout(() => {
      showPage(page3);

      setTimeout(() => {
        showPage(page4);
        const charCount = inputField.value.length;
        resultText.textContent = `${charCount} 文字入力されました。`;
        createAndDownloadCSV(charCount);
      }, 3000);
    }, 60000);
  });

  restartButton.addEventListener("click", function () {
    showPage(page1);
  });

  function createAndDownloadCSV(charCount) {
    const now = new Date();
    const fileName = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}.csv`;

    const headers = "日時,文字数\n";
    const dataLine = `${now.toLocaleString()},${charCount}\n`;

    const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([BOM, headers + dataLine], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    resultText.textContent += "\nCSVデータを保存しました。";
  }
});
