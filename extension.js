game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"封神演义",content:function (config, pack) {
        // CharacterConfig.openUI()
    },precontent:function () {
            const extension = "封神演义"
game.import("extension",function(lib,game,ui,get,ai,_status){

    return {name:"封神榜",content:function (config, pack) {
        // CharacterConfig.openUI()
            for (let character in pack.character.character){
                pack.character.character[character][4].push(`ext:${this[0]}/image/character/${character}.jpg`)
            }

    },precontent:function () {
            setTimeout(function (){
                lib.mode.patheon.splash=lib.mode.patheon.splash.replace('封神榜','封神榜/image/splash')
            },0)
            const extension = "封神榜"
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

        },help:{},config:{"option_text":{"name":"<div class=\"caption\">拓展功能</div>","clear":true,"nopointer":true},"skillConfig":{"name":"<a href='javascript:;' class='btn-config' onclick=\"CharacterConfig.openUI()\"><b>技能配置</b><i class='iconfont icon-arrow-circle-right'></i></a>","clear":true,"nopointer":true},"github":{"name":"<a target='_blank' href='https://github.com/3527231/The-Canonization-of-the-Gods' class='btn-config'><b>GitHub</b><i class='iconfont icon-github'></i></a>","clear":true,"nopointer":true}},package:{
    character:{
        character:{
            "boss_tongtian":["male","shen",4,["fsyy_boss_zhuxian","fsyy_boss_luxian","fsyy_boss_xianxian","fsyy_boss_juexian"],[]],
        },
        translate:{
            "boss_tongtian":"通天教主",
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
        console.log("666")
    },
                config:{
                    choose:1,
                },
            },
            "fsyy_boss_luxian":{
                trigger:{
                    player:["damageBegin","useCardToPlayered"],
                    source:"damageBegin",
                },
                global:"fsyy_boss_luxian_die",
                group:["fsyy_boss_luxian_mark"],
                filter:function(trigger,player,triggername){
        return lib.skill.fsyy_boss_juexian.config.checkFilter(player,trigger,triggername,this.config.event_status)
    },
                content:function(){
        let flag = lib.skill.fsyy_boss_juexian.config.getPhaseObj(event,lib.skill.fsyy_boss_luxian.config.event_status);
        
        flag.target.addMark('fsyy_boss_luxian_mark',1)
        if(event.isJueXian){
             event.flag = flag;
           event.trigger('useJueXianSkill');   
        }
        
    },
                subSkill:{
                    die:{
                        sub:true,
                        forced:true,
                        trigger:{
                            player:"phaseEnd",
                        },
                        filter:function(trigger,player){
                return player.countMark('fsyy_boss_luxian_mark') > player.maxHp
            },
                        content:function(){
                player.die()
            },
                    },
                    mark:{
                        marktext:"戮",
                        intro:{
                            name:"戮仙",
                            content:"mark",
                        },
                        sub:true,
                    },
                },
                config:{
                    "event_status":1,
                },
            },
            "fsyy_boss_juexian":{
                trigger:{
                    player:["phaseBefore","phaseAfter"],
                },
                content:function(){
        var arr = ['fsyy_boss_zhuxian','fsyy_boss_luxian','fsyy_boss_xianxian']
        var choose_button = [arr.map(str => {
            return get.translation(str)+": "+lib.skill.fsyy_boss_juexian.config.phase_list[lib.skill[str].config.event_status]
        }),'tdnodes']
        "step 0"
        let next = player.chooseButton(["绝仙: 请选择两项交换条件的技能",choose_button])
        next.set('forced',true);
        next.set('selectButton',[2,2]);
        "step 1"
        result.links = result.links.map(value=>{
            return choose_button[0].indexOf(value)
        })
        let temp = lib.skill[arr[result.links[0]]].config.event_status
        lib.skill[arr[result.links[0]]].config.event_status = lib.skill[arr[result.links[1]]].config.event_status
        lib.skill[arr[result.links[1]]].config.event_status = temp
        
    },
                config:{
                    "skill_list":["fsyy_boss_zhuxian","fsyy_boss_luxian","fsyy_boss_xianxian"],
                    "phase_list":["当你不因“诛仙”使用伤害类牌指定其他角色为目标时","当你对其他角色造成伤害时","当其他角色对你造成伤害时"],
                    getPhaseObj:function(event,status){

            if (event.isJueXian){
                return event.flag
            }
            let trigger = event.getTrigger();
            let player = trigger.player;
            if(status == 0){
                source = trigger.target
                if(trigger.target == get){
                    return false
                }
            }
            if(status == 1){
                player = trigger.source
                source = trigger.player
            }
            
            return {player:player,target:source}
        },
                    checkFilter:function(player,trigger,triggername,status){
            let phaseEvent = '';
            if(status == 0){
                phaseEvent = 'useCardToPlayered'
                if(trigger.target == player){
                    return false
                }
            }
            if(status == 1){
                phaseEvent = 'damageBegin'
                if(trigger.player == player){
                    return false
                }
            }
            if(status == 2){
                phaseEvent = 'damageBegin'
                if(trigger.player != player){
                    return false
                }
            }
            if(phaseEvent != triggername){
                return false
            }
            return true
        },
                },
                subSkill:{
                    used:{
                        prompt:"###是否发动【绝仙】？###当你发动以上三个技能之一结算完毕后且你的体力值为全场最小,你可以以任意顺序发动另外两个技能",
                        trigger:{
                            player:"useJueXianSkill",
                        },
                        sub:true,
                        filter:function(trigger,player){
                return player.isMinHp()
            },
                        content:function(){
                
                let trigger_skill = this._trigger.name
                
                let filter = lib.skill.fsyy_boss_juexian.config.skill_list.filter(value=>{
                    return value != trigger_skill
                })
                let map = filter.map(value=>{
                    return get.translation(value)
                })
                "step 0"
                player.chooseControl(map).set('prompt',"###选择【绝仙】选项###选择先触发效果的技能");
                "step 1"
                let arr = []
                filter.forEach(value=>{
                    if(get.translation(value) == result.control){
                        arr.unshift(value)
                    }else{
                        arr.push(value)
                    }
                })
                arr.forEach(value => {
                    let next = game.createEvent('jueXianUseSkill')
                    next.isJueXian = true
                    next.flag = trigger.flag
                    next.setContent(lib.skill[value].content)
                })
                event.finish()
            },
                    },
                },
                group:["fsyy_boss_juexian_used"],
            },
            "fsyy_boss_zhuxian":{
                trigger:{
                    player:["damageBegin","useCardToPlayered"],
                    source:"damageBegin",
                },
                filter:function (trigger, player, triggername) {
        if(!get.tag(trigger.card,'damage')) return false;
        if(trigger.card.storage && trigger.card.storage.zhuxian){
          trigger.target.addTempSkill('qinggang2');
          trigger.target.storage.qinggang2.add(trigger.card);
          trigger.target.markSkill('qinggang2');
          return false;
        }
        return lib.skill.fsyy_boss_juexian.config.checkFilter(player,trigger,triggername,this.config.event_status);
    },
                content:function (){
        let flag = lib.skill.fsyy_boss_juexian.config.getPhaseObj(event,lib.skill.fsyy_boss_zhuxian.config.event_status);
        'step 0'
        var playername = get.translation(flag.player.name);
        flag.target.chooseControl(['选项①','选项②'])
          .set('prompt',`选择: 1. ${playername}对你造成一点雷电伤害，2.令${playername}摸一张牌然后视为对你使用一张无视防具的火【杀】`)
          .set('ai',() =>  _status.event.player.hasShan() ? '诛仙_2' : '诛仙_1');
        'step 1'
        if(result.control=='选项①'){
          flag.target.damage('thunder');
        }else{
          flag.player.draw();
          flag.player.useCard({name:'sha',nature:'fire',storage:{zhuxian:true}},flag.target);
        }
        if(event.isJueXian){
             event.flag = flag;
           event.trigger('useJueXianSkill');   
        }
        
    },
                config:{
                    "event_status":0,
                },
            },
            "fsyy_boss_xianxian":{
                config:{
                    "event_status":2,
                },
                content:function (){
        let flag = lib.skill.fsyy_boss_juexian.config.getPhaseObj(event,lib.skill.fsyy_boss_xianxian.config.event_status);

        console.log(flag)
    },
            },
        },
        translate:{
            test:"test",
            "test_info":"test",
            "fsyy_boss_luxian":"戮仙",
            "fsyy_boss_luxian_info":"当你对其他角色造成伤害时，可以令该角色获得一枚“戮仙”标记;拥有“戮仙”标记的角色回合结束时,若其标记数大于体力上限，其死亡",
            "fsyy_boss_juexian":"绝仙",
            "fsyy_boss_juexian_info":"你的回合开始或结束时，你可以任意交换“诛仙”、“戮仙”、“陷仙”的触发时机;当你发动以上三个技能之一结算完毕后且你的体力值为全场最小,你可以以任意顺序发动另外两个技能",
            "fsyy_boss_zhuxian":"诛仙",
            "fsyy_boss_zhuxian_info":"当你不因“诛仙”使用伤害类牌指定其他角色为目标时，你可以令该角色选择：1.你对其造成一点雷电伤害，2.你摸一张牌然后你视为对其使用一张无视防具且不计入次数上限的火【杀】",
            "fsyy_boss_xianxian":"陷仙",
            "fsyy_boss_xianxian_info":"当其他角色对你造成伤害时，你可以进行一次判定，若结果为：黑色，该角色横置并翻面；红色，该角色弃置两张牌并跳过下个出牌阶段",
        },
    },
    intro:"",
    author:"",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":[],"card":[],"skill":[]}}}}})
game.addMode('patheon',{
    start:function (){
        "step 0"
        lib.init.css(lib.assetURL+'extension/封神榜/mode/css','patheon')
        ui.background.setBackgroundImage("extension/封神榜/image/background/bg-1.png")
        ui.create.system('返回',function (){
            game.saveConfig('mode','')
            game.reload()
        },false,true)
        ui.system.delete()
        ui.auto.delete()
        let patheon = ui.create.div('#patheon');
        ui.window.appendChild(patheon)
        game.clearPatheon()
        "step 1"
        game.chooseSection()
    },
    game:{
        numberToString(n) {

            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)){
                return "数据非法";  //判断数据是否大于0
            }

            var unit = "千百拾亿千百拾万千百拾元角分", str = "";
            n += "00";

            var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数

            if (indexpoint >= 0){

                n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
            }

            unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
            for (var i=0; i < n.length; i++){
                str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
            }

            return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, ""); // 替换掉数字里面的零字符，得到结果

        },
        chooseTime(){
            let next = game.createEvent('chooseTime',false)
            next.setContent(function (){
                "step 0"
                game.clearPatheon()
                game.createBack()
                let time = lib.section[result.chooseSection].time;
                let timeList = ui.create.div('#time_list');
                let num = 0

                for (let i in time){
                    num ++
                    let element = ui.create.div('.time-card')
                    element.innerHTML += `
                    <div class="box">
                <div class="bg"></div>
                <div class="bottom"><h4>第${game.numberToString(num)}卷</h4><div class="section-title">${get.translation(i)}</div></div></div>
            `
                    $(element).children('.box').children('.bg').css(time[i].css)
                    $(element).children('.box').children('.bg')[0].setBackgroundImage(`extension/封神榜/image/time/${i}.png`)
                    if (time[i].lock){
                        element.classList.add('disable')
                    }else{
                    }
                    timeList.appendChild(element)
                }
                event.time_list = timeList
                lib.setScroll(timeList)
                document.querySelector('#patheon').appendChild(timeList)
                game.pause()

            })
            return next
        },
        chooseSection(){
            let next = game.createEvent('chooseSection',false);
            next.setContent(function (){
                "step 0"
                let sectionList = ui.create.div('#section_list');
                let num = 0
                for (let i in lib.section){
                    num ++
                    let element = ui.create.div('.section-card')
                    element.innerHTML = `
                <div class="box">
                <div class="bg"></div>
                <div class="bottom"><h4>第${game.numberToString(num)}卷</h4><div class="section-title">${get.translation(i)}</div></div></div>
            `
                    $(element).children('.box').children('.bg').css(lib.section[i].css)
                    $(element).children('.box').children('.bg')[0].setBackgroundImage(`extension/封神榜/image/section/${i}.png`)
                    if (lib.section[i].lock){
                        element.classList.add('disable')
                    }else{
                        element.onclick = function (){
                            $(this).addClass('select')
                            setTimeout(()=>{
                                $(this).animate({
                                    opacity: 0
                                },500,'linear',function (){
                                    setTimeout(function (){
                                        let next = game.chooseTime(i)
                                        next._result = {
                                            chooseSection: i
                                        }
                                        game.resume()
                                    },300)
                                })
                                game.clearSection()
                            },2500)
                        }
                    }
                    sectionList.appendChild(element)
                }

                event.section_list = sectionList
                lib.setScroll(sectionList)
                document.querySelector('#patheon').appendChild(sectionList)
                game.pause();
            })
        },
        clearPatheon(){
            $('.btn-back').remove()
            $('#patheon').html('')
        },
        clearSection(){
            $('.section-card:not(.select)').remove()
        },
        createBack(){
            let button = document.createElement('button');
            button.type = 'button'
            button.classList.add('btn-back')
            button.innerHTML = `
                <img src="extension/封神榜/image/other/arrow.png" alt="arrow" /> 
            `
            button.onclick = function (){
                game.clearPatheon()
                game.chooseSection()
                game.resume()
            }
            ui.window.appendChild(button)
        }
    },
    section:{
        "zhouwangluanzheng":{
            css:{},
            time:{
                zhouwangnvwagongjinxiang: {css:{},content:function(){},lock:false},
                jizhouhousuhufanshang: {css:{},content:function(){},lock:true},
                jichangjieweijindaji: {css:{},content:function(){},lock:true},
                enzhouyihulisidaji: {css:{},content:function(){},lock:true},
                yunzhongzijinjianchuyao: {css:{},content:function(){},lock:true},
                zhouwangwudaozaopaoluo: {css:{},content:function(){},lock:true},
                feizhongjifeijianghuanghou: {css:{},content:function(){},lock:true},
                fangbifangxiangfanzhaoge: {css:{},content:function(){},lock:true},
                shangrongjiujiandiansijie: {css:{},content:function(){},lock:true},
                jiboyanshanshouleizhen: {css:{},content:function(){},lock:true},
                youlichengqiuxibohou: {css:{},content:function(){},lock:true},
                chentangguannazhachushi: {css:{},content:function(){},lock:true},
                taiyizhenrenshoushiji: {css:{},content:function(){},lock:true},
                nazhaxianlianhuahuashen: {css:{},content:function(){},lock:true},
                kunlunshanziyaxiashan: {css:{},content:function(){},lock:true},
                ziyahuoshaopipajing: {css:{},content:function(){},lock:true},
                sutanjizhizaochaipen: {css:{},content:function(){},lock:true},
                ziyajianzhuyinpanxi: {css:{},content:function(){},lock:true},
                boyikaojingongshuzui: {css:{},content:function(){},lock:true},
                sanyishengsitongfeiyou: {css:{},content:function(){},lock:true},
                wenwangkuaguantaowuguan: {css:{},content:function(){},lock:true},
                xibohouwenwangtuzi: {css:{},content:function(){},lock:true},
                wenwangyemengfeixiongzhao: {css:{},content:function(){},lock:true},
                weishuiwenwangpinziya: {css:{},content:function(){},lock:true},
                sudajiqingyaofuyan: {css:{},content:function(){},lock:true}
            }
        },
        "yinshangfaxiqi": {
            css:{
                'background-position-y': 'center',
                'background-position-x': 'right'
            },
            time:{
                dajishejihaibigan: {css:{},content:function(){},lock:true},
                taishihuibingchenshice: {css:{},content:function(){},lock:true},
                ziyabingfachonghouhu: {css:{},content:function(){},lock:true},
                zhanhouhuwenwangtuogu: {css:{},content:function(){},lock:true},
                zhoujijifanwuchengwang: {css:{},content:function(){},lock:true},
                wentaishiqubingzhuixi: {css:{},content:function(){},lock:true},
                huangtianhuatongguanhuifu: {css:{},content:function(){},lock:true},
                huangfeihusishuidazhan: {css:{},content:function(){},lock:true},
                feihuguizhoujianziya: {css:{},content:function(){},lock:true},
                chaotianbingtanxiqishi: {css:{},content:function(){},lock:true},
                zhangguifangfengzhaoxizheng: {css:{},content:function(){},lock:true},
                jiangziyayishangkunlun: {css:{},content:function(){},lock:true},
                sishengxiqihuiziya: {css:{},content:function(){},lock:true},
                jiangziyabingdongqishan: {css:{},content:function(){},lock:true},
                sitianwangyubinglinggong: {css:{},content:function(){},lock:true},
                wentaishibingfaxiqi: {css:{},content:function(){},lock:true},
                huanghuashanshoudengxinzhangtao: {css:{},content:function(){},lock:true},
                wentaishixiqidazhan: {css:{},content:function(){},lock:true},
                ziyahunyoukunlunshan: {css:{},content:function(){},lock:true},
                randengyiposhijuezhen: {css:{},content:function(){},lock:true},
                guangchengzipojinguangzhen: {css:{},content:function(){},lock:true},
                gongmingfuzuowentaishi: {css:{},content:function(){},lock:true},
                luyaxianjishegongming: {css:{},content:function(){},lock:true},
                wangshixianhongshazhen: {css:{},content:function(){},lock:true},
                sangujibaihuanghezhen: {css:{},content:function(){},lock:true},
            },
            lock: true
        },
        "wuwangfazhou":{
            css:{

            },
            time:{
                ziyajieyingpowenzhong: {css:{},content:function(){},lock:true},
                juelonglingwenzhongguitian: {css:{},content:function(){},lock:true},
                dengjiugongfengchixizheng: {css:{},content:function(){},lock:true},
                tuxingsunligongxianyao: {css:{},content:function(){},lock:true},
                tuxingsunguifuxiqi: {css:{},content:function(){},lock:true},
                ziyashejishoujiugong: {css:{},content:function(){},lock:true},
                jizhouhousuhufaxiqi: {css:{},content:function(){},lock:true},
                ziyaxiqifenglvyue: {css:{},content:function(){},lock:true},
                yinhongxiashanshousijiang: {css:{},content:function(){},lock:true},
                mayuanxiashanzhuyinhong: {css:{},content:function(){},lock:true},
                taijituyinhongjueming: {css:{},content:function(){},lock:true},
                zhangshanlijinfaxiqi: {css:{},content:function(){},lock:true},
                shengongbaoshuofanyinjiao: {css:{},content:function(){},lock:true},
                luoxuanhuofenxiqicheng: {css:{},content:function(){},lock:true},
                yinjiaoqishanshoulichu: {css:{},content:function(){},lock:true},
                hongjinxiqichengdazhan: {css:{},content:function(){},lock:true},
                jiangziyajintaibaijiang: {css:{},content:function(){},lock:true},
                shouyangshanyiqizubing: {css:{},content:function(){},lock:true},
                kongxuanbingzujinjiling: {css:{},content:function(){},lock:true},
                zhuntidaorenshoukongxuan: {css:{},content:function(){},lock:true},
                jiangziyasanlufenbing: {css:{},content:function(){},lock:true},
                guangchengzisanyebiyougong: {css:{},content:function(){},lock:true},
                qinglongguanfeihuzhebing: {css:{},content:function(){},lock:true},
                henghaerjiangxianshentong: {css:{},content:function(){},lock:true},
                tuxingsundaoqixianshen: {css:{},content:function(){},lock:true},

            },
            lock: true
        },
        "guiguofengshen":{
            css:{

            },
            time:{
                ziyajieyingpowenzhong: {css:{},content:function(){},lock:true},
                juelonglingwenzhongguitian: {css:{},content:function(){},lock:true},
                dengjiugongfengchixizheng: {css:{},content:function(){},lock:true},
                tuxingsunligongxianyao: {css:{},content:function(){},lock:true},
                tuxingsunguifuxiqi: {css:{},content:function(){},lock:true},
                ziyashejishoujiugong: {css:{},content:function(){},lock:true},
                jizhouhousuhufaxiqi: {css:{},content:function(){},lock:true},
                ziyaxiqifenglvyue: {css:{},content:function(){},lock:true},
                yinhongxiashanshousijiang: {css:{},content:function(){},lock:true},
                mayuanxiashanzhuyinhong: {css:{},content:function(){},lock:true},
                taijituyinhongjueming: {css:{},content:function(){},lock:true},
                zhangshanlijinfaxiqi: {css:{},content:function(){},lock:true},
                shengongbaoshuofanyinjiao: {css:{},content:function(){},lock:true},
                luoxuanhuofenxiqicheng: {css:{},content:function(){},lock:true},
                yinjiaoqishanshoulichu: {css:{},content:function(){},lock:true},
                hongjinxiqichengdazhan: {css:{},content:function(){},lock:true},
                jiangziyajintaibaijiang: {css:{},content:function(){},lock:true},
                shouyangshanyiqizubing: {css:{},content:function(){},lock:true},
                kongxuanbingzujinjiling: {css:{},content:function(){},lock:true},
                zhuntidaorenshoukongxuan: {css:{},content:function(){},lock:true},
                jiangziyasanlufenbing: {css:{},content:function(){},lock:true},
                guangchengzisanyebiyougong: {css:{},content:function(){},lock:true},
                qinglongguanfeihuzhebing: {css:{},content:function(){},lock:true},
                henghaerjiangxianshentong: {css:{},content:function(){},lock:true},
                tuxingsundaoqixianshen: {css:{},content:function(){},lock:true},

            },
            lock: true
        }
    },
    translate:{
        "zhouwangluanzheng": "纣王乱政",
        "yinshangfaxiqi": "殷商伐西岐",
        "wuwangfazhou": "武王伐纣",
        "guiguofengshen": "归国封神",
        zhouwangnvwagongjinxiang: '纣王女娲宫进香',
        jizhouhousuhufanshang: '冀州侯苏护反商',
        jichangjieweijindaji: '姬昌解围进妲己',
        enzhouyihulisidaji: '恩州驿狐狸死妲己',
        yunzhongzijinjianchuyao: '云中子进剑除妖',
        zhouwangwudaozaopaoluo: '纣王无道造炮烙',
        feizhongjifeijianghuanghou: '费仲计废姜皇后',
        fangbifangxiangfanzhaoge: '方弼方相反朝歌',
        shangrongjiujiandiansijie: '商容九间殿死节',
        jiboyanshanshouleizhen: '姬伯燕山收雷震',
        youlichengqiuxibohou: '羑里城囚西伯侯',
        chentangguannazhachushi: '陈塘关哪咤出世',
        taiyizhenrenshoushiji: '太乙真人收石矶',
        nazhaxianlianhuahuashen: '哪咤现莲花化身',
        kunlunshanziyaxiashan: '昆仑山子牙下山',
        ziyahuoshaopipajing: '子牙火烧琵琶精',
        sutanjizhizaochaipen: '苏坦己置造虿盆',
        ziyajianzhuyinpanxi: '子牙谏主隐磻溪',
        boyikaojingongshuzui: '伯邑考进贡赎罪',
        sanyishengsitongfeiyou: '散宜生私通费尤',
        wenwangkuaguantaowuguan: '文王夸官逃五关',
        xibohouwenwangtuzi: '西伯侯文王吐子',
        wenwangyemengfeixiongzhao: '文王夜梦飞熊兆',
        weishuiwenwangpinziya: '渭水文王聘子牙',
        sudajiqingyaofuyan: '苏妲己请妖赴宴',
        dajishejihaibigan: '妲己设计害比干',
        taishihuibingchenshice: '太师回兵陈十策',
        ziyabingfachonghouhu: '子牙兵伐崇侯虎',
        zhanhouhuwenwangtuogu: '斩侯虎文王托孤',
        zhoujijifanwuchengwang: '周纪激反武成王',
        wentaishiqubingzhuixi: '闻太师驱兵追袭',
        huangtianhuatongguanhuifu: '黄天化潼关会父',
        huangfeihusishuidazhan: '黄飞虎泗水大战',
        feihuguizhoujianziya: '飞虎归周见子牙',
        chaotianbingtanxiqishi: '晁田兵探西岐事',
        zhangguifangfengzhaoxizheng: '张桂芳奉诏西征',
        jiangziyayishangkunlun: '姜子牙一上昆仑',
        sishengxiqihuiziya: '四圣西岐会子牙',
        jiangziyabingdongqishan: '姜子牙冰冻岐山',
        sitianwangyubinglinggong: '四天王遇丙灵公',
        wentaishibingfaxiqi: '闻太师兵伐西岐',
        huanghuashanshoudengxinzhangtao: '黄花山收邓辛张陶',
        wentaishixiqidazhan: '闻太师西岐大战',
        ziyahunyoukunlunshan: '子牙魂游昆仑山',
        randengyiposhijuezhen: '燃灯议破十绝阵',
        guangchengzipojinguangzhen: '广成子破金光阵',
        gongmingfuzuowentaishi: '公明辅佐闻太师',
        luyaxianjishegongming: '陆压献计射公明',
        wangshixianhongshazhen: '王失陷红沙阵',
        sangujibaihuanghezhen: '三姑计摆黄河阵',
        ziyajieyingpowenzhong: '子牙劫营破闻仲',
        juelonglingwenzhongguitian: '绝龙岭闻仲归天',
        dengjiugongfengchixizheng: '邓九公奉敕西征',
        tuxingsunligongxianyao: '土行孙立功显耀',
        tuxingsunguifuxiqi: '土行孙归伏西岐',
        ziyashejishoujiugong: '子牙设计收九公',
        jizhouhousuhufaxiqi: '冀州侯苏护伐西岐',
        ziyaxiqifenglvyue: '子牙西岐逢吕岳',
        yinhongxiashanshousijiang: '殷洪下山收四将',
        mayuanxiashanzhuyinhong: '马元下山助殷洪',
        taijituyinhongjueming: '太极图殷洪绝命',
        zhangshanlijinfaxiqi: '张山李锦伐西岐',
        shengongbaoshuofanyinjiao: '申公豹说反殷郊',
        luoxuanhuofenxiqicheng: '罗宣火焚西岐城',
        yinjiaoqishanshoulichu: '殷郊岐山受犁锄',
        hongjinxiqichengdazhan: '洪锦西岐城大战',
        jiangziyajintaibaijiang: '姜子牙金台拜将',
        shouyangshanyiqizubing: '首阳山夷齐阻兵',
        kongxuanbingzujinjiling: '孔宣兵阻金鸡岭',
        zhuntidaorenshoukongxuan: '准提道人收孔宣',
        jiangziyasanlufenbing: '姜子牙三路分兵',
        guangchengzisanyebiyougong: '广成子三谒碧游宫',
        qinglongguanfeihuzhebing: '青龙关飞虎折兵',
        henghaerjiangxianshentong: '哼哈二将显神通',
        tuxingsundaoqixianshen: '土行孙盗骑陷身',
        zhenglunzhuojiangqusishui: '郑伦捉将取汜水',
        laoziyiqihuasanqing: '老子一气化三清',
        sanjiaohuipozhuxianzhen: '三教会破诛仙阵',
        chuanyunguansijiangbeiqin: '穿云关四将被擒',
        yangrenxiashanpowensi: '杨任下山破瘟司',
        ziyatongguanyudoushen: '子牙潼关遇痘神',
        sanjiaodahuiwanxianzhen: '三教大会万仙阵',
        sandashishoushixianghou: '三大师收狮象犼',
        ziyabingqulintongguan: '子牙兵取临潼关',
        dengruierhouguizhouzhu: '邓芮二侯归周主',
        minchixianwuyueguitian: '渑池县五岳归天',
        tuxingsunfuqizhenwang: '土行孙夫妻阵亡',
        wuwangbaiyutiaolongzhou: '武王白鱼跳龙舟',
        zhouwangqiaogupouyunfu: '纣王敲骨剖孕妇',
        ziyazhuoshentuyulei: '子牙捉神荼郁垒',
        panlonglingshaowuwenhua: '蟠龙岭烧邬文化',
        yangjiannazhashouqiguai: '杨戬哪咤收七怪',
        jinzhazhiquyouhunguan: '金咤智取游魂关',
        wenhuannuzhanyinpobai: '文焕怒斩殷破败',
        ziyabaozhouwangshizui: '子牙暴纣王十罪',
        ziyafajianqindaji: '子牙发柬擒妲己',
        zhaixinglouzhouwangzifen: '摘星楼纣王自焚',
        zhouwuwanglutaisancai: '周武王鹿台散财',
        jiangziyaguiguofengshen: '姜子牙归国封神',
        wuwangfenglieguozhuhou: '武王封列国诸侯',
    }
},{
    extension:"封神榜",
    translate:"封神演义"
})
}
