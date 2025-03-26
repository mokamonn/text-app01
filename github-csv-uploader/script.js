// 🌟 必要なモジュールを読み込み
require('dotenv').config();
const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

// 🌟 仮想的なDOMを作成
const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <div id="page1"></div>
    <div id="page2"></div>
    <div id="page3"></div>
    <div id="page4"></div>
    <button id="startButton"></button>
    <button id="restartButton"></button>
    <div id="grayText"></div>
    <div id="blackText"></div>
    <input id="hiddenInput" type="text">
    <div id="resultText"></div>
</body></html>`);

const { document } = dom.window;

// 🌟 HTML要素を取得
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

// 🌟 1ページ目をアクティブにする
page1.classList.add('active');

// 🌟 スタートボタンの動作
startButton.addEventListener("click", function () {
    page1.classList.remove('active');
    page2.classList.add('active');

    // 入力用のテキストをセット
    const originalText = "あいうえおかきくけこさしすせそたちつてと";
    grayText.textContent = originalText;

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

            // 🌟 CSVデータ生成 & GitHubにアップロード
            createAndSaveCSV(charCount);
        }, 3000);
    }, 60000);
});

// 🌟 CSVデータ生成関数
function createAndSaveCSV(charCount) {
    const now = new Date();

    // 🌟 YYYYMMDDHHMM の形式でファイル名を生成
    const fileName = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

    const csvContent = `日時,入力文字数\n${now.toLocaleString()},${charCount}\n`;

    // 🌟 GitHubにアップロード
    uploadToGitHub(csvContent, fileName);
}

// 🌟 GitHubへのアップロード関数
async function uploadToGitHub(content, fileName) {
    const token = process.env.GITHUB_TOKEN;
    const repo = 'mokamonn/text-app01';
    const path = `results/${fileName}.csv`;

    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Upload CSV file',
                content: Buffer.from(content).toString('base64')
            })
        });

        if (response.ok) {
            console.log('✅ GitHubへのアップロード成功');
        } else {
            const error = await response.json();
            console.error('❌ GitHubへのアップロード失敗:', error);
        }
    } catch (error) {
        console.error('❌ エラー発生:', error);
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

console.log("✅ Node.jsで動作するように修正完了！");
