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

    // 1ページ目 → 2ページ目に移動
    startButton.addEventListener("click", function () {
        page1.classList.remove('active');
        page2.classList.add('active');

        // 入力用のテキストをセット
        const originalText = "あいうえおかきくけこさしすせそたちつてと";
        grayText.textContent = originalText;

        // テキストエリアをタップするとキーボードを開く
        textArea.addEventListener("click", function () {
            if (!hiddenInput.disabled) {
                hiddenInput.focus();
            }
        });

        // 入力時に黒文字を表示
        hiddenInput.addEventListener("input", function () {
            blackText.textContent = hiddenInput.value;
        });

        // 🌟 1分後に終了ページ → 結果ページへ移動
        setTimeout(function () {
            page2.classList.remove('active');
            page3.classList.add('active');

            hiddenInput.disabled = true;
            grayText.textContent = "終了です";
            blackText.textContent = "";

            // 🌟 3秒後に結果ページへ
            setTimeout(function () {
                page3.classList.remove('active');
                page4.classList.add('active');

                // 🌟 入力文字数を表示
                const charCount = hiddenInput.value.length;
                resultText.textContent = `${charCount} 文字`;

                // 🌟 CSVデータ生成 & スマホに保存
                createAndSaveCSV(charCount);
            }, 3000);
        }, 60000); // 60秒
    });

    // CSVデータ生成関数（GitHubアップロードは削除済み）
    function createAndSaveCSV(charCount) {
        const now = new Date();

        const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.csv`;
        const csvContent = `日時,入力文字数\n${now.toLocaleString()},${charCount}\n`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
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

        // 最初のページに戻る
        page4.classList.remove('active');
        page1.classList.add('active');
    });
});
