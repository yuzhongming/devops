
/**
 * Created by acer on 2017/5/11.
 */
var utils = require('../../../common/core/utils/app_utils');
var mysqlPool = require('../../utils/mysql_pool');
var config = require('../../../../config');
var https = require('https');

exports.getResourceByConoly = function(cb){
    var sql='select * from pass_operation_colony_info';
    mysqlPool.query(sql, function(err, results){
        if(err) {
            cb(utils.returnMsg(false, '1000', '讀取硬件信息出错', null, err));
        } else {
            if(results && results.length > 0) {
                cb(utils.returnMsg(true, '0000', '讀取硬件信息成功', results, null));
            }
        }
    });
}

exports.getHostInfo = function(cb){
    var sql='select * from pass_operation_host_info';
    mysqlPool.query(sql, function(err, results){
        if(err) {
            cb(utils.returnMsg(false, '1000', '讀取主机信息出错', null, err));
        } else {
            if(results && results.length > 0) {
                cb(utils.returnMsg(true, '0000', '讀取主机信息成功', results, null));
            }
        }
    });
}