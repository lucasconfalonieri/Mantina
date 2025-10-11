var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');

let treeView = [];
let subjectCon= 0;
let topicCon = 0;
let contentCon = 0;

router.get('/', function(req, res, next) {
 

  dbConn.query('SELECT s.id_subject , s.name ,t.id_topic , t.name as topic_name , ct.id_content_topic , ct.name_pdf as content_name, ct.text_pdf as content_title FROM subjects s LEFT JOIN topics t ON t.id_subject = s.id_subject  LEFT JOIN contentstopics ct ON ct.id_topicc = t.id_topic ORDER BY s.id_subject , t.id_topic ',function(err,rows)     {

    if(err) {
        res.status(409).json({
            status: 'error',
            message: err,
          });
    } else {
      
      if(rows.length > 0){
        res.setHeader('Content-Type', 'application/json');
        addSubject(rows[subjectCon].id_subject, rows[subjectCon].name);
        
        if(rows[topicCon].id_topic != null){
          addTopic(rows[topicCon].id_topic, rows[topicCon].topic_name)
          if(rows[contentCon].id_content_topic != null){
              addContent(rows[contentCon].id_content_topic , rows[contentCon].content_name, rows[contentCon].content_title)
            }
        }}

        
        for (var i = 1; i < rows.length; i++) {

          if(rows[i].id_subject != treeView[subjectCon].id_subject ){
            subjectCon = subjectCon + 1;
            topicCon = 0;
            contentCon = 0;
            addSubject(rows[i].id_subject, rows[i].name);
          }

          if(rows[i].id_topic != null){

            if(treeView[subjectCon].topics.length == 0){
              addTopic(rows[i].id_topic, rows[i].topic_name)
            }else if(rows[i].id_topic != treeView[subjectCon].topics[topicCon].id_topic ){
              topicCon = topicCon + 1;
              contentCon = 0;
              addTopic(rows[i].id_topic, rows[i].topic_name)
            }
              
              if(rows[i].id_content_topic != null){
                contentCon = contentCon + 1;
                addContent(rows[i].id_content_topic , rows[i].content_name, rows[i].content_title)
              }
              
              
            
            
            }
          
        }
      
        res.end(JSON.stringify({ treeView}));
        treeView = []
        subjectCon= 0;
        topicCon = 0;
        contentCon = 0;
    }
});


});

function addSubject(id_subject , name) {
  treeView.push(     
    { 
      "id_subject" : id_subject , "subject_name" : name, 
      "topics" : 
      [
         
      ]
    })
}

function addTopic( id_topic , topic_name) {
  
  treeView[subjectCon].topics.push( {
    "id_topic" :  id_topic , "topic_name" : topic_name  ,
    "contents" : []
    })
}

function addContent( id_content_topic , content_name, content_title) {
  treeView[subjectCon].topics[topicCon].contents.push({
    "id_content" :  id_content_topic , "content_name" : content_name, "content_title" : content_title,
     })
}



module.exports = router;