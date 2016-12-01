<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Asia/Karachi');
include("servermodal.php");


function fn_Login(){

	$email = $_REQUEST['EMAIL'];
	$pass = $_REQUEST['PASSWORD'];
	return Autoship::model_login($email,$pass);
	//echo Portal::server_login("chzunair453@gmail.com","12345","admin");
}


function fn_addEmployee(){

	$name = $_REQUEST['NAME'];
	$cnic = $_REQUEST['CNIC'];
	$email = $_REQUEST['EMAIL'];
	$password = $_REQUEST['PASSWORD'];
	$contact = $_REQUEST['CONTACT'];
	$dob = $_REQUEST['DOB'];
	$role = $_REQUEST['ROLE'];
	return Autoship::model_addEmployee($name,$cnic,$email,$password,$contact,$dob,$role);
	//echo Portal::server_login("chzunair453@gmail.com","12345","admin");
}

function fn_getProfile(){

	$uid = $_REQUEST['User_id'];

	return Autoship::model_getProfile($uid);

}

// admin wants to check all employees. so get all employees except admin
function fn_allEmployee(){

	$uid = $_REQUEST['User_id'];

	return Autoship::model_allEmployee($uid);

}

function fn_deleteEmployee(){

	$uid = $_REQUEST['User_id'];

	return Autoship::model_deleteEmployee($uid);

}

function fn_editProfile(){

	$uid = $_REQUEST["User_id"];
	$name = $_REQUEST['NAME'];
	$cnic = $_REQUEST['CNIC'];
	$email = $_REQUEST['EMAIL'];
	$contact = $_REQUEST['CONTACT'];
	$dob = $_REQUEST['DOB'];
	$role = $_REQUEST['ROLE'];
	return Autoship::model_editProfile($uid,$name,$cnic,$email,$contact,$dob,$role);

}
function fn_changePassword(){

	$uid = $_REQUEST['User_id'];
	$old_password = $_REQUEST['password1'];
	$new_password = $_REQUEST['password2'];
	return Autoship::model_changePassword($uid,$old_password,$new_password);

}

function fn_get_allOrders(){

	return Autoship::model_get_allOrders();

}

function fn_update_status(){
	$oid = $_REQUEST['order_id'];
	$status = $_REQUEST['status'];
	return Autoship::model_update_status($oid, $status);
}


function fn_view_weak_topics(){

	$uid = $_REQUEST['User_id'];
	$cname = $_REQUEST['Course_name'];
	return Autoship::model_view_weak_topics($uid,$cname);
	//echo Portal::server_login("chzunair453@gmail.com","12345","admin");
}

function logoutHandler(){

	@session_start();
	$_SESSION['session']="noValue";
	if(session_destroy()){
		$json["STATUS"] = "SUCCESS";
	}
	else{
		$json["STATUS"] = "FAIL";	
	}
	return json_encode($json);
}			


function changedStatus(){
	$ids = $_REQUEST['IDS'];

	 
	$json["STATUS"] = "SUCCESS";                   
    $json["MESSEGE"] = count($ids);
    return json_encode($json);

	//return Autoship::model_set_Tag($ids);
	

	
}
function changeDeliveryStatus() {
	$id=$_REQUEST['ID'];
	$status="Delivered";
	return  Autoship::model_update_status($id, $status);
}

?>