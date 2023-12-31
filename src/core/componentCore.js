//// Component ////
export class Component{
    constructor(payload={}){
        const {
            tagName = 'div', 
            state={},
            props = {}
        } = payload
        this.el = document.createElement(tagName)
        this.state = state
        this.props = props
        this.render()
    }
    render(){
    }
}

//// Router ////
function routeRender(routes){
    if(!location.hash){
        history.replaceState(null,'','/#')
    }
    const routerView = document.querySelector('router-view')
    //  http://localhost:1234/#/about?name=heropy
    //  #/about?name=heropy
    const [hash, queryString= ''] = location.hash.split('?')
    //a=123&b=456
    // ['a=123', 'b=456']
    // {a: '123', b: '456'}
    const query = queryString// 배열을 객체로 바꿈
    .split('&')
    .reduce((acc, cur)=>{
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
    },{})
    history.replaceState(query, '')

    const currentRoute = routes.find(route=> new RegExp(`${route.path}/?$`).test(hash))// 정규 표현식 부분은 넘어가자. 현재 주소와 일치되는 부분이 나오면 할당함
    routerView.innerHTML = ''
    routerView.append(new currentRoute.component().el)// 생성자 함수로 컴포넌트를 만듬
                                                      // 나는 생성자 함수의 이름으로 component를 쓰는게 이해가 안됨
                                                      // 우선 routes로 받은 객체 데이터에 component 속성의 값음 HOME이라는 클래스임
                                                      //chat-GPT의 설명을 적겠음
                                                      // currentRoute.component는 currentRoute 객체에서 component 속성을 가리킵니다
                                                      // 이 component 속성 의 값으로 해당 라우트에 연결된 컴포넌트 클래스가 들어 있다.(HOME 클래스)
                                                      //그렇기에 이 component 속성은 클래스 자체이다. 즉 생성자 함수를 가리키는 것
    window.scrollTo(0,0)
}
export function createRouter(routes){
    return function (){
        window.addEventListener('popstate', ()=>{
            routeRender(routes) // 페이지의 주소가 바뀔 때마다 또 호출
        })
        routeRender(routes) //최초 호출, popstate는 처음에 직접 동작하지 않음
    }
}

//// store ////
export class Store{
    constructor(state){
        this.state = {}
        this.observers = {}
        for(const key in state){
            Object.defineProperty(this.state, key, {
                get:() =>state[key] , //state['message']
                set: val =>{
                    state[key] =val
                    //this.observers['message']()
                    this.observers[key].forEach(observer=>observer(val))   //observers의 key로배열 데이터를 확인해서 cb를 사용함 observer가 각각의 cb, 필요한 경우에 setter에 들어온 val를 콜백 함수가 사용할수 있게 함
                }
            })
        }
    }
    subscribe(key,cb){ //어떤 데이터 감시, 변경이 감지되면 어떤 내용이 실행될건지 정의
        //{message: [cb1, cb2, cb3 ...]} 등록해놓은 subscribe 함수들이 실행 됨
        Array.isArray(this.observers[key])
            ?this.observers[key].push(cb)
            : this.observers[key] = [cb]
    }   
}