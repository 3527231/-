game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"封神演义",content:function (config, pack) {
        // CharacterConfig.openUI()
    },precontent:function () {
            const extension = "封神演义"
            const basePath = `extension/${extension}/resources/`
            function loadJs(path) {//引入js
                let script = document.createElement('script')
                script.src = path
                document.querySelector('head').appendChild(script)
            }
            function loadCss(path) {//引入css
                let link = document.createElement('link')
                link.rel = "stylesheet"
                link.href = path
                document.querySelector('head').appendChild(link)
            }

            game.getFileList(basePath + 'js', (e, list) => {
                for (let path of list) {
                    loadJs(basePath + 'js/' + path)
                }
            })
            game.getFileList(basePath + 'css', (e, list) => {
                for (let path of list) {
                    loadCss(basePath + 'css/' + path)
                }
            })

        },help:{},config:{"option_text":{"name":"<div class=\"caption\">拓展功能</div>","clear":true,"nopointer":true},"skillConfig":{"name":"<a href='javascript:;' class='btn-config' onclick=\"CharacterConfig.openUI()\"><b>技能配置</b><i class='iconfont icon-arrow-circle-right'></i></a>","clear":true,"nopointer":true},"github":{"name":"<a target='_blank' href='https://github.com/3527231' class='btn-config'><b>GitHub</b><i class='iconfont icon-github'></i></a>","clear":true,"nopointer":true}},package:{
    character:{
        character:{
        },
        translate:{
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            test:{
                trigger:{
                    player:"useSkillEnd",
                },
                frequent:true,
                content:function(){
        console.log("66666")
    },
                config:{
                    choose:1,
                },
            },
        },
        translate:{
            test:"test",
            "test_info":"test",
        },
    },
    intro:"",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}})