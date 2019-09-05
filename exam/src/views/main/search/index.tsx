import * as React from 'react'
import { observer, inject } from 'mobx-react'

interface Propsearch {
    search: any
}

@inject('search')
@observer
class Search extends React.Component<Propsearch> {
    public state = {
        list: []
    }
    public render() {
        // console.log(this.state.list)
        return (
            <div className="row">
                <div className="row1">课程:</div>
                <div className="row2">
                    <div className="control">
                        <span className="child">
                            <span className="tag">All</span>
                            {this.state.list.map((item: any, index) => {
                                return (
                                    <span className="tag" key={index}>
                                        {item.subject_text}
                                    </span>
                                )
                            })}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
    public componentDidMount() {
        const { search } = this.props.search
        search().then((resolve: any, reject: any) => {
            // console.log(resolve.data)
            this.setState({
                list: resolve.data
            })
        })
    }
}

export default Search
