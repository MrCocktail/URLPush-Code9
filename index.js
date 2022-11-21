class MissingParameterError extends Error{
    constructor(message){
        super(message);
        this.name = "MissingParameterError"
    }
}
class TypeError extends Error{
    constructor(message){
        super(message);
        this.name = "TypeError"
    }
}
class KeyAlreadyExistError extends Error{
    constructor(message){
        super(message);
        this.name = "KeyAlreadyExistError"
    }
}
class KeyDoesNotExistError extends Error{
    constructor(message){
        super(message);
        this.name = "KeyDoesNotExistError"
    }
}
class SpecialCaracterNotAllowedError extends Error{
    constructor(message){
        super(message);
        this.name = "SpecialCaracterNotAllowedError"
    }
}

class URLPush{
    alph = "abcdefghijklmnopqrstuvwxyz1234567890"
    push(){
        let args = Array.from(arguments);
        console.log(args)
        let kle = args[0], vale=args[1];
        let url = window.location.href;
        let b = url.split('?');
        let bazUrl = b[0];
        let searchUrl = b[1]; 

        if(args.length == 2 && kle != "" && vale != ""){
            if((typeof kle != 'number' && typeof kle != 'string')  || (typeof vale != 'number' && typeof vale != 'string')){
                throw new TypeError("TypeError")
            }
            else if(typeof kle != 'undefined' && typeof vale != 'undefined'){
                for (let i = 0; i < kle.length; i++){
                    if (!(this.alph.includes(kle[i])) && !(this.alph.toUpperCase().includes(kle[i]))) {
                        throw new SpecialCaracterNotAllowedError("SpecialCaracterNotAllowedError")
                    }
                }
                for (let i = 0; i < vale.length; i++){
                    if (!(this.alph.includes(vale[i])) && !(this.alph.toUpperCase().includes(vale[i]))) {
                        throw new SpecialCaracterNotAllowedError("SpecialCaracterNotAllowedError")
                    }
                }
                if(searchUrl==undefined){
                    url="?"+kle+"="+vale;
                }else{
                    if(this.verifyeEgzistansKle(kle)==false){
                        searchUrl+="&"+kle+"="+vale;
                        url=bazUrl+'?'+searchUrl;
                    }else{
                        throw new KeyAlreadyExistError("KeyAlreadyExistError")
                    }
                }
            }

        }else{
            throw new MissingParameterError("MissingParameterError")
        }
        return history.pushState(null,'', url);
    }

    update(){
        let args= Array.from(arguments);
        let kle=args[0],vale=args[1];
        let url=window.location.href;
        let urlSplit=url.split('?');
        let bazUrl=urlSplit[0];
        let searchUrl=urlSplit[1];
        let newSearchUrl;
        let TabsearchUrl;

        if(args.length==2 && kle!="" && vale!=""){
            if(typeof kle!='undefined' && typeof vale!='undefined'){
                if(searchUrl==undefined){
                    TabsearchUrl=url;
                }else{
                    if(this.verifyeEgzistansKle(kle)==true){
                        TabsearchUrl=searchUrl.split('&');
                        for(let i=0; i<TabsearchUrl.length; i++){
                            newSearchUrl=TabsearchUrl[i].split('=');
                            if(newSearchUrl[0]==kle){
                                newSearchUrl[1]=vale;
                                TabsearchUrl[i]=newSearchUrl[0]+"="+newSearchUrl[1];
                            }
                        }
                        TabsearchUrl=bazUrl+"?"+TabsearchUrl.join('&');
                    }else{
                        throw new KeyDoesNotExistError("KeyDoesNotExistError")
                    }
                }
            }
        }else{
            throw new MissingParameterError("MissingParameterError")
        }
        return history.pushState(null,'',TabsearchUrl);
    }

    get(){
        let args = Array.from(arguments);
        let kle=args[0],vale=args[1];
        let urlParam = window.location.search;
        urlParam= new URLSearchParams(urlParam);
        let klea;
        
        if(args.length==1 && kle!=""){
            if(this.verifyeEgzistansKle(kle)==true){
                klea=urlParam.get(kle);
            }else{
                throw new KeyDoesNotExistError("KeyDoesNotExistError")
            }
        }else{
            throw new TypeError("TypeError")
        }   
        return klea;
    }

    remove(){
        let args= Array.from(arguments);
        let kle=args[0]
        let urlParam= window.location.search;
        urlParam=new URLSearchParams(urlParam);

        if(args.length==1 && kle!=""){
            if(this.verifyeEgzistansKle(kle)==false){
                throw new KeyDoesNotExistError("KeyDoesNotExistError")
            }else{
                urlParam.delete(kle);
                history.pushState(null,"",'?'+urlParam.toString());
                let url=window.location.href;
                let newUrl=url.split('?');
                console.log("new url"+newUrl[0]+" "+newUrl[1]+"yowww");

                if(newUrl[1]==""){
                    url=newUrl[0];
                    history.pushState(null,"",url);
                }
            }
        }else{
            throw new TypeError("TypeError")
        }
    }

    verifyeEgzistansKle(kle){
        let url=window.location.search;
        let param= new URLSearchParams(url);
        let test=false;
        if(param!=''){
            if(param.has(kle)){
            test=true; 
            }else{
                test=false;
            }
        }else{
            console.log("there is no param");
        }
        return test;
    }
}

ur= new URLPush();