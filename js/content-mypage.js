
let div_app = document.getElementById('app');
let first_check = false;

let rate='';

function main(target_rate){
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    let d5 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        if (d5.children[8].children[0].children.length != 0) {
            clearInterval(jsInitCheckTimer);
        }
        if(!first_check){
            //要素を取得する処理
            if(d5.children[8].children!=null && d5.children[8].children[0].textContent.indexOf('レーティング')>-1){
                let word = d5.children[8].children[0].children[1].textContent;
                rate = word.substring(0,word.indexOf('[RD')).trim();
                word = word.substring(word.indexOf('[RD'));
                if(parseFloat(target_rate) <= parseFloat(rate)){
                    chrome.storage.local.set({'bl_hide_rate':false},function(){});
                    window.alert('目標レートに到達しました。レート値の非表示を解除します');
                }else{
                    word = '**** '+word;
                    d5.children[8].children[0].children[1].textContent = word;
                }
                first_check=true;
            }
            div_app.children[1].children[0].children[0].children[0].style.display ='';
        }
    }
}


chrome.storage.local.get(['bl_hide_rate','target_rate'], function(result){
    if(result.bl_hide_rate!= null){
        if(result.bl_hide_rate){
            div_app.children[1].children[0].children[0].children[0].style.display ='none';
            if(result.target_rate!=null|| result.target_rate==0){
                window.addEventListener("load", main(result.target_rate), false);
            }else{
                div_app.children[1].children[0].children[0].children[0].style.display ='';
                chrome.storage.local.set({"target_rate":0},function(){});
            }           
        }else{
        }
    }else{
        chrome.storage.local.set({"bl_hide_rate":false},function(){});
    }
});



