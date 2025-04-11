document.addEventListener("DOMContentLoaded", function () {
    const hiddenInput = document.getElementById("hiddenInput");
    const blackText = document.getElementById("blackText");
    const grayText = document.getElementById("grayText");
    const textArea = document.getElementById("textArea");
    const resultText = document.getElementById("resultText");

    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");

    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const page3 = document.getElementById("page3");
    const page4 = document.getElementById("page4");

    // 最初のページを表示
    page1.classList.add('active');

    // 開始ボタンが押されたとき
    startButton.addEventListener("click", function () {
        page1.classList.remove('active');
        page2.classList.add('active');

        const originalText = "あいうえおかきくけこさしすせそたちつてと";
        grayText.textContent = originalText;

        // テキストエリアをタップでキーボード表示
        textArea.addEventListener("click", function () {
            if (!hiddenInput.disabled) {
                hiddenInput.focus();
            }
        });

        // 入力時に黒文字を表示
        hiddenInput.addEventListener("input", function () {
            blackText.textContent = hiddenInput.value;
        });

        // 60秒後に終了ページへ遷移
        setTimeout(function () {
            page2.classList.remove('active');
            page3.classList.add('active');

            hiddenInput.disabled = true;
            grayText.textContent = "終了です";
            blackText.textContent = "";

            // 3秒後に結果ページへ
            setTimeout(function () {
                page3.classList.remove('active');
                page4.classList.add('active');

                const charCount = hiddenInput.value.length;
                resultText.textContent = `${charCount} 文字`;

                // CSV作成＆保存
                createAndDownloadCSV(charCount);
            }, 3000);
        }, 60000);
    });

    // CSV作成＆ダウンロード（UTF-8 BOM付き）
    function createAndDownloadCSV(charCount) {
        const now = new Date();
        const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

        const headers = "時間,文字数\n";
        const dataLine = `${now.toLocaleString()},${charCount}\n`;

        const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]); // UTF-8 BOM
        const blob = new Blob([BOM, headers + dataLine], { type: "text/csv;charset=utf-8;" });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 再スタートボタン
    restartButton.addEventListener("click", function () {
        hiddenInput.disabled = false;
        hiddenInput.value = "";
        blackText.textContent = "";
        grayText.textContent = "あいうえおかきくけこさしすせそたちつてと";

        page4.classList.remove('active');
        page1.classList.add('active');
    });
});
