/**
 * @author Reki YAMAMOTO <reki.yamamoto@cct-inc.co.jp>
 * 
**/


function updateNodeInfo(node){
    // NodeInfoが更新された場合に呼び出されるコールバックです。ここで、SalesforceやGoInstantへの更新処理を実施してください。
    var element = document.getElementById("UserColorPicker");
    var colorstring = element.value;
    node.backgroundColor = colorstring;
    instance.update(node);  // GoInstant
    sendToGoInstantForUpdate(node);
}

function addChildNode(parentId) {
    var idx = 0;
    if(parentId==""){
        parentId = "root";
    }    
    // ノードが追加された場合に呼び出されるコールバックです。ここで、SalesforceやGoInstantへの更新処理を実施してください。（ID生成処理を含みます。）
    while( instance.map[parentId+"_"+idx] != null )
    {
        idx++;
    }
    var element = document.getElementById("UserColorPicker");
    var colorstring = element.value;

    var node = new NodeInfo(parentId + "_" + idx, parentId, "", colorstring);
    instance.update(node);
    sendToGoInstantForAdd(node);
}

function removeChildNode(id) {
    // ノードが追加された場合に呼び出されるコールバックです。ここで、SalesforceやGoInstantへの更新処理を実施してください。
    sendToGoInstantForRemove(id);
}

