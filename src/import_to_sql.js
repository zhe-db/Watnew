/**
 * Created by surfacebook on 5/6/2017.
 */
var request = require('request');
var validUrl = require('valid-url');
var jsonfile = require('jsonfile');
var face_list = require('./face_list_management');
var cheerio = require('cheerio');
var url = require('url');
var sql_client = require('./sql_client');
var mysql= require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'wangzhe1998',
    database : 'prof_profile'
});

connection.connect();
exports.insert_faceid = function insert_faceid(name,faceid){
    connection.query('update ignore prof_profiles set face_id = '+'"'+faceid+'"'+'where name ='+'"'+name+'"', function (error, results, fields) {
        if (error) throw error;
        if(results) console.log(results);
    });
};
exports.insert_id = function insert_personId(name,personid){
    connection.query('update ignore prof_profiles set person_id = '+'"'+personid+'"'+'where name ='+'"'+name+'"', function (error, results, fields) {
        if (error) throw error;
        if(results) console.log(results);
    });
};
function update_person_id(name,course){
    connection.query('update ignore prof_profiles set course_data = IFNULL(concat(course_data,'+'"'+course+'"'+'),'+'"'+course+'"'+')'+' where name ='+'"'+name+'"', function (error, results, fields) {
        if (error) throw error;
        if(results) console.log(results);
    });
}
    //update_person_id('ZHE WANG','CS 246','005','003');
    function update_courseinfo(){
        jsonfile.readFile('prof_profiles-3.json',function (err, obj) {
           for (var i = 0; i < obj.data.length; i++ ){
                   if(obj.data[i].name.indexOf('<') == -1){
                   var course_data = obj.data[i].course +"-"+obj.data[i].section+"&";
                  update_person_id(obj.data[i].name, course_data);
                   }
           }
        });
    }
    //update_courseinfo();
    function select_all_data_from_db () {
        connection.query('select * from prof_profiles limit 4000', function (error, results, fields) {
            if (error) throw error;
            if(results) {
                console.log(results);
                jsonfile.writeFile('prof_profiles_8.json',results,function(){});
                // for (var i = 0; i < results.length; i++) {
                //             var prof={};
                //             prof.name = results[i].name;
                //             prof.course_data = results[i].course_data;
                //             if(results[i].pic_urls){
                //                 var array = results[i].pic_urls.split(',');
                //                 //console.log(array)
                //                 insert_request(array,prof,i);
                //             }}
            }
        });
    }
    function insert_request (array,prof,i) {
        setTimeout(function(){
            //console.log(prof.name);
            face_list.create_person('1365221911',prof,array);
            //face_list.get_gender(array,prof,i);
        },i*500);
    }
    //select_all_data_from_db();
    function insert_url (name,url) {
        //console.log(url);
        connection.query('update prof_profiles set pic_urls ='+'"'+url+'"'+' where name ='+'"'+name+'"', function (error, results, fields) {
            if (error) throw error;
            if(results) console.log(results);
        });
    }
    function update_url(){
        jsonfile.readFile('prof_profiles-4.json',function (err, obj) {
            for (var i = 0; i < 10; i++ ){
                if(obj.data[i].name.indexOf('<') == -1){
                    if(obj.data[i].url){
                        var pic_url = String((obj.data[i].url));
                        //var url = "[https://uwaterloo.ca/biology/sites/ca.biology/files/uploads/images/heidi-swanson_dsc0019.jpg"]";
                       console.log(pic_url);
                        insert_url(obj.data[i].name, pic_url);
                    }
                    //console.log(pic_url);
                    //update_person_id(obj.data[i].name, course_data);
                    //console.log(pic_url);

                }
            }
        });
    }
    //update_url();
    select_all_data_from_db();
   //insert_personId('ZHE WANG','0001');