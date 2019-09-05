import User from './modules/user'
import Search from './modules/search'
import Type from './modules/type'
import Examtype from './modules/examtype'

const user = new User()
const search = new Search()
const type = new Type()
const examtype = new Examtype()

export default {
    examtype,
    search,
    type,
    user
}
