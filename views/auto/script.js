    function validateEmail() {
    var x = document.getElementById("id").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
       // alert("Not a valid e-mail address");
        return false;
        }
    }

    function login() {

            var email = document.getElementById("id").value; 
            if(email == ""){
                 document.getElementById("login-error").innerText="";
                 document.getElementById("email-error").innerText="Email field is empty";
                return false;
            }
             document.getElementById("email-error").innerText="";
            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
                //alert("Not a valid e-mail address");
                document.getElementById("login-error").innerText="";
                document.getElementById("email-error").innerText="Email format is incorrect";
                return false;
            }
            document.getElementById("email-error").innerText="";   

            var password = document.getElementById("password").value;
            if (password == "") {
                document.getElementById("login-error").innerText="";
                document.getElementById("password-error").innerText="Password field is empty";
                return false;
            } 
            document.getElementById("password-error").innerText="";

            //alert(password);

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/autoship/servercontroller.php",
                data: { REQUEST_TYPE: 'LOGIN', EMAIL: email, PASSWORD: password},
                dataType: 'json',
                timeout: 30000,
                success: function (data) {
                    //alert(data.user_type);  
                    if (data.STATUS == "SUCCESS") {
                        document.getElementById("login-error").innerText="login successfully";
                        //alert(data.user_type);
                        //alert("logged in successfully");
                        localStorage.setItem("User_id", data.uid);
                        localStorage.setItem("User_type", data.user_type);
                        if(data.user_type == "admin"){
                            window.location.href = '../admin/manager.html';
                        }
                        else if(data.user_type == "SM"){
                            window.location.href = '../Shipping Manager/smanager.html';
                        }
                        else if(data.user_type == "PM"){
                            window.location.href = '../Packing Manager/pmanager.html';
                        }
                        else if(data.user_type == "DP"){
                            window.location.href = '../Delivery Person/dperson.html';
                        }
    
                    }

                    else if (data.STATUS == "FAIL") 
                    {
                            document.getElementById("login-error").innerText="Something went wrong. email or password is incorrect";
                    }
                    else //ERROR
                    {
                        alert('Error');
                    }
                },
                error: function (x, t, m) {
                    if (t === "timeout") {
                        alert('Timeout');
                    } else {
                        alert(t);
                    }
                }
            });
    }

    function addEmployee() {

            if(localStorage.getItem("User_type")!="admin"){
                return;
            }
            var name = document.getElementById("name").value;
            if (name == "") {
                document.getElementById("name-error").innerText="Name field cannot be empty";
                return false;
            }
            var cnic = document.getElementById("cnic").value;//alert(cnic);
            var email = document.getElementById("email").value;//alert(email);
            var password1 = document.getElementById("password1").value;//alert(password1);
            var password2 = document.getElementById("password2").value;//alert(password2);
            if (password1 != password2) {
                alert("passwords does not match");
                return;
            }
            var contact = document.getElementById("contact").value;//alert(contact);
            var dob = document.getElementById("dob").value;//alert(dob);
            var e = document.getElementById("role");      // get value of role from dropdownlist
            var role = e.options[e.selectedIndex].value;
            //alert(role);
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/autoship/servercontroller.php",
                data: { REQUEST_TYPE: 'addEmployee', NAME: name, CNIC:cnic, EMAIL: email, PASSWORD: password1, CONTACT: contact, DOB: dob, ROLE:role},
                dataType: 'json',
                timeout: 30000,
                success: function (data) {
                    if (data.STATUS == "SUCCESS") {
                        //alert("employee added successfully");
                        document.getElementById("name").value = "";
                        document.getElementById("cnic").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("password1").value = "";
                        document.getElementById("password2").value = "";
                        document.getElementById("password2").value = "";
                        document.getElementById("password2").value = "";
                        window.location.href = 'addEmployee.html';
                    }

                    else if (data.STATUS == "FAIL") {
                        alert('Failed to add employee');
                    }
                    else //ERROR
                    {
                        alert('Error');
                    }
                },
                error: function (x, t, m) {
                    if (t === "timeout") {
                        alert('Timeout');
                    } else {
                        alert(t);
                    }
                }
            });
    }

    function get_allEmployee(){
        var userid = localStorage.getItem("User_id");

        //alert("come in all employee function");
                    generatedHTML = '';
                    generatedHTML += '<center>'; 
                    generatedHTML += '<table class="table table-bordered table-hover table-striped col-sm-3">';
                    generatedHTML += '<thead>';
                    generatedHTML += '<tr>';
                    generatedHTML += '<th>Name</th>';
                    generatedHTML += '<th>CNIC</th>';
                    generatedHTML += '<th>Email</th>';
                    generatedHTML += '<th>Contact No</th>';
                    generatedHTML += '<th>Date of Birth</th>';
                    generatedHTML += '<th>Role</th>';
                    generatedHTML += '<th>Delete</th>';
                    generatedHTML += '</tr>';
                    generatedHTML += '</thead>';
                    generatedHTML += '<tbody>';
                    //alert(userid);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller?REQUEST_TYPE=allEmployee&User_id=1",
                        //data: { REQUEST_TYPE: 'allEmployee', User_id: userid},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                //alert("STATUS = success");
                                for (var i = 0 ; i < data.TotalRecords; i++) {
                                    generatedHTML += '<tr>';
                                    generatedHTML += '<td>' + data.DATA[i].name + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].cnic + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].email + '</td> ';
                                    generatedHTML += '<td>' + data.DATA[i].contact + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].dob + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].role + '</td>';
                                    //alert(data.DATA[i].user_id);
                                    generatedHTML += '<td><button type="button" id="delBtn' + data.DATA[i].user_id + '" class="btn btn-info" onclick="deleteEmp(' + data.DATA[i].user_id + ')">Delete</button></td>';
                                    generatedHTML += '</tr>';
                                }
                                generatedHTML += '</tbody>';
                                generatedHTML += '</table>';
                                generatedHTML += '</center>';
                                if(data.TotalRecords>0){
                                    $("#allEmployees").html(generatedHTML);    
                                }
                                else{
                                    var error_msg= '<h1 class="text-center" style="color:red">No Other Employee Exist.</h1>';
                                    $("#allEmployees").html(error_msg); 
                                }
                                
                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }

    function deleteEmp(user_id){
        //alert("hello zunair");
       //alert(user_id);

        $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'deleteEmployee', User_id: user_id},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                //alert("employee deleted successfully");
                                get_allEmployee();
                                }
                                  
                            else if (data.STATUS == "FAIL") {
                                alert('Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });

    }

    function get_profile(){
         var userid = localStorage.getItem("User_id");
         //alert(userid);
        //alert("come in get profile function");

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'getProfile', User_id: userid},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                document.getElementById("name").innerText = data.name;
                                document.getElementById("cnic").innerText = data.cnic;
                                document.getElementById("email").innerText = data.email;
                                document.getElementById("contact").innerText = data.contact;
                                document.getElementById("dob").innerText = data.dob;
                                
                                if(data.role == "SM")
                                {
                                    document.getElementById("role").innerText = "Shipping Manager"; 
                                    localStorage.setItem("role", "Shipping Manager");   
                                }
                                else if(data.role == "PM")
                                {
                                    document.getElementById("role").innerText = "Packing Manager";    
                                    localStorage.setItem("role", "Packing Manager");
                                }
                                else if(data.role == "DP")
                                {
                                    document.getElementById("role").innerText = "Delivery Person";
                                    localStorage.setItem("role", "Delivery Person");    
                                }
                                else if(data.role == "admin")
                                {
                                    document.getElementById("role").innerText = data.role;
                                    localStorage.setItem("role", data.role);    
                                }
                                
                                localStorage.setItem("userid", userid);
                                localStorage.setItem("name", data.name);
                                localStorage.setItem("cnic", data.cnic);
                                localStorage.setItem("email", data.email);
                                localStorage.setItem("contact", data.contact);
                                localStorage.setItem("dob", data.dob);
                                //localStorage.setItem("role", data.role);

                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }


    function edit_profile(){
        
         //alert("come in edit profile function");
         var userid = localStorage.getItem("userid");
         var name = localStorage.getItem("name");
         var cnic = localStorage.getItem("cnic");
         var email = localStorage.getItem("email");
         var contact = localStorage.getItem("contact");
         var dob = localStorage.getItem("dob");
         var role = localStorage.getItem("role");


         document.getElementById("name").value = name;
         document.getElementById("cnic").value = cnic;
         document.getElementById("email").value = email;
         document.getElementById("contact").value = contact;
         
         //var temp = dob.split('/');
         //var newdate = temp[2] + '-' + temp[1] +'-' +temp[0];
         //alert(newdate);
         document.getElementById("dob").value = dob;

         document.getElementById("role").innerText = role;

    }

    function update_profile(){

        var userid = localStorage.getItem("User_id");
        //alert(userid);  
        var name = document.getElementById("name").value;
        var cnic = document.getElementById("cnic").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("contact").value;
        var dob = document.getElementById("dob").value;
        //alert(dob);
        //dob="30/11/2011";
        if(document.getElementById("role").innerText == "Shipping Manager"){
            role = "SM";
        }
        else if(document.getElementById("role").innerText == "Packing Manager"){
            role = "PM";
        }
        else if(document.getElementById("role").innerText == "Delivery Person"){
            role = "DP";
        }
        else if(document.getElementById("role").innerText == "admin"){
            role = "admin";
        }
       // var role = document.getElementById("role").innerText;
        //alert(role);
        $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'editProfile', User_id: userid, NAME: name, CNIC: cnic, EMAIL:email, CONTACT: contact, DOB: dob
                        , ROLE: role},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {

                                //alert("Profile updated successfully");
                                if(role == "SM"){
                                    window.location.href = 'smanager.html';    
                                }
                                else if(role == "PM"){
                                    window.location.href = 'pmanager.html';    
                                }
                                else if(role == "DP"){
                                    window.location.href = 'dperson.html';    
                                }
                                else if(role == "admin"){
                                    window.location.href = 'manager.html';    
                                }
                                

                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('No update: Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }

    function change_password(){
        var userid = localStorage.getItem("User_id");
        //alert(userid);  
        var current_password = document.getElementById("current_password").value;
        var new_password1 = document.getElementById("new_password1").value;
        var new_password2 = document.getElementById("new_password2").value;

        if(new_password1 != new_password2){
            alert("new passwords does not match");
            return;
        }

         $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'changePassword', User_id: userid, password1: current_password, password2: new_password2},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {

                                document.getElementById("current_password").value = "";
                                document.getElementById("new_password1").value = "";
                                document.getElementById("new_password2").value = "";
                                
                                document.getElementById("change_password_msg").innerText = "Password changed successfully";

                            }       
                            else if (data.STATUS == "FAIL") {
                                //alert('Failed to update password');
                                document.getElementById("current_password").value = "";
                                document.getElementById("new_password1").value = "";
                                document.getElementById("new_password2").value = "";
                                document.getElementById("change_password_msg").innerText = "Failed to update password";
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });

    }

    function all_orders() {
        generatedHTML = '';
                    generatedHTML += '<center>'; 
                    generatedHTML += '<table id="myTable" class="table table-bordered table-hover table-striped col-sm-3">';
                    generatedHTML += '<thead>';
                    generatedHTML += '<tr>';
                    generatedHTML += '<th>Order ID</th>';
                    generatedHTML += '<th>Order Name</th>';
                    generatedHTML += '<th>Price</th>';
                    generatedHTML += '<th>Region</th>';
                    generatedHTML += '<th>Address</th>';
                    generatedHTML += '<th>Due Date</th>';
                    generatedHTML += '<th>Status</th>';
                    generatedHTML += '</tr>';
                    generatedHTML += '</thead>';
                    generatedHTML += '<tbody>';
                    //alert(userid);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'get_allOrders'},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                //alert("STATUS = success");
                                for (var i = 0 ; i < data.TotalRecords; i++) {
                                    generatedHTML += '<tr>';
                                    generatedHTML += '<td>' + data.DATA[i].order_id + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].order_name + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].price + '</td> ';
                                    generatedHTML += '<td>' + data.DATA[i].region + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].address + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].due_date + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].status + '</td>';                          
                                    generatedHTML += '</tr>';
                                }
                                generatedHTML += '</tbody>';
                                generatedHTML += '</table>';
                                generatedHTML += '</center>';
                                if(data.TotalRecords>0){
                                    $("#all_orders").html(generatedHTML);    
                                }
                                else{
                                    var error_msg= '<h1 class="text-center" style="color:red">No Orders found.</h1>';
                                    $("#all_orders").html(error_msg); 
                                }
                                
                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }

    function all_orders_tags() {
        generatedHTML = '';
                    generatedHTML += '<center>'; 
                    generatedHTML += '<table id="myTable" class="table table-bordered table-hover table-striped col-sm-3">';
                    generatedHTML += '<thead>';
                    generatedHTML += '<tr>';
                    generatedHTML += '<th>Order ID</th>';
                    generatedHTML += '<th>Order Name</th>';
                    generatedHTML += '<th>Price</th>';
                    generatedHTML += '<th>Region</th>';
                    generatedHTML += '<th>Address</th>';
                    generatedHTML += '<th>Due Date</th>';
                    generatedHTML += '<th>Tag Status</th>';
                    generatedHTML += '</tr>';
                    generatedHTML += '</thead>';
                    generatedHTML += '<tbody>';
                    //alert(userid);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'get_allOrders_tags'},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                               // alert("STATUS = success");
                                for (var i = 0 ; i < data.TotalRecords; i++) {
                                    generatedHTML += '<tr>';
                                    generatedHTML += '<td>' + data.DATA[i].order_id + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].order_name + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].price + '</td> ';
                                    generatedHTML += '<td>' + data.DATA[i].region + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].address + '</td>';
                                    generatedHTML += '<td>' + data.DATA[i].due_date + '</td>';
                                    generatedHTML += '<td><input type="checkbox" name="tag" value="No"></td>';                          
                                    generatedHTML += '</tr>';
                                }
                                generatedHTML += '</tbody>';
                                generatedHTML += '</table>';
                                generatedHTML += '</center>';
                                if(data.TotalRecords>0){
                                    $("#all_orders").html(generatedHTML);    
                                }
                                else{
                                    var error_msg= '<h1 class="text-center" style="color:red">No Orders found.</h1>';
                                    $("#all_orders").html(error_msg); 
                                }
                                
                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Fail');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }





    function regionvise_ordersReport(){         // for horizontal bar chart
        $(function() {
         $.ajax({

            url: 'http://localhost:8080/auto/admin/chart_data.php',
            type: 'GET',
            success: function(data) {
            chartData = data;
            var chartProperties = {
            "caption": "Top 5 Stores by Sales",
            "subCaption": "Last month",
            "yAxisName": "Sales (In USD)",
            "numberPrefix": "$",
            "paletteColors": "#0075c2",
            "bgColor": "#ffffff",
            "showBorder": "0",
            "showCanvasBorder": "0",
            "usePlotGradientColor": "0",
            "plotBorderAlpha": "10",
            "placeValuesInside": "1",
            "valueFontColor": "#ffffff",
            "showAxisLines": "1",
            "axisLineAlpha": "25",
            "divLineAlpha": "10",
            "alignCaptionWithCanvas": "0",
            "showAlternateVGridColor": "0",
            "captionFontSize": "14",
            "subcaptionFontSize": "14",
            "subcaptionFontBold": "0",
            "toolTipColor": "#ffffff",
            "toolTipBorderThickness": "0",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "80",
            "toolTipBorderRadius": "2",
            "toolTipPadding": "5"
            };

            apiChart = new FusionCharts({
                type: 'bar2d',           // for pie chart: pie3d and for column chart: column2d
                renderAt: 'chart-container',
                width: '550',
                height: '350',
                dataFormat: 'json',
                insertMode: "prepend",
                dataSource: {
                    "chart": chartProperties,
                    "data": chartData,
                    
                }
            });
            apiChart.render();
        }
    });
});
    }


    function backup(){
        $(function() {
         $.ajax({

            url: 'http://localhost:8080/auto/admin/chart_data.php',
            type: 'GET',
            success: function(data) {
            chartData = data;
            var chartProperties = {
                "caption": "Regionvise no. of sales",
                "xAxisName": "Region",
                "yAxisName": "no. of orders sale",
                "rotatevalues": "1",
                "theme": "zune"
            };

            apiChart = new FusionCharts({
                type: 'column3d',           // for pie chart: pie3d and for column chart: column2d and for line chart use: line
                renderAt: 'chart-container',
                width: '550',
                height: '350',
                dataFormat: 'json',
                dataSource: {
                    "chart": chartProperties,
                    "data": chartData
                }
            });
            apiChart.render();
        }
    });
});
    }

    function logout(){
        localStorage.clear();

        $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'LOGOUT'},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {

                                window.location.href = '../login/login.html';

                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Failed to logout');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            if (t === "timeout") {
                                alert('Timeout');
                            } else {
                                alert(t);
                            }
                        }
                    });
    }

    function changeTagStatus(){
        
        var rows = document.getElementsByTagName("tr");
        var myIds = [];



    $('#myTable').find('tr').each(function () {
        var row = $(this);
        if (row.find('input[type="checkbox"]').is(':checked')) {
            $cells = $(this).children('td');
            //alert($($cells[0]).html());
            var temp = $($cells[0]).html().toString();
            //alert(temp);    
              $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/autoship/servercontroller.php",
                        data: {REQUEST_TYPE: 'CHANGE_TAG_STATUS', ID: temp },
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                //alert("success");
                                window.location.href = 'generateTags.html';

                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Failed to logout');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            alert(m);

                        }
                    });
                
        }
    });
    //.
    }

        /*$("tbody tr").each(function(index){
            $cells = $(this).children('td');
            //alert($($cells[0]).html());
            
            //alert($($cells[6]).first().is(':checked'));

            
            

            if(false)
            {
                myIds.push({
                    rowid: $($cells[0]).html()       
                });
                alert($($cells[0]).html());
            }
           //  alert($($cells[1]).value);
           
        });
        $.ajax({
                        type: "POST",
                        url: "http://localhost/Autoship-SE/server/autoship/servercontroller.php",
                        data: { REQUEST_TYPE: 'CHANGE_TAG_STATUS', IDS: myIds},
                        dataType: 'json',
                        timeout: 30000,
                        success: function (data) {
                            if (data.STATUS == "SUCCESS") {
                                alert("success");
                                //window.location.href = '../login/login.html';

                            }       
                            else if (data.STATUS == "FAIL") {
                                alert('Failed to logout');
                            }
                            else //ERROR
                            {
                                alert('Error');
                            }
                        },
                        error: function (x, t, m) {
                            
                        }
                    });
    */


   