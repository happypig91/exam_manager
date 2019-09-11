import { action, observable } from 'mobx'
import {
    getClassManger, //班级管理
    getAddClass, //添加班级
    getClasses, //获取所有教室号接口
    getAddClasses, //添加教室号接口
    getDeleteClass, //删除班级
    getUpdateClass, //更新班级
    getStudentClass, //获取学生班级信息
    getDeleteClasses, //删除教室
    studentDelet//删除学生接口
} from '../../service/index'

class Question {
    @observable

    @action async getClassManger(params: any): Promise<any> {
        let result: any = await getClassManger(params)
        return result
    }
    @action async getAddClass(params: any): Promise<any> {
        let result: any = await getAddClass(params)
        return result
    }

    @action async getClasses(params: any): Promise<any> {
        let result: any = await getClasses(params)
        return result
    }
    @action async getAddClasses(params: any): Promise<any> {
        let result: any = await getAddClasses(params)
        return result
    }
    @action async getDeleteClass(params: any): Promise<any> {
        let result: any = await getDeleteClass(params)
        return result
    }

    @action async getUpdateClass(params: any): Promise<any> {
        let result: any = await getUpdateClass(params)
        return result
    }
    @action async getStudentClass(): Promise<any> {
        let result: any = await getStudentClass();
        return result
    }
    @action async getDeleteClasses(params: any): Promise<any> {
        let result: any = await getDeleteClasses(params)
        return result
    }
    @action async studentDelet(id: any): Promise<any> {
        let result: any = await studentDelet(id)
        return result
    }
}

export default Question
