﻿
$(document).keydown(function(event){ //监听键盘按下时的事件
	if(event.keyCode == 13){
        
        var key = $(".key").val();
        if(key == ""){
            alert('关键词不能为空！');
            return ;
        }else{
            var data = {
                word:key
            };
            ajax('getknowledge',data,function(res){
                if(res.length == 0){
                    alert('没有搜索到相关信息！');
                    return ;
                }
                var name = (res[0].Name);
                var word = (res[0].info);
                var url = (res[0].url);
                var word1 = $('.word1')
                var word3 = $('.word3')
                var word4 = $('.word4 a')
                word1.text(name);
                word3.text(word);
                word4.attr('href',url);
                word4.text(url);
                $('.modal').show();
            });
        }
        
    } 
})
function getmajor(){
    ajax('getmajor',{},function(res){
        for(var i = 0 ; i < res.length ; i++){
            $('#major .dropdown_menu').append(
                "<a href='test1.html?majorID="+res[i].majorID+"'>"+res[i].majorName+"</a>"
            )
        }
       
    })
}
getmajor();
function checklogin(){
    var user = JSON.parse(localStorage.getItem('user'))
    if(user){
        var time = new Date();
    if(time.getTime()  > user.time){
        alert('登录验证已超时，请重新登录');
        localStorage.removeItem('user');
        location.href = 'index.html';
        $('.login-wrap').show();
    }else{
        $('#session').show();
        $('#user').html(user.username);
        
    }
    }else{
        $('.login-wrap').show();
    }
    
}
checklogin();
function login(){
    var username = $('#username');
    var password = $('#password');
    if(!checkphone(username)){
        alert('手机格式错误，请检查')
        return ;    
    }
    if(username.val() == ''){
        alert('用户名不能为空');
        return ;
    }
    if(password.val() == ''){
        alert('密码不能为空');
        return ;
    }
    var data = {
        'username':username.val(),
        'password':password.val()
    }
    ajax('login',data,function(res){
        if(res.status == 200){
            alert(res.message);
            var time = new Date();
           
            var sessionData = {
                username:username.val(),
                pwd:password.val(),
                time:time.getTime()+36000000
            }
            var sessionDatastring = JSON.stringify(sessionData);
            localStorage.setItem('user',sessionDatastring)
            
            username.val('');
            password.val('');
            location.href = 'index.html';
            
        }else{
            alert(res.message);
            username.val('');
            password.val('');
        }
    })   
}
function checkphone(poneInput) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(poneInput.val())) {
        return false;
    } else {
        return true;
    }
}
function countnum(){
    ajax('addF',{},function(){
            
    })
}
countnum();
function register(){

    var usernames = $('#usernames');
    var passwords = $('#passwords');
    var repasswords = $('#repasswords');
    if(!checkphone(usernames)){
        alert('手机格式错误，请检查')
        return ;    
    }
    if(usernames.val() == ''){
        alert('用户名不能为空');
        return ;
    }
    if(passwords.val() == ''){
        alert('密码不能为空');
        return ;
    }   
    if(repasswords.val() == ''){
        alert('请重复输入密码');
        return ;
    } 
    if(passwords.val() != repasswords.val()){
        alert('两次输入的密码不一致，请重试');
        passwords.val('');
        repasswords.val('');
        return ;
    }
    var data = {
        'usernames':usernames.val(),
        'passwords':passwords.val()
    }
    ajax('register',data,function(res){
        if(res.status == 200){
            var data3 = {
                'username':usernames.val(),
                'type':1,
                'target':''
            };
            ajax('integration',data3,function(res){
                if(res.codenum == 2){
                    alert(res.message);
                }else{
                    alert(res.message);
                }
            }) 
            alert('注册成功，请登录');
            $('#tab-1').click();
        }else{
            alert(res.message);
            usernames.val('');
            passwords.val('');
            repasswords.val('');
        }
    })
    // if(){

    // }
}
if($('.close').length > 0){
    var modal = $('#myModal');
    var span = document.querySelector('.close');
    span.onclick = function () {
    
        modal.hide();
    }
}

function getUrlParam(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 
if($('.list1').length > 0 ){
    
    ajax('testbydate',{},function(res){
        for(var j = 0 ; j < res.length ; j++){
            $('.list').append(
                "<li>"
                +"<a href='exams/exams.html?testID="+res[j].testID+"' title='"+res[j].testName+"' target='_blank'>"+res[j].testName+"</a>"
                +"<span>"+res[j].createtime+"</span>"
            +"</li>"
            );
        }
    });

    ajax('getcase1',{},function(res){
        for(var i = 0 ; i < res.length ; i++){
            $('.list3').append(
                "<li>"
                +"<a href='discussion1_1.html?id="+res[i].caseID+"' title='"+res[i].caseName+"' target='_blank'>"+res[i].caseName+"</a>"
                +"<span>"+res[i].createtime+"</span>"
            +"</li>"
            );
        }  
    })
    
}
if($('#subject').length > 0 ){
    var id = getUrlParam('majorID');
    var data = {
        id:id
    };
    ajax('getmajorbyid',data,function(res){
        $('#path').attr('href','test1.html?majorID='+res[0].majorID)
        $('#path').text(res[0].majorName);
        $('#majorName span').text(res[0].majorName);
        $('#majorenglishName span').text(res[0].englishname);
    })
    ajax('getsubject',data,function(res){
        for(var i = 0 ; i < res.length ; i++){
            var str = '';
            
            $('#subjectitem').append(
                "<li style='height: 35px; border-bottom: 1px solid #D8D8D8; text-align: left; font-size: 16px; padding-left: 10px; width: 220px; display: block; line-height: 35px;'>"
                +"<a href='test1_1.html?id="+res[i].subjectID+"'>"+res[i].subjectName+"<span style='float: right;'></span></a></li>"
            );
            for(var j = 0 ; j < res[i].test.length ; j++){
                str = str+"<tr style='height:35px; background: #eff5e6;'>"
                +"    <td style='border-right: 1px solid #fff; text-align: center;'>"+parseInt(j+1)+"</td>"
                +"    <td style='border-right: 1px solid #fff; text-align: center;'><a href='exams/exams.html?testID="+res[i].test[j].testID+"' target='_blank'>"+res[i].test[j].testName+"</a></td>"
                +"    <td style='border-right: 1px solid #fff; text-align: center;'><a href='exams/exams.html?testID="+res[i].test[j].testID+"' target='_blank'>进入答题</a></td>"
                +"</tr>";
                
                
            }
            $('#subjecttest').append(
                '<tbody>'+
                +'<tr>'
                +"    <th style='padding: 8px 50px; text-align: center; background: #eff5e6; color: #3e88bf;'><strong>项目编号</strong></th>"
                +"    <th style='padding: 8px 175px; text-align: center; background: #eff5e6; color: #3e88bf;'><strong>项目名称</strong></th>"
                +"    <th style='padding: 8px 70px; text-align: center; background: #eff5e6; color: #3e88bf;'><strong>操作</strong></th>"
                +"</tr>"
                +"<tr>"
                +"    <td colspan='6' style='text-align: left; background: #8fb6d6; padding-left: 15px; color: #000;'><h6 style='font-size: 16px;'><strong>● "+res[i].subjectName+"</strong></h6></td>"
                +"</tr>"
                +str
              
                +"<tr>"
                +"    <td colspan='6' style='text-align: center; height: 30px; background: #35454f; color: #fff;'><a href='test1_1.html?id="+res[i].subjectID+"'>更多</a></td>"
                +"    </tr>"
               +"</tbody>"
               
            );
            
        }  
    });

   

}