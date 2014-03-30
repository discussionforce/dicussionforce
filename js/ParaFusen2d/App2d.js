/**
 * @author Reki YAMAMOTO <reki.yamamoto@cct-inc.co.jp>
 * 
**/

// 付箋の集合を表すインスタンス
var instance = new FusenNodeTreeView("contents");

// 初期化イベント
window.onload = function () {
    // root を作る場合このコードを生かす。
    document.body.appendChild(instance.createRoot());
};
//# sourceMappingURL=app2d.js.map
