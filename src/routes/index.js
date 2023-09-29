//페이지 제어 하는 기본 파일
import {createRouter} from '../core/componentCore'
import Home from './Home'
import About from './About'

export default createRouter([
    {path: '#/', component: Home}, //component는 클래스를 value로 가지고 있음
    {path: '#/about', component: About},
])