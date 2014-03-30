/**
 * @author Reki YAMAMOTO <reki.yamamoto@cct-inc.co.jp>
 * 
**/

//
// MindMap的なノード
//
var NodeInfoConst = (function () {
    function NodeInfoConst() {
    }
    NodeInfoConst.defaultFontSize = 16;
    NodeInfoConst.defaultTextColor = "black";
    return NodeInfoConst;
})();
;

// DBのテーブル情報
var NodeInfo = (function () {
    // コンストラクタ
    function NodeInfo(id, parentId, text, backcolor) {
        if (typeof backcolor === "undefined") { backcolor = "white"; }
        // デフォルト値の設定
        this.sizeFont = NodeInfoConst.defaultFontSize;
        this.textColor = NodeInfoConst.defaultTextColor;
        this.backgroundColor = backcolor;

        this.id = id;
        this.parentId = parentId;
        this.text = text;
    }
    return NodeInfo;
})();
;
//# sourceMappingURL=NodeInfo.js.map
