// 字符串是否为空
const isNullAndEmpty = function isNullAndEmptys(str){
	if(str == "" || str == null || str == undefined){
		return true
	}else{
		return false
	}
}

// 两个字符串是否相同
const isEqual = function equal(str1,str2){
	if(str1 === str2){
		return true
	}else{
		return false
	}
}

/*
 * 验证手机号是否合格
 * true--说明合格
 */
export function isPhone(phoneStr) {
  let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!myreg.test(phoneStr)) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
    isNullAndEmpty,
	isEqual,
	isPhone
}
// public class StringUtil {

//     public StringUtil(){

//     }

//     public static boolean isNullOrEmpty(String str){
//         return isNull(str) || "".equals(str);
//     }

//     public static boolean isNull(String str){
//         return str == null;
//     }

//     public static boolean equalsNull(String str){
//         return "null".equals(str);
//     }

//     public  static boolean isNullOrEmptyOrEmptyNull(String str){
//         return isNullOrEmpty(str) || equalsNull(str);
//     }
//     //是否是数字
//     public static boolean isNumber(String str){
//         Pattern pattern = Pattern.compile("[0-9]*");
//         return pattern.matcher(str).matches();
//     }

//     //是否是字母
//     public static boolean isLetter(String str){
//         Pattern pattern = Pattern.compile("[a-zA-Z]");
//         return pattern.matcher(str).matches();
//     }

//     //是否是汉字
//     public static boolean isChinese(String str){
//         Pattern pattern = Pattern.compile("[\u4e00-\u9fa5]");
//         return pattern.matcher(str).matches();
//     }

//     //是否是数字或字母
//     public static boolean isNumberOrLetter(String str){
//         Pattern pattern = Pattern.compile("[a-zA-Z0-9]*");
//         return pattern.matcher(str).matches();
//     }

//     //是否是电话号码
//     public static boolean isPhone(String str){
//         return isChinaPhoneLegal(str) || isHKPhoneLegal(str);
//     }

//     /**
//      * 大陆手机号码11位数，匹配格式：前三位固定格式+后8位任意数
//      * 此方法中前三位格式有：
//      * 13+任意数
//      * 145,147,149
//      * 15+除4的任意数(不要写^4，这样的话字母也会被认为是正确的)
//      * 166
//      * 17+3,5,6,7,8
//      * 18+任意数
//      * 198,199
//      */
//     public static boolean isChinaPhoneLegal(String str){
//         // ^ 匹配输入字符串开始的位置
//         // \d 匹配一个或多个数字，其中 \ 要转义，所以是 \\d
//         // $ 匹配输入字符串结尾的位置

//         Pattern pattern = Pattern.compile("^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[3,5,6,7,8])" +
//                 "|(18[0-9])|(19[8,9]))\\d{8}$");
//         return pattern.matcher(str).matches();
//     }

//     /**
//      * 香港手机号码8位数，5|6|8|9开头+7位任意数
//      */
//     public static boolean isHKPhoneLegal(String str){
//         // ^ 匹配输入字符串开始的位置
//         // \d 匹配一个或多个数字，其中 \ 要转义，所以是 \\d
//         // $ 匹配输入字符串结尾的位置

//         Pattern pattern = Pattern.compile("^(5|6|8|9)\\d{7}$");
//         return pattern.matcher(str).matches();
//     }

//     //字符的长度


// }
