import { action } from 'mobx'
import { examtype } from '../../service/index'

class Examtype {
    @action public async examtype(params: any): Promise<any> {
        const result: any = await examtype(params)
        console.log(result, '...examtype')
        return result
    }
}

export default Examtype
