const DEBUG = true
const log = (value) => DEBUG && console.log(value)

//- -\\
let url_ = "?product=shirt&color=blue&newuser&size=m" //url mwen pral ajoute nan browser a touswit aprè domèn nan 
window.history.pushState({}, '', url_) // mwen push li la
let queryString = window.location.search; // sa se yon metòd ki pèmèt mwen rekipere tout paramèt yo san non domèn nan
const full_url = new URL(window.location.href) // mwen jis met sa la pou n wè diferans lan; sa bay tout url la nèt(domèn + paramèt)
let current_url = queryString, new_url

// console.log(queryString);
let urlParams = new URLSearchParams(queryString);

/**Mwen pral kreye metòd pou ajoute {kle=valè} nan URL la
 * Li p ap kraze sa k te la deja yo !!!
 */
const add = (search, value) => { 
    new_url = current_url + `&${search}=${value}`
    window.history.replaceState({}, '', new_url)
    current_url = window.location.search 
}

let couple, getter

/**Mwen pral kreye metòd pou modifye yon kle nan URL la a kondisyon ke li egziste
 * Si nou just itilize metòd <.set> la, paj la p ap sispann reload,
 * se sa k fè mwen reyitilize metòd <pushState> la oubyen m te ka itilize <replaceState> tou
 */
const update = (search, value) => {
    if (urlParams.has(search)) {
        urlParams.set(search, value)
        window.history.pushState({}, '', urlParams)
    } else log("Can't update this key because it doesn't exist") // Bon la m pa konn si se yon eksepsyon n ap kreye oubyen n ap jis log
}

const
    keys = urlParams.keys(),
    values = urlParams.values(),
    entries = urlParams.entries();

//Pati get la

const get = (search) => {
    for (couple of entries) {
        if (couple[0] == search) { 
            getter = `{${couple[0]}:"${couple[1]}"}` 
            break
        } else getter = undefined
    }
    return getter
}
// log(get('color'))

// Pati pou efase yon paramèt
const remove = (search) => {
    if (urlParams.has(search)) {
        urlParams.delete(search)
        window.history.replaceState({}, '', urlParams)
    } 
    else log("Key not found")
}

log(add("boulgrenn", 2))
log(add("laj", 20))
// 
log(window.location.search)
/**Limit pwogram nan:
 * Pafwa mwen jwenn erè <Cannot GET> sou URL la. 
 * Sa se lè m ap fè on pakèt tès
 * Men depi m fèmen sèvè a, epi m reouvè l, tout bagay ok.
 * M panse sa s on pwoblèm kanmèm.
 */