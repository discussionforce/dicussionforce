/**
 * @author Reki YAMAMOTO <reki.yamamoto@cct-inc.co.jp>
 * 
**/

var FusenNodeTreeView = (function () {
    function FusenNodeTreeView(parentElementId) {
        this.idPrefix = "_FusenNodeTreeViewItem_";
        // idをキーとした連想配列
        this.map = [];
        this.parentElementId = parentElementId;
    }
    FusenNodeTreeView.prototype.createNode = function (info) {
        var _this = this;
        var div = document.createElement("div");
        div.id = this.idPrefix + info.id;
        div.style.borderRadius = "4px";
        div.style.marginBottom = "2px";
        div.style.marginTop = "2px";
        div.style.marginRight = "0px";
        div.style.marginLeft = "16px";
        div.style.padding = "2px";
        div.style.borderColor = "gray";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1.5px";
        div.style.backgroundColor = info.backgroundColor;

        var linkDel = document.createElement("a");
        linkDel.textContent = "x";
        linkDel.style.padding = "2px";
        linkDel.style.cssFloat = "right";
        linkDel.style.borderColor = "black";
        linkDel.style.borderRadius = "4px";
        linkDel.style.borderStyle = "solid";
        linkDel.style.borderWidth = "2px";
        linkDel.style.background = "linear - gradient(top, #fff, #ccc)";
        div.appendChild(linkDel);

        var textArea = document.createElement("textArea");
        textArea.id = div.id + "_textArea";
        textArea.style.backgroundColor = info.backgroundColor;
        textArea.style.borderWidth = "0";
        textArea.style.borderStyle = "none";
        textArea.value = info.text;
        textArea.addEventListener("focusout", function (ev) {
            return _this.updateText(ev, info.id);
        });

        div.appendChild(textArea);
        var linkAdd = document.createElement("a");

        linkAdd.textContent = "+";
        linkAdd.style.padding = "2px";
        linkAdd.style.borderColor = "black";
        linkAdd.style.borderRadius = "4px";
        linkAdd.style.borderStyle = "solid";
        linkAdd.style.borderWidth = "2px";
        linkAdd.style.background = "linear - gradient(top, #fff, #ccc)";
        div.appendChild(linkAdd);

        return div;
    };

    FusenNodeTreeView.prototype.createRoot = function () {
        var _this = this;
        var div = document.createElement("div");
        var linkAdd = document.createElement("a");
        linkAdd.textContent = "+";
        linkAdd.style.padding = "2px";
        linkAdd.style.borderColor = "black";
        linkAdd.style.borderRadius = "4px";
        linkAdd.style.borderStyle = "solid";
        linkAdd.style.borderWidth = "2px";
        linkAdd.style.background = "linear - gradient(top, #fff, #ccc)";
        div.appendChild(linkAdd);
        linkAdd.addEventListener("click", function (e) {
            return _this.add("");
        });

        return div;
    };

    FusenNodeTreeView.prototype.updateText = function (ev, id) {
        var node = this.map[id];
        if (node.text != ev.srcElement.value) {
            node.text = ev.srcElement.value;
            updateNodeInfo(node);
        }
    };

    FusenNodeTreeView.prototype.add = function (parentId) {
        addChildNode(parentId);
    };

    // Nodeを削除する際に呼びます
    FusenNodeTreeView.prototype.remove = function (nodeid) {
        var id = this.idPrefix + nodeid;
        var element = document.getElementById(id);
        for (var key in this.map) {
            if (this.map[key].parentId == nodeid) {
                this.remove(key);
            }
        }

        element.parentElement.removeChild(element);
        delete this.map[nodeid];

        removeChildNode(nodeid)
    };

    // Nodeを追加or更新する場合に呼びます
    FusenNodeTreeView.prototype.update = function (info) {
        var _this = this;
        // エラー判定（nullかIDが無い場合は何もしないで抜ける）
        if (info == null)
            return;
        if (info.id == null || info.id.length == 0)
            return;

        var parentId = null;
        var parent = null;

        // 親IDがある場合親を探す。
        if (info.parentId != null && info.parentId.length > 0) {
            parentId = this.idPrefix + info.parentId;
            parent = document.getElementById(parentId);
        }

        var id = this.idPrefix + info.id;
        var element = document.getElementById(id);
        if (element == null) {
            element = this.createNode(info);
            this.map[info.id] = info;
            var links = element.getElementsByTagName("a");
            links[0].addEventListener("click", function (e) {
                return _this.remove(info.id);
            });
            links[1].addEventListener("click", function (e) {
                return _this.add(info.id);
            });
        } else {
            var textArea = element.getElementsByTagName("textArea")[0];
            textArea.value = info.text;
            var div = document.getElementById(id);
            div.style.backgroundColor = info.backgroundColor;
        }
        if (parent == null) {
            element.style.marginLeft = "0px";
            parent = document.getElementById(this.parentElementId);            
        }


        var added = false;
        $(parent).children().filter(function(){return $(this)[0].tagName=="DIV";}).each(function(){
            console.log($(this).attr("id"), id)
            if($(this).attr("id") > id){
                $(this).before(element);
                added = true;
                return false;
            }
        });
        if(!added){
            $(parent).append(element);
        }


        for (var key in this.map) {
            var item = this.map[key];
            if (item.parentId == info.id) {
                var child = document.getElementById(this.idPrefix + item.id);
                child.parentElement.removeChild(child);
                child.style.marginLeft = "16px";
                element.appendChild(child);
            }
        }
    };
    return FusenNodeTreeView;
})();
;
//# sourceMappingURL=FusenNodeTreeView.js.map
