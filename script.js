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

        // 入力用のテキストをセット
        const originalText = "あいうえおかきくけこさしすせそたちつてと";
        grayText.textContent = originalText;

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

                // 🌟 入力文字数を表示
                const charCount = hiddenInput.value.length;
                resultText.textContent = `${charCount} 文字`;

                // 🌟 CSVデータ生成 & ダウンロード
                createAndSaveCSV(charCount);
            }, 3000);
        }, 60000); // 60秒
    });

    // 🌟 CSVデータ生成関数
    function createAndSaveCSV(charCount) {
        const now = new Date();

        // 🌟 YYYYMMDDHHMM の形式でファイル名を生成
        const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

        const csvContent = `日時,入力文字数\n${now.toLocaleString()},${charCount}\n`;

        // BlobでCSVファイルを作成
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        // ダウンロードリンクを自動生成
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`; // 🌟 ファイル名を「YYYYMMDDHHMM.csv」に
        document.body.appendChild(a);
        a.click();

        // 不要になったURLを解放
        URL.revokeObjectURL(url);

        // 🌟 GitHubに自動アップロード（GitHub Actions を使う）
        uploadToGitHub(csvContent, fileName);
    }

    // 🌟 GitHubへのアップロード関数
    async function uploadToGitHub(content, fileName) {
        const token = 'GITHUB_TOKEN'; // GitHubのトークンをセット
        const repo = 'ユーザー名/リポジトリ名';
        const path = `results/${fileName}.csv`;

        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: '入力結果をアップロード',
                content: btoa(unescape(encodeURIComponent(content))) // Base64エンコード
            })
        });

        if (response.ok) {
            console.log('✅ GitHubへのアップロード成功');
        } else {
            console.error('❌ GitHubへのアップロード失敗:', await response.json());
        }
    }

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