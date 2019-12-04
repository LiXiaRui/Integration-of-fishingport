export default function containZone(checkList,flag,zoneString){
    var len = checkList.length
    flag = false
    for (var i = 0; i < len; i++){
        if (checkList[i] == zoneString){
            flag = true;
            return flag
       }
    }
    return flag
}