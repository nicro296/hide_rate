
let div_app = document.getElementById('app');
div_app.style.display = 'none';

chrome.storage.local.get('bl_hide_rate',function(result){
    if(result.bl_hide_rate != null){
        if(result.bl_hide_rate){
            if(div_app.children!=null && div_app.children.length >1){
                if(div_app.children[1].children!=null){
                    if(div_app.children[1].children[0].children!=null){
                        if(div_app.children[1].children[0].children[0].children!=null){
                            if(div_app.children[1].children[0].children[0].children[0].children!=null){
                                if(div_app.children[1].children[0].children[0].children[0].children[0].children!=null
                                    && div_app.children[1].children[0].children[0].children[0].children[0].children.length>1){
                                        if(div_app.children[1].children[0].children[0].children[0].children[0].children[1].children!=null
                                            && div_app.children[1].children[0].children[0].children[0].children[0].children[1].children.length>1){
                                                
            if(div_app.children[1].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].textContent == 'あなた'){
                div_app.children[1].children[0].children[0].children[0].children[0].children[1].children[1].children[0].children[0].textContent = '**** pt';
            }else if(div_app.children[1].children[0].children[0].children[0].children[0].children[1].children[0].children[1].children[0].textContent == 'あなた'){
                div_app.children[1].children[0].children[0].children[0].children[0].children[1].children[1].children[1].children[0].textContent = '**** pt';
            }
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }else{
        }
    }else{
    }
});
div_app.style.display = '';

