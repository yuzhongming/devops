/**
 * Created by aurora on 2017/5/22.
 */
var config = require('../../../../config');
var $util = require('../../../common/util/util');
var mysql = require('mysql');
var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');

exports.pageList = function(page, size, conditionMap, cb) {//容器时间要晚8小时，所以时间加了8小时
    var sql = "select b.projectName,a.*,DATE_FORMAT(date_add(a.createTime, interval 8 hour),'%Y-%m-%d %H:%i:%s') as warningTime from pass_develop_deploy_alert a  left join pass_develop_project_resources b on a.appId=b.projectCode where 1=1";
    var conditions = [];
    if(conditionMap) {
        if(conditionMap.appId) {
            sql += " and (a.appId ='"+conditionMap.appId+"' )";
        }
        if(conditionMap.status) {
            sql += " and (a.status = '" + conditionMap.status + "')";
        }
        if(conditionMap.appName) {
            sql += " and (b.projectName like '%" + conditionMap.appName + "%')";
        }
    }
     var orderBy = " order by a.createTime desc";
    console.log("查询项目信息sql ====",sql);
    utils.pagingQuery4Eui_mysql(sql,orderBy, page, size, conditions, cb);
};

/**
 * 更新告警状态信息
 * @param data
 * @param cb
 */
exports.update = function(data, cb) {
    var sql = "update pass_develop_deploy_alert set status = '0' where id in ("+data+")";
    mysqlPool.query(sql,[],function(err,result) {
        if(err) {
            cb(utils.returnMsg(true, '0000', '更新告警状态信息异常', null, err));
        } else {
            cb(utils.returnMsg(true, '0000', '更新告警状态信息成功', result, null));
        }
    });
};

