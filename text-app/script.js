document.addEventListener("DOMContentLoaded", function() {
    const hiddenInput = document.getElementById("hiddenInput");
    const blackText = document.getElementById("blackText");
    const grayText = document.getElementById("grayText");
    const textArea = document.getElementById("textArea");

    // もともとの文章
    const originalText = "あいうえおかきくけこさしすせそたちつてと";
    grayText.textContent = originalText; // グレーの文章をセット

    // 最大入力文字数をグレーの文字数に合わせる
    hiddenInput.setAttribute("maxlength", originalText.length);

    // タップ（クリック）でキーボードを表示
    textArea.addEventListener("click", function() {
        hiddenInput.style.pointerEvents = "auto"; // 入力可能にする
        hiddenInput.focus(); // キーボードを開く
    });

    // 入力時の処理
    hiddenInput.addEventListener("input", function() {
        blackText.textContent = hiddenInput.value; // 入力された部分を黒で表示
    });
});