class CharacterConfig{
    static openUI(){
        new Promise((resolve, reject) => {
            $('body').append(`
<div class="tongtian-extension" style="display: none">
    <div class="extension-box">
    <i class="close iconfont icon-close"></i>
    <div class="extension-header"></div>
</div>
</div>
        `)
            resolve($('.tongtian-extension'))
        }).then(e=>{
            $('.close').click(function (){
                CharacterConfig.closeUI();
            })
            e.fadeTo("fast",1);
        })
    }
    static closeUI(){
        $('.tongtian-extension').remove()
    }
}