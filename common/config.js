//访问端口
// export const BASIC_API = "http://192.168.31.65:8081/";
export const BASIC_API = "http://10.163.208.196:8081/";

//登录
export const LOGIN_API = BASIC_API + "user/signIn";

// 修改密码
export const UPDATEPASSWORD_API = BASIC_API + "user/updatePassword";

// 个人信息 家长
export const PERSONALINFORMATIONFAMILY_API = BASIC_API + "user/personalInformationFamily";

// 个人信息 学校
export const PERSONALINFORMATIONSCHOOL_API = BASIC_API + "user/personalInformationSchool";

// 根据账号查询班级
export const GRADE_API = BASIC_API + "userGrade/userClass";

// 根据班级 id 查询该班级所有的学生和教师
export const PEOPLE_API = BASIC_API + "userGrade/userTeacher";

// 根据账号查询个人信息详情
export const PERSONALDETAILS_API = BASIC_API + "user/familyPersonalDetails";

//根据班级与年级名称查询班级与年级的 id
export const GRADECLASS_API = BASIC_API + "grade/gradeClassId";

// 根据班级与年级id查询班级与年级名称
export const GRADECLASSNAME_API = BASIC_API + "grade/gradeClassName";

// 发布通知信息
export const NOTICEINFORMATION_API = BASIC_API + "noticeInformation/schoolNoticeInformationRelease";

//根据班级与年级 id 查询发布的信息列表
export const NOTICELIST_API = BASIC_API + "noticeInformation/noticeFamilyDetails";

// 修改数据库里的 showBadge 属性
export const SHOWBADGE_API = BASIC_API + "noticeInformation/updateShowBadge";

// 根据 id 获取通知信息
export const INFORMATIONBYID_API = BASIC_API + "noticeInformation/informationById";

// 根据 id 修改通知信息
export const UPDATEINFORMATIONBYID_API = BASIC_API + "noticeInformation/updateInformation";

//根据 id 删除通知记录
export const DELETEINFORMATION_API = BASIC_API + "noticeInformation/noticeSchool";

// 发布作业信息
export const HOMEWORK_API = BASIC_API + "userHomework/homeworkSchoolRelease";

//根据班级与年级 id 查询发布的作业信息列表
export const HOMEWORKLIST_API = BASIC_API + "userHomework/homeworkFamily";

// 修改数据库里的 showBadge 属性
export const SHOWBADGEHOMEWORK_API = BASIC_API + "userHomework/updateHomeworkShowBadge";

// 根据 id 获取作业信息
export const HOMEWORKBYID_API = BASIC_API + "userHomework/homeworkById";

// 根据 id 修改作业信息
export const UPDATEHOMEWORKBYID_API = BASIC_API + "userHomework/updateHomework";

//根据 id 删除作业记录
export const DELETEHOMEWORK_API = BASIC_API + "userHomework/homeworkSchoolDetails"; 

// 图片上传接口
export const IMGUPLOAD_API = BASIC_API + "growRecord/imgUpload"; 

// 上传图片到数据库
export const SAVEIMG_API = BASIC_API + "growRecord/saveImg";   

// 根据 gradeclass_id 获取成长记录
export const RECORDINFORMATION_API = BASIC_API + "growRecord/recordInformation"; 

// 根据 gradeclass_id 与 描述 修改成长记录
export const UPDATERECORD_API = BASIC_API + "growRecord/updateRecord";
 
// 根据 id 删除成长记录
export const DELETERECORD_API = BASIC_API + "growRecord/deleteRecord";

// 添加头像
export const INSERTURL_API = BASIC_API + "picture/insertUrl";

// 查询头像
export const SELECTURL_API = BASIC_API + "picture/selectUrl";

// 修改头像
export const UPDATEURL_API = BASIC_API + "picture/updateUrl";

// 添加成绩
export const INSERTSCORE_API = BASIC_API + "score/insertScore";

// 根据班级与年级 gradeclass_id 与科目 查询该班级该科目近五次考试的考试名称
export const SELECTSCORENAME_API = BASIC_API + "score/seclectScoreName";

// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
export const SELECTSTUDENTSCORE_API = BASIC_API + "score/selectStudentScore";

// 根据班级与年级 gradeclass_id 、科目、考试名称 删除该班级所有学生的考试成绩
export const DELETESCORE_API = BASIC_API + "score/deleteScore";

// 根据班级与年级 gradeclass_id 、科目、考试名称 修改该班级所有学生的考试信息
export const UPDATESCORE_API = BASIC_API + "score/updateScore";