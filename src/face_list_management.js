/**
 * Created by WangZheZen on 2/20/2017.
 */
// key :bdb4c54829f6451785d8a65da26aad90
/**
 * Created by WangZheZen on 2/24/2017.
 */
//uuwpf uwpm
var mysql= require ('mysql');
var prof= require ('./prof_pic');
var face_list = require('./face_list_management');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'wangzhe1998',
    database : 'prof_profile'
});
var number = 0;
connection.connect();
var request = require ("request");
var uwaterlooApi= require ('uwaterloo-api');
var uwclient = new uwaterlooApi ({
    API_KEY : '743887d93f1df944a7acae0f78741746 '
});
var new_sql = require('./import_to_sql');

   exports.create_group = function  create_group(id, name, content)
{
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + id,
        headers: {
            "Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"
        },
        method: "PUT",
        body: JSON.stringify({
            "name": name,
            "userData": content
        })
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
//create_group("uwaterloo201702");

   exports.get_group = function get_group (id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + id,
        method: "GET",
        headers: {
            "Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};

//get_group("uwaterloo201702");

// function create_person (group_id,name,data) {
//     var options ={
//       url:"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+group_id+"/persons",
//         method:"POST",
//         headers:{
//             "Ocp-Apim-Subscription-Key":"bdb4c54829f6451785d8a65da26aad90"
//         },
//         body:JSON.stringify({
//             "name":name,
//             "userData":data
//         })
//     };
// }
// function course_list (){
//     (uwclient.get('/courses',function (err,res) {
//         if (!err){
//             console.log(sort_courses(res.data));
//         }}));
//
//     function sort_courses (list){
//         var arr=[];
//         for (var i =0;i<list.length;i++){
//             arr.push(list[i].subject+" "+list[i].catalog_number);
//         }
//         return arr;
//     }
//
//
//
// }
// course_list();
 exports.delete_group = function delete_group(id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + id,
        method: "delete",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
// delete_group("uwaterloo201702");
  exports.train_group = function train_group(group_id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + group_id + "/train",
        method: "POST",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
// train_group("uwaterloo201702");
  exports.list_group = function list_group() {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups",
        method: "get",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
// list_group();
 exports.update_group = function update_group(group_id, name, content) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + group_id,
        headers: {
            "Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"
        },
        method: "patch",
        body: JSON.stringify({
            "name": name,
            "userData": content
        })

    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
//update_group("uwaterloo201702","uwaterloo professors",'Professors in University of Waterloo');
//get_group('uwaterloo201702');

  exports.train_status = function train_status(id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + id + "/training",
        method: "get",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
  exports.update_face = function upload_face(person_id, group_id,content,array,i){
    var options ={
        url:"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+group_id+"/persons/"+person_id+"/persistedFaces?userData="+array[i],
        headers:{"Ocp-Apim-Subscription-Key":"a9c4373a10ec4e17a1c71e3fa84f7506"},
        method:"post",
        body: JSON.stringify(
      {
          "url":array[i]
      }
        )
    };
      function callback(error, response, body) {
          if (error) {
              console.log(error);
              if (i+1 < array.length){
              face_list.update_face(person_id, group_id, content, array, i+1);
            }
          }
          //console.log('gg')
          if (!error && response.statusCode == 200) {
             // new_sql.insert_faceid(content.name,JSON.parse(body).persistedFaceId);

              // console.log(typeof JSON.parse(body));
              //face_list.update_person_id(content.name,content.course,content.section,JSON.parse(body).personId);
          }

          else {
              console.log(body);
              if (i+1 < array.length){
                  face_list.update_face(person_id, group_id, content, array, i+1);
              }
              //  console.log(response);
          }
      }
      request(options, callback);
};
// train_status('uwaterloo201702');
  exports.create_person = function create_person (group_id,content,array) {
    var options ={
        url:"https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+group_id+"/persons",
        headers:{"Ocp-Apim-Subscription-Key":"a9c4373a10ec4e17a1c71e3fa84f7506"},
        method:"post",
        body: JSON.stringify({
            "name":content.name,
            "userData":content.course_data
        })
    };
    function callback(error, response, body) {
        if (error) throw error;
        //console.log('gg')
        if (!error && response.statusCode == 200) {
            var person_id = JSON.parse(body).personId;
           // new_sql.insert_id(content.name,person_id, content, array);
            face_list.update_face(person_id, '1365221911', content, array,0);
           // console.log(typeof JSON.parse(body));
            //face_list.update_person_id(content.name,content.course,content.section,JSON.parse(body).personId);
        }

        else {
            console.log(error);
          //  console.log(response);
        }
    }
    request(options, callback);
  };
// create_person("uwaterloo201702",{"name":"ZHE_WANG","core":{"course":[{"course_code":"CS 136","section":"003"}]}});
    exports.update_person_id = function update_person_id(name, course, section, id) {
    connection.query('update prof_profiles set person_id = ' + '"' + id + '"' + 'where name =' + '"' + name+'"', function (error, results, fields) {
        if (error) {console.log(name+" "+course+section+" error");}
        if (results) console.log(results.message);
    });
};
  exports.list_person_in_persongroup = function list_person_in_persongroup(id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + id + "/persons",
        method: "GET",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(JSON.parse(body));

        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};


 exports.upload_face = function upload_face(name, face, person_id, group_id) {

    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + group_id + "/persons/" + person_id + "/persistedFaces?userData="+face,
        method: "POST",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"},
        body: JSON.stringify({
            "url": face

        })
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
 exports.detect_face = function detect_faces(face) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect",
        method: "POST",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"},
        body: JSON.stringify({
            "url": face

        })
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body)[0].faceId);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
  exports.verify = function verify(face, group_id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/identify",
        method: "POST",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"},
        body: JSON.stringify({
            "personGroupId": group_id,
            "faceIds": [
                face
            ],
            "maxNumOfCandidatesReturned": 1,
            "confidenceThreshold": 0.5
        })
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body)[0].candidates);
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};

 exports.get_person = function get_person(person_id, group_id) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/" + group_id + "/persons/" + person_id,
        method: "GET",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"}


    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
        }

        else {
            console.log(body);
            console.log(response);
        }
    }

    request(options, callback);
};
 exports.get_gender = function get_gender (array,prof,i) {
    var options = {
        url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=false&returnFaceLandmarks=false&returnFaceAttributes=gender",
        method: "POST",
        headers: {"Ocp-Apim-Subscription-Key": "4db4e7fa5c6a4cbdb36a9ca93ef1cdf2"},
        body: JSON.stringify({
            "url": array[i]
        })
    };
    function callback(error, response, body) {
        if (error) throw error;
        if (!error && response.statusCode == 200) {
            if (JSON.parse(body)) {
                console.log(JSON.parse(body));
                if  (JSON.parse(body)[0]) {
                if (JSON.parse(body)[0].faceAttributes.gender == 'female') {
                    // console.log('gg');
                    face_list.create_person('uwpf', prof);
                }
                if (JSON.parse(body)[0].faceAttributes.gender == 'male') {
                    face_list.create_person('uwpf', prof);
                }
                else{
                    if(i+1<array.length){
                        get_gender(array,prof,i+1);
                    }
                }
            }

            else  {
              //
                    //console.log('pic gender identify fail '+face+" "+prof);
                    if(i+1<array.length){
                        get_gender(array,prof,i+1);
                    }
              //  console.log(body);
              //  console.log(response);
            }
        }
    }}
    request(options, callback);
};

 //get_gender("https://www.student.cs.uwaterloo.ca/~cs136/images/veronika.jpg");
 //   list_person_in_persongroup('uw001');
//prof.search_prof("Veronika Irvine");
//get_group('uwaterloo201702')
//face_list.create_group('uw00f','Prof_Profiles_Female','Profiles for female professors in UW');
//face_list.get_group('uw00f');
//get_group('uw0002');
//create_person('uw001',{name:"Zhe Wang",course:"CS 136",section:"003"});
//upload_face("Zhe Wang","http://i1.2pcdn.com/node14/image/article/201312/05/20131205031532a0dndlw135vyd4za.jpg","72ba827f-4ba3-4274-9b0b-b4167e158a15","uw001");
//verify("7e6f71a6-99b3-4987-ad3a-a227ed88f24b","uw001");
//detect_faces("http://img-cache.cdn.gaiaonline.com/e53af749f9aaaa1ce8d3dbe3ab7cc5c0/http://i234.photobucket.com/albums/ee154/shibara1310/Final%20Fantasy/Crisis%20Core/CrisisCoreFinalFantasyVII-zack2.jpg")
//get_person("72ba827f-4ba3-4274-9b0b-b4167e158a15","uw001");
//prof.search_prof('Veronika Irvine',{'name':'Veronika Irvine','course':'CS 136','section':'003'});
//face_list.get_group('uw002');
//face_list.list_person_in_persongroup('uw00f');
//face_list.create_group()
//face_list.create_group('uwpf','Female Professor Profiles','Profiles for female professors in UW');
//face_list.list_group();
//face_list.create_group('uwpm','Male Professor Profiles','Profiles for male professors in UW');
//face_list.train_group('uwpf');
//face_list.list_person_in_persongroup('uwpf');
//face_list.create_group('1365221911','UWaterloo professor',"University of Waterloo Professors");
//face_list.list_person_in_persongroup(20651383);