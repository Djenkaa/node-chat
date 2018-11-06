var socket = io();
     //CONNECT TO SERVER 
        socket.on("connect", function () {
            console.log("Connected to server");
            var params = $.deparam(window.location.search);

            socket.emit("join",params);
            
        });

        socket.on("disconnect", function(){
            console.log("Disconnect from server");
        });
        // SEND MESSAGES TO SERVER
        $('#btnSend').on("click", function(e){
            e.preventDefault();
        var input = $("#exampleInputEmail1");
        console.log(input);
       socket.emit("newMess",{
            name:"Mihajlo",
            text:input.val(),
            timeStamp: Date.now()
       });
       input.val("");
     
    });
    // RECEIVE MESSAGES FROM SERVER
    socket.on("messages",function(m){
        var template = $('#chatModel').html();
        var html = Mustache.render(template,{
            name:m.name,
            text:m.text,
            timeStamp: m.timeStamp
        });
        $('#mess').append(html);
    });
   