
let div_app = document.getElementById('app');
div_app.style.display = 'none';


function check_load(){
    if(div_app.children != null
        && div_app.children.length >=2
        && div_app.children[1].children != null
        && div_app.children[1].children[0].children != null
        && div_app.children[1].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children[0].children != null
        && div_app.children[1].children[0].children[0].children[0].children[0].children.length >= 2){
        return true;
    }else{
        return false;
    }
}

function main(){
    chrome.storage.local.get(['bl_hide_rate_2Pick','bl_hide_opponent_rate_2Pick'],function(result){
        if(result.bl_hide_rate_2Pick != null){
            if(result.bl_hide_rate_2Pick){
                let jsInitCheckTimer = setInterval(jsLoaded, 100);
                function jsLoaded() {
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        if(div5.children!=null && div5.children.length>1){
                            if(result.bl_hide_opponent_rate_2Pick != null){
                                if(result.bl_hide_opponent_rate_2Pick){
                                    div5.children[1].children[0].children[0].textContent = '**** pt';
                                    div5.children[1].children[1].children[0].textContent = '**** pt';
                                    div_app.style.display = '';
                                }else{
                                    if(div5.children[0].children[0].children[0].textContent == 'あなた'){
                                        div5.children[1].children[0].children[0].textContent = '**** pt';
                                        div_app.style.display = '';
                                    }else if(div5.children[0].children[1].children[0].textContent == 'あなた'){
                                        div5.children[1].children[1].children[0].textContent = '**** pt';
                                        div_app.style.display = '';
                                    }
                                }
                            }else{
                                chrome.storage.local.set({'bl_hide_opponent_rate_2Pick':false},function(){});
                            }
                        }
                    }
                }
            }else{
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate_2Pick':false},function(){});
        }
    });
}

function final(){
    div_app.style.display = '';
}


main();
final();