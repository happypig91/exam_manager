

import { action } from 'mobx'
import { type } from '../../service/index'

class Type {
    @action public async type(params: any): Promise<any> {
        const result: any = await type(params)
        console.log(result, '...type')
        return result
    }
}

export default Type