      var httpRequest;

      function makeRequest() {
        var url = 'https://zenit.senecac.on.ca/~emile.ohan/int222/labs/lab06/courses.json'; 
        // make an HTTP request object

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
          httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
          try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
          } 
          catch (e) {
            try {
              httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {}
          }
        }
    
        if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        
        // register a request listener
        httpRequest.onreadystatechange = showContents;
        // make the HTTP request 
        httpRequest.open('GET', url, true);
        httpRequest.send();
      }
    
      // the function that handles the server response

      function showContents() {
        
       //  check for response state
       //  0      The request is not initialized
       //  1      The request has been set up
       //  2      The request has been sent
       //  3      The request is in process
       //  4      The request is complete

        if (httpRequest.readyState === 4) {
          // check the respone code
          if (httpRequest.status === 200) { // The request has succeeded
            // Javascript function JSON.parse to parse JSON data

            var jsArray = JSON.parse(httpRequest.responseText);

            //**********************************
            //       include your code here
            //**********************************
		var content="";
         content+="<table class='table-1'><tr><th>Program Area</th><th>Semester</th><th>Courses</th></tr>";
		for (var i in jsArray)
		 { 
           content+= "<tr>";
           content+= "   <td>" + jsArray[i].name    + "</td>";
           content+= "   <td>" + jsArray[i].semester  + "</td>";
		   content+= "   <td>" + jsArray[i].courses  + "</td>";
           content+= "</tr>";
         }
         content+="<caption><a href='jsonFile.json'>Show the JSON file</a></caption>";

         content+="</table>";
         var show = document.getElementById("data");
         show.innerHTML = content;




		  document.getElementById("data").innerHTML = content;
          } else {
            alert('There was a problem with the request.');
          }
        }
	  }
      
