document.addEventListener("DOMContentLoaded", function () {
    const hiddenInput = document.getElementById("hiddenInput");
    const blackText = document.getElementById("blackText");
    const grayText = document.getElementById("grayText");
    const textArea = document.getElementById("textArea");

    // もともとの文章
    const originalText = "あいうえおかきくけこさしすせそたちつてと";
    grayText.textContent = originalText;

    // タップ（クリック）でキーボードを表示
    textArea.addEventListener("click", function () {
        if (!hiddenInput.disabled) {
            hiddenInput.focus(); // キーボードを開く
        }
    });

    // 入力時に黒文字を重ねて表示
    hiddenInput.addEventListener("input", function () {
        blackText.textContent = hiddenInput.value;
    });

    // ⏳ 1分後に「終了です」と表示して入力を無効化
    setTimeout(function () {
        blackText.textContent = "終了です"; // 黒文字で「終了です」を表示
        hiddenInput.disabled = true; // 入力無効化
    }, 60000); // 60000ミリ秒 = 60秒
});
