import { action } from 'mobx'
import { search } from '../../service/index'

class Search {
    @action public async search(params: any): Promise<any> {
        const result: any = await search(params)
        console.log(result, '...search')
        return result
    }
}

export default Search
