//一级页面
import Login from '../views/Login'
import HomePage from '../views/main/home'

//试卷管理
import AddList from '../views/main/questionManage/addList'
import CheckTextQuestion from '@/views/main/questionManage/checkTextQuestion'
import TextQuestion from '../views/main/questionManage/textQuestion'
import Detail from '../views/main/questionManage/detail'
import CheckTextEditor from '../views/main/questionManage/checkTextEditor'

//用户管理
import UserShow from '../views/main/UserManage/UserShow'
import AddUser from '../views/main/UserManage/addUser'

//考试管理
import ExamManage from '@/views/main/examManager/examManage/examManage'
import QuestionList from '@/views/main/examManager/questionList'
import ExamQuestionDetail from '@/views/main/examManager/examquestiondetail'
import AddExamList from '@/views/main/examManager/addExamList'

//班级管理
import ClassManger from '../views/main/ClassMange/classManger'
import ClassRoomer from '../views/main/ClassMange/classRoomer'
import StudentManger from '@/views/main/ClassMange/studentManger'

//待批班级
import WaitClass from '../views/main/WillClass/waitClass'
import ExamDetail from '../views/main/WillClass/examDetail'

import QuestionManage from '@/views/main/questionManage'
import UserManage from '@/views/main/UserManage'
import ExamManager from '@/views/main/examManager'
import ClassMange from '@/views/main/ClassMange'
import WillClass from '@/views/main/WillClass'

export default [
    {
        component: Login,
        path: '/login'
    },
    {
        children: [
            {
                path: '/home/question',
                title: 'menu.question.manger',
                component: QuestionManage,
                children: [
                    {
                        component: AddList,
                        title: 'menu.question.add',
                        path: '/home/question/addlist'
                    },
                    {
                        component: CheckTextQuestion,
                        title: 'menu.question.search',
                        path: '/home/question/checkTextQuestion'
                    },
                    {
                        component: TextQuestion,
                        title: 'menu.question.kind',
                        path: '/home/question/textQuestion'
                    },
                    {
                        component: Detail,
                        path: '/home/question/detail/:id?'
                    },
                    {
                        component: CheckTextEditor,
                        path: '/home/question/checkTextEditor/:id?'
                    }
                ]
            },
            {
                path: '/home/usermanage',
                title: 'menu.user.manger',
                component: UserManage,
                children: [
                    {
                        component: UserShow,
                        title: 'menu.user.show',
                        path: '/home/usermanage/usershow'
                    },
                    {
                        component: AddUser,
                        title: 'menu.user.add',
                        path: '/home/usermanage/adduser'
                    }
                ]
            },
            {
                path: '/home/exammanager',
                title: 'menu.exam.manger',
                component: ExamManager,
                children: [
                    {
                        component: ExamManage,
                        title: 'menu.exam.add',
                        path: '/home/exammanager/examManage'
                    },
                    {
                        component: QuestionList,
                        title: 'menu.exam.list',
                        path: '/home/exammanager/questionList'
                    },
                    {
                        component: ExamQuestionDetail,
                        path: '/home/exammanager/examQuestionDetail'
                    },
                    {
                        component: AddExamList,
                        path: '/home/exammanager/addExamList'
                    }
                ]
            },
            {
                path: '/home/classmange',
                title: 'menu.class.manger',
                component: ClassMange,
                children: [
                    {
                        component: ClassManger,
                        title: 'menu.class.manger',
                        path: '/home/classmange/classManger'
                    },
                    {
                        component: ClassRoomer,
                        title: 'menu.classroom.manger',
                        path: '/home/classmange/classRoomer'
                    },
                    {
                        component: StudentManger,
                        title: 'menu.student.manger',
                        path: '/home/classmange/studentManger'
                    }
                ]
            },
            {
                path: '/home/willclass',
                title: 'menu.read.manger',
                component: WillClass,
                children: [
                    {
                        component: WaitClass,
                        title: 'menu.read.waitclass',
                        path: '/home/willclass/waitClass'
                    },
                    {
                        component: ExamDetail,
                        path: '/home/willclass/examDetail/:id?'
                    }
                ]
            }
        ],
        component: HomePage,
        path: '/home'
    },
    {
        from: '/',
        to: '/login'
    }
]
