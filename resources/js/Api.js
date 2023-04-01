class Api{
    static loadJs(path){//引入js
        let script = document.createElement('script')
        script.src = path
        document.querySelector('head').appendChild(script) 
    }
    static loadCss(path){//引入css
        let link = document.createElement('link')
        link.rel = "stylesheet"
        link.href = path
        document.querySelector('head').appendChild(link) 
    }
    static input(){

    }

}
