document.addEventListener("DOMContentLoaded", function () {
    const hiddenInput = document.getElementById("hiddenInput");
    const blackText = document.getElementById("blackText");
    const grayText = document.getElementById("grayText");
    const resultText = document.getElementById("resultText");
    const downloadLink = document.getElementById("downloadLink");
  
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
  
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const page4 = document.getElementById("page4");
  
    const textOverlay = document.getElementById("textOverlay");
  
    const originalText = "あいうえおかきくけこさしすせそたちつてと";
  
    // 最初のページを表示
    page1.classList.add("active");
  
    startButton.addEventListener("click", function () {
      page1.classList.remove("active");
      page2.classList.add("active");
  
      grayText.textContent = originalText;
      hiddenInput.disabled = false;
      hiddenInput.value = "";
      blackText.textContent = "";
  
      // 入力イベント
      hiddenInput.addEventListener("input", function () {
        blackText.textContent = hiddenInput.value;
      });
  
      // タップでフォーカス
      textOverlay.addEventListener("click", function () {
        if (!hiddenInput.disabled) {
          hiddenInput.focus();
        }
      });
  
      // 60秒後に終了ページへ
      setTimeout(function () {
        page2.classList.remove("active");
        page3.classList.add("active");
  
        hiddenInput.disabled = true;
        grayText.textContent = "終了です";
        blackText.textContent = "";
  
        // 3秒後に結果ページへ
        setTimeout(function () {
          page3.classList.remove("active");
          page4.classList.add("active");
  
          const charCount = hiddenInput.value.length;
          resultText.textContent = `${charCount} 文字入力されました。`;
          createAndDownloadCSV(charCount);
        }, 3000);
      }, 60000);
    });
  
    restartButton.addEventListener("click", function () {
      page4.classList.remove("active");
      page1.classList.add("active");
    });
  
    function createAndDownloadCSV(charCount) {
      const now = new Date();
      const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  
      const headers = "Time,文字数\n";
      const dataLine = `${now.toLocaleString()},${charCount}\n`;
  
      const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
      const blob = new Blob([BOM, headers + dataLine], { type: "text/csv;charset=utf-8;" });
  
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = `${fileName}.csv`;
    }
  });
  