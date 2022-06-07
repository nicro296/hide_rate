
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
    chrome.storage.local.get(['bl_hide_rate','bl_hide_opponent_rate'],function(result){
        if(result.bl_hide_rate != null){
            if(result.bl_hide_rate){
                let jsInitCheckTimer = setInterval(jsLoaded, 100);
                function jsLoaded() {
                    if(check_load()){
                        clearInterval(jsInitCheckTimer);
                        let div5 = div_app.children[1].children[0].children[0].children[0].children[0].children[1];
                        if(div5.children!=null && div5.children.length>1){     
    
                            if(result.bl_hide_opponent_rate != null){
                                if(result.bl_hide_opponent_rate){
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
                                chrome.storage.local.set({'bl_hide_opponent_rate':false},function(){});
                            }
            
                        }
                    }
                }
            }else{
            }
        }else{
            chrome.storage.local.set({'bl_hide_rate':false},function(){});
        }
    });
}

function final(){
    div_app.style.display = '';
}

main();
final();