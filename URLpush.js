const DEBUG = true
const log = (value) => DEBUG && console.log(value)

//- -\\
let url = new URL(window.location.href)
log(url.searchParams.toString()) 
let object = {
    project : "shirt",
    color : "blue "
}
// let queryString = window.location.search; // sa se yon metòd ki pèmèt mwen rekipere tout paramèt yo san non domèn nan
// const full_url = new URL(window.location.href) // mwen jis met sa la pou n wè diferans lan; sa bay tout url la nèt(domèn + paramèt)
// let current_url = queryString
// let new_url

// console.log(queryString);
let urlParams = new URLSearchParams(object);
window.history.pushState({}, '', ["?",urlParams].join(""))
// log(window.location.search)

/**Mwen pral kreye metòd pou ajoute {kle=valè} nan URL la
 * Li p ap kraze sa k te la deja yo !!!
 */
const add = (search, value) => { 
    search = encode(search)
    value = encode(value)
    // object[search] = value
    // urlParams = new URLSearchParams(object);
    urlParams.set(search, value)
    window.history.replaceState({}, '', ["?",urlParams].join(""))
    
}
add("size", "xl")
add("author", "dave")
add("location?", "here?")

/**Mwen pral kreye metòd pou modifye yon kle nan URL la a kondisyon ke li egziste
 * Si nou just itilize metòd <.set> la, paj la p ap sispann reload,
 * se sa k fè mwen reyitilize metòd <pushState> la oubyen m te ka itilize <replaceState> tou
 */
const update = (search, value) => {
    urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has(search)) {
        urlParams.set(search, value)
        window.history.replaceState({}, '', ["?",urlParams].join(""))
    } else log("Can't update this key because it doesn't exist") // Bon la m pa konn si se yon eksepsyon n ap kreye oubyen n ap jis log
}

update("size", "sm")

//Pati get la

const get = (search) => {
    let couple, getter
    let entries = urlParams.entries();
    search = encodeURIComponent(search).replace(
        /[!'()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
    )
    for (couple of entries) {
        
        if (couple[0] == search) { 
            getter = `{${couple[0]}:"${couple[1]}"}` 
            break
        } else getter = undefined
    }
    return getter
}
log(get('color'))
log(get("size"))
log(get("location?"))

// Pati pou efase yon paramèt
const remove = (search) => {
    if (urlParams.has(search)) {
        urlParams.delete(search)
        window.history.replaceState({}, '', ["?",urlParams].join(""))
    } 
    else log("Key not found")
}
// remove()

function encode(str) {
    str = encodeURIComponent(str).replace(
        /[!'()*]/g,
        (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
    )
    return str
}
let o = encode("hello world &&*$%")
// log(o)
function decode(p) {
    p.toString()
    p = decodeURIComponent(p.replace(/\+/g, " "));
    return p
}
// log(decode(o))