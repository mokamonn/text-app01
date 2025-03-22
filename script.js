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

    // 🌟 最初のページを表示
    page1.classList.add('active');

    // 🌟 1ページ目 → 2ページ目に移動
    startButton.addEventListener("click", function () {
        page1.classList.remove('active');
        page2.classList.add('active');

        // キーボードを開く
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

                // 入力内容を表示
                resultText.textContent = hiddenInput.value || "（未入力）";
            }, 3000);
        }, 60000);
    });

    // 🌟 再スタートボタン
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
