
let div_app = document.getElementById('app');

let rate='';
/**
 * @type {boolean} アラート重複回避用
 */
let set_alert = false;

function check_load(){
    if(div_app.children != null
        && div_app.children.length >= 2
        && div_app.children[1].children != null
        && div_app.children[1].children[0].children != null
        && div_app.children[1].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children != null){
        return true;
    }else{
        return false;
    }
}

function check_load_rate(div3){
    if(div3.children.length >= 9
        && div3.children[8].children != null
        && div3.children[8].children[0].children != null
        && div3.children[8].children[0].children.length >=2){
        return true;
    }else{
        return false;
    }
}


function check_rate(target_rate){
    let jsInitCheckTimer = setInterval(jsLoaded, 500);
    let div3 = div_app.children[1].children[0].children[0].children[0];
    function jsLoaded() {
        if (check_load_rate(div3)) {
            clearInterval(jsInitCheckTimer);
            set_alert = false;

            //要素を取得する処理
            if(div3.children[8].children[0].textContent.indexOf('レーティング')>-1){
                let word = div3.children[8].children[0].children[1].textContent;
                rate = word.substring(0,word.indexOf('[RD')).trim();
                word = word.substring(word.indexOf('[RD'));
                if(parseFloat(target_rate) <= parseFloat(rate)){
                    chrome.storage.local.set({'bl_hide_rate_rotation':false},function(){});
                    window.alert('目標レートに到達しました。レート値の非表示を解除します');
                }else{
                    word = '**** '+word;
                    div3.children[8].children[0].children[1].textContent = word;
                }
            }
        }
    }
}

function hide_rate(){
    chrome.storage.local.get(['bl_hide_rate_rotation','target_rate_rotation'], function(result){
        if(result.bl_hide_rate_rotation!= null){
            if(result.bl_hide_rate_rotation){
                if(result.target_rate_rotation!=null|| result.target_rate_rotation==0){
                    if(set_alert){

                    }else{
                        set_alert = true;
                        document.addEventListener("readystatechange", check_rate(result.target_rate_rotation), false);
                    }
                }else{
                    chrome.storage.local.set({'target_rate_rotation':0},function(){});
                }           
            }else{
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_rotation':false},function(){});
        }
    });
}

function main(){
    let jsInitCheckTimer = setInterval(jsLoaded, 500);
    function jsLoaded(){
        if(check_load()){
            clearInterval(jsInitCheckTimer);
            let div3 = div_app.children[1].children[0].children[0].children[0];

            hide_rate();
            
            let mo = new MutationObserver(function(){
                if(div3.children.length>=9){
                    hide_rate();
                }
            });
            let config ={childList: true};
            
            mo.observe(div3,config);
        }
    }
}
main();

