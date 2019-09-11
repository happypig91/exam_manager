import { action, observable } from 'mobx'
import {
    getQuestionTypes, //考试类型
    getQuestionsType, //题目类型
    getQuestionSubject, //课题
    getQuestionExam, //试题列表 详情数据
    getAddexam, //添加试卷
    getUpdataexam, // 编辑更新试题
    getAddExamType, //添加试题类型
    getWaitexam, //待批班级列表
    getUserInfo //获取当前用户的id信息
} from '../../service/index'

class Question {
    @observable topList: any = []


    @action async getQuestionsType(params: any): Promise<any> {
        let result: any = await getQuestionsType(params)
        return result
    }
    @action async getQuestionSubject(): Promise<any> {
        let result: any = await getQuestionSubject()
        return result
    }
    @action async getQuestionExam(params: any): Promise<any> {
        let result: any = await getQuestionExam(params)
        console.log(result)
        return result
    }

    @action async getQuestionTypes(params: any): Promise<any> {
        let result: any = await getQuestionTypes(params)
        return result
    }

    @action async getAddexam(params: any): Promise<any> {
        let result: any = await getAddexam(params)
        return result
    }

    @action async getWaitexam(params: any): Promise<any> {
        let result: any = await getWaitexam(params)
        return result
    }

    @action async getUpdataexam(params: any): Promise<any> {
        let result: any = await getUpdataexam(params)
        return result
    }
    //添加试题类型
    @action async getAddExamType(params: any): Promise<any> {
        let result: any = await getAddExamType(params)
        return result
    }
    @action async getUserInfo(): Promise<any> {
        let result: any = await getUserInfo()
        return result
    }
}

export default Question
