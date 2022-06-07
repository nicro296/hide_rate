
let div_app = document.getElementById('app');

let rate='';
let div3 = div_app.children[1].children[0].children[0].children[0];
/**
 * @type {boolean} アラート重複回避用
 */
let set_alert = false;

function main(target_rate){
    let first_check = false;
    const jsInitCheckTimer = setInterval(jsLoaded, 500);
    let d5 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        if (d5.children[8].children[0].children.length != 0) {
            clearInterval(jsInitCheckTimer);
            set_alert = false;
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

function hide_rate(){
    chrome.storage.local.get(['bl_hide_rate','target_rate'], function(result){
        if(result.bl_hide_rate!= null){
            if(result.bl_hide_rate){
                div_app.children[1].children[0].children[0].children[0].style.display ='none';
                if(result.target_rate!=null|| result.target_rate==0){
                    if(set_alert){

                    }else{
                        set_alert = true;
                        document.addEventListener("readystatechange", main(result.target_rate), false);
                    }
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
}

hide_rate();
div_app.children[1].children[0].children[0].children[0].style.display ='';

let mo = new MutationObserver(function(){
    if(div3.children.length==13){
        hide_rate();
        div_app.children[1].children[0].children[0].children[0].style.display ='';
    }
});
let config ={childList: true};

mo.observe(div3,config);
