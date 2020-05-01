//quick Text  
//version 5.02
//2020 05.01
//copyright (c) songz meng

//global

qT_Data = new Object();
qT_Data.scriptName = {
    en: "quickText",
    cn: "快速字幕"
};
qT_Data.layerName = {
    en: "subtitle",
    cn: "字幕"
};
qT_Data.inPuText = {
    en: "input text",
    cn: "输入字幕"
}
qT_Data.addText = {
    en: "add text / marker",
    cn: "添加字幕/空标记"
};
qT_Data.keepWord = {
    en: "retain text",
    cn: "保留文字"
};
qT_Data.addTlayer = {
    en: "add T layer",
    cn: "添加字层"
};
qT_Data.geText = {
    en: "absorb text",
    cn: "取字"
};
qT_Data.scriptTitle = {
    en: "quickText v5",
    cn: "快速字幕"
};
qT_Data.noComp = {
    en: "Please select a single composition in the Project panel, and try again.",
    cn: "在项目面板选中或打开一个合成"
};
qT_Data.noLayer = {
    en: "Please select a layer, and try again.",
    cn: "请选中一个图层"
};
qT_Data.noTextLayer = {
    en: "not a T Layer",
    cn: "非文字层"
};
qT_Data.error = {
    en: "error",
    cn: "错误"
}
qT_Data.about = {
    en: "thank you for using quicktext. \n " + "\n" + "contact me: weibo.com/songz",
    cn: "谢谢使用\n" + "\n" + "联系我 weibo.com/songz"
};
qT_Data.nonSelect = {
    en: "no layer was selected",
    cn: "没有选中图层！"
}

//localize

function qT_localize(Var) {
    if (app.isoLanguage === "zh_CN") {
        return Var["cn"];
    } else {
        return Var["en"];
    }
}

//ui

win = new Window('palette', qT_localize(qT_Data.scriptName));
wP = win.add("panel", [0, 0, 225, 150], qT_localize(qT_Data.inPuText));
wP.eT = wP.add("edittext", [15, 15, 205, 35]);
wP.aM = wP.add("button", [15, 45, 205, 75], qT_localize(qT_Data.addText));
wP.cK = wP.add("checkbox", [15, 85, 100, 105], qT_localize(qT_Data.keepWord));
wP.qU = wP.add("button", [180, 85, 205, 100], '?');
wP.aT = wP.add("button", [15, 110, 95, 130], qT_localize(qT_Data.addTlayer));
wP.gT = wP.add("button", [125, 110, 205, 130], qT_localize(qT_Data.geText));

//main function

var aI = app.project.activeItem;

wP.aT.onClick = function() {
    if (!(aI instanceof CompItem)) {
        alert(qT_localize(qT_Data.noComp), qT_localize(qT_Data.error)) //
    } else {
        app.beginUndoGroup(qT_localize(qT_Data.scriptName));
        aI.layers.addText(qT_localize(qT_Data.layerName));
        aI.layer(1).property("Marker").setValueAtTime(aI.layer(1).startTime, new MarkerValue(""));
        aI.layer(1).sourceText.expression = "marker.numKeys>0&&(n=marker.nearestKey(time).index,t=marker.key(n).time,time-t<0&&n--,n<1&&(n=1),n,s=marker.key(n).comment,s,s);"
        aI.layer(1).position.setValue([aI.width * 0.5, aI.height * 0.9]);
        app.endUndoGroup();
    }
}

wP.gT.onClick = function() {
    if (!(aI instanceof CompItem) || aI.selectedLayers.length == 0) {
        alert(qT_localize(qT_Data.noLayer), qT_localize(qT_Data.error))
    } else if (aI.selectedLayers[0].property("sourceText") != null) {

        wP.eT.text = aI.selectedLayers[0].sourceText.value
    } else {
        alert(qT_localize(qT_Data.noTextLayer), qT_localize(qT_Data.error), "x")
    }
}

wP.aM.onClick = function() {
    if (!(aI instanceof CompItem) || aI.selectedLayers.length == 0) {
        alert(qT_localize(qT_Data.nonSelect), qT_localize(qT_Data.error), "x");
    } else {
        a = wP.eT.text
        mK = new MarkerValue(a);
        sL = aI.selectedLayers[0];
        CTI = aI.time;
        sL.property("Marker").setValueAtTime(CTI, mK);
        if (!(wP.cK.value)) {
            wP.eT.text = ""

        }
    }
};

wP.qU.onClick = function() {
    alert(qT_localize(qT_Data.about), qT_localize(qT_Data.scriptTitle))
};

win.show();
