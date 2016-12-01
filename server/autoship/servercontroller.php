<?php
header('Access-Control-Allow-Origin: *');   
date_default_timezone_set('Asia/Karachi');
session_start();
include("functions.php");

$req = $_REQUEST['REQUEST_TYPE'];

switch($req)
{


	case 'LOGIN':
        echo fn_Login();
        break;

    // admin want to add more users like shipping and packing manager
    case 'addEmployee':
        echo fn_addEmployee();
        break;
    case 'getProfile':

    	echo fn_getProfile();
        break;

    case 'allEmployee':
        echo fn_allEmployee();
        break;

    case 'deleteEmployee':
        echo fn_deleteEmployee();
        break;

    case 'editProfile':
        echo fn_editProfile();
        break;
        
    case 'changePassword':
        echo fn_changePassword();
        break;


    case 'get_allOrders':
        echo fn_get_allOrders();
        break;

    case 'update_status':
        echo fn_update_status();
        break;








	case 'VIEW_WEAK_TOPICS':
        echo fn_view_weak_topics();
        break;





    case 'weakTopic_report':
        echo fn_weakTopicReport();
        break;

    case 'LOGOUT':
        echo logoutHandler();
        break;

    case 'CHANGE_TAG_STATUS':
     
        echo  changedStatus();

        break;
        
}

?>